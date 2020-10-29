import * as vscode from "vscode";

export const extPath: vscode.Uri = vscode.extensions.getExtension("adonis-stavridis.doge")!.extensionUri;

export const liveServer: vscode.Extension<any> = vscode.extensions.getExtension("ritwickdey.liveserver")!;
