//modifiercharacterai.js

function ModifierCharacterAi(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterAi) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterAi: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	var m_potentialMove = new Vector3();
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameOpponentDistance, s_nodeValueOpperation.e_valueData, 15.0);    
		m_nodeGraph.CreateNode(s_nodeNameOpponentWeight, s_nodeValueOpperation.e_valueData, 0.75);    
		
		m_nodeGraph.CreateNode(s_nodeNameTeamDistance, s_nodeValueOpperation.e_valueData, 2.0);    
		m_nodeGraph.CreateNode(s_nodeNameTeamWeight, s_nodeValueOpperation.e_valueData, 0.25);    
		
		for (var index = 0; index < s_maxNodePriority; ++index)
		{
			m_nodeGraph.CreateNode(s_nodeNameTargetPriority + index, s_nodeValueOpperation.e_valueData, index);
			m_nodeGraph.CreateNode(s_nodeNameBuffPriority + index, s_nodeValueOpperation.e_valueData, index);
		}
	} 
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameOpponentDistance);
		m_nodeGraph.DeleteNode(s_nodeNameOpponentWeight);
		m_nodeGraph.DeleteNode(s_nodeNameTeamDistance);
		m_nodeGraph.DeleteNode(s_nodeNameTeamWeight);
		
		for (var index = 0; index < s_maxNodePriority; ++index)
		{
			m_nodeGraph.DeleteNode(s_nodeNameTargetPriority + index);
			m_nodeGraph.DeleteNode(s_nodeNameBuffPriority + index);
		}
	} 
	
	//then apply move
	this.SetPosition = function(in_position)
	{
		m_nodeGraph.SetValueData(s_nodeNameCombatPosX, in_position.m_x || 0.0);
		m_nodeGraph.SetValueData(s_nodeNameCombatPosY, in_position.m_y || 0.0);
		m_nodeGraph.SetValueData(s_nodeNameCombatPosZ, in_position.m_z || 0.0);
	}	
	
	
	function LocalCollectBestMost(inout_returnArray, inout_bestValue, in_item, in_character, in_nodeName)
	{
		var value = in_character.GetValue(in_nodeName);
		if ((undefined == inout_bestValue[0]) ||
			(inout_bestValue[0] < value))
		{
			inout_returnArray.length = 0;;
			inout_returnArray.push(in_item);
			inout_bestValue[0] = value;
		}
		else if (inout_bestValue[0] == value)
		{
			inout_returnArray.push(in_item);
		}
	}

	function LocalCollectBestLeast(inout_returnArray, inout_bestValue, in_item, in_character, in_nodeName)
	{
		var value = in_character.GetValue(in_nodeName);
		if ((undefined == inout_bestValue[0]) ||
			(value < inout_bestValue[0]))
		{
			inout_returnArray.length = 0;
			inout_returnArray.push(in_item);
			inout_bestValue[0] = value;
		}
		else if (inout_bestValue[0] == value)
		{
			inout_returnArray.push(in_item);
		}
	}	
	
	//return array
	this.FilterArray = function(in_arrayBattleDistanceStoreData, in_selectType)
	{
		var bestValue = [undefined];
		var returnArray = [];
		for (var index = 0; index < in_arrayBattleDistanceStoreData.length; ++index)
		{
			var item = in_arrayBattleDistanceStoreData[index];
			var character = item.m_battleCharacterData.m_character;
			switch(in_selectType)
			{
			case s_modifierAiTargetPriority.e_mostDamage:
				LocalCollectBestMost(returnArray, bestValue, item, character, s_nodeNameCombatHitPointDamage);
				break;
				
			case s_modifierAiTargetPriority.e_leastHealth:
				LocalCollectBestLeast(returnArray, bestValue, item, character, s_nodeNameCombatHitPoint);
				break;

			case s_modifierAiTargetPriority.e_leastAura:
				LocalCollectBestLeast(returnArray, bestValue, item, character, s_nodeNameCombatAuraShield);
				break;
			
			case s_modifierAiTargetPriority.e_leastArmour:
				LocalCollectBestLeast(returnArray, bestValue, item, character, s_nodeNameCombatArmor);
				break;
			
			case s_modifierAiTargetPriority.e_leastCost:
				LocalCollectBestLeast(returnArray, bestValue, item, character, s_nodeNameCost);
				break;
			
			case s_modifierAiTargetPriority.e_fighter:
				var value = character.GetValue(s_nodeNameClass);
				if (s_modifierClass.e_fighter == value)
				{
					returnArray.push(item);
				}
				break;
			case s_modifierAiTargetPriority.e_cleric:
				var value = character.GetValue(s_nodeNameClass);
				if (s_modifierClass.e_cleric == value)
				{
					returnArray.push(item);
				}
				break;
			case s_modifierAiTargetPriority.e_mage:
				var value = character.GetValue(s_nodeNameClass);
				if (s_modifierClass.e_mage == value)
				{
					returnArray.push(item);
				}
				break;
			case s_modifierAiTargetPriority.e_thief:
				var value = character.GetValue(s_nodeNameClass);
				if (s_modifierClass.e_thief == value)
				{
					returnArray.push(item);
				}
				break;
				
			case s_modifierAiTargetPriority.e_mostHealth:
				LocalCollectBestMost(returnArray, bestValue, item, character, s_nodeNameCombatHitPoint);
				break;
			
			case s_modifierAiTargetPriority.e_leastDamage:
				LocalCollectBestLeast(returnArray, bestValue, item, character, s_nodeNameCombatHitPointDamage);
				break;
			
			case s_modifierAiTargetPriority.e_mostAura:
				LocalCollectBestMost(returnArray, bestValue, item, character, s_nodeNameCombatAuraShield);
				break;
			
			case s_modifierAiTargetPriority.e_mostArmour:
				LocalCollectBestMost(returnArray, bestValue, item, character, s_nodeNameCombatArmor);
				break;
			
			case s_modifierAiTargetPriority.e_mostCost:
				LocalCollectBestMost(returnArray, bestValue, item, character, s_nodeNameCost);
				break;
			
			default:
			}
		}
		return returnArray;
	}

	this.FilterList = function(in_arrayBattleDistanceStoreData, in_target)
	{
		if (1 == in_arrayBattleDistanceStoreData.length)
		{
			return in_arrayBattleDistanceStoreData[0];
		}
		if (0 == in_arrayBattleDistanceStoreData.length)
		{
			return null;
		}
		
		var rootName = s_nodeNameTargetPriority;
		if (false == in_target)
		{
			rootName = s_nodeNameBuffPriority;
		}
		
		var oldList = in_arrayBattleDistanceStoreData;
		for (var index = 0; index < s_maxNodePriority; ++index)
		{
			var value = m_nodeGraph.GetValue(rootName + index);

			var newList = this.FilterArray(oldList, value);
			
			if (1 == newList.length)
			{
				return newList[0];
			}
			if (0 == newList.length)
			{
				return oldList[0];
			}
			
			oldList = newList;
		}
		
		if (0 < oldList.length)
		{
			return oldList[0];
		}
		
		return null;
	} 
}

//-- END // End Concatinate, unit test or other follows
