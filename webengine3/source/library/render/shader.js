/*
	OnContextLost
	OnContextRestored(in_context)

	change map uniforms to have uniform type

note.
attribute is the per vertex data
uniform is per shader data

*/

/**
 * @private
 * @constructor
 * @param {!string} in_vertexShaderSource
 * @param {!string} in_fragmentShaderSource
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @param {!Object<!string, ?number>} in_mapUniformLocation
 * @return {undefined}
 */
c.Shader = function(
	in_vertexShaderSource, 
	in_fragmentShaderSource,
	in_mapAttributeLocation, 
	in_mapUniformLocation
	) {
	this.m_mapAttributeLocation = in_mapAttributeLocation;
	this.m_mapUniformLocation = in_mapUniformLocation;
	this.m_vertexShaderSource = in_vertexShaderSource;
	this.m_fragmentShaderSource = in_fragmentShaderSource;

	/** @type {?Object} */
	this.m_programHandle = null;

	return;
}
c["Shader"] = c.Shader;

/**
 * @param {!string} in_vertexShaderSource
 * @param {!string} in_fragmentShaderSource
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @param {!Object<!string, ?number>} in_mapUniformLocation
 * @param {!c.WebGL} in_webGL
 * @return {!c.Shader}
 */
c.Shader.Factory = function(
	in_vertexShaderSource,
	in_fragmentShaderSource,
	in_mapAttributeLocation, 
	in_mapUniformLocation,
	in_webGL
	) {
	var shader = new c.Shader(
		in_vertexShaderSource,
		in_fragmentShaderSource,
		in_mapAttributeLocation, 
		in_mapUniformLocation
		);
	shader.Init(in_webGL);
	return shader;
}
c.Shader["Factory"] = c.Shader.Factory;

/**
 * @param {!c.WebGL} in_webGL
 * @return {undefined}
 */
c.Shader.prototype.Init = function(in_webGL) {
	/** @type {?Object} */
	var vertexShader = in_webGL.LoadShader(this.m_vertexShaderSource, c.WebGL.VERTEX_SHADER);
	/** @type {?Object} */
	var fragmentShader = in_webGL.LoadShader(this.m_fragmentShaderSource, c.WebGL.FRAGMENT_SHADER);

	this.m_programHandle = null;
	this.m_programHandle = in_webGL.LinkProgram(
		this.m_mapAttributeLocation,
		this.m_mapUniformLocation,
		vertexShader,
		fragmentShader
		);

	return;
}

c.Shader.prototype.OnContextLost = function() {
	this.m_programHandle = null;
}

/**
 * @param {!c.WebGL} in_webGL
 */
c.Shader.prototype.OnContextRestored = function(in_webGL) {
	this.Init(in_webGL);
}
