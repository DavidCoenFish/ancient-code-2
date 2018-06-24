/*
interface

BeginNewTurn()
CanContinueCombat()
CauseDamage(in_damage, in_severityDamage, in_faithDamage);

DrawWeapon()
GetAttackBonus();
GetAttackCount();
GetAttackName(in_index);
GetAttributePerception()
GetAttributeAgility()
GetCombatLevel()
GetDamage()
GetDefense()
GetInititive()
GetName()
GetRecoveryTime();
GetSize()
GetSurpriseModifier()
GetDamage(attackIndex);
GetSeverityDamage(attackIndex, attackRoll, targetDefence);
GetFaithDamage(attackIndex, target);
IsWeaponDrawn()
SetInititive(in_value)
SetSegment(in_segment)
StartNewTurn()

*/

LegendaryQuest.Combat.Combatant = function()
{
	alert("LegendaryQuest.Combat.Combatant: abstract class, do not construct");	
}

LegendaryQuest.Combat.Combatant.FactoryCharacter = function(in_character)
{
	return new LegendaryQuest.Combat.Combatant_Character(in_character);
}

LegendaryQuest.Combat.Combatant.FactoryMonster = function(in_monster)
{
	return new LegendaryQuest.Combat.Combatant_Monster(in_monster);
}

