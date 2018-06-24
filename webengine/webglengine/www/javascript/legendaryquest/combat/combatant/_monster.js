LegendaryQuest.Combat.Combatant_Monster = function(in_monster)
{
	if (!(this instanceof LegendaryQuest.Combat.Combatant_Monster))
		alert("LegendaryQuest.Combat.Combatant_Monster: call constuctor with new keyword");

	this.m_monster = in_monster;
	this.m_inititive = 0;
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetName = function() 
{
	return this.m_monster.m_name;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.CanContinueCombat = function() 
{
	return (0 < this.m_monster.GetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyDamage));
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetSurpriseModifier = function() 
{
	return this.m_monster.m_data.m_surpriseAdjust;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetAttributePerception = function() 
{
	return this.m_monster.GetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModified);
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetAttributeAgility = function() 
{
	return this.m_monster.GetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModified);
}

LegendaryQuest.Combat.Combatant_Monster.prototype.BeginNewTurn = function() 
{
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.SetInititive = function(in_value, in_surprisePenalty) 
{
	this.m_inititive = in_value + in_surprisePenalty;
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetInititive = function()
{
	return this.m_inititive;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.IsWeaponDrawn = function() 
{
	return true;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.DrawWeapon = function() 
{
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.StartNewTurn = function() 
{
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.SetSegment = function(in_segment)
{
	this.m_segment = in_segment;
	return;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetCombatLevel = function()
{
	return this.m_monster.m_data.m_combatLevel;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetSize = function()
{
	return this.m_monster.m_data.m_size;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetRecoveryTime = function()
{
	return this.m_monster.m_data.m_recoveryTime; 
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetAttackCount = function()
{
	return this.m_monster.m_data.m_arrayAttackName.length; 
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetAttackBonus = function()
{
	return this.m_monster.m_data.m_attackBonus;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetDefense = function()
{
	return this.m_monster.m_data.m_defense;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetAttackName = function(in_index)
{
	return this.m_monster.m_data.m_arrayAttackName[in_index];
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetDamage = function(in_index)
{
	var data = this.m_monster.m_data.m_damagePerAttack[in_index];
	var damage = LegendaryQuest.Roll.DiceCount(data.m_dice, data.m_diceCount); 
	return damage;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetSeverityDamage = function(in_index, in_attackRoll, in_targetDefence)
{
	var data = this.m_monster.m_data.m_damagePerAttack[in_index];
	if (true != data.m_causeSeverityDamage)
	{
		return 0;
	}
	return Math.max(0, in_attackRoll - in_targetDefence);
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetFaithDamage = function(in_attackIndex, in_target)
{
	return 0;
}

LegendaryQuest.Combat.Combatant_Monster.prototype.GetDamage = function()
{
	return this.m_monster.GetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyDamage);
}

LegendaryQuest.Combat.Combatant_Monster.prototype.CauseDamage = function(in_damage, in_severityDamage, in_faithDamage)
{
	var totalDamage = in_damage;
	if (true == this.m_monster.m_data.m_effectedBySeverityDamage)
		totalDamage += in_severityDamage;
	if (true == this.m_monster.m_data.m_effectedByFaithDamage)
		totalDamage += in_faithDamage;
	var totalDamage = Math.max(1, totalDamage - this.m_monster.m_data.m_absorption);

	var damagePhysical = this.m_monster.GetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyDamagePhysical);
	this.m_monster.SetStatistic(LegendaryQuest.Rules.DNGKey.s_dngKeyDamagePhysical, damagePhysical + totalDamage);

	return totalDamage;
}
