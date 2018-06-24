function NodeGraph()
{
	if (!(this instanceof NodeGraph))
		alert("NodeGraph: call constuctor with new keyword");

	// ////////////////////////////////////////////////////
	// private members
	var that = this;
	var m_nodeMap = {};

	// ////////////////////////////////////////////////////
	// public methods with private access
	this.GetNode = function(in_nodeName)
	{
		var node = m_nodeMap[in_nodeName];
		return node;
	};

	this.GetValue = function(in_nodeName)
	{
		var node = that.GetNode(in_nodeName);
		if (node)
		{
			return node.GetValue(this);
		}
		return undefined;
	};

	this.SetValueData = function(in_nodeName, in_valueData)
	{
		var node = that.GetNode(in_nodeName);
		if (node)
		{
			node.SetValueData(in_valueData, that);

			if (undefined == in_valueData)
			{
				alert("undefined SetValueData for node:" + in_nodeName);
			}
		}
	};

	// supports replace
	this.CreateNode = function(in_nodeName, in_valueOpperation, in_valueData)
	{
		that.DeleteNode(in_nodeName);
		var newNode = new Node(in_valueOpperation, in_valueData);
		m_nodeMap[in_nodeName] = newNode;
	};

	this.DeleteNode = function(in_nodeName)
	{
		var node = that.GetNode(in_nodeName);
		if (node)
		{
			node.UnlinkFromGraph(in_nodeName, that);
			delete m_nodeMap[in_nodeName];
		}
	};

	this.ConnectNode = function(
		in_nodeNameInputName,
		in_nodeNameOutputName,
		in_factor)
	{
		var nodeInput = that.GetNode(in_nodeNameInputName);
		var nodeOutput = that.GetNode(in_nodeNameOutputName);

		if (nodeInput)
		{
			nodeInput.RemoveOutput(in_nodeNameOutputName);
			nodeInput.AddOutput(in_nodeNameOutputName);
		}
		else
		{
			alert("ConnectNode input not found:" + in_nodeNameInputName);
		}
		if (nodeOutput)
		{
			nodeOutput.RemoveInput(in_nodeNameInputName, that);
			nodeOutput.AddInput(in_nodeNameInputName, in_factor, that);
		}
		else
		{
			alert("ConnectNode output not found:" + in_nodeNameOutputName);
		}
	};
}

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:NodeGraph";
		return "Pass:NodeGraph";
	};

	g_arrayUnitTest.push(out_object);
}