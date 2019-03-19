import * as Contensis from '../index';
const Zengenti = { Contensis };
const global = window || this;
describe('Entry Operations', function () {
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
    it('Get Live Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.get('1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US', Object({
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
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1?language=en-US', Object({
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
        client.entries.get({ id: '1' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/1', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List By Content Type', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Live Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Preview Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'latest',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=latest', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List French Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-FR',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List with all options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 }, language: 'en-GB', linkDepth: 1, order: ['title'], fields: ['title'] });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?fields=title&language=en-GB&linkDepth=1&order=title&pageIndex=5&pageSize=100', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List with minimal options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: '', linkDepth: 0, language: '', order: [], fields: [], pageOptions: {} });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries?language=en-US&pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List with no options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
        client.entries.list({});
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries?pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Paging Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 } });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=en-US&pageIndex=5&pageSize=100', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Specified French Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=0&pageSize=25', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Specified French Version with Paging Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/contentTypes/cheese/entries?language=fr-FR&pageIndex=5&pageSize=100', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Specified French Version with Paging Options but no Content Type', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries?language=fr-FR&pageIndex=5&pageSize=100', Object({
            method: 'GET',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Do Search via the Client API', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{
                    asc: 'name'
                }, {
                    desc: 'brewTypeCount'
                }],
            where: [{
                    field: 'brewTypeCount',
                    greaterThan: 5
                }, {
                    field: 'Origin',
                    in: ['Peru', 'Columbia']
                }]
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 50,
                orderBy: [{
                        asc: 'name'
                    }, {
                        desc: 'brewTypeCount'
                    }],
                where: [{
                        field: 'brewTypeCount',
                        greaterThan: 5
                    }, {
                        field: 'Origin',
                        in: ['Peru', 'Columbia']
                    }]
            })
        }));
    });
    it('Do Search via the Client API v2', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{
                    asc: 'authorName'
                }],
            where: [{
                    field: 'authorName',
                    startsWith: 'W'
                }]
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 50,
                orderBy: [{
                        asc: 'authorName'
                    }],
                where: [{
                        field: 'authorName',
                        startsWith: 'W'
                    }]
            })
        }));
    });
    it('Do Search via the Client API with a link depth', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{
                    asc: 'authorName'
                }],
            where: [{
                    field: 'authorName',
                    startsWith: 'W'
                }]
        }, 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 50,
                orderBy: [{
                        asc: 'authorName'
                    }],
                where: [{
                        field: 'authorName',
                        startsWith: 'W'
                    }]
            })
        }));
    });
    it('Do Search via the Client API with all options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{
                    asc: 'authorName'
                }],
            where: [{
                    field: 'authorName',
                    startsWith: 'W'
                }],
            fields: ['title']
        }, 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 50,
                orderBy: [{
                        asc: 'authorName'
                    }],
                where: [{
                        field: 'authorName',
                        startsWith: 'W'
                    }],
                fields: ['title']
            })
        }));
    });
    it('Do Search via the Client API using the default Query instance', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        let query = new Contensis.Query();
        client.entries.search(query);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search', Object({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'accessToken': 'XXXXXX',
            },
            body: JSON.stringify({
                pageIndex: 0,
                pageSize: 20,
                where: []
            }),
            mode: 'cors'
        }));
    });
    it('Do Search via the Client API using a Query instance', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        let query = new Contensis.Query(Contensis.Op.startsWith('authorName', 'W'));
        query.orderBy = Contensis.OrderBy.asc('authorName');
        query.fields = ['title'];
        query.pageIndex = 1;
        query.pageSize = 50;
        client.entries.search(query, 99);
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/delivery/projects/myProject/entries/search?linkDepth=99', Object({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'accessToken': 'XXXXXX',
            },
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 50,
                orderBy: [{
                        asc: 'authorName'
                    }],
                where: [{
                        field: 'authorName',
                        startsWith: 'W'
                    }],
                fields: ['title']
            }),
            mode: 'cors'
        }));
    });
});
