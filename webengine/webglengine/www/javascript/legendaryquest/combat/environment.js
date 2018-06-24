LegendaryQuest.Combat.Environment = function()
{
	if (!(this instanceof LegendaryQuest.Combat.Environment))
		alert("LegendaryQuest.Combat.Environment: call constuctor with new keyword");

}

LegendaryQuest.Combat.Environment.FactoryRaw = function()
{
	return new LegendaryQuest.Combat.Environment();
}

