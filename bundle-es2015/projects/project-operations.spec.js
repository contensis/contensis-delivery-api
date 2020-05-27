import * as Contensis from '../index';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Project Operations', function () {
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
    it('Get with specified root url', () => {
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
    it('Get without root utl', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            accessToken: 'XXXXXX'
        });
        client.project.get();
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('/api/delivery/projects/myProject', Object({
            method: 'GET',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
});
