var server = require('./core/server.js')
var express = require('express');
var app = express();

//Start the server
server(app);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

