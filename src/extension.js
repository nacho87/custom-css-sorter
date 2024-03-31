const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.sortIt",
    function() {
      const editor = vscode.window.activeTextEditor,
            selection = editor.selection,
            startLine = selection.start.line,
            endLine = selection.end.line,
            editorDocument = editor.document,
            selectionLength = editorDocument.lineAt(endLine).text.length,
            tagTextNotMove = '%NOTMOVE%';
            sortRules = vscode.workspace.getConfiguration('order-custom-css').get('array');
      let newLines = [], groupLines = [];
      if(sortRules && !sortRules.length) {
        vscode.window.showErrorMessage('Custom Css Sorter failed!! Please check if you edit "order-custom-css.array" in setting.json with "alphabetic" or with some customs css rules');
        return;
      }
      addDontMoveTag(startLine, endLine, editorDocument, newLines,tagTextNotMove);
      cleanMoveTagForOrderElements(newLines);
      createGroupForOrder(newLines, groupLines, tagTextNotMove)
      const orderArray = sortLines(groupLines, sortRules,tagTextNotMove)
      cleanAllDontMoveTag(orderArray, tagTextNotMove);
      editor.edit(editBuilder => {
        editBuilder.replace(
          new vscode.Range(startLine, 0, endLine, selectionLength),
          orderArray.join("\n")
        );
      });
    }
  );
  function addDontMoveTag(startLine, endLine, document, array, textIncluded) {
    for (let i = startLine; i <= endLine; i++) {
      array.push(`${textIncluded}${document.lineAt(i).text}`);
    }
  }
  function cleanMoveTagForOrderElements(newLines) {
    const openTemplate = vscode.workspace.getConfiguration('order-custom-css').get('openTemplate'),
          closeTemplate = vscode.workspace.getConfiguration('order-custom-css').get('closeTemplate'),
          openTemplateString = vscode.workspace.getConfiguration('order-custom-css').get('openTemplateString'),
          newLinesLength = newLines.length;
    let outsideBlock = true,
        insideTemplate = false,
        activeIgnore = true;
    for (let i = 0; i < newLinesLength; i++) {
      const currentLine = newLines[i];
      if (activeIgnore) {
        if (!currentLine.includes(openTemplateString) && currentLine.includes(openTemplate)) {
          activeIgnore = true;
          insideTemplate = true;
        } else if (currentLine.includes('{') || currentLine.includes('}') ||  currentLine === '') {
        } else if (!currentLine.includes(openTemplateString) && currentLine.includes(closeTemplate)) {
          activeIgnore = false;
          insideTemplate = false;
        } else {
          if (!insideTemplate) {
            newLines[i] = currentLine.slice(9);
          }
        }
      } else {
        if (!currentLine.includes(openTemplateString) && currentLine.includes(openTemplate)) {
          activeIgnore = true;
          insideTemplate = true;
        } else if (currentLine.includes('{')) {
          outsideBlock = false;
        } else if (currentLine.includes('}')) {
          outsideBlock = true;
        } else if (!currentLine.includes(openTemplateString) && currentLine.includes(closeTemplate)) {
          activeIgnore = false;
          insideTemplate = false;
        } else {
          if (!outsideBlock) {
            newLines[i] = currentLine.slice(9);
          }
        }
      }
    }
  }
  function createGroupForOrder(newLines, groupLines, textIncluded )  {
    const newLinesLength = newLines.length;
    let subgroups = 0;
    for (let i = 0; i < newLinesLength; i++) {
      const currentLine = newLines[i];
      const nextLine = newLines[i + 1];
      if (!groupLines[subgroups]) {
        groupLines[subgroups] = [];
      }
      groupLines[subgroups].push(currentLine);
      if (currentLine.includes(textIncluded) !== nextLine?.includes(textIncluded)) {
        subgroups++;
      }
    }
  }
  function cleanAllDontMoveTag(array, textIncluded) {
    const arrayLength = array.length,
          textIncludedLength = textIncluded.length;
    for (let i = 0; i < arrayLength; i++ ) {
      const currentItem = array[i];
      if (currentItem.includes(textIncluded)) {
        array[i] = currentItem.slice(textIncludedLength);
      }
    }
  }
  function sortLines(array, rulesArray, textIncluded) {
    const arrayLength = array.length;
    let orderArray = [];
    for (let i = 0; i < arrayLength; i++ ) {
      array[i].sort(function (a,b) {
        if (rulesArray[0] === 'alphabetical') {
          if (a.includes(textIncluded) || (b.includes(textIncluded))) {
            return;
          }
          return a.toLowerCase().localeCompare(b.toLowerCase());
        } else {
          if (a.includes(textIncluded) || (b.includes(textIncluded))) {
            return;
          }
          return sortRules.indexOf(a.substring(0, a.indexOf(':')).trim()) - sortRules.indexOf(b.substring(0, b.indexOf(':')).trim());
        }
      })
      orderArray = [...orderArray, ...array[i]]
    }
    return orderArray;
  }
  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
