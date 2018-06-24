/*
(Ma matrix last frame, Mb matrix this frame, Md matrix delta, Mai invert matrix last frame)
Ma x Md = Mb
Md = Mb x Mai

	interface component
		IsActive() //return true, false ~visible, generating sound, emitting light
		PassFilter(in_filter)
		SetParentNode(_parentNode)
		GetWorldTransformMatrix()
		GetRadiusDng()
		GetPosDng()
				
		VisitUpdate(in_timeDelta, in_context)

*/
DSC.Framework.Asset.Scene.Component.Cloth = function(
	in_clothResources,
	in_clothMaterial, // first texture slot will be assigned as the cloth pos tex
	in_clothModel,
	in_clothParamDng, //springk, dampen, vertlet mass
	in_gravityDng,
	in_radiusDng, 
	_active, 
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.Cloth) )
		alert("DSC.Framework.Asset.Scene.Component.Cloth: call constuctor with new keyword");
	this.m_clothResources = in_clothResources;
	this.m_clothMaterial = in_clothMaterial;
	this.m_clothModel = in_clothModel;
	this.m_clothParamDng = in_clothParamDng;
	this.m_gravityDng = in_gravityDng;
	this.m_radiusDng = in_radiusDng;
	this.m_active = (undefined == _active) ? true : _active;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_worldTransformDng;
	this.m_lastFrameWorldTransformInvertDng = DSC.DNG.Node.FactoryRaw(DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity));
	this.m_posDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4Pos, "Cloth posDng");
	this.m_worldInvertTransformDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.Matrix4Invert, undefined, "world invert");
	this.m_transformDeltaDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4, undefined, "cloth delta transform");
	DSC.DNG.Container.LinkNodes(this.m_transformDeltaDng, this.m_lastFrameWorldTransformInvertDng, 1);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.VisitUpdate = function(in_timeDelta, in_context)
{
	this.m_clothResources.Update(
		in_timeDelta, 
		in_context, 
		this.m_clothModel,	
		this.m_worldTransformDng, 
		this.m_worldInvertTransformDng, 
		this.m_transformDeltaDng, // change from last world transform to this one
		this.m_clothParamDng, 
		this.m_gravityDng
		);
	this.m_clothMaterial.m_textureArray[0] = this.m_clothResources.GetPosBTexture();

	this.m_lastFrameWorldTransformInvertDng.SetValue(DSC.Math.Matrix4.Clone(
		this.m_lastFrameWorldTransformInvertDng.GetValue(),
		this.m_worldInvertTransformDng.GetValue()
		));
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.SetParentNode = function(_parentNode)
{
	this.m_worldTransformDng = (undefined == _parentNode) ? undefined : _parentNode.GetWorldTransformDng();
	DSC.DNG.Container.LinkNodes(this.m_posDng, this.m_worldTransformDng, 0);
	DSC.DNG.Container.LinkNodes(this.m_worldInvertTransformDng, this.m_worldTransformDng, 0);
	DSC.DNG.Container.LinkNodes(this.m_transformDeltaDng, this.m_worldTransformDng, 0);

	this.m_lastFrameWorldTransformInvertDng.SetValue(DSC.Math.Matrix4.Clone(
		this.m_lastFrameWorldTransformInvertDng.GetValue(),
		this.m_worldInvertTransformDng.GetValue()
		));

	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.GetRadiusDng = function()
{
	return this.m_radiusDng;
}

DSC.Framework.Asset.Scene.Component.Cloth.prototype.GetPosDng = function()
{
	return this.m_posDng;
}

DSC.Framework.Asset.Scene.Component.Cloth.FactoryRaw = function(
	in_clothResources,
	in_clothMaterial, // first texture slot will be assigned as the cloth pos tex
	in_clothModel,
	in_clothParamDng, //springk, dampen, vertlet mass
	in_gravityDng,
	in_radiusDng, 
	_active, 
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.Component.Cloth(
		in_clothResources,
		in_clothMaterial, // first texture slot will be assigned as the cloth pos tex
		in_clothModel,
		in_clothParamDng, //springk, dampen, vertlet mass
		in_gravityDng,
		in_radiusDng, 
		_active, 
		_mapFilter
		);
}
