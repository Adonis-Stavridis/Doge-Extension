import * as vscode from "vscode";
import * as path from "path";

import { extPath } from "./extpath";
import { getImages, imagesToHTML } from "./images";

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

  flag = await placeImages();
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
    vscode.window.showErrorMessage('Doge : An error (id : 01) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2001%29%20within%20the%20extension%20occured!) on the GitHub repository!');
    return false;
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

  var images: Array<string> = getImages(readDir);
  if (!images || images.length === 0) {
    vscode.window.showErrorMessage('Doge : No images in /img folder found!');
    return false;
  }

  var htmlCode: string = imagesToHTML(images);

  var memeFileUri: vscode.Uri = vscode.Uri.parse(memeFile);
  var insertPosition: vscode.Position = new vscode.Position(33, 37);
  var insertImages: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
  insertImages.insert(memeFileUri, insertPosition, htmlCode);

  if (!vscode.workspace.applyEdit(insertImages)) {
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

