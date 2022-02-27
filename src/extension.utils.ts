import * as vscode from 'vscode';
import { DOGE_CHARACTERS, EXT_PATH, GITHUB_PATH } from './extension.constants';

export const dogeCharacterMarkdown = (name: string): string => {
  const imgString = EXT_PATH
    ? vscode.Uri.joinPath(EXT_PATH, `dist/img/${name}.png`).toString()
    : `${GITHUB_PATH}/img/${name}.png`;

  return `![](${imgString})`;
};

export const dogeHoverProvider = (): vscode.Disposable =>
  vscode.languages.registerHoverProvider('*', {
    provideHover(document, position) {
      const wordRange = document.getWordRangeAtPosition(position);
      const word = document.getText(wordRange).toLowerCase();

      if (DOGE_CHARACTERS.has(word)) {
        return new vscode.Hover(dogeCharacterMarkdown(word));
      }

      return null;
    }
  });
