const express = require("express");
const body_parser = require("body-parser");
const connect_db = require('./config/database');
const routerApi = require('./routes/index');

const PORT = 3000;

const app = express();

app.use(body_parser.json());
app.use(express.json());

connect_db();

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
