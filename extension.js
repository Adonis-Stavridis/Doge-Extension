// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "doge" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.doge', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Karen release me from Visual Studio Code this instant!');
	});

	context.subscriptions.push(disposable);

	vscode.languages.registerHoverProvider('*', {
		provideHover(document, position) {
			const wordRange = document.getWordRangeAtPosition(position);
			const word = document.getText(wordRange).toLowerCase();

			const map = {
				big_bro: '![Big Bro](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/big_bro.png "Big Bro")',
				cheems: '![Cheems](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/cheems.png "Cheems")',
				doge: '![Doge](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/doge.png "Doge")',
				isabelle: '![Isabelle](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/isabelle.png "Isabelle")',
				karen: '![Karen](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/karen.png "Karen")',
				lil_bro: '![Lil Bro](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/lil_bro.png "Lil Bro")',
				milton: '![Milton](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/milton.png "Milton")',
				petyr: '![Petyr](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/petyr.png "Petyr")',
				quieres: '![Quieres](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/quieres.png "Quieres")',
				swagcat: '![Swagcat](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/swagcat.png "Swagcat")',
				walter: '![Walter](https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/imgs/walter.png "Walter")'
			};

			var popup = new vscode.Hover(map[word]);

			return popup;
		}
	});
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
