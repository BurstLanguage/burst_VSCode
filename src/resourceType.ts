'use strict';
export enum ResourceType{
	PlainText = 1 << 1,
	Image = 1 << 2,
	Audio = 1 << 3,
	Binary = 1 << 4,
	ResourceScript = 1 << 5,
	Icon = 1 << 6,
	Unknown = 1 << 32,
}