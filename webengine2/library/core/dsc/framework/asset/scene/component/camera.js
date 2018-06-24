/*
	component for node of the asset scene
	interface component (see node)
		SetParentNode(in_parentNode)
		PassFilter(in_filter)

		VisitCamera(in_context)

	interface camera
		GetMatrixProjection(_result), 
		GetMatrixView(_result)
		GetScreen(_result, in_viewportWidth, in_viewportHeight)

*/
DSC.Framework.Asset.Scene.Component.Camera = function(
	in_projectionMatrix,
	in_viewMatrixDng,//invert of the container node's world transform
	in_posDng,
	in_atDng,
	in_atNormalDng,
	in_unitRadiusFustrumDng,
	in_fustrumRadiusDepthScaleDng,
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.Camera) )
		alert("DSC.Framework.Asset.Scene.Component.Camera: call constuctor with new keyword");

	this.m_projectionMatrix = in_projectionMatrix;
	this.m_viewMatrixDng = in_viewMatrixDng;
	this.m_posDng = in_posDng;
	this.m_atDng = in_atDng;
	this.m_atNormalDng = in_atNormalDng;
	this.m_unitRadiusFustrumDng = in_unitRadiusFustrumDng;
	this.m_fustrumRadiusDepthScaleDng = in_fustrumRadiusDepthScaleDng;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_active = true;

	return;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.SetParentNode = function(_parentNode)
{
	this.m_worldTransformDng = (undefined == _parentNode) ? undefined : _parentNode.GetWorldTransformDng();
	DSC.DNG.Container.LinkNodes(this.m_viewMatrixDng, this.m_worldTransformDng, 0);
	DSC.DNG.Container.LinkNodes(this.m_posDng, this.m_worldTransformDng, 0);
	DSC.DNG.Container.LinkNodes(this.m_atDng, this.m_worldTransformDng, 0);
	return;	
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetMatrixProjection = function()
{
	return this.m_projectionMatrix.GetValue();
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetMatrixViewDNG = function()
{
	return this.m_viewMatrixDng;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetMatrixView = function()
{
	return this.m_viewMatrixDng.GetValue();
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetProjection = function(_result)
{
	if (undefined == _result)
		_result = DSC.Math.Vector4.FactoryRaw();
	DSC.Math.Vector4.SetRaw(
		_result,
		this.m_projectionMatrix.GetNearDNG().GetValue(),
		this.m_projectionMatrix.GetFarDNG().GetValue(),
		this.m_projectionMatrix.GetRightDNG().GetValue(),
		this.m_projectionMatrix.GetTopDNG().GetValue()
		);
	return _result;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetMatrixWorldTransform = function()
{
	return this.m_worldTransformDng.GetValue();
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetNearDng = function()
{
	return this.m_projectionMatrix.GetNearDNG();
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetFarDng = function()
{
	return this.m_projectionMatrix.GetFarDNG();
}

//DSC.Framework.Asset.Scene.Component.Camera.prototype.GetTopDng = function()
//{
//	return this.m_projectionMatrix.GetTopDNG();
//}
//
//DSC.Framework.Asset.Scene.Component.Camera.prototype.GetRightDng = function()
//{
//	return this.m_projectionMatrix.GetRightDNG();
//}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetPosDng = function()
{
	return this.m_posDng;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetAtDng = function()
{
	return this.m_atNormalDng;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetUnitRadiusFustrumDng = function()
{
	return this.m_unitRadiusFustrumDng;
}

DSC.Framework.Asset.Scene.Component.Camera.prototype.GetFustrumRadiusDepthScaleDng = function()
{
	return this.m_fustrumRadiusDepthScaleDng;
}

DSC.Framework.Asset.Scene.Component.Camera.FactoryPerspective = function(
	_near,
	_far,
	_top,
	_right,
	_mapFilter
	)
{
	var projectionMatrix = DSC.DNG.Pool.MatrixPerspective.Factory(
		_near,
		_far,
		_top,
		_right
		);
	var viewMatrixDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.Matrix4Invert, undefined, "viewMatrixDng");
	var posDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4Pos, undefined, "camera posDng");
	var atDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4At);
	var atNormalDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.NormaliseVector3);
	DSC.DNG.Container.LinkNodes(atNormalDng, atDng, 0);
	var unitRadiusFustrumDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.FustrumUnitRadius);
	DSC.DNG.Container.LinkNodes(unitRadiusFustrumDng, projectionMatrix.GetTopDNG(), 0);
	DSC.DNG.Container.LinkNodes(unitRadiusFustrumDng, projectionMatrix.GetRightDNG(), 1);
	DSC.DNG.Container.LinkNodes(unitRadiusFustrumDng, projectionMatrix.GetNearDNG(), 2);

	return DSC.Framework.Asset.Scene.Component.Camera.FactoryRaw(
		projectionMatrix,
		viewMatrixDng,
		posDng,
		atDng,
		atNormalDng,
		unitRadiusFustrumDng,
		DSC.DNG.Node.s_true,
		_mapFilter
		);
}

DSC.Framework.Asset.Scene.Component.Camera.FactoryRaw = function(
	in_projectionMatrix,
	in_viewMatrixDng,//invert of the container node's world transform
	in_posDng,
	in_atDng,
	in_atNormalDng,
	in_unitRadiusFustrumDng,
	in_fustrumRadiusDepthScaleDng,
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.Component.Camera(
		in_projectionMatrix,
		in_viewMatrixDng,//invert of the container node's world transform
		in_posDng,
		in_atDng,
		in_atNormalDng,
		in_unitRadiusFustrumDng,
		in_fustrumRadiusDepthScaleDng,
		_mapFilter
		);
}
