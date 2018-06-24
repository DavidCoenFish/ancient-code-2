/*
we we have an input type dragged onto us, make request from action endpoint and display it

*/

const ResourceActionDataServer = function(inputType, actionEndpoint) {
	this.m_inputType = inputType;
	this.m_actionEndpoint = actionEndpoint;
	return;
}
ResourceActionDataServer.Factory = function(inputType, actionEndpoint){
	var resourceActionDataServer = new ResourceActionDataServer(inputType, actionEndpoint);
	return resourceActionDataServer;
}

ResourceActionDataServer.prototype.GetTypeName = function(){
	return this.m_inputType;
}

ResourceActionDataServer.prototype.CalculateSupportTypes = function(types){
	return (-1 !== types.indexOf(this.m_inputType));
}

ResourceActionDataServer.prototype.GetPromiceActionResult = function(id){
	return this._PostAction(id);
}

ResourceActionDataServer.prototype._PostAction = function(id){
	var deferred = Q.defer();
	var that = this;
	const request = new XMLHttpRequest();
	request.open('POST', this.m_actionEndpoint, true);
	request.onload = function() {
		if (200 <= request.status && request.status < 400) {
			//console.log("postaction:" + request.responseText);
			var miniDocument = JSON.parse(request.responseText);
			var id = miniDocument["_id"];
			deferred.resolve(that._ReadResource(id));
		} else {
			deferred.reject(new Error("request Post Action reached our target server, but it returned an error:" + request.status));
		}
	};

	request.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	request.send(JSON.stringify({"_id":id}));

	return deferred.promise;
}

ResourceActionDataServer.prototype.OnDelete = function(id){

	var deferred = Q.defer();
	var that = this;
	const request = new XMLHttpRequest();
	request.open('DELETE', this.m_actionEndpoint + id + ".", true);
	console.log("OnDelete id:" + id + " " + this.m_actionEndpoint + id + ".");
	request.onload = function() {
		if (200 <= request.status && request.status < 400) {
			deferred.resolve(true);
		} else {
			deferred.reject(new Error("request Delete reached our target server, but it returned an error:" + request.status));
		}
	};
	request.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	request.send();

	return deferred.promise;
}

ResourceActionDataServer.prototype._ReadResource = function(id){
	var deferred = Q.defer();
	var that = this;
	const requestData = new XMLHttpRequest();
	requestData.open("GET", this.m_actionEndpoint  + id + ".", true);
			console.log(this.m_actionEndpoint  + id + ".");
	requestData.onload = function() {
		if (200 <= requestData.status && requestData.status < 400) {
			//console.log("ResourceActionDataServer:GetGameObject:responseText:" + requestData.responseText);
			var data = JSON.parse(requestData.responseText);
			deferred.resolve(data);
		} else {
			deferred.reject(new Error("ResourceActionDataServer GetGameObject reached our target server, but it returned an error:" + requestData.status));
		}
	};

	requestData.onerror = function() {
		deferred.reject(new Error("There was a connection error of some sort"));
	};
	requestData.send();
	this.m_gameDocumentPromice = deferred.promise;
	return deferred.promise;

}

const ResourceAction = function(div, dataserver) {
	this.m_div = div;
	this.m_dataserver = dataserver;

	this.PreRender();

	return;
}

ResourceAction.Factory = function(div, inputType, actionEndpoint, dataserver){
	var resourceAction = new ResourceAction(div, inputType, actionEndpoint, dataserver);
	return resourceAction;
}

ResourceAction.prototype.ClearDiv = function(){
	while(this.m_div.firstChild){
		this.m_div.removeChild(this.m_div.firstChild);
	}
	this.m_div.ondragover = undefined;
	this.m_div.ondrop = undefined;
	return;
}

ResourceAction.prototype.PreRender = function(id){
	var that = this;

	this.m_div.className = "appforeground flowhorizontal";

	if (id === undefined){
		var heading = document.createElement("p");
		heading.innerHTML = "drag item of type:" + this.m_dataserver.GetTypeName() + " to perform action";
		this.m_div.appendChild(heading);
	} else {
		var addButton = document.createElement("a");
		//var addButton = document.createElement("div");
		addButton.href = "no-javascript.html";
		addButton.className = "appbackground center smallmargin smallrect shadow";
		addButton.innerHTML = "<div>Delete</div>";
		addButton.onclick = function(){ that.OnDeleteButton(id); return false; };
		this.m_div.appendChild(addButton);
	}

	this.m_div.ondragover = function(event){ that.OnDragOver(event); };
	this.m_div.ondrop = function(event){ that.OnDrop(event); };

	return;
}

ResourceAction.prototype.OnDragOver = function(event){
	console.log("ResourceAction:OnDragOver:" + event.dataTransfer.types);
	event.dataTransfer.dropEffect = "move";
	if (true === this.m_dataserver.CalculateSupportTypes(event.dataTransfer.types)){
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	} else {
		event.dataTransfer.dropEffect = "none";
	}
	return;
}

ResourceAction.prototype.OnDrop = function(event){
	console.log("ResourceAction:OnDrop");
	event.stopPropagation();
	event.preventDefault();
	var id = event.dataTransfer.getData("text/plain");
	var that = this;
	//console.log("id:" + id + " event.dataTransfer.types:" + event.dataTransfer.types);

	this.m_dataserver.GetPromiceActionResult(id).then(function(input){
		that.ClearDiv();
		that.PreRender(id);

		var body = document.createElement("p");
		body.innerHTML = JSON.stringify(input);
		body.className = "appforeground";

		that.m_div.appendChild(body);
		return true;
	});

	return true;
}

ResourceAction.prototype.OnDeleteButton = function(id){
	this.m_dataserver.OnDelete(id);
	this.ClearDiv();
	this.PreRender();
	return true;
}
