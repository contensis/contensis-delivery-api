import * as Contensis from '../index';

const Zengenti = { Contensis };

const global = window || this;

describe('Project Operations', function () {

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

	it('Get', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});
		client.project.get();
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});
});
