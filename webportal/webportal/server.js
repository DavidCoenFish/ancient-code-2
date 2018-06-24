const Http = require("http");
const Config = require("./modules/config");
const Framework = require("./modules/framework")();

const server = Http.createServer();
server.on('request', function(request, response) {
	response.on('error', function(err) {
		console.error(err);
	});
	request.on('error', function(err) {
		console.error(err);
		response.statusCode = 400;
		response.end();
	});

	var bodyCunks = [];
	request.on('data', function(chunk) {
		bodyCunks.push(chunk);

		// flood attack or faulty client, nuke request
		if (1e6 < bodyCunks.length) {
			request.connection.destroy();
		}
	});
	request.on('end', function() {
		try {
			const rawUrl = request.url.toLowerCase();
			const method = request.method.toLowerCase();
			const body = Buffer.concat(bodyCunks).toString();

					//console.log("  pre deal:" + method + " " + rawUrl + " " + body);
			Framework.Deal(response, rawUrl, method, body);
					//console.log("  post deal");

		} catch (err) {
			//we don't render an error where, the response could have started on the body
			console.trace("top level catch:" + err);
		}
	});
});

console.log("server port:" + Config.server.port)
server.listen(Config.server.port);

//const querystring = require("querystring");
//const bodyJson = querystring.parse(body);
