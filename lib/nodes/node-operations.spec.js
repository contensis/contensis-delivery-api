"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
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
        it('Get Live Version', () => {
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
            client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US&versionStatus=latest', Object({
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
            client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/nodes/root?language=fr-FR', Object({
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
            client.nodes.getRoot({ language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/nodes/root?depth=2&entryFields=title&entryLinkDepth=1&language=de', Object({
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
            client.nodes.getRoot({ language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/nodes/root', Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
    });
    describe('Get node by path', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`, Object({
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
            client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=fr-FR`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.get({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`, Object({
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
            client.nodes.get({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?depth=2&entryFields=title&entryLinkDepth=1&language=de`, Object({
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
            client.nodes.get({ id: '', language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
    });
    describe('Get node by id', () => {
        let nodePath = '/node1/node2';
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`, Object({
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
            client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=fr-FR`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.get({
                path: nodePath
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`, Object({
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
            client.nodes.get({ path: nodePath, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?depth=2&entryFields=title&entryLinkDepth=1&language=de`, Object({
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
            client.nodes.get({ id: '', language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
    });
});
