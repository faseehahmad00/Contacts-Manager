var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var usersRouter = require('./routes/users');
const config  = require('config');
var cors = require('cors')

var app = express();
// Serve static files from the React frontend app

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

mongoose.connect(config.get("db_url"),
{useNewUrlParser : true,useUnifiedTopology: true})
    .then(async ()=>{
        console.log('connection created');
    })
    .catch((err)=>console.log(err.message));


module.exports = app;
