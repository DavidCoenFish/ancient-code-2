DSC.Framework.Context.Uniform_DNG = function(in_dngNode, in_type)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform_DNG) )
		alert("DSC.Framework.Context.Uniform_DNG: call constuctor with new keyword");

	if ( !(in_dngNode instanceof DSC.DNG.Node) )
		alert("DSC.Framework.Context.Uniform_DNG: in_dngNode not of type DSC.DNG.Node");

	this.m_dngNode = in_dngNode;
	this.m_type = in_type;

	return;
}

DSC.Framework.Context.Uniform_DNG.prototype.GetValue = function()
{
	return this.m_dngNode.GetValue();
}

DSC.Framework.Context.Uniform_DNG.prototype.SetValue = function(in_value)
{
	this.m_dngNode.SetValue(in_value);
	return;
}

DSC.Framework.Context.Uniform_DNG.FactoryRaw = function(in_dngNode, in_type)
{
	return new DSC.Framework.Context.Uniform_DNG(in_dngNode, in_type);
}
