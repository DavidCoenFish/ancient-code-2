/*
	OnContextLost
	OnContextRestored(in_context)

	change map uniforms to have uniform type
*/

/**
 * @private
 * @constructor
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Uint8Array}	in_data
 * @param {!number=} _internalFormat
 * @param {!number=} _format
 * @param {!number=} _type
 * @param {!boolean=} _flip
 * @param {!number=} _magFilter
 * @param {!number=} _minFilter
 * @param {!number=} _wrapS
 * @param {!number=} _wrapT
 * @return {undefined}
 */
c.Texture = function (
	in_width, 
	in_height,
	in_data, 
	_internalFormat,
	_format,
	_type,
	_flip,
	_magFilter,
	_minFilter,
	_wrapS,
	_wrapT
	) {
	this.m_width = in_width;
	this.m_height = in_height;
	this.m_data = in_data;
	this.m_internalFormat = (undefined === _internalFormat) ? c.WebGL.RGBA : _internalFormat;
	this.m_format = (undefined === _format) ? c.WebGL.RGBA : _format;
	this.m_type = (undefined === _type) ? c.WebGL.UNSIGNED_BYTE : _type;
	this.m_flip = _flip;

	this.m_magFilter = (undefined === _magFilter) ? c.WebGL.LINEAR : _magFilter;
	this.m_minFilter = (undefined === _minFilter) ? c.WebGL.LINEAR : _minFilter;
	this.m_wrapS = (undefined === _wrapS) ? c.WebGL.CLAMP_TO_EDGE : _wrapS;
	this.m_wrapT = (undefined === _wrapT) ? c.WebGL.CLAMP_TO_EDGE : _wrapT;

	this.m_textureHandle = undefined;

	return;
}
c["Texture"] = c.Texture;

/**
 * @param {!c.WebGL} in_webGL
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Uint8Array}	in_data
 * @param {!number=} _internalFormat
 * @param {!number=} _format
 * @param {!number=} _type
 * @param {!boolean=} _flip
 * @param {!number=} _magFilter
 * @param {!number=} _minFilter
 * @param {!number=} _wrapS
 * @param {!number=} _wrapT
 * @return {c.Texture}
 */
c.Texture.Factory = function(
	in_webGL,
	in_width, 
	in_height,
	in_data, 
	_internalFormat,
	_format,
	_type,
	_flip,
	_magFilter,
	_minFilter,
	_wrapS,
	_wrapT
	)
{
	//hack, don"t try to create unsupported tetures
	if ((undefined != in_webGL) &&
		(_internalFormat == c.WebGL.DEPTH_COMPONENT) &&
		(!in_webGL.SupportsExtention("WEBGL_depth_texture"))) {
		c.Log(LOG_WEBGL, "c.Texture.FactoryRaw request for depth texture", true);
		return null;
	}

	var texture = new c.Texture(
		in_width, 
		in_height,
		in_data, 
		_internalFormat,
		_format,
		_type,
		_flip,
		_magFilter,
		_minFilter,
		_wrapS,
		_wrapT
		);
	texture.Init(in_webGL);
	return texture;
}
c.Texture["Factory"] = c.Texture.Factory;

c.Texture.prototype.Init = function(in_webGL) {
	this.m_textureHandle = in_webGL.CreateTexture(
		this.m_width,
		this.m_height,
		this.m_data,
		this.m_internalFormat,
		this.m_format,
		this.m_type,
		this.m_flip,
		this.m_magFilter,
		this.m_minFilter,
		this.m_wrapS,
		this.m_wrapT
		);
	return;
}

/**
 * @param {!c.WebGL} in_webGL
 * @param {!number} in_index
 * @return {undefined}
 */
c.Texture.prototype.Activate = function(in_webGL, in_index) {
	//console.info("ApplyTexture index: " + in_index);

	in_webGL.ActivateTexture(this.m_textureHandle, in_index);
}

/**
 * @return {undefined}
 */
c.Texture.prototype.OnContextLost = function() {
	this.m_textureHandle = undefined;
}

/**
 * @param {!c.WebGL} in_webGL
 * @return {undefined}
 */
c.Texture.prototype.OnContextRestored = function(in_webGL) {
	this.Init(in_webGL);
}
