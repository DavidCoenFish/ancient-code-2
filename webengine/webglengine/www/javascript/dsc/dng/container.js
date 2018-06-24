//dngcontainer.js 
/*
	Directional Node Graph Container
*/

DSC.DNG.Container = function()
{
	if ( !(this instanceof DSC.DNG.Container) )
		alert("DNGContainer: call constuctor with new keyword");

	this.m_mapNode = {};
}

//GetNode
DSC.DNG.Container.prototype.GetNode = function(in_name)
{
	if (in_name in this.m_mapNode)
		return this.m_mapNode[in_name];
	return undefined;
}

//AddNode
DSC.DNG.Container.prototype.AddNode = function(in_name, in_node)
{
	if (in_name in this.m_mapNode)
		alert("DSC.DNG.Container.AddNode: multiple nodes of the same name [" + in_name + "]");
		
	this.m_mapNode[in_name] = in_node;
	return;
}

//RemoveNode?
DSC.DNG.Container.prototype.RemoveNode = function(in_name, in_node)
{
	var node = this.GetNode(in_name);
	if (node)
	{
		node.Detach();
		delete this.m_mapNode[in_name];
	}
	return;
}

//GetValue
DSC.DNG.Container.prototype.GetValue = function(in_name)
{
	var node = this.GetNode(in_name);
	if (node)
		return node.GetValue();
	return undefined;
}

//SetValue
DSC.DNG.Container.prototype.SetValue = function(in_name, in_value)
{
	var node = this.GetNode(in_name);
	if (node)
		node.SetValue(in_value);
	return;
}

//allow for overwrite, or clear by setting undefined
DSC.DNG.Container.LinkNodes = function(in_node, in_inputNode, _index)
{
	var oldInput = in_node.GetInput(_index);
	if (oldInput == in_inputNode)
	{
		return;
	}
	if (undefined != oldInput)
	{
		DSC.DNG.Container.UnlinkNodes(in_node, oldInput);
	}
	in_node.SetInput(in_inputNode, _index);
	if (undefined != in_inputNode)
	{
		in_inputNode.AddOutput(in_node);
	}
	in_node.SetDirty();
	return;
}

DSC.DNG.Container.UnlinkNodes = function(in_node, in_inputNode)
{
	in_node.RemoveInput(in_inputNode);
	in_inputNode.RemoveOutput(in_node);
	in_node.SetDirty();
	return;
}

DSC.DNG.Container.FactoryRaw = function()
{
	return new DSC.DNG.Container();
}

