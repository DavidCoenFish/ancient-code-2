/*

should value be a dag node so it is calculated corectly

*/

/**
 * @private
 * @constructor
 * @param {!number} in_type
 * @param {!(c.DagNodeValue|c.DagNodeCalculate)} in_value
 * @return {undefined}
 */
c.ShaderUniform = function(
	in_type,
	in_value
	)
{
	this.m_type = in_type;
	this.m_value = in_value;
	
	return;
}
c["ShaderUniform"] = c.ShaderUniform;

/**
 * type
 * @const
 * @enum {number}
 */
c.ShaderUniform.s_type = 
{
	Integer : 0,
	Integer2 : 1,
	Integer3 : 2,
	Integer4 : 3,
	Float : 4,
	Float2 : 5,
	Float3 : 6,
	Float4 : 7,
	Float16 : 8,
}
c.ShaderUniform["s_type"] = c.ShaderUniform.s_type;
c.ShaderUniform.s_type["Integer"] = c.ShaderUniform.s_type.Integer;
c.ShaderUniform.s_type["Integer2"] = c.ShaderUniform.s_type.Integer2;
c.ShaderUniform.s_type["Integer3"] = c.ShaderUniform.s_type.Integer3;
c.ShaderUniform.s_type["Integer4"] = c.ShaderUniform.s_type.Integer4;
c.ShaderUniform.s_type["Float"] = c.ShaderUniform.s_type.Float;
c.ShaderUniform.s_type["Float2"] = c.ShaderUniform.s_type.Float2;
c.ShaderUniform.s_type["Float3"] = c.ShaderUniform.s_type.Float3;
c.ShaderUniform.s_type["Float4"] = c.ShaderUniform.s_type.Float4;
c.ShaderUniform.s_type["Float16"] = c.ShaderUniform.s_type.Float16;

/**
 * @nosideefect
 * @param {!number} in_type
 * @param {!(c.DagNodeValue|c.DagNodeCalculate)} in_value
 * @return {!c.ShaderUniform}
 */
c.ShaderUniform.Factory = function(
	in_type,
	in_value
	) {
	return new c.ShaderUniform(
		in_type,
		in_value
		);
}
c.ShaderUniform["Factory"] = c.ShaderUniform.Factory;
