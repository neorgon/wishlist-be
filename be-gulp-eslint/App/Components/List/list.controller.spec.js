'use strict';
const mockery = require('mockery');
let ListController;
class ListModelMock {
  static addItemInList () {}
  static getAllItemsFromList () {}
  static getAllList () {}
  static saveList () { }
  static deleteListById () {}
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

      ListController.addItem({ params: { listId: '598ba8bd5cc6e144da1abe82' },
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
          description: 'lista de prueba',
          image: 'as190e2910192192dkdmkio',
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

      ListController.getItems({ params: { idList: '02sd5d1q6c5asd10sad' } }, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({
            'data': {
              'name': 'marriage',
              'owner': 'alejandro',
              'description': 'lista de prueba',
              'image': 'as190e2910192192dkdmkio',
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
    it('should save a new list and return it in the response', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'saveList').and.returnValue(
        Promise.resolve({
          'image': 'image',
          'description': 'new list',
          'owner': 'dev22',
          'name': 'newlist2334',
          'id': '598c90213e573c0e37c81eec',
          'item': []
        }));

      ListController.addList({ body: {
        'name': 'newlist2334',
        'owner': 'dev22',
        'description': 'new list',
        'image': 'image'
      } }, res).
        then(() => {
          expect(ListModelMock.saveList).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ 'data': {
            'id': '598c90213e573c0e37c81eec',
            'type': 'List',
            'attributes': {
              'image': 'image',
              'description': 'new list',
              'owner': 'dev22',
              'name': 'newlist2334'
            }
          }
          });
          done();
        });
    });
  });

  describe('Delete Lists', () => {
    it('should delete lists by list id and return number of list deleted it in the response', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'deleteListById').and.returnValue(
        Promise.resolve({
          '_id': '5996e6dd44a9f30d5d66256d',
          'pathImage': 'adkas;ljkl nvkvnkdfnv',
          'description': 'new list',
          'owner': 'dev22',
          'name': 'newlist2334',
          '__v': 0,
          'item': []
        }));

      ListController.deleteList({ params: { listId: '5996e6dd44a9f30d5d66256d' } }, res).
        then(() => {
          expect(ListModelMock.saveList).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ 'data': {
            '_id': '5996e6dd44a9f30d5d66256d',
            'pathImage': 'adkas;ljkl nvkvnkdfnv',
            'description': 'new list',
            'owner': 'dev22',
            'name': 'newlist2334',
            '__v': 0,
            'item': []
          }
          });
        });
      done();
    });
  });

  describe('Delete Lists that doesn\'t exist', () => {
    it('should try delete lists by list id and return error', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ListModelMock, 'deleteListById').and.returnValue(
        Promise.reject({
          'title': 'List not delete',
          'description': 'The list with that field doesn\'t exist'
        }));

      ListController.deleteList({ params: { listId: '5995be248a4cec10b7a5eb42' } }, res).
        then(() => {
          expect(ListModelMock.saveList).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({
            'error': {
              'title': 'List not delete',
              'description': 'The list with that field doesn\'t exist'
            }
          });
        });
      done();
    });
  });

  describe('Get lists by id', () => {
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
      ListController.getList({ ownerName: 'pepe' }, res)
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
});
