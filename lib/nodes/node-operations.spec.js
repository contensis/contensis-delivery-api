"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Nodes Operations', () => {
    beforeEach(() => {
        specs_utils_spec_1.setDefaultSpyForAccessToken(global);
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    describe('Get root node', () => {
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US',
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US&versionStatus=latest',
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=fr-FR',
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getRoot({ language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de',
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let node = await client.nodes.getRoot();
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root',
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
    });
    describe('Get node by id', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let node = await client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Validate invalid node id or path', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.get('')).toThrowError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.get({})).toThrowError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node by path', () => {
        let nodePath = '/node1/node2';
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({
                path: nodePath
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({ path: nodePath, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 }, allowPartialMatch: true });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?allowPartialMatch=true&depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.get({ path: nodePath, language: '', depth: 0, entryFields: [], entryLinkDepth: 0, allowPartialMatch: false });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let node = await client.nodes.get({ path: nodePath });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
    });
    describe('Get node by entry', () => {
        let entryId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let entry = {
            sys: {
                id: entryId
            }
        };
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with entry', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getByEntry(entry);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options and entry id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getByEntry({ entryId: entryId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options and entry', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getByEntry({ entry: entry, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and entry id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getByEntry({ entryId: entryId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options and entry', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let node = await client.nodes.getByEntry({ entry });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Validate invalid entry id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getByEntry('')).toThrowError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid entry or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getByEntry({})).toThrowError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node children', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
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
            let nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getChildren({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getChildren({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getChildren({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getChildren({ node: { id: nodeId }, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let nodes = await client.nodes.getChildren({ node: { id: nodeId } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getChildren('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getChildren({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node parent', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getParent({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getParent({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getParent({ id: nodeId, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getParent({ node: { id: nodeId }, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let parentNode = await client.nodes.getParent({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(parentNode).not.toBeNull();
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getParent('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getParent({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestor at level', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
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
            let node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=fr-FR&startLevel=1`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de&startLevel=1`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getAncestorAtLevel({ id: '', startLevel: 0 })).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getAncestorAtLevel({ node: {}, startLevel: 0 })).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestors', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
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
            let nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getAncestors({ id: nodeId, startLevel: 1, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de&startLevel=1`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getAncestors({ id: nodeId, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getAncestors({ node, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let nodes = await client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getAncestors('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getAncestors({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node siblings', () => {
        let nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        let node = { id: nodeId };
        it('Get Live Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken('latest'));
            let nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US&versionStatus=latest`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
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
            let nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=fr-FR`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getSiblings({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getSiblings({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            let nodes = await client.nodes.getSiblings({ node, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            let client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            let nodes = await client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings`,
                specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getSiblings('')).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfigForAccessToken());
            expect(() => client.nodes.getSiblings({})).toThrowError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
});
