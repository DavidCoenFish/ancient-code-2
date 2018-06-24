/*
node has set of instructions~ is constructed from a set of instructions (reverse polish notation)
 { "op" : OperationEnum, "data" : "blah" }

 try to use stack rather than instruction data as param for operation, more flexiblity
  .exception where wanting to prefetch tables so want to be able to pull out type info early
*/
const OperationEnum = Object.freeze({
	//
	"nop":0,
	"push_const":1,
	"push_dng":2, //the instuction.data is a dagnode, push the dagnode.GetValue()
	"push_get_value":3, //name, game object. push the value from a getValue call, using data as of the name for getValue
	"push_array_get_value":4, //name, array game objects. push array of values from game objects
	"index_clear":5, //preserve the index'ed value from the top stack, clear the rest 
	"index_dupe":6, //duplicate/push the index'ed value from the top stack

	//mono operands, take and replace last item on stack
	"not":10, //swap true and false
	"neg":11, //invert sign
	"floor":12,
	"ceil":13,
	"round":14,
	"abs":15,
	"log2":16,
	"exp":17,
	"sqrt":18,
	"replace_undefined":19, // pop value, if value is undefined, push instruction data, else value
	//"is_zero":19,
	//"is_neg":20,
	//"is_pos":21,
	//"is_undefined":22,
	//"sin":19,
	//"cos":20,
	//"tan":21,
	
	//binary operands, take two items off stack, replace with one
	"mul":50,
	"div":51,
	"add":52,
	"sub":53,
	"equal":54,
	"not_equal":55,
	"less":56,
	"less_equal":57,
	"greater":58,
	"greater_equal":59,
	"min":60,
	"max":61,
	"pow":62,
	"join":63, //string? join a and b, using what is in the data as the joiner "human","male" with data "." => "human.male"

	//misc
	"collection_id_field":100,  //data is collection name, a is id, b is field (table name is data rather than on stack so client can have easier time of know what tables to prefetch)
	"stack_to_array":101,
	"array_to_stack":102, //expect the current value on the stack to be an array, pop it and put each item in array on stack
	"array_index":103, //expect array on stack, pop array, puth the index value of the array onto the stack
	"any_true":104, //bool and int? look at each value on stack, pop them all, then push boolean condition
	"all_true":105, 
	"any_false":106,
	"all_false":107,
	"stack_sum":108,
	"stack_average":109,
	"stack_min":110,
	"stack_max":111,
	"stack_max_key":112, //key:10, value:blah, find first item on stack with largest key, 
	"to_key":150, //pop a {key:,value}, push the key
	"to_value":151, //pop a {key:,value}, push the value
	"to_key_value":152,
	"from_key_value":153,
	"clamp":154, //min,max,value => clamped_value
	//"dice_roll":155, //sides, dice count
	"if":156, //if,a,b
	"random_array":157, //expect seed, array length on stack, generate an array of length fill with random numbers
	"dice_random_array":158, //array random nb, array index,  dice count, dice sides
	"object_to_game_object":159,
	"array_to_game_object_array":160,
	});

/*
dataServer.GetCollectionIDField(table, id, field);
//dataServer.GetDiceRoll(number, sides)
dataServer.MakeRandomGenerator(seed)
dataServer.GameObjectToGameDocument(object)
*/
const CalculateValue = function(calculationStack, instructionArray, dataServer) {
	//console.log("CalculateValue");
	calculationStack.length = 0;
	for (var index = 0, len = instructionArray.length; index < len; index++) {
		var instruction = instructionArray[index];

		if (instruction == null){
			throw new Error ("null instruction at:" + index);
		}

		//console.log("index:" + index + " instruction.op:" + instruction.op + " instruction.data:" + instruction.data);
		//console.log("calculationStack:" + JSON.stringify(calculationStack));

		switch (instruction.op)
		{
		default:
			break;
		case OperationEnum.push_const:
			calculationStack.push(instruction.data);
			break;
		case OperationEnum.push_dng:
			calculationStack.push(instruction.data.GetValue());
			break;
		case OperationEnum.push_get_value:
			var gameObject = calculationStack.pop();
			var name = calculationStack.pop();
			var value = (gameObject !== undefined) ? gameObject.GetValue(name) : undefined;
			//console.log("OperationEnum.get_value:" + name + " value:" + value);
			calculationStack.push(value);
			break;
		case OperationEnum.push_array_get_value:
			var arrayGameObject = calculationStack.pop();
			var name = calculationStack.pop();
			//console.log("OperationEnum.push_array_get_value:" + name + " arrayGameObject:" + arrayGameObject + " " + arrayGameObject.length);
			var arrayValue = [];
			for (var subIndex = 0, subTotal = arrayGameObject.length; subIndex < subTotal; subIndex++) {
				var gameObject = arrayGameObject[subIndex];
				var value = (gameObject !== undefined) ? gameObject.GetValue(name) : undefined;
				arrayValue.push(value);
			}
			calculationStack.push(arrayValue);
			break;
		case OperationEnum.index_clear:
			var value = calculationStack[calculationStack.length - 1 - instruction.data];
			calculationStack.length = 0;
			calculationStack.push(value);
			break;
		case OperationEnum.index_dupe:
			var value = calculationStack[calculationStack.length - 1 - instruction.data];
			calculationStack.push(value);
			break;
		case OperationEnum.not:
			var value = calculationStack.pop();
			calculationStack.push(value == 0);
			break;
		case OperationEnum.neg:
			var value = calculationStack.pop();
			calculationStack.push(-value);
			break;
		case OperationEnum.floor:
			var value = calculationStack.pop();
			calculationStack.push(Math.floor(value));
			break;
		case OperationEnum.ceil:
			var value = calculationStack.pop();
			calculationStack.push(Math.ceil(value));
			break;
		case OperationEnum.round:
			var value = calculationStack.pop();
			calculationStack.push(Math.round(value));
			break;
		case OperationEnum.abs:
			var value = calculationStack.pop();
			calculationStack.push(Math.abs(value));
			break;
		case OperationEnum.log2:
			var value = calculationStack.pop();
			calculationStack.push(Math.log2(value));
			break;
		case OperationEnum.exp:
			var value = calculationStack.pop();
			calculationStack.push(Math.exp(value));
			break;
		case OperationEnum.sqrt:
			var value = calculationStack.pop();
			calculationStack.push(Math.exp(value));
			break;
		case OperationEnum.replace_undefined:
			var value = calculationStack.pop();
			calculationStack.push(((value === undefined) || (value === null))? instruction.data : value);
			break;
		case OperationEnum.mul:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs * rhs);
			break;
		case OperationEnum.div:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs / rhs);
			//throw new Error("lhs:" + lhs + " rhs:" + rhs + " " + (lhs / rhs));
			break;
		case OperationEnum.add:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs + rhs);
			break;
		case OperationEnum.sub:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs - rhs);
			break;
		case OperationEnum.equal:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs == rhs);
			break;
		case OperationEnum.not_equal:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs != rhs);
			break;
		case OperationEnum.less:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs < rhs);
			break;
		case OperationEnum.less_equal:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs <= rhs);
			break;
		case OperationEnum.greater:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs > rhs);
			break;
		case OperationEnum.greater_equal:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(lhs >= rhs);
			break;
		case OperationEnum.min:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(Math.min(lhs,rhs));
			break;
		case OperationEnum.max:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(Math.max(lhs,rhs));
			break;
		case OperationEnum.pow:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push(Math.pow(lhs,rhs));
			break;
		case OperationEnum.join:
			var rhs = calculationStack.pop();
			var lhs = calculationStack.pop();
			calculationStack.push("" + lhs + instruction.data + rhs);
			break;
		case OperationEnum.collection_id_field:
			var field = calculationStack.pop();
			var id = calculationStack.pop();
			var collectionName = instruction.data;
			var value = dataServer.GetCollectionIDField(collectionName, id, field);
			calculationStack.push(value);
			//throw new Error("collection_id_field:" + collectionName + " " + id + " " + field + " " + value);
			//console.log("collection_id_field:" + collectionName + " " + id + " " + field + " " + value);
			break;
		case OperationEnum.stack_to_array:
			var value = [];
			while(0 < calculationStack.length) {
				value.push(calculationStack.pop());
			}
			calculationStack.push(value);
			break;
		case OperationEnum.array_to_stack:
			var value = calculationStack.pop();
			while(0 < value.length) {
				calculationStack.push(value.pop());
			}
			break;
		case OperationEnum.array_index:
			var arrayValue = calculationStack.pop();
			var value = undefined;
			if ((0 <= instruction.data) && (instruction.data < arrayValue.length)) {
				value = arrayValue[instruction.data];
			}
			calculationStack.push(value);
			break;
		case OperationEnum.any_true:
			var anyTrue = false;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (value != 0) {
					anyTrue = true;
					break;
				}
			}
			calculationStack.length = 0;
			calculationStack.push(anyTrue);
			break;
		case OperationEnum.all_true:
			var allTrue = true;
			var anyTrue = false;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (value != 0) {
					anyTrue = true;
				} else {
					allTrue = false;
					break;
				}

			}
			calculationStack.length = 0;
			calculationStack.push(anyTrue && allTrue);
			break;
		case OperationEnum.any_false:
			var anyFalse = false;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (value == 0) {
					anyFalse = true;
					break;
				}
			}
			calculationStack.length = 0;
			calculationStack.push(anyFalse);
			break;
		case OperationEnum.all_false:
			var allFalse = true;
			var anyFalse = false;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (value == 0) {
					anyFalse = true;
				} else {
					allFalse = false;
					break;
				}

			}
			calculationStack.length = 0;
			calculationStack.push(anyFalse && allFalse);
			break;
		case OperationEnum.stack_sum:
			var sum = 0;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				sum += value;
			}
			calculationStack.push(sum);
			break;
		case OperationEnum.stack_average:
			var sum = 0;
			var count = 0;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				sum += value;
				count += 1;
			}
			if (0 < count){
				sum /= count;
			}
			calculationStack.push(sum);
			break;
		case OperationEnum.stack_min:
			var any = false;
			var min = undefined;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (any === false){
					min = value;
					any = true;
				} else {
					min = Math.min(min, value);
				}
			}
			calculationStack.push(min);
			break;
		case OperationEnum.stack_max:
			var any = false;
			var max = undefined;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (any === false){
					max = value;
					any = true;
				} else {
					max = Math.max(max, value);
				}
			}
			calculationStack.push(max);
			break;
		case OperationEnum.stack_max_key:
			var any = false;
			var max = undefined;
			while(0 < calculationStack.length) {
				var value = calculationStack.pop();
				if (any === false){
					max = value;
					any = true;
				} else {
					if (max.key < value.key){
						max = value;
					}
				}
			}
			calculationStack.push(max);
			break;
		case OperationEnum.to_key:
			var keyValue = calculationStack.pop();
			calculationStack.push(keyValue.key);
			break;
		case OperationEnum.to_value:
			var keyValue = calculationStack.pop();
			calculationStack.push(keyValue.value);
			break;
		case OperationEnum.to_key_value:
			var keyValue = calculationStack.pop();
			calculationStack.push(keyValue.key);
			calculationStack.push(keyValue.value);
			break;
		case OperationEnum.from_key_value:
			var value = calculationStack.pop();
			var key = calculationStack.pop();
			calculationStack.push({"key":key,"value":value});
			break;
		case OperationEnum.clamp:
			var value = calculationStack.pop();
			var max = calculationStack.pop();
			var min = calculationStack.pop();
			calculationStack.push(Math.max(min, Math.min(max, value)));
			break;
		case OperationEnum.if:
			var condition = calculationStack.pop();
			var b = calculationStack.pop();
			var a = calculationStack.pop();
			calculationStack.push(condition ? a : b);
			break;
		case OperationEnum.random_array:
			var length = calculationStack.pop();
			var seed = calculationStack.pop();
			var result = [];
			var randomGenerator = dataServer.MakeRandomGenerator(seed);
			for (var localIndex = 0; localIndex < length; ++localIndex){
				result.push(randomGenerator.Random());
			}
			calculationStack.push(result);
			break;
		case OperationEnum.dice_random_array: //":158, //array random nb, array index,  dice count, dice sides
			var sides = calculationStack.pop();
			var count = calculationStack.pop();
			var randIndex = calculationStack.pop();
			var arrayValue = calculationStack.pop();
			var result = dataServer.RandomStreamDieRoll(arrayValue, randIndex, count, sides);
			calculationStack.push(result);
			break;
		case OperationEnum.object_to_game_object: //":159,
			var type = calculationStack.pop();
			var document = calculationStack.pop();
			document._type = type;
			var result = dataServer.GameDocumentToGameObject(document);
			calculationStack.push(result);
			break;
		case OperationEnum.array_to_game_object_array: //":160,
			var type = calculationStack.pop();
			var arrayValue = calculationStack.pop();
			var result = [];
			if (arrayValue != undefined){
				for (var localIndex = 0; localIndex < arrayValue.length; ++localIndex){
					var document = arrayValue[localIndex];
					document._type = type;
					var gameObject = dataServer.GameDocumentToGameObject(document);
					if (gameObject != undefined){
						result.push(gameObject);
					}
				}
			}
			calculationStack.push(result);
			break;
		}
	}

	if (calculationStack.length <= 0) {
		throw new Error("invalid calculation stack");
		return undefined;
	}
	return calculationStack[0];
}

const DagNodeCalculate = function(name, instructionArray, dataServer) {
	this.m_name = name;
	this.m_instructionArray = instructionArray;
	this.m_dataServer = dataServer;
	this.m_value = undefined;
	this.m_dirty = true;
	this.m_outputArray = []; // nodes attached/ consuming the value of this node. if we become dirty, we need to tell all of them to be dirty;
	this.m_calculationStack = [];
	return;
}

DagNodeCalculate.prototype.toString = function() {
	var result = "{m_name:" + this.m_name + ", m_value:" + this.m_value + ", m_dirty:" + this.m_dirty + ", m_outputArray:[";
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

DagNodeCalculate.prototype.GetName = function() {
	return this.m_name;
}

DagNodeCalculate.prototype.GetValue = function() {
	if (this.m_dirty == true){
		//console.log("GetValue dirty:" + this.toString());

		this.m_dirty = false;
		try {
			this.m_value = CalculateValue(
				this.m_calculationStack,
				this.m_instructionArray,
				this.m_dataServer
				);
		} catch (e) {
			console.log("GetValue name:" + this.m_name + " threw error:" + e + " this:" + this);
			throw e;
		}
		//throw on value bing undefined?
	}
	return this.m_value;
}

DagNodeCalculate.prototype.GetDirty = function() {
	return this.m_dirty;
}

DagNodeCalculate.prototype.SetDirty = function() {
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

DagNodeCalculate.prototype.AddOutput = function(node) {
	this.m_outputArray.push(node);
	return;
}

DagNodeCalculate.prototype.RemoveOutput = function(node) {
	this.m_outputArray = this.m_outputArray.filter(e => e !== node)
	return;
}
