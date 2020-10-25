import * as vscode from "vscode";

import { extPath, liveServer } from "./extpath";
import { getImages, imagesToHTML } from "./images";
import { handleError } from "./error";

// GLOBAL VARIABLES
const currentPath: string = vscode.workspace.workspaceFolders![0].uri.fsPath;
const memeFile: string = currentPath + "/.dogeapp/doge.html";

// EXPORT FUNCTION
export async function dogeMeme(): Promise<void> {
  var flag: boolean = true;

  flag = await copyTemplate();
  if (!flag) {
    return;
  }

  flag = await copyImages();
  if (!flag) {
    return;
  }

  setTimeout(async function () {
    flag = await launchApp();
    if (!flag) {
      return;
    }
  }, 1000);
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

// Copy user images from workspace to doge.html
async function copyImages(): Promise<boolean> {
  const imgFolder = currentPath + "/img";
  const folderUri = vscode.Uri.parse(imgFolder);

  var readDir: [string, vscode.FileType][] | null;
  try {
    readDir = await vscode.workspace.fs.readDirectory(folderUri);
  } catch {
    return true;
  }

  if (!readDir) {
    return true;
  }

  const images: Array<string> = getImages(readDir);
  if (!images || images.length === 0) {
    return true;
  }

  const htmlCode: string = imagesToHTML(images);
  if (!htmlCode || htmlCode.length === 0) {
    handleError(3);
    return false;
  }

  const startPosition: number = 33;
  const memeFileUri: vscode.Uri = vscode.Uri.parse(memeFile);
  const editPosition: vscode.Position = new vscode.Position(startPosition, 0);
  const editImages: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
  editImages.insert(memeFileUri, editPosition, htmlCode);

  var flag: boolean = true;

  flag = await vscode.workspace.applyEdit(editImages);
  if (!flag) {
    handleError(4);
    return false;
  }

  flag = await vscode.workspace.saveAll();
  if (!flag) {
    handleError(5);
    return false;
  }

  return true;
}

// Launch Live Server for dogeapp
async function launchApp(): Promise<boolean> {
  const fileUri = vscode.Uri.parse(memeFile);

  if (!liveServer) {
    vscode.window.showWarningMessage('Doge : Install the [ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension to access this feature!');
    return false;
  }

  try {
    await vscode.commands.executeCommand("extension.liveServer.goOnline", fileUri);
  } catch {
    vscode.window.showWarningMessage('Doge : Could not launch Live Server!');
    return false;
  }

  return true;
}
