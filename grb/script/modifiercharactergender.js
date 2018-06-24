//modifiercharactergender.js

function ModifierCharacterGender(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterGender) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterGender: call constuctor with new keyword");		
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameGender, s_nodeValueOpperation.e_valueData, -1);    
		m_nodeGraph.CreateNode(s_nodeNameGenderName, s_nodeValueOpperation.e_valueData, "Gender");    
		m_nodeGraph.CreateNode(s_nodeNameGenderStrength, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameGenderIntelegence, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameGenderCost, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.ConnectNode(s_nodeNameGenderStrength, s_nodeNameStrengthBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameGenderIntelegence, s_nodeNameIntelegenceBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameGenderCost, s_nodeNameCost, 1.0);
		
		that.SetGender(s_modifierGender.e_male);		
	} 
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameGender);
		m_nodeGraph.DeleteNode(s_nodeNameGenderName);
		m_nodeGraph.DeleteNode(s_nodeNameGenderStrength);
		m_nodeGraph.DeleteNode(s_nodeNameGenderIntelegence);
		m_nodeGraph.DeleteNode(s_nodeNameGenderCost);
	} 
	this.IncrementGender = function()
	{
		var gender = (m_nodeGraph.GetValue(s_nodeNameGender) + 1) % s_modifierGender.e_count;
		that.SetGender(gender)    
	}
	this.SetGender = function(in_gender)
	{
		m_nodeGraph.SetValueData(s_nodeNameGender, in_gender);
		switch(in_gender)
		{
		case s_modifierGender.e_male:
			m_nodeGraph.SetValueData(s_nodeNameGenderName, "Male");
			m_nodeGraph.SetValueData(s_nodeNameGenderStrength, 1.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderIntelegence, -1.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderCost, 0.0);
		break;
		case s_modifierGender.e_female:
			m_nodeGraph.SetValueData(s_nodeNameGenderName, "Female");
			m_nodeGraph.SetValueData(s_nodeNameGenderStrength, -1.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderIntelegence, 1.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderCost, 0.0);
		break;
		case s_modifierGender.e_other:
			m_nodeGraph.SetValueData(s_nodeNameGenderName, "Other");
			m_nodeGraph.SetValueData(s_nodeNameGenderStrength, 0.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderIntelegence, 0.0);
			m_nodeGraph.SetValueData(s_nodeNameGenderCost, 50.0);
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
			nodeGraph.CreateNode(s_nodeNameStrengthBase, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameIntelegenceBase, s_nodeValueOpperation.e_inputSum, 0.0);
			nodeGraph.CreateNode(s_nodeNameCost, s_nodeValueOpperation.e_inputSum, 0.0);
		
			var modifierCharacterGender = new ModifierCharacterGender(nodeGraph);

			modifierCharacterGender.Activate();
			result &= (1.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (-1.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));
			
			modifierCharacterGender.SetGender(s_modifierGender.e_female);
			result &= (-1.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (1.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));
			
			modifierCharacterGender.Deactivate();
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));

		}
		
		if (true != result)
		{
			return "Fail:ModifierCharacterGender";
		}
		return "Pass:ModifierCharacterGender";
	}
	
	g_arrayUnitTest.push(out_object);
}

