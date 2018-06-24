goog.forwardDeclare("c.GameObject");

/**
 * @private
 * @final
 * @constructor
 * @param {!Object} in_staticData
 * @param {!Object} in_instructionContext
 * @return {undefined}
 */
c.GameObjectManager = function(in_staticData, in_instructionContext) {
	this.m_staticData = in_staticData;
	this.m_instructionContext = in_instructionContext;

	return;
}
c["GameObjectManager"] = c.GameObjectManager;

c.GameObjectManager.sWriteLockKey = "_write_lock";
c.GameObjectManager.sIDKey = "_id";
c.GameObjectManager.sTypeKey = "_type";

/**
 * @nosideefect
 * @param {!Object} in_staticData
 * @param {!Object} in_instructionContext
 * @return {!c.GameObjectManager}
 */
c.GameObjectManager.Factory = function(in_staticData, in_instructionContext) {
	return new c.GameObjectManager(in_staticData, in_instructionContext);
}
c.GameObjectManager["Factory"] = c.GameObjectManager.Factory;

/**
 * @nosideefect
 * @param {!string} in_type
 * @return {Object|undefined}
 */
c.GameObjectManager.prototype.newGameDocument = function(in_type, in_idOrUndefined, in_destObjectOrUndefined) {
	c.Log(LOG, "GameObjectManager.newGameDocument");
	if(this.m_staticData["gameobject_types"] == null) {
		c.Log(LOG, "GameObjectManager.newGameDocument gameobject_types undefined");
		return undefined;
	}
	if(false === (in_type in this.m_staticData["gameobject_types"])) {
		c.Log(LOG, "GameObjectManager.newGameDocument gameobject_types in_type not found:" + in_type);
		return undefined;
	}
	const data = this.m_staticData["gameobject_types"][in_type];
	if(data == null) {
		c.Log(LOG, "GameObjectManager.newGameDocument null data for type type:" + in_type);
		return undefined;
	}

	const metadata = this.m_staticData[data["metadata"]];
	const rules = this.m_staticData[data["rules"]];
	const context = this.m_instructionContext[data["context"]];

	var gameDocument = (in_destObjectOrUndefined == undefined) ? {} : in_destObjectOrUndefined;
	gameDocument[c.GameObjectManager.sIDKey] = in_idOrUndefined;
	gameDocument[c.GameObjectManager.sTypeKey] = in_type;
	gameDocument[c.GameObjectManager.sWriteLockKey] = 0; //assume all documents will be writelock
	if(metadata != undefined) {
		for(var prop in metadata) {
			var document = metadata[prop];
			var value = this.getDefaultMetadataValue(document);
			gameDocument[prop] = value;
		}
	}
	return gameDocument;
}
c.GameObjectManager.prototype["newGameDocument"] = c.GameObjectManager.prototype.newGameDocument;

/**
 * @nosideefect
 * @param {Object} in_document
 * @return {*}
 */
c.GameObjectManager.prototype.getDefaultMetadataValue = function(in_document) {
	if(in_document == null) {
		return undefined;
	}

	switch(in_document["type"]) {
		default:
			break;
		case "key":
			var table = this.m_staticData[in_document["key_table"]];
			if(table != undefined) {
				for(var prop in table) {
					return prop;
				}
			}
			break;
		case "integer":
			return 0;
		case "integer_array":
			return [];
		case "number":
			return 0;
		case "number_array":
			return [];
		case "real":
			return 0.0;
		case "real_array":
			return [];
		case "string":
			return "";
		case "string_array":
			return [];
		case "bool":
			return false;
		case "bool_array":
			return [];
		case "guid":
			return c.uuid();
		case "guid_array":
			return [];
		case "game_object":
			break;
		case "game_object_array":
			return [];
		case "game_object_array_exclusive":
			return [];
	}
	return undefined;
}


/**
 * @nosideefect
 * @param {!Object} in_document
 * @return {!c.GameObject|undefined}
 */
c.GameObjectManager.prototype.documentToGameObject = function(in_document, in_destObjectOrUndefined) {
	c.Log(LOG, "GameObjectManager.documentToGameObject");
	if(in_document == null) {
		return undefined;
	}

	var type = in_document[c.GameObjectManager.sTypeKey];

	if(type == null) {
		return undefined;
	}
	if(false === (type in this.m_staticData["gameobject_types"])) {
		return undefined;
	}
	const data = this.m_staticData["gameobject_types"][type];
	if(data == null) {
		c.Log(LOG, "GameObjectManager.documentToGameObject null data for type type:" + type);
		return undefined;
	}

	const metadata = this.m_staticData[data["metadata"]];
	const rules = this.m_staticData[data["rules"]];
	const context = this.m_instructionContext[data["context"]];

	localDocument = in_document; //todo. sanitize

	const id = localDocument[c.GameObjectManager.sIDKey];
	const writeLock = localDocument[c.GameObjectManager.sWriteLockKey]; 

	var mapNameNode = {};
	var arrayCalculateNode = [];

	//c.Log(LOG, "GameObjectManager.documentToGameObject add metadata");

	//add metadata
	if(metadata != undefined) {
		for(var prop in metadata) {
			var document = metadata[prop];
			var value = localDocument[prop];
			var node = c.DagNodeValue.Factory(prop, value);
			mapNameNode[prop] = node;
		}
	}

	//c.Log(LOG, "GameObjectManager.documentToGameObject add rules");

	//add rules
	if(rules != undefined) {
		for(var prop in rules) {
			var document = rules[prop];
			var sourceInstructionArray = document["operation"];
			var destInstructionArray = [];

			for (var subIndex = 0, subTotal = sourceInstructionArray.length; subIndex < subTotal; subIndex++) {
				var instruction = sourceInstructionArray[subIndex];
				if(instruction == null) {
					c.Log(LOG, "GameObjectManager.documentToGameObject null instruction found prop:" + prop + " index:" + subIndex);
					continue;
				}
				destInstructionArray.push({ "op": instruction["op"], "data": instruction["data"] });
			}

			var node = c.DagNodeCalculate.Factory(prop, destInstructionArray, context);
			mapNameNode[prop] = node;
			arrayCalculateNode.push(node);
		}
	}

	var dagCollection = c.DagNodeCollection.Factory(mapNameNode, arrayCalculateNode);
	var gameObject = c.GameObject.Factory(type, id, writeLock, dagCollection);

	//c.Log(LOG, "GameObjectManager.documentToGameObject end");
	return gameObject;
}
c.GameObjectManager.prototype["documentToGameObject"] = c.GameObjectManager.prototype.documentToGameObject;

/**
 * @nosideefect
 * @param {!c.GameObject} in_gameObject
 * @return {!Object|undefined}
 */
c.GameObjectManager.prototype.gameObjectToDocument = function(in_gameObject) {
	if(in_gameObject === undefined) {
		return undefined;
	}
	var type = gameObject.GetType();
	if(false === (type in this.m_staticData.gameobject_types)) {
		return undefined;
	}
	const data = this.m_staticData.gameobject_types[type];
	const metadata = this.m_staticData[data.metadata];
	const rules = this.m_staticData[data.rules];
	const context = this.m_instructionContext[data.context];

	if(metadata != undefined) {
		var document = {};
		document[c.GameObjectManager.sIDKey] = gameObject.GetID();
		document[c.GameObjectManager.sTypeKey] = type;
		document[c.GameObjectManager.sWriteLockKey] = gameObject.GetWriteLock();

		for(var index = 0, total = metadata.length; index < total; index++) {
			var metaDocument = metadata[index];
			var key = metaDocument._id;
			var value = gameObject.GetValue(key);

			// certain types need the value Doctored (game object snapshot array....)
			//value = this.GameObjectToGameDocumentDoctorValue(value, metaDocument);

			document[key] = value;
		}
		return document;
	};
	return undefined;
}
c.GameObjectManager.prototype["gameObjectToDocument"] = c.GameObjectManager.prototype.gameObjectToDocument;

//makePatchObject
//applyPatchObject

