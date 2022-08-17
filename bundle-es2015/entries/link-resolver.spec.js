import * as Contensis from '../index';
import { toQuery } from 'contensis-core-api';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Link Resolver', function () {
    function getQueryString(language, ...ids) {
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
        spyOn(global, 'fetch').and.callFake((...args) => {
            return new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    json: () => Promise.resolve({ items: [] }),
                    text: () => Promise.resolve(JSON.stringify({ items: [] }))
                });
            });
        });
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    it('should resolve single entry with single entry property', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let testEntry = {
            entry: {
                sys: { id: 99, language: 'en-GB' }
            }
        };
        client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`, Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }));
    });
    it('should resolve single entry with multiple entry property', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let testEntry = {
            entries: [
                { sys: { id: 100, language: 'en-GB' } },
                { sys: { id: 101, language: 'en-GB' } },
                { sys: { id: 102, language: 'en-GB' } }
            ]
        };
        client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`, Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }));
    });
    it('should resolve array of entries', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let testEntries = [
            { entry: { sys: { id: 100, language: 'en-GB' } } },
            { entry: { sys: { id: 101, language: 'en-GB' } } },
            { entry: { sys: { id: 102, language: 'en-GB' } } }
        ];
        client.entries.resolve(testEntries);
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`, Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }));
    });
    it('should resolve paged list of entries', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let testEntries = {
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
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`, Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }));
    });
    it('should resolve single image', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let testEntry = {
            image: {
                asset: { sys: { id: 99, language: 'en-GB' } }
            }
        };
        client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`, Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }));
    });
});
