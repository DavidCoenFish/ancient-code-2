/**
 * A node in the directional node graph, 
 *  this node can uses type NODE_INPUT as input
 *  this node emits type NODE_OUTPUT as output
 * @private
 * @template TYPE_INPUT, TYPE_OUTPUT, TYPE_USER_DATA
 * @constructor
 * @struct
 * @param {!DSC.DNGImplementationRecord.<!TYPE_INPUT, !TYPE_OUTPUT>} in_implementation
 * @param {!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>=} _arrayInput
 * @param {!Array.<!(DSC.DNGInputRecord.<!TYPE_OUTPUT>)>=} _arrayOutput
 * @param {!TYPE_USER_DATA=} _userData
 */
DSC.DNGNode = function(in_implementation, _arrayInput, _arrayOutput, _userData)
{
	/** @type {!DSC.DNGImplementationRecord.<!TYPE_INPUT, !TYPE_OUTPUT>} */
	this.m_implementation = in_implementation;
	/** @type {!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>} */
	this.m_arrayInput = (undefined === _arrayInput) ? [] : _arrayInput;
	/** @type {!Array.<!(DSC.DNGInputRecord.<!TYPE_OUTPUT>)>} */
	this.m_arrayOutput = (undefined === _arrayOutput) ? [] : _arrayOutput; // to make dirty update easier, keep track of the outputs, ie, things that use our input
	/** @type {null|TYPE_OUTPUT} */
	this.m_output = null;
	/** @type {null|TYPE_USER_DATA} */
	this.m_userData = (undefined === _userData) ? null : _userData;

	/** @type {!boolean} */
	this.m_dirty = true;

	return;
}

/**
 * @template TYPE_INPUT, TYPE_OUTPUT, TYPE_USER_DATA
 * @param {!DSC.DNGImplementationRecord.<!TYPE_INPUT, !TYPE_OUTPUT>} in_implementation
 * @param {!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>=} _arrayInput
 * @param {!Array.<!(DSC.DNGInputRecord.<!TYPE_OUTPUT>)>=} _arrayOutput
 * @param {!TYPE_USER_DATA=} _userData
 * @return {!DSC.DNGNode.<!TYPE_INPUT, !TYPE_OUTPUT, !TYPE_USER_DATA>}
 */
DSC.DNGNode.Factory = function(in_implementation, _arrayInput, _arrayOutput, _userData)
{
	return new DSC.DNGNode(in_implementation, _arrayInput, _arrayOutput, _userData);
}

/**
 * @return {null|TYPE_USER_DATA}
 */
DSC.DNGNode.prototype.GetUserData = function()
{
	return this.m_userData;
}

/**
 * @return {!TYPE_OUTPUT}
 */
DSC.DNGNode.prototype.GetValue = function()
{
	if ((true === this.m_dirty) ||
		(null === this.m_output))
	{
		this.m_output = this.m_implementation.GetValue(this.m_arrayInput, this.m_output);
		this.m_dirty = false;
	}
	return this.m_output;
}

/**
 * SetValue
 * @param {!TYPE_OUTPUT} in_value
 */
DSC.DNGNode.prototype.SetValue = function(in_value)
{
	this.m_implementation.SetValue(in_value);
	this.SetDirty();
	return;
}

/**
 * SetInput
 * @param {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} in_input
 * @param {!number} in_index
 */
DSC.DNGNode.prototype.SetInput = function(in_input, in_index)
{
	/** @type {!number} */
	var index = 0;
	for (index = this.m_arrayInput.length; index < in_index + 1; ++index)
	{
		this.m_arrayInput.push(null);
	}

	/** @type {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} */
	var oldInput = this.m_arrayInput[in_index];
	if (null !== oldInput)
	{
		oldInput.RemoveOutput(this);
	}

	this.m_arrayInput[in_index] = in_input;
	if (null !== in_input)
	{
		in_input.AddOutput(this);
	}

	this.SetDirty();
	return;
}

/**
 * PushInput
 * @param {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} in_input
 */
DSC.DNGNode.prototype.AddInput = function(in_input)
{
	this.m_arrayInput.push(in_input);
	if (null !== in_input)
	{
		in_input.AddOutput(this);
	}

	this.SetDirty();
	return;
}

/**
 * RemoveInput
 * @param {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} in_input
 */
DSC.DNGNode.prototype.RemoveInput = function(in_input)
{
	/** @type {!number} */
	var index = this.m_arrayInput.indexOf(in_input);
	if (-1 != index)
	{
		/** @type {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} */
		var oldInput = this.m_arrayInput[index];
		if (null !== oldInput)
		{
			oldInput.RemoveOutput(this);
		}

		this.m_arrayInput.splice(index, 1);
	}

	this.SetDirty();
	return;
}

/**
 * ClearInput
 */
DSC.DNGNode.prototype.ClearInput = function()
{
	/** @type {!number} */
	var index = 0;
	for (index = 0; index < this.m_arrayInput.length; ++index)
	{
		/** @type {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)} */
		var oldInput = this.m_arrayInput[index];
		if (null !== oldInput)
		{
			oldInput.RemoveOutput(this);
		}
	}

	this.m_arrayInput = [];

	this.SetDirty();
	return;
}

/**
 * GetInputCount
 * @return {!number}
 */
DSC.DNGNode.prototype.GetInputCount = function()
{
	return this.m_arrayInput.length;
}

/**
 * GetInput
 * @param {!number} in_index
 * @return {null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)}
 */
DSC.DNGNode.prototype.GetInput = function(in_index)
{
	return this.m_arrayInput[in_index];
}

/**
 * GetOutputCount
 * @return {!number}
 */
DSC.DNGNode.prototype.GetOutputCount = function()
{
	return this.m_arrayOutput.length;
}

/**
 * GetOutput
 * @param {!number} in_index
 * @return {!DSC.DNGInputRecord.<!TYPE_OUTPUT>}
 */
DSC.DNGNode.prototype.GetOutput = function(in_index)
{
	return this.m_arrayOutput[in_index];
}

/**
 * private SetDirty
 * @private
 */
DSC.DNGNode.prototype.SetDirty = function()
{
	this.m_dirty = true;

	/** @type {!number} */
	var index = 0;
	for (index = 0; index < this.m_arrayOutput.length; ++index)
	{
		/** @type {!(DSC.DNGInputRecord.<!TYPE_OUTPUT>)} */
		var output = this.m_arrayOutput[index];
		output.SetDirty();
	};
}

/**
 * private AddOutput
 * @private
 * @param {!DSC.DNGInputRecord.<!TYPE_OUTPUT>} in_output
 */
DSC.DNGNode.prototype.AddOutput = function(in_output)
{
	this.m_arrayOutput.push(in_output);
}

/**
 * private RemoveOutput
 * @private
 * @param {!DSC.DNGInputRecord.<!TYPE_OUTPUT>} in_output
 */
DSC.DNGNode.prototype.RemoveOutput = function(in_output)
{
	/** @type {!number} */
	var index = this.m_arrayOutput.indexOf(in_output);
	if (-1 != index)
	{
		this.m_arrayOutput.splice(index, 1);
	}
}



