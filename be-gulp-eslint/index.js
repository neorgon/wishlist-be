'use strict';
const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const loadRoutes = require(`./App/Components/main.js`);

const PORT   = 3000;
const HOST   = '0.0.0.0';
const DB_HOST = process.env.DB_HOST || 'localhost';
mongoose.connect(`mongodb://${DB_HOST}:27017/wishlist`);
mongoose.Promise = Promise;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const router = express.Router();

loadRoutes(app,router);

app.listen(PORT, ()=> console.log(`Running on: http://${HOST}:${PORT}`));
