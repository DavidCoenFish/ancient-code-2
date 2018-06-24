/*
	so, should i inherit a node to get direction from parent, but
	i have an inf radius of influence (global)
*/
DSC.Framework.Asset.Scene.GlobalComponent.LightDirect = function(
	in_directionDng,
	in_colourDng,
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.GlobalComponent.LightDirect) )
		alert("DSC.Framework.Asset.Scene.GlobalComponent.LightDirect: call constuctor with new keyword");

	this.m_directionDng = in_directionDng;
	this.m_colourDng = in_colourDng;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_active = true;

	return;
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.GetLightType = function()
{
	return "Direct";
}

//used skybox
DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.GetDirectionDNG = function()
{
	return this.m_directionDng;
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.GetDirection = function()
{
	return this.m_directionDng.GetValue();
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.prototype.GetColour = function()
{
	return this.m_colourDng.GetValue();
}

DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.Factory = function(
	in_direction,
	in_colour,
	_mapFilter
	)
{
	var directionDng = DSC.DNG.Node.FactoryRaw(in_direction);
	var colourDng = DSC.DNG.Node.FactoryRaw(in_colour);
	return DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.FactoryRaw(
		directionDng,
		colourDng,
		_mapFilter
		);
}
	
DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.FactoryRaw = function(
	in_directionDng,
	in_colourDng,
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.GlobalComponent.LightDirect(
		in_directionDng,
		in_colourDng,
		_mapFilter
		);
}
