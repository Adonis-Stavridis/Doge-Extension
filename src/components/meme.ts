import * as vscode from "vscode";
import * as path from "path";

export function dogeMeme(): void {
  if (!checks()) {
    return;
  }

  console.log(vscode.workspace.workspaceFolders);

  const currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
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

  if (ext !== ".json") {
    vscode.window.showWarningMessage('File needs to be a .json file!');
    return false;
  }

  return true;
}
