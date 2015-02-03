// Express
var express 		= require('express');
var app 			= express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// Base
var server 			= require('./core/server.js');
var config 			= require('./config/app-config');

// Dust
var dust 			= require('dustjs-linkedin');
var cons 			= require('consolidate');

// Routers
var home = require("./routers/home-router.js");


// Express setup
app.set('port', config.port || 3000);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// View setup
app.engine('dust', cons.dust);
app.set('views', __dirname + "/" + config.viewDirectory);
app.set('view engine', config.viewEngine);

// All other routers are included here
home.setup(app);

// Start app
server(app);


