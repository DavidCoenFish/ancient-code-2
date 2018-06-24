LegendaryQuest.Combat.Side = function(_arrayCombatants, _surprise, in_name)
{
	if (!(this instanceof LegendaryQuest.Combat.Side))
		alert("LegendaryQuest.Combat.Side: call constuctor with new keyword");

	this.m_arrayCombatants = (undefined == _arrayCombatants) ? [] : _arrayCombatants;
	this.m_surprise = (undefined == _surprise) ? LegendaryQuest.Combat.Enum.s_surprise.TNone : _surprise;
	this.m_name = in_name;
	return;
}

LegendaryQuest.Combat.Side.prototype.GetName = function() 
{
	return this.m_name;
}

LegendaryQuest.Combat.Side.prototype.CalculateCanContinue = function()
{
	var canContinueCombat = false;

	this.m_arrayCombatants.forEach( function(combatant)
	{
		canContinueCombat |= combatant.CanContinueCombat();
	});

	return canContinueCombat;
}

LegendaryQuest.Combat.Side.prototype.GetSurprise = function()
{
	return this.m_surprise;
}

LegendaryQuest.Combat.Side.prototype.GetCombatantCount = function()
{
	return this.m_arrayCombatants.length;
}

LegendaryQuest.Combat.Side.prototype.GetCombatant = function(in_index)
{
	return this.m_arrayCombatants[in_index];
}

LegendaryQuest.Combat.Side.FactoryRaw = function(_arrayCombatants, _surprise, in_name)
{
	return new LegendaryQuest.Combat.Side(_arrayCombatants, _surprise, in_name);
}

