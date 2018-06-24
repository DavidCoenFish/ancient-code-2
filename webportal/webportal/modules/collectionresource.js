const Q = require("q");
const MongoDB = require('mongodb');
const Util = require("./util.js");

const CollectionResource = function(collectionName) {
	this.m_collectionName = collectionName;
	return;
}

CollectionResource.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	console.log("CollectionResource.get:" + endpointUrl);

	var database = framework.GetDatabase();
	var promice = database.getPromiceCollection(this.m_collectionName)
	.then(function(results){
		response.writeHeader(200, {
			"Content-Type" : "application/json; charset=utf-8", 
		});

		//console.log("JSON.stringify(results):" + JSON.stringify(results));

		response.write(JSON.stringify(results));
		response.end();

		return true;
	});

	return promice;
}

module.exports = function(collectionName) {
	var collectionResource = new CollectionResource(collectionName);
	return collectionResource;
}

//module.exports.rules = function() {
//	var character = new CharacterRules();
//	return character;
//}

