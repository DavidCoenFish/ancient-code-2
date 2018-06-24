const ResourceEditDataServerDagNode = function(gameObject, gameDocumentBackup, gameObjectManager, closeCallback) {
	this.m_gameObject = gameObject;
	this.m_gameDocumentBackup = gameDocumentBackup;
	this.m_gameObjectManager = gameObjectManager;
	this.m_closeCallback = closeCallback;
	return;
}

ResourceEditDataServerDagNode.prototype.OnSubmit = function(newGameObject){
	if (null != this.m_closeCallback){
		this.m_closeCallback();
	}

	return;
}

ResourceEditDataServerDagNode.prototype.OnCancle = function(){
	//restore the orignial game document settings to the game object
	this.m_gameObject = this.m_gameObjectManager.GameDocumentToGameObject(this.m_gameDocumentBackup, this.m_gameObject);

	if (null != this.m_closeCallback){
		this.m_closeCallback();
	}
	return;
}

ResourceEditDataServerDagNode.prototype.GetGameObjectPromice = function(){
	return Q(this.m_gameObject);
}

ResourceEditDataServerDagNode.prototype.GetEndpointForType = function(type){
	var dataServer = this.m_gameObjectManager.GetDataServer();
	return dataServer.GetEndpointNameForType(type);
}

ResourceEditDataServerDagNode.prototype.GetMetaData = function(){
	var type = this.m_gameObject.GetType()
	var dataServer = this.m_gameObjectManager.GetDataServer();
	var metaCollectionName = dataServer.GetMetaCollectionNameForType(type);
	var metaCollection = dataServer.GetCollection(metaCollectionName);
	return metaCollection;
}

ResourceEditDataServerDagNode.prototype.GetRuleData = function(){
	var type = this.m_gameObject.GetType()
	var dataServer = this.m_gameObjectManager.GetDataServer();
	var ruleCollectionName = dataServer.GetRuleCollectionNameForType(type);
	var ruleCollection = dataServer.GetCollection(ruleCollectionName);
	return ruleCollection;
}

ResourceEditDataServerDagNode.Factory = function(gameObject, gameObjectManager, closeCallback){
	var gameDocument = gameObjectManager.GameObjectToGameDocument(gameObject);
	var dataServer = new ResourceEditDataServerDagNode(gameObject, gameDocument, gameObjectManager, closeCallback);
	return dataServer;
}
