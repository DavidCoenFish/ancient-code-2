LegendaryQuest.Combat.Combatant_Character = function(in_character)
{
	if (!(this instanceof LegendaryQuest.Combat.Combatant_Character))
		alert("LegendaryQuest.Combat.Combatant_Character: call constuctor with new keyword");

	this.m_character = in_character;
	return;
}
