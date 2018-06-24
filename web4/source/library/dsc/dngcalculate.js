/**
 * A dng node implementation holding a value
 * @private
 * @template TYPE_INPUT, TYPE_OUTPUT
 * @constructor
 * @struct
 * @param {!function(!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>, (null|TYPE_OUTPUT)) : !TYPE_OUTPUT} in_updateValueFunctor function to invoke when this node is dirty
 */
DSC.DNGCalculate = function(in_updateValueFunctor)
{
	/** @type {!function(!Array.<null|(DSC.DNGOutputRecord.<TYPE_INPUT>)>, (null|TYPE_OUTPUT)) : !TYPE_OUTPUT} */
	this.m_updateValueFunctor = in_updateValueFunctor;
	return;
}

/**
 * @template TYPE_INPUT, TYPE_OUTPUT
 * @param {!function(!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>, (null|TYPE_OUTPUT)) : !TYPE_OUTPUT} in_updateValueFunctor function to invoke when this node is dirty
 * @return {!DSC.DNGCalculate.<!TYPE_INPUT, !TYPE_OUTPUT>}
 */
DSC.DNGCalculate.Factory = function(in_updateValueFunctor)
{
	return new DSC.DNGCalculate(in_updateValueFunctor);
}

/**
 * @param {!Array.<null|(DSC.DNGOutputRecord.<!TYPE_INPUT>)>} in_arrayInput
 * @param {null|TYPE_OUTPUT} in_oldValue
 * @return {!TYPE_OUTPUT}
 */
DSC.DNGCalculate.prototype.GetValue = function(
	in_arrayInput,
	in_oldValue
	)
{
	return this.m_updateValueFunctor(in_arrayInput, in_oldValue);
}

/**
 * @param {!TYPE_OUTPUT} in_value
 */
DSC.DNGCalculate.prototype.SetValue = function(in_value)
{
	return;
};

/**
 * @return {!boolean}
 */
DSC.DNGCalculate.prototype.CanSetValue = function()
{
	return false;
};


