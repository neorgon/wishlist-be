'use strict';
const ListModel = require('./list.model.js');
class ListController {
  static getList (req, res, next) {
    return ListModel.getAllList(req.query).
      then(lists => {
        res.status(200).send({ data: lists });
      }).

      catch(err => {
        res.status(500);
        next(err);
      });
  }
  static addItem (req, res, next) {
    return ListModel.addItemInList(req.params.listId, req.body.item).
      then(list => {res.status(200).send({ data: list });}).
      catch(err => {
        res.status(204);
        next(err);
      });
  }

  static getItems (req, res, next) {
    return ListModel.getAllItemsFromList(req.params.listId).
      then(listsItems => res.status(200).send({ data: listsItems })).
      catch(err => {
        res.status(400);
        next(err);
      });
  }

  static addList (req, res, next) {
    return ListModel.saveList(req.body)
      .then(list => {
        res.status(200).send({
          data: {
            id: list.id,
            type: 'List',
            attributes: {
              name: list.name,
              owner: list.owner,
              description: list.description,
              image: list.image
            }
          }
        });
      })
      .catch(err => {
        res.status(400);
        next(err);
      });
  }

  static deleteList (req, res, next) {
    return ListModel.deleteListById(req.params.listId).
      then(result => res.status(200).send({ data: result })).
      catch(err => {
        res.status(404);
        next(err);
      });
  }
}
module.exports = ListController;
