/*
	for client?
*/
const GameObjectManagerDataServer = function(loadPromice) {
	this.m_loadPromice = loadPromice; // all data should be loaded by the time this settles
	this.m_mapCollection = {};
	this.m_mapTypeMeta = {};
	return;
}

GameObjectManagerDataServer.prototype.toString = function() {
	var ret = "{\"m_mapCollection\":{";
	var first = true;
	for (var name in this.m_mapCollection) {
		if (true === first){
			first = false;
		} else {
			ret += ", ";
		}
		ret += "\"" + name + "\":" + JSON.stringify(this.m_mapCollection[name]);
	}

	ret += "},\"m_mapTypeMeta\":{";
	first = true;
	for (var name in this.m_mapTypeMeta) {
		if (true === first){
			first = false;
		} else {
			ret += ", ";
		}
		ret += "\"" + name + "\":\"" + this.m_mapTypeMeta[name] + "\"";
	}

	ret += "},\"m_mapTypeRules\":{";
	first = true;
	for (var name in this.m_mapTypeRules) {
		if (true === first){
			first = false;
		} else {
			ret += ", ";
		}
		ret += "\"" + name + "\":\"" + this.m_mapTypeRules[name] + "\"";
	}

	ret += "}}";
	return ret;
}


GameObjectManagerDataServer.prototype.GetLoadPromice = function() {
	return this.m_loadPromice;
}

GameObjectManagerDataServer.prototype.SetMetaForType = function(type, document) {
	//console.log("SetMetaCollectionNameForType:" + type + " " + collectionName);
	this.m_mapTypeMeta[type] = document;
	return;
}

GameObjectManagerDataServer.prototype.GetMetaCollectionNameForType = function(type) {
	var document = this.m_mapTypeMeta[type];
	if (document != undefined){
		return document.meta;
	}
	console.log("WARNING get meta collection name for type:" + type + " failed");

	return undefined;
}

GameObjectManagerDataServer.prototype.GetRuleCollectionNameForType = function(type) {
	var document = this.m_mapTypeMeta[type];
	if (document != undefined){
		return document.rules;
	}
	console.log("WARNING get rule collection name for type:" + type + " failed");
	return undefined;
}

GameObjectManagerDataServer.prototype.GetEndpointNameForType = function(type) {
	var document = this.m_mapTypeMeta[type];
	if (document != undefined){
		return document.endpoint;
	}
	console.log("WARNING get endpoint name for type:" + type + " failed");
	return undefined;
}

GameObjectManagerDataServer.prototype.GetCollection = function(collectionName) {
	if (collectionName in this.m_mapCollection) {
		return this.m_mapCollection[collectionName];
	}
	console.log("WARNING get collection for:" + collectionName + " failed");
	return undefined;
}

GameObjectManagerDataServer.prototype.SetCollection = function(collectionName, collection) {
	this.m_mapCollection[collectionName] = collection;
	return;
}

GameObjectManagerDataServer.prototype.GetCollectionIDField = function(collectionName, id, field) {
	if (collectionName in this.m_mapCollection){
		var collection = this.m_mapCollection[collectionName];
		for (var index = 0, total = collection.length; index < total; index++) {
			var document = collection[index];
			if (id == document._id){
				return document[field];
			}
		}
	}
	return undefined;
}

GameObjectManagerDataServer.prototype.MakeRandomGenerator = function(seed) {
	var randomGenerator = new MersenneTwister(seed);
	return randomGenerator;
}

GameObjectManagerDataServer.prototype.RandomStreamDieRoll = function(arrayRandomValue, randomIndex, count, sides){
	return Dice.RollsArrayRandom(arrayRandomValue, randomIndex, sides, count);
}

GameObjectManagerDataServer.prototype.GameObjectToGameDocument = function(object){

}


GameObjectManagerDataServer.factory = function(database, collectionNameTypes, collectionNameCollections)
{
	var promiceArray = [];
	promiceArray.push(database.getPromiceCollection(collectionNameTypes).then(function(collection){

		//console.log("gameObjectManager.collectionTypes:" + JSON.stringify(collection));

		var subPromiceArray = [];
		for (var index = 0, total = collection.length; index < total; index++) {
			(function(){
				var document = collection[index];
				var type = document._id;
				gameObjectManagerDataServer.SetMetaForType(type, document);
			})();
		}
		return collectionNameTypes;
	}));

	promiceArray.push(database.getPromiceCollection(collectionNameCollections).then(function(collection){

		//console.log("gameObjectManager.collectionCollections:" + JSON.stringify(collection));

		var subPromiceArray = [];
		for (var index = 0, total = collection.length; index < total; index++) {
			(function(){
				var document = collection[index];
				var collectionName = document._id;
				subPromiceArray.push(database.getPromiceCollection(collectionName).then(function(subCollection){
					gameObjectManagerDataServer.SetCollection(collectionName, subCollection);
					return collectionName;
				}));
			})();
		}
		return Q.allSettled(subPromiceArray)
		.then(function(input){
			var errorMessage = "";
			input.forEach(function (result) {
				if (result.state !== "fulfilled") {
					errorMessage += ":" + result.reason;
				}
			});
			if (errorMessage !== ""){
				throw new Error(errorMessage);
			}
			return true;
		});
	}));

	var loadPromice = Q.allSettled(promiceArray).then(function(input){
		var errorMessage = "";
		input.forEach(function (result) {
			if (result.state !== "fulfilled") {
				errorMessage += ":" + result.reason;
			}
		});
		if (errorMessage !== ""){
			throw new Error(errorMessage);
		}
		return true;
	}).then(function(input){
		//console.log(gameObjectManagerDataServer.toString());
		return true;
	});
	
	var gameObjectManagerDataServer = new GameObjectManagerDataServer(loadPromice);
	return gameObjectManagerDataServer;
}

