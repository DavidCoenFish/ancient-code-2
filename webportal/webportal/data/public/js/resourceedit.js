const ResourceEditMakeWrapper = function(name){
	var wrapperDiv = document.createElement("div");
	wrapperDiv.className = "appforeground smallmargin smallrect";
	var heading = document.createElement("p");
	heading.innerHTML = name;
	wrapperDiv.appendChild(heading);
	return wrapperDiv;
}

const ResourceEditOutput = function(divOutput, name, gameObject){
	this.m_divOutput = divOutput;
	this.m_name = name;
	this.m_gameObject = gameObject;

	this.Update();

	return;
}

ResourceEditOutput.prototype.Update = function(){
	this.m_divOutput.innerHTML = this.m_gameObject.GetValue(this.m_name);
}

ResourceEditOutput.Factory = function(divParent, ruleDocument, gameObject){
	var wrapperDiv = ResourceEditMakeWrapper(ruleDocument._id);
	var divOutput = document.createElement("p");
	wrapperDiv.appendChild(divOutput);
	divParent.appendChild(wrapperDiv);

	return new ResourceEditOutput(divOutput, ruleDocument._id, gameObject);
}

const ResourceEditString = function(input, metaDocument, gameObject, inputCallback){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	input.oninput = function(){ that.OnInput(); };

	return;
}

ResourceEditString.prototype.OnInput = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_input.value);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditString.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id);

	input = document.createElement("input");
	input.type = "text";
	input.value = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);

	return new ResourceEditString(input, metaDocument, gameObject, inputCallback);
}

const ResourceEditBoolean = function(checkbox, metaDocument, gameObject, inputCallback){
	this.m_checkbox = checkbox; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	checkbox.onclick = function(){ that.OnClick(); };

	return;
}

ResourceEditBoolean.prototype.OnClick = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_checkbox.checked);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditBoolean.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id)

	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(checkbox);
	divParent.appendChild(wrapperDiv);

	return new ResourceEditBoolean(checkbox, metaDocument, gameObject, inputCallback);
}

const ResourceEditEnum = function(input, metaDocument, gameObject, inputCallback){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	input.oninput = function(){ that.OnInput(); };

	return;
}

ResourceEditEnum.prototype.OnInput = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_input.value);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditEnum.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id)

	input = document.createElement("select");
	for (var subKey in metaDocument.options)
	{
		var subItem = metaDocument.options[subKey];
		var option = document.createElement("option");
		option.value = subItem;
		option.innerHTML = subItem;
		input.appendChild(option);
	}
	input.value = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(input);

	divParent.appendChild(wrapperDiv);
	return new ResourceEditEnum(input, metaDocument, gameObject, inputCallback);
}

const ResourceEditNumber = function(input, metaDocument, gameObject, inputCallback){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	input.oninput = function(){ that.OnInput(); };

	return;
}

ResourceEditNumber.prototype.OnInput = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_input.value);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditNumber.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id)
	input = document.createElement("input");
	input.type = "number";
	input.min = "0";
	input.value = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);
	return new ResourceEditNumber(input, metaDocument, gameObject, inputCallback);
}

const ResourceEditInteger = function(input, metaDocument, gameObject, inputCallback){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	input.oninput = function(){ that.OnInput(); };

	return;
}

ResourceEditInteger.prototype.OnInput = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_input.value);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditInteger.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id)
	input = document.createElement("input");
	input.type = "number";
	input.value = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);
	return new ResourceEditInteger(input, metaDocument, gameObject, inputCallback);
}

const ResourceEditReal = function(input, metaDocument, gameObject, inputCallback){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	input.oninput = function(){ that.OnInput(); };

	return;
}

ResourceEditReal.prototype.OnInput = function(){
	var value = GameObjectManager.ObligeType(this.m_metaDocument, this.m_input.value);
	this.m_gameObject.SetValue(this.m_metaDocument._id, value);
	this.m_inputCallback();
	return;
}

ResourceEditReal.Factory = function(divParent, metaDocument, gameObject, inputCallback){
	var wrapperDiv = ResourceEditMakeWrapper(metaDocument._id)
	var input = document.createElement("input");
	input.type = "number";
	input.step = 0.01;
	input.value = gameObject.GetValue(metaDocument._id);
	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);
	return new ResourceEditReal(input, metaDocument, gameObject, inputCallback);
}

const ResourceEditGameObjectArray = function(input, metaDocument, gameObject, inputCallback, dataServer){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	this.m_gameObject = gameObject;
	this.m_inputCallback = inputCallback;

	var that = this;
	dataServer.setOnChange(function(){
		that.OnInput();
	});

	return;
}

ResourceEditGameObjectArray.prototype.OnInput = function(){
	//console.log("ResourceEditGameObjectArray.OnInput");
	this.m_inputCallback();
	return;
}

ResourceEditGameObjectArray.Factory = function(divToOccupy, divParent, metaDocument, gameObject, inputCallback, parentDataServer, gameObjectManager, childEditCompleteCallback){
	//console.log("ResourceEditGameObjectArray.Factory divToOccupy.id:" + divToOccupy.id + " gameObject: " + gameObject);

	var name = metaDocument._id;
	var wrapperDiv = ResourceEditMakeWrapper(name)
	wrapperDiv.className = "appbackground";

	const input = document.createElement("div");
	input.className = "buttoncontainer";
	input.style = "width: 200px; height: 100px;";
	input.id = "resourceEditGameObjectArrayDiv";

	var typeEndpointMap = {};
	for (var index = 0, total = metaDocument.options.length; index < total; index++) {
		var type = metaDocument.options[index];
		typeEndpointMap[type] = parentDataServer.GetEndpointForType(type);
	}

	var dataServer = ResourceListDataServerDagNode.Factory(gameObject, name, typeEndpointMap, gameObjectManager, childEditCompleteCallback);
	var resourceList = ResourceList.Factory(divToOccupy, input, dataServer);

	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);
	return new ResourceEditGameObjectArray(input, metaDocument, gameObject, inputCallback, dataServer, resourceList);
}

const ResourceEditGameObjectExclusive = function(input, metaDocument){
	this.m_input = input; 
	this.m_metaDocument = metaDocument; 
	return;
}

ResourceEditGameObjectExclusive.Factory = function(divToOccupy, divParent, metaDocument, gameObject, inputCallback, parentDataServer, gameObjectManager, childEditCompleteCallback){
	var name = metaDocument._id;
	var wrapperDiv = ResourceEditMakeWrapper(name)
	wrapperDiv.className = "appbackground";

	const input = document.createElement("div");
	input.className = "buttoncontainer";
	input.style = "width: 200px; height: 100px;";
	input.id = "resourceEditGameObjectExclusive";
	input.innerHTML = "hello";

	wrapperDiv.appendChild(input);
	divParent.appendChild(wrapperDiv);
	return new ResourceEditGameObjectArray(input, metaDocument);
}


const ResourceEdit = function(divToOccupy, dataserver, gameObjectManager) {
	this.m_divToOccupy = divToOccupy;
	this.m_dataserver = dataserver;
	this.m_editObjectArray = [];
	this.m_outputObjectMap = {};
	this.m_gameObjectManager = gameObjectManager;

	this.Update();

	return;
}

ResourceEdit.prototype.Update = function(){
	var that = this;
	this.ClearDiv();
	this.m_dataserver.GetGameObjectPromice().then(function(gameObject){
		//console.log("ResourceEdit Update:then:" + gameObject);

		that.RenderForm(gameObject, that.m_dataserver.GetMetaData(), that.m_dataserver.GetRuleData());
		return true;
	}).fail(function(error){
		console.log("Update:error:" + error);
	}).fin(function(){
		console.log("Update:fin");
	});
	return;
}

ResourceEdit.prototype.ClearDiv = function(){
	while(this.m_divToOccupy.firstChild){
		this.m_divToOccupy.removeChild(this.m_divToOccupy.firstChild);
	}
	return;
}

ResourceEdit.prototype.RenderForm = function(gameObject, metaCollection, ruleCollection){
	console.log("ResourceEdit.RenderForm metaCollection:" + metaCollection + " ruleCollection:" + ruleCollection); // + gameObject.toString());
	var that = this;

	this.m_gameObject = gameObject;
	this.m_form = document.createElement("form");
	this.m_form.className = "flowhorizontal";

	this.m_editObjectArray = [];
	for (var key in metaCollection) {
		var item = metaCollection[key];
		console.log("item.type:" + item.type + " name:" + item._id); // + gameObject.toString());
		switch (item.type){
		default:
			break;
		case "string":
			this.m_editObjectArray.push(ResourceEditString.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "boolean":
			this.m_editObjectArray.push(ResourceEditBoolean.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "enum":
			this.m_editObjectArray.push(ResourceEditEnum.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "number":
			this.m_editObjectArray.push(ResourceEditNumber.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "integer":
			this.m_editObjectArray.push(ResourceEditInteger.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "real":
			this.m_editObjectArray.push(ResourceEditReal.Factory(this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }));
			break;
		case "game_object_array":
			var edgitGameObjectArray = ResourceEditGameObjectArray.Factory(this.m_divToOccupy, this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }, this.m_dataserver, this.m_gameObjectManager, function(){ that.OnChildEditFinish();});
			this.m_editObjectArray.push(edgitGameObjectArray);
			break;
		case "game_object_exclusive":
			var editGameObjectExclusive = ResourceEditGameObjectExclusive.Factory(this.m_divToOccupy, this.m_form, item, gameObject, function(){ that.OnGameObjectChange(); }, this.m_dataserver, this.m_gameObjectManager, function(){ that.OnChildEditFinish();});
			this.m_editObjectArray.push(editGameObjectExclusive);
			break;
		}
	}

	this.m_outputObjectMap = {};
	for (var key in ruleCollection) {
		var item = ruleCollection[key];
		var name = item._id;
		this.m_outputObjectMap[name] = ResourceEditOutput.Factory(this.m_form, item, gameObject);
	}

	var br = document.createElement("br");
	this.m_form.appendChild(br);

	var submitButton = document.createElement("a");
	submitButton.className = "appbackground center smallmargin smallrect shadow";
	submitButton.innerHTML = "<div>submit</div>";
	submitButton.onclick = function() {
		that.OnSubmitClick();
		return false;
	};
	this.m_form.appendChild(submitButton);

	var cancleButton = document.createElement("a");
	cancleButton.className = "appbackground center smallmargin smallrect shadow";
	cancleButton.innerHTML = "<div>cancle</div>";
	cancleButton.onclick = function() {
		that.OnCancleClick();
		return false;
	};
	this.m_form.appendChild(cancleButton);

	this.m_divToOccupy.appendChild(this.m_form);

	return;
}

ResourceEdit.prototype.OnGameObjectChange = function(){
	console.log("ResourceEdit:OnGameObjectChange");
	var dirtyList = this.m_gameObject.GetDirtyArray();
	//console.log("OnGameObjectChange:dirtyList:" + JSON.stringify(dirtyList));

	for (var index = 0, total = dirtyList.length; index < total; index++) {
		var name = dirtyList[index];
		if (!(name in this.m_outputObjectMap)){
			continue;
		}
		this.m_outputObjectMap[name].Update();
	}
	return;
}

ResourceEdit.prototype.OnChildEditFinish = function(){
	ResourceEdit.Factory(this.m_divToOccupy, this.m_dataserver, this.m_gameObjectManager);
	return;
}

ResourceEdit.prototype.OnSubmitClick = function(){
	//console.log("ResourceEdit:OnSubmitClick");
	this.m_dataserver.OnSubmit(this.m_gameObject);
	return;
}

ResourceEdit.prototype.OnCancleClick = function(){
	//console.log("ResourceEdit:OnCancleClick");
	this.m_dataserver.OnCancle();
	return;
}

ResourceEdit.Factory = function(divToOccupy, dataserver, gameObjectManager){
	//console.log("ResourceEdit.Factory divToOccupy.id:" + divToOccupy.id);
	var resourceEdit = new ResourceEdit(divToOccupy, dataserver, gameObjectManager);
	return resourceEdit;
}

