"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Content Type Operations using access token', function () {
    beforeEach(() => {
        (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
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
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/contentTypes/movie',
            (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
        ]);
        expect(contentType).not.toBeNull();
    });
});
describe('Content Type Operations using client credentials', function () {
    beforeEach(() => {
        (0, specs_utils_spec_1.setDefaultSpyForClientCredentials)(global, {
            name: { 'en-GB': 'contentType1' }
        });
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    it('Get', async () => {
        let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForClientCredentials)());
        let contentType = await client.contentTypes.get('movie');
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/contentTypes/movie',
            (0, specs_utils_spec_1.getDefaultFetchRequestForClientCredentials)()
        ]);
        expect(contentType).not.toBeNull();
        expect(contentType.name['en-GB']).toEqual('contentType1');
    });
});
