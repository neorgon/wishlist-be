'use strict';
const ListController = require('./list.controller.js');
const ListSchema = require('./list.controller-schema.js');
const { validateSchema } = require('./../../Middlewares/schema-validation.middleware.js');

module.exports = router => {
  router.get(`/:ownerName`, ListController.getList);
  router.get(`/:listID/items`, ListController.getItems);
  router.post(`/`, validateSchema(ListSchema.addListSchema), ListController.addList);
  router.post('/:listName', validateSchema(ListSchema.addItemSchema), ListController.addItem);
  router.get('/:listName/:itemName', ListController.getItem);
  return router;
};
