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
		moduleRoot: RootModuleFile, fileName?: String) {
		if (fileType != FileType.Resource)
			Error("Trying To Construct a ResourceFile object \
			with a file that is not a resource this may have \
			unintended effects")
		super(fileHandle, fileType, moduleRoot, fileName)
		this.resourceType = this.enumerateResourceType();

	}
	enumerateResourceType(): ResourceType {
		let extension: String = this.fileName.substring(
			this.fileName.lastIndexOf(".") + 1,
			this.fileName.length); // get file extension
		switch (extension) {
			case "txt", "xml":
				return ResourceType.PlainText;
			case "bmp", "jpg", "jpeg", "png", "tiff", "psd", "tga", "gif":
				return ResourceType.Image;
			case "mp3", "wav", "ogg", "flac", "wma", "m4a":
				return ResourceType.Audio;
			case "bin", "dat":
				return ResourceType.Binary;
			case "ico":
				return ResourceType.Icon;
			case "rc", "resx":
				return ResourceType.ResourceScript;
			default:
				return ResourceType.Unknown;
		}
	}
}