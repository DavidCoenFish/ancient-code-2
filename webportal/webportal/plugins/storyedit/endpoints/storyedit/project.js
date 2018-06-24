const EndPoint = function() {
	return;
}

EndPoint.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.write(JSON.stringify({}));
	response.end();
	return Q();
}

EndPoint.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.end();
	return Q();
}

module.exports = function() {
	var endpoint = new EndPoint();
	return endpoint;
}
