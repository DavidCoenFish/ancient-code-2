// battlecharacterdata.js

//is this they play to own battle stats and ai?
function BattleCharacterData(in_position, in_flipped, in_character)
{
	//DEBUG if ( !(this instanceof BattleCharacterData) )
	//DEBUG {
	//DEBUG 	alert("BattleCharacterData: call constuctor with new keyword");	
	//DEBUG }
	
	//this.m_position = in_position; //just the battle starting pos
	
	this.m_flipped = in_flipped; //player side or opponent side (is the graphic fliped on y axis...)
	this.m_character = in_character;
	this.m_action = s_gameDrawAction.e_idle;
	this.m_actionTime = 0.0;
	this.m_arrayAction = [];
	this.m_battleReport = new BattleReport();
		
	this.m_character.BeginBattle(in_position);
	
	this.m_potentialMove = new Vector3(in_position.m_x, in_position.m_y, in_position.m_z);
	this.m_velocity = new Vector3();
	
	//populate action array
	for (var index = 0; index < s_maxLevel; ++index)
	{
		var modifierSlot = this.m_character.GetModifier(s_modifierEntitySlot + index);
		var data = null;
		var name = "";
		if (modifierSlot && modifierSlot.GetActive())
		{
			name = modifierSlot.GetDataName();
			data = s_mapModifierCharacterSlotData[name];
		}
		if (data && data.m_actionData)
		{
			this.m_arrayAction.push(new BattleAction(name, data.m_actionData.m_type, data.m_actionData.m_data));
		}
	}
}

//http://stackoverflow.com/questions/1997661/unique-object-identifier-in-javascript
(function() 
{
    if (typeof BattleCharacterData.prototype.GetUniqueId == "undefined") 
    {
        var id = 0;
        BattleCharacterData.prototype.GetUniqueId = function() 
        {
            if (typeof this.m_uniqueId == "undefined") 
            {
                this.m_uniqueId = id;
                ++id;
            }
            return this.m_uniqueId;
        };
    }
})();

BattleCharacterData.prototype.GetPosition = function()
{
	var result = new Vector3(
		this.m_character.GetValue(s_nodeNameCombatPosX),
		this.m_character.GetValue(s_nodeNameCombatPosY),
		this.m_character.GetValue(s_nodeNameCombatPosZ)
		);
	return result;
}

BattleCharacterData.prototype.GetAlive = function()
{
	return this.m_character.GetValue(s_nodeNameCombatAlive);
}

BattleCharacterData.prototype.BattleOver = function()
{
	this.m_arrayAction.forEach(function(in_item)
	{
		in_item.DeadTick();
	});
	this.m_battleReport.BattleFinish();
}

BattleCharacterData.prototype.Tick = function(in_timeDelta, in_battleDistanceStore, in_battleView, in_arenaLow, in_arenaHigh)
{
	this.m_character.GetModifier(s_modifierEntityBattle).Tick(in_timeDelta);

	if (false == this.GetAlive())
	{
		this.m_arrayAction.forEach(function(in_item)
		{
			in_item.DeadTick();
		});
	
		if (s_gameDrawAction.e_dead != this.m_action)
		{
			this.m_actionTime = 0.0;
		}
		else
		{
			this.m_actionTime += in_timeDelta;	
		}
		this.m_action = s_gameDrawAction.e_dead;
		return;
	}
	else if (this.m_action == s_gameDrawAction.e_dead)
	{
		//resurect
		this.m_action = s_gameDrawAction.e_idle;
		this.m_actionTime = 0.0;
	}

	//tick the actions while alive
	var self = this;
	var sumAcceleration = new Vector3(0.0, 0.0, -9.8);
	var arrayActionTarget = [];
	this.m_arrayAction.forEach(function(in_item)
	{
		in_item.Tick(in_battleDistanceStore, in_battleView, in_timeDelta, self, sumAcceleration, arrayActionTarget);
	});
	
	//calculate where we would like to move
	this.CalculatePotentialMove(in_timeDelta, in_battleDistanceStore, sumAcceleration, arrayActionTarget, in_arenaLow, in_arenaHigh)	
}

BattleCharacterData.prototype.PostTick = function()
{
	if (false == this.GetAlive())
	{
		return;
	}

	//ApplyPotentialMove
	var modifierAi = this.m_character.GetModifier(s_modifierEntityAi);
	modifierAi.SetPosition(this.m_potentialMove);	
}


BattleCharacterData.prototype.CalculatePotentialMove = function(in_timeDelta, in_battleDistanceStore, in_sumAcceleration, in_arrayActionTarget, in_arenaLow, in_arenaHigh)
{
	if (in_timeDelta <= 0.0)
	{
		return;
	}

	var oldPos = this.GetPosition();
	
	//push apart anyone standing too close
	this.PushAppart(in_sumAcceleration, in_battleDistanceStore);

	//general team adheasion
	this.PlayerPushAppart(
		in_sumAcceleration, 
		in_arrayActionTarget,
		in_battleDistanceStore, 
		true, 
		this.m_character.GetValue(s_nodeNameTeamDistance),
		this.m_character.GetValue(s_nodeNameTeamWeight)
		);

	//general opponent avoidance
	this.PlayerPushAppart(
		in_sumAcceleration, 
		in_arrayActionTarget,
		in_battleDistanceStore, 
		false, 
		this.m_character.GetValue(s_nodeNameOpponentDistance),
		this.m_character.GetValue(s_nodeNameOpponentWeight)
		);
		
	//apply sum acceleration
	this.m_velocity.m_x = in_sumAcceleration.m_x * in_timeDelta;
	this.m_velocity.m_y = in_sumAcceleration.m_y * in_timeDelta;
	this.m_velocity.m_z = in_sumAcceleration.m_z * in_timeDelta;
	
	//limit x,y movement for character speed?
	
	this.m_potentialMove.m_x = oldPos.m_x + (this.m_velocity.m_x * in_timeDelta);
	this.m_potentialMove.m_y = oldPos.m_y + (this.m_velocity.m_y * in_timeDelta);
	this.m_potentialMove.m_z = oldPos.m_z + (this.m_velocity.m_z * in_timeDelta);

	//clamp
	this.m_potentialMove.m_x = Math.max(in_arenaLow.m_x + 1.0, Math.min(in_arenaHigh.m_x - 1.0, this.m_potentialMove.m_x)); 
	this.m_potentialMove.m_y = Math.max(in_arenaLow.m_y + 2.0, Math.min(in_arenaHigh.m_y - 1.0, this.m_potentialMove.m_y)); 
	this.m_potentialMove.m_z = Math.max(0.0, this.m_potentialMove.m_z); 
	
	this.m_velocity.m_x = (this.m_potentialMove.m_x - oldPos.m_x) / in_timeDelta;
	this.m_velocity.m_y = (this.m_potentialMove.m_y - oldPos.m_y) / in_timeDelta;
	this.m_velocity.m_z = (this.m_potentialMove.m_z - oldPos.m_z) / in_timeDelta;
	
}

BattleCharacterData.prototype.PushAppart = function(inout_sumAcceleration, in_battleDistanceStore)
{
	//array of alive people who are within 1m of me
	var arrayPeople = in_battleDistanceStore.GetArrayDistanceFiltered(this, true, false, false, undefined, 1.0);
	
	arrayPeople.forEach(function(in_item)
	{
		var force = 10.0 * (1.0 - in_item.m_distance);
		inout_sumAcceleration.m_x -= (force * in_item.m_vector.m_x);
		inout_sumAcceleration.m_y -= (force * in_item.m_vector.m_y);
		inout_sumAcceleration.m_z -= (force * in_item.m_vector.m_z);
	});	
}

BattleCharacterData.prototype.PlayerPushAppart = function(
	inout_sumAcceleration, 
	in_arrayActionTarget,
	in_battleDistanceStore, 
	in_teamMembers, 
	in_idealDistance,
	in_idealWeight
	)
{
	if (in_idealWeight <= 0.0)
	{
		return;
	}
	
	var force = this.m_character.GetValue(s_nodeNameSpeed) * in_idealWeight;

	//array of alive people who are within 1m of me
	var arrayPeople = in_battleDistanceStore.GetArrayDistanceFiltered(this, true, (false == in_teamMembers), (true == in_teamMembers));
	
	ArraySubtract(arrayPeople, in_arrayActionTarget);

	//is this a good idea, use intelegence bonus to determin how many people the ai can keep track off
	var maxPeople = Math.max(1, Math.ceil(this.m_character.GetValue(s_nodeNameIntelegenceBonus)));	
	var count = Math.min(arrayPeople.length, maxPeople);

	for (var index = 0; index < count; ++index)
	{
		var peopleData = arrayPeople[index];
		var localForce = force;
		if (in_idealDistance < peopleData.m_distance)
		{
			localForce = -force;
		}
		if (0 == in_arrayActionTarget.length)
		{
			localForce *= Math.min(10.0, Math.abs(in_idealDistance - peopleData.m_distance));
		}		
		
		inout_sumAcceleration.m_x -= (localForce * peopleData.m_vector.m_x);
		inout_sumAcceleration.m_y -= (localForce * peopleData.m_vector.m_y);
		inout_sumAcceleration.m_z -= (localForce * peopleData.m_vector.m_z);		
	}
	
}
		