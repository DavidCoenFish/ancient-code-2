/*
*/
DSC.Framework.Asset.Scene.Component.LightPoint = function(
	in_colourDng,
	in_radiusDng,
	in_posDng,
	in_falloffDng,
	_active,
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.LightPoint) )
		alert("DSC.Framework.Asset.Scene.Component.LightPoint: call constuctor with new keyword");
	this.m_active = (undefined == _active) ? true : _active;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_worldTransformDng;
	this.m_colourDng = in_colourDng;
	this.m_radiusDng = in_radiusDng;
	this.m_posDng = in_posDng;
	this.m_falloffDng = in_falloffDng;
	return;
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.SetParentNode = function(_parentNode)
{
	this.m_worldTransformDng = (undefined == _parentNode) ? undefined : _parentNode.GetWorldTransformDng();
	DSC.DNG.Container.LinkNodes(this.m_posDng, this.m_worldTransformDng, 0);
	return;	
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.GetRadiusDng = function()
{
	return this.m_radiusDng;
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.GetPosDng = function()
{
	return this.m_posDng;
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.GetLightType = function()
{
	return "Point";
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.GetColourDng = function()
{
	return this.m_colourDng;
}

DSC.Framework.Asset.Scene.Component.LightPoint.prototype.GetFalloffDng = function()
{
	return this.m_falloffDng;
}

DSC.Framework.Asset.Scene.Component.LightPoint.Factory = function(
	in_colour,
	in_radius,
	in_falloff,
	_mapFilter
	)
{
	var colourDng = DSC.DNG.Node.FactoryRaw(in_colour);
	var radiusDng = DSC.DNG.Node.FactoryRaw(in_radius);
	var falloffDng = DSC.DNG.Node.FactoryRaw(in_falloff);
	var posDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4Pos, "Light Point posDng");
	return DSC.Framework.Asset.Scene.Component.LightPoint.FactoryRaw(
		colourDng,
		radiusDng,
		posDng,
		falloffDng,
		true,
		_mapFilter
		);
}

DSC.Framework.Asset.Scene.Component.LightPoint.FactoryRaw = function(
	in_colourDng,
	in_radiusDng,
	in_posDng,
	in_falloffDng,
	_active,
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.Component.LightPoint(
		in_colourDng,
		in_radiusDng,
		in_posDng,
		in_falloffDng,
		_active,
		_mapFilter
		);
}
