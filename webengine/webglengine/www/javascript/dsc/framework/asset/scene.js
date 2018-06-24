DSC.Framework.Asset.Scene = function(_rootNode, _arrayGlobalComponents, _mapDisplayList)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene) )
		alert("DSC.Framework.Asset.Scene: call constuctor with new keyword");

	this.m_rootNode = (undefined == _rootNode) ? DSC.Framework.Asset.Scene.Node.Factory() : _rootNode;
	this.m_arrayGlobalComponents = (undefined == _arrayGlobalComponents) ? [] : _arrayGlobalComponents;
	this.m_mapDisplayList = (undefined == _mapDisplayList) ? {} : _mapDisplayList;

	return;
}

/*
use for render pases (opace, transparent), sound, gather lights, collect items to tick
*/
DSC.Framework.Asset.Scene.prototype.VisitDisplayList = function(_data, in_name)
{
	if (in_name in this.m_mapDisplayList)
	{
		var displayList = this.m_mapDisplayList[in_name];
		displayList.Visit(_data, in_name);
	}
	return;
}

/*
visitor interface
	// return true to continue visiting
	VisitNode(in_node)
*/
DSC.Framework.Asset.Scene.prototype.VisitAllNodes = function(in_visitor)
{
	this.m_rootNode.VisitAll(in_visitor);
}

//add esisiting nodes to the display list 
DSC.Framework.Asset.Scene.prototype.AddDisplayList = function(in_name, in_displayList)
{
	this.m_mapDisplayList[in_name] = in_displayList;

	this.m_arrayGlobalComponents.forEach( function(item)
	{
		in_displayList.AddGlobalComponent(item);
	});

	var visitor = 
	{
		"VisitNode" : function(in_node)
		{
			in_displayList.AddNode(in_node);
			return true;
		}
	};
	this.VisitAllNodes(visitor);
	return;
}

DSC.Framework.Asset.Scene.prototype.AddGlobalComponent = function(in_globalComponent)
{
	this.m_arrayGlobalComponents.push(in_globalComponent);

	//tell each displayList that there is a new node
	for (var key in this.m_mapDisplayList)
	{
		var displayList = this.m_mapDisplayList[key];
		displayList.AddGlobalComponent(in_globalComponent);
	}

	return;
}

DSC.Framework.Asset.Scene.prototype.RemoveGlobalComponent = function(in_globalComponent)
{
	var index = this.m_arrayGlobalComponent.indexOf(in_globalComponent);
	if (-1 == index)
		return;
	this.m_arrayGlobalComponent.splice(index, 1);

	for (var key in this.m_mapDisplayList)
	{
		var displayList = this.m_mapDisplayList[key];
		displayList.RemoveGlobalComponent(in_globalComponent);
	}

	return;
}

DSC.Framework.Asset.Scene.prototype.AddNode = function(_parent, in_node)
{
	var parent = (undefined == _parent) ? this.m_rootNode : _parent;
	parent.AddChildNode(in_node);

	//tell each displayList that there is a new node
	for (var key in this.m_mapDisplayList)
	{
		var displayList = this.m_mapDisplayList[key];
		displayList.AddNode(in_node);
	}

	return;
}

DSC.Framework.Asset.Scene.prototype.RemoveNode = function(_parent, in_node)
{
	var parent = (undefined == _parent) ? this.m_rootNode : _parent;
	parent.RemoveChildNode(in_node);

	//tell each displayList that a node has been deleted
	for (var key in this.m_mapDisplayList)
	{
		var displayList = this.m_mapDisplayList[key];
		displayList.RemoveNode(in_node);
	}

	return;
}

DSC.Framework.Asset.Scene.FindNodeByName = function(in_scene, in_name)
{
	var visitorName = {
		"m_result" : undefined, 
		"VisitNode" : function(in_node)
		{
			if (in_name == in_node.m_name)
			{
				this.m_result = in_node;
				return false;
			}
			return true;
		}
	};
	in_scene.VisitAllNodes(visitorName);
	return visitorName.m_result;
}

DSC.Framework.Asset.Scene.FindGlobalComponentByName = function(in_scene, in_filter)
{
	for (var index = 0; index < in_scene.m_arrayGlobalComponents.length; ++index)
	{
		var data = in_scene.m_arrayGlobalComponents[index];
		if (true == data.PassFilter(in_filter))
		{
			return data;
		}
	};

	return undefined;
}

DSC.Framework.Asset.Scene.FactoryRaw = function(_rootNode, _arrayGlobalComponents, _mapDisplayList)
{
	return new DSC.Framework.Asset.Scene(_rootNode, _arrayGlobalComponents, _mapDisplayList);
}
