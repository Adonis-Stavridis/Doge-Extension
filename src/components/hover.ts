import * as vscode from "vscode";
import { dogeCharacters, dogeCharacterMarkdown } from "./characters";

const extPath: string = vscode.extensions.getExtension("adonis-stavridis.doge")!.extensionPath;

export function dogeHoverProvider() {
  vscode.languages.registerHoverProvider("*", {
    provideHover(document, position) {
      const wordRange: vscode.Range = document.getWordRangeAtPosition(position)!;
      const word: string = document.getText(wordRange).toLowerCase();

      if (dogeCharacters.has(word)) {
        var popup: vscode.Hover = new vscode.Hover(dogeCharacterMarkdown(word, extPath));

        return popup;
      }

      return null;
    },
  });
}
