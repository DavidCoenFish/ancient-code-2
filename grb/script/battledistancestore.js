// battledistancestore.js

function BattleDistanceStore()
{
	//DEBUG if ( !(this instanceof BattleDistanceStore) )
	//DEBUG {
	//DEBUG 	alert("BattleDistanceStore: call constuctor with new keyword");	
	//DEBUG }

	this.m_mapDistance = {};	
}

//WARNING: if you want BOTH sides, have false == in_opponentOnly and false == in_teamOnly
BattleDistanceStore.prototype.GetArrayDistanceFiltered = function(in_battleCharacterData, in_aliveOnly, in_opponentOnly, in_teamOnly, in_minDistance, in_maxDistance, in_deadOnly)
{
	var result = [];
	var tempArray = this.GetArrayDistance(in_battleCharacterData);
	tempArray.forEach(function(in_item)
	{
		if (undefined != in_minDistance)
		{
			if (in_item.m_distance < in_minDistance)
			{
				return;
			}
		}
	
		if (undefined != in_maxDistance)
		{
			if (in_maxDistance < in_item.m_distance)
			{
				return;
			}
		}

		var itemBattleCharacterData = in_item.m_battleCharacterData;
		if ((true == in_deadOnly)&&
			(false != itemBattleCharacterData.GetAlive()))
		{
			return;
		}
		if ((true == in_aliveOnly) &&
			(false == itemBattleCharacterData.GetAlive()))
		{
			return;
		}
		if ((true == in_opponentOnly) &&
			(in_battleCharacterData.m_flipped == itemBattleCharacterData.m_flipped))
		{
			return;
		}
		if ((true == in_teamOnly) &&
			(in_battleCharacterData.m_flipped != itemBattleCharacterData.m_flipped))
		{
			return;
		}
		result.push(in_item);
	}); 
	return result;
}

BattleDistanceStore.prototype.GetArrayDistance = function(in_battleCharacterData)
{
	var id = in_battleCharacterData.GetUniqueId();
	if (this.m_mapDistance.hasOwnProperty(id))
	{
		return this.m_mapDistance[id];
	}
	return [];
}

BattleDistanceStore.prototype.Update = function(in_arrayBattleCharacterData)
{
	var mapDistance = {};

	function AddPair(in_lhs, in_rhs)
	{
		var xDelta = in_rhs.m_character.GetValue(s_nodeNameCombatPosX) - in_lhs.m_character.GetValue(s_nodeNameCombatPosX);
		var yDelta = in_rhs.m_character.GetValue(s_nodeNameCombatPosY) - in_lhs.m_character.GetValue(s_nodeNameCombatPosY);
		var zDelta = in_rhs.m_character.GetValue(s_nodeNameCombatPosZ) - in_lhs.m_character.GetValue(s_nodeNameCombatPosZ);
	
		var offset = new Vector3(xDelta, yDelta, zDelta);
		var distance = offset.Normalise();
		
		var lhsId = in_lhs.GetUniqueId();
		var rhsId = in_rhs.GetUniqueId();
		
		if (false == mapDistance.hasOwnProperty(lhsId))
		{
			mapDistance[lhsId] = [];
		}
		if (false == mapDistance.hasOwnProperty(rhsId))
		{
			mapDistance[rhsId] = [];
		}
		
		mapDistance[lhsId].push(new BattleDistanceStoreData(
			rhsId,
			in_rhs,
			distance,
			new Vector3(offset.m_x, offset.m_y, offset.m_z)
			));
		mapDistance[rhsId].push(new BattleDistanceStoreData(
			lhsId,
			in_lhs,
			distance,
			new Vector3(-offset.m_x, -offset.m_y, -offset.m_z)
			));
	}
	
	function SortData(in_lhs, in_rhs)
	{
		var amount = (in_lhs.m_distance - in_rhs.m_distance);
		if (amount < 0)
		{
			return -1;
		}
		if (0 < amount)
		{
			return 1;
		}
		return 0;
	}

	//add each pair
	for (var index = 0; index < in_arrayBattleCharacterData.length; ++index)
	{
		var lhs = in_arrayBattleCharacterData[index];
		for (var subIndex = index + 1; subIndex < in_arrayBattleCharacterData.length; ++subIndex)
		{
			var rhs = in_arrayBattleCharacterData[subIndex];
			AddPair(lhs, rhs);
		}	
	}
	for (key in mapDistance)
	{
		if (mapDistance.hasOwnProperty(key))
		{
			mapDistance[key].sort(SortData);
		}
	}
	
	this.m_mapDistance = mapDistance; //clear
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
		
		if (true == result)
		{
			var arrayBattleCharacterData = [];
			
			var character0 = new GameCharacter();
			var battleCharacterData0 = new BattleCharacterData({ "m_x" : 0.0, "m_y" : 3.0, "m_z" : 0.0 }, false, character0);
			arrayBattleCharacterData.push(battleCharacterData0);
			
			var character1 = new GameCharacter();
			var battleCharacterData1 = new BattleCharacterData({ "m_x" : 4.0, "m_y" : 0.0, "m_z" : 0.0 }, false, character1);
			arrayBattleCharacterData.push(battleCharacterData1);
			
			var character2 = new GameCharacter();
			var battleCharacterData2 = new BattleCharacterData({ "m_x" : 4.0, "m_y" : 3.0, "m_z" : 0.0 }, true, character2);
			arrayBattleCharacterData.push(battleCharacterData2);
			
			var battleDistanceStore = new BattleDistanceStore();
			battleDistanceStore.Update(arrayBattleCharacterData);
			
			var arrayDistance = battleDistanceStore.GetArrayDistance(battleCharacterData0);
			result &= (2 == arrayDistance.length);
			result &= (battleCharacterData2.GetUniqueId() == arrayDistance[0].m_key);
			result &= (1.0 == arrayDistance[0].m_vector.m_x);
			result &= (0.0 == arrayDistance[0].m_vector.m_y);
			result &= (0.0 == arrayDistance[0].m_vector.m_z);
			result &= (4.0 == arrayDistance[0].m_distance);
			result &= (5.0 == arrayDistance[1].m_distance);

			var arrayDistance = battleDistanceStore.GetArrayDistance(battleCharacterData1);
			result &= (2 == arrayDistance.length);
			result &= (3.0 == arrayDistance[0].m_distance);
			result &= (5.0 == arrayDistance[1].m_distance);
			
			var arrayDistance = battleDistanceStore.GetArrayDistance(battleCharacterData2);
			result &= (2 == arrayDistance.length);
			result &= (battleCharacterData1.GetUniqueId() == arrayDistance[0].m_key);
			result &= (0.0 == arrayDistance[0].m_vector.m_x);
			result &= (-1.0 == arrayDistance[0].m_vector.m_y);
			result &= (0.0 == arrayDistance[0].m_vector.m_z);
			result &= (3.0 == arrayDistance[0].m_distance);
			result &= (4.0 == arrayDistance[1].m_distance);
			result &= (battleCharacterData0.GetUniqueId() == arrayDistance[1].m_key);
			result &= (-1.0 == arrayDistance[1].m_vector.m_x);
			result &= (0.0 == arrayDistance[1].m_vector.m_y);
			result &= (0.0 == arrayDistance[1].m_vector.m_z);
			
			var arrayDistance = battleDistanceStore.GetArrayDistanceFiltered(battleCharacterData2, true, false, false, undefined, 3.5);
			result &= (1 == arrayDistance.length);
			result &= (battleCharacterData1.GetUniqueId() == arrayDistance[0].m_key);
			
			var arrayDistance = battleDistanceStore.GetArrayDistanceFiltered(battleCharacterData2);
			result &= (2 == arrayDistance.length);

		}
		
		
		if (true != result)
		{
			return "Fail:BattleDistanceStore";
		}
		return "Pass:BattleDistanceStore";
	}
	
	g_arrayUnitTest.push(out_object);
}

