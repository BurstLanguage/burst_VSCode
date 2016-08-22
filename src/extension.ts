'use strict';
import * as vscode from 'vscode';
import {RootModuleFile} from '../src/rootModuleFile'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('"burst-lang" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let helloWorldCommand = vscode.commands.registerCommand('extension.sayHello', helloWorld);
    let createBurstModuleCommand = vscode.commands.registerCommand('extension.createBurstModule',createBurstModule)

    context.subscriptions.push(helloWorldCommand);
    context.subscriptions.push(createBurstModuleCommand)

}

// this method is called when your extension is deactivated
export function deactivate() {

}

export function helloWorld() {
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
}

export async function createBurstModule(){
    let rootPath : String = vscode.workspace.rootPath
    let projectName : String = rootPath.substring(rootPath.lastIndexOf("\\") + 1, rootPath.length)
    let moduleRoot : RootModuleFile = new RootModuleFile(projectName)
    
    if(await !moduleRoot.createBurstModule())
        vscode.window.showErrorMessage("Error Writing Burst Module Root For Project " + projectName)
    else
        vscode.window.showInformationMessage("Burst Root Module Successfully created for project " + projectName)
}