import * as vscode from "vscode";
import * as path from "path";

var currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;

export function dogeMeme(): void {
  if (!checks()) {
    return;
  }

  const currentFile: string = path.basename(vscode.window.activeTextEditor!.document.fileName, ".json");

  const memeName = vscode.Uri.parse(currentPath + "/" + currentFile + ".html");

  const memeFile = new vscode.WorkspaceEdit();
  memeFile.createFile(memeName, { overwrite: true });

  vscode.workspace.applyEdit(memeFile);
}

function checks(): boolean {
  var editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active Editor!');
    return false;
  }

  var uri = editor.document.uri;
  var filename = uri.fsPath;
  var ext = path.extname(filename);

  currentPath = path.dirname(filename);

  if (ext !== ".json") {
    vscode.window.showWarningMessage('File needs to be a .json file!');
    return false;
  }

  return true;
}
