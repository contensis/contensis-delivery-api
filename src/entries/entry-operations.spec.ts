import * as Contensis from '../index';
import { toQuery } from 'contensis-core-api';

import fetch from 'cross-fetch';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Entry Operations', function () {

	beforeEach(() => {
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

		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});
	});

	it('Get Live Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		client.entries.get('1');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Preview Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'latest',
			accessToken: 'XXXXXX'
		});
		client.entries.get('1');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US&versionStatus=latest', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Default French Version', () => {
		Zengenti.Contensis.Client.configure({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'fr-FR',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		let client = Zengenti.Contensis.Client.create();
		client.entries.get('1');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=fr-FR', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Specified French Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'fr-FR',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.get('1');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=fr-FR', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Live Version with all options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.get({ id: '1', language: 'de', linkDepth: 99, fields: ['title'] });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?fields=title&language=de&linkDepth=99', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Live Version with minimal options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.get({ id: '1', language: '', linkDepth: 0, fields: [] });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('Get Live Version with no options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});
		client.entries.get({ id: '1' });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1', Object({
			method: 'GET',
			mode: 'cors',
			headers: {
				'accessToken': 'XXXXXX'
			}
		}));
	});

	it('List By Content Type', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list('cheese');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));
	});

	it('List Live Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list('cheese');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List Preview Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'latest',
			accessToken: 'XXXXXX'
		});
		client.entries.list('cheese');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=latest',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List French Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'fr-FR',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list('cheese');
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List with all options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 }, language: 'en-GB', linkDepth: 1, order: ['title'], fields: ['title'] });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?fields=title&language=en-GB&linkDepth=1&order=title&pageIndex=5&pageSize=100',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List with minimal options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ contentTypeId: '', linkDepth: 0, language: '', order: [], fields: [], pageOptions: {} });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries?language=en-US&pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List with no options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});
		client.entries.list({});
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries?pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List Paging Options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 } });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=5&pageSize=100',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List Specified French Version', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR' });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List Specified French Version with Paging Options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=5&pageSize=100',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('List Specified French Version with Paging Options but no Content Type', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});
		client.entries.list({ language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries?language=fr-FR&pageIndex=5&pageSize=100',
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX'
				}
			}));

	});

	it('Do Search via the Client API', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'name'
		}, {
			desc: 'brewTypeCount'
		}];

		let where = [{
			field: 'brewTypeCount',
			greaterThan: 5
		}, {
			field: 'Origin',
			in: ['Peru', 'Columbia']
		}];

		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where
		};

		client.entries.search(query);
		expect(global.fetch).toHaveBeenCalled();

		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where)
		});

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));

	});

	it('Do Search via the Client API v2', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];

		let where = [{
			field: 'authorName',
			startsWith: 'W'
		}];

		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where
		};

		client.entries.search(query);
		expect(global.fetch).toHaveBeenCalled();

		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where)
		});

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,

			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));

	});

	it('Do Search via the Client API with a link depth', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];

		let where = [{
			field: 'authorName',
			startsWith: 'W'
		}];

		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where
		};

		client.entries.search(query, 99);
		expect(global.fetch).toHaveBeenCalled();

		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where),
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,

			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));

	});

	it('Do Search via the Client API with all options', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];
		let where = [{
			field: 'authorName',
			startsWith: 'W'
		}];
		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where,
			fields: ['title']
		};
		client.entries.search(query, 99);

		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where),
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));
	});

	it('Do Search via the Client API using the default Query instance', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let query = new Contensis.Query();
		client.entries.search(query);

		expect(global.fetch).toHaveBeenCalled();

		let expectedQueryString = toQuery({
			pageIndex: 0,
			pageSize: 20,
			where: JSON.stringify([])
		});

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'accessToken': 'XXXXXX',
				},
				mode: 'cors'
			}));

	});

	it('Do Search via the Client API using a Query instance', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let query = new Contensis.Query(Contensis.Op.startsWith('authorName', 'W'));
		query.orderBy = Contensis.OrderBy.asc('authorName');
		query.fields = ['title'];
		query.pageIndex = 1;
		query.pageSize = 50;
		client.entries.search(query, 99);

		let expectedQueryString = toQuery({
			pageIndex: 1,
			pageSize: 50,
			orderBy: JSON.stringify([{
				asc: 'authorName'
			}]),
			where: JSON.stringify([{
				field: 'authorName',
				startsWith: 'W'
			}]),
			fields: ['title'],
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalled();

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'accessToken': 'XXXXXX',
				},
				mode: 'cors'
			}));

	});

	it('Do Search via the Client API for distanceWithin', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];
		let where = [{
			field: 'authorLocation',
			distanceWithin: {
				lat: 52.377,
				lon: -2.749,
				distance: '10mi'
			}
		}];
		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where
		};

		client.entries.search(query);
		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where)
		});

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));
	});

	it('Do Search via the Client API for distanceWithin using a Query instance', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let query = new Contensis.Query(Contensis.Op.distanceWithin('authorLocation', 52.377, -2.749, '10mi'));
		query.orderBy = Contensis.OrderBy.asc('authorName');
		query.fields = ['title'];
		query.pageIndex = 1;
		query.pageSize = 50;
		client.entries.search(query, 99);

		let expectedQueryString = toQuery({
			pageIndex: 1,
			pageSize: 50,
			orderBy: JSON.stringify([{
				asc: 'authorName'
			}]),
			where: JSON.stringify([{
				field: 'authorLocation',
				distanceWithin: {
					lat: 52.377,
					lon: -2.749,
					distance: '10mi'
				}
			}]),
			fields: ['title'],
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));
	});
});

describe('Entry Operations in IE browser', function () {

	beforeEach(() => {
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

		Zengenti.Contensis.Client.defaultClientConfig = null;
		Zengenti.Contensis.Client.configure({
			fetchFn: global.fetch
		});

		global.document.documentMode = 11;
	});

	it('Do Search via the Client API with all options and  URL=2083', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];

		// use string with length = 1860
		let where = [{
			field: 'authorName',
			// tslint:disable-next-line:max-line-length
			startsWith: 'nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL'
		}];
		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where,
			fields: ['title']
		};
		client.entries.search(query, 99);

		let expectedQueryString = toQuery({
			...query,
			orderBy: JSON.stringify(orderBy),
			where: JSON.stringify(where),
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}));
	});

	it('Do Search via the Client API with all options and url > 2083', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		let orderBy = [{
			asc: 'authorName'
		}];

		// use string with length = 1861
		let where = [{
			field: 'authorName',
			// tslint:disable-next-line:max-line-length
			startsWith: '1nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL'
		}];
		let query = {
			pageIndex: 1,
			pageSize: 50,
			orderBy,
			where,
			fields: ['title']
		};
		client.entries.search(query, 99);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99`,
			Object({
				method: 'POST',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(query)
			}));
	});

	it('Do Search via the Client API using a Query instance and url = 2083', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		// use string with length = 1860

		// tslint:disable-next-line:max-line-length
		const startsWithText = 'nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL';

		let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
		query.orderBy = Contensis.OrderBy.asc('authorName');
		query.fields = ['title'];
		query.pageIndex = 1;
		query.pageSize = 50;
		client.entries.search(query, 99);

		let expectedQueryString = toQuery({
			pageIndex: 1,
			pageSize: 50,
			orderBy: JSON.stringify([{
				asc: 'authorName'
			}]),
			where: JSON.stringify([{
				field: 'authorName',
				startsWith: startsWithText
			}]),
			fields: ['title'],
			linkDepth: 99
		});

		expect(global.fetch).toHaveBeenCalled();

		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
			Object({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'accessToken': 'XXXXXX',
				},
				mode: 'cors'
			}));

	});

	it('Do Search via the Client API using a Query instance and url > 2083', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			language: 'en-US',
			versionStatus: 'published',
			accessToken: 'XXXXXX'
		});

		// use string with length = 1861

		// tslint:disable-next-line:max-line-length
		const startsWithText = '1nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL';

		let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
		query.orderBy = Contensis.OrderBy.asc('authorName');
		query.fields = ['title'];
		query.pageIndex = 1;
		query.pageSize = 50;
		client.entries.search(query, 99);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			`http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99`,
			Object({
				method: 'POST',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(query)
			}));

	});

});
