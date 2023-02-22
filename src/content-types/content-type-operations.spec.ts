import * as Contensis from '../index';
import { ContentType } from 'contensis-core-api';
import { getDefaultAuthenticateUrl, getDefaultConfigForClientCredentials, getDefaultFetchRequestForAccessToken, getDefaultFetchRequestForClientCredentials, setDefaultSpyForAccessToken, setDefaultSpyForClientCredentials } from '../specs-utils.spec';
import fetch from 'cross-fetch';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Content Type Operations using access token', function () {

	beforeEach(() => {
		setDefaultSpyForAccessToken(global);

		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});
	});

	it('Get', async () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});
		let contentType = await client.contentTypes.get('movie');
		expect(global.fetch).toHaveBeenCalled();
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/movie',
			getDefaultFetchRequestForAccessToken()
		]);

		expect(contentType).not.toBeNull();
	});
});

describe('Content Type Operations using client credentials', function () {

	beforeEach(() => {
		setDefaultSpyForClientCredentials(global, {
			name: { 'en-GB': 'contentType1' }
		} as Partial<ContentType>);


		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});
	});

	it('Get', async () => {
		let client = Zengenti.Contensis.Client.create(getDefaultConfigForClientCredentials());

		let contentType = await client.contentTypes.get('movie');

		expect(global.fetch).toHaveBeenCalledTimes(2);
		expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
		expect((global.fetch as any).calls.mostRecent().args).toEqual([
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/movie',
			getDefaultFetchRequestForClientCredentials()
		]);

		expect(contentType).not.toBeNull();
		expect(contentType.name['en-GB']).toEqual('contentType1');
	});
});
