const express = require("express");
const body_parser = require("body-parser");
//http://localhost: o http://127.0.0.1:
//const routerApi = require('./routes');

const PORT = 3000;

const app = express();

app.use(body_parser.json());
app.use(express.json());

//routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
