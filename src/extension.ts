'use strict';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('"burst-lang" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let helloWorldCommand = vscode.commands.registerCommand('extension.sayHello', helloWorld);
    let openBurstFileCommand = vscode.commands.registerCommand('extension.openBurstFile',openBurstFile);

    context.subscriptions.push(helloWorldCommand);
    context.subscriptions.push(openBurstFileCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {

}

export function helloWorld() {
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
}

export function openBurstFile() {
    let pPath = vscode.window.showInputBox({prompt:'Enter Path To Burst File'});
    pPath.then(openBurstFileInEditor)

}

export function openBurstFileInEditor(path:string) {
    vscode.window.showInformationMessage('Opening Burst File: ' + path);
    let pDocument = vscode.workspace.openTextDocument(path);
    let document = pDocument.then();
    if (document == pDocument || document == null) {
        vscode.window.showInformationMessage('Failed To Open File')
        return;
    }

}