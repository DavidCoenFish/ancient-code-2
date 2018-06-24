//modifiercharacterrace.js

function ModifierCharacterRace(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterRace) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterRace: call constuctor with new keyword");		
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		//add nodes to node graph
		m_nodeGraph.CreateNode(s_nodeNameRace, s_nodeValueOpperation.e_valueData, -1);    
		m_nodeGraph.CreateNode(s_nodeNameRaceName, s_nodeValueOpperation.e_valueData, "Race");    
		m_nodeGraph.CreateNode(s_nodeNameRaceStrength, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameRaceIntelegence, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.ConnectNode(s_nodeNameRaceStrength, s_nodeNameStrengthBase, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameRaceIntelegence, s_nodeNameIntelegenceBase, 1.0);    
		
		that.SetRace(s_modifierRace.e_tribal);
	} 
	this.Deactivate = function()
	{
		//remove nodes to node graph
		m_nodeGraph.DeleteNode(s_nodeNameRace);    
		m_nodeGraph.DeleteNode(s_nodeNameRaceName);
		m_nodeGraph.DeleteNode(s_nodeNameRaceStrength);
		m_nodeGraph.DeleteNode(s_nodeNameRaceIntelegence);
	} 
	this.IncrementRace = function()
	{
		var race = (m_nodeGraph.GetValue(s_nodeNameRace) + 1) % s_modifierRace.e_count;
		that.SetRace(race)
	}
	this.SetRace = function(in_race)
	{
		m_nodeGraph.SetValueData(s_nodeNameRace, in_race);
		var name = "";
		var str = 0.0;
		var intel = 0.0;
		var resistMagic = 0.0;
		var resistPhysical = 0.0;
		switch(in_race)
		{
		case s_modifierRace.e_ork:
			name = "Ork";
			str = 3.0;
			intel = -3.0;
			resistMagic = -0.5;
			break;
		case s_modifierRace.e_dwarf:
			name = "Dwarf";
			str = 2.0;
			intel = -2.0;
			resistMagic = 0.25;
			break;
		case s_modifierRace.e_barbarian:
			name = "Barbarian";
			str = 1.0;
			intel = -1.0;
			break;
		case s_modifierRace.e_tribal:
			name = "Tribal";
			break;
		case s_modifierRace.e_nomad:
			name = "Nomad";
			str = -1.0;
			intel = 1.0;
			break;
		case s_modifierRace.e_elf:
			name = "Elf";
			str = -2.0;
			intel = 2.0;
			resistPhysical = 0.25;
			break;
		case s_modifierRace.e_fae:
			name = "Fae";
			str = -3.0;
			intel = 3.0;
			resistPhysical = -0.5;
			break;
		default:        
		}

		m_nodeGraph.SetValueData(s_nodeNameRaceName, name);
		m_nodeGraph.SetValueData(s_nodeNameRaceStrength, str);
		m_nodeGraph.SetValueData(s_nodeNameRaceIntelegence, intel);
		m_nodeGraph.SetValueData(s_nodeNameResistMagicBase, resistMagic);
		m_nodeGraph.SetValueData(s_nodeNameResistPhysicalBase, resistPhysical);    
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

			var modifierCharacterRace = new ModifierCharacterRace(nodeGraph);

			modifierCharacterRace.Activate();
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));
			
			modifierCharacterRace.SetRace(s_modifierRace.e_elf);
			result &= (-2.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (2.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));
			
			modifierCharacterRace.Deactivate();
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameStrengthBase));
			result &= (0.0 == nodeGraph.GetValue(s_nodeNameIntelegenceBase));

		}				
				
		if (true != result)
		{
			return "Fail:ModifierCharacterRace";
		}
		return "Pass:ModifierCharacterRace";
	}
	
	g_arrayUnitTest.push(out_object);
}

