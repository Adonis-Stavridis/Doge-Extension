import * as vscode from "vscode";
import * as path from "path";

import { extPath, liveServer } from "./extpath";
import { getImages, imagesToHTML } from "./images";

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

  if (!launchApp()) {
    return;
  }
}

// FUNCTIONS
function updatePaths(filename: string) {
  currentPath = path.dirname(filename);
  memeFile = currentPath + "/.dogeapp/doge.html";
}

function checks(): boolean {
  var editor = vscode.window.activeTextEditor;

  if (!editor) {
    return true;
  }

  var filename = editor.document.fileName;

  updatePaths(filename);

  return true;
}

async function copyTemplate(): Promise<boolean> {
  const templateUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/template");
  const currentPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp");
  const imgUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/img");
  const currentImgPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp/app/img");

  let copy = async function () {
    try {
      await vscode.workspace.fs.copy(templateUri, currentPathUri, { overwrite: true });
    } catch {
      vscode.window.showErrorMessage('Doge : An error (id : 01) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2001%29%20within%20the%20extension%20occured!) on the GitHub repository!');
      return false;
    }

    try {
      await vscode.workspace.fs.copy(imgUri, currentImgPathUri, { overwrite: true });
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

  var flag: boolean = false;

  const startPosition: number = 35;
  const memeFileUri: vscode.Uri = vscode.Uri.parse(memeFile);
  const editPosition: vscode.Position = new vscode.Position(startPosition, 0);
  const editImages: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();

  let deleteImages = function () {
    const rangePosition: vscode.Position = new vscode.Position(startPosition + addedLines, 0);
    const replaceRange: vscode.Range = new vscode.Range(editPosition, rangePosition);
    const noImageHtml = "<p>No user images</p>";

    editImages.replace(memeFileUri, replaceRange, noImageHtml);

    addedLines = 0;
  };

  let applyAndSave = async function () {
    if (!vscode.workspace.applyEdit(editImages)) {
      vscode.window.showErrorMessage('Doge : An error (id : 03) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2003%29%20within%20the%20extension%20occured!) on the GitHub repository!');
      return false;
    }

    if (!(await vscode.workspace.openTextDocument(memeFileUri)).save()) {
      vscode.window.showErrorMessage('Doge : An error (id : 04) within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%2004%29%20within%20the%20extension%20occured!) on the GitHub repository!');
      return false;
    }
  };

  var readDir: [string, vscode.FileType][];
  try {
    readDir = await vscode.workspace.fs.readDirectory(folderUri);
  } catch {
    if (addedLines !== 0) {
      deleteImages();
      await applyAndSave();
    }
    return true;
  }

  const images: Array<string> = getImages(readDir);
  if (!images || images.length === 0) {
    if (addedLines !== 0) {
      deleteImages();
      await applyAndSave();
    }
    return true;
  }

  const htmlCode: string = imagesToHTML(images);
  var rangeLines: number;

  if (addedLines === 0) {
    rangeLines = startPosition + 1;
  } else {
    rangeLines = startPosition + addedLines;
  }

  const rangePosition: vscode.Position = new vscode.Position(rangeLines, 0);
  const replaceRange: vscode.Range = new vscode.Range(editPosition, rangePosition);
  editImages.replace(memeFileUri, replaceRange, htmlCode);

  addedLines = images.length;

  await applyAndSave();

  return true;
}

function launchApp(): boolean {
  const fileUri = vscode.Uri.parse(memeFile);

  if (!liveServer) {
    vscode.window.showWarningMessage('Doge : Install the Live Server VS Code extension to access this feature!');
    return false;
  }

  try {
    vscode.commands.executeCommand("extension.liveServer.goOnline", fileUri);
  } catch {
    vscode.window.showWarningMessage('Doge : Could not launch Live Server!');
    return false;
  }

  return true;
}
