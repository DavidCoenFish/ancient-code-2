goog.forwardDeclare("c.DagNodeCalculate");
goog.forwardDeclare("c.DagNodeValue");

/**
 * @private
 * @final
 * @constructor
 * @param {!string} in_name
 * @param {!Array<{op:string,data,node:(c.DagNodeCalculate|c.DagNodeValue)}>} in_instructionArray
 * @param {!Object<string,function(...):*>} in_instuctionContext
 * @return {undefined}
 */
c.DagNodeCalculate = function(in_name, in_instructionArray, in_instuctionContext) 
{
	this.m_name = in_name;
	this.m_instructionArray = in_instructionArray;
	this.m_instuctionContext = in_instuctionContext;

	/** @type {*|undefined} in_value */
	this.m_value = undefined;
	/** type {!Array<c.DagNodeCalculate>} */
	this.m_outputArray = [];
	/** type {!boolean} */
	this.m_dirty = true;
	/** type {!Array<?>} */
	this.m_calculationStack = [];

	return;
}
c["DagNodeCalculate"] = c.DagNodeCalculate;

/**
 * @nosideefect
 * @param {!string} in_name
 * @param {!Array<{op:string,data,node:(c.DagNodeCalculate|c.DagNodeValue)}>} in_instructionArray
 * @param {!Object<string,function(...):*>} in_instuctionContext
 * @return {!c.DagNodeCalculate}
 */
c.DagNodeCalculate.Factory = function(in_name, in_instructionArray, in_instuctionContext)
{
	return new c.DagNodeCalculate(in_name, in_instructionArray, in_instuctionContext);
}
c.DagNodeCalculate["Factory"] = c.DagNodeCalculate.Factory;

// * @const
/**
 * @enum {number}
 */
c.DagNodeInstructionEnum = {
	push_const : 0, //data is value to push
	push_node : 1, //data is name of node
	dupe_index : 2, //data is index of stack item to push
	sif : 4, // pop a, b, condition. if condition is true, push a, else b
	replace_undefined : 5, //if value on stack is undefined, pop and push data
	stack_to_array : 6,
	array_to_stack : 7,
	array_index : 8, // stack[arrayValues, arrayIndex] push item at index on array

	//data is function name to pull out of the instruction context, 
	// the nb is the param count of the function to pull off the stack
	fn0 : 50, 
	fn1 : 51, 
	fn2 : 52, 
	fn3 : 53, 
	fn4 : 54, 
	fn5 : 55, 
	fn6 : 56, 
};
c["DagNodeInstructionEnum"] = c.DagNodeInstructionEnum;
c.DagNodeInstructionEnum["push_const"] = c.DagNodeInstructionEnum.push_const;
c.DagNodeInstructionEnum["push_node"] = c.DagNodeInstructionEnum.push_node;
c.DagNodeInstructionEnum["dupe_index"] = c.DagNodeInstructionEnum.dupe_index;
c.DagNodeInstructionEnum["sif"] = c.DagNodeInstructionEnum.sif;
c.DagNodeInstructionEnum["replace_undefined"] = c.DagNodeInstructionEnum.replace_undefined;
c.DagNodeInstructionEnum["stack_to_array"] = c.DagNodeInstructionEnum.stack_to_array;
c.DagNodeInstructionEnum["array_to_stack"] = c.DagNodeInstructionEnum.array_to_stack;
c.DagNodeInstructionEnum["array_index"] = c.DagNodeInstructionEnum.array_index;
c.DagNodeInstructionEnum["fn0"] = c.DagNodeInstructionEnum.fn0;
c.DagNodeInstructionEnum["fn1"] = c.DagNodeInstructionEnum.fn1;
c.DagNodeInstructionEnum["fn2"] = c.DagNodeInstructionEnum.fn2;
c.DagNodeInstructionEnum["fn3"] = c.DagNodeInstructionEnum.fn3;
c.DagNodeInstructionEnum["fn4"] = c.DagNodeInstructionEnum.fn4;
c.DagNodeInstructionEnum["fn5"] = c.DagNodeInstructionEnum.fn5;
c.DagNodeInstructionEnum["fn6"] = c.DagNodeInstructionEnum.fn6;

/**
 * @param {!Array<?>} in_calculationStack
 * @param {!Array<{op:string,data,node:(c.DagNodeCalculate|c.DagNodeValue)}>} in_instructionArray
 * @param {!Object<string,function(...):*>} in_instuctionContext
 * @param {?} _prevValue
 * @return {!*}
 */
c.DagNodeCalculate.CalculateValue = function(in_calculationStack, in_instructionArray, in_instuctionContext, _prevValue){
	//console.log("CalculateValue");
	in_calculationStack.length = 0;
	for (var index = 0, len = in_instructionArray.length; index < len; index++) {
		var instruction = in_instructionArray[index];

		if (instruction == null){
			throw new Error ("null instruction at:" + index);
		}

		//console.log("index:" + index + " instruction.op:" + instruction["op"] + " instruction.data:" + instruction["data"]);
		//console.log("calculationStack:" + JSON.stringify(in_calculationStack));

		/** @const */
		switch (instruction["op"])
		{
		default:
			break;
		case c.DagNodeInstructionEnum.push_const:
			in_calculationStack.push(instruction["data"]);
			break;
		case c.DagNodeInstructionEnum.push_node:
			in_calculationStack.push(instruction["node"].GetValue());
			break;
		case c.DagNodeInstructionEnum.dupe_index: //data is index of stack item to push
			/** type {!*} */
			var value = in_calculationStack[in_calculationStack.length - 1 - instruction["data"]];
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.sif: // pop a, b, condition. if condition is true, push a, else b
			/** type {!boolean} */
			var condition = in_calculationStack.pop();
			var b = in_calculationStack.pop();
			var a = in_calculationStack.pop();
			if (true === condition){
				in_calculationStack.push(a);
			} else {
				in_calculationStack.push(b);
			}
			break;
		case c.DagNodeInstructionEnum.replace_undefined:
			var value = in_calculationStack.pop();
			if (undefined === value){
				in_calculationStack.push(instruction["data"]);
			} else {
				in_calculationStack.push(value);
			}
			break;
		case c.DagNodeInstructionEnum.stack_to_array:
			var value = [];
			while(0 < in_calculationStack.length) {
				value.push(in_calculationStack.pop());
			}
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.array_to_stack:
			var value = in_calculationStack.pop();
			while(0 < value.length) {
				in_calculationStack.push(value.pop());
			}
			break;
		case c.DagNodeInstructionEnum.array_index:
			var dataIndex = (in_calculationStack.pop());
			var arrayValue = in_calculationStack.pop();
			var value = undefined;
			if ((0 <= (dataIndex)) && (dataIndex < arrayValue.length)) {
				value = arrayValue[dataIndex];
			}
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn0:
			var value = in_instuctionContext[instruction["data"]](_prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn1:
			var param0 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, _prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn2:
			var param0 = in_calculationStack.pop();
			var param1 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, param1, _prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn3:
			var param0 = in_calculationStack.pop();
			var param1 = in_calculationStack.pop();
			var param2 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, param1, param2, _prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn4:
			var param0 = in_calculationStack.pop();
			var param1 = in_calculationStack.pop();
			var param2 = in_calculationStack.pop();
			var param3 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, param1, param2, param3, _prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn5:
			var param0 = in_calculationStack.pop();
			var param1 = in_calculationStack.pop();
			var param2 = in_calculationStack.pop();
			var param3 = in_calculationStack.pop();
			var param4 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, param1, param2, param3, param4, _prevValue);
			in_calculationStack.push(value);
			break;
		case c.DagNodeInstructionEnum.fn6:
			var param0 = in_calculationStack.pop();
			var param1 = in_calculationStack.pop();
			var param2 = in_calculationStack.pop();
			var param3 = in_calculationStack.pop();
			var param4 = in_calculationStack.pop();
			var param5 = in_calculationStack.pop();
			var value = in_instuctionContext[instruction["data"]](param0, param1, param2, param3, param4, param5, _prevValue);
			in_calculationStack.push(value);
			break;
		}
	}
	if (in_calculationStack.length <= 0) {
		throw new Error("invalid calculation stack");
	}
	return in_calculationStack[0];
}

/**
 * @nosideefect
 * @return {!string}
 */
c.DagNodeCalculate.prototype.GetName = function() {
	return this.m_name;
}
c.DagNodeCalculate.prototype["GetName"] = c.DagNodeCalculate.prototype.GetName;

/**
 * @return {!*}
 */
c.DagNodeCalculate.prototype.GetValue = function() {
	if (this.m_dirty == true){
		//console.log("GetValue dirty:" +  this.m_name ); //this.toString());

		this.m_dirty = false;
		try {
			this.m_value = c.DagNodeCalculate.CalculateValue(
				this.m_calculationStack,
				this.m_instructionArray,
				this.m_instuctionContext,
				this.m_value
				);
		} catch (e) {
			console.log("GetValue name:" + this.m_name + " threw error:" + e + " this:" + this);
			throw e;
		}
		//throw on value bing undefined?
	}
	return this.m_value;
}
c.DagNodeCalculate.prototype["GetValue"] = c.DagNodeCalculate.prototype.GetValue;

/**
 * @nosideefect
 * @return {!boolean}
 */
c.DagNodeCalculate.prototype.GetDirty = function() {
	return this.m_dirty;
}

/**
 * @return {undefined}
 */
c.DagNodeCalculate.prototype.SetDirty = function() {
	//console.log("SetDirty:name:" + name + " " + this.m_name);

	//we can bail if we are already dirty
	if (true == this.m_dirty){
		return;
	}
	this.m_dirty = true;
	for (var index = 0, len = this.m_outputArray.length; index < len; index++) {
		var node = this.m_outputArray[index];
		if (node != null){
			node.SetDirty();
		}
	}
	return;
}

/**
 * @param {!c.DagNodeCalculate} in_node
 * @return {undefined}
 */
c.DagNodeCalculate.prototype.AddOutput = function(in_node) {
	this.m_outputArray.push(in_node);
	return;
}

/**
 * @param {!c.DagNodeCalculate} in_node
 * @return {undefined}
 */
c.DagNodeCalculate.prototype.RemoveOutput = function(in_node) {
	this.m_outputArray = this.m_outputArray.filter(e => e !== in_node)
	return;
}

/**
 * @nosideefect
 * @return {!Array<{op:string,data,node:(c.DagNodeCalculate|c.DagNodeValue)}>} in_instructionArray
 */
c.DagNodeCalculate.prototype.GetInstructionArray = function() {
	return this.m_instructionArray;
}

/**
 * @nosideefect
 * @return {!string}
 */
c.DagNodeCalculate.prototype.toString = function() {
	var result = "{m_name:" + this.m_name + ", m_value:" + this.m_value + ", m_dirty:" + this.m_dirty + ", m_outputArray:[";
	for (var index = 0, total = this.m_outputArray.length; index < total; index++) {
		var node = this.m_outputArray[index];
		if (0 !== index){
			result += ", ";
		}
		result += node.GetName();
	}
	result += "], m_instructionArray:["
	for (var index = 0, total = this.m_instructionArray.length; index < total; index++) {
		var instruction = this.m_instructionArray[index];
		if (0 !== index){
			result += ", ";
		}
		result += "{op:" + instruction["op"] + ",data:" + instruction["data"] + "}";
	}
	result += "]}";

	return result;
}
