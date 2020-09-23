import * as vscode from "vscode";

import { dogeCommand } from "./components/command";
import { dogeHoverProvider } from "./components/hover";
import { dogeCreateStatusBarItem } from "./components/statusBarItem";

export function activate(context: vscode.ExtensionContext) {
  dogeCommand(context);

  dogeHoverProvider();

  dogeCreateStatusBarItem(context);
}

export function deactivate() { }
