const ResourceEditDataServerResource = function(endpoint, id, gameObjectManager, closeCallback) {
	this.m_endpoint = endpoint;
	this.m_type = undefined;
	this.m_id = id;
	this.m_gameObjectManager = gameObjectManager;
	this.m_closeCallback = closeCallback;
	return;
}

ResourceEditDataServerResource.prototype.OnSubmit = function(newGameObject){
	var that = this;
	this.GetGameDocumentPromice().then(function(oldDocument){
		var newDocument = that.m_gameObjectManager.GameObjectToGameDocument(newGameObject);
		var deltaDocument = that.m_gameObjectManager.CreateDeltaDocument(oldDocument, newDocument);
		if (deltaDocument !== undefined){
			console.log("OnSubmit:deltaDocument:" + JSON.stringify(deltaDocument));
			return that.SubmitData(deltaDocument);
		} else {
			console.log("OnSubmit:deltaDocument is empty");
		}
		that.m_gameDocumentPromice = undefined;
		return true;
	}).then(function(gameDocument){
		if (null != that.m_closeCallback){
			that.m_closeCallback();
		}
	}).done();

	return;
}

ResourceEditDataServerResource.prototype.SubmitData = function(document){
	var deferred = Q.defer();
	console.log("ResourceEditDataServerResource:SubmitData:document:" + JSON.stringify(document));
	var that = this;
	const requestData = new XMLHttpRequest();
	requestData.open('PUT', this.m_endpoint + "." + this.m_id + ".", true);
	requestData.onload = function() {
		if (200 <= requestData.status && requestData.status < 400) {
			console.log("SubmitData.responseText:" + requestData.responseText);
			deferred.resolve(true);
		} else {
			deferred.reject(new Error("requestData SubmitData reached our target server, but it returned an error:" + requestData.status));
		}
	};

	requestData.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	requestData.send(JSON.stringify(document));
	//console.log("SubmitData:requestData.send:" + JSON.stringify(document));

	return deferred.promise;
}

ResourceEditDataServerResource.prototype.OnCancle = function(){
	if (null != this.m_closeCallback){
		this.m_closeCallback();
	}
	return;
}

ResourceEditDataServerResource.prototype.GetGameDocumentPromice = function(){
	if (this.m_gameDocumentPromice !== undefined){
		return Q(this.m_gameDocumentPromice);
	}
	var deferred = Q.defer();
	var that = this;
	const requestData = new XMLHttpRequest();
	requestData.open("GET", this.m_endpoint + "." + this.m_id + ".", true);
			console.log(this.m_endpoint + "." + this.m_id + ".");
	requestData.onload = function() {
		if (200 <= requestData.status && requestData.status < 400) {
			console.log("ResourceEditDataServerResource:GetGameDocumentPromice:responseText:" + requestData.responseText);
			var data = JSON.parse(requestData.responseText);
			that.m_type = data._type;
			console.log("that.m_type:" + that.m_type);
			deferred.resolve(data);
		} else {
			deferred.reject(new Error("requestData GetGameObject reached our target server, but it returned an error:" + requestData.status));
		}
	};

	requestData.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	requestData.send();
	this.m_gameDocumentPromice = deferred.promise;
	return deferred.promise;
}

ResourceEditDataServerResource.prototype.GetGameObjectPromice = function(){
	if (this.m_gameObject != undefined){
		return Q(this.m_gameObject);
	}
	var that = this;
	return this.GetGameDocumentPromice().then(function(document){
		console.log("ResourceEditDataServerResource:GetGameObjectPromice:then:" + that.m_gameObjectManager);
		that.m_gameObject = that.m_gameObjectManager.GameDocumentToGameObject(document);
		console.log("ResourceEditDataServerResource:GetGameObjectPromice:polo");
		return that.m_gameObject;
	});
}

ResourceEditDataServerResource.prototype.GetEndpointForType = function(type){
	var dataServer = this.m_gameObjectManager.GetDataServer();
	return dataServer.GetEndpointNameForType(type);
}

ResourceEditDataServerResource.prototype.GetMetaData = function(){
	var dataServer = this.m_gameObjectManager.GetDataServer();
	var metaCollectionName = dataServer.GetMetaCollectionNameForType(this.m_type);
	var metaCollection = dataServer.GetCollection(metaCollectionName);
	return metaCollection;
}

ResourceEditDataServerResource.prototype.GetRuleData = function(){
	var dataServer = this.m_gameObjectManager.GetDataServer();
	var ruleCollectionName = dataServer.GetRuleCollectionNameForType(this.m_type);
	var ruleCollection = dataServer.GetCollection(ruleCollectionName);
	return ruleCollection;
}

ResourceEditDataServerResource.Factory = function(endpoint, id, gameObjectManager, closeCallback){
	var dataServer = new ResourceEditDataServerResource(endpoint, id, gameObjectManager, closeCallback);
	return dataServer;
}
