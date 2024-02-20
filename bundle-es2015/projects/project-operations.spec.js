import * as Contensis from '../index';
import { getDefaultFetchRequestForAccessToken, setDefaultSpyForAccessToken } from '../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Project Operations', function () {
    beforeEach(() => {
        setDefaultSpyForAccessToken(global);
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
            getDefaultFetchRequestForAccessToken()
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
            getDefaultFetchRequestForAccessToken(null, null, true)
        ]);
        expect(project).not.toBeNull();
    });
});
