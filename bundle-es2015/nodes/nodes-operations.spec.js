import * as Contensis from '../index';
const Zengenti = { Contensis };
const global = window || this;
describe('Nodes Operations', () => {
    beforeEach(() => {
        Zengenti.Contensis.Client.defaultClientConfig = null;
        spyOn(global, 'fetch').and.callFake((...args) => {
            return new Promise((resolve, reject) => {
                resolve({
                    json: () => {
                        return {};
                    }
                });
            });
        });
    });
    describe('Get root node', () => {
        fit('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US', Object({
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
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1', Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
    });
});
