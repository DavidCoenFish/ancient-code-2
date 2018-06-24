/*
	VisitObserver()
*/
DSC.Framework.Asset.Scene.Observer_Render = function(
	in_cameraComponent
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Observer_Render) )
		alert("DSC.Framework.Asset.Scene.Observer_Render: call constuctor with new keyword");

	this.m_cameraComponent = in_cameraComponent;

	return;
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.VisitObserver = function(in_context)
{
	//update the uniforms
	in_context.ApplyCamera(this.m_cameraComponent);
	return true;
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.VisitGlobalComponent = function(in_context, in_globalComponent)
{
	in_globalComponent.VisitGlobalComponent(in_context);
	return true;
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.VisitComponent = function(in_context, in_component)
{
	in_component.VisitRender(in_context);
	return true;
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetNearDng = function()
{
	return this.m_cameraComponent.GetNearDng();
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetFarDng = function()
{
	return this.m_cameraComponent.GetFarDng();
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetPosDng = function()
{
	return this.m_cameraComponent.GetPosDng();
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetAtDng = function()
{
	return this.m_cameraComponent.GetAtDng();
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetUnitRadiusFustrumDng = function()
{
	return this.m_cameraComponent.GetUnitRadiusFustrumDng();
}

DSC.Framework.Asset.Scene.Observer_Render.prototype.GetFustrumRadiusDepthScaleDng = function()
{
	return this.m_cameraComponent.GetFustrumRadiusDepthScaleDng();
}

DSC.Framework.Asset.Scene.Observer_Render.FactoryRaw = function(
	in_cameraComponent
	)
{
	return new DSC.Framework.Asset.Scene.Observer_Render(
		in_cameraComponent
		);
}
