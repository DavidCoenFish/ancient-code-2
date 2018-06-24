const Game = function() {
	return;
}

Game.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.write(JSON.stringify({}));
	response.end();
	return Q();
}

Game.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.end();
	return Q();
}

module.exports = function() {
	var game = new Game();
	return game;
}
