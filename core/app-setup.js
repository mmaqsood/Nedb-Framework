var server = require('./server.js');
var config = require('../config/app-config');

module.exports = function(app){
	// Set config
	app.set('port', config.port || 3000);
	app.set('views', '../' + config.viewDirectory);
	app.set('view engine', config.viewEngine);

	// Start app
	server(app);
}

