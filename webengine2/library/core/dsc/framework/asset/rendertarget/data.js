DSC.Framework.Asset.RenderTarget.Data = function(
	in_texture,
	_target,
	_attachment,
	_texTarget,
	_level
	)
{
	if ( !(this instanceof DSC.Framework.Asset.RenderTarget.Data) )
		alert("DSC.Framework.Asset.RenderTarget.Data: call constuctor with new keyword");

	this.m_texture = in_texture;
	this.m_target = (undefined == _target) ? DSC.Framework.Context.WebGL.FRAMEBUFFER : _target;
	this.m_attachment = (undefined == _attachment) ? DSC.Framework.Context.WebGL.COLOR_ATTACHMENT0 : _attachment;
	this.m_texTarget = (undefined == _texTarget) ? DSC.Framework.Context.WebGL.TEXTURE_2D : _texTarget;
	this.m_level = (undefined == _level) ? 0 : _level;
	
	return;
}

DSC.Framework.Asset.RenderTarget.Data.prototype.Init = function(in_webGL)
{
	if (undefined == this.m_texture)
		return;
	in_webGL.framebufferTexture2D(
		this.m_target,
		this.m_attachment,
		this.m_texTarget,
		this.m_texture.m_textureHandle,
		this.m_level
		);
	return;
}

DSC.Framework.Asset.RenderTarget.Data.FactoryRaw = function(
	in_texture,
	_target,
	_attachment,
	_texTarget,
	_level
	)
{
	return new DSC.Framework.Asset.RenderTarget.Data(
		in_texture,
		_target,
		_attachment,
		_texTarget,
		_level
		);
}
