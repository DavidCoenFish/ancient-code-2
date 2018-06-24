LegendaryQuest.GameState.Character = function(in_nodeCollection)
{
	if ( !(this instanceof LegendaryQuest.GameState.Character) )
		alert("LegendaryQuest.GameState.Character: call constuctor with new keyword");	

	this.m_nodeCollection = in_nodeCollection;
	return;
}

LegendaryQuest.GameState.Character.prototype.GetStatistic = function(in_name)
{
	return this.m_nodeCollection.GetValue(in_name);
}

LegendaryQuest.GameState.Character.prototype.SetStatistic = function(in_name, in_value)
{
	return this.m_nodeCollection.SetValue(in_name, in_value);
}

LegendaryQuest.GameState.Character.Factory = function()
{
	var nodeCollection = DSC.DNG.Container.FactoryRaw();

	LegendaryQuest.Rules.AddRulesCharacter(nodeCollection);
	LegendaryQuest.Rules.SetNewCharacterRandomVariables(nodeCollection);

	return LegendaryQuest.GameState.Character.FactoryRaw(nodeCollection);
}

LegendaryQuest.GameState.Character.FactoryRaw = function(in_nodeCollection)
{
	return new LegendaryQuest.GameState.Character(in_nodeCollection);
}
