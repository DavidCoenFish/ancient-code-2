/**
 * @private
 * @constructor
 * @template T
 * @implements {DSC.DNG.DataInterface.<T>}
 * @param {!T} in_value
 * @param {!function(!Array.<DSC.DNG.Node>, !T) : !string } in_asStringFunctor node as text
 */
DSC.DNG.DataValue = function(in_value, in_asStringFunctor) 
{
	if ( !(this instanceof DSC.DNG.DataValue) )
		alert("DSC.DNG.DataValue: call constuctor with new keyword");

	/* @type {T} */
	this.m_value = in_value;
	/* @type {function(!T) : !string} */
	this.m_asStringFunctor = in_asStringFunctor;

	/* @type {boolean} */
	this.m_textDirty = true;
	/* @type {string} */
	this.m_string = "";

	return;
}
DSC.DNG['DataValue'] = DSC.DNG.DataValue;

/**
 * export
 * @template T
 * @param {!T} in_value
 * @param {!function(!T) : !string } in_asStringFunctor render node as text
 * @return {DSC.DNG.DataValue}
 */
DSC.DNG.DataValue.Factory = function(in_value, in_asStringFunctor)
{
	return new DSC.DNG.DataValue(in_value, in_asStringFunctor);
}
DSC.DNG.DataValue['Factory'] = DSC.DNG.DataValue.Factory;

/**
 * @package
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes array input nodes
 * @return {T} 
 */
DSC.DNG.DataValue.prototype.GetValue = function(_arrayInputNodes)
{
	return this.m_value;
}

/**
 * @package
 * @param {T} in_value 
 */
DSC.DNG.DataValue.prototype.SetValue = function (in_value)
{
	this.m_value = in_value;
	this.m_textDirty = true;
	return;
}

/**
 * @package
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataValue.prototype.CanSetValue = function ()
{
	return true;
}

/**
 * @package
 */
DSC.DNG.DataValue.prototype.SetDirty = function ()
{
	alert("DSC.DNG.DataValue.SetDirty: invalid code path, should not be able to set a data node dirty, data node should have zero inputs");
	return;
}

/**
 * @package
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes array input nodes
 * @return {string} 
 * nosideeffects
 */
DSC.DNG.DataValue.prototype.AsString = function(_arrayInputNodes)
{
	if (false != this.m_textDirty)
	{
		this.m_string = this.m_asStringFunctor(_arrayInputNodes, this.m_value);
		this.m_textDirty = false;
	}
	return this.m_string;
}

/**
 * @package
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataValue.prototype.GetValueDirty = function()
{
	return false;
};


