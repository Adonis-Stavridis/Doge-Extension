import * as vscode from "vscode";
import * as path from "path";

import { extPath } from "./extpath";
import { getImages, imagesToHTML } from "./images";
import { start } from "repl";

// GLOBAL VARIABLES
var currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
var memeFile: string = currentPath + "/.dogeapp/doge.html";
var addedLines: number = 0;

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

  flag = await placeImages();
  if (!flag) {
    return;
  }

  setTimeout(openOutputFile, 1000);
}

// FUNCTIONS
function updatePaths(filename: string) {
  currentPath = path.dirname(filename);
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

  let copy = async function () {
    try {
      await vscode.workspace.fs.copy(templateUri, currentPathUri, { overwrite: true });
    } catch {
      vscode.window.showErrorMessage('Doge : An error (id : 01) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2001%29%20within%20the%20extension%20occured!) on the GitHub repository!');
      return false;
    }

    return true;
  };

  try {
    await vscode.workspace.fs.stat(currentPathUri);
  } catch {
    return copy();
  }

  if (addedLines === 0) {
    return copy();
  }

  return true;
}

async function placeImages(): Promise<boolean> {
  const imgFolder = currentPath + "/img";
  const folderUri = vscode.Uri.parse(imgFolder);

  var readDir: [string, vscode.FileType][];

  try {
    readDir = await vscode.workspace.fs.readDirectory(folderUri);
  } catch {
    vscode.window.showErrorMessage('Doge : /img folder not found!');
    return false;
  }

  const images: Array<string> = getImages(readDir);
  if (!images || images.length === 0) {
    vscode.window.showErrorMessage('Doge : No images in /img folder found!');
    return false;
  }

  const htmlCode: string = imagesToHTML(images);

  const startPosition: number = 27;
  const memeFileUri: vscode.Uri = vscode.Uri.parse(memeFile);
  const insertPosition: vscode.Position = new vscode.Position(startPosition, 0);
  const addImages: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();

  if (addedLines === 0) {
    addImages.insert(memeFileUri, insertPosition, htmlCode);
  } else {
    const rangePosition: vscode.Position = new vscode.Position(startPosition + addedLines, 0);
    const replaceRange: vscode.Range = new vscode.Range(insertPosition, rangePosition);
    addImages.replace(memeFileUri, replaceRange, htmlCode);
  }

  addedLines = images.length;

  if (!vscode.workspace.applyEdit(addImages)) {
    vscode.window.showErrorMessage('Doge : An error (id : 03) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2003%29%20within%20the%20extension%20occured!) on the GitHub repository!');
    return false;
  }

  if (!(await vscode.workspace.openTextDocument(memeFileUri)).save()) {
    vscode.window.showErrorMessage('Doge : An error (id : 04) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2004%29%20within%20the%20extension%20occured!) on the GitHub repository!');
    return false;
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
