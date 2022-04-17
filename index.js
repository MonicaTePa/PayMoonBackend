const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const connect_db = require('./config/database');
const routerApi = require('./routes/index');
const cookie_parser = require('cookie-parser');



const PORT = 3000;

const app = express();

app.use(body_parser.json());
app.use(cookie_parser());
app.use(express.json());
app.use(cors({ 
  origin: "http://localhost:4200",
  credentials: true }));

connect_db();

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

