/**
 * @private
 * @constructor
 * @implements {DSC.DNG.DataInterface.<T>}
 * @template T
 * @param {!function(!Array.<DSC.DNG.Node>, ?T) : !T} in_updateValueFunctor function to invoke when this node is dirty
 * @param {!function(!Array.<DSC.DNG.Node>, !T) : !string } in_asStringFunctor node as text
 */
DSC.DNG.DataCalculate = function(in_updateValueFunctor, in_asStringFunctor) 
{
	if ( !(this instanceof DSC.DNG.DataCalculate) )
		alert("DSC.DNG.DataCalculate: call constuctor with new keyword");

	/* @type {function(!Array.<DSC.DNG.Node>, ?T) : !T} */
	this.m_updateValueFunctor = in_updateValueFunctor;
	/* @type {function(!Array.<DSC.DNG.Node>, !T) : !string} */
	this.m_asStringFunctor = in_asStringFunctor;

	/* @type {boolean} */
	this.m_stringDirty = true;
	/* @type {string} */
	this.m_string = "";

	/* @type {boolean} */
	this.m_valueDirty = true;
	/* @type {T} */
	this.m_value = undefined;

	return;
}
DSC.DNG['DataCalculate'] = DSC.DNG.DataCalculate;


/**
 * export
 * @template T
 * @param {!function(!Array.<DSC.DNG.Node>, ?T) : !T} in_updateValueFunctor function to invoke when this node is dirty
 * @param {!function(!Array.<DSC.DNG.Node>, !T) : !string } in_asStringFunctor node as text
 * @return {DSC.DNG.DataCalculate}
 */
DSC.DNG.DataCalculate.Factory = function(in_updateValueFunctor, in_asStringFunctor)
{
	return new DSC.DNG.DataCalculate(in_updateValueFunctor, in_asStringFunctor);
}
DSC.DNG.DataCalculate['Factory'] = DSC.DNG.DataCalculate.Factory;

/**
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes array input nodes
 * @return {T} 
 */
DSC.DNG.DataCalculate.prototype.GetValue = function(_arrayInputNodes)
{
	if (false != this.m_valueDirty)
	{
		this.m_valueDirty = false;
		this.m_value = this.m_updateValueFunctor(_arrayInputNodes, this.m_value);
	}
	return this.m_value;
}

/**
 * @param {T} in_value 
 */
DSC.DNG.DataCalculate.prototype.SetValue = function (in_value)
{
	alert("DSC.DNG.DataCalculate.SetValue: invalid code path, should not set value when calculated");
	return;
}

/**
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataCalculate.prototype.CanSetValue = function ()
{
	return false;
}

/**
 */
DSC.DNG.DataCalculate.prototype.SetDirty = function ()
{
	this.m_stringDirty = true;
	this.m_valueDirty = true;
	return;
}

/**
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes array input nodes
 * @return {string} 
 * nosideeffects
 */
DSC.DNG.DataCalculate.prototype.AsString = function(_arrayInputNodes)
{
	if (false != this.m_stringDirty)
	{
		this.m_stringDirty = false;
		this.m_string = this.m_asStringFunctor(_arrayInputNodes, this.GetValue(_arrayInputNodes));
	}
	return this.m_string;
}

/**
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataCalculate.prototype.GetValueDirty = function()
{
	return this.m_valueDirty;
};

