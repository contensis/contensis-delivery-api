export interface Editor {
	id: string;
	instructions: {
		[key: string]: string;
	};
	properties: {
		[key: string]: any;
	};
}
