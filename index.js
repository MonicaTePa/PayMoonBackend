var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const conectar_DB = require('./config/database');
const cors = require('cors');
const router= require('./routes/index');
 

var app = express();
conectar_DB();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/api', router);
  
app.listen(3000, () => {
  console.log("Se ejecuta en el puerto 3000")
})

module.exports = app;
