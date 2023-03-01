import * as Contensis from '../index';
import { toQuery } from 'contensis-core-api';
import { getDefaultFetchRequestForAccessToken, setDefaultSpyForAccessToken } from '../specs-utils.spec';

import fetch from 'cross-fetch';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Link Resolver', function () {

	function getQueryString(language: string, ...ids: number[]) {
		let query = {
			pageIndex: 0,
			pageSize: ids.length,
			where: JSON.stringify([{
				or: ids.map(id => {
					return {
						and: [
							{ field: 'sys.id', equalTo: id },
							{ field: 'sys.language', equalTo: language },
							{ field: 'sys.versionStatus', equalTo: 'published' }
						]
					};
				})
			}])
		};
		return toQuery(query);
	}

	beforeEach(() => {
		setDefaultSpyForAccessToken(global);

		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});
	});

	it('should resolve single entry with single entry property', async () => {
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

		let entry = await client.entries.resolve(testEntry);

		let expectedQueryString = getQueryString('en-GB', 99);

		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			getDefaultFetchRequestForAccessToken('GET', 'application/json; charset=utf-8')
		]);

		expect(entry).not.toBeNull();
	});

	it('should resolve single entry with multiple entry property', async () => {
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

		let entry = await client.entries.resolve(testEntry);
		let expectedQueryString = getQueryString('en-GB', 100, 101, 102);

		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			getDefaultFetchRequestForAccessToken('GET', 'application/json; charset=utf-8')
		]);

		expect(entry).not.toBeNull();
	});

	it('should resolve array of entries', async () => {
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

		let entries = await client.entries.resolve(testEntries);
		let expectedQueryString = getQueryString('en-GB', 100, 101, 102);

		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			getDefaultFetchRequestForAccessToken('GET', 'application/json; charset=utf-8')
		]);

		expect(entries).not.toBeNull();
		expect(entries.length).toBe(3);
	});

	it('should resolve paged list of entries', async () => {
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

		let entries = await client.entries.resolve(testEntries);
		let expectedQueryString = getQueryString('en-GB', 100, 101, 102);

		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			getDefaultFetchRequestForAccessToken('GET', 'application/json; charset=utf-8')
		]);

		expect(entries).not.toBeNull();
		expect(entries.items.length).toBe(3);
	});

	it('should resolve single image', async () => {
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

		let entry = await client.entries.resolve(testEntry);
		let expectedQueryString = getQueryString('en-GB', 99);

		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			getDefaultFetchRequestForAccessToken('GET', 'application/json; charset=utf-8')
		]);

		expect(entry).not.toBeNull();
	});
});
