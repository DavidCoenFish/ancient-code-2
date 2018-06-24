const DagNodeValue = function(name, value) {
	this.m_name = name;
	this.m_value = value;
	this.m_outputArray = [];
	return;
}

DagNodeValue.prototype.toString = function() {
	var result = "{m_name:" + this.m_name + ", m_value:" + this.m_value + ", m_outputArray:[";
	for (var index = 0, total = this.m_outputArray.length; index < total; index++) {
		var node = this.m_outputArray[index];
		if (0 !== index){
			result += ", ";
		}
		result += node.GetName();
	}
	result += "]}";
	return result;
}

DagNodeValue.prototype.GetName = function() {
	return this.m_name;
}

DagNodeValue.prototype.GetValue = function() {
	return this.m_value;
}

DagNodeValue.prototype.SetValue = function(value) {
	this.m_value = value;

	for (var index = 0, total = this.m_outputArray.length; index < total; index++) {
		var output = this.m_outputArray[index];
		if (output !== undefined){
			output.SetDirty();
		}
	}

	return;
}

DagNodeValue.prototype.AddOutput = function(node) {
	this.m_outputArray.push(node);
	return;
}

DagNodeValue.prototype.RemoveOutput = function(node) {
	this.m_outputArray = this.m_outputArray.filter(e => e !== node)
	return;
}
