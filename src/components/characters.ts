import * as vscode from "vscode";

export const dogeCharacters = new Set([
  "abomination",
  "bigbro",
  "caeser",
  "cheems",
  "doge",
  "dogelas",
  "engineer",
  "heavy",
  "henry",
  "isabelle",
  "jim",
  "karen",
  "kiddoge",
  "kyle",
  "kylie",
  "lilbro",
  "loafe",
  "milton",
  "monke",
  "murphy",
  "perro",
  "petyr",
  "phishe",
  "phoebe",
  "rupert",
  "soldier",
  "spym",
  "stuff",
  "swagcat",
  "walter"
]);

export function dogeCharacterMarkdown(name: string, uri: vscode.Uri) {
  const uriPath: vscode.Uri = vscode.Uri.joinPath(uri, "/out/img/" + name + ".png");

  return "![" + name + "](" + uriPath.path + " \"" + name + " \")";
}
