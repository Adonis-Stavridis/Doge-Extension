import * as vscode from "vscode";

export const extPath: string = vscode.extensions.getExtension("adonis-stavridis.doge")!.extensionPath;

export const liveServer: vscode.Extension<any> = vscode.extensions.getExtension("ritwickdey.liveserver")!;
