'use strict';
const listRoutes = require('./List/list.route.js');

module.exports = (app, router) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });
  app.use('/lists', listRoutes(router));
  app.use((err, req, res, next) => {
    res.send({ error: { title: err.title, description: err.message } });
    next();
  });
};
