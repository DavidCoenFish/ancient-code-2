/**
 * A dng node implementation holding a value
 * @private
 * @template TYPE_INPUT, TYPE_OUTPUT
 * @constructor
 * @struct
 * @param {!TYPE_OUTPUT} in_value
 */
DSC.DNGValue = function(in_value)
{
	/** @type {!TYPE_OUTPUT} */
	this.m_value = in_value;
	return;
}

/**
 * @template TYPE_INPUT, TYPE_OUTPUT
 * @param {!TYPE_OUTPUT} in_value
 * @return {!DSC.DNGValue.<TYPE_INPUT, TYPE_OUTPUT>}
 */
DSC.DNGValue.Factory = function(in_value)
{
	return new DSC.DNGValue(in_value);
}

/**
 * @param {!Array.<!DSC.DNGOutputRecord.<TYPE_INPUT>>} in_arrayInput
 * @param {?TYPE_OUTPUT} in_oldValue
 * @return {!TYPE_OUTPUT}
 */
DSC.DNGValue.prototype.GetValue = function(
	in_arrayInput,
	in_oldValue
	)
{
	return this.m_value;
}

/**
 * @param {!TYPE_OUTPUT} in_value
 */
DSC.DNGValue.prototype.SetValue = function(in_value)
{
	this.m_value = in_value;
	return;
};

/**
 * @return {!boolean}
 */
DSC.DNGValue.prototype.CanSetValue = function()
{
	return true;
};


