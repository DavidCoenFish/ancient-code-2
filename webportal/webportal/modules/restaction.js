const Q = require("q");
const MongoDB = require('mongodb');
const Util = require("./util.js");

const RestAction = function(sourceType, sourceCollectionName, destType, destCollectionName, actionCallback, gameObjectManager) {
	this.m_sourceType = sourceType;
	this.m_sourceCollectionName = sourceCollectionName;
	this.m_destType = destType;
	this.m_destCollectionName = destCollectionName;
	this.m_actionCallback = actionCallback;
	this.m_gameObjectManager = gameObjectManager;
	return;
}

//options
RestAction.prototype.options = function(response, framework, endpointUrl, slingUrl, body) {
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
// all we expect in the body is the id and write lock?
RestAction.prototype.post = function(response, framework, endpointUrl, slingUrl, body) {
	console.log("RestAction.post:" + body);
	var bodyJson = JSON.parse(body);

	var sourceID = this.m_gameObjectManager.GetGameDocumentID(bodyJson);
	//console.log("sourceID:" + sourceID);
	if (sourceID == undefined){
		response.writeHeader(400, {
			"Content-Type" : "application/json; charset=utf-8", 
		});
		response.end();
		return Q(true);
	}

	var that = this;
	var id = new MongoDB.ObjectId(sourceID);
	var database = framework.GetDatabase();
	var promiceArray = [];
	promiceArray.push(database.getPromiceDocumentByID(this.m_destCollectionName, id));
	promiceArray.push(database.getPromiceDocumentByID(this.m_sourceCollectionName, id));

	return Q.allSettled(promiceArray).then(function(input){
		//console.log("main allSettled:" + JSON.stringify(input));
		var results = [];
		for(var index = 0; index < input.length; ++index){
			var item = input[index];
			if (item.state === "rejected"){
				throw "rejected";
			} else if (item.state === "fulfilled"){
				results.push(item.value);
			}
		}
		return results;
	},function(error){
		console.log("error0:" + error);
		throw "rejected2";
	}).then(function(input){
		//console.log("then:" + input);
		var destObject = input[0];
		var sourceObject = input[1];

		if (sourceObject == null){
			throw "source object not found";
		}

		//do we need to update the action
		var sourceWriteLock = that.m_gameObjectManager.GetGameDocumentWriteLock(sourceObject);
		if ((destObject == null) || (that.m_gameObjectManager.GetGameDocumentWriteLock(destObject) < sourceWriteLock)){
			var sourceGameObject = that.m_gameObjectManager.GameDocumentToGameObject(sourceObject);
			var result = that.m_actionCallback(sourceGameObject);
			//console.log("m_actionCallback:" + JSON.stringify(result));

			result["_write_lock"] = sourceWriteLock;
			//result["_id"] = id;
			return database.upsertDocumentByID(that.m_destCollectionName, id, result);
		}
		return true;
	}).then(function(input){
		//console.log("results:" + input);
		var newSlingUrl = slingUrl.Clone();
		newSlingUrl.ClearAllSelector();
		newSlingUrl.SetSelector(input);
		response.writeHeader(201, {
			"Content-Type" : "application/json; charset=utf-8", 
			"Location" : newSlingUrl.ComposeURL()
		});
		response.write(JSON.stringify({"_id":sourceID}));
		response.end();
		return true;
	}).fail(function(error){
		console.log("throw:" + error);
		response.writeHeader(400, {
			"Content-Type" : "application/json; charset=utf-8", 
		});
		response.write(error);
		response.end();
		return true;
	//}).done(function(input){
	//	return true;
	});
}


//read
RestAction.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	console.log("RestAction.prototype.get:" + endpointUrl);
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
		return database.getPromiceDocumentByID(this.m_destCollectionName, id).then(promiceThen);
	}
	else
	{
		return database.getPromiceCollection(this.m_destCollectionName).then(promiceThen);
	}
}

//delete
RestAction.prototype.delete = function(response, framework, endpointUrl, slingUrl, body) {
	var database = framework.GetDatabase();
	var selectors = slingUrl.GetSelectorKeys();
	var promice = null;
	if (1 <= selectors.length){
		var key = selectors[0];
		var id = new MongoDB.ObjectId(key);
		promice = database.deletePromiceDocumentByID(this.m_destCollectionName, id);
	}
	else
	{
		promice = database.deletePromiceDocument(this.m_destCollectionName);
	}

	return promice.then(function(results){
		response.writeHeader(200, {
			"Content-Type" : "application/json; charset=utf-8", 
		});
		response.end();
		return true;
	});
}

RestAction.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	response.writeHeader(200, {
		"Content-Type" : "application/json; charset=utf-8", 
	});
	response.end();
	return Q();
}

module.exports = function(sourceType, sourceCollectionName, destType, destCollectionName, actionCallback, gameObjectManager) {
	var restAction = new RestAction(sourceType, sourceCollectionName, destType, destCollectionName, actionCallback, gameObjectManager);
	return restAction;
}
