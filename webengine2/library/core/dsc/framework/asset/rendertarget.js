/*
*/

DSC.Framework.Asset.RenderTarget = function(
	in_context,
	_mapData,
	in_width,
	in_height
	)
{
	if ( !(this instanceof DSC.Framework.Asset.RenderTarget) )
		alert("DSC.Framework.Asset.RenderTarget: call constuctor with new keyword");

	this.m_mapData = (undefined == _mapData) ? {} : _mapData;
	//this.m_target = (undefined == _target) ? DSC.Framework.Context.WebGL.FRAMEBUFFER : _target;
	this.m_width = in_width;
	this.m_height = in_height;

	this.m_handle = undefined;

	in_context.InitRenderTarget(this);
	
	return;
}

DSC.Framework.Asset.RenderTarget.prototype.Init = function(in_webGL)
{
	var webGL = in_webGL.m_webGL;
	this.m_handle = webGL.createFramebuffer();
	webGL.bindFramebuffer(DSC.Framework.Context.WebGL.FRAMEBUFFER, this.m_handle);

	for (var key in this.m_mapData)
	{
		var data = this.m_mapData[key];
		data.Init(webGL);
	}

	var valid = webGL.checkFramebufferStatus(DSC.Framework.Context.WebGL.FRAMEBUFFER) == webGL.FRAMEBUFFER_COMPLETE;
	if (!valid)
		alert("Could not create FBO");

	webGL.bindFramebuffer(DSC.Framework.Context.WebGL.FRAMEBUFFER, null);
}

DSC.Framework.Asset.RenderTarget.Apply = function(in_webGL, _renderTarget)
{
	var handle = null;
	if (_renderTarget)
		handle = _renderTarget.m_handle;
	var webGL = in_webGL.m_webGL;
	webGL.bindFramebuffer(DSC.Framework.Context.WebGL.FRAMEBUFFER, handle);
	return;
}

DSC.Framework.Asset.RenderTarget.prototype.OnContextLost = function()
{
	this.m_handle = undefined;
}

DSC.Framework.Asset.RenderTarget.prototype.OnContextRestored = function(in_context)
{
	in_context.InitRenderTarget(this);
}

DSC.Framework.Asset.RenderTarget.FactoryRaw = function(
	in_context,
	_mapData,
	in_width,
	in_height
	)
{
	return new DSC.Framework.Asset.RenderTarget(
		in_context,
		_mapData,
		in_width,
		in_height
		);
}
