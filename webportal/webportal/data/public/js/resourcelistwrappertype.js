/*
given a map of types and endpoints, allow selection of a type and populate a resource list for the sellected type

*/


const ResourceListWrapperType = function(divToOccupy, typeEndpointMap, gameObjectManager) {
	this.m_divToOccupy = divToOccupy;
	this.m_typeEndpointMap = typeEndpointMap;
	this.m_gameObjectManager = gameObjectManager;

	this.ClearDiv();

	var wrapperDiv = document.createElement("div");
	wrapperDiv.className = "appforeground smallmargin smallrect";

	var firstType;
	this.m_input = document.createElement("select");
	for (var type in typeEndpointMap)
	{
		if (undefined === firstType){
			firstType = type;
		}
		var option = document.createElement("option");
		option.value = type;
		option.innerHTML = type;
		this.m_input.appendChild(option);
	}
	this.m_input.value = firstType;
	wrapperDiv.appendChild(this.m_input);
	divToOccupy.appendChild(wrapperDiv);

	var that = this;
	this.m_input.oninput = function(){ that.OnInput(); };

	this.m_resourceListDiv = document.createElement("div");
	this.m_resourceListDiv.className = "appforeground flowhorizontal";// scroll";
	divToOccupy.appendChild(this.m_resourceListDiv);

	this.SetResourceList(firstType);

	return;
}

ResourceListWrapperType.Factory = function(divToOccupy, typeEndpointMap, gameObjectManager){
	var resourceListWrapperType = new ResourceListWrapperType(divToOccupy, typeEndpointMap, gameObjectManager);
	return resourceListWrapperType;
}

ResourceListWrapperType.prototype.ClearDiv = function(){
	while(this.m_divToOccupy.firstChild){
		this.m_divToOccupy.removeChild(this.m_divToOccupy.firstChild);
	}
	this.m_divToOccupy.ondragover = undefined;
	this.m_divToOccupy.ondrop = undefined;
	return;
}

ResourceListWrapperType.prototype.OnInput = function(){
	this.SetResourceList(this.m_input.value);
}

ResourceListWrapperType.prototype.SetResourceList = function(type){
	var typeMap = {};
	typeMap[type] = this.m_typeEndpointMap[type];
	dataServerResourceCharacter = ResourceListDataServerResource.Factory(typeMap, this.m_gameObjectManager);
	ResourceList.Factory(this.m_resourceListDiv, this.m_resourceListDiv, dataServerResourceCharacter, this.m_gameObjectManager);

	return;
}
