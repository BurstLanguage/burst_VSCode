'use strict';
import * as vscode from 'vscode';
import {FileType} from '../src/fileType';
import {RootModuleFile} from '../src/rootModuleFile'

export class ModuleFile{
	fileHandle : vscode.Uri;
	fileType : FileType;
	filePath : string;
	fileName : string;
	_moduleRoot : RootModuleFile
	constructor(fileHandle: vscode.Uri, FileType: FileType, moduleRoot: RootModuleFile,
	fileName?: string){
		if(moduleRoot == null || moduleRoot == undefined)
			Error("Invalid Module Root")
		this.fileHandle = fileHandle;
		this.filePath = fileHandle.path
		this.fileType = FileType;
		//this._moduleRoot = moduleRoot;
		if(fileName != "" && fileName != null && fileName != undefined){
			this.fileName = fileName
		}
		else{
			this.fileName = fileHandle.path.substring(
				fileHandle.path.lastIndexOf("\\") + 1,
				fileHandle.path.lastIndexOf(".")
			); // get file name
		}
	}
}