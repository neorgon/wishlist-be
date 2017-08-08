const List = require('./list.db.js');

class ListModel {

    static saveList(params) {
      let newList = new List();

      newList.name = params.name;
      newList.owner = params.owner;
      newList.description = params.description;
      newList.pathImage = params.pathImage;

      return newList.save();
    }

    static getAllList(ownerName) {
      return List.find({ owner: ownerName }, {});
    }

    static addItemInList(listName, newItem) {
      return List.findOneAndUpdate({ name: listName }, { $push: { item: newItem } });
    }

    static getItemByName(listName, itemName) {
      return List.find({ "name": listName, "item.name": itemName }, { _id: 0, "item.$": 1 });
    }

}

module.exports = ListModel;
