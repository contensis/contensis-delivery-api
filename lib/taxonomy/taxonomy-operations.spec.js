"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Taxonomy Operations', function () {
    beforeEach(() => {
        specs_utils_spec_1.setDefaultSpyForAccessToken(global);
        Zengenti.Contensis.Client.defaultClientConfig = null;
        Zengenti.Contensis.Client.configure({
            fetchFn: global.fetch
        });
    });
    it('Get Node By Key', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByKey('0/1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Get Node By Key Options - alphabetical order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByKey({
            key: '0/1',
            order: 'alphabetical',
            childDepth: 10,
            language: 'fr-FR'
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=10&language=fr-FR',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Get Node By Key Options - defined order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByKey({
            key: '0/1',
            order: 'defined',
            childDepth: 1
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1&order=defined',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Get Node By Path', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByPath('path/to/a/taxonomy/node');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?path=path%2Fto%2Fa%2Ftaxonomy%2Fnode',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Get Node By Path Options - alphabetical order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByPath({
            path: 'path/to/a/taxonomy/node',
            order: 'alphabetical',
            childDepth: 10,
            language: 'fr-FR'
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?childDepth=10&language=fr-FR&path=path%2Fto%2Fa%2Ftaxonomy%2Fnode',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Get Node By Path Options - defined order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let node = await client.taxonomy.getNodeByPath({
            path: 'path/to/a/taxonomy/node',
            order: 'defined',
            childDepth: 1
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?childDepth=1&order=defined&path=path%2Fto%2Fa%2Ftaxonomy%2Fnode',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(node).not.toBeNull();
    });
    it('Resolve Children with Key', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren('0/1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Taxonomy Node with children', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Taxonomy Node without children', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        await client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: false });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children populated', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        await client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true, children: [{ key: '', name: '', path: '', hasChildren: false }] });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children not populated', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Key by Options - alphabetical order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ key: '0/1', order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Key by Options - defined order', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ key: '0/1', order: 'defined', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR&order=defined',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Taxonomy Node: with children, by Options', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
    it('Resolve Children with Taxonomy Node: without children, by Options', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        await client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: false }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node: with children populated by Options', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        await client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true, children: [{ key: '', name: '', path: '', hasChildren: false }] }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node: with children not populated by Options', async () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        let nodes = await client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true }, order: 'defined', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch.calls.mostRecent().args).toEqual([
            'http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR&order=defined',
            specs_utils_spec_1.getDefaultFetchRequestForAccessToken()
        ]);
        expect(nodes).not.toBeNull();
    });
});
