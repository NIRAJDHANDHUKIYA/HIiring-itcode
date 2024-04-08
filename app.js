var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var app = express();

var indexRouter = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://NIRAJ:NIRAJ23@cluster0.2ej5zym.mongodb.net/Hiring_Project')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))


app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
   
app.get('/',(req,res) => {
  res.send('<h1>Done</h1>')
})

module.exports = app;