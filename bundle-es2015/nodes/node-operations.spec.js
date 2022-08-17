import * as Contensis from '../index';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Nodes Operations', () => {
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
        it('Get Live Version with no options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getRoot();
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
    describe('Get node by id', () => {
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
            client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id or path', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.get('')).toThrowError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.get({})).toThrowError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node by path', () => {
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
            client.nodes.get({ path: nodePath, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, allowPartialMatch: true });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?allowPartialMatch=true&depth=2&entryFields=title&entryLinkDepth=1&language=de`, Object({
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
            client.nodes.get({ path: nodePath, language: '', depth: 0, entryFields: [], entryLinkDepth: 0, allowPartialMatch: false });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.get({ path: nodePath });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
    });
    describe('Get node by entry', () => {
        let entryId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let entry = {
            sys: {
                id: entryId
            }
        };
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`, Object({
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
            client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US&versionStatus=latest`, Object({
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
            client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=fr-FR`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with entry', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry(entry);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with all options and entry id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry({ entryId: entryId, language: 'de', entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with all options and entry', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry({ entry: entry, language: 'de', entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and entry id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry({ entryId: entryId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and entry', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getByEntry({ entry });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid entry id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getByEntry('')).toThrowError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid entry or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getByEntry({})).toThrowError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node children', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`, Object({
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
            client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=fr-FR`, Object({
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
            client.nodes.getChildren({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`, Object({
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
            client.nodes.getChildren({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?entryFields=title&entryLinkDepth=1&language=de`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getChildren({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getChildren({ node: { id: nodeId }, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getChildren({ node: { id: nodeId } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getChildren('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getChildren({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node parent', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`, Object({
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
            client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=fr-FR`, Object({
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
            client.nodes.getParent({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`, Object({
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
            client.nodes.getParent({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?depth=2&entryFields=title&entryLinkDepth=1&language=de`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getParent({ id: nodeId, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getParent({ node: { id: nodeId }, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getParent({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getParent('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getParent({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestor at level', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=en-US&startLevel=1`, Object({
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
            client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=en-US&startLevel=1&versionStatus=latest`, Object({
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
            client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=fr-FR&startLevel=1`, Object({
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
            client.nodes.getAncestorAtLevel({ node, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=en-US&startLevel=1`, Object({
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
            client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?depth=2&entryFields=title&entryLinkDepth=1&language=de&startLevel=1`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestorAtLevel({ node, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestorAtLevel({ node, startLevel: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestor`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getAncestorAtLevel({ id: '', startLevel: 0 })).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getAncestorAtLevel({ node: {}, startLevel: 0 })).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestors', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`, Object({
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
            client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=fr-FR`, Object({
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
            client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`, Object({
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
            client.nodes.getAncestors({ id: nodeId, startLevel: 1, language: 'de', entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?entryFields=title&entryLinkDepth=1&language=de&startLevel=1`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestors({ id: nodeId, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestors({ node, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getAncestors('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getAncestors({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node siblings', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`, Object({
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
            client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US&versionStatus=latest`, Object({
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
            client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=fr-FR`, Object({
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
            client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`, Object({
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
            client.nodes.getSiblings({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?entryFields=title&entryLinkDepth=1&language=de`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getSiblings({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with minimal options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            client.nodes.getSiblings({ node, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Get Live Version with no options and node', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(`http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings`, Object({
                method: 'GET',
                mode: 'cors',
                headers: {
                    'accessToken': 'XXXXXX'
                }
            }));
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getSiblings('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                language: 'en-US',
                versionStatus: 'published',
                accessToken: 'XXXXXX'
            });
            expect(() => client.nodes.getSiblings({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
});
