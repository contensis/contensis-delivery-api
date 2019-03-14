"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("./url-builder");
const Contensis = require("../index");
const Zengenti = { Contensis };
describe('Url Builder', function () {
    let client = null;
    beforeEach(() => {
        client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            accessToken: 'XXXXXX'
        });
    });
    it('should populate named values', () => {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/taxomony/:projectId/entries')
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/delivery/taxomony/myProject/entries');
    });
    it('should populate multiple named values', () => {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/taxomony/:projectId/:key/:id')
            .addOptions({ key: 0, id: 1 })
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/delivery/taxomony/myProject/0/1');
    });
    it('should populate multiple named values in query string', () => {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/taxomony/:projectId', { key: null, id: null })
            .addOptions({ key: 0, id: 1 })
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/delivery/taxomony/myProject?id=1&key=0');
    });
});
