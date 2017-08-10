'use strict';
const mockery = require('mockery');
let ListController;
class ListModelMock {
  static addItemInList () {

  }

  static getAllItemsFromList () {

  }
  static getAllList () {

  }

  static saveList () {

  }
}

const res = {
  status () {
    return this;
  },
  send () {}
};

describe('List Controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./list.model.js', ListModelMock);
    ListController = require('./list.controller');
  });

  describe('Add Item in List', () => {
    it('should retrieve the list that added the item', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'addItemInList').and.returnValue(
        Promise.resolve({ 'name': 'list',
          'owner': 'alejandro',
          'description': '',
          'pathImage': '',
          'item': [{
            'name': 'item 1',
            'price': 10,
            'quantity': 5,
            'reponsible': ''
          },
          { 'name': 'ads',
            'price': 23,
            'quantity': 43
          }]
        }));

      ListController.addItem({ params: { listName: 'list' },
        body: { 'item': { 'name': 'ads', 'price': 23, 'quantity': 43 } } },
      res).
        then(() => {
          expect(ListModelMock.addItemInList).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ 'data': {
            'name': 'list',
            'owner': 'alejandro',
            'description': '',
            'pathImage': '',
            'item': [
              {
                'name': 'item 1',
                'price': 10,
                'quantity': 5,
                'reponsible': ''
              },
              {
                'name': 'ads',
                'price': 23,
                'quantity': 43
              }]
          }
          });
          done();
        });
    });

  });

  describe('getAllItemsFromList', () => {
    it('should retrieve the Items of one List', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'getAllItemsFromList').and.returnValue(
        Promise.resolve({
          name: 'marriage',
          owner: 'alejandro',
          item: [{
            name: 'item 1',
            price: 10,
            quantity: 5,
            reponsible: ''
          },
          {
            name: 'item 2',
            price: 100,
            quantity: 2,
            reponsible: ''
          }]
        })
      );

      ListController.getItems({ params: { listName: 'marriage' } }, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({
            'data': {
              'name': 'marriage',
              'owner': 'alejandro',
              'item': [{
                'name': 'item 1',
                'price': 10,
                'quantity': 5,
                'reponsible': ''
              },
              {
                'name': 'item 2',
                'price': 100,
                'quantity': 2,
                'reponsible': ''
              }]
            }
          });
          done();
        });
    });

    it('should return an error when Items cannot be retrieved', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'getAllItemsFromList').and.returnValue(Promise.resolve(null));
      ListController.getItems({ params: { listName: 'Barbecue' } }, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ 'data': null });
          done();
        });
    });
  });

  describe('Add a new List', () => {
    it('should retrieve the new list ', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'saveList').and.returnValue(
        Promise.resolve({
          '__v': 0,
          'pathImage': 'pathimage',
          'description': 'new list',
          'owner': 'dev22',
          'name': 'newlist2334',
          '_id': '598c90213e573c0e37c81eec',
          'item': []
        }));

      ListController.addList({ body: {
        'name': 'newlist2334',
        'owner': 'dev22',
        'description': 'new list',
        'pathImage': 'pathimage'
      } }, res).
        then(() => {
          expect(ListModelMock.saveList).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ 'data': {
            '__v': 0,
            'pathImage': 'pathimage',
            'description': 'new list',
            'owner': 'dev22',
            'name': 'newlist2334',
            '_id': '598c90213e573c0e37c81eec',
            'item': []
          }
          });
          done();
        });
    });

  });
});

describe('suite test for the list controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./list.model.js', ListModelMock);
    ListController = require('./list.controller.js');
  });

  it('getList should give a list with names', done => {
    spyOn(res, 'status').and.callThrough();
    spyOn(res, 'send');
    spyOn(ListModelMock, 'getAllList').and.returnValue(Promise.resolve(
      [
        {
          _id: '598350321f2e0a24b38bcdbe',
          name: 'pepe-list'
        },
        {
          _id: '59836f6b4e983a0ff6bb6b03',
          name: 'pepe-list'
        },
        {
          _id: '59836fbab24ff911c8a82b1b',
          name: 'pepe-list'
        },
        {
          _id: '59836fe6b24ff911c8a82b1d',
          name: 'pepe-list'
        }
      ]
    ));

    ListController.getList({ params: { ownerName: 'pepe' } }, res)
      .then(() => {
        expect(ListModelMock.getAllList).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.send).toHaveBeenCalledWith(
          { data:
            [
              {
                _id: '598350321f2e0a24b38bcdbe',
                name: 'pepe-list'
              },
              {
                _id: '59836f6b4e983a0ff6bb6b03',
                name: 'pepe-list'
              },
              {
                _id: '59836fbab24ff911c8a82b1b',
                name: 'pepe-list'
              },
              {
                _id: '59836fe6b24ff911c8a82b1d',
                name: 'pepe-list'
              }
            ]
          });
        done();
      });
  });
});
