/**
 * A node in the directional node graph
 * @private
 * @final
 * @constructor
 * @struct
 * @param {!DSC.DNG.DataInterface.<*>} in_dataInterface
 */
DSC.DNG.Node = function(in_dataInterface)
{
	if ( !(this instanceof DSC.DNG.Node) )
		alert("DSC.DNG.Node: call constuctor with new keyword");

	/* @type {Array.<DSC.DNG.Node>} */
	this.m_arrayInput = [];
	/* @type {Array.<DSC.DNG.Node>} */
	this.m_arrayOutput = []; // to make dirty update easier, keep track of the outputs, ie, things that use our input

	/* @type {DSC.DNG.DataInterface.<*>} */
	this.m_dataInterface = in_dataInterface;

	return;
}
DSC.DNG['Node'] = DSC.DNG.Node;

/**
 * export
 * @param {!DSC.DNG.DataInterface} in_dataInterface
 * @return {!DSC.DNG.Node}
 */
DSC.DNG.Node.Factory = function(in_dataInterface)
{
	return new DSC.DNG.Node(in_dataInterface);
}
DSC.DNG.Node['Factory'] = DSC.DNG.Node.Factory;

/**
 * export
 * @return {!*}
 */
DSC.DNG.Node.prototype.GetValue = function()
{
	return this.m_dataInterface.GetValue(this.m_arrayInput);
}
DSC.DNG.Node.prototype['GetValue'] = DSC.DNG.Node.prototype.GetValue;

/**
 * export
 * @param {!*} in_value
 */
DSC.DNG.Node.prototype.SetValue = function (in_value)
{
	this.m_dataInterface.SetValue(in_value);
}
DSC.DNG.Node.prototype['SetValue'] = DSC.DNG.Node.prototype.SetValue;

/**
 * export
 * nosideeffects
 * @return {!boolean}
 */
DSC.DNG.Node.prototype.CanSetValue = function ()
{
	return this.m_dataInterface.CanSetValue();
}
DSC.DNG.Node.prototype['CanSetValue'] = DSC.DNG.Node.prototype.CanSetValue;

/**
 * export
 * @return {!string}
 */
DSC.DNG.Node.prototype.AsString = function()
{
	return this.m_dataInterface.AsString(this.m_arrayInput);
}
DSC.DNG.Node.prototype['AsString'] = DSC.DNG.Node.prototype.AsString;

/**
 * export
 * @param {!number} in_index
 * @param {?DSC.DNG.Node} in_input
 */
DSC.DNG.Node.prototype.AttachInput = function(in_index, in_input)
{
	if (in_index < 0)
		return;

	if (this.m_arrayInput.length <= in_index)
	{
		this.m_arrayInput.length = in_index + 1;
	}

	var oldInput = this.m_arrayInput[in_index];
	if (oldInput)
	{
		oldInput.RemoveOutput(this);
	}

	this.m_arrayInput[in_index] = in_input;
	if (in_input)
	{
		in_input.AddOutput(this);
	}

	this.SetDirty();

	return;
}
DSC.DNG.Node.prototype['AttachInput'] = DSC.DNG.Node.prototype.AttachInput;

/**
 * export
 * @param {!number} in_index
 */
DSC.DNG.Node.prototype.DetachInput = function(in_index)
{
	if ((0 <= in_index) && (in_index < this.m_arrayInput.length))
	{
		var input = this.m_arrayInput[in_index];
		if (input)
		{
			input.RemoveOutput(this);
		}

		this.m_arrayInput[in_index] = undefined;
	}
}
DSC.DNG.Node.prototype['DetachInput'] = DSC.DNG.Node.prototype.DetachInput;

/**
 * export
 */
DSC.DNG.Node.prototype.DetachInputAll = function()
{
	var that = this;
	this.m_arrayInput.forEach(function (input) 
	{
		input.RemoveOutput(that);
	});
}
DSC.DNG.Node.prototype['DetachInputAll'] = DSC.DNG.Node.prototype.DetachInputAll;

/**
 * export
 * nosideeffects
 * @return {number}
 */
DSC.DNG.Node.prototype.GetInputCount = function()
{
	var count = 0;
	this.m_arrayInput.forEach(function (input) 
	{
		if (undefined != input)
		{
			count += 1;
		}
	});
	return count;
}
DSC.DNG.Node.prototype['GetInputCount'] = DSC.DNG.Node.prototype.GetInputCount;

/**
 * export
 * nosideeffects
 * @param {number} in_index
 * @return {DSC.DNG.Node}
 */
DSC.DNG.Node.prototype.GetInput = function(in_index)
{
	if ((0 <= in_index) && (in_index < this.m_arrayInput.length))
		return this.m_arrayInput[in_index];
	return undefined;
}
DSC.DNG.Node.prototype['GetInput'] = DSC.DNG.Node.prototype.GetInput;

/**
 * export
 * nosideeffects
 * @return {number}
 */
DSC.DNG.Node.prototype.GetOutputCount = function()
{
	var count = 0;
	this.m_arrayOutput.forEach(function (output) 
	{
		if (undefined != output)
		{
			count += 1;
		}
	});
	return count;
}
DSC.DNG.Node.prototype['GetOutputCount'] = DSC.DNG.Node.prototype.GetOutputCount;

/**
 * export
 * nosideeffects
 * @param {number} in_index
 * @return {DSC.DNG.Node}
 */
DSC.DNG.Node.prototype.GetOutput = function(in_index)
{
	if ((0 <= in_index) && (in_index < this.m_arrayOutput.length))
		return this.m_arrayOutput[in_index];
	return undefined;
}
DSC.DNG.Node.prototype['GetOutput'] = DSC.DNG.Node.prototype.GetOutput;

/**
 * @private
 */
DSC.DNG.Node.prototype.SetDirty = function ()
{
	if (true == this.m_dataInterface.GetValueDirty())
		return;

	this.m_dataInterface.SetDirty();
	this.m_arrayOutput.forEach(function (output) 
	{
		output.SetDirty();
	});

	return;
}

/**
 * @private
 * @param {!DSC.DNG.Node} in_node
 */
DSC.DNG.Node.prototype.AddOutput = function(in_node)
{
	this.m_arrayOutput.push(in_node);
}

/**
 * @private
 * @param {!DSC.DNG.Node} in_node
 */
DSC.DNG.Node.prototype.RemoveOutput = function(in_node)
{
	for (var index = 0; index < this.m_arrayOutput.length; ++index) 
	{
		if (in_node == this.m_arrayOutput[index]) 
		{
			this.m_arrayOutput.splice(index, 1);
			index -= 1;
		}
	}
}
