import * as vscode from "vscode";

import { dogeMeme } from "./meme";

export let dogeCommandID = "doge.createMeme";

export async function dogeCommand(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand(dogeCommandID, async function () {
    await dogeMeme();
  });

  context.subscriptions.push(command);
}
