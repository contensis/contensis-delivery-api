import * as Contensis from '../index';

import fetch from 'cross-fetch';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Content Type Operations', function () {

	beforeEach(() => {
		spyOn(global, 'fetch').and.callFake((...args) => {
			return new Promise((resolve, reject) => {
				resolve({
					json: () => {
						return {
							items: []
						};
					}
				} as unknown as Response);
			});
		});

		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});
	});

	it('Get', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});
		client.contentTypes.get('movie');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/movie', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});
});
