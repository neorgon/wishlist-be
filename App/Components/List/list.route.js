const ListController = require(`./list.controller.js`);

const listController = new ListController();

module.exports = (router) => {
  router.get('/:ownerName', listController.getList);
  router.get('/:listName', listController.getItems);
  router.post('/', listController.addList);
  router.post('/:listName', listController.addItem);
  router.put('/:listName', listController.updateList);
  router.patch('/:listName', listController.updateList);
  router.delete('/:listName', listController.deleteList);
  router.get('/:listName/:itemName', listController.getItem);
  return router;
};
