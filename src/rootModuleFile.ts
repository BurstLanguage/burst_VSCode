'use strict';
import * as vscode from 'vscode';
import * as IO from "fs"
import {ModuleFile} from '../src/moduleFile';
import {FileType} from "../src/fileType";
import {serialize} from "serializer.ts/Serializer";

let gFiles: ModuleFile[] = []
var gprojectName: String;
var grootPath: string
var gmoduleFiles: ModuleFile[];

export class RootModuleFile {
	projectName: String;
	rootPath: string
	moduleFiles: ModuleFile[];

	constructor(project: String) {
		gprojectName = project;
		this.projectName = project;

	}

	async createBurstModule(): Promise<boolean> {
		let pfiles = IO.readdir(vscode.workspace.rootPath, async function (err, files) {
			if (err)
				return;
			filterFiles(files)
			await writeFileAsync()
		});
		if (gFiles.length == 0)
			console.log("Empty");
		return true;

	}

}

async function writeFileAsync(): Promise<boolean> {
	gmoduleFiles = gFiles;
	grootPath = vscode.workspace.rootPath + "\\" + gprojectName + ".json";

	if (IO.exists(grootPath), existsCallback) {
		IO.unlink(grootPath)
	}

	let pfile: Thenable<vscode.TextDocument> = vscode.workspace.openTextDocument(vscode.Uri.parse("untitled:" + grootPath));
	if (!pfile.then)
		return false;
	let file: vscode.TextDocument = await pfile;
	if (!file)
		return false;

	let obj = new RootModuleFile(gprojectName);
	obj.moduleFiles = gmoduleFiles;
	obj.projectName = gprojectName;
	obj.rootPath = grootPath;
	IO.writeFile(file.uri.fsPath, JSON.stringify(obj));
	return true;
}

function existsCallback(exists: boolean) {
	if (exists) {
		vscode.window.showInformationMessage("File Exists");
		IO.unlink(grootPath)
	}
	else {
		vscode.window.showInformationMessage("File Does Not Exist");
	}
}

function filterFiles(files: string[]) {
	var idx: number = 0;
	let rootPath: String = vscode.workspace.rootPath
	let projectName: String = rootPath.substring(rootPath.lastIndexOf("\\") + 1, rootPath.length)
	gFiles = [];
	for (idx = 0; idx < files.length; idx++) {
		let name: String = files[idx].substring(
			files[idx].lastIndexOf("\\") + 1,
			files[idx].lastIndexOf(".")
		); // get file name
		if (files[idx].endsWith(".burst")) {
			let file: ModuleFile = new ModuleFile(vscode.Uri.parse(files[idx]),
				FileType.Source
				, name
			);
			gFiles[idx] = file;
		}
		else {
			//TODO(06needhamt) Handle Resource Files
			if (files[idx] == projectName + ".json")
				continue
			let file: ModuleFile = new ModuleFile(vscode.Uri.parse(files[idx]),
				FileType.Metadata,
				name
			);
			gFiles[idx] = file;
		}
		idx++;
	}
}
async function readDirCallback(err: NodeJS.ErrnoException, files: string[]) {
	console.log("Finding Project Files")
}
