//node.js

var s_nodeValueOpperation = {
  "e_nop" : 0,
  "e_valueData" : 1,
  "e_inputSum" : 2,
  "e_inputSumPlusValueData" : 3,
  "e_inputMul" : 4,
  "e_inputMulMulValueData" : 5,
  "e_inputLogicalAnd" : 6,			//return bool, assume input all bool
  "e_inputLogicalOr" : 7,			//return bool, assume input all bool
  "e_inputSumGreaterZero" : 8,		//return bool, assume input comparable to zero
  "e_inputSumGreaterEqualZero" : 9,	//...
  "e_inputSumEqualZero" : 10,
  "e_inputSumLessEqualZero" : 11,
  "e_inputSumLessZero" : 12,
  "e_inputSumLessEqualZeroEver" : 13, //if inpput sum ever goes bellow zero, set value data to false and return it
  "e_inputSumLog" : 14
  };

//node class
function Node(in_valueOpperation, in_valueData)
{
	//DEBUG if ( !(this instanceof Node) )
	//DEBUG {
	//DEBUG 	alert("Node: call constuctor with new keyword");	
	//DEBUG }

	//private members    
    var that = this;
    var m_arrayInput = []; //nodes i collect values from to calculate my own value
    var m_arrayOutput = []; //nodes that use me as input, if we change we need to mark them as dirty
  
    var m_valueOpperation = in_valueOpperation; //how to combine input to make value
    var m_valueData = in_valueData;
    var m_value = 0.0;
    var m_dirty = true;
  
	//////////////////////////////////////////////////////
	//public methods with private access
	this.AddInput = function(in_nodeInputName, in_factor, in_nodeGraph)
	{	
		m_arrayInput.push(new NodeInput(in_nodeInputName, in_factor));
		that.SetDirty(in_nodeGraph);
	}	
	
	this.AddOutput = function(in_nodeOutputName)
	{
		m_arrayOutput.push(in_nodeOutputName);
	}  
	
	this.UnlinkFromGraph = function(in_removeNodeName, in_nodeGraph)
	{
		//for each of my inputs, remove in_removeNodeName as an output
		m_arrayInput.forEach(function(in_item)
		{
			var node = in_nodeGraph.GetNode(in_item.m_nodeName);
			if (node)
			{
				node.RemoveOutput(in_removeNodeName);
			}
		});    
		m_arrayInput.length = 0; 

		//for each of my outputs, remove myself as an input
		m_arrayOutput.forEach(function(in_item)
		{ 
			var node = in_nodeGraph.GetNode(in_item);
			if (node)
			{
				node.RemoveInput(in_removeNodeName, in_nodeGraph);
			}      
		});    
		m_arrayOutput.length = 0;
	}

	this.RemoveInput = function(in_removeNodeName, in_nodeGraph)
	{
		var indexInput = FindInputIndex(in_removeNodeName);
		if (indexInput != -1)
		{
			m_arrayInput.splice(indexInput, 1); 
		}
		that.SetDirty(in_nodeGraph);
	}

	this.RemoveOutput = function(in_removeNodeName)
	{  
		var indexOutput = m_arrayOutput.indexOf(in_removeNodeName);
		if (indexOutput != -1)
		{
			m_arrayOutput.splice(indexOutput, 1); 
		}
	}	
	
	this.SetValueData = function(in_valueData, in_nodeGraph)
	{
		m_valueData = in_valueData;
		that.SetDirty(in_nodeGraph);
	}

	this.GetValue = function(in_nodeGraph)
	{
		if (true == m_dirty)
		{
			UpdateValue(in_nodeGraph);
		}
		return m_value;
	}
  
    this.SetDirty = function(in_nodeGraph)
    {
		if (true == m_dirty)
		{
			return;
		}
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
  
	///////////////////////////////////////////////////////
	//private methods
	function UpdateValue(in_nodeGraph)
	{
		m_dirty = false;	
		
		switch(m_valueOpperation)
		{
		case s_nodeValueOpperation.e_valueData:
			m_value = m_valueData;
			break;
		case s_nodeValueOpperation.e_inputSum:
			m_value = 0.0;
			m_arrayInput.forEach(function(in_item){ m_value += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			break;
		case s_nodeValueOpperation.e_inputSumPlusValueData:
			m_value = m_valueData;
			m_arrayInput.forEach(function(in_item){ m_value += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			break;
		case s_nodeValueOpperation.e_inputMul:
			m_value = 1.0;
			m_arrayInput.forEach(function(in_item){ m_value *= (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    
			break;			
		case s_nodeValueOpperation.e_inputMulMulValueData:
			m_value = m_valueData;
			m_arrayInput.forEach(function(in_item){ m_value *= (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    
			break;
		case s_nodeValueOpperation.e_inputLogicalAnd:
			m_value = true;
			m_arrayInput.forEach(function(in_item){ m_value &= in_nodeGraph.GetValue(in_item.m_nodeName); });    
			break;		
		case s_nodeValueOpperation.e_inputLogicalOr:
			m_value = false;
			m_arrayInput.forEach(function(in_item){ m_value |= in_nodeGraph.GetValue(in_item.m_nodeName); });    
			break;		
		case s_nodeValueOpperation.e_inputSumGreaterZero:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = (0 < sum);
			break;		
		case s_nodeValueOpperation.e_inputSumGreaterEqualZero:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = (0 <= sum);
			break;		
		case s_nodeValueOpperation.e_inputSumEqualZero:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = (0 == sum);
			break;		
		case s_nodeValueOpperation.e_inputSumLessEqualZero:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = (sum <= 0);
			break;		
		case s_nodeValueOpperation.e_inputSumLessZero:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = (sum < 0);
			break;		
		case s_nodeValueOpperation.e_inputSumLessEqualZeroEver:
			if (false == m_valueData)
			{
				m_value = false;
			}
			else
			{
				var sum = 0.0;
				m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
				if (sum <= 0.0)	
				{
					m_valueData = false;
					m_value = false;
				}
				else
				{
					m_value = true;
				}
			}
			break;
		case s_nodeValueOpperation.e_inputSumLog:
			var sum = 0.0;
			m_arrayInput.forEach(function(in_item){ sum += (in_nodeGraph.GetValue(in_item.m_nodeName) * in_item.m_factor); });    		
			m_value = Math.log(sum);
			break;		
		
		default:
		}	
	}
	
	function FindInputIndex(in_nodeName)
	{
		for (var index = m_arrayInput.length - 1; index >= 0; index -= 1 )
		{
			var nodeInput = m_arrayInput[index];
			if (nodeInput.m_nodeName == in_nodeName)
			{
				return index;
			}
		}
		return -1; 
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
		if (true == result)
		{
			var node1 = new Node(s_nodeValueOpperation.e_valueData, "foo");
			var node2 = new Node(s_nodeValueOpperation.e_valueData, 2.3);
			
			result &= ("foo" == node1.GetValue());
			result &= (2.3 == node2.GetValue());
		}
			
		if (true != result)
		{
			return "Fail:Node";
		}
		return "Pass:Node";
	}
	
	g_arrayUnitTest.push(out_object);
}

