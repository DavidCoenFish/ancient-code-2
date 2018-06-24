/**
 * Data server interface for directional node graph
 * @package
 * @interface
 * @template T
 */
DSC.DNG.DataInterface = function()
{
	alert("DSC.DNG.DataInterface: abstract class, do not construct");	
}

/**
 * @package
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes
 * @return {T} 
 */
DSC.DNG.DataInterface.prototype.GetValue = function(_arrayInputNodes){};

/**
 * @package
 * @param {T} in_value 
 */
DSC.DNG.DataInterface.prototype.SetValue = function (in_value){};

/**
 * @package
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataInterface.prototype.CanSetValue = function (){};

/**
 * @package
 */
DSC.DNG.DataInterface.prototype.SetDirty = function (){};

/**
 * @param {Array.<DSC.DNG.Node>=} _arrayInputNodes
 * @return {string} 
 * nosideeffects
 * @package
 */
DSC.DNG.DataInterface.prototype.AsString = function(_arrayInputNodes){};

/**
 * @package
 * @return {boolean} 
 * nosideeffects
 */
DSC.DNG.DataInterface.prototype.GetValueDirty = function(){};
