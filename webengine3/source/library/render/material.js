/*
	material has gles flags [depth, cull, clockwise, blend, ...]

	we and some way of expressing state uniforms for shader, and when
	material changes but not shader, just updating the shader uniforms
	- seperate class for shader uniforms
		- name, type, value
*/

/**
 * @private
 * @constructor
 * @param {!c.Shader} in_shader
 * @param {!Object<!string, !c.ShaderUniform>} in_uniformMap
 * @param {!Array<!c.Texture>=} _textureArray
 * @param {!boolean=} _triangleCullEnable
 * @param {!number=} _triangleCull
 * @param {!number=} _triangleClockwise
 * @param {!number=} _blend
 * @param {!number=} _blendSourceFlag
 * @param {!number=} _blendDestinationFlag
 * @param {!boolean=} _depthWrite
 * @param {!number=} _depthTestFunc
 * @return {undefined}
 */
c.Material = function(
	in_shader,
	in_uniformMap,
	_textureArray,
	_triangleCullEnable,
	_triangleCull,
	_triangleClockwise,
	_blend,
	_blendSourceFlag,
	_blendDestinationFlag,
	_depthWrite,
	_depthTestFunc
	) {
	this.m_shader = in_shader;
	this.m_uniformMap = in_uniformMap;
	this.m_textureArray = (undefined !== _textureArray) ? _textureArray : [];

	this.m_triangleCullEnable = (undefined === _triangleCullEnable) ? false : _triangleCullEnable;
	this.m_triangleCull = (undefined === _triangleCull) ? c.WebGL.BACK : _triangleCull;

	//default is GL_CCW
	this.m_triangleClockwise = (undefined === _triangleClockwise) ? false : _triangleClockwise;

	this.m_blend = (undefined === _blend) ? false : _blend;
	this.m_blendSourceFlag = (undefined === _blendSourceFlag) ? c.WebGL.ONE : _blendSourceFlag;
	this.m_blendDestinationFlag = (undefined === _blendDestinationFlag) ? c.WebGL.ZERO : _blendDestinationFlag;
	
	this.m_depthWrite = (undefined === _depthWrite) ? true : _depthWrite;
	this.m_depthTestFunc = (undefined === _depthTestFunc) ? c.WebGL.NEVER : _depthTestFunc;
	
	return;
}
c["Material"] = c.Material;

/**
 * @param {!c.Shader} in_shader
 * @param {!Object<!string, !c.ShaderUniform>} in_uniformMap
 * @param {!Array<!c.Texture>=} _textureArray
 * @param {!boolean=} _triangleCullEnable
 * @param {!number=} _triangleCull
 * @param {!number=} _triangleClockwise
 * @param {!number=} _blend
 * @param {!number=} _blendSourceFlag
 * @param {!number=} _blendDestinationFlag
 * @param {!boolean=} _depthWrite
 * @param {!number=} _depthTestFunc
 * @return {!c.Material}
 */
c.Material.Factory = function(
	in_shader,
	in_uniformMap,
	_textureArray,
	_triangleCullEnable,
	_triangleCull,
	_triangleClockwise,
	_blend,
	_blendSourceFlag,
	_blendDestinationFlag,
	_depthWrite,
	_depthTestFunc
	){
	return new c.Material(
		in_shader,
		in_uniformMap,
		_textureArray,
		_triangleCullEnable,
		_triangleCull,
		_triangleClockwise,
		_blend,
		_blendSourceFlag,
		_blendDestinationFlag,
		_depthWrite,
		_depthTestFunc
		);
}
c.Material["Factory"] = c.Material.Factory;
