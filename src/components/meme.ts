import * as vscode from "vscode";

import { extPath, liveServer } from "./extpath";
import { getImages, imagesToHTML } from "./images";
import { handleError } from "./error";

// GLOBAL VARIABLES
const currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
const memeFile: string = currentPath + "/.dogeapp/doge.html";
var addedLines: number = 0;

// EXPORT FUNCTION
export async function dogeMeme(): Promise<void> {
  var flag: boolean = true;

  flag = await copyTemplate();
  if (!flag) {
    return;
  }

  // flag = await placeImages();
  // if (!flag) {
  //   return;
  // }

  // if (!launchApp()) {
  //   return;
  // }
}

// FUNCTIONS

// Copy template files from extension to workspace
async function copyTemplate(): Promise<boolean> {
  const templateUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/template");
  const currentPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp");
  const imgUri: vscode.Uri = vscode.Uri.parse(extPath + "/out/img");
  const currentImgPathUri: vscode.Uri = vscode.Uri.parse(currentPath + "/.dogeapp/app/img");

  try {
    await vscode.workspace.fs.copy(templateUri, currentPathUri, { overwrite: true });
  } catch {
    handleError(1);
    return false;
  }

  try {
    await vscode.workspace.fs.copy(imgUri, currentImgPathUri, { overwrite: true });
  } catch {
    handleError(2);
    return false;
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
      handleError(3);
      return false;
    }

    if (!(await vscode.workspace.openTextDocument(memeFileUri)).save()) {
      handleError(4);
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
    vscode.window.showWarningMessage('Doge : Install the [ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension to access this feature!');
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
