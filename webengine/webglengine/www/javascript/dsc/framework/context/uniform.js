DSC.Framework.Context.Uniform = function(in_value, in_type)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform) )
		alert("DSC.Framework.Context.Uniform: call constuctor with new keyword");

	this.m_value = in_value;
	this.m_type = in_type;

	return;
}

DSC.Framework.Context.Uniform.s_type =
{	
	"TVector2" : 0,
	"TVector3" : 1,
	"TVector4" : 2,
	"TColour3" : 3,
	"TColour4" : 4,
	"TFrame" : 5,
	"TMatrix4" : 6,
	"TQuaternion" : 7,
	"TDualQuaternion" : 8,
	"TInteger" : 9,
	"TFloat" : 10
};

DSC.Framework.Context.Uniform.prototype.GetValue = function()
{
	return this.m_value;
}

DSC.Framework.Context.Uniform.prototype.SetValue = function(in_value)
{
	this.m_value = in_value;
	return;
}

DSC.Framework.Context.Uniform.FactoryRaw = function(in_value, in_type)
{
	return new DSC.Framework.Context.Uniform(in_value, in_type);
}
