import * as Contensis from '../index';

const Zengenti = { Contensis };

const global = window || this;

describe('Link Resolver', function () {

	function request(language: string, ...ids: number[]) {
		return Object({
			method: 'POST',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				pageIndex: 0,
				pageSize: ids.length,
				where: [{
					or: ids.map(id => {
						return {
							and: [
								{ field: 'sys.id', equalTo: id },
								{ field: 'sys.language', equalTo: language },
								{ field: 'sys.versionStatus', equalTo: 'published' }
							]
						};
					})
				}]
			})
		});
	}

	beforeEach(() => {
		Zengenti.Contensis.Client.defaultClientConfig = null;

		spyOn(global, 'fetch').and.callFake((...args) => {
			return new Promise((resolve, reject) => {
				resolve({
					json: () => {
						return {
							items: []
						};
					}
				});
			});
		});
	});

	it('should resolve single entry with single entry property', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntry: any = {
			entry: {
				sys: { id: 99, language: 'en-GB' }
			}
		};

		client.entries.resolve(testEntry);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			request('en-GB', 99)
		);

	});

	it('should resolve single entry with multiple entry property', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntry: any = {
			entries: [
				{ sys: { id: 100, language: 'en-GB' } },
				{ sys: { id: 101, language: 'en-GB' } },
				{ sys: { id: 102, language: 'en-GB' } }
			]
		};

		client.entries.resolve(testEntry);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			request('en-GB', 100, 101, 102)
		);

	});

	it('should resolve array of entries', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntries: any = [
			{ entry: { sys: { id: 100, language: 'en-GB' } } },
			{ entry: { sys: { id: 101, language: 'en-GB' } } },
			{ entry: { sys: { id: 102, language: 'en-GB' } } }
		];

		client.entries.resolve(testEntries);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			request('en-GB', 100, 101, 102)
		);

	});

	it('should resolve paged list of entries', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntries: any = {
			pageIndex: 99,
			pageSize: 10,
			totalCount: 1000,
			items: [
				{ entry: { sys: { id: 100, language: 'en-GB' } } },
				{ entry: { sys: { id: 101, language: 'en-GB' } } },
				{ entry: { sys: { id: 102, language: 'en-GB' } } }
			]
		};

		client.entries.resolve(testEntries);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			request('en-GB', 100, 101, 102)
		);

	});

	it('should resolve single image', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntry: any = {
			image: {
				asset: { sys: { id: 99, language: 'en-GB' } }
			}
		};

		client.entries.resolve(testEntry);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			request('en-GB', 99)
		);

	});
});
