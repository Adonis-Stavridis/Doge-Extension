// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { characters } from "./components/characters";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerCommand("doge.helloWorld", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage(
      "Karen release me from Visual Studio Code this instant!"
    );
  });

  context.subscriptions.push(disposable);

  vscode.languages.registerHoverProvider("*", {
    provideHover(document, position) {
      const wordRange = document.getWordRangeAtPosition(position);
      const word = document.getText(wordRange).toLowerCase();

      var popup = new vscode.Hover(characters[word]);

      return popup;
    },
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
