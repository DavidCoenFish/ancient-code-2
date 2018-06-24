LegendaryQuest.Bestiary.Pool = function()
{
	alert("LegendaryQuest.Bestiary.Pool: static namespace, do not construct");	
}

LegendaryQuest.Bestiary.Pool.CreateMonster = function(in_exampleName, in_individualName)
{
	var poolName = undefined;
	var poolData = undefined;
	var exampleOverload = undefined;

	if (in_exampleName in LegendaryQuest.Bestiary.Example)
	{
		exampleOverload = LegendaryQuest.Bestiary.Example[in_exampleName];
		poolName = exampleOverload.m_poolName;
	}

	if (poolName in LegendaryQuest.Bestiary.Pool)
	{
		poolData = LegendaryQuest.Bestiary.Pool[poolName];
	}


	var data = DSC.Common.OverloadData(poolData, exampleOverload);

	var monster = LegendaryQuest.Bestiary.Monster.FactoryRaw(in_individualName, data);

	return monster;
}