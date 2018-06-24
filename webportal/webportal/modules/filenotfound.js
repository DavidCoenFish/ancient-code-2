const Q = require('q');

module.exports = function(response) {
	response.setHeader("content-type", "text/plain");
	response.statusCode = 404;
	response.write("file not found");
	response.end();

	return Q();
}
