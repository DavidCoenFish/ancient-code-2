/**
 * @private
 * @constructor
 * @struct
 * @param {!(number|Object)} in_dngNode
 * @param {!DSC.Framework.Context.Uniform.s_type} in_type
 */
DSC.Framework.Context.Uniform.DNG = function(in_dngNode, in_type)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform.DNG) )
		alert("DSC.Framework.Context.Uniform.DNG: call constuctor with new keyword");

	if ( !(in_dngNode instanceof DSC.DNG.Node) )
		alert("DSC.Framework.Context.Uniform.DNG: in_dngNode not of type DSC.DNG.Node");

	this.m_dngNode = in_dngNode;
	this.m_type = in_type;

	return;
}

/**
 * @param {!(number|Object)} in_dngNode
 * @param {!DSC.Framework.Context.Uniform.s_type} in_type
 * @return {!DSC.Framework.Context.Uniform.DNG}
 */
DSC.Framework.Context.Uniform.DNG.Factory = function(in_dngNode, in_type)
{
	return new DSC.Framework.Context.Uniform.DNG(in_dngNode, in_type);
}

DSC.Framework.Context.Uniform.DNG.prototype.GetValue = function()
{
	return this.m_dngNode.GetValue();
}

DSC.Framework.Context.Uniform.DNG.prototype.SetValue = function(in_value)
{
	this.m_dngNode.SetValue(in_value);
	return;
}
