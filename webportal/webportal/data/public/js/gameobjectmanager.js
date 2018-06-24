/*
gameObjectManager
has map of type to table_meta, table_rules

new document
document to game object //if item is missing from document, use default
game object to document

sanitize document // check types, range, white list items
create delta document // 
set random seed
_getItemDefault?


dataServer.GetCollectionIDField(table, id, field);
dataServer.GetDiceRolls(sides, count)

//GameObjectManagerDataServer

gameobjectmanagerdataserver

GameObjectManagerDataServer.GetMetaCollectionNameForType(type);
GameObjectManagerDataServer.GetRuleCollectionNameForType(type);
GameObjectManagerDataServer.GetCollection(collectionName); //return collection, (expect collections to be prefetched)
GameObjectManagerDataServer.GetCollectionIDField(collectionName, id, fieldName); //return value of field from document id in collection, (expect collections to be prefetched)
	
*/
const sWriteLockKey = "_write_lock";
const sIDKey = "_id";
const sTypeKey = "_type";

/* just keep enums as string, other than things like data calculation that goes through object construction
	data for rules is storred as enum strings
const MetaType = Object.freeze({
	"string" : 1,
	"boolean" : 2,
	"enum" : 3,
	"number" : 4,
	"integer" : 5,
	"real" : 6,
	"game_object_array" : 7,
	"game_object_exclusive" : 8
})
*/

const GameObjectManager = function(gameObjectManagerDataServer) {
	this.m_gameObjectManagerDataServer = gameObjectManagerDataServer;

	return;
}

GameObjectManager.prototype.GetLoadPromice = function() {
	return this.m_gameObjectManagerDataServer.GetLoadPromice();
}

GameObjectManager.prototype.GetDataServer = function() {
	return this.m_gameObjectManagerDataServer;
}

GameObjectManager.prototype.GetGameDocumentID = function(gameDocument) {
	if (sIDKey in gameDocument){
		return gameDocument[sIDKey];
	}
	return undefined;
}

GameObjectManager.prototype.GetGameDocumentType = function(gameDocument) {
	if (sTypeKey in gameDocument){
		return gameDocument[sTypeKey];
	}
	return undefined;
}

GameObjectManager.prototype.GetGameDocumentWriteLock = function(gameDocument) {
	if (sWriteLockKey in gameDocument){
		return gameDocument[sWriteLockKey];
	}
	return undefined;
}

//return promice of new document
GameObjectManager.prototype.NewGameDocument = function(type, idOrUndefined, destObjectOrUndefined) {
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);

	var gameDocument = (destObjectOrUndefined == undefined) ? {} : destObjectOrUndefined;
	gameDocument[sIDKey] = idOrUndefined;
	gameDocument[sTypeKey] = type;
	gameDocument[sWriteLockKey] = 0; //assume all documents will be writelock
	if (metaCollection != undefined){
		for (var index = 0, total = metaCollection.length; index < total; index++) {
			var document = metaCollection[index];
			var key = document._id;
			var value = GameObjectManager.ObligeType(document);
			gameDocument[key] = value;
		}
	}
	return gameDocument;
}

GameObjectManager.prototype.GameDocumentToGameObject = function(gameDocument, destObjectOrUndefined) {
	//console.log("GameDocumentToGameObject:" + JSON.stringify(gameDocument));
	var localGameDocument = this.SanitizeGameDocument(gameDocument);
	if (localGameDocument == undefined){
		console.log("GameDocumentToGameObject SanitizeGameDocument failed");
		return undefined;
	}
	var type = localGameDocument[sTypeKey];
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	var ruleCollectionName = this.m_gameObjectManagerDataServer.GetRuleCollectionNameForType(type);
	var ruleCollection = this.m_gameObjectManagerDataServer.GetCollection(ruleCollectionName);
	if (ruleCollection == undefined){
		console.log("GameDocumentToGameObject ruleCollection failed");
		return undefined;
	}
	var gameObject = GameObject.Factory(localGameDocument, metaCollection, ruleCollection, this, destObjectOrUndefined);
	//console.log("GameDocumentToGameObject:done");
	return gameObject;
}

GameObjectManager.prototype.GameObjectToGameDocument = function(gameObject) {
	if (gameObject === undefined){
		return undefined;
	}
	var type = gameObject.GetType();
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	if (metaCollection != undefined){
		var gameDocument = {};
		gameDocument[sIDKey] = gameObject.GetID();
		gameDocument[sTypeKey] = type;
		gameDocument[sWriteLockKey] = gameObject.GetWriteLock();

		for (var index = 0, total = metaCollection.length; index < total; index++) {
			var metaDocument = metaCollection[index];
			var key = metaDocument._id;
			var value = gameObject.GetValue(key);

			// certain types need the value Doctored (game object snapshot array....)
			value = this.GameObjectToGameDocumentDoctorValue(value, metaDocument);

			gameDocument[key] = value;
		}
		return gameDocument;
	};
	return undefined;
}

/*
gameObjectMoving has already been removed from it's previous owner, and we want to insert it into gameObjectOwner
returns gameObjectMoving if it could not be added to game object
*/
GameObjectManager.prototype.GameObjectSetExclusiveGameObject = function(gameObjectOwner, gameObjectMoving, targetValueName) {
	if ((gameObject === undefined) ||
		(gameObjectMoving === undefined) ||
		(targetValueName === undefined)){
		return gameObjectMoving;
	}
	var type = gameObjectOwner.GetType();
	var typeMoving = gameObjectMoving.GetType();
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	if (metaCollection === undefined) {
		return gameObjectMoving;
	}

	for (var index = 0, total = metaCollection.length; index < total; index++) {
		var metaDocument = metaCollection[index];
		var key = metaDocument._id;
		if (key !== targetValueName){
			continue;
		}
		if (metaDocument.type !== "game_object_exclusive"){
			return gameObjectMoving;
		}
		if (false === (typeMoving in metaDocument.exclusive_subject_type)){
			return gameObjectMoving;
		}
		var exclusiveDumpTarget = metaDocument.exclusive_dump_target;
		var dumpTarget = gameObjectOwner.GetValue(exclusiveDumpTarget);
		//move anything in the options data into dumpTarget
		for (var subIndex = 0, subTotal = metaDocument.options.length; subIndex < subTotal; subIndex++) {
			var typeNameToClear = metaDocument.options[subIndex];
			var gameObjectsToRemove = gameObjectOwner.GetValue(typeNameToClear);
			dumpTarget.concat(gameObjectsToRemove);
		}
		//todo: deal with array max
		var preExisitingItems = gameObjectOwner.GetValue(targetValueName);
		if (true === metaDocument.use_max){
			var sliced = preExisitingItems.slice(metaDocument.max - 1);
			preExisitingItems.length = metaDocument.max - 1;
			dumpTarget.concat(sliced);
		}

		gameObjectOwner.SetValue(targetValueName, preExisitingItems);
		gameObjectOwner.SetValue(exclusiveDumpTarget, dumpTarget);

		return undefined;
	}
	return gameObjectMoving;
}

GameObjectManager.prototype.GameObjectToGameDocumentDoctorValue = function(value, metaDocument) {
	var metaType = metaDocument.type;
	if (metaType === "game_object_array"){
		var result = [];
		if ((value != undefined) && (value.constructor === Array)){
			for (var index = 0, total = value.length; index < total; index++) {
				var item = value[index];
				var gameDocument = this.GameObjectToGameDocument(item);
				if (gameDocument != undefined){
					result.push(gameDocument);
				}
			}
		}
		return result;
	}
	return value;
}

//ie, server sanitize document from client before adding to table (add keys if missing)
GameObjectManager.prototype.SanitizeGameDocument = function(gameDocument) {
	//console.log("SanitizeGameDocument:gameDocument:" + JSON.stringify(gameDocument));
	var type = gameDocument[sTypeKey];
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	if (metaCollection != undefined){
		var resultDocument = {};
		if (sIDKey in gameDocument){
			resultDocument[sIDKey] = gameDocument[sIDKey];
		}
		resultDocument[sTypeKey] = type;
		var writeLock = 0;
		if (sWriteLockKey in gameDocument){
			resultDocument[sWriteLockKey] = gameDocument[sWriteLockKey];
		}
		resultDocument[sWriteLockKey] = writeLock;

		for (var index = 0, total = metaCollection.length; index < total; index++) {
			var metaDocument = metaCollection[index];
			var key = metaDocument._id;
			var value = GameObjectManager.ObligeType(metaDocument, gameDocument[key]);
			resultDocument[key] = value;

		}

		//console.log("SanitizeGameDocument:resultDocument:" + JSON.stringify(resultDocument));
		return resultDocument;
	};
	return undefined;
}

//ie, server sanitize document from client before updating table (don't add keys if missing)
GameObjectManager.prototype.SanitizeGameDocumentUpdate = function(gameDocument) {
	//console.log("SanitizeGameDocumentUpdate:gameDocument:" + JSON.stringify(gameDocument));
	var type = gameDocument[sTypeKey];
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	if (metaCollection != undefined){
		var resultDocument = {};
		var keyFound = false;
		for (var index = 0, total = metaCollection.length; index < total; index++) {
			var metaDocument = metaCollection[index];
			var key = metaDocument._id;
			if (key in gameDocument){
				var value = GameObjectManager.ObligeType(metaDocument, gameDocument[key]);
				resultDocument[key] = value;
				keyFound = true;
			}
		}
		if (true === keyFound){
			return resultDocument;
		}
	};
	return undefined;
}

//ie, client minimize data
GameObjectManager.prototype.CreateDeltaDocument = function(gameDocumentBase, gameDocumentTarget) {
	var type = gameDocumentBase[sTypeKey];
	var metaCollectionName = this.m_gameObjectManagerDataServer.GetMetaCollectionNameForType(type);
	var metaCollection = this.m_gameObjectManagerDataServer.GetCollection(metaCollectionName);
	if (metaCollection != undefined){
		var resultDocument = {};
		resultDocument[sIDKey] = gameDocumentBase[sIDKey];
		resultDocument[sTypeKey] = type;
		resultDocument[sWriteLockKey] = gameDocumentBase[sWriteLockKey];

		var keyFound = false;
		for (var index = 0, total = metaCollection.length; index < total; index++) {
			var metaDocument = metaCollection[index];
			var key = metaDocument._id;
			var value = undefined;
			if (key in gameDocumentTarget){
				value = gameDocumentTarget[key];
			}
			if (value !== undefined){
				var value = GameObjectManager.ObligeType(metaDocument, value);
				if ((value !== gameDocumentBase[key]) && (value !== undefined)){
					resultDocument[key] = value;
					keyFound = true;
				}
			}
		}
		if (keyFound === true){
			return resultDocument;
		}
	}
	return undefined;
}

GameObjectManager.GetItemDefault = function(metaDocument){
	var defaultValue = metaDocument.default;
	if (Object.prototype.toString.call(defaultValue) === '[object Array]'){
		return defaultValue[Math.floor(Math.random() * defaultValue.length)];
	}

	return defaultValue;
}

GameObjectManager.ObligeType = function(metaDocument, valueOrUndefined) {
	var defaultValue = GameObjectManager.GetItemDefault(metaDocument);
	if (valueOrUndefined == undefined){
		valueOrUndefined = defaultValue;
	}

	switch (metaDocument.type){
	default:
		break;
	case "string":
		if (valueOrUndefined !== undefined){
			return "" + valueOrUndefined;
		}
		return "";
	case "boolean":
		//console.log("ObligeType:" + (typeof valueOrUndefined) + " " + valueOrUndefined);
		if ("string" === typeof valueOrUndefined){
			var result = (valueOrUndefined.toLowerCase() === "true");
			//console.log(result);
			return result;
		}
		return (true == valueOrUndefined);
	case "enum":
		if (-1 === metaDocument.options.indexOf(valueOrUndefined)){
			return undefined;
		}
		return valueOrUndefined;
	case "number":
		valueOrUndefined = Math.max(0, Math.round(valueOrUndefined));
		if (Number.isNaN(valueOrUndefined)){
			return defaultValue;
		}
		return valueOrUndefined;
	case "integer":
		valueOrUndefined = Math.round(valueOrUndefined);
		if (Number.isNaN(valueOrUndefined)){
			return defaultValue;
		}
		return valueOrUndefined;
	case "real":
		if (Number.isNaN(valueOrUndefined)){
			return defaultValue;
		}
		return valueOrUndefined;
	case "game_object_snapshot_array":
		if (valueOrUndefined != null){
			return [].concat(valueOrUndefined);
		}
		return [];
	case "game_object_array":
		if (valueOrUndefined != null){
			return [].concat(valueOrUndefined);
		}
		return [];
	case "string_array":
		if (valueOrUndefined != null){
			return [].concat(valueOrUndefined);
		}
		return [];
	}

	console.log("ObligeType failed to find type data:" + JSON.stringify(metaDocument) + " value:" + valueOrUndefined);
	return defaultValue;
}


GameObjectManager.prototype.GetCollectionIDField = function(collectionName, id, field){
	return this.m_gameObjectManagerDataServer.GetCollectionIDField(collectionName, id, field);
}

GameObjectManager.prototype.MakeRandomGenerator = function(seed){
	return this.m_gameObjectManagerDataServer.MakeRandomGenerator(seed);
}

GameObjectManager.prototype.RandomStreamDieRoll = function(arrayRandomValue, randomIndex, count, sides){
	return this.m_gameObjectManagerDataServer.RandomStreamDieRoll(arrayRandomValue, randomIndex, count, sides);
}

GameObjectManager.factory = function(gameObjectManagerDataServer)
{
	return new GameObjectManager(gameObjectManagerDataServer);
}


