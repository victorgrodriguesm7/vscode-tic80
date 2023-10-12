import * as vscode from 'vscode';
import * as javascript from './languages/javascript';

import { Debug } from './debug';

export function activate(context: vscode.ExtensionContext) {
	Debug.log('Running');
	let disposable = vscode.commands.registerCommand('tic80.startTic', () => {
		vscode.window.showInformationMessage('Tic-80 has Started!');
	});

	const customDefinitions = vscode.languages.registerCompletionItemProvider(
		"javascript",
		{
			provideCompletionItems: javascript.completionDefinitionResolver
		},
	);

	const signatures = vscode.languages.registerSignatureHelpProvider(
		"javascript",
		{
			provideSignatureHelp: javascript.signatureHelpProvider
		},
		"(",
		","
		// TODO: Add Backspace
	)

	const hover = vscode.languages.registerHoverProvider('javascript', {
		provideHover: javascript.hoverProvider
	});

	context.subscriptions.push(disposable, customDefinitions, signatures, hover);
}

// This method is called when your extension is deactivated
export function deactivate() {}
