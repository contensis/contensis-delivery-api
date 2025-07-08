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
        (0, specs_utils_spec_1.setDefaultSpyForAccessToken)(global);
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    describe('Get root node', () => {
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=en-US&versionStatus=latest',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.getRoot({});
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?language=fr-FR',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getRoot({ language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const node = await client.nodes.getRoot();
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/delivery/projects/myProject/nodes/root',
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
    });
    describe('Get node by id', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.get(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const node = await client.nodes.get({ id: nodeId, language: '', depth: 0, entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Validate invalid node id or path', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.get('')).toBeRejectedWithError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.get({})).toBeRejectedWithError('A valid node id or path needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node by path', () => {
        const nodePath = '/node1/node2';
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.get(nodePath);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({
                path: nodePath
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({ path: nodePath, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 }, allowPartialMatch: true });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?allowPartialMatch=true&depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.get({ path: nodePath, language: '', depth: 0, entryFields: [], entryLinkDepth: 0, allowPartialMatch: false });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const node = await client.nodes.get({ path: nodePath });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes${nodePath}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
    });
    describe('Get node by entry', () => {
        const entryId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        const entry = {
            sys: {
                id: entryId
            }
        };
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.getByEntry(entryId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with entry', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry(entry);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options and entry id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry({ canonicalOnly: false, entryId: entryId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options and entry', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry({ canonicalOnly: false, entry, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
            // we do not have meaningful spy data to check this
            // expect(node).toBeInstanceOf(Array);
        });
        it('Get Canonical Live Version with all options and entry', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry({ canonicalOnly: true, depth: 1, entry, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?canonicalOnly=true&depth=1&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryId=${entryId}&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
            // we do not have meaningful spy data to check this
            // expect(node).toBeInstanceOf(Object);
        });
        it('Get Live Version with minimal options and entry id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getByEntry({ entryId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}&language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options and entry', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const node = await client.nodes.getByEntry({ entry });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/?entryId=${entryId}`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Validate invalid entry id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getByEntry('')).toBeRejectedWithError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid entry or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getByEntry({})).toBeRejectedWithError('A valid entry id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node children', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const nodes = await client.nodes.getChildren(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getChildren({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getChildren({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getChildren({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getChildren({ node: { id: nodeId }, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const nodes = await client.nodes.getChildren({ node: { id: nodeId } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/children`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getChildren('')).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getChildren({})).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node parent', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        const node = { id: nodeId };
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.getParent(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getParent({
                id: nodeId
            });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getParent({ id: nodeId, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getParent({ id: nodeId, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getParent({ node: { id: nodeId }, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const parentNode = await client.nodes.getParent({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/parent`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(parentNode).not.toBeNull();
        });
        it('Validate invalid node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getParent('')).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getParent({})).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestor at level', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        const node = { id: nodeId };
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=fr-FR&startLevel=1`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 1 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&startLevel=1`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 1, language: 'de', depth: 2, entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?depth=2&entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de&startLevel=1`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const node = await client.nodes.getAncestorAtLevel({ id: nodeId, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(node).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 0, depth: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const ancestorNode = await client.nodes.getAncestorAtLevel({ node, startLevel: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(ancestorNode).not.toBeNull();
        });
        it('Validate invalid node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getAncestorAtLevel({ id: '', startLevel: 0 })).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getAncestorAtLevel({ node: {}, startLevel: 0 })).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node ancestors', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        const node = { id: nodeId };
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const nodes = await client.nodes.getAncestors(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getAncestors({ id: nodeId, startLevel: 1, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de&startLevel=1`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getAncestors({ id: nodeId, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getAncestors({ node, startLevel: 0, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const nodes = await client.nodes.getAncestors({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/ancestors`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getAncestors('')).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getAncestors({})).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
    describe('Get node siblings', () => {
        const nodeId = '9db1098f-4eb3-409b-a2dc-56256c441c69';
        const node = { id: nodeId };
        it('Get Live Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Preview Version', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)('latest'));
            const nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US&versionStatus=latest`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
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
            const client = Zengenti.Contensis.Client.create();
            const nodes = await client.nodes.getSiblings(nodeId);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=fr-FR`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getSiblings({ id: nodeId, language: 'de', entryFields: ['title'], entryLinkDepth: 1, entryFieldLinkDepths: { linkField: 1 } });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?entryFieldLinkDepths=%7B%22linkField%22%3A1%7D&entryFields=title&entryLinkDepth=1&language=de`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getSiblings({ id: nodeId, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with minimal options and node', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            const nodes = await client.nodes.getSiblings({ node, language: '', entryFields: [], entryLinkDepth: 0 });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Get Live Version with no options and node', async () => {
            const client = Zengenti.Contensis.Client.create({
                projectId: 'myProject',
                rootUrl: 'http://my-website.com/',
                accessToken: 'XXXXXX'
            });
            const nodes = await client.nodes.getSiblings({ node });
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/delivery/projects/myProject/nodes/${nodeId}/siblings`,
                (0, specs_utils_spec_1.getDefaultFetchRequestForAccessToken)()
            ]);
            expect(nodes).not.toBeNull();
        });
        it('Validate invalid node id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getSiblings('')).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
        it('Validate invalid node or options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfigForAccessToken)());
            await expectAsync(client.nodes.getSiblings({})).toBeRejectedWithError('A valid node id needs to be specified.');
            expect(global.fetch).toHaveBeenCalledTimes(0);
        });
    });
});
