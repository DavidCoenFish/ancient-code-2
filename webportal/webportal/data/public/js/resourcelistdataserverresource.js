const ResourceListDataServerResource = function(typeEndpontMap, gameObjectManager) {
	this.m_typeEndpontMap = typeEndpontMap;
	this.m_gameObjectManager = gameObjectManager;

	return;
}

ResourceListDataServerResource.Factory = function(typeEndpontMap, gameObjectManager){
	var dataServer = new ResourceListDataServerResource(typeEndpontMap, gameObjectManager);
	return dataServer;
}

ResourceListDataServerResource.prototype.GetObjectArray = function(){
	var promiceArray = [];
	for (var type in this.m_typeEndpontMap) {
		if (this.m_typeEndpontMap.hasOwnProperty(type)) {
			var endpoint = this.m_typeEndpontMap[type];
			//console.log("endpoint:" + endpoint);
			promiceArray.push(this._GetObjectArrayPromice(endpoint));
		}
	}
	return Q.allSettled(promiceArray)
	.then(function (input) {
		var result = [];
		input.forEach(function (inputItem) {
			if (inputItem.state === "fulfilled") {
				var value = inputItem.value;
				result = result.concat(value);
			} else {
				var reason = inputItem.reason;
				console.log("GetObjectArray failed:" + reason);
			}
		});
		//console.log("result:" + JSON.stringify(result));
		return result;
	});
}

ResourceListDataServerResource.prototype._GetObjectArrayPromice = function(endpoint){
	var deferred = Q.defer();
	var that = this;
	const request = new XMLHttpRequest();
	request.open('GET', endpoint, true);
	request.onload = function() {
		if (200 <= request.status && request.status < 400) {
			//console.log(request.responseText);
			var data = JSON.parse(request.responseText);
			deferred.resolve(data);
		} else {
			deferred.reject(new Error("request GetObjectArray reached our target server, but it returned an error:" + request.status));
		}
	};

	request.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	request.send();

	return deferred.promise;
}


ResourceListDataServerResource.prototype.GetShowClose = function(){
	return false;
}

ResourceListDataServerResource.prototype.GetShowTrash = function(){
	return true;
}

ResourceListDataServerResource.prototype.GetShowAdd = function(){
	return true;
}

ResourceListDataServerResource.prototype.GetListHasDragOnto = function(){
	return true;
}

ResourceListDataServerResource.prototype.GetObjectsHaveAction = function(){
	return true;
}

const MakeTypeDialog = function(typeEndpontMap, onAddCallback){
	var arrayTypeKeys = Object.keys(typeEndpontMap);

	var deferred = Q.defer();

	var wrapperDiv = document.createElement("div");
	var heading = document.createElement("p");
	heading.innerHTML = "Choose type";
	wrapperDiv.appendChild(heading);

	input = document.createElement("select");
	for (var index = 0, total = arrayTypeKeys.length; index < total; index++) {
		var optionName = arrayTypeKeys[index];
		var option = document.createElement("option");
		option.value = optionName;
		option.innerHTML = optionName;
		input.appendChild(option);
	}
	input.value = arrayTypeKeys[0];
	wrapperDiv.appendChild(input);

	var buttonDiv = document.createElement("div");
	buttonDiv.className = "flowhorizontal";

	var addButton = document.createElement("a");
	addButton.href = "no-javascript.html";
	addButton.className = "appbackground center smallmargin smallrect shadow";
	addButton.innerHTML = "<div>OK</div>";


	addButton.onclick = function(event){ 
		event.stopPropagation();
		var type = input.value;
		var endpoint = typeEndpontMap[type]; 
		HideModal();
		var onAddResult = onAddCallback(type, endpoint);
		deferred.resolve(onAddResult);
		return false; 
	};
	buttonDiv.appendChild(addButton);

	var cancleButton = document.createElement("a");
	cancleButton.href = "no-javascript.html";
	cancleButton.className = "appbackground center smallmargin smallrect shadow";
	cancleButton.innerHTML = "<div>Cancle</div>";
	cancleButton.onclick = function(event){ 
		event.stopPropagation();
		console.log("onCancle");
		DismissModal(); 
		return false; 
	};
	buttonDiv.appendChild(cancleButton);

	wrapperDiv.appendChild(buttonDiv);

	ShowModal(wrapperDiv, true, function(){
		//dismiss
		console.log("onDismiss");
		deferred.resolve(false);
	});
	return deferred.promise;
}

ResourceListDataServerResource.prototype.GetDragOntoListTypeAccepted = function(types){}
ResourceListDataServerResource.prototype.OnClose = function(resourceList){}
ResourceListDataServerResource.prototype.OnAdd = function(resourceList){
	var arrayTypeKeys = Object.keys(this.m_typeEndpontMap);
	if (1 == arrayTypeKeys.length){
		var type = arrayTypeKeys[0];
		var endpoint = this.m_typeEndpontMap[type]; 
		return this._OnAdd(type, endpoint);
	}
	var that = this;
	var promice = MakeTypeDialog(this.m_typeEndpontMap, function(type, endpoint){ that._onAdd(type, endpoint);});
	return promice;
}

ResourceListDataServerResource.prototype._OnAdd = function(type, endpoint){
	var deferred = Q.defer();
	var that = this;
	const request = new XMLHttpRequest();
	request.open('POST', endpoint, true);
	request.onload = function() {
		if (200 <= request.status && request.status < 400) {
			console.log("add:" + request.responseText);
			deferred.resolve(true);
		} else {
			deferred.reject(new Error("request Add reached our target server, but it returned an error:" + request.status));
		}
	};

	request.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	request.send(JSON.stringify({"_type":type}));

	return deferred.promise;
}

ResourceListDataServerResource.prototype.OnObjectAction = function(id, type, resourceList, divToOccupy){
	if (false === (type in this.m_typeEndpontMap)){
		console.log("OnObjectAction type not found:" + type);
		return;
	}
	var endpoint = this.m_typeEndpontMap[type];
	resourceList.ClearDiv();
	var dataServer = ResourceEditDataServerResource.Factory(endpoint, id, this.m_gameObjectManager, resourceList.GetRestoreAction());
	ResourceEdit.Factory(divToOccupy, dataServer, this.m_gameObjectManager);
	return;
}

ResourceListDataServerResource.prototype.OnDropList = function(id, types){}
ResourceListDataServerResource.prototype.OnDropTrash = function(id, types){
	var endpoint;
	for (var index = 0, total = types.length; index < total; index++) {
		var testType = types[index];
		if (testType in this.m_typeEndpontMap){
			endpoint = this.m_typeEndpontMap[testType];
			break;
		}
	}

	if (undefined === endpoint){
		console.log("types not found:" + types);
	}

	//console.log("OnDrop:" + id);
	var deferred = Q.defer();
	var that = this;
	const request = new XMLHttpRequest();
	request.open('DELETE', endpoint + "." + id + ".", true);
	request.onload = function() {
		if (200 <= request.status && request.status < 400) {
			deferred.resolve(true);
		} else {
			deferred.reject(new Error("request Add reached our target server, but it returned an error:" + request.status));
		}
	};
	request.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	request.send();

	return deferred.promise;
}

