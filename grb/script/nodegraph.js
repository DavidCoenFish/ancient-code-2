//nodegraph.js

function NodeGraph()
{
	//please call function with 'new' keyword, else we will
	//DEBUG if ( !(this instanceof NodeGraph) )
	//DEBUG {
	//DEBUG 	alert("NodeGraph: call constuctor with new keyword");	
	//DEBUG }

	//////////////////////////////////////////////////////
	//private members
    var that = this;	
	var m_nodeMap = {};
	
	//////////////////////////////////////////////////////
	//public methods with private access	
	this.GetNode = function(in_nodeName)
	{
		var node = m_nodeMap[in_nodeName];
		return node;
	}

	this.GetValue = function(in_nodeName)
	{
		var node = that.GetNode(in_nodeName);
		if (node)
		{
			return node.GetValue(this);
		}
		return undefined;
	}

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
	}

	//supports replace
	this.CreateNode = function(in_nodeName, in_valueOpperation, in_valueData)
	{
		that.DeleteNode(in_nodeName);
		var newNode = new Node(in_valueOpperation, in_valueData);
		m_nodeMap[in_nodeName] = newNode;
	}
	
	this.DeleteNode = function(in_nodeName)
	{
		var node = that.GetNode(in_nodeName);
		if (node)
		{
			node.UnlinkFromGraph(in_nodeName, that);
			delete m_nodeMap[in_nodeName];
		}
	}	

	this.ConnectNode = function(in_nodeNameInputName, in_nodeNameOutputName, in_factor)
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
			alert("ConnectNode input not found:" + in_nodeNameOutputName);
		}
	}
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//construction
		if (result)
		{
			var nodeGraph1 = new NodeGraph();
			var nodeGraph2 = new NodeGraph();
			
			nodeGraph1.CreateNode("foo", s_nodeValueOpperation.e_valueData, "bar");
			nodeGraph2.CreateNode("foo", s_nodeValueOpperation.e_valueData, "moo");
			
			result &= ("bar" == nodeGraph1.GetValue("foo"));
			result &= ("moo" == nodeGraph2.GetValue("foo"));
			
			nodeGraph1.DeleteNode("foo");

			result &= (undefined == nodeGraph1.GetValue("foo"));
			
			nodeGraph2.SetValueData("foo", "goo");
			result &= ("goo" == nodeGraph2.GetValue("foo"));	
		}
		
		//add remove input
		if (result)
		{
			var nodeGraph = new NodeGraph();

			nodeGraph.CreateNode("foo", s_nodeValueOpperation.e_inputSumPlusValueData, 5.0);
			
			result &= (5.0 == nodeGraph.GetValue("foo"));
			
			nodeGraph.CreateNode("bar", s_nodeValueOpperation.e_valueData, 10.0);
			nodeGraph.ConnectNode("bar", "foo", 1.0);
			
			result &= (15.0 == nodeGraph.GetValue("foo"));
			
			nodeGraph.ConnectNode("bar", "foo", 0.1);
			result &= (6.0 == nodeGraph.GetValue("foo"));
			
			nodeGraph.SetValueData("bar", 20);
			result &= (7.0 == nodeGraph.GetValue("foo"));

			nodeGraph.DeleteNode("bar");
			
			result &= (5.0 == nodeGraph.GetValue("foo"));			
		}
		
		//add remove output
		if (result)
		{
			var nodeGraph = new NodeGraph();

			nodeGraph.CreateNode("bar", s_nodeValueOpperation.e_valueData, 10.0);

			nodeGraph.CreateNode("foo", s_nodeValueOpperation.e_inputSumPlusValueData, 5.0);			
			result &= (5.0 == nodeGraph.GetValue("foo"));
			
			nodeGraph.ConnectNode("bar", "foo", 1.0);			
			result &= (15.0 == nodeGraph.GetValue("foo"));
			
			nodeGraph.DeleteNode("foo");
			
			result &= (undefined == nodeGraph.GetValue("foo"));			
			result &= (10.0 == nodeGraph.GetValue("bar"));			
			
			nodeGraph.CreateNode("foo", s_nodeValueOpperation.e_inputSumPlusValueData, 5.0);			
			nodeGraph.ConnectNode("bar", "foo", 1.0);			
			result &= (15.0 == nodeGraph.GetValue("foo"));
			
		}
		
		//input sum
		if (result)
		{
			var nodeGraph = new NodeGraph();

			nodeGraph.CreateNode("foo", s_nodeValueOpperation.e_valueData, 10.0);
			nodeGraph.CreateNode("bar", s_nodeValueOpperation.e_valueData, 11.0);
			nodeGraph.CreateNode("moo", s_nodeValueOpperation.e_valueData, 12.0);

			nodeGraph.CreateNode("goo", s_nodeValueOpperation.e_inputSum, 1.0);						
			nodeGraph.ConnectNode("foo", "goo", 1.0);			
			nodeGraph.ConnectNode("bar", "goo", 1.0);			
			nodeGraph.ConnectNode("moo", "goo", 1.0);	
				
			result &= (33.0 == nodeGraph.GetValue("goo"));
			
			nodeGraph.ConnectNode("foo", "goo", 0.5);			
			result &= (28.0 == nodeGraph.GetValue("goo"));			
		}
		
		//input e_inputLogicalAnd
		if (result)
		{
			var nodeGraph = new NodeGraph();

			nodeGraph.CreateNode("foo", s_nodeValueOpperation.e_valueData, true);
			nodeGraph.CreateNode("bar", s_nodeValueOpperation.e_valueData, true);

			nodeGraph.CreateNode("goo", s_nodeValueOpperation.e_inputLogicalAnd);						
			nodeGraph.ConnectNode("foo", "goo");			
			nodeGraph.ConnectNode("bar", "goo");			
				
			result &= (true == nodeGraph.GetValue("goo"));
			
			nodeGraph.SetValueData("foo", false);			
			result &= (false == nodeGraph.GetValue("goo"));
		}
		
		if (true != result)
		{
			return "Fail:NodeGraph";
		}
		return "Pass:NodeGraph";
	}
	
	g_arrayUnitTest.push(out_object);
}

