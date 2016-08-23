'use strict';
export enum ResourceType{
	PlainText = 1 << 0,
	Image = 1 << 1,
	Audio = 1 << 2,
	Binary = 1 << 3,
	ResourceScript = 1 << 4,
	Icon = 1 << 5,
	Unknown = 1 << 32,
}