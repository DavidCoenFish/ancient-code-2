goog.forwardDeclare("c.DagNodeCalculate");

/**
 * @private
 * @final
 * @constructor
 * @param {!string} in_name
 * @param {!*} in_value
 * @return {undefined}
 */
c.DagNodeValue = function(in_name, in_value) {
	this.m_name = in_name;
	this.m_value = in_value;
	/** type {!Array<c.DagNodeCalculate>} */
	this.m_outputArray = [];

	return;
}

goog.forwardDeclare("c.DagNodeValue");

/**
 * @nosideefect
 * @param {!string} in_name
 * @param {!*} in_value
 * @return {!c.DagNodeValue}
 */
c.DagNodeValue.Factory = function(in_name, in_value) {
	return new c.DagNodeValue(in_name, in_value);
}

/**
 * @nosideefect
 * @this {c.DagNodeValue}
 * @return {!*}
 */
c.DagNodeValue.prototype.GetValue = function() {
	return this.m_value;
}

/**
 * @this {c.DagNodeValue}
 * @param {!*} in_value
 * @return {undefined}
 */
c.DagNodeValue.prototype.SetValue = function (in_value) {
	this.m_value = in_value;

	for (var index = 0, total = this.m_outputArray.length; index < total; index++) {
		var output = this.m_outputArray[index];
		if (output !== undefined){
			output.SetDirty();
		}
	}

	return;
}

/**
 * @nosideefect
 * @this {c.DagNodeValue}
 * @return {!string}
 */
c.DagNodeValue.prototype.GetName = function() {
	return this.m_name; 
}

/**
 * @param {!c.DagNodeCalculate} in_node
 * @this {c.DagNodeValue}
 * @return {undefined}
 */
c.DagNodeValue.prototype.AddOutput = function(in_node) {
	this.m_outputArray.push(in_node);
	return;
}

/**
 * @param {!c.DagNodeCalculate} in_node
 * @this {c.DagNodeValue}
 * @return {undefined}
 */
c.DagNodeValue.prototype.RemoveOutput = function(in_node) {
	this.m_outputArray = this.m_outputArray.filter(e => e !== in_node)
	return;
}

/**
 * @nosideefect
 * @this {c.DagNodeValue}
 * @return {!string}
 */
c.DagNodeValue.prototype.toString = function() {
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
