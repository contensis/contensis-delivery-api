"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const contensis_core_api_1 = require("contensis-core-api");
const cross_fetch_1 = require("cross-fetch");
const FreeTextSearchOperatorType_1 = require("contensis-core-api/lib/models/search/FreeTextSearchOperatorType");
const specs_utils_spec_1 = require("../specs-utils.spec");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Entry Operations', function () {
    describe('Get entry', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let entry = await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(entry).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'latest',
                accessToken: 'XXXXXX'
            });
            await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US&versionStatus=latest',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('Get Default French Version', async () => {
            Zengenti.Contensis.Client.configure({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'fr-FR',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            let client = Zengenti.Contensis.Client.create();
            await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?language=fr-FR',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('Get Specified French Version', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'fr-FR',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?language=fr-FR',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.get({ id: '1', language: 'de', linkDepth: 99, fields: ['title'], fieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?fieldLinkDepths=%7B%22linkField%22%3A1%7D&fields=title&language=de&linkDepth=99',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)(),
            ]);
        });
        it('Get Live Version with minimal options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.get({ id: '1', language: '', linkDepth: 0, fields: [] });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('Get Live Version with no options', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            await client.entries.get({ id: '1' });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries/1',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
    });
    describe('List entries', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('List By Content Type', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list('cheese');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Live Version', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list('cheese');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            await client.entries.list('cheese');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=latest',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List French Version', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'fr-FR',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            await client.entries.list('cheese');
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List with all options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 }, language: 'en-GB', linkDepth: 1, order: ['title'], fields: ['title'], fieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?fieldLinkDepths=%7B%22linkField%22%3A1%7D&fields=title&language=en-GB&linkDepth=1&order=title&pageIndex=5&pageSize=100',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)(),
            ]);
        });
        it('List with minimal options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ contentTypeId: '', linkDepth: 0, language: '', order: [], fields: [], pageOptions: {} });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries?language=en-US&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List with no options', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            await client.entries.list({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries?pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Paging Options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=5&pageSize=100',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Specified French Version', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR' });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Specified French Version with Paging Options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=5&pageSize=100',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
        it('List Specified French Version with Paging Options but no Content Type', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await client.entries.list({ language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/entries?language=fr-FR&pageIndex=5&pageSize=100',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
        });
    });
    describe('Search entries', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('Do Search - simple', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
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
            await client.entries.search(query);
            expect(global.fetch).toHaveBeenCalled();
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search - multiple', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
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
            await client.entries.search(query);
            expect(global.fetch).toHaveBeenCalled();
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search with a link depth', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
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
            await client.entries.search(query, 99);
            expect(global.fetch).toHaveBeenCalled();
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where), linkDepth: 99 }));
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search with all options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorName',
                    startsWith: 'W'
                }];
            let fieldLinkDepths = { linkField: 1 };
            let aggregations = { tags: { field: 'testField' } };
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where,
                fields: ['title'],
                fieldLinkDepths,
                aggregations
            };
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where), linkDepth: 99, fieldLinkDepths: JSON.stringify(fieldLinkDepths), aggregations: JSON.stringify(aggregations) }));
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using the default Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let query = new Contensis.Query();
            await client.entries.search(query);
            expect(global.fetch).toHaveBeenCalled();
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                pageIndex: 0,
                pageSize: 20,
                where: JSON.stringify([])
            });
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using a Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', 'W'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                fields: ['title'],
                linkDepth: 99,
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorName',
                        startsWith: 'W'
                    }])
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search with aggregations using a Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let aggregations = { tags: { field: 'testField' } };
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', 'W'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            query.aggregations = aggregations;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                fields: ['title'],
                linkDepth: 99,
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorName',
                        startsWith: 'W'
                    }]),
                aggregations: JSON.stringify(aggregations)
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search for distanceWithin', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
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
            await client.entries.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search for distanceWithin using a Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let query = new Contensis.Query(Contensis.Op.distanceWithin('authorLocation', 52.377, -2.749, '10mi'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
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
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search for non-fuzzy freeText', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorLocation',
                    freeText: {
                        term: 'term1'
                    }
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            await client.entries.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search for fuzzy freeText', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorLocation',
                    freeText: {
                        term: 'term1',
                        fuzzy: true,
                        operator: 'or'
                    }
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            await client.entries.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search non-fuzzy freeText using a Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let query = new Contensis.Query(Contensis.Op.freeText('description', 'term1'));
            query.orderBy = Contensis.OrderBy.asc('description');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'description'
                    }]),
                where: JSON.stringify([{
                        field: 'description',
                        freeText: {
                            term: 'term1',
                            fuzzy: false,
                            operator: FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.And
                        }
                    }]),
                fields: ['title'],
                linkDepth: 99
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search for fuzzy freeText using a Query instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let query = new Contensis.Query(Contensis.Op.freeText('description', 'term1', true, FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.Or));
            query.orderBy = Contensis.OrderBy.asc('description');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'description'
                    }]),
                where: JSON.stringify([{
                        field: 'description',
                        freeText: {
                            term: 'term1',
                            fuzzy: true,
                            operator: FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.Or
                        }
                    }]),
                fields: ['title'],
                linkDepth: 99
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search with aggregations using a ZenqlQuery instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let zenqlQuery = new Contensis.ZenqlQuery('sys.contentTypeId = plant and sys.version.created >= startOfWeek()');
            let aggregations = { tags: { field: 'testField' } };
            zenqlQuery.fields = ['title'];
            zenqlQuery.pageIndex = 1;
            zenqlQuery.pageSize = 50;
            zenqlQuery.aggregations = aggregations;
            await client.entries.search(zenqlQuery, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                aggregations: JSON.stringify(aggregations),
                fields: ['title'],
                linkDepth: 99,
                pageIndex: 1,
                pageSize: 50,
                zenql: zenqlQuery.zenql
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using a ZenqlQuery instance', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let zenqlQuery = new Contensis.ZenqlQuery('sys.contentTypeId = plant and sys.version.created >= startOfWeek()');
            zenqlQuery.fields = ['title'];
            zenqlQuery.pageIndex = 1;
            zenqlQuery.pageSize = 50;
            await client.entries.search(zenqlQuery, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                fields: ['title'],
                linkDepth: 99,
                pageIndex: 1,
                pageSize: 50,
                zenql: zenqlQuery.zenql
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using a ZenqlQuery string', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let zenqlQueryString = 'sys.contentTypeId = plant and sys.version.created >= startOfWeek()';
            await client.entries.search(zenqlQueryString, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                linkDepth: 99,
                pageIndex: 0,
                pageSize: 20,
                zenql: zenqlQueryString
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
    });
    describe('Entry Operations in IE browser', function () {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
            global.document.documentMode = 11;
        });
        it('Do Search using an object with all options and url = 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let orderBy = [{
                    asc: 'authorName'
                }];
            // use string with length = 1792
            let where = [{
                    field: 'authorName',
                    startsWith: 'nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW'
                }];
            let aggregations = { tags: { field: 'testField' } };
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where,
                fields: ['title'],
                aggregations
            };
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { aggregations: JSON.stringify(aggregations), orderBy: JSON.stringify(orderBy), where: JSON.stringify(where), linkDepth: 99 }));
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using an object with all options and url > 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            let orderBy = [{
                    asc: 'authorName'
                }];
            // use string with length = 1793
            let where = [{
                    field: 'authorName',
                    startsWith: '1nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW'
                }];
            let aggregations = { tags: { field: 'testField' } };
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where,
                fields: ['title'],
                fieldLinkDepths: { linkField: 1 },
                aggregations,
            };
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                fieldLinkDepths: JSON.stringify(query.fieldLinkDepths),
                linkDepth: 99
            });
            delete query.fieldLinkDepths; // we don't want this in the POST body
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('POST', 'application/json; charset=utf-8', false, JSON.stringify(query))
            ]);
        });
        it('Do Search using a Query instance and url = 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            // use string with length = 1792
            const startsWithText = 'nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW';
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
            let aggregations = { tags: { field: 'testField' } };
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            query.aggregations = aggregations;
            await client.entries.search(query, 99);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                aggregations: JSON.stringify(aggregations),
                fields: ['title'],
                linkDepth: 99,
                pageIndex: 1,
                pageSize: 50,
                where: JSON.stringify([{
                        field: 'authorName',
                        startsWith: startsWithText
                    }]),
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }])
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('GET', 'application/json; charset=utf-8')
            ]);
        });
        it('Do Search using a Query instance and url > 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            // use string with length = 1793
            const startsWithText = '1nXX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW';
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.fields = ['title'];
            query.pageIndex = 1;
            query.pageSize = 50;
            query.aggregations = { tags: { field: 'testField' } };
            await client.entries.search(query, 99);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)('POST', 'application/json; charset=utf-8', false, JSON.stringify(query))
            ]);
        });
    });
});
