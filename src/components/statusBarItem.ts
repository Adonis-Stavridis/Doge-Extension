import * as vscode from "vscode";

import { dogeCommandID } from "./command";

let dogeStatusBarItem: vscode.StatusBarItem;

export function dogeCreateStatusBarItem(context: vscode.ExtensionContext) {
  dogeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  dogeStatusBarItem.command = dogeCommandID;
  context.subscriptions.push(dogeStatusBarItem);
}

export function dogeUpdateStatusBarItem(flag: boolean): void {
  if (flag) {
    dogeStatusBarItem.text = `$(loading) Memeing`;
    dogeStatusBarItem.show();
  } else {
    dogeStatusBarItem.hide();
  }
}
