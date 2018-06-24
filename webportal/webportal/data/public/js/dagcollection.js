/*
dagnodecollection
	reference to data
	add node
	get node? link? 
	remove node
	get value

*/

const DagCollection = function(mapNameNode) {
	this.m_mapNameNode = mapNameNode;
	return;
}

DagCollection.prototype.toString = function() {
	var ret = "{m_mapNameNode:{";
	var first = true;
	for (var name in this.m_mapNameNode) {
		if (true === first){
			first = false;
		} else {
			ret += ", ";
		}
		ret += name + ":" + this.m_mapNameNode[name].toString();
	}
	ret += "}}";
	return ret;
}

DagCollection.prototype.GetDirtyArray = function() {
	var result = [];
	for (var name in this.m_mapNameNode) {
		var node = this.m_mapNameNode[name];

		if (("GetDirty" in node) && (node.GetDirty() === true)){
			result.push(name);
		}
	}
	return result;
}

DagCollection.prototype.GetValue = function(name) {
	if (name in this.m_mapNameNode){
		return this.m_mapNameNode[name].GetValue();
	}
	return undefined;
}

DagCollection.prototype.SetValue = function(name, value) {
	if (name in this.m_mapNameNode){
		this.m_mapNameNode[name].SetValue(value);
	}
	return;
}

DagCollection.prototype.GetNode = function(name) {
	if (name in this.m_mapNameNode){
		return this.m_mapNameNode[name];
	}
	return undefined;
}

DagCollection.prototype.SetNode = function(name, node) {
	this.m_mapNameNode[name] = node;
	return;
}

DagCollection.SetNodesLinked = function(input, output) {
	input.AddOutput(output);
	output.SetDirty();
	//output could have input as instruction data ref, or in it's input array
	return;
}

DagCollection.SetNodesUnlinked = function(input, output) {
	input.RemoveOutput(output);
	output.SetDirty();
	//output could have input as instruction data ref, or in it's input array
	return;
}

