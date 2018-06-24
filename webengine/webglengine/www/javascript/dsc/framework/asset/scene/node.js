/*
	this.m_worldTransformDng
	interface
		SetParentTransformDng
		GetLocalTransformDng
		GetWorldTransformDng
*/
DSC.Framework.Asset.Scene.Node = function(in_localTransform, in_worldTransformDng, _name, _componentArray, _childNodeArray)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Node) )
		alert("DSC.Framework.Asset.Scene.Node: call constuctor with new keyword");

	this.m_localTransform = in_localTransform;
	this.m_worldTransformDng = in_worldTransformDng;
	this.m_name = _name;
	this.m_componentArray = (undefined != _componentArray) ? _componentArray : [];
	this.m_childNodeArray = (undefined != _childNodeArray) ? _childNodeArray : [];

	return;
}

DSC.Framework.Asset.Scene.Node.prototype.SetParentTransformDng = function(_parentTransformDng)
{
	var parentTransformDng = (undefined == _parentTransformDng) ? DSC.DNG.Node.FactoryRaw(DSC.Math.Matrix4.s_identity) : _parentTransformDng;
	DSC.DNG.Container.LinkNodes(this.m_worldTransformDng, parentTransformDng, 1);
	return;
}

DSC.Framework.Asset.Scene.Node.prototype.GetLocalTransformDng = function()
{
	return this.m_localTransform.m_matrix;
}

DSC.Framework.Asset.Scene.Node.prototype.GetWorldTransformDng = function()
{
	return this.m_worldTransformDng;
}

DSC.Framework.Asset.Scene.Node.prototype.AddChildNode = function(in_child)
{
	if (undefined == in_child)
		return;
	in_child.SetParentTransformDng(this.m_worldTransformDng);
	this.m_childNodeArray.push(in_child);
	return;
}

DSC.Framework.Asset.Scene.Node.prototype.RemoveChildNode = function(in_child)
{
	if (undefined == in_child)
		return;
	in_child.SetParentTransformDng(undefined);
	var index = this.m_childNodeArray.indexOf(in_child);
	if (-1 == index)
		return;
	this.m_childNodeArray.splice(index, 1);
	return;
}

DSC.Framework.Asset.Scene.Node.prototype.AddComponent = function(in_component)
{
	if (undefined == in_component)
		return;
	this.m_componentArray.push(in_component);
	in_component.SetParentNode(this);
	return;
}

DSC.Framework.Asset.Scene.Node.prototype.RemoveComponent = function(in_component)
{
	if (undefined == in_component)
		return;
	in_component.SetParentNode(undefined);
	var index = this.m_componentArray.indexOf(in_component);
	if (-1 == index)
		return;
	this.m_componentArray.splice(index, 1);
	return;
}

DSC.Framework.Asset.Scene.Node.prototype.GetComponent = function(in_filter)
{
	for (var index = 0; index < this.m_componentArray.length; ++index)
	{
		var data = this.m_componentArray[index];
		if (true == data.PassFilter(in_filter))
		{
			return data;
		}
	};

	return undefined;
}

DSC.Framework.Asset.Scene.Node.prototype.VisitAll = function(in_visitor)
{
	if (true != in_visitor.VisitNode(this))
		return false;

	for (var index = 0; index < this.m_childNodeArray.length; ++index)
	{
		var child = this.m_childNodeArray[index];
		if (true != child.VisitAll(in_visitor))
			return false;
	}
	
	return true;
}

DSC.Framework.Asset.Scene.Node.Factory = function(_parentTransformDng, _localTransform, _name, _componentArray, _childNodeArray)
{
	var parentTransformDng = (undefined == _parentTransformDng) ? DSC.DNG.Node.FactoryRaw(DSC.Math.Matrix4.s_identity, undefined, undefined, "default node parent") : _parentTransformDng;
	var localTransform = (undefined == _localTransform) ? DSC.DNG.Pool.MatrixPos.Factory() : _localTransform;
	var worldTransformDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4, undefined, "node world transform");
	DSC.DNG.Container.LinkNodes(worldTransformDng, localTransform.m_matrix, 0);
	DSC.DNG.Container.LinkNodes(worldTransformDng, parentTransformDng, 1);

	return DSC.Framework.Asset.Scene.Node.FactoryRaw(
		localTransform, 
		worldTransformDng, 
		_name, 
		_componentArray, 
		_childNodeArray
		);
}

DSC.Framework.Asset.Scene.Node.FactoryRaw = function(in_localTransform, in_worldTransformDng, _name, _componentArray, _childNodeArray)
{
	return new DSC.Framework.Asset.Scene.Node(in_localTransform, in_worldTransformDng, _name, _componentArray, _childNodeArray);
}
