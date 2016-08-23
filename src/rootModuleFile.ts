'use strict';
import * as vscode from 'vscode';
import * as IO from "fs"
import {ModuleFile} from '../src/moduleFile';
import {ResourceFile} from '../src/resourceFile'
import {ResourceType} from '../src/resourceType'
import {FileType} from "../src/fileType";
import {serialize} from "serializer.ts/Serializer";

let gFileObjects: ModuleFile[] = []
var gfiles: string[];
var gInstance: RootModuleFile;

export class RootModuleFile {
	projectName: String;
	rootPath: string
	moduleFiles: ModuleFile[];

	constructor(project: String) {
		this.projectName = project;

	}

	async createBurstModule(): Promise<boolean> {
		gInstance = this
		let pfiles = IO.readdir(vscode.workspace.rootPath, async function (err, files) {
			if (err)
				return;
			gfiles = files;
			gInstance.filterFiles(gfiles)
			gInstance.writeFileAsync()
		});
		return true;

	}

	async writeFileAsync(): Promise<boolean> {
		this.moduleFiles = gFileObjects;
		this.rootPath = vscode.workspace.rootPath + "\\" + this.projectName + ".json";

		if (IO.exists(this.rootPath), this.existsCallback) {
			IO.unlink(this.rootPath)
		}

		let pfile: Thenable<vscode.TextDocument> = vscode.workspace.openTextDocument(vscode.Uri.parse("untitled:" + this.rootPath));
		if (!pfile.then)
			return false;
		let file: vscode.TextDocument = await pfile;
		if (!file)
			return false;

		let obj = new RootModuleFile(this.projectName);
		obj.moduleFiles = this.moduleFiles;
		obj.projectName = this.projectName;
		obj.rootPath = this.rootPath;
		IO.writeFile(file.uri.fsPath, JSON.stringify(obj));
		return true;
	}

	existsCallback(exists: boolean) {
		if (exists) {
			vscode.window.showInformationMessage("File Exists");
			IO.unlink(this.rootPath)
		}
		else {
			vscode.window.showInformationMessage("File Does Not Exist");
		}
	}

	filterFiles(files: string[]) {
		var idx: number = 0;
		let rootPath: String = vscode.workspace.rootPath
		let projectName: String = rootPath.substring(rootPath.lastIndexOf("\\") + 1, rootPath.length)
		gFileObjects = [];
		for (idx = 0; idx < files.length; idx++) {
			let name: string = files[idx].substring(
				files[idx].lastIndexOf("\\") + 1,
				files[idx].lastIndexOf(".")
			); // get file name
			if (files[idx].endsWith(".burst")) {
				let file: ModuleFile = new ModuleFile(vscode.Uri.parse(files[idx]),
					FileType.Source,
					this,
					name
				);
				gFileObjects[idx] = file;
			}
			else {
				if (files[idx] == projectName + ".json")
					continue
				if (this.isFileAResource(files[idx], name)) {
					let file: ResourceFile = new ResourceFile(vscode.Uri.parse(files[idx]),
						FileType.Resource,
						this,
						name
					);
					gFileObjects[idx] = file;
				}
				else {
					let file: ModuleFile = new ModuleFile(vscode.Uri.parse(files[idx]),
						FileType.Metadata,
						this,
						name
					);
					gFileObjects[idx] = file;
				}

			}
			idx++;
		}
	}
	async readDirCallback(err: NodeJS.ErrnoException, files: string[]) {
		console.log("Finding Project Files")
	}

	isFileAResource(filePath: string, fileName: string): Boolean {
		let temp = new ResourceFile(vscode.Uri.parse(filePath),
			FileType.Resource, this, fileName)
		return temp.enumerateResourceType() != ResourceType.Unknown;
	}
}


