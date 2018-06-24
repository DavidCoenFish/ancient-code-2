//manual texture?
DSC.Framework.Asset.Texture = function(
	in_context,
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
	if ( !(this instanceof DSC.Framework.Asset.Texture) )
		alert("DSC.Framework.Asset.Texture: call constuctor with new keyword");

	this.m_width = in_width;
	this.m_height = in_height;
	this.m_data = in_data;
	this.m_internalFormat = (undefined == _internalFormat) ? DSC.Framework.Context.WebGL.RGBA : _internalFormat;
	this.m_format = (undefined == _format) ? DSC.Framework.Context.WebGL.RGBA : _format;
	this.m_type = (undefined == _type) ? DSC.Framework.Context.WebGL.UNSIGNED_BYTE : _type;
	this.m_flip = _flip;

	this.m_magFilter = (undefined == _magFilter) ? DSC.Framework.Context.WebGL.LINEAR : _magFilter;
	this.m_minFilter = (undefined == _minFilter) ? DSC.Framework.Context.WebGL.LINEAR : _minFilter;
	this.m_wrapS = (undefined == _wrapS) ? DSC.Framework.Context.WebGL.CLAMP_TO_EDGE : _wrapS;
	this.m_wrapT = (undefined == _wrapT) ? DSC.Framework.Context.WebGL.CLAMP_TO_EDGE : _wrapT;

	this.m_textureHandle = undefined;

	in_context.InitTexture(this);

	return;
}

DSC.Framework.Asset.Texture.prototype.Init = function(in_webGL)
{
	this.m_textureHandle = in_webGL.m_webGL.createTexture();

	in_webGL.m_webGL.bindTexture(DSC.Framework.Context.WebGL.TEXTURE_2D, this.m_textureHandle);
	if (true == this.m_flip)
	{
		in_webGL.m_webGL.pixelStorei(DSC.Framework.Context.WebGL.UNPACK_FLIP_Y_WEBGL, true);
	}
	in_webGL.m_webGL.texImage2D(
		DSC.Framework.Context.WebGL.TEXTURE_2D,		//GLenum target, 
		0,									//GLint level, 
		this.m_internalFormat,				//GLenum internalformat, 
		this.m_width,						//GLsizei width, 
		this.m_height,						//GLsizei height, 
		0,									//GLint border, 
		this.m_format,						//GLenum format, 
		this.m_type,						//GLenum type, 
		(undefined == this.m_data) ? null : this.m_data //ArrayBufferView? pixels
		);
	in_webGL.m_webGL.texParameteri(DSC.Framework.Context.WebGL.TEXTURE_2D, DSC.Framework.Context.WebGL.TEXTURE_MAG_FILTER, this.m_magFilter);
	in_webGL.m_webGL.texParameteri(DSC.Framework.Context.WebGL.TEXTURE_2D, DSC.Framework.Context.WebGL.TEXTURE_MIN_FILTER, this.m_minFilter);
	in_webGL.m_webGL.texParameteri(DSC.Framework.Context.WebGL.TEXTURE_2D, DSC.Framework.Context.WebGL.TEXTURE_WRAP_S, this.m_wrapS);
	in_webGL.m_webGL.texParameteri(DSC.Framework.Context.WebGL.TEXTURE_2D, DSC.Framework.Context.WebGL.TEXTURE_WRAP_T, this.m_wrapT);
	in_webGL.m_webGL.bindTexture(DSC.Framework.Context.WebGL.TEXTURE_2D, null);

	in_webGL.GetError();

	return;
}

DSC.Framework.Asset.Texture.prototype.Activate = function(in_webGL, in_index)
{
	in_webGL.ActivateTexture(this.m_textureHandle, in_index);
}

DSC.Framework.Asset.Texture.prototype.OnContextLost = function()
{
	this.m_textureHandle = undefined;
}

DSC.Framework.Asset.Texture.prototype.OnContextRestored = function(in_context)
{
	in_context.InitTexture(this);
}

DSC.Framework.Asset.Texture.FactoryRaw = function(
	in_context,
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
	//hack, don't try to create unsupported tetures
	if ((_internalFormat == DSC.Framework.Context.WebGL.DEPTH_COMPONENT) &&
		(!in_context.SupportsExtention("WEBGL_depth_texture")))
	{
		alert("DSC.Framework.Asset.Texture.FactoryRaw request for depth texture");
		return undefined;
	}

	return new DSC.Framework.Asset.Texture(
		in_context,
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
}
