"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const contensis_core_api_1 = require("contensis-core-api");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
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
        return (0, contensis_core_api_1.toQuery)(query);
    }
    beforeEach(() => {
        (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
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
        let testEntry = {
            entry: {
                sys: { id: 99, language: 'en-GB' }
            }
        };
        let entry = await client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
        ]);
        expect(entry).not.toBeNull();
    });
    it('should resolve single entry with multiple entry property', async () => {
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
        let entry = await client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
        ]);
        expect(entry).not.toBeNull();
    });
    it('should resolve array of entries', async () => {
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
        let entries = await client.entries.resolve(testEntries);
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
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
        let entries = await client.entries.resolve(testEntries);
        let expectedQueryString = getQueryString('en-GB', 100, 101, 102);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
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
        let testEntry = {
            image: {
                asset: { sys: { id: 99, language: 'en-GB' } }
            }
        };
        let entry = await client.entries.resolve(testEntry);
        let expectedQueryString = getQueryString('en-GB', 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
        ]);
        expect(entry).not.toBeNull();
    });
});
