import * as vscode from "vscode";

import { dogeUpdateStatusBarItem } from "./statusBarItem";
import { dogeMeme } from "./meme";

export let dogeCommandID = "doge.createMeme";

export async function dogeCommand(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand(dogeCommandID, async function () {
    dogeUpdateStatusBarItem(true);
    await dogeMeme();
    dogeUpdateStatusBarItem(false);
  });

  context.subscriptions.push(command);
}
