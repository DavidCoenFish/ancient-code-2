/**
 * @record
 * @template TYPE_INPUT, TYPE_OUTPUT
 */
DSC.DNGImplementationRecord = function(){}

/**
 * @param {!Array.<!DSC.DNGOutputRecord.<!TYPE_INPUT>>} in_arrayInput
 * @param {null|TYPE_OUTPUT} in_oldValue
 * @return {!TYPE_OUTPUT}
 */
DSC.DNGImplementationRecord.prototype.GetValue = function(in_arrayInput, in_oldValue){};

/**
 * @param {!TYPE_OUTPUT} in_value
 */
DSC.DNGImplementationRecord.prototype.SetValue = function(in_value){};

/**
 * @return {!boolean}
 */
DSC.DNGImplementationRecord.prototype.CanSetValue = function(){};


/**
 * @record
 * @template TYPE
 */
DSC.DNGInputRecord = function(){}

/**
 */
DSC.DNGInputRecord.prototype.SetDirty = function(){};


/**
 * @record
 * @template TYPE
 */
DSC.DNGOutputRecord = function(){}

/**
 * @return {!TYPE} 
 */
DSC.DNGOutputRecord.prototype.GetValue = function(){};
