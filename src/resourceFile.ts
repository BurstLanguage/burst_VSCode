import * as vscode from 'vscode';
import * as IO from "fs"
import {ModuleFile} from '../src/moduleFile';
import {FileType} from '../src/fileType';
import {RootModuleFile} from '../src/rootModuleFile'
import {ResourceType} from '../src/resourceType';
import {serialize} from 'serializer.ts/Serializer';

export class ResourceFile extends ModuleFile {
	resourceType: ResourceType;

	constructor(fileHandle: vscode.Uri, fileType: FileType,
		moduleRoot: RootModuleFile, fileName?: string) {
		if (fileType != FileType.Resource)
			Error("Trying To Construct a ResourceFile object \
			with a file that is not a resource this may have \
			unintended effects")
		super(fileHandle, fileType, moduleRoot, fileName)
		this.resourceType = this.enumerateResourceType();

	}
	enumerateResourceType(): ResourceType {
		let extension: string = this.fileHandle.path.substring(
			this.fileHandle.path.lastIndexOf(".") + 1,
			this.fileHandle.path.length); // get file extension
		
		if(extension == "txt" || extension == "xml")
			return ResourceType.PlainText;
		else if(extension == "bmp" || extension == "jpg" || extension == "jpeg" || 
		extension == "png" || extension == "tiff" ||  extension == "psd" || 
		extension == "tga" || extension == "gif")
			return ResourceType.Image;
		else if( extension == "mp3" || extension == "wav" || extension == "ogg" || 
		extension == "flac" || extension == "wma", extension == "m4a")
			return ResourceType.Audio;
		else if (extension == "bin" || extension == "dat")
			return ResourceType.Binary;
		else if(extension == "ico")
			return ResourceType.Icon;
		else if( extension == "rc" || extension == "resx")
			return ResourceType.ResourceScript;
		else
			return ResourceType.Unknown;
		}
}