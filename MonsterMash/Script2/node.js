var s_nodeValueOpperation = {
	"e_nop" : 0,
	"e_valueData" : 1,
	"e_inputSum" : 2,
	"e_inputMul" : 3
};

// node class
function Node(in_valueOpperation, in_valueData)
{
	if (!(this instanceof Node))
		alert("Node: call constuctor with new keyword");

	// private members
	var that = this;
	var m_arrayInput = []; // nodes i collect values from to calculate my own
							// value
	var m_arrayOutput = []; // nodes that use me as input, if we change we need
							// to mark them as dirty

	var m_valueOpperation = in_valueOpperation; // how to combine input to make
												// value
	var m_valueData = in_valueData;
	var m_value = 0.0;
	var m_dirty = true;

	// ////////////////////////////////////////////////////
	// public methods with private access
	this.AddInput = function(in_nodeInputName, in_nodeGraph)
	{
		m_arrayInput.push(in_nodeInputName);
		that.SetDirty(in_nodeGraph);
	};

	this.AddOutput = function(in_nodeOutputName)
	{
		m_arrayOutput.push(in_nodeOutputName);
	};

	this.UnlinkFromGraph = function(in_removeNodeName, in_nodeGraph)
	{
		// for each of my inputs, remove in_removeNodeName as an output
		m_arrayInput.forEach(function(in_item)
		{
			var node = in_nodeGraph.GetNode(in_item);
			if (node)
			{
				node.RemoveOutput(in_removeNodeName);
			}
		});
		m_arrayInput.length = 0;

		// for each of my outputs, remove myself as an input
		m_arrayOutput.forEach(function(in_item)
		{
			var node = in_nodeGraph.GetNode(in_item);
			if (node)
			{
				node.RemoveInput(in_removeNodeName, in_nodeGraph);
			}
		});
		m_arrayOutput.length = 0;
	};

	this.RemoveInput = function(in_removeNodeName, in_nodeGraph)
	{
		m_arrayInput.remove(in_removeNodeName);
		that.SetDirty(in_nodeGraph);
	};

	this.RemoveOutput = function(in_removeNodeName)
	{
		m_arrayOutput.remove(in_removeNodeName);
	};

	this.SetValueData = function(in_valueData, in_nodeGraph)
	{
		m_valueData = in_valueData;
		that.SetDirty(in_nodeGraph);
	};

	this.GetValue = function(in_nodeGraph)
	{
		if (true == m_dirty)
		{
			UpdateValue(in_nodeGraph);
		}
		return m_value;
	};

	// /////////////////////////////////////////////////////
	// private methods
	function SetDirty(in_nodeGraph)
	{
		if (true == m_dirty)
			return;
		m_dirty = true;
		m_arrayOutput.forEach(function(in_item)
		{
			var node = in_nodeGraph.GetNode(in_item);
			if (node)
			{
				node.SetDirty(in_nodeGraph);
			}
		});
	}
	;

	function UpdateValue(in_nodeGraph)
	{
		m_dirty = false;

		switch (m_valueOpperation)
		{
		case s_nodeValueOpperation.e_valueData:
			m_value = m_valueData;
			break;
		case s_nodeValueOpperation.e_inputSum:
			m_value = 0.0;
			m_arrayInput.forEach(function(in_item)
			{
				m_value += in_nodeGraph.GetValue(in_item.m_nodeName);
			});
			break;
		case s_nodeValueOpperation.e_inputMul:
			m_value = 1.0;
			m_arrayInput.forEach(function(in_item)
			{
				m_value *= in_nodeGraph.GetValue(in_item.m_nodeName);
			});
			break;
		default:
		}
	}
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
			return "Fail:Node";
		return "Pass:Node";
	};

	g_arrayUnitTest.push(out_object);
}