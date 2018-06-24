//modifiercharactervalid.js

function ModifierCharacterValid(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterValid) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterValid: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameValid, s_nodeValueOpperation.e_inputLogicalAnd);    
		m_nodeGraph.CreateNode(s_nodeNameUsedStrengthValid, s_nodeValueOpperation.e_inputSumGreaterEqualZero);    
		m_nodeGraph.CreateNode(s_nodeNameUsedIntelegenceValid, s_nodeValueOpperation.e_inputSumGreaterEqualZero);    

		m_nodeGraph.CreateNode(s_nodeNameMetalProduct, s_nodeValueOpperation.e_inputMul);    
		m_nodeGraph.CreateNode(s_nodeNameMetalProductValid, s_nodeValueOpperation.e_inputSumEqualZero);    
		
		m_nodeGraph.ConnectNode(s_nodeNameUsedStrength, s_nodeNameUsedStrengthValid, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameUsedStrengthValid, 1.0);
				
		m_nodeGraph.ConnectNode(s_nodeNameUsedIntelegence, s_nodeNameUsedIntelegenceValid, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameUsedIntelegenceValid, 1.0);
		
		m_nodeGraph.ConnectNode(s_nodeNameUsedStrengthValid, s_nodeNameValid);
		m_nodeGraph.ConnectNode(s_nodeNameUsedIntelegenceValid, s_nodeNameValid);
		m_nodeGraph.ConnectNode(s_nodeNameMetalProductValid, s_nodeNameValid);
		
		m_nodeGraph.ConnectNode(s_nodeNameSlotMetalSum, s_nodeNameMetalProduct, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameSlotRequiresNoMetalSum, s_nodeNameMetalProduct, 1.0);	
			
		m_nodeGraph.ConnectNode(s_nodeNameMetalProduct, s_nodeNameMetalProductValid, 1.0);		
	} 
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameValid);
		m_nodeGraph.DeleteNode(s_nodeNameUsedStrengthValid);
		m_nodeGraph.DeleteNode(s_nodeNameUsedIntelegenceValid);
		m_nodeGraph.DeleteNode(s_nodeNameMetalProduct);
		m_nodeGraph.DeleteNode(s_nodeNameMetalProductValid);
	} 
	
	this.GetStatusMessage = function()
	{
		if (false == m_nodeGraph.GetValue(s_nodeNameUsedStrengthValid))
		{
			return "Invalid: Insufficient strength for selected equipment.";
		}
		if (false == m_nodeGraph.GetValue(s_nodeNameUsedIntelegenceValid))
		{
			return "Invalid: Insufficient intelligence for selected skills.";
		}
		if (false == m_nodeGraph.GetValue(s_nodeNameMetalProductValid))
		{
			return "Invalid: Metal equipment conflicts with skills requiring no metal.";
		}
		
		return "";
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
		
			nodeGraph.CreateNode(s_nodeNameUsedStrength, s_nodeValueOpperation.e_valueData, 5.0);
			nodeGraph.CreateNode(s_nodeNameStrength, s_nodeValueOpperation.e_valueData, 5.0);
			nodeGraph.CreateNode(s_nodeNameUsedIntelegence, s_nodeValueOpperation.e_valueData, 10.0);
			nodeGraph.CreateNode(s_nodeNameIntelegence, s_nodeValueOpperation.e_valueData, 10.0);
			nodeGraph.CreateNode(s_nodeNameSlotMetalSum, s_nodeValueOpperation.e_valueData, 0.0);
			nodeGraph.CreateNode(s_nodeNameSlotRequiresNoMetalSum, s_nodeValueOpperation.e_valueData, 0.0);

			var modifierCharacterValid = new ModifierCharacterValid(nodeGraph);			
			
			modifierCharacterValid.Activate();

			result &= (true == nodeGraph.GetValue(s_nodeNameValid));

			//alert(modifierCharacterValid.GetStatusMessage());

			nodeGraph.SetValueData(s_nodeNameUsedStrength, 6.0);
			result &= (false == nodeGraph.GetValue(s_nodeNameValid));
			//alert(modifierCharacterValid.GetStatusMessage());
			nodeGraph.SetValueData(s_nodeNameStrength, 7.0);

			result &= (true == nodeGraph.GetValue(s_nodeNameValid));

			nodeGraph.SetValueData(s_nodeNameUsedIntelegence, 11.0);
			result &= (false == nodeGraph.GetValue(s_nodeNameValid));
			//alert(modifierCharacterValid.GetStatusMessage());
			nodeGraph.SetValueData(s_nodeNameIntelegence, 11.0);

			result &= (true == nodeGraph.GetValue(s_nodeNameValid));

			nodeGraph.SetValueData(s_nodeNameSlotMetalSum, 1.0);
			result &= (true == nodeGraph.GetValue(s_nodeNameValid));
			nodeGraph.SetValueData(s_nodeNameSlotRequiresNoMetalSum, 1.0);
			result &= (false == nodeGraph.GetValue(s_nodeNameValid));
			//alert(modifierCharacterValid.GetStatusMessage());

			modifierCharacterValid.Deactivate();
		}
		
		if (true != result)
		{
			return "Fail:ModifierCharacterValid";
		}
		return "Pass:ModifierCharacterValid";
	}
	
	g_arrayUnitTest.push(out_object);
}

