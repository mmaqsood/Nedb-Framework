var config = require('../config/server-config');

module.exports = function(app){
	var server = app.listen(3000, function () {
		console.log("Ned running on " + config.port);
	})
}