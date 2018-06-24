/*
	component for node of the asset scene
	interface component
		IsActive() //return true, false ~visible, generating sound, emitting light
		PassFilter(in_filter)
		SetParentNode(_parentNode)
		GetWorldTransformMatrix()
		GetRadiusDng()
		GetPosDng()
				
		VisitRender(in_context)

*/
DSC.Framework.Asset.Scene.Component.Renderable = function(
	in_material, 
	in_model, 
	in_radiusDng, 
	_active, 
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.Renderable) )
		alert("DSC.Framework.Asset.Scene.Component.Renderable: call constuctor with new keyword");
	this.m_active = (undefined == _active) ? true : _active;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_worldTransformDng;
	this.m_radiusDng = in_radiusDng;
	this.m_material = in_material;
	this.m_model = in_model;
	this.m_posDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4Pos, "Renderable posDng");
	return;
}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.VisitRender = function(in_context)
{
	in_context.SetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixModel, this.m_worldTransformDng.GetValue());
	in_context.ApplyMaterial(this.m_material);
	in_context.DrawModel(this.m_model);
	return true;
}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.SetParentNode = function(_parentNode)
{
	this.m_worldTransformDng = (undefined == _parentNode) ? undefined : _parentNode.GetWorldTransformDng();
	DSC.DNG.Container.LinkNodes(this.m_posDng, this.m_worldTransformDng, 0);
	return;
}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

//DSC.Framework.Asset.Scene.Component.Renderable.prototype.GetMatrixWorldTransform = function()
//{
//	return this.m_worldTransformDng.GetValue();
//}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.GetRadiusDng = function()
{
	return this.m_radiusDng;
}

DSC.Framework.Asset.Scene.Component.Renderable.prototype.GetPosDng = function()
{
	return this.m_posDng;
}

DSC.Framework.Asset.Scene.Component.Renderable.Factory = function(
	in_material, 
	in_model, 
	in_radiusDng, 
	_active, 
	_filter
	)
{
	return DSC.Framework.Asset.Scene.Component.Renderable.FactoryRaw(
		in_material, 
		in_model, 
		in_radiusDng, 
		_active, 
		_filter	
		);
}


DSC.Framework.Asset.Scene.Component.Renderable.FactoryRaw = function(
	in_material, 
	in_model, 
	in_radiusDng, 
	_active, 
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.Component.Renderable(
		in_material, 
		in_model, 
		in_radiusDng, 
		_active, 
		_mapFilter
		);
}
