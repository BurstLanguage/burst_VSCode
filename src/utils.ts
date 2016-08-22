'use strict';
export class Unbox<T>{
	data: T;
	async then(thenable: Thenable<T>) {
		this.data = await thenable;
	}
}