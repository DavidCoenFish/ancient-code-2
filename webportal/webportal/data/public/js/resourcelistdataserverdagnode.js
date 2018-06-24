const ResourceListDataServerDagNode = function(gameObject, valueName, typeEndpontMap, gameObjectManager, childCloseCallback) {
	this.m_gameObject = gameObject;
	this.m_valueName = valueName;
	this.m_typeEndpontMap = typeEndpontMap;
	this.m_gameObjectManager = gameObjectManager;
	this.m_setOnChangeCallback = undefined;
	this.m_childCloseCallback = childCloseCallback;

	return;
}

ResourceListDataServerDagNode.Factory = function(gameObject, valueName, typeEndpontMap, gameObjectManager, childCloseCallback){
	var dataServer = new ResourceListDataServerDagNode(gameObject, valueName, typeEndpontMap, gameObjectManager, childCloseCallback);
	return dataServer;
}

ResourceListDataServerDagNode.prototype.GetObjectArray = function(){
	//console.log("GetObjectArray  this.m_valueName:" + this.m_valueName);
	var arrayGameObjects = this.m_gameObject.GetValue(this.m_valueName);
	var result = [];
	for (var index = 0, total = arrayGameObjects.length; index < total; index++) {
		var gameObject = arrayGameObjects[index];
		//console.log("GetObjectArray  index:" + index + " gameObject:" + gameObject);
		if (gameObject == undefined){
			continue;
		}
		var name = gameObject.GetValue("name");
		var id = gameObject.GetID();
		var type = gameObject.GetType();
		result.push({"name": name, "_id": id, "_type":type});
	}
	return Q(result);
}

ResourceListDataServerDagNode.prototype.GetShowClose = function(){
	return false;
}

ResourceListDataServerDagNode.prototype.GetShowTrash = function(){
	return true;
}

ResourceListDataServerDagNode.prototype.GetShowAdd = function(){
	return true;
}

ResourceListDataServerDagNode.prototype.GetListHasDragOnto = function(){
	return true;
}

ResourceListDataServerDagNode.prototype.GetObjectsHaveAction = function(){
	return true;
}

ResourceListDataServerDagNode.prototype.GetDragOntoListTypeAccepted = function(types){
	//console.log("GetDragOntoListTypeAccepted  this.m_typeEndpontMap:" + JSON.stringify(this.m_typeEndpontMap) + " types:" + types);

	for (var index = 0, total = types.length; index < total; index++) {
		var type = types[index];
		if (type in this.m_typeEndpontMap){
			return true;
		}
	}
	return false;
}
ResourceListDataServerDagNode.prototype.OnClose = function(resourceList){}
ResourceListDataServerDagNode.prototype.OnAdd = function(resourceList){
	var arrayTypeKeys = Object.keys(this.m_typeEndpontMap);
	if (1 == arrayTypeKeys.length){
		var type = arrayTypeKeys[0];
		return this._OnAdd(type);
	}

	var that = this;
	var promice = MakeTypeDialog(this.m_typeEndpontMap, function(type){ return that._OnAdd(type);});
	return promice;
}

ResourceListDataServerDagNode.RandomString = function(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

ResourceListDataServerDagNode.prototype._OnAdd = function(type){
	var id = ResourceListDataServerDagNode.RandomString(17, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
	var gameDocument = this.m_gameObjectManager.NewGameDocument(type, id);
	var newObject = this.m_gameObjectManager.GameDocumentToGameObject(gameDocument);
	//console.log("type: " + type + " newObject:" + newObject);
	var arrayGameObjects = this.m_gameObject.GetValue(this.m_valueName);
	arrayGameObjects.push(newObject);
	this.m_gameObject.SetValue(this.m_valueName, arrayGameObjects);
	return Q(true);
}

ResourceListDataServerDagNode.prototype.OnObjectAction = function(id, type, resourceList, divToOccupy){
	console.log("ResourceListDataServerDagNode.OnObjectAction id:" + id + " type:" + type + " divToOccupy:" + divToOccupy.id);
	var arrayGameObjects = this.m_gameObject.GetValue(this.m_valueName);

	for (var index = 0, total = arrayGameObjects.length; index < total; index++) {
		var item = arrayGameObjects[index];
		if ((item != undefined) && (item.GetID() === id)){

			var dataServer = ResourceEditDataServerDagNode.Factory(item, this.m_gameObjectManager, this.m_childCloseCallback);
			ResourceEdit.Factory(divToOccupy, dataServer, this.m_gameObjectManager);

			break;
		}
	}

	return;
}

ResourceListDataServerDagNode.prototype.OnDropList = function(id, types){
	//console.log("OnDropList id:" + id + " types:" + types);
	var type = undefined;
	var endpoint = undefined;
	for (var index = 0, total = types.length; index < total; index++) {
		var testType = types[index];
		if (testType in this.m_typeEndpontMap){
			type = testType;
			endpoint = this.m_typeEndpontMap[type];
		}
	}

	if ((type == undefined) || (endpoint == undefined)){
		return Q(false);
	}

	//i want the game object from 
	//var gameObject = this.m_gameObjectManager.
	var that = this;
	var promice = this.GetGameDocumentPromice(id, type, endpoint).then(function(gameDocument){
		//console.log("marko0");

		var gameObject = that.m_gameObjectManager.GameDocumentToGameObject(gameDocument);
		var arrayGameObjects = that.m_gameObject.GetValue(that.m_valueName);
		//unique? ask meta?
		arrayGameObjects.push(gameObject);
		that.m_gameObject.SetValue(that.m_valueName, arrayGameObjects);

		//console.log("marko");

		if (that.m_setOnChangeCallback != undefined){
			that.m_setOnChangeCallback();
		}

		//console.log("that.m_gameObject:" + that.m_gameObject.toString());

		return true;
	});

	return promice;
}

ResourceListDataServerDagNode.prototype.GetGameDocumentPromice = function(id, type, endpoint){
	if (this.m_gameDocumentPromice !== undefined){
		return Q(this.m_gameDocumentPromice);
	}
	var deferred = Q.defer();
	var that = this;
	const requestData = new XMLHttpRequest();
	var url = endpoint + id + ".";
	requestData.open("GET", url, true);
	requestData.onload = function() {
		if (200 <= requestData.status && requestData.status < 400) {
			//console.log("ResourceListDataServerDagNode:GetGameDocumentPromice url:" + url + " responseText:" + requestData.responseText);
			var data = JSON.parse(requestData.responseText);
			deferred.resolve(data);
		} else {
			deferred.reject(new Error("requestData GetGameObject reached our target server, but it returned an error:" + requestData.status));
		}
	};

	requestData.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	requestData.send();
	return deferred.promise;
}


ResourceListDataServerDagNode.prototype.OnDropTrash = function(id){
	var gameObjectArray = this.m_gameObject.GetValue(this.m_valueName);
	if (undefined === gameObjectArray){
		return Q(false);
	}
	console.log("gameObjectArray.length:" + gameObjectArray.length + " id:" + id);

	for (var index = 0, total = gameObjectArray.length; index < total; index++) {
		var item = gameObjectArray[index];
		if ((item != undefined) && (item.GetID() === id)){
			gameObjectArray.splice(index, 1);
			break;
		}
	}

	console.log("gameObjectArray.length:" + gameObjectArray.length);

	this.m_gameObject.SetValue(this.m_valueName, gameObjectArray);
	if (this.m_setOnChangeCallback != undefined){
		this.m_setOnChangeCallback();
	}
	return Q(true);
}

ResourceListDataServerDagNode.prototype.setOnChange = function(setOnChangeCallback){
	this.m_setOnChangeCallback = setOnChangeCallback;
	return;
}
