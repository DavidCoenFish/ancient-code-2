/**
 * @private
 * @constructor
 * @struct
 * @param {!(number|Object)} in_value
 * @param {!DSC.Framework.Context.Uniform.s_type} in_type
 * @param {!DSC.Framework.Context.Uniform.s_type} in_type
 */
DSC.Framework.Context.Uniform = function(in_value, in_type)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform) )
		alert("DSC.Framework.Context.Uniform: call constuctor with new keyword");

	this.m_value = in_value;
	this.m_type = in_type;

	return;
}
DSC.Framework.Context['Uniform'] = DSC.Framework.Context.Uniform;


/**
 * @const
 * @enum {number}
 */
DSC.Framework.Context.Uniform.s_type =
{	
	TVector2 : 0,
	TVector3 : 1,
	TVector4 : 2,
	TColour3 : 3,
	TColour4 : 4,
	TFrame : 5,
	TMatrix4 : 6,
	TQuaternion : 7,
	TDualQuaternion : 8,
	TInteger : 9,
	TFloat : 10
};
DSC.Framework.Context.Uniform['s_type'] = DSC.Framework.Context.Uniform.s_type;
DSC.Framework.Context.Uniform.s_type['TVector2'] = DSC.Framework.Context.Uniform.s_type.TVector2;
DSC.Framework.Context.Uniform.s_type['TVector3'] = DSC.Framework.Context.Uniform.s_type.TVector3;
DSC.Framework.Context.Uniform.s_type['TVector4'] = DSC.Framework.Context.Uniform.s_type.TVector4;
DSC.Framework.Context.Uniform.s_type['TColour3'] = DSC.Framework.Context.Uniform.s_type.TColour3;
DSC.Framework.Context.Uniform.s_type['TColour4'] = DSC.Framework.Context.Uniform.s_type.TColour4;
DSC.Framework.Context.Uniform.s_type['TMatrix4'] = DSC.Framework.Context.Uniform.s_type.TMatrix4;
DSC.Framework.Context.Uniform.s_type['TQuaternion'] = DSC.Framework.Context.Uniform.s_type.TQuaternion;
DSC.Framework.Context.Uniform.s_type['TDualQuaternion'] = DSC.Framework.Context.Uniform.s_type.TDualQuaternion;
DSC.Framework.Context.Uniform.s_type['TInteger'] = DSC.Framework.Context.Uniform.s_type.TInteger;
DSC.Framework.Context.Uniform.s_type['TFloat'] = DSC.Framework.Context.Uniform.s_type.TFloat;

/**
 * @param {!(number|Object)} in_value
 * @param {!DSC.Framework.Context.Uniform.s_type} in_type
 * @return {!DSC.Framework.Context.Uniform}
 */
DSC.Framework.Context.Uniform.Factory = function(in_value, in_type)
{
	return new DSC.Framework.Context.Uniform(in_value, in_type);
}

DSC.Framework.Context.Uniform.prototype.GetValue = function()
{
	return this.m_value;
}

DSC.Framework.Context.Uniform.prototype.SetValue = function(in_value)
{
	this.m_value = in_value;
	return;
}

