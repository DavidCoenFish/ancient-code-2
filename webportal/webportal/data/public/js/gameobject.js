

const GameObject = function(type, id, writeLock, dagCollection) {
	this.m_type = type;
	this.m_id = id;
	this.m_writeLock = writeLock;
	this.m_dagCollection = dagCollection;

	return;
}

GameObject.prototype.toString = function() {
	var ret = " {m_type:" + this.m_type + ", m_id:" + this.m_id + ", m_writeLock:" + this.m_writeLock + ", m_dagCollection:" + this.m_dagCollection + "]";
	return ret;
}

GameObject.prototype.GetType = function() {
	return this.m_type;
}

GameObject.prototype.GetID = function() {
	return this.m_id;
}

GameObject.prototype.GetWriteLock = function() {
	return this.m_writeLock;
}

GameObject.prototype.GetValue = function(name) {
	return this.m_dagCollection.GetValue(name);
}

GameObject.prototype.SetValue = function(name, value) {
	this.m_dagCollection.SetValue(name, value);
	return;
}

GameObject.prototype.GetDirtyArray = function(){
	return this.m_dagCollection.GetDirtyArray();
}

/*
assuming [DagCollection,DagNodeValue, DagNodeCalculate] is in current context

dataServer happens to be the GameObjectManager ?
*/
GameObject.Factory = function(inputDocument, metaCollection, ruleCollection, dataServer, destObjectOrUndefined){
	//console.log("GameObject.Factory:0");

	var type = inputDocument[sTypeKey];
	var id = inputDocument[sIDKey];
	var writeLock = inputDocument[sWriteLockKey]; 

	//throw new Error("inputDocument:" + JSON.stringify(inputDocument));

	//construct all the dagNodes we know about
	var nodeMap = {};
	for (var index = 0, total = metaCollection.length; index < total; index++) {
		var document = metaCollection[index];
		var name = document._id;
		var value = GameObjectManager.ObligeType(document, inputDocument[name]);

		value = GameObject.FactorDoctorValue(document, value, dataServer);

		var dagNodeValue = new DagNodeValue(name, value);
		nodeMap[name] = dagNodeValue;
	}

	//console.log("GameObject.Factory:1 ruleCollection:" + ruleCollection + " type:" + type);

	var arrayPendingLinksInstructions = [];
	for (var index = 0, total = ruleCollection.length; index < total; index++) {
		var document = ruleCollection[index];
		var name = document._id;
		var sourceInstructionArray = document.operation;
		var destInstructionArray = [];
		if (sourceInstructionArray == undefined){
			console.log("GameObject.Factory undefined instruction array for rule:" + index + " name:" + name + " sourceInstructionArray:" + sourceInstructionArray);
			continue;
		}
		for (var subIndex = 0, subTotal = sourceInstructionArray.length; subIndex < subTotal; subIndex++) {
			var instruction = sourceInstructionArray[subIndex];
			if (instruction == null){
				console.log("GameObject.Factory:" + type + ": null instruction in name:" + name + " subIndex:" + subIndex + " " + JSON.stringify(document));
				continue;
			}
			if (!(instruction.op in OperationEnum)){
				console.log("GameObject.Factory:" + type + ": operation not found:" + instruction.op + " instruction:" + JSON.stringify(instruction) + " OperationEnum:" + JSON.stringify(OperationEnum));
				continue;
			}
			destInstructionArray.push({ "op" : OperationEnum[instruction.op], "data" : instruction.data});
		}

		var dagNodeCalculate = new DagNodeCalculate(name, destInstructionArray, dataServer);
		nodeMap[name] = dagNodeCalculate;

		for (var subIndex = 0, subTotal = destInstructionArray.length; subIndex < subTotal; subIndex++) {
			var instruction = destInstructionArray[subIndex];

			if (OperationEnum.push_dng === instruction.op){
				arrayPendingLinksInstructions.push({"output" : dagNodeCalculate, "instruction" : instruction});
			}
		}
	}

	//console.log("GameObject.Factory:2");

	//fix links
	for (var index = 0, total = arrayPendingLinksInstructions.length; index < total; index++) {
		var linkData = arrayPendingLinksInstructions[index];
		var output = linkData.output;
		var inputName = linkData.instruction.data;
		if (!(inputName in nodeMap)){
			throw new Error("GameObject.Factory:" + type + " dag input not found:" + inputName);
		}
		var input = nodeMap[inputName];
		linkData.instruction.data = input;
		DagCollection.SetNodesLinked(input, output);
	}

	//console.log("GameObject.Factory:3");

	var dagCollection = new DagCollection(nodeMap);
	if ((destObjectOrUndefined != undefined) && 
		(destObjectOrUndefined instanceof GameObject)){
		destObjectOrUndefined.m_type = type;
		destObjectOrUndefined.m_id = id;
		destObjectOrUndefined.m_writeLock = writeLock;
		destObjectOrUndefined.m_dagCollection = dagCollection;
		return destObjectOrUndefined;
	}

	var gameObject = new GameObject(type, id, writeLock, dagCollection);
	return gameObject;
}

GameObject.FactorDoctorValue = function(metaDocument, value, dataServer){
	var metaType = metaDocument.type;
	if (metaType === "game_object_array"){
		var result = [];
		if ((value != undefined) && (value.constructor === Array)){
			for (var index = 0, total = value.length; index < total; index++) {
				var item = value[index];
				var gameDocument = dataServer.GameDocumentToGameObject(item);
				if (gameDocument != undefined){
					result.push(gameDocument);
				}
			}
		}
		return result;
	}

	return value;
}

