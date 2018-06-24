LegendaryQuest.Bestiary.Monster = function(in_name, in_dngContainer, in_data)
{
	if ( !(this instanceof LegendaryQuest.Bestiary.Monster) )
		alert("LegendaryQuest.Bestiary.Monster: call constuctor with new keyword");

	this.m_name = in_name;
	this.m_dngContainer = in_dngContainer;
	this.m_data = in_data;

	return;
}

LegendaryQuest.Bestiary.Monster.prototype.GetStatistic = function(in_name)
{
	return this.m_dngContainer.GetValue(in_name);
}

LegendaryQuest.Bestiary.Monster.prototype.SetStatistic = function(in_name, in_value)
{
	return this.m_dngContainer.SetValue(in_name, in_value);
}

LegendaryQuest.Bestiary.Monster.FactoryRaw = function(in_name, in_data)
{
	var nodeCollection = DSC.DNG.Container.FactoryRaw();
	LegendaryQuest.Rules.AddRulesMonster(nodeCollection, in_data)

	return new LegendaryQuest.Bestiary.Monster(in_name, nodeCollection, in_data);
}
