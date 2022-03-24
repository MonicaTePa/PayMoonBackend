const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const connect_db = require('./config/database');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const verifyToken = require('./controllers/validate-token');

const routerApi = require('./routes/index');

const PORT = 3000;

const app = express();
app.set('llave', config.llave);
app.use(body_parser.json());
app.use(express.json());
app.use(cors());

connect_db();

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
