// battleaction.js
var s_battleActionType = {
  "e_physicalAttack" : 0,
  "e_physicalAttackRange" : 1,
  "e_magicAttack" : 2,
  "e_magicAttackRange" : 3,
  "e_buff" : 4,
  "e_heal" : 5,
  "e_resurect" : 6 //like e_buff, but targets people who are dead
  };

//is this they play to own battle stats and ai?
function BattleAction(in_name, in_type, in_data)
{
	//DEBUG if (DEBUG && !(this instanceof BattleAction) )
	//DEBUG {
	//DEBUG 	alert("BattleAction: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_name = in_name;
	this.m_type = in_type;
	this.m_reloadCountdown = 0.0;
	this.m_rangeAmmo = in_data["Ammo"] || 1;
	this.m_data = in_data;

	if (s_battleActionType.e_buff == in_type)
	{
		this.m_modifierLock = new BattleActionModifierLock(in_data["Target"], in_data["Value"]);
	}
}

BattleAction.prototype.DeadTick = function()
{
	if (s_battleActionType.e_buff == this.m_type)
	{
		this.m_modifierLock.SetTargetCharacter(null);
	}
}

//perform action if we can find a target
//inout_arrayActionTarget is an array of BattleDistanceStoreData
BattleAction.prototype.Tick = function(in_battleDistanceStore, in_battleView, in_timeDelta, in_battleCharacterDataOwner, inout_sumAcceleration, inout_arrayActionTarget)
{
	if (0.0 < this.m_reloadCountdown)
	{
		this.m_reloadCountdown -= in_timeDelta;
	}
	
	//is this the first action to select a target? if so, move towards
	this.MoveTowardsTarget(in_battleDistanceStore, in_battleCharacterDataOwner, inout_sumAcceleration, inout_arrayActionTarget);

	//perform action if anything is in range
	switch (this.m_type)
	{
	case s_battleActionType.e_physicalAttack:
		this.AttackTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, s_nodeNameStrengthBonus, this.m_data["Str bonus"], s_nodeNameResistPhysical);
		break;
	case s_battleActionType.e_physicalAttackRange:
		this.AttackRangeTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, s_nodeNameStrengthBonus, s_nodeNameResistPhysical, 64, 64, 64);
		break;
	case s_battleActionType.e_magicAttack:
		this.AttackTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, s_nodeNameIntelegenceBonus, this.m_data["Int bonus"], s_nodeNameResistMagic);
		break;
	case s_battleActionType.e_magicAttackRange:
		this.AttackRangeTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, s_nodeNameIntelegenceBonus, s_nodeNameResistMagic, 255, 0, 255);
		break;
	case s_battleActionType.e_heal:
		this.HealTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView);
		break;
	case s_battleActionType.e_buff:
		this.BuffTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView);
		break;
	case s_battleActionType.e_resurect:
		this.ResurectTick(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView);
		break;
	default:	
	}
}

BattleAction.prototype.MoveTowardsTarget = function(in_battleDistanceStore, in_battleCharacterDataOwner, inout_sumAcceleration, inout_arrayActionTarget)
{
	if ((0 < inout_arrayActionTarget.length) ||
		(0.0 < this.m_reloadCountdown) ||
		(this.m_rangeAmmo <= 0))
	{
		return;
	}			
	
	//select the ideal target for the action
	var idealTargetDistanceStoreData = this.SelectIdealTarget(in_battleDistanceStore, in_battleCharacterDataOwner);
	
	if (null == idealTargetDistanceStoreData)
	{
		return;
	}
	
	inout_arrayActionTarget.push(idealTargetDistanceStoreData);

	//add to sum acceleration
	var idealRange = this.GetAverageRange();
	var maxAcceleration = this.GetMaxAcceleration(in_battleCharacterDataOwner);
	var force = maxAcceleration;
	if (idealRange < idealTargetDistanceStoreData.m_distance)
	{
		force = -maxAcceleration;
	}
	
	inout_sumAcceleration.m_x -= (idealTargetDistanceStoreData.m_vector.m_x * force);
	inout_sumAcceleration.m_y -= (idealTargetDistanceStoreData.m_vector.m_y * force);
	inout_sumAcceleration.m_z -= (idealTargetDistanceStoreData.m_vector.m_z * force);
	
	//window.defaultStatus = "MoveTowardsTarget " + idealTargetDistanceStoreData.m_vector.m_x + " " + idealTargetDistanceStoreData.m_vector.m_y + " " + idealTargetDistanceStoreData.m_vector.m_z;		
}

//select the target we most want to hit anywhere on the battlefield
BattleAction.prototype.SelectIdealTarget = function(in_battleDistanceStore, in_battleCharacterDataOwner)
{
	var alive = this.GetTargetAlive();
	var opponentOnly = this.GetTargetOpponentOnly();
	var teamOnly = (false == opponentOnly);
		
	var arrayBattleDistanceStoreData = in_battleDistanceStore.GetArrayDistanceFiltered(in_battleCharacterDataOwner, alive, opponentOnly, teamOnly, !alive);
	var bestTarget = in_battleCharacterDataOwner.m_character.GetModifier(s_modifierEntityAi).FilterList(arrayBattleDistanceStoreData, opponentOnly); 
	
	return bestTarget;
}

//select best target within range
BattleAction.prototype.SelectBestInrangeTarget = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_alive, in_opponentOnly, in_teamOnly, in_rangeMax, in_rangeMin, in_dead)
{
	var arrayBattleDistanceStoreData = in_battleDistanceStore.GetArrayDistanceFiltered(in_battleCharacterDataOwner, in_alive, in_opponentOnly, in_teamOnly, in_rangeMin, in_rangeMax, in_dead);
	var bestTarget = in_battleCharacterDataOwner.m_character.GetModifier(s_modifierEntityAi).FilterList(arrayBattleDistanceStoreData, in_opponentOnly); 

	return bestTarget;
}

BattleAction.prototype.SelectBestHealTarget = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_rangeMax, in_rangeMin)
{
	var arrayBattleDistanceStoreData = in_battleDistanceStore.GetArrayDistanceFiltered(in_battleCharacterDataOwner, true, false, true, in_rangeMin, in_rangeMax);
	
	//if min range is zero then add ourself to the array of data
	if ((undefined != in_rangeMin) &&
		(0.0 == in_rangeMin))
	{	
		arrayBattleDistanceStoreData.unshift(new BattleDistanceStoreData(
			in_battleCharacterDataOwner.GetUniqueId(), 
			in_battleCharacterDataOwner, 
			0.0, 
			new Vector3()
			));
	}
	
	if (1 == arrayBattleDistanceStoreData.length)
	{
		return arrayBattleDistanceStoreData[0];
	}
	
	arrayBattleDistanceStoreData = in_battleCharacterDataOwner.m_character.GetModifier(s_modifierEntityAi).FilterArray(arrayBattleDistanceStoreData, s_modifierAiTargetPriority.e_mostDamage);
	return arrayBattleDistanceStoreData[0];
}


//{ "Range Max" : 1.0, "Reload" : 0.75, "Damage" : 0.5, "Aura Factor" : 1.0, "Armour Factor" : 0.1, "Str bonus" : 0.25 }//s_nodeNameStrengthBonus
BattleAction.prototype.AttackTick = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, in_bonusName, in_bonus, in_nodeNameResist)
{
	if (0.0 < this.m_reloadCountdown)
	{
		return;
	}
	
	var target = this.SelectBestInrangeTarget(in_battleDistanceStore, in_battleCharacterDataOwner, true, true, false, this.m_data["Range Max"], this.m_data["Range Min"]);
	if (!target)
	{
		return;
	}
	this.m_reloadCountdown = this.m_data["Reload"];
	var targetCharacter = target.m_battleCharacterData.m_character;
	var sourceCharacter = in_battleCharacterDataOwner.m_character;
	
	var damage = this.m_data["Damage"] + (in_bonus * sourceCharacter.GetValue(in_bonusName));
			
	damage *= (1.0 - targetCharacter.GetValue(in_nodeNameResist));
	var damageDone = targetCharacter.GetModifier(s_modifierEntityBattle).TakeDamage(damage, this.m_data["Aura Factor"], this.m_data["Armour Factor"]);

	if (0.0 < damageDone)
	{
		in_battleView.AddNote("Hit: " + damageDone.toFixed(1), target.m_battleCharacterData.GetPosition(), "#FF0000");
	}
	else
	{
		in_battleView.AddNote("Miss", target.m_battleCharacterData.GetPosition(), "#00FF00");
	}	
	
	target.m_battleCharacterData.m_battleReport.AddReceived(this.m_name, damageDone);
	in_battleCharacterDataOwner.m_battleReport.AddCaused(this.m_name, damageDone);		
}

//{ "Range Max" : 1.0, "Reload" : 0.75, "Damage" : 0.5, "Aura Factor" : 1.0, "Armour Factor" : 0.1} //s_nodeNameStrengthBonus
BattleAction.prototype.AttackRangeTick = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView, in_bonusType, in_nodeNameResist, in_traceFillRed, in_traceFillGreen, in_traceFillBlue)
{
	if ((0.0 < this.m_reloadCountdown) ||
		(this.m_rangeAmmo <= 0))
	{
		return;
	}
	
	var target = this.SelectBestInrangeTarget(in_battleDistanceStore, in_battleCharacterDataOwner, true, true, false, this.m_data["Range Max"], this.m_data["Range Min"]);
	if (!target)
	{
		return;
	}
	
	var targetCharacter = target.m_battleCharacterData.m_character;
	var sourceCharacter = in_battleCharacterDataOwner.m_character;

	//strength bonus used for reload	
	this.m_reloadCountdown = this.GetRangeReloadTime(sourceCharacter, in_bonusType);
	this.m_rangeAmmo -= 1;

	var damage = this.m_data["Damage"];
			
	damage *= (1.0 - targetCharacter.GetValue(in_nodeNameResist));
	var damageDone = targetCharacter.GetModifier(s_modifierEntityBattle).TakeDamage(damage, this.m_data["Aura Factor"], this.m_data["Armour Factor"]);

	if (0.0 < damageDone)
	{
		in_battleView.AddNote("Hit: " + damageDone.toFixed(1), target.m_battleCharacterData.GetPosition(), "#FF0000");		
	}
	else
	{
		in_battleView.AddNote("Miss", target.m_battleCharacterData.GetPosition(), "#00FF00");
	}	

	var posStart = in_battleCharacterDataOwner.GetPosition();
	posStart.m_y -= 1.0;
	var posFinish = target.m_battleCharacterData.GetPosition();
	posFinish.m_y -= 0.75;
	in_battleView.AddTrace(
		posStart, 
		posFinish, 
		in_traceFillRed, 
		in_traceFillGreen, 
		in_traceFillBlue
		);
		
	target.m_battleCharacterData.m_battleReport.AddReceived(this.m_name, damageDone);
	in_battleCharacterDataOwner.m_battleReport.AddCaused(this.m_name, damageDone);		
}

//{ "Range Min" : 0.0, "Range Max" : 1.5, "Reload" : 0.75, "Heal" : 0.5 } //if Range Min == 0, can heal self
BattleAction.prototype.HealTick = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView)
{
	if ((0.0 < this.m_reloadCountdown) ||
		(this.m_rangeAmmo <= 0))
	{
		return;
	}
	
	var target = this.SelectBestHealTarget(in_battleDistanceStore, in_battleCharacterDataOwner, this.m_data["Range Max"], this.m_data["Range Min"]);
	if (!target)
	{
		return;
	}
	
	var targetCharacter = target.m_battleCharacterData.m_character;
	if (targetCharacter.GetValue(s_nodeNameCombatHitPointDamage) <= 0.0)
	{
		return;
	}
	
	var heal = this.m_data.Heal * (1.0 - targetCharacter.GetValue(s_nodeNameResistMagic));
	var damage = targetCharacter.GetValue(s_nodeNameCombatHitPointDamage);
	if (damage < (heal * 0.5))
	{
		//don't wate heal spells
		return;
	}

	var sourceCharacter = in_battleCharacterDataOwner.m_character;
	this.m_reloadCountdown = this.GetRangeReloadTime(sourceCharacter, s_nodeNameIntelegenceBonus);
	this.m_rangeAmmo -= 1;

	targetCharacter.GetModifier(s_modifierEntityBattle).AddDamageHealth(-heal);

	in_battleView.AddNote("Heal: " + heal.toFixed(1), target.m_battleCharacterData.GetPosition(), "#00FF00");		

	var posStart = in_battleCharacterDataOwner.GetPosition();
	posStart.m_y -= 1.0;
	var posFinish = target.m_battleCharacterData.GetPosition();
	posFinish.m_y -= 0.75;
	in_battleView.AddTrace(
		posStart, 
		posFinish, 
		0, 
		255, 
		0
		);	
		
	target.m_battleCharacterData.m_battleReport.AddReceived(this.m_name, heal);
	in_battleCharacterDataOwner.m_battleReport.AddCaused(this.m_name, heal);					
}

//{ "Range Min" : 0.0, "Range Max" : 1.5, "Reload" : 0.75, "Value" : 0.5, "Name" : "Str", "Target" : s_nodeNameStrength }
BattleAction.prototype.BuffTick = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView)
{
	if ((0.0 < this.m_reloadCountdown) ||
		(this.m_rangeAmmo <= 0))
	{
		return;
	}

	var target = this.SelectBestInrangeTarget(in_battleDistanceStore, in_battleCharacterDataOwner, true, false, true, this.m_data["Range Max"], this.m_data["Range Min"]);
	if (!target)
	{
		return;
	}

	var targetCharacter = target.m_battleCharacterData.m_character;
	var sourceCharacter = in_battleCharacterDataOwner.m_character;

	this.m_reloadCountdown = this.GetRangeReloadTime(sourceCharacter, s_nodeNameIntelegenceBonus);
	this.m_rangeAmmo -= 1;
	
	this.m_modifierLock.SetTargetCharacter(targetCharacter);

	in_battleView.AddNote("Buff " + this.m_data["Name"], target.m_battleCharacterData.GetPosition(), "#0000FF");		
	var posStart = in_battleCharacterDataOwner.GetPosition();
	posStart.m_y -= 1.0;
	var posFinish = target.m_battleCharacterData.GetPosition();
	posFinish.m_y -= 0.75;
	in_battleView.AddTrace(
		posStart, 
		posFinish, 
		0, 
		0, 
		255
		);	
		
	target.m_battleCharacterData.m_battleReport.AddReceived(this.m_name, 1.0);
	in_battleCharacterDataOwner.m_battleReport.AddCaused(this.m_name, 1.0);			
}

//{ "Range Max" : 1.5, "Reload" : 5.0, "Health" : 1.0, "Ammo" : 10 }
BattleAction.prototype.ResurectTick = function(in_battleDistanceStore, in_battleCharacterDataOwner, in_battleView)
{
	if ((0.0 < this.m_reloadCountdown) ||
		(this.m_rangeAmmo <= 0))
	{
		return;
	}

	var target = this.SelectBestInrangeTarget(in_battleDistanceStore, in_battleCharacterDataOwner, false, false, true, this.m_data["Range Max"], this.m_data["Range Min"], true);
	if (!target)
	{
		return;
	}

	var targetCharacter = target.m_battleCharacterData.m_character;
	var sourceCharacter = in_battleCharacterDataOwner.m_character;

	this.m_reloadCountdown = this.GetRangeReloadTime(sourceCharacter, s_nodeNameIntelegenceBonus);
	this.m_rangeAmmo -= 1;
	
	var health = targetCharacter.GetValue(s_nodeNameHitPoint);
	var modifer = targetCharacter.GetModifier(s_modifierEntityBattle);
	var damage = Math.max(0.0, health - this.m_data["Health"]);
	modifer.SetDamageHealth(damage);
	modifer.SetAlive(true);

	in_battleView.AddNote("Resurect", target.m_battleCharacterData.GetPosition(), "#00FF00");
	
	target.m_battleCharacterData.m_battleReport.AddReceived(this.m_name, 1.0);
	in_battleCharacterDataOwner.m_battleReport.AddCaused(this.m_name, 1.0);		
}

BattleAction.prototype.GetRangeReloadTime = function(in_character, in_statBonusName)
{
	var reloadTime = this.m_data["Reload"];
	var modifier = in_character.GetValue(in_statBonusName); //presume log of str or int or something, rem ln(2) = 0.7, ln(10) = 2.3, ln(100) = 4.6 
	var mul = Math.max(0.1, Math.min(1.0, ((5.0 - modifier) / 4.0)));
	return reloadTime * mul;
}

BattleAction.prototype.GetAverageRange = function()
{
	var average = 0.0;
	var rangeMax = (typeof this.m_data["Range Max"] != "undefined");
	var rangeMin = (typeof this.m_data["Range Min"] != "undefined");
	if ((true == rangeMax) && (true == rangeMin))
	{
		return (this.m_data["Range Max"] + this.m_data["Range Min"]) * 0.5;
	}
	if (true == rangeMax)
	{
		return (this.m_data["Range Max"]);
	}
	if (true == rangeMin)
	{
		return (this.m_data["Range Min"]);
	}
	return 0.0;
}

BattleAction.prototype.GetMaxAcceleration = function(in_battleCharacterDataOwner)
{
	var maxSpeed = 10.0 * in_battleCharacterDataOwner.m_character.GetValue(s_nodeNameSpeed);
	return maxSpeed;
}

BattleAction.prototype.GetTargetAlive = function()
{
	if (this.m_type == s_battleActionType.e_resurect)
	{
		return false;
	}
	return true;
}

BattleAction.prototype.GetTargetOpponentOnly = function()
{
	switch (this.m_type)
	{
	case s_battleActionType.e_buff:
	case s_battleActionType.e_heal:
	case s_battleActionType.e_resurect:
		return false;
	default:
	}
	
	return true;
}
