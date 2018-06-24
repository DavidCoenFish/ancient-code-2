//modifiercharacterclass.js

function ModifierCharacterClass(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterClass) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterClass: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameClass, s_nodeValueOpperation.e_valueData, -1);    
		m_nodeGraph.CreateNode(s_nodeNameClassName, s_nodeValueOpperation.e_valueData, "");    
		m_nodeGraph.CreateNode(s_nodeNameClassStrength, s_nodeValueOpperation.e_valueData, 1.0);
		m_nodeGraph.CreateNode(s_nodeNameClassIntelegence, s_nodeValueOpperation.e_valueData, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameClassStrength, s_nodeNameStrengthMulBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameClassIntelegence, s_nodeNameIntelegenceMulBase, 1.0);  
		
		that.SetClass(s_modifierClass.e_fighter);
	} 
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameClass);
		m_nodeGraph.DeleteNode(s_nodeNameClassName);
		m_nodeGraph.DeleteNode(s_nodeNameClassStrength);
		m_nodeGraph.DeleteNode(s_nodeNameClassIntelegence);
	} 
	this.IncrementClass = function()
	{
		var mclass = (m_nodeGraph.GetValue(s_nodeNameClass) + 1) % s_modifierClass.e_count;
		SetClass(mclass)    
	}  
	
	this.SetClass = function(in_class)
	{
		m_nodeGraph.SetValueData(s_nodeNameClass, in_class);
		switch(in_class)
		{
		case s_modifierClass.e_fighter:
			m_nodeGraph.SetValueData(s_nodeNameClassName, "Fighter");
			m_nodeGraph.SetValueData(s_nodeNameClassStrength, 1.5);
			m_nodeGraph.SetValueData(s_nodeNameClassIntelegence, 0.5);
			m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameSpeed, 0.5);
			m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameSpeed, 0.5);
			break;
		case s_modifierClass.e_mage:
			m_nodeGraph.SetValueData(s_nodeNameClassName, "Mage");
			m_nodeGraph.SetValueData(s_nodeNameClassStrength, 0.5);
			m_nodeGraph.SetValueData(s_nodeNameClassIntelegence, 1.5);
			m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameSpeed, 0.5);
			m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameSpeed, 0.5);
			break;
		case s_modifierClass.e_cleric:
			m_nodeGraph.SetValueData(s_nodeNameClassName, "Cleric");
			m_nodeGraph.SetValueData(s_nodeNameClassStrength, 1.0);
			m_nodeGraph.SetValueData(s_nodeNameClassIntelegence, 1.0);
			m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameSpeed, 0.75);
			m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameSpeed, 0.25);
			break;
		case s_modifierClass.e_thief:
			m_nodeGraph.SetValueData(s_nodeNameClassName, "Thief");
			m_nodeGraph.SetValueData(s_nodeNameClassStrength, 1.0);
			m_nodeGraph.SetValueData(s_nodeNameClassIntelegence, 1.0);
			m_nodeGraph.ConnectNode(s_nodeNameStrength, s_nodeNameSpeed, 0.25);
			m_nodeGraph.ConnectNode(s_nodeNameIntelegence, s_nodeNameSpeed, 0.75);
			break;
		default:
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
		
			nodeGraph.CreateNode(s_nodeNameStrengthMulBase, s_nodeValueOpperation.e_inputMul);
			nodeGraph.CreateNode(s_nodeNameIntelegenceMulBase, s_nodeValueOpperation.e_inputMul);
			nodeGraph.CreateNode(s_nodeNameSpeed, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameStrength, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameIntelegence, s_nodeValueOpperation.e_inputSum, 0.0);
			
			var modifierCharacterClass = new ModifierCharacterClass(nodeGraph);			
			
			modifierCharacterClass.Activate();
			modifierCharacterClass.SetClass(s_modifierClass.e_fighter);
			result &= (1.5 == nodeGraph.GetValue(s_nodeNameStrengthMulBase));
			result &= (0.5 == nodeGraph.GetValue(s_nodeNameIntelegenceMulBase));

			modifierCharacterClass.SetClass(s_modifierClass.e_mage);
			result &= (0.5 == nodeGraph.GetValue(s_nodeNameStrengthMulBase));
			result &= (1.5 == nodeGraph.GetValue(s_nodeNameIntelegenceMulBase));
			
			modifierCharacterClass.Deactivate();
			result &= (1.0 == nodeGraph.GetValue(s_nodeNameStrengthMulBase));
			result &= (1.0 == nodeGraph.GetValue(s_nodeNameIntelegenceMulBase));

		}

		
		if (true != result)
		{
			return "Fail:ModifierCharacterClass";
		}
		return "Pass:ModifierCharacterClass";
	}
	
	g_arrayUnitTest.push(out_object);
}

