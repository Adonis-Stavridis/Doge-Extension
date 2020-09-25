import * as vscode from "vscode";
import * as path from "path";

import { extPath } from "./extpaths";

// GLOBAL VARIABLES
var currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
var currentFile: string = currentPath;
var memeFile: string = currentPath + "/.dogeapp/doge.html";

// EXPORT FUNCTION
export function dogeMeme(): void {
  if (!checks()) {
    return;
  }

  copyTemplate().then(() => {
    openOutputFile();
  });

  readImages().then((value) => {
    // for (let key in value) {
    //   console.log(key, value[key]);
    // }
  });
}

// FUNCTIONS
function updatePaths(filename: string) {
  currentPath = path.dirname(filename);
  currentFile = filename;
  memeFile = currentPath + "/.dogeapp/doge.html";
}

function checks(): boolean {
  var editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('Doge : No active Editor!');
    return false;
  }

  var filename = editor.document.fileName;
  var ext = path.extname(filename);

  if (ext !== ".json") {
    vscode.window.showErrorMessage('Doge : File needs to be a .json file!');
    return false;
  }

  updatePaths(filename);

  return true;
}

function copyTemplate(): Thenable<void> {
  const inputFilename = path.basename(currentFile, '.json');

  const templateUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/template");
  const currentPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp");

  return vscode.workspace.fs.copy(templateUri, currentPathUri, { overwrite: true });
}

function openOutputFile(): void {
  const fileUri = vscode.Uri.parse(memeFile);
  if (!vscode.env.openExternal(fileUri)) {
    vscode.window.showWarningMessage('Doge : Could not open browser window!');
  }
}

function readImages(): Thenable<[string, vscode.FileType][]> {
  const imgFolder = currentPath + "/img";
  const folderUri = vscode.Uri.parse(imgFolder);
  return vscode.workspace.fs.readDirectory(folderUri);
}
