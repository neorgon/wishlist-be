'use strict';
const listRoutes = require('./List/list.route.js');

module.exports = (app, router) => {
  app.use('/lists', listRoutes(router));
  app.use((err, req, res, next) => {
    res.send({ error: { title: err.title, description: err.message } });
    next();
  });
};
