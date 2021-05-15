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

      for (let i = startLine; i <= endLine; i++) {
        lines.push(editor.document.lineAt(i).text);
      }
      lines.sort(function(a, b) {
        return sortRules.indexOf(a.substring(0, a.indexOf(':')).trim()) - sortRules.indexOf(b.substring(0, b.indexOf(':')).trim());
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
