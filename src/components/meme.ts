import * as vscode from "vscode";

import { extPath, liveServer } from "./extpath";
import { getImages, imagesToHTML } from "./images";
import { handleError } from "./error";

// ===========================================================================
// EXPORT FUNCTION
// ===========================================================================

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

  setTimeout(async function (): Promise<void> {
    await launchApp();
  }, 1000);
}

// ===========================================================================
// GLOBAL VARIABLES
// ===========================================================================

const currentPath: vscode.Uri = vscode.workspace.workspaceFolders![0].uri;
const memeFile: vscode.Uri = vscode.Uri.joinPath(currentPath, "/.dogeapp/doge.html");

// ===========================================================================
// FUNCTIONS
// ===========================================================================

// Copy template files from extension to workspace
async function copyTemplate(): Promise<boolean> {
  const templateUri: vscode.Uri = vscode.Uri.joinPath(extPath, "/out/template");
  const currentPathUri: vscode.Uri = vscode.Uri.joinPath(currentPath, "/.dogeapp");
  const imgUri: vscode.Uri = vscode.Uri.joinPath(extPath, "/out/img");
  const currentImgPathUri: vscode.Uri = vscode.Uri.joinPath(currentPath, "/.dogeapp/app/img");
  const mdUri: vscode.Uri = vscode.Uri.joinPath(currentPathUri, "/Doge.md");
  const currentMdPathUri: vscode.Uri = vscode.Uri.joinPath(currentPath, "/Doge.md");

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

  try {
    await vscode.workspace.fs.copy(mdUri, currentMdPathUri, { overwrite: true });
    await vscode.workspace.fs.delete(mdUri);
    await vscode.commands.executeCommand("markdown.showPreview", currentMdPathUri);
  } catch {
    handleError(3);
    return false;
  }

  return true;
}

// Copy user images from workspace to doge.html
async function copyImages(): Promise<boolean> {
  const folderUri = vscode.Uri.joinPath(currentPath, "/img");

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
    handleError(4);
    return false;
  }

  const startPosition: number = 30;
  const editPosition: vscode.Position = new vscode.Position(startPosition, 0);
  const editImages: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
  editImages.insert(memeFile, editPosition, htmlCode);

  var flag: boolean = true;

  flag = await vscode.workspace.applyEdit(editImages);
  if (!flag) {
    handleError(5);
    return false;
  }

  flag = await vscode.workspace.saveAll();
  if (!flag) {
    handleError(6);
    return false;
  }

  return true;
}

// Launch Live Server for dogeapp
async function launchApp(): Promise<boolean> {
  if (!liveServer) {
    vscode.window.showWarningMessage('Doge : Install the [ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension to access this feature!');
    return false;
  }

  try {
    await vscode.commands.executeCommand("extension.liveServer.goOnline", memeFile);
  } catch {
    vscode.window.showWarningMessage('Doge : Could not launch Live Server!');
    return false;
  }

  return true;
}
