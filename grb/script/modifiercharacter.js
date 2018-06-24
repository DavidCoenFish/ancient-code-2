//modifiercharacter.js

function ModifierCharacter(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacter) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacter: call constuctor with new keyword");				
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameNameId, s_nodeValueOpperation.e_valueData, 0);
	
		//strength
		m_nodeGraph.CreateNode(s_nodeNameStrengthBase, s_nodeValueOpperation.e_inputSumPlusValueData, s_entityBaseStrength);
		m_nodeGraph.CreateNode(s_nodeNameStrengthMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameStrength, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameStrengthBonus, s_nodeValueOpperation.e_inputSumLog);
		m_nodeGraph.ConnectNode(s_nodeNameStrengthBase, s_nodeNameStrengthMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameStrengthMulBase, s_nodeNameStrength, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameStrengthBonus, 1.0);

		//intelegence
		m_nodeGraph.CreateNode(s_nodeNameIntelegenceBase, s_nodeValueOpperation.e_inputSumPlusValueData, s_entityBaseIntelegence);
		m_nodeGraph.CreateNode(s_nodeNameIntelegenceMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameIntelegence, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameIntelegenceBonus, s_nodeValueOpperation.e_inputSumLog);
		m_nodeGraph.ConnectNode(s_nodeNameIntelegenceBase, s_nodeNameIntelegenceMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameIntelegenceMulBase, s_nodeNameIntelegence, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameIntelegenceBonus, 1.0);

		//speed
		m_nodeGraph.CreateNode(s_nodeNameSpeed, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameSpeed, 0.5);    
		m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameSpeed, 0.5);

		//hitPoint
		m_nodeGraph.CreateNode(s_nodeNameHitPointMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameHitPoint, s_nodeValueOpperation.e_inputSum, 0.0);
		m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameHitPointMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameHitPointMulBase, s_nodeNameHitPoint, 1.0);

		//HealthRepair
		m_nodeGraph.CreateNode(s_nodeNameHealthRepairBase, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameHealthRepairMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameHealthRepair, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameHealthRepairPool, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameHealthRepairBase, s_nodeNameHealthRepairMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameHealthRepairMulBase, s_nodeNameHealthRepair, 1.0);

		//armor
		m_nodeGraph.CreateNode(s_nodeNameArmorBase, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameArmorMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameArmor, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameArmorBase, s_nodeNameArmorMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameArmorMulBase, s_nodeNameArmor, 1.0);

		//ArmorRepair
		m_nodeGraph.CreateNode(s_nodeNameArmorRepairBase, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameArmorRepairMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameArmorRepair, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameArmorRepairPool, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameArmorRepairBase, s_nodeNameArmorRepairMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameArmorRepairMulBase, s_nodeNameArmorRepair, 1.0);

		//Resist Physical
		m_nodeGraph.CreateNode(s_nodeNameResistPhysicalBase, s_nodeValueOpperation.e_inputSumPlusValueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameResistPhysicalMulBase, s_nodeValueOpperation.e_inputMulMulValueData, 1.0);
		m_nodeGraph.CreateNode(s_nodeNameResistPhysical, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameResistPhysicalBase, s_nodeNameResistPhysicalMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameResistPhysicalMulBase, s_nodeNameResistPhysical, 1.0);

		//AuraShield
		m_nodeGraph.CreateNode(s_nodeNameAuraShieldBase, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameAuraShieldMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameAuraShield, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameAuraShieldBase, s_nodeNameAuraShieldMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameAuraShieldMulBase, s_nodeNameAuraShield, 1.0);

		//AuraRepair
		m_nodeGraph.CreateNode(s_nodeNameAuraRepairBase, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameAuraRepairMulBase, s_nodeValueOpperation.e_inputMul);
		m_nodeGraph.CreateNode(s_nodeNameAuraRepair, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameAuraRepairPool, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.ConnectNode(s_nodeNameAuraRepairBase, s_nodeNameAuraRepairMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameAuraRepairMulBase, s_nodeNameAuraRepair, 1.0);

		//ResistMagic
		m_nodeGraph.CreateNode(s_nodeNameResistMagicBase, s_nodeValueOpperation.e_inputSumPlusValueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameResistMagicMulBase, s_nodeValueOpperation.e_inputMulMulValueData, 1.0);
		m_nodeGraph.CreateNode(s_nodeNameResistMagic, s_nodeValueOpperation.e_inputSumPlusValueData, 0.0);
		m_nodeGraph.ConnectNode(s_nodeNameResistMagicBase, s_nodeNameResistMagicMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameResistMagicMulBase, s_nodeNameResistMagic, 1.0);

		//misc
		m_nodeGraph.CreateNode(s_nodeNameCost, s_nodeValueOpperation.e_inputSumPlusValueData, s_characterBaseCost);
		m_nodeGraph.CreateNode(s_nodeNameLevel, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameUsedStrength, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameUsedIntelegence, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameSlotMetalSum, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameSlotRequiresNoMetalSum, s_nodeValueOpperation.e_inputSum);

		//m_nodeGraph.CreateNode(s_nodeNameArmorResistance, s_nodeValueOpperation.e_inputMul);
		//m_nodeGraph.CreateNode(s_nodeNameAuraResistance, s_nodeValueOpperation.e_inputMul);

	}
	
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameNameId);
	
		m_nodeGraph.DeleteNode(s_nodeNameStrengthBase);
		m_nodeGraph.DeleteNode(s_nodeNameStrengthMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameStrength);

		m_nodeGraph.DeleteNode(s_nodeNameIntelegenceBase);
		m_nodeGraph.DeleteNode(s_nodeNameIntelegenceMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameIntelegence);

		m_nodeGraph.DeleteNode(s_nodeNameSpeed);

		m_nodeGraph.DeleteNode(s_nodeNameHitPointMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameHitPoint);

		m_nodeGraph.DeleteNode(s_nodeNameHealthRepairBase);
		m_nodeGraph.DeleteNode(s_nodeNameHealthRepairMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameHealthRepair);
		m_nodeGraph.DeleteNode(s_nodeNameHealthRepairPool);

		m_nodeGraph.DeleteNode(s_nodeNameArmorBase);
		m_nodeGraph.DeleteNode(s_nodeNameArmorMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameArmor);
		
		m_nodeGraph.DeleteNode(s_nodeNameArmorRepairBase);
		m_nodeGraph.DeleteNode(s_nodeNameArmorRepairMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameArmorRepair);
		m_nodeGraph.DeleteNode(s_nodeNameArmorRepairPool);
		
		m_nodeGraph.DeleteNode(s_nodeNameResistPhysicalBase);
		m_nodeGraph.DeleteNode(s_nodeNameResistPhysicalMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameResistPhysical);

		m_nodeGraph.DeleteNode(s_nodeNameAuraShieldBase);
		m_nodeGraph.DeleteNode(s_nodeNameAuraShieldMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameAuraShield);
		
		m_nodeGraph.DeleteNode(s_nodeNameAuraRepairBase);
		m_nodeGraph.DeleteNode(s_nodeNameAuraRepairMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameAuraRepair);
		m_nodeGraph.DeleteNode(s_nodeNameAuraRepairPool);
		
		m_nodeGraph.DeleteNode(s_nodeNameResistMagicBase);
		m_nodeGraph.DeleteNode(s_nodeNameResistMagicMulBase);
		m_nodeGraph.DeleteNode(s_nodeNameResistMagic);

		m_nodeGraph.DeleteNode(s_nodeNameCost);
		m_nodeGraph.DeleteNode(s_nodeNameLevel);
		m_nodeGraph.DeleteNode(s_nodeNameUsedStrength);
		m_nodeGraph.DeleteNode(s_nodeNameUsedIntelegence);	
		m_nodeGraph.DeleteNode(s_nodeNameSlotMetalSum);
		m_nodeGraph.DeleteNode(s_nodeNameSlotRequiresNoMetalSum);

		//m_nodeGraph.DeleteNode(s_nodeNameArmorResistance);
		//m_nodeGraph.DeleteNode(s_nodeNameAuraResistance);		
	}

	this.SetNameId = function(in_nameId)
	{
		m_nodeGraph.SetValueData(s_nodeNameNameId, in_nameId);	
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
		
			var modifierCharacter = new ModifierCharacter(nodeGraph);
			
			modifierCharacter.Activate();

			result &= (s_entityBaseStrength == nodeGraph.GetValue(s_nodeNameStrength));
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameArmor));

			modifierCharacter.Deactivate();

			result &= (undefined == nodeGraph.GetValue(s_nodeNameStrength));
			result &= (undefined == nodeGraph.GetValue(s_nodeNameArmor));

		}

		
		if (true != result)
		{
			return "Fail:ModifierCharacter";
		}
		return "Pass:ModifierCharacter";
	}
	
	g_arrayUnitTest.push(out_object);
}

