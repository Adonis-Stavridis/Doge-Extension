import * as vscode from "vscode";

import { dogeUpdateStatusBarItem } from "./statusBarItem";
import { dogeMeme } from "./meme";

export let dogeCommandID = "doge.createMeme";

export function dogeCommand(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand(dogeCommandID, () => {
    dogeUpdateStatusBarItem(true);
    dogeMeme();
    dogeUpdateStatusBarItem(false);
  });

  context.subscriptions.push(command);
}
