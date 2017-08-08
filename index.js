const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const loadRoutes = require('./App/Components/main.js');

const PORT   = 3000;
const HOST   = '0.0.0.0';
const USEDB  = 'mongodb://127.0.0.1:27017/wishlist';
const app    = express();
const router = express.Router();

mongoose.connection.openUri(USEDB);
mongoose.connection.once('open', function() {
  console.log('Connection established');
})
  .on('error', function() {
    console.error();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

loadRoutes(app, router);

app.listen(PORT, ()=> console.log(`Running on: http://${HOST}:${PORT}`));