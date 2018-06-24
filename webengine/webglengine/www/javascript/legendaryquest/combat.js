/*
segment (1 sec)
turn (10 sec)

hand to hand
	inititive 1d10
	winner of inititive can gain flurry of attacks is difference and recover time permits
	hand held or polearm require min of 1 sec

range
	no inititive, just fire time (time to draw weapon?)

attack roll 1d30
	auto hit on natural 28, 29, or 30
	auto miss on natural 1, 2, 3
	on natural 1, range weapon hits random target with additional 1d10 severity damage

basic damage
	damage dice of weapon + magic adjust + (if hand held or polearm, add PS) + 
		(if shot or throwns, add ceil(PS/2)) + severity damage if applicable

	fired and entrapment weapons down adjust for strength (pistole, crossbow)
	entrapment weapons never cause severity damage

severity damage 
	= (attack roll + attack bonus) - target defense

faith damager
	(applies only to non-living creatures) is assailant and target have differing alignments (good, evil)
	add FAITH attribute to basic damage	(including if faith is negative)

surprise
	both sides make perception checks, 1d10 + best perception on side + bonus or penality
	side with lowest perception is surprised. 
	difference is nb segments of surprise, an initiative penalty.
	ambushing side can use agility check, and not 'lose' (gain no surprise from hidden attack)


if character unconcious/ knocked out. 
	defence = 0
if asleep
	defence = (character level / 2) + perception
if unaware, for the first blow
	defence = ceil(defence / 4)
does take time to draw weapon, so defence is without parry, combat level

defender is conscious and aware of danger
	defence = ceil(defence / 2)

fighting blind.
	ceil(attack bonus / 2)
defending blind against a sighted opponent, ceil(defence / 2)
both parties blind, no change to defence
- roll randomly to see who is hit if attacking blind

every 2 points sacrificed from attack bonus give parry  bonus while (0 <= attack bonus)
	and one more parry point if no atack made

draw small weapon, +1 initiative, medium +2, large + 3

parry doesn't work against range, target at distance assumed to have a parry of 5 (unless hand held weapon)

using range in combat, no parry, and ceil(defence * 3/4) and a solid blow may stop the attack 
avoidance roll of manual dexterity against threashold of 15 + amount of damage of each blow
(spell mage) avoidance roll of willpower against threashold of 15 + amount of damage of each blow
(spell priest) avoidance roll of faith against threashold of 15 + amount of damage of each blow


range into combat without clean line of sight, then subject to initive roll
(fire time is when you can be ready by, inititive is when you have opourtunity to attack. you can miss your attack in a turn)

hand to hand with different combat level (average for side) gains one extra attack per 2 level difference (round down) per flurry

hand held of polearm, roll 1 of 1d30 - fumble
roll 1d30, 
on 1 - 10: minor fumble, lose parry, ceil(combat level / 2) untill next attack, loose next attack to recover weapon, unless draw another
parry of weapon only cound in second of drop, after is zero
11 - 20: moderate, tripped, defence is half untill next turns initiative, lost of any attacks
21 - 30: major fumble: weapon breaks on luck roll vrs crushing blow. Physical strength of wielder is added to the threashold of the luck roll

acrobats have chance at avoiding fumble with attribute checks

similar wepon to proficient, -4 to attack bonus

weapon in each hand, coordination effects attack bonus, plus handedness and skill florentine
without florentine, weapon level halfed, 
parry is improved (max (+ 1 if skill florentine))


Buckler Shield, +1 4
Shield med, +2 8
Shield lg, +3 12

Combat.Fight(_environment, _sideOne, _sideTwo, _combatLog)
	sideOne.m_state
	surprise,
	is there hand to hand, close distance, inititive
	is there range, do range attacks

	resolve each turn

combat has no state
*/

LegendaryQuest.Combat = function(in_environment, in_sideOne, in_sideTwo)
{
	if (!(this instanceof LegendaryQuest.Combat))
		alert("LegendaryQuest.Combat: call constuctor with new keyword");

	this.m_environment = in_environment;
	this.m_sideOne = in_sideOne;
	this.m_sideTwo = in_sideTwo;

	this.m_doneSurprise = false;
}

LegendaryQuest.Combat.prototype.TestContinue = function(_context)
{
	//is any player on either side able to continue combat
	var sideOneCanContinue = this.m_sideOne.CalculateCanContinue();
	var sideTwoCanContinue = this.m_sideTwo.CalculateCanContinue();
	if ((true == sideOneCanContinue) && (true == sideTwoCanContinue))
	{
		return true;
	}

	if (true == sideOneCanContinue)
	{
		if ((undefined != _context) &&
			(undefined != _context.SetSideOneWin))
		{
			_context.SetSideOneWin();
		}
		LegendaryQuest.Combat.Log(_context, "Combat ended with " + this.m_sideOne.GetName() + " as winner");
	}
	else if (true == sideTwoCanContinue)
	{
		if ((undefined != _context) &&
			(undefined != _context.SetSideTwoWin))
		{
			_context.SetSideTwoWin();
		}
		LegendaryQuest.Combat.Log(_context, "Combat ended with " + this.m_sideTwo.GetName() + " as winner");
	}
	else
	{
		if ((undefined != _context) &&
			(undefined != _context.SetSideDraw))
		{
			_context.SetSideDraw();
		}
		LegendaryQuest.Combat.Log("Combat ended in a draw");
	}

	return false;
}

LegendaryQuest.Combat.BeginNewTurnImplement = function(_context, in_side)
{
	var combatantCount = in_side.GetCombatantCount();
	for (var index = 0; index < combatantCount; ++index)
	{
		var combatant = in_side.GetCombatant(index);
		combatant.BeginNewTurn();
	}
}

LegendaryQuest.Combat.prototype.BeginNewTurn = function(_context)
{
	LegendaryQuest.Combat.BeginNewTurnImplement(_context, this.m_sideOne);
	LegendaryQuest.Combat.BeginNewTurnImplement(_context, this.m_sideTwo);
}

LegendaryQuest.Combat.CalculateInitiveRoll = function(_context, in_side, in_penalty)
{
	var combatantCount = in_side.GetCombatantCount();
	for (var index = 0; index < combatantCount; ++index)
	{
		var combatant = in_side.GetCombatant(index);
		var roll = LegendaryQuest.Roll.Dice(10);
		combatant.SetInititive(roll, in_penalty);
		LegendaryQuest.Combat.Log(_context, in_side.GetName() + "'s " + combatant.GetName() + " has an inititive of " + (in_penalty + roll) + " for hand to hand");
	}
}

LegendaryQuest.Combat.prototype.CalculateInitive = function(_context)
{
	this.CalculateSurprise(_context);

	LegendaryQuest.Combat.CalculateInitiveRoll(_context, this.m_sideOne, this.m_sideOneInititivePenalty);
	LegendaryQuest.Combat.CalculateInitiveRoll(_context, this.m_sideTwo, this.m_sideTwoInititivePenalty);

	return;
}

LegendaryQuest.Combat.CalculateSurpriseRoll = function(in_side, _context)
{
	var combatantCount = in_side.GetCombatantCount();
	var worstSurpriseModifier = undefined;
	for (var index = 0; index < combatantCount; ++index)
	{
		var combatant = in_side.GetCombatant(index);
		var surpriseModifier = combatant.GetSurpriseModifier();
		if ((undefined == worstSurpriseModifier) ||
			(surpriseModifier < worstSurpriseModifier))
		{
			worstSurpriseModifier = surpriseModifier;
		}
	}

	var bestCheck = undefined;
	var bestAttribute = undefined;
	var bestRoll = undefined;
	var bestIndex = undefined;
	var attributeName = "";
	switch (in_side.GetSurprise())
	{
	default:
		{
			attributeName = "Perception";
			for (var index = 0; index < combatantCount; ++index)
			{
				var combatant = in_side.GetCombatant(index);
				var perception = combatant.GetAttributePerception();
				var roll = LegendaryQuest.Roll.Dice(10);
				if ((undefined == bestCheck) ||
					(bestCheck < perception + roll + worstSurpriseModifier))
				{
					bestCheck = perception + roll + worstSurpriseModifier;
					bestAttribute = perception;
					bestRoll = roll;
					bestIndex = index;
				}
			}
		}
		break;
	case LegendaryQuest.Combat.Enum.s_surprise.TAwareOfOtherSide:
		{
			attributeName = "Agility";
			for (var index = 0; index < combatantCount; ++index)
			{
				var combatant = in_side.GetCombatant(index);
				var agility = combatant.GetAttributeAgility();
				var roll = LegendaryQuest.Roll.Dice(10);
				if ((undefined == bestCheck) ||
					(bestCheck < agility + roll + worstSurpriseModifier))
				{
					bestCheck = agility + roll + worstSurpriseModifier;
					bestAttribute = agility;
					bestRoll = roll;
					bestIndex = index;
				}
			}
		}
		break;
	}

	if (undefined == bestCheck)
	{
		bestCheck = 0;
	}

	if (undefined != bestIndex)
	{
		LegendaryQuest.Combat.Log(_context, in_side.GetName() + " Surprise Check against " + attributeName + " with best value from " + combatant.GetName() + " of " + bestCheck + " (" + bestAttribute + " + " + bestRoll + " + " + worstSurpriseModifier + ")");
	}
	return bestCheck;
}

LegendaryQuest.Combat.prototype.CalculateSurprise = function(_context)
{
	this.m_sideOneInititivePenalty = 0;
	this.m_sideTwoInititivePenalty = 0;

	if (true == this.m_doneSurprise)
		return;
	this.m_doneSurprise = true;

	//get the best perception (or agility) roll for either side
	var surpriseRollOne = LegendaryQuest.Combat.CalculateSurpriseRoll(this.m_sideOne, _context);
	var surpriseRollTwo = LegendaryQuest.Combat.CalculateSurpriseRoll(this.m_sideTwo, _context);

	//the lowest value indicates the inititive penalty of a side, 
	//if the side is ambusing, then they can take no penalty
	if (surpriseRollOne < surpriseRollTwo)
	{
		this.m_sideOneInititivePenalty = surpriseRollTwo - surpriseRollOne;
		if (LegendaryQuest.Combat.Enum.s_surprise.TAwareOfOtherSide == this.m_sideOne.GetSurprise())
		{
			this.m_sideOneInititivePenalty = 0;
		}
		LegendaryQuest.Combat.Log(_context, this.m_sideOne.GetName() + " lost surprise contest and get a " + this.m_sideOneInititivePenalty + " inititive penalty");
	}

	if (surpriseRollTwo < surpriseRollOne)
	{
		this.m_sideTwoInititivePenalty = surpriseRollOne - surpriseRollTwo;
		if (LegendaryQuest.Combat.Enum.s_surprise.TAwareOfOtherSide == this.m_sideTwo.GetSurprise())
		{
			this.m_sideTwoInititivePenalty = 0;
		}
		LegendaryQuest.Combat.Log(_context, this.m_sideTwo.GetName() + " lost surprise contest and get a " + this.m_sideTwoInititivePenalty + " inititive penalty");
	}

	return;
}

LegendaryQuest.Combat.AppendArrayBySizeFactor = function(inout_arrayTargetSide, in_combatant)
{
	var factor = 3;
	switch (in_combatant.GetSize())
	{
	default:
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TSmall:
		factor = 1;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TMedium:
		factor = 2;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TAverage:
		factor = 3;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TLarge:
		factor = 5;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TGreat:
		factor = 8;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.THuge:
		factor = 13;
		break;
	case LegendaryQuest.Bestiary.Enum.s_size.TImmense:
		factor = 21;
		break;
	}
	for (var index = 0; index < factor; ++index)
	{
		inout_arrayTargetSide.push(in_combatant);
	}
	return;
}

LegendaryQuest.Combat.AdvanceSegmentSide = function(inout_arrayCouldAttack, inout_arrayTargetSide, in_side, in_segment)
{
	for (var index = 0; index < in_side.GetCombatantCount(); ++index)
	{
		var combatant = in_side.GetCombatant(index);
		combatant.SetSegment(in_segment);
		if (true != combatant.CanContinueCombat())
			continue;
		if (combatant.GetInititive() <= in_segment)
		{
			inout_arrayCouldAttack.push(combatant);
		}
		LegendaryQuest.Combat.AppendArrayBySizeFactor(inout_arrayTargetSide, combatant);
	}

	return;
}

LegendaryQuest.Combat.AdvanceSegmentAttackCalculate = function(inout_attackAction, in_segment, in_combatant, in_target, _context)
{
	var inititive = in_combatant.GetInititive();
	if (in_segment < inititive)
		return;

	var combatLevel = in_combatant.GetCombatLevel();
	var targetCombatLevel = in_target.GetCombatLevel();
	var attackCount = in_combatant.GetAttackCount();
	var nbAttacks = attackCount + Math.max(0, Math.floor((combatLevel - targetCombatLevel) / 2));

	var targetInititive = in_target.GetInititive();
	var recoveryTime = in_combatant.GetRecoveryTime();
	var attackCountMul = Math.max(0, Math.floor((targetInititive - inititive) / Math.max(1, recoveryTime)));

	var attactSegment = in_segment - inititive;
	var attackIndex = undefined;

	//first group of attacks
	if (attactSegment < nbAttacks)
	{
		attackIndex = (attactSegment % attackCount);
	}
	else if (recoveryTime <= (targetInititive - inititive))
	{
		var attackTrace = attactSegment % recoveryTime;
		if (attackTrace < nbAttacks)
		{
			attackIndex = (attackTrace % attackCount);
		}
	}

	if (undefined == attackIndex)
		return;

	var roll = LegendaryQuest.Roll.Dice(30);
	var attackData = {
		m_roll : roll,
		m_combatant : in_combatant,
		m_target : in_target,
	};

	var attackRoll = roll + in_combatant.GetAttackBonus();
	var targetDefence = in_target.GetDefense();
	var hit = undefined;
	if ((28 == roll) ||
		(29 == roll) ||
		(30 == roll))
	{
		LegendaryQuest.Combat.Log(_context, "segement " + in_segment + " " + in_combatant.GetName() + " attacks " + in_target.GetName() + " and auto hits (" + roll + ")" );
		hit = true;
	}
	else if ((1 == roll) ||
		(2 == roll) ||
		(3 == roll))
	{
		hit = false;
		attackData.m_hit = hit;
		inout_attackAction.push(attackData);
		LegendaryQuest.Combat.Log(_context, "segement " + in_segment + " " + in_combatant.GetName() + " attacks " + in_target.GetName() + " but fumbles");
		return;
	}
	else
	{
		hit = targetDefence <= attackRoll;
		LegendaryQuest.Combat.Log(_context, "segement " + in_segment + " " + in_combatant.GetName() + " attacks " + in_target.GetName() + " and " + (hit ? "hits": "misses")+ " (" + targetDefence + " <= " + roll + " + " + in_combatant.GetAttackBonus() + ")");
	}

	if (true != hit)
	{
		return;
	}


	attackData.m_hit = hit;
	attackData.m_damage = in_combatant.GetDamage(attackIndex);
	attackData.m_severityDamage = in_combatant.GetSeverityDamage(attackIndex, attackRoll, targetDefence);
	attackData.m_faithDamage = in_combatant.GetFaithDamage(attackIndex, in_target);
	inout_attackAction.push(attackData);

	return;
}

LegendaryQuest.Combat.AdvanceSegmentAttackAction = function(inout_attackAction, in_segment, in_arrayCouldAttack, in_arrayTarget, _context)
{
	if (0 == in_arrayTarget.length)
		return;
	in_arrayCouldAttack.forEach( function(combatant)
	{
		var target = in_arrayTarget[Math.floor(Math.random() * in_arrayTarget.length)];
		LegendaryQuest.Combat.AdvanceSegmentAttackCalculate(inout_attackAction, in_segment, combatant, target, _context);
	});
}

LegendaryQuest.Combat.AdvanceSegmentAttackApply = function(in_attackAction, _context)
{
	in_attackAction.forEach( function(action)
	{
		if (false == action.m_hit)
		{
			//todo: fumble
			return;
		}

		var damage = action.m_target.CauseDamage(action.m_damage, action.m_severityDamage, action.m_faithDamage);

		LegendaryQuest.Combat.Log(_context, action.m_target.GetName() + " takes " + damage + " damage (" + action.m_damage + " + " + action.m_severityDamage + " + " + action.m_faithDamage + ") from " + action.m_combatant.GetName() + " leaving " + action.m_target.GetDamage());
	});
}

LegendaryQuest.Combat.prototype.AdvanceSegment = function(in_segment, _context)
{
	// for each character, are they past inititive
	var arrayCouldAttackOne = [];
	var arrayCouldAttackTwo = [];
	var arrayTargetSideOne = [];	
	var arrayTargetSideTwo = [];	

	LegendaryQuest.Combat.AdvanceSegmentSide(arrayCouldAttackOne, arrayTargetSideOne, this.m_sideOne, in_segment);
	LegendaryQuest.Combat.AdvanceSegmentSide(arrayCouldAttackTwo, arrayTargetSideTwo, this.m_sideTwo, in_segment);

	var attackAction = [];
	LegendaryQuest.Combat.AdvanceSegmentAttackAction(attackAction, in_segment, arrayCouldAttackOne, arrayTargetSideTwo, _context);
	LegendaryQuest.Combat.AdvanceSegmentAttackAction(attackAction, in_segment, arrayCouldAttackTwo, arrayTargetSideOne, _context);
	LegendaryQuest.Combat.AdvanceSegmentAttackApply(attackAction, _context);
}

LegendaryQuest.Combat.Log = function(_context, in_message)
{
	if ((undefined != _context) &&
		(undefined != _context.Log))
	{
		_context.Log(in_message);
	}
	return;
}

// turn is 10 seconds (or 10 segments)
/*
_context.SetSideOneWin();
_context.SetSideTwoWin();
_context.SetSideDraw();
_context.Log(in_message);
*/
LegendaryQuest.Combat.prototype.RunTurn = function(_context)
{
	//is anyone able to fight on both sides
	if (!this.TestContinue(_context))
		return false;

	this.BeginNewTurn(_context);

	//work out inititive (surprise, draw weapon, move time)
	this.CalculateInitive(_context);

	//combat, advance each second
	for (var index = 1; index <= 10; ++index)
	{
		this.AdvanceSegment(index, _context);

		//is anyone able to fight
		if (!this.TestContinue(_context))
			return false;
	}

	return true;
}

LegendaryQuest.Combat.FactoryRaw = function(in_environment, in_sideOne, in_sideTwo)
{
	return new LegendaryQuest.Combat(in_environment, in_sideOne, in_sideTwo);
}


//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		// sanity
		if (true == result)
		{
			var sideOne = LegendaryQuest.Combat.Side.FactoryRaw(
				[
					LegendaryQuest.Combat.Combatant.FactoryMonster(LegendaryQuest.Bestiary.Pool.CreateMonster("AntGiantWarrior", "w00D37A")),
					LegendaryQuest.Combat.Combatant.FactoryMonster(LegendaryQuest.Bestiary.Pool.CreateMonster("AntGiantWarrior", "w00D37B"))
				],
				LegendaryQuest.Combat.Enum.s_surprise.TNone,
				"Side Ants"
				);

			var sideTwo = LegendaryQuest.Combat.Side.FactoryRaw(
				[
					LegendaryQuest.Combat.Combatant.FactoryMonster(LegendaryQuest.Bestiary.Pool.CreateMonster("SpiderGiantAverage", "kkckckkc")),
					LegendaryQuest.Combat.Combatant.FactoryMonster(LegendaryQuest.Bestiary.Pool.CreateMonster("SpiderGiantAverage", "ckcckkck"))
				],
				LegendaryQuest.Combat.Enum.s_surprise.TNone,
				"Side Spider"
				);
			var environment = LegendaryQuest.Combat.Environment.FactoryRaw();
			var combat = LegendaryQuest.Combat.FactoryRaw(environment, sideOne, sideTwo);
			
			var context = {
				Log : function(in_message) { console.info(in_message); }
			};
			
			var resultCombat = true;
			while (resultCombat)
			{
				resultCombat = combat.RunTurn(context);
			}
			console.info("RunTurn result:" + resultCombat);

			if (!result)
				return "Fail: LegendaryQuest.Combat sanity";
		}

		if (true != result)
			return "Fail: LegendaryQuest.Combat";
		return "Pass: LegendaryQuest.Combat";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
