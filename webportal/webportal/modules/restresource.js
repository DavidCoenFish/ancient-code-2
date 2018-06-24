const Q = require("q");
const MongoDB = require('mongodb');
const Util = require("./util.js");

const RestResource = function(type, collectionName, gameObjectManager) {
	this.m_type = type;
	this.m_collectionName = collectionName;
	this.m_gameObjectManager = gameObjectManager;
	return;
}

//options
RestResource.prototype.options = function(response, framework, endpointUrl, slingUrl, body) {
	var arrayMethods = Util.GetMethods(this);
	var allow = arrayMethods.join(",").toUpperCase();
	response.writeHeader(200, {
		"content-type" : "application/json; charset=utf-8", 
		"allow" : allow
	});
	response.end();
	return Q();
}


//create
RestResource.prototype.post = function(response, framework, endpointUrl, slingUrl, body) {
	console.log("RestResource.post:" + body);
	var bodyJson= JSON.parse(body);
	var database = framework.GetDatabase();
	var sanitizedDocument = this.m_gameObjectManager.SanitizeGameDocument(bodyJson);
	console.log("sanitizedDocument:" + JSON.stringify(sanitizedDocument));
	return database.insertDocumentReturnID(this.m_collectionName, sanitizedDocument).then(function(results){
		console.log("results:" + results);
		var newSlingUrl = slingUrl.Clone();
		newSlingUrl.ClearAllSelector();
		newSlingUrl.SetSelector(results);
		response.writeHeader(201, {
			"Content-Type" : "application/json; charset=utf-8", 
			"Location" : newSlingUrl.ComposeURL()
		});
		response.end();
		return true;
	}).fail(function(error){
		console.log("fail.error:" + error);
		return false;
	});
}

//read
RestResource.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	console.log("RestResource.prototype.get:" + endpointUrl); // + " m_collectionName:" + this.m_collectionName);
	var database = framework.GetDatabase();
	var selectors = slingUrl.GetSelectorKeys();
	var promiceThen = function(result){
		if (result === undefined){
			return false;
		}

		if (result === null){
			response.writeHeader(404, {
				"Content-Type" : "application/json; charset=utf-8", 
			});
			response.end();
			return true;
		}

		//console.log("JSON.stringify(result):" + JSON.stringify(result));

		response.writeHeader(200, {
			"Content-Type" : "application/json; charset=utf-8", 
		});

		response.write(JSON.stringify(result));
		response.end();
		return true;
	};

	console.log("selectors.length:" + selectors.length);

	if (1 <= selectors.length){
		var key = selectors[0];
		var id = new MongoDB.ObjectId(key);
		return database.getPromiceDocumentByID(this.m_collectionName, id).then(promiceThen);
	}
	else
	{
		return database.getPromiceCollection(this.m_collectionName).then(promiceThen);
	}
}

//update
RestResource.prototype.put = function(response, framework, endpointUrl, slingUrl, body) {
	//console.log("RestResource.prototype.put:" + endpointUrl);
	var database = framework.GetDatabase();
	var selectors = slingUrl.GetSelectorKeys();
	if (1 <= selectors.length){
		var key = selectors[0];
		var id = new MongoDB.ObjectId(key);
		var bodyJson = JSON.parse(body);

		var writeLock = this.m_gameObjectManager.GetGameDocumentWriteLock(bodyJson);
		var documentPatch = this.m_gameObjectManager.SanitizeGameDocumentUpdate(bodyJson);
		if (documentPatch === undefined){
				response.writeHeader(204); //No Content
				response.end();
			return Q(true);
		}
		return database.updateDocumentByIDWriteLock(this.m_collectionName, id, writeLock, documentPatch).then(function(input){
			//console.log("JSON.stringify(input):" + JSON.stringify(input));

			if (true == input) {
				response.writeHeader(200, {
					"Content-Type" : "application/json; charset=utf-8", 
				});
				writeLock += 1;
				response.write(JSON.stringify({"writeLock":writeLock}));
				response.end();
			} else {
				//stuff didn't work, oblige client to do another get and resubmit
				response.writeHeader(409, {
					"Content-Type" : "application/json; charset=utf-8", 
				});
				response.end();
			}
			return true;
		});
	}

	throw "no resource specified";
}

//delete
RestResource.prototype.delete = function(response, framework, endpointUrl, slingUrl, body) {
	var database = framework.GetDatabase();
	var selectors = slingUrl.GetSelectorKeys();
	var promice = null;
	if (1 <= selectors.length){
		var key = selectors[0];
		var id = new MongoDB.ObjectId(key);
		promice = database.deletePromiceDocumentByID(this.m_collectionName, id);
	}
	else
	{
		promice = database.deletePromiceDocument(this.m_collectionName);
	}

	return promice.then(function(results){
		response.writeHeader(200, {
			"Content-Type" : "application/json; charset=utf-8", 
		});
		response.end();
		return true;
	});
}

RestResource.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.end();
	return Q();
}

module.exports = function(type, collectionName, gameObjectManager) {
	var restResource = new RestResource(type, collectionName, gameObjectManager);
	return restResource;
}
