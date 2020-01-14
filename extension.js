const vscode = require('vscode');

const characters = {
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

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	vscode.window.showInformationMessage('Karen release me from Visual Studio Code this instant!');

	let disposable = vscode.commands.registerCommand('extension.doge', function () {
		vscode.window.showInformationMessage('Karen release me from Visual Studio Code this instant!');
	});

	context.subscriptions.push(disposable);

	vscode.languages.registerHoverProvider('*', {
		provideHover(document, position) {
			const wordRange = document.getWordRangeAtPosition(position);
			const word = document.getText(wordRange).toLowerCase();

			var popup = new vscode.Hover(characters[word]);

			return popup;
		}
	});
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
