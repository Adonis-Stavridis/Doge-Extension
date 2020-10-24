import * as vscode from "vscode";

export function handleError(id: number) {
  vscode.window.showErrorMessage('Doge : An error (id : ' + id + ') within the extension occured! Create an [issue](https://github.com/Adonis-Stavridis/Doge-Extension/issues/new?title=Doge%20:%20An%20error%20%28id%20:%20' + id + '%29%20within%20the%20extension%20occured!) on the GitHub repository!');
}
