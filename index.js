var express = require('express');
var app = express();
var setup = require("./core/app-setup.js");

// Fire!
setup(app);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

