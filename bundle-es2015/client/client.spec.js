import * as Contensis from '../index';
import { ClientConfig } from './client-config';
const Zengenti = { Contensis };
const global = window || this;
describe('Contensis Client', function () {
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
    it('Zengenti exists', () => {
        expect(Zengenti).toBeDefined();
    });
    it('Contensis exists', () => {
        expect(Zengenti.Contensis).toBeDefined();
    });
    it('Contensis Client exists', () => {
        expect(Zengenti.Contensis.Client).toBeDefined();
    });
    it('Contensis Client create exists', () => {
        expect(Zengenti.Contensis.Client.create).toBeDefined();
    });
    it('Static Initial Default Settings', () => {
        let defaultSettings = new ClientConfig(null, null);
        expect(defaultSettings.projectId).toBeNull();
        expect(defaultSettings.rootUrl).toBeNull();
        expect(defaultSettings.language).toBeNull();
        expect(defaultSettings.versionStatus).toEqual('published');
        expect(defaultSettings.pageSize).toEqual(25);
        expect(defaultSettings.responseHandler).toBeNull();
    });
    it('Static Settable Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-fr',
            versionStatus: 'latest',
            accessToken: 'XXXXXX',
            pageSize: 50,
            responseHandler: {}
        });
        expect(Zengenti.Contensis.Client.defaultClientConfig.projectId).toEqual('myProject');
        expect(Zengenti.Contensis.Client.defaultClientConfig.rootUrl).toEqual('http://my-website.com');
        expect(Zengenti.Contensis.Client.defaultClientConfig.language).toEqual('fr-fr');
        expect(Zengenti.Contensis.Client.defaultClientConfig.versionStatus).toEqual('latest');
        expect(Zengenti.Contensis.Client.defaultClientConfig.pageSize).toEqual(50);
        expect(Zengenti.Contensis.Client.defaultClientConfig.accessToken).toEqual('XXXXXX');
        expect(Zengenti.Contensis.Client.defaultClientConfig.responseHandler).toEqual({});
    });
    it('Instance Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-fr',
            versionStatus: 'latest',
            pageSize: 50,
            accessToken: 'YYYYYY'
        });
        let client = Zengenti.Contensis.Client.create();
        let params = client.getParams();
        expect(params.projectId).toEqual('myProject');
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.language).toEqual('fr-fr');
        expect(params.versionStatus).toEqual('latest');
        expect(params.pageSize).toEqual(50);
        expect(params.accessToken).toEqual('YYYYYY');
        expect(params.responseHandler).toBeNull();
    });
    it('Instance Settable Settings', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            pageSize: 100,
            accessToken: 'ZZZZZZ',
            responseHandler: {}
        });
        let params = client.getParams();
        expect(params.projectId).toEqual('myProject');
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.language).toBeNull();
        expect(params.versionStatus).toEqual('published');
        expect(params.pageSize).toEqual(100);
        expect(params.accessToken).toEqual('ZZZZZZ');
        expect(params.responseHandler).toEqual({});
    });
});
