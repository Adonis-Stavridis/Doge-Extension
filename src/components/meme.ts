import * as vscode from "vscode";
import * as path from "path";

import { extPath } from "./extpath";

// GLOBAL VARIABLES
var currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
var currentFile: string = currentPath;
var memeFile: string = currentPath + "/.dogeapp/doge.html";

// EXPORT FUNCTION
export async function dogeMeme(): Promise<void> {
  var flag: boolean = true;

  if (!checks()) {
    return;
  }

  flag = await copyTemplate();
  if (!flag) {
    return;
  }

  flag = await readImages();
  if (!flag) {
    return;
  }

  if (!openOutputFile()) {
    return;
  }
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

async function copyTemplate(): Promise<boolean> {
  const templateUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/template");
  const currentPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp");

  try {
    await vscode.workspace.fs.copy(templateUri, currentPathUri, { overwrite: true });
  } catch {
    vscode.window.showErrorMessage('Doge : An error (id : 01) within the extension occured! Create an issue on the [GitHub repository](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2001%29%20within%20the%20extension%20occured!)!');
    return false;
  }

  return true;
}

async function readImages(): Promise<boolean> {
  const imgFolder = currentPath + "/img";
  const folderUri = vscode.Uri.parse(imgFolder);

  var readDir;

  try {
    readDir = await vscode.workspace.fs.readDirectory(folderUri);
  } catch {
    vscode.window.showErrorMessage('Doge : img folder not found!');
    return false;
  }

  for (let val in readDir) {
    console.log(readDir[val][0]);
  }

  return true;
}

function openOutputFile(): boolean {
  const fileUri = vscode.Uri.parse(memeFile);
  if (!vscode.env.openExternal(fileUri)) {
    vscode.window.showWarningMessage('Doge : Could not open browser window!');
    return false;
  }

  return true;
}
