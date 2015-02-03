var config = require('../config/app-config');

module.exports = function(app){
	var server = app.listen(config.port, function () {
		console.log("Ned running on " + config.port);
	})
}