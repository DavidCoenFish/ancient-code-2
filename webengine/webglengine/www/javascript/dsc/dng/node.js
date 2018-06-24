//dsc/dng/node.js
/*
	Directional Node Graph

	value = _updateFunction(in_arrayInputValues, value, _updateData);


	node
	m_arrayInput n input channels
		list of inputs to use to calculate value. order matters (preserve index). can contain undefined
	m_arrayOutput n outputs
		list of outputs that consumes value from this node. used to propergate 'set dirty'. order doesn't matter. no undefined
	m_value 
		the calculated value, [undefined, builtintype, object]
	m_updateFunction
		client callback function to update the value given collect input values

*/

DSC.DNG.Node = function (_value, _updateFunction, _updateData, _debugComment)
{
	if (!(this instanceof DSC.DNG.Node))
		alert("DSC.DNG.Node: call constuctor with new keyword");
	if ((undefined == _value) &&
		(undefined == _updateFunction))
		alert("DSC.DNG.Node: value of update function must be defined");

	this.m_arrayInput = [];
	this.m_arrayOutput = []; // to make dirty update easier, keep track of the outputs, ie, things that use our input
	this.m_dirty = (undefined == _value) ? true : false; //if a value is supplied, we are not dirty

	this.m_value = _value;
	this.m_updateFunction = _updateFunction;
	this.m_updateData = _updateData;
	this.m_debugComment = _debugComment;

	return;
}

DSC.DNG.Node.prototype.GetValue = function()
{
	if (true != this.m_dirty)
		return this.m_value; //already calculated

	this.m_dirty = false;

	if (undefined == this.m_updateFunction)
		return this.m_value; // no update function, we just hold a value

	var arrayInput = [];
	this.m_arrayInput.forEach(function (input) {
		if (undefined == input)
		{
			arrayInput.push(undefined);
		}
		else
		{
			var value = input.GetValue();
			arrayInput.push(value);
		}
	});	
	this.m_value = this.m_updateFunction(arrayInput, this.m_value, this.m_updateData);

	return this.m_value;
}

DSC.DNG.Node.prototype.SetValue = function (in_value)
{
	if (undefined != this.m_updateFunction)
		alert("DSC.DNG.Node.SetValue: called SetValue on object with a update function");

	if (undefined == in_value)
		alert("DSC.DNG.Node.SetValue: expected value paramater is undefined");

	this.m_value = in_value;

	this.m_dirty = false; // we are not dirty, but our outputs now are

	this.SetOutputDirty();

	return;
}

DSC.DNG.Node.prototype.GetInput = function (in_index)
{
	if ((0 <= in_index) && (in_index < this.m_arrayInput.length))
		return this.m_arrayInput[in_index];
	return undefined;
}

DSC.DNG.Node.prototype.SetInput = function (in_input, _index)
{
	if (_index < 0)
		return;
	if (this.m_arrayInput.length <= _index)
		this.m_arrayInput.length = _index + 1;

	this.m_arrayInput[_index] = in_input;
	this.SetDirty();

	return;
}

DSC.DNG.Node.prototype.AddOutput = function (_output) 
{
	if (undefined == _output)
		alert("DSC.DNG.Node.AddOutput: attempt to add undefined output");

	this.m_arrayOutput.push(_output);
	return;
}

DSC.DNG.Node.prototype.RemoveInput = function (_input)
{
	for (var index = 0; index < this.m_arrayInput.length; ++index) 
	{
		if (_input == this.m_arrayInput[index]) 
		{
			this.m_arrayInput[index] = undefined;
			return;
		}
	}

	return;
}

DSC.DNG.Node.prototype.RemoveOutput = function (_output)
{
	for (var index = 0; index < this.m_arrayOutput.length; ++index) 
	{
		if (_output == this.m_arrayOutput[index]) 
		{
			this.m_arrayOutput.splice(index, 1);
			index -= 1;
		}
	}

	return;
}

DSC.DNG.Node.prototype.SetDirty = function ()
{
	if (this.m_dirty == true)
		return;

	this.m_dirty = true;

	this.SetOutputDirty();

	return;
}

DSC.DNG.Node.prototype.SetOutputDirty = function ()
{
	this.m_arrayOutput.forEach(function (output) {
		output.SetDirty();
	});

	return;
}

DSC.DNG.Node.prototype.Detach = function ()
{
	var that = this;
	this.m_arrayInput.forEach(function (input) {
		if (undefined != input)
			input.RemoveOutput(that);
	});
	this.m_arrayOutput.forEach(function (output) {
		output.RemoveInput(that);
	});
}

DSC.DNG.Node.FactoryRaw = function(_value, _updateFunction, _updateData, _debugComment)
{
	return new DSC.DNG.Node(_value, _updateFunction, _updateData, _debugComment);
}

DSC.DNG.Node.s_zero = DSC.DNG.Node.FactoryRaw(0.0);
DSC.DNG.Node.s_one = DSC.DNG.Node.FactoryRaw(1.0);
DSC.DNG.Node.s_true = DSC.DNG.Node.FactoryRaw(true);
DSC.DNG.Node.s_false = DSC.DNG.Node.FactoryRaw(false);

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			var node0 = DSC.DNG.Node.FactoryRaw(7.3);
			result &= (DSC.Math.AlmostEqual(7.3, node0.GetValue()));
			node0.SetValue(8.9);
			result &= (DSC.Math.AlmostEqual(8.9, node0.GetValue()));

			if (!result)
				return "Fail: DNG.Node sanity check";
		}


		if (true != result)
			return "Fail: DNG.Node";
		return "Pass: DNG.Node";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
