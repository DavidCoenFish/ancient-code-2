//modifierplusstat.js

function ModifierPlusStat(in_nodeGraph, in_param)
{
	//DEBUG if ( !(this instanceof ModifierPlusStat) )
	//DEBUG {
	//DEBUG 	alert("ModifierPlusStat: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;
	var m_nodeGraph = in_nodeGraph;		
	var m_baseCost = in_param.m_baseCost;
	var m_statNodeName = in_param.m_statNodeName;
	var m_statNodeNameTarget = in_param.m_statNodeNameTarget;
	var m_statNodeNameCost = in_param.m_statNodeNameCost;
	var m_statNodeNameCostTarget = in_param.m_statNodeNameCostTarget;
	var m_limit = in_param.m_limit; //can be undefined

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(m_statNodeName, s_nodeValueOpperation.e_valueData, 0.0);    
		m_nodeGraph.ConnectNode(m_statNodeName, m_statNodeNameTarget, 1.0);    

		m_nodeGraph.CreateNode(m_statNodeNameCost, s_nodeValueOpperation.e_valueData, 0.0);    
		m_nodeGraph.ConnectNode(m_statNodeNameCost, m_statNodeNameCostTarget, 1.0);    
	
	}
	
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(m_statNodeName);    
		m_nodeGraph.DeleteNode(m_statNodeNameCost);    
	}
	
	this.DecrementPlus = function()
	{
		SetPlus(m_nodeGraph.GetValue(m_statNodeName) - 1);
	}
	this.IncrementPlus = function()
	{
		SetPlus(m_nodeGraph.GetValue(m_statNodeName) + 1);
	}
	
	//////////////////////////////////////////////////////
	//private methods	
	function SetPlus(in_plus)
	{
		if (in_plus < 0)
		{
			in_plus = 0;
		}
		if (undefined != m_limit)
		{
			if (m_limit <= in_plus)
			{
				in_plus = m_limit - 1;
			}
		}

		m_nodeGraph.SetValueData(m_statNodeName, in_plus);
		
		var cost = GetFibinarchy(in_plus) * m_baseCost;
		m_nodeGraph.SetValueData(m_statNodeNameCost, cost);
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
			var nodeGraph = new NodeGraph();
			nodeGraph.CreateNode("value", s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode("cost", s_nodeValueOpperation.e_inputSum, 0.0);
		
			var modifierPlusStat = new ModifierPlusStat(nodeGraph, 
			{
				"m_baseCost" : 100,
				"m_statNodeName" : "plus",
				"m_statNodeNameTarget" : "value",
				"m_statNodeNameCost" : "plusCost",
				"m_statNodeNameCostTarget" : "cost",
				"m_limit" : 4
			
			});

			modifierPlusStat.Activate();

			result &= (0.0 == nodeGraph.GetValue("value"));
			result &= (0.0 == nodeGraph.GetValue("cost"));
			
			modifierPlusStat.IncrementPlus();
			result &= (1.0 == nodeGraph.GetValue("value"));
			result &= (100.0 == nodeGraph.GetValue("cost"));

			modifierPlusStat.IncrementPlus();
			result &= (2.0 == nodeGraph.GetValue("value"));
			result &= (300.0 == nodeGraph.GetValue("cost"));

			modifierPlusStat.IncrementPlus();
			result &= (3.0 == nodeGraph.GetValue("value"));
			result &= (600.0 == nodeGraph.GetValue("cost"));

			modifierPlusStat.IncrementPlus();
			result &= (3.0 == nodeGraph.GetValue("value"));
			result &= (600.0 == nodeGraph.GetValue("cost"));
			
			modifierPlusStat.Deactivate();

			result &= (0.0 == nodeGraph.GetValue("value"));
			result &= (0.0 == nodeGraph.GetValue("cost"));
			
		}

		
		if (true != result)
		{
			return "Fail:ModifierPlusStat";
		}
		return "Pass:ModifierPlusStat";
	}
	
	g_arrayUnitTest.push(out_object);
}

