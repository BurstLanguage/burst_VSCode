'use strict';
import * as vscode from 'vscode';
import {FileType} from '../src/fileType';


export class ModuleFile{
	fileHandle : vscode.Uri;
	fileType : FileType;
	filePath : String;
	fileName : String;
	constructor(fileHandle: vscode.Uri, FileType: FileType, fileName?: String){
		this.fileHandle = fileHandle;
		this.filePath = fileHandle.path
		this.fileType = FileType;
		if(fileName != ""){
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