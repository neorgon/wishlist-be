'use strict';
const List = require('./list.db.js');

class ListModel {

  static saveList (list) {
    const newList = new List(list);
    return newList.save();
  }

  static getAllList (query) {
    return List.find(query, 'name description').then(list => {
      if (list.length < 1) {
        const e = new Error('The list with that field doesn\'t exist');
        e.title = 'list not found';
        throw e;
      }
      return list;
    });
  }
  static getAllItemsFromList (listId) {
    return List.findOne({ _id: listId }, 'name owner description image item').then(list => {
      if (!list) {
        const e = new Error('The list with that ID doesn\'t exist');
        e.title = 'List not found';
        throw e;
      }
      return list;
    }).catch(err => {
      err.title = 'Id invalid';
      throw err;
    });
  }

  static addItemInList (listId, newItem) {
    return List.findByIdAndUpdate(listId, { $push: { item: newItem } }, { new: true }).then(list => {
      if (!list) {
        const e = new Error('The list where you trying to insert an item doesn\'t exist');
        e.title = 'List not found';
        throw e;
      } else {
        return list;
      }
    });
  }

  static deleteListById (listId) {
    return List.findByIdAndRemove(listId).then(list => {
      if (!list) {
        const e = new Error('The list couldn\'t be deleted');
        e.title = 'List not delete';
        throw e;
      } else {
        return list;
      }
    }).catch(err => {
      throw err;
    });
  }
}

module.exports = ListModel;
