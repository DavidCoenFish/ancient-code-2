/*
	dataserver.GetObjectArray() return promice (array of objects with names, id, drag type)
	dataserver.GetShowClose()
	dataserver.GetShowTrash()
	dataserver.GetShowAdd()
	dataserver.GetListHasDragOnto()
	dataserver.GetObjectsHaveAction()
	dataserver.GetDragOntoListTypeAccepted(type)
	dataserver.OnClose(resourceList)
	dataserver.OnAdd(resourceList)
	dataserver.OnObjectAction(id, type?, divToOccupy, function to recreate resourceList)
	dataserver.OnDropList(id, type?)
	dataserver.OnDropTrash(id, type?)

aim is to reuse resource list for rest resource list, and internal to game object, game oject aray node editing
*/

const ResourceList = function(divParent, divToOccupy, dataserver) {
	this.m_divParent = divParent;
	this.m_divToOccupy = divToOccupy;
	this.m_dataserver = dataserver;
	this.m_objectArray = [];
	this.m_secretKey = Math.random().toString(); // for items

	this.RequestData();

	return;
}


ResourceList.Factory = function(divParent, divToOccupy, dataserver){
	var resourceList = new ResourceList(divParent, divToOccupy, dataserver);
	return resourceList;
}

ResourceList.prototype.RequestData = function(){
	console.log("RequestData");
	this.ClearDiv();
	this.PreRender();
	//set state to loading?
	var that = this;
	this.PullData().then(function(input){
		that.Render(input);
		return true;
	}).done();
	return;
}

ResourceList.prototype.ClearDiv = function(){
	while(this.m_divToOccupy.firstChild){
		this.m_divToOccupy.removeChild(this.m_divToOccupy.firstChild);
	}
	this.m_divToOccupy.ondragover = undefined;
	this.m_divToOccupy.ondrop = undefined;
	return;
}

ResourceList.prototype.PullData = function(){
	return this.m_dataserver.GetObjectArray();
}

ResourceList.prototype.PreRender = function(){
	var that = this;

	this.m_divToOccupy.className = "appforeground flowhorizontal";

	if (true === this.m_dataserver.GetShowClose()){
		var addButton = document.createElement("a");
		addButton.href = "no-javascript.html";
		addButton.className = "appbackground center smallmargin smallrect shadow";
		addButton.innerHTML = "<div>Close</div>";
		addButton.onclick = function(){ that.OnCloseButton(); return false; };
		this.m_divToOccupy.appendChild(addButton);
	}
	if (true === this.m_dataserver.GetShowTrash()){
		var deleteButton = document.createElement("div");
		//deleteButton.href = "no-javascript.html";
		deleteButton.ondragover = function(event){ that.OnDragOverTrash(event); };
		deleteButton.ondrop = function(event){ that.OnDropTrash(event); };
		deleteButton.className = "appbackground center smallmargin smallrect";
		deleteButton.innerHTML = "<div>trash</div>";
		deleteButton.onclick = function(){ return false; };
		this.m_divToOccupy.appendChild(deleteButton);
	}
	if (true === this.m_dataserver.GetShowAdd()){
		var addButton = document.createElement("a");
		addButton.href = "no-javascript.html";
		addButton.className = "appbackground center smallmargin smallrect shadow";
		addButton.innerHTML = "<div>Add</div>";
		addButton.onclick = function(){ that.OnAddButton(); return false; };
		this.m_divToOccupy.appendChild(addButton);
	}

	if (true === this.m_dataserver.GetListHasDragOnto()){
		this.m_divToOccupy.ondragover = function(event){ that.OnDragOverList(event); };
		this.m_divToOccupy.ondrop = function(event){ that.OnDropList(event);};
	}

	return;
}
ResourceList.prototype.Render = function(arrayObjects){
	var that = this;
	//iterate over 
	for (var index = 0, total = arrayObjects.length; index < total; index++) {
		var item = arrayObjects[index];

		var characterButton = document.createElement("a");
		characterButton.setAttribute("draggable", "true");
		//characterButton.setAttribute("ondragstart", "ResourceList.DragstartHandler(event);");
		characterButton.ondragstart = function(event){ that.OnDragStart(event); }
		characterButton.setAttribute("id", item._id);
		characterButton.setAttribute("type", item._type);
		characterButton.className = "appbackground center smallmargin smallrect shadow";
		characterButton.innerHTML = "<div>name:" + item.name + "</div>";

		if (this.m_dataserver.GetObjectsHaveAction()){
			characterButton.onclick = function() {
				that.OnObjectClick(this.id, this.getAttribute("type"));
				return false;
			};
		}

		this.m_divToOccupy.appendChild(characterButton);
	}


	return;
}

ResourceList.prototype.OnCloseButton = function(){
	this.m_dataserver.OnClose(this);
	return;
}

ResourceList.prototype.OnAddButton = function(){
	console.log("OnAddButton");
	var that = this;
	this.m_dataserver.OnAdd(this).then(function(input){
		console.log("OnAddButton:then:" + input);
		if (input === true){
			that.RequestData();
		}
		return true;
	}).fail(function(error){
		throw new Error(error);
	}).done();
	return false;
}

ResourceList.prototype.GetRestoreAction = function(){
	var that = this;
	return function(){
		console.log("RestoreAction:" + that.m_divToOccupy + " " + that.m_dataserver + " id:" + that.m_divToOccupy.id);
		ResourceList.Factory(that.m_divToOccupy, that.m_divToOccupy, that.m_dataserver);
		return;
	}
}

ResourceList.prototype.OnDragStart = function(event){
	console.log("OnDragStart:type:" + event.target.type + " id:" + event.target.id);
	event.dataTransfer.setData("text/plain", event.target.id);
	event.dataTransfer.setData(event.target.type, "");
	event.dataTransfer.setData(this.m_secretKey, "");
	//event.dataTransfer.setData("write_lock", "");

	return;
}

ResourceList.prototype.OnDragOverTrash = function(event){
	console.log("ResourceList:OnDragOverTrash:" + event.dataTransfer.types);
	if (-1 !== event.dataTransfer.types.indexOf(this.m_secretKey)){
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	} else {
		event.dataTransfer.dropEffect = "none";
	}
	return;
}

ResourceList.prototype.OnDropTrash = function(event){
	console.log("ResourceList:OnDropTrash");
	event.stopPropagation();
	event.preventDefault();
	var id = event.dataTransfer.getData("text/plain");
	if (event.dataTransfer.types.indexOf(this.m_secretKey) == -1){
		console.log("OnDropTrash forign secret key, abort");
		return;
	}
	console.log("id:" + id + " event.dataTransfer.types:" + event.dataTransfer.types);
	var that = this;
	this.m_dataserver.OnDropTrash(id, event.dataTransfer.types).then(function(input){
		console.log("OnDropTrash:then");
		that.RequestData();
		return true;
	}).fail(function(error){
		throw new Error(error);
	}).done();
}

ResourceList.prototype.OnDragOverList = function(event){
	console.log("ResourceList:OnDragOverList:" + event.dataTransfer.types);
	if (true == this.m_dataserver.GetDragOntoListTypeAccepted(event.dataTransfer.types)){
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	} else {
		event.dataTransfer.dropEffect = "none";
	}
}

ResourceList.prototype.OnDropList = function(event){
	event.stopPropagation();
	event.preventDefault();
	if (event.dataTransfer.types.indexOf(this.m_secretKey) !== -1){
		console.log("OnDropList self found, abort");
		return;
	}
	var id = event.dataTransfer.getData("text/plain");
	console.log("OnDropList:" + event.dataTransfer.types + " id:" + id);
	var that = this;
	this.m_dataserver.OnDropList(id, event.dataTransfer.types).then(function(input){
		console.log("OnDropList:then");
		that.RequestData();
		return true;
	}).fail(function(error){
		throw new Error(error);
	}).done();
}

ResourceList.prototype.OnObjectClick = function(id, type){
	console.log("OnObjectClick:id:" + id + " type:" + type);
	this.m_dataserver.OnObjectAction(id, type, this, this.m_divParent);
	return;
}
