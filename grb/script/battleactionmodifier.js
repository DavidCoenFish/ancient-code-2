// battleactionmodifier.js

function BattleActionModifier(in_nodeGraph, in_param)
{
	//DEBUG if ( !(this instanceof BattleActionModifier) )
	//DEBUG {
	//DEBUG 	alert("BattleActionModifier: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	var m_nodeName = in_param.m0;
	var m_nodeNameTarget = in_param.m1;
	var m_value = in_param.m2;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(m_nodeName, s_nodeValueOpperation.e_valueData, m_value);
		m_nodeGraph.ConnectNode(m_nodeName, m_nodeNameTarget, 1.0);
	}
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(m_nodeName);	
	}
}
