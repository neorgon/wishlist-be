'use strict';
const ListController = require('./list.controller.js');
const addListSchema = require('./list.add-list-schema');
const addItemSchema = require('./list.add-item-schema');
const { validateSchema } = require('./../../Middlewares/schema-validation.middleware.js');

module.exports = router => {
  router.get('/', ListController.getList);
  router.get('/:listId/items', ListController.getItems);
  router.post('/', validateSchema(addListSchema), ListController.addList);
  router.post('/:listId/items', validateSchema(addItemSchema), ListController.addItem);
  return router;
};
