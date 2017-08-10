'use strict';
const ListModel = require('./list.model.js');
class ListController {
  static getList (req, res, next) {

    return ListModel.getAllList(req.params.ownerName).
      then(lists => {
        res.status(200).send({ data: lists });
      }).

      catch(err => {
        res.status(500);
        next(err);
      });
  }
  static addItem (req, res, next) {
    return ListModel.addItemInList(req.params.listName, req.body.item).
      then(list => {res.status(200).send({ data: list });}).
      catch(err => {
        res.status(600);
        next(err);
      });
  }

  static getItems (req, res, next) {
    return ListModel.getAllItemsFromList(req.params.listID).
      then(listsItems => res.status(200).send({ data: listsItems })).
      catch(err => {
        res.status(400);
        next(err);
      });
  }

  static addList (req, res, next) {
    return ListModel.saveList(req.body)
      .then(list => res.status(200).send({ data: list }))
      .catch(err => {
        res.status(400);
        next(err);
      });
  }

  static getItem (req, res, next) {
    return ListModel.getItemByName(req.params.listName, req.params.itemName)
      .then(item => res.status(200).send({ data: item }))
      .catch(err => {
        res.status(500);
        next(err);
      });
  }
}

module.exports = ListController;
