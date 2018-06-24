/*
in_drawable.Draw(in_context);
*/

DSC.Framework.Asset.RenderPass = function(
	in_drawable,
	_renderTarget,
	_clearColour,
	_clearDepth //nb 1.0 is far, 0.0 is near
	)
{
	if ( !(this instanceof DSC.Framework.Asset.RenderPass) )
		alert("DSC.Framework.Asset.RenderPass: call constructor with new keyword");

	if (undefined == in_drawable)
		alert("DSC.Framework.Asset.RenderPass: undefined param in_drawable");

	this.m_drawable = in_drawable;
	this.m_renderTarget = _renderTarget;
	this.m_clearColour = _clearColour;
	this.m_clearDepth = _clearDepth;

	return;
}

DSC.Framework.Asset.RenderPass.prototype.Apply = function(in_context)
{
	in_context.ApplyRenderTarget(this.m_renderTarget);
	if (undefined != this.m_renderTarget)
	{
		in_context.SetViewport(0, 0, this.m_renderTarget.m_width, this.m_renderTarget.m_height);
	}

	if (this.m_clearColour || this.m_clearDepth)
		in_context.Clear(this.m_clearColour, this.m_clearDepth);

	if (undefined != this.m_drawable)
	{
		this.m_drawable.Draw(in_context);
	}

	return;
}

DSC.Framework.Asset.RenderPass.FactoryRaw = function(
	in_drawable,
	_renderTarget,
	_clearColour,
	_clearDepth //nb 1.0 is far, 0.0 is near
	)
{
	return new DSC.Framework.Asset.RenderPass(
		in_drawable,
		_renderTarget,
		_clearColour,
		_clearDepth //nb 1.0 is far, 0.0 is near
		);
}
