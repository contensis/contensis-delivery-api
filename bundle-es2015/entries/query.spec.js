import * as Contensis from '../index';
const Zengenti = { Contensis };
describe('Query Serialization', function () {
    it('Serialize And Query 1', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let query = new Query(Op.and(Op.equalTo('first', 1), Op.equalTo('second', 2)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = ['+name', '-id'];
        let expected = {
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{ asc: 'name' }, { desc: 'id' }],
            where: [{
                    and: [{
                            field: 'first',
                            equalTo: 1
                        }, {
                            field: 'second',
                            equalTo: 2
                        }]
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize And Query 2', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let OrderBy = Zengenti.Contensis.OrderBy;
        let query = new Query(Op.equalTo('first', 1), Op.equalTo('second', 2));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = OrderBy.asc('name').desc('id');
        let expected = {
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{ asc: 'name' }, { desc: 'id' }],
            where: [{
                    field: 'first',
                    equalTo: 1
                }, {
                    field: 'second',
                    equalTo: 2
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize Or Query', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let query = new Query(Op.or(Op.equalTo('first', 1), Op.equalTo('second', 2)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = ['+name', '-id'];
        let expected = {
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{ asc: 'name' }, { desc: 'id' }],
            where: [{
                    or: [{
                            field: 'first',
                            equalTo: 1
                        }, {
                            field: 'second',
                            equalTo: 2
                        }]
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize Not Query', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let OrderBy = Zengenti.Contensis.OrderBy;
        let query = new Query(Op.not(Op.equalTo('first', 7)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = OrderBy.asc('name').desc('id');
        let expected = {
            pageIndex: 1,
            pageSize: 50,
            orderBy: [{ asc: 'name' }, { desc: 'id' }],
            where: [{
                    not: [{
                            field: 'first',
                            equalTo: 7
                        }]
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
});
