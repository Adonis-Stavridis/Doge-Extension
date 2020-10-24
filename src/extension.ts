import * as vscode from "vscode";

import { dogeCommand } from "./components/command";
import { dogeHoverProvider } from "./components/hover";

export function activate(context: vscode.ExtensionContext) {
  dogeCommand(context);

  dogeHoverProvider();
}

export function deactivate() { }
