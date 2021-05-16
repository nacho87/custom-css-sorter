const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.sortIt",
    function() {
      const editor = vscode.window.activeTextEditor,
            selection = editor.selection,
            startLine = selection.start.line,
            endLine = selection.end.line,
            selectionLength = editor.document.lineAt(endLine).text.length,
            lines = [],
            sortRules = vscode.workspace.getConfiguration('order-custom-css').get('array');

      if(sortRules && !sortRules.length) {
        vscode.window.showErrorMessage('Custom Css Sorter failed!! Please check if you edit "order-custom-css.array" in setting.json with "alphabetic" or with some customs css rules');
        return;
      }

      for (let i = startLine; i <= endLine; i++) {
        if(editor.document.lineAt(i).text[0] === '<') {
          vscode.window.showErrorMessage(`Error ejs inside the selection. Check line ${i+1}`);
          return;
        }
        lines.push(editor.document.lineAt(i).text);
      }

      lines.sort(function(a, b) {
        if (sortRules[0] === 'alphabetical') {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        } else {
          return sortRules.indexOf(a.substring(0, a.indexOf(':')).trim()) - sortRules.indexOf(b.substring(0, b.indexOf(':')).trim());
        }
      });

      editor.edit(editBuilder => {
        editBuilder.replace(
          new vscode.Range(startLine, 0, endLine, selectionLength),
          lines.join("\n")
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
