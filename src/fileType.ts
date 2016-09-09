'use strict';

export enum FileType{
	Project = 1 << 0,
	Resource = 1 << 1,
	Metadata = 1 << 2,
	Source = 1 << 3,
	Unknown = 1 << 32
}