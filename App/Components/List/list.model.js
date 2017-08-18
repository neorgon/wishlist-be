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
        const e = new Error('The list with that field don\'t exist');
        e.title = 'list not found';
        throw e;
      }
      return list;
    });
  }
  static getAllItemsFromList (listId) {
    return List.findOne({ _id: listId }, 'name owner item').then(list => {
      if (!list) {
        const e = new Error('The list with that ID don\'t exist');
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
        const e = new Error('The list with that id don\'t exist');
        e.title = 'List not found';
        throw e;
      }
      return list;
    });
  }
}

module.exports = ListModel;
