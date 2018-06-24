DSC.Framework.Asset.Shader.Uniform = function(
	in_type
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Shader.Uniform) )
		alert("DSC.Framework.Asset.Shader.Uniform: call constuctor with new keyword");

	this.m_type = in_type;
	this.m_location = undefined;

	return;
}

DSC.Framework.Asset.Shader.Uniform.FactoryRaw = function(
	in_type
	)
{
	return new DSC.Framework.Asset.Shader.Uniform(
		in_type
		);
}
