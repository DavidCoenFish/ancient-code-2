/**
 * @private
 * @final
 * @constructor
 * @param {!Object<string,(c.DagNodeCalculate|c.DagNodeValue)>} in_mapNameNode
 * @return {undefined}
 */
c.DagNodeCollection = function(in_mapNameNode) {
	this.m_mapNameNode = in_mapNameNode;
	return;
}
c["DagNodeCollection"] = c.DagNodeCollection;

/**
 * @nosideefect
 * @param {!Object<string,!(c.DagNodeCalculate|c.DagNodeValue)>} in_mapNameNode
 * @param {!Array<!c.DagNodeCalculate>} in_arrayCalculateNode
 * @return {!c.DagNodeCollection}
 */
c.DagNodeCollection.Factory = function(in_mapNameNode, in_arrayCalculateNode) {
	//c.Log(LOG, "DagNodeCollection.Factory");

	c.DagNodeCollection.AddNodeMapLinks(in_mapNameNode, in_arrayCalculateNode);
	return new c.DagNodeCollection(in_mapNameNode);
}
c.DagNodeCollection["Factory"] = c.DagNodeCollection.Factory;

/**
 * itterate over the array of calculate nodes to find push_node instructions and add a node link
 * @param {!Object<string,!(c.DagNodeCalculate|c.DagNodeValue)>} in_mapNameNode
 * @param {!Array<!c.DagNodeCalculate>} in_arrayCalculateNode
 * @return {undefined}
 */
c.DagNodeCollection.AddNodeMapLinks = function(in_mapNameNode, in_arrayCalculateNode) {
	//c.Log(LOG, "DagNodeCollection.AddNodeMapLinks start in_mapNameNode:" + JSON.stringify(in_mapNameNode));
	//c.Log(LOG, "DagNodeCollection.AddNodeMapLinks start in_arrayCalculateNode:" + JSON.stringify(in_arrayCalculateNode));

	for (var index = 0, len = in_arrayCalculateNode.length; index < len; index++) {
		var calculateNode = in_arrayCalculateNode[index];
		var instructionArray = calculateNode.GetInstructionArray();

		for (var subIndex = 0, subLen = instructionArray.length; subIndex < subLen; subIndex++) {
			var instruction = instructionArray[subIndex];
			if ("push_node" === instruction["op"]){
				var inputNode = in_mapNameNode[instruction["data"]];
				instruction["node"] = inputNode;
				c.DagNodeCollection.SetNodesLinked(inputNode, calculateNode);
			}
		}
	}

	//c.Log(LOG, "DagNodeCollection.AddNodeMapLinks end");

	return;
}

/**
 * @nosideefect
 * @return {!string}
 */
c.DagNodeCollection.prototype.toString = function() {
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


/**
 * @nosideefect
 * @return {!Array<!string>}
 */
c.DagNodeCollection.prototype.GetDirtyArray = function() {
	var result = [];
	for (var name in this.m_mapNameNode) {
		var node = this.m_mapNameNode[name];

		if ((undefined !== node.GetDirty) && (node.GetDirty() === true)){
			result.push(name);
		}
	}
	return result;
}

/**
 * @nosideefect
 * @param {!string} in_name
 * @return {?}
 */
c.DagNodeCollection.prototype.GetValue = function(in_name) {
	if (in_name in this.m_mapNameNode){
		return this.m_mapNameNode[in_name].GetValue();
	}
	return undefined;
}
c.DagNodeCollection.prototype["GetValue"] = c.DagNodeCollection.prototype.GetValue;

/**
 * @nosideefect
 * @param {!string} in_name
 * @param {?} in_value
 * @return {undefined}
 */
c.DagNodeCollection.prototype.SetValue = function(in_name, in_value) {
	if (in_name in this.m_mapNameNode){
		this.m_mapNameNode[in_name].SetValue(in_value);
	}
	return;
}
c.DagNodeCollection.prototype["SetValue"] = c.DagNodeCollection.prototype.SetValue;

/**
 * @nosideefect
 * @param {!string} in_name
 * @return {(c.DagNodeCalculate|c.DagNodeValue|undefined)}
 */
c.DagNodeCollection.prototype.GetNode = function(in_name) {
	if (in_name in this.m_mapNameNode){
		return this.m_mapNameNode[in_name];
	}
	return undefined;
}

/**
 * @param {!string} in_name
 * @param {!(c.DagNodeCalculate|c.DagNodeValue)} in_node
 * @return {undefined}
 */
c.DagNodeCollection.prototype.SetNode = function(in_name, in_node) {
	this.m_mapNameNode[in_name] = in_node;
	return;
}

/**
 * @param {!(c.DagNodeCalculate|c.DagNodeValue)} in_input
 * @param {!c.DagNodeCalculate} in_output
 * @return {undefined}
 */
c.DagNodeCollection.SetNodesLinked = function(in_input, in_output) {
	if(null == in_input) {
		c.Log(LOG, "c.DagNodeCollection.SetNodesLinked in_input:" + in_input);
		return;
	}
	if(null == in_output) {
		c.Log(LOG, "c.DagNodeCollection.SetNodesLinked in_output:" + in_output);
		return;
	}

	in_input.AddOutput(in_output);
	in_output.SetDirty();
	return;
}
c.DagNodeCollection["SetNodesLinked"] = c.DagNodeCollection.SetNodesLinked;

/**
 * @param {!(c.DagNodeCalculate|c.DagNodeValue)} in_input
 * @param {!c.DagNodeCalculate} in_output
 * @return {undefined}
 */
c.DagNodeCollection.SetNodesUnlinked = function(in_input, in_output) {
	in_input.RemoveOutput(in_output);
	in_output.SetDirty();
	return;
}
c.DagNodeCollection["SetNodesUnlinked"] = c.DagNodeCollection.SetNodesUnlinked;

