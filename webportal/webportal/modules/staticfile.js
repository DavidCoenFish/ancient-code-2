const fileSystem = require("fs");
const path = require("path");
const Q = require('q');

const StaticFile = function(rootPath) {
	this.m_rootPath = rootPath;
	return;
}

const mimeTypes = {
	"html": "text/plain",
	"htm": "text/plain",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css",
	"meta": "application/json; charset=utf-8"
};

//return false on error
StaticFile.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	//console.log('StaticFile.get ' + JSON.stringify(endpointUrl));

	var defer = Q.defer();

	try  {
		var fileName = path.normalize(path.join(this.m_rootPath, unescape(endpointUrl)));
		var extension = slingUrl.GetExtension();
		var contentType = "";

		if (extension in mimeTypes) {
			contentType = mimeTypes[extension];
		}

		if ("" === contentType) {
			for (key in mimeTypes) {
				if (-1 != extension.indexOf(key)) {
					contentType = mimeTypes[key];
					break;
				}
			}
		}

		if ("" === contentType) {
			contentType = "application/json; charset=utf-8";
		}

	} 
	catch (e) {
		defer.reject("setup threw error");
		return defer.promise;
	}

	try {
		stats = fileSystem.lstatSync(fileName); // throws if path doesn't exist
	} catch (e) {
		defer.reject("filesystem threw error");
		return defer.promise;
	}

	try {
		//console.log('StaticFile.get response:' + contentType);

		response.statusCode = 200;
		response.setHeader("content-type", contentType);

		var fileStream = fileSystem.createReadStream(fileName);
		var stream = fileStream.pipe(response);
		stream.on('finish', function(){
			defer.resolve();
			});
	} catch (e) {
		defer.reject("fileStream threw error");
	}

	return defer.promise;
}

module.exports = function(rootPath) {
	var staticFile = new StaticFile(rootPath);
	return staticFile;
}
