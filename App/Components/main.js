const listRoutes = require (`./List/list.route.js`);

module.exports = (app,router) => {
  app.use(`/lists`, listRoutes(router));
};
