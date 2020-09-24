import * as vscode from "vscode";
import * as path from "path";

var currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
var currentFile: string = currentPath;

var memeFile: string = currentPath + "/dogeMeme.html";

export function dogeMeme(): void {
  if (!checks()) {
    return;
  }

  createFile(currentPath, currentFile);

  var inputText = readInputFile(currentFile);

  inputText.then((value) => {
    writeOutputFile(memeFile, value);
  });
}

function checks(): boolean {
  var editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('Doge: No active Editor!');
    return false;
  }

  var filename = editor.document.fileName;
  var ext = path.extname(filename);

  if (ext !== ".json") {
    vscode.window.showErrorMessage('Doge: File needs to be a .json file!');
    return false;
  }

  currentPath = path.dirname(filename);
  currentFile = filename;

  return true;
}

function createFile(rootPath: string, filename: string): void {
  memeFile = rootPath + "/" + path.basename(filename, '.json') + ".html";

  const memeName = vscode.Uri.parse(memeFile);

  const memeEdit = new vscode.WorkspaceEdit();
  memeEdit.createFile(memeName, { overwrite: true });

  vscode.workspace.applyEdit(memeEdit);
}

function readInputFile(filename: string): Thenable<Uint8Array> {
  const fileUri = vscode.Uri.parse(filename);
  return vscode.workspace.fs.readFile(fileUri);
}

function writeOutputFile(filename: string, content: Uint8Array): void {
  const fileUri = vscode.Uri.parse(filename);
  vscode.workspace.fs.writeFile(fileUri, content);
}
