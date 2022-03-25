const express = require("express");
const body_parser = require("body-parser");
const connect_db = require('./config/database');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const verifyToken = require('./controllers/validate-token');

const routerApi = require('./routes/index');

const PORT = 3000;

const app = express();

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.set('llave', config.llave);
app.use(body_parser.json());
app.use(express.json());

connect_db();

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
