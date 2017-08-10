'use strict';
const List = require('./list.db.js');

class ListModel {

  static saveList (params) {
    const newList = new List();

    newList.name = params.name;
    newList.owner = params.owner;
    newList.description = params.description;
    newList.pathImage = params.pathImage;

    return newList.save();
  }

  static getAllList (ownerName) {
    return List.find({ owner: ownerName }, 'name description').then(list => {
      if (!list) {
        const e = new Error('The list with that owner don\'t exist');
        e.title = 'Owner not found';
        throw e;
      }
      return list;
    });
  }
  static getAllItemsFromList (listID) {
    return List.find({ id: listID }, 'name owner item').then(list => {
      if (!list) {
        const e = new Error('The list with that ID don\'t exist');
        e.title = 'List not found';
        throw e;
      }
      return list;
    });
  }

  static addItemInList (listName, newItem) {
    return List.findOneAndUpdate({ name: listName }, { $push: { item: newItem } }, { new: true }).then(list => {
      if (!list) {
        const e = new Error('The list with that name don\'t exist');
        e.title = 'List not found';
        throw e;
      }
      return list;
    });
  }

  static getItemByName (listName, itemName) {
    return List.find({ 'name': listName, 'item.name': itemName }, { _id: 0, 'item.$': 1 }).then(list => {
      if (!list) {
        const e = new Error('The list or item with that name don\'t exist');
        e.title = 'List/item not found';
        throw e;
      }
      return list;
    });
  }
}

module.exports = ListModel;
