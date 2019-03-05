import * as Contensis from '../index';
const Zengenti = { Contensis };
const global = window || this;
describe('Taxonomy Operations', function () {
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
    it('Get Node By Key', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByKey('0/1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?language=en-GB', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Node By Key Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByKey({
            key: '0/1',
            order: 'alphabetical',
            childDepth: 10,
            language: 'fr-FR'
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=10&language=fr-FR&order=alphabetical', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Node By Key Options - Ignore order by defined', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByKey({
            key: '0/1',
            order: 'defined',
            childDepth: 1
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1&language=en-GB', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    // it('Invalid Key should error and not call api', (done) => {
    // 	let client = Zengenti.Contensis.Client.create({
    // 		projectId: 'myProject',
    // 		rootUrl: 'http://my-website.com/',
    // 		accessToken: 'XXXXXX'
    // 	});
    // 	let r = client.taxonomy.getNodeByKey('a/rubbish/key');
    // 	expect(global.fetch).not.toHaveBeenCalled();
    // 	return r.then(() => done(new Error()), () => done());
    // });
    it('Get Node By Path', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByPath('path/to/a/taxonomy/node');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?language=en-GB&path=path%2Fto%2Fa%2Ftaxonomy%2Fnode', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Node By Path Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByPath({
            path: 'path/to/a/taxonomy/node',
            order: 'alphabetical',
            childDepth: 10,
            language: 'fr-FR'
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?childDepth=10&language=fr-FR&order=alphabetical&path=path%2Fto%2Fa%2Ftaxonomy%2Fnode', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Node By Path Options - Ignore order by defined', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.getNodeByPath({
            path: 'path/to/a/taxonomy/node',
            order: 'defined',
            childDepth: 1
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes?childDepth=1&language=en-GB&path=path%2Fto%2Fa%2Ftaxonomy%2Fnode', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Key', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren('0/1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1&language=en-GB', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Taxonomy Node with children', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1&language=en-GB', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Taxonomy Node without children', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: false });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children populated', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true, children: [{ key: '', name: '', path: '', hasChildren: false }] });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children not populated', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', name: '', path: '/', hasChildren: true });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=1&language=en-GB', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Key by Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR&order=alphabetical', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Taxonomy Node With children by Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR&order=alphabetical', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Taxonomy Node without children by Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: false }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children populated by Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true, children: [{ key: '', name: '', path: '', hasChildren: false }] }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).not.toHaveBeenCalled();
    });
    it('Resolve Children with Taxonomy Node with children not populated by Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ node: { key: '0/1', name: '', path: '', hasChildren: true }, order: 'alphabetical', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR&order=alphabetical', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Resolve Children with Key by Options - Ignore order by defined', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.taxonomy.resolveChildren({ key: '0/1', order: 'defined', childDepth: 99, language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/taxonomy/nodes/0/1?childDepth=99&language=fr-FR', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
});
