/*
make new namespace LegendaryQuest.Roll

attribute check
	if (threashold <= 1d10 + attribute) then success
	eg. make a perception check against threashold of 8
	threashold = 5 + ceil(level opposing force / 2)


combat attack roll
	if (targets[defence] <= 1d30 + attack bonus) then blow lands

luck roll (avoid baneful force OTHER THAN dodge, parry and blocking
	if (threashold <= 1d30 + character level + (any attribute relevant to baneful force)) then avoid baneful force
	threashold defaults to 15 + level of baneful force

success roll ( tries to accomplish some task but needn't overcome the active influences of opposing skills)
	if (threashold <= 1d30 + relevant skill level + (any relevant attribute)) 
	threashold defaults to 20 + skill level of opposing force + environment factors

--note want some way of logging
*/

LegendaryQuest.Roll = function()
{
	alert("LegendaryQuest.Roll: static namespace, do not construct");	
}

LegendaryQuest.Roll.Dice = function(in_range)
{
	return Math.ceil(Math.random() * in_range); 	
}

LegendaryQuest.Roll.DiceCount = function(in_range, in_count)
{
	var sum = 0;
	for (var index = 0; index < in_count; ++index)
	{
		sum += LegendaryQuest.Roll.Dice(in_range);
	}
	return sum;
}

/*
attribute may change over time
GetLhsTotal, GetLhsAttribute
GetRhsTotal, GetRhsAttribute
SetCheckCompeting(lhsTotal, lhsRoll, rhsTotal, rhsRoll);
SetLhsWon
SetRhsWon
*/
LegendaryQuest.Roll.AttributeCheckCompetingContext = function(in_context)
{
	var lhsRoll = LegendaryQuest.Roll.Dice(10);
	var rhsRoll = LegendaryQuest.Roll.Dice(10);
	var lhsTotal = in_context.GetLhsTotal() + in_context.GetLhsAttribute() + lhsRoll;
	var rhsTotal = in_context.GetRhsTotal() + in_context.GetRhsAttribute() + rhsRoll;

	in_context.SetCheckCompeting(lhsTotal, lhsRoll, rhsTotal, rhsRoll);

	if (10 <= runningTotalRight - runningTotalLeft)
	{
		in_context.SetRhsWon();
	}
	if (10 <= runningTotalLeft - runningTotalRight)
	{
		in_context.SetLhsWon();
	}
	return;
}

//return true on sucess for lhs, false on rhs
/*
for this to work with a context, GetKeepGoing, GetAttribute
*/
LegendaryQuest.Roll.AttributeCheckCompeting = function(in_attributeLhs, in_attributeRhs)
{
	var runningTotalLeft = 0;
	var runningTotalRight = 0;
	var result = false;
	while(true)
	{
		runningTotalLeft += (LegendaryQuest.Roll.Dice(10) + in_attributeLhs);
		runningTotalRight += (LegendaryQuest.Roll.Dice(10) + in_attributeRhs);
		
		if (10 <= runningTotalRight - runningTotalLeft)
		{
			result = false;
			break;
		}
		if (10 <= runningTotalLeft - runningTotalRight)
		{
			result = true;
			break;
		}
	}
	return result;
}

//return true on sucess, cumulative is additional
/*
_context.SetIndex()
_context.SetValue()
_context.DoAttributeCheckCumulative()
*/
LegendaryQuest.Roll.AttributeCheckCumulative = function(in_arrayAttribute, in_threashold, _context)
{
	var sum = 0;
	for (var index = 0; index < in_arrayAttribute.length; ++index)
	{
		var value = (LegendaryQuest.Roll.Dice(10) + in_arrayAttribute[index]);
		if ((undefined != _context) && (undefined != _context.SetIndex))
		{
			_context.SetIndex(index);
			_context.SetValue(value);
		}

		sum += value;
	}

	var result = (in_threashold <= sum);

	if ((undefined != _context) && (undefined != _context.DoAttributeCheckCumulative))
	{
		_context.DoAttributeCheckCumulative(result, in_threashold, sum);
	}

	return result;
}

//return true on sucess, cooperative is max
/*
_context.SetIndex()
*/
LegendaryQuest.Roll.AttributeCheckCooperative = function(in_arrayAttribute, in_threashold, _context)
{
	var result = false;
	for (var index = 0; index < in_arrayAttribute.length; ++index)
	{
		if ((undefined != _context) && (undefined != _context.SetIndex))
		{
			_context.SetIndex(index);
		}

		if (LegendaryQuest.Roll.AttributeCheck(in_arrayAttribute[index], in_threashold, _context))
		{
			result = true;
		}
	}
	return result;
}

/*
_context.DoAttributeCheck()
*/
LegendaryQuest.Roll.AttributeCheck = function(in_attribute, in_threashold, _context)
{
	var roll = LegendaryQuest.Roll.Dice(10);
	var result = (in_threashold <= (roll + in_attribute));

	if ((undefined != _context) && (undefined != _context.DoAttributeCheck))
	{
		_context.DoAttributeCheck(result, in_threashold, roll, in_attribute);
	}

	return result;
}

LegendaryQuest.Roll.AttributeThreashold = function(in_levelOpposingForce)
{
	return (5 + Math.Ceil(in_levelOpposingForce / 2));
}

/*
_context.Log()
_context.SetRollRawValue()
*/
LegendaryQuest.Roll.AttackRoll = function(in_targetDefence, in_attackBonus, _context)
{
	var roll = LegendaryQuest.Roll.Dice(10);
}
