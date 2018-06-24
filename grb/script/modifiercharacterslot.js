//modifiercharacterslot.js

function ModifierCharacterSlot(in_nodeGraph, in_param)
{
	//DEBUG if ( !(this instanceof ModifierCharacterSlot) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterSlot: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	var m_namePostPend = in_param.m_prepend;
	var m_nodeNameModiferSlotName = s_nodeNameModiferSlotName + m_namePostPend;
	var m_nodeNameModiferSlotCost = s_nodeNameModiferSlotCost + m_namePostPend;
	var m_nodeNameModiferSlotUseStrength = s_nodeNameModiferSlotUseStrength + m_namePostPend;
	var m_nodeNameModiferSlotUseIntelegence = s_nodeNameModiferSlotUseIntelegence + m_namePostPend;
	var m_nodeNameModiferSlotMetal = s_nodeNameModiferSlotMetal + m_namePostPend;
	var m_nodeNameModiferSlotRequiresNoMetal = s_nodeNameModiferSlotRequiresNoMetal + m_namePostPend;
	var m_nodeNameModiferSlotDescription = s_nodeNameModiferSlotDescription + m_namePostPend;
	var m_active = false;
	var m_type = s_modifierSlotType.e_physical;
	var m_dataName = "";	
	var m_dataWigitteType = s_guiGameSlotItemType.e_none;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.GetActive = function()
	{
		return m_active;
	}
	this.GetType = function()
	{
		return m_type;
	}	
	this.GetDataName = function()
	{
		return m_dataName;
	}

	this.GetDataWigitteType = function()
	{
		return m_dataWigitteType;
	}
	
	this.SetActive = function(in_active)
	{ 
		if (in_active == this.m_active)
		{
			return;
		}
		if (true == in_active)
		{
			m_active = true;
			
			if (m_type == s_modifierSlotType.e_physical)
			{
				m_dataWigitteType = s_guiGameSlotItemType.e_physicalEmpty;
			}
			else
			{
				m_dataWigitteType = s_guiGameSlotItemType.e_mentalEmpty;
			}
			

			//bit ugly, not setting type on modifier slot on activation by change level, (set on change class and construction)
			var modifierData = s_mapModifierCharacterSlotData[m_dataName];
			var cost = 0.0;
			var costStrength = 0.0;
			var costIntellegence = 0.0;
			var metal = 0.0;
			var requireNoMetal = 0.0;
			if (modifierData)
			{
				cost = modifierData.m_cost;
				costStrength = modifierData.m_costStrength;
				costIntellegence = modifierData.m_costIntellegence;
				if (0 != (modifierData.m_flag & s_modifierSlotModifierFlag.e_metal))
				{
					metal = 1.0;
				}
				if (0 != (modifierData.m_flag & s_modifierSlotModifierFlag.e_requiresNoMetal))
				{
					requireNoMetal = 1.0;
				}
				m_dataWigitteType = modifierData.m_wiggitType;
			}

			m_nodeGraph.CreateNode(m_nodeNameModiferSlotCost, s_nodeValueOpperation.e_valueData, cost);
			m_nodeGraph.CreateNode(m_nodeNameModiferSlotUseStrength, s_nodeValueOpperation.e_valueData, costStrength);
			m_nodeGraph.CreateNode(m_nodeNameModiferSlotUseIntelegence, s_nodeValueOpperation.e_valueData, costIntellegence);      
			m_nodeGraph.CreateNode(m_nodeNameModiferSlotMetal, s_nodeValueOpperation.e_valueData, metal);      
			m_nodeGraph.CreateNode(m_nodeNameModiferSlotRequiresNoMetal, s_nodeValueOpperation.e_valueData, requireNoMetal);      
			m_nodeGraph.ConnectNode(m_nodeNameModiferSlotCost, s_nodeNameCost, 1.0);
			m_nodeGraph.ConnectNode(m_nodeNameModiferSlotUseStrength, s_nodeNameUsedStrength, 1.0);
			m_nodeGraph.ConnectNode(m_nodeNameModiferSlotUseIntelegence, s_nodeNameUsedIntelegence, 1.0);      
			m_nodeGraph.ConnectNode(m_nodeNameModiferSlotMetal, s_nodeNameSlotMetalSum, 1.0);      
			m_nodeGraph.ConnectNode(m_nodeNameModiferSlotRequiresNoMetal, s_nodeNameSlotRequiresNoMetalSum, 1.0);      
			
		
			SetModifierActive(true);      
		}
		else if (false == in_active)
		{  
			SetModifierActive(false);      
			m_active = false;

			m_nodeGraph.DeleteNode(m_nodeNameModiferSlotCost);
			m_nodeGraph.DeleteNode(m_nodeNameModiferSlotUseStrength);    
			m_nodeGraph.DeleteNode(m_nodeNameModiferSlotUseIntelegence);   
			m_nodeGraph.DeleteNode(m_nodeNameModiferSlotMetal);      
			m_nodeGraph.DeleteNode(m_nodeNameModiferSlotRequiresNoMetal);      
		}
	}

	this.SetType = function(in_type)
	{
		m_type = in_type;
	}

	this.SetModifier = function(in_dataName)
	{
		if (m_dataName == in_dataName)
		{
			return;
		}
		if (true == m_active)
		{
			SetModifierActive(false);
		}
		m_dataName = in_dataName;
		var modifierData = s_mapModifierCharacterSlotData[m_dataName];

		if (m_type == s_modifierSlotType.e_physical)
		{
			m_dataWigitteType = s_guiGameSlotItemType.e_physicalEmpty;
		}
		else
		{
			m_dataWigitteType = s_guiGameSlotItemType.e_mentalEmpty;
		}
		
		if (modifierData)
		{
			m_dataWigitteType = modifierData.m_wiggitType;
		
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotCost, modifierData.m_cost);
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotUseStrength, modifierData.m_costStrength);
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotUseIntelegence, modifierData.m_costIntellegence);
			
			var metal = 0.0;
			var requireNoMetal = 0.0;
			if (0 != (modifierData.m_flag & s_modifierSlotModifierFlag.e_metal))
			{
				metal = 1.0;
			}
			if (0 != (modifierData.m_flag & s_modifierSlotModifierFlag.e_requiresNoMetal))
			{
				requireNoMetal = 1.0;
			}			
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotMetal, metal);      
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotRequiresNoMetal, requireNoMetal);      
			
		}
		else
		{
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotCost, 0.0);
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotUseStrength, 0.0);
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotUseIntelegence, 0.0);
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotMetal, 0.0);      
			m_nodeGraph.SetValueData(m_nodeNameModiferSlotRequiresNoMetal, 0.0);      
		}
		
		if (true == m_active)
		{
			SetModifierActive(true);
		}
	}
	
	//////////////////////////////////////////////////////
	//private methods  
	function SetModifierActive(in_active)
	{
		var modifier = s_mapModifierCharacterSlotData[m_dataName];
		if (!modifier)
		{
			return;
		}

		var arrayNodeData = modifier.m_arrayNodeData;
		if (!arrayNodeData)
		{
			return;
		}

		for (var index = 0; index < arrayNodeData.length; ++index)
		{
			var nodeData = arrayNodeData[index];
			var name = nodeData.m_namePrepend + m_namePostPend;
			if (true == in_active)
			{
				m_nodeGraph.CreateNode(name, s_nodeValueOpperation.e_valueData, nodeData.m_value);      
				m_nodeGraph.ConnectNode(name, nodeData.m_target, 1.0);      
			}
			else
			{    
				m_nodeGraph.DeleteNode(name);
			}
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
		if (true == result)
		{
			var nodeGraph = new NodeGraph();
			nodeGraph.CreateNode(s_nodeNameCost, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameUsedStrength, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameUsedIntelegence, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameArmorBase, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameSlotMetalSum, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameSlotRequiresNoMetalSum, s_nodeValueOpperation.e_inputSum, 0.0);

			var modifierCharacterSlot = new ModifierCharacterSlot(nodeGraph, { m_prepend : "01" });
			
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameCost));
			
			modifierCharacterSlot.SetActive(true);
			modifierCharacterSlot.SetType(s_modifierSlotType.e_physical);
			modifierCharacterSlot.SetModifier("Chain mail");
						
			result &= (400.0 == nodeGraph.GetValue(s_nodeNameCost));
			
			modifierCharacterSlot.SetActive(false);
			
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameCost));
			
		}
				
		if (true != result)
		{
			return "Fail:ModifierCharacterSlot";
		}
		return "Pass:ModifierCharacterSlot";
	}
	
	g_arrayUnitTest.push(out_object);
}

