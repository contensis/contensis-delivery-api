"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Project Operations', function () {
    beforeEach(() => {
        specs_utils_spec_1.setDefaultSpyForAccessToken(global);
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    it('Get with specified root url', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let project = await client.project.get();
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(project).not.toBeNull();
    });
    it('Get without root url', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            accessToken: 'XXXXXX'
        });
        let project = await client.project.get();
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            '/api/delivery/projects/myProject',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken(null, null, true)
        ]);
        expect(project).not.toBeNull();
    });
});
