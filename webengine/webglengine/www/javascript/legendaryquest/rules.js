LegendaryQuest.Rules = function()
{
	alert("LegendaryQuest.Rules: static namespace, do not construct");	
}

////////////////////////////////////////////////////////////////////////
// public

LegendaryQuest.Rules.AddRulesCharacter = function(inout_nodeCollection)
{
	LegendaryQuest.Rules.AddRulesCharacterLevel(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterGender(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterRace(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributes(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterAttributePoints(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributes(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesCharacterMisc(inout_nodeCollection);
	LegendaryQuest.Rules.AddRulesHealth(inout_nodeCollection);

	LegendaryQuest.Rules.AddRulesAlignment(inout_nodeCollection);
}

LegendaryQuest.Rules.AddRulesMonster = function(inout_nodeCollection, in_data)
{
	LegendaryQuest.Rules.AddRulesMonsterPrimaryAttributes(inout_nodeCollection, in_data);
	LegendaryQuest.Rules.AddRulesMonsterSecondaryAttributes(inout_nodeCollection, in_data);

	LegendaryQuest.Rules.AddRulesHealth(inout_nodeCollection);

	return;
}

LegendaryQuest.Rules.SetNewCharacterRandomVariables = function(inout_nodeCollection)
{
	//gender
	{
		var randomGenderArray = [LegendaryQuest.Rules.Enum.s_characterGender.TFemale, LegendaryQuest.Rules.Enum.s_characterGender.TMale];
		var randomGender = randomGenderArray[Math.floor(Math.random() * randomGenderArray.length)];
		inout_nodeCollection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, randomGender);
	}

	//race
	{
		var randomRaceArray = [
			LegendaryQuest.Rules.Enum.s_characterRace.TDwarf, 
			LegendaryQuest.Rules.Enum.s_characterRace.TElf,
			LegendaryQuest.Rules.Enum.s_characterRace.TTrow,
			LegendaryQuest.Rules.Enum.s_characterRace.TGnome, 
			LegendaryQuest.Rules.Enum.s_characterRace.TGoblin,
			LegendaryQuest.Rules.Enum.s_characterRace.THob,
			LegendaryQuest.Rules.Enum.s_characterRace.THuman,
			LegendaryQuest.Rules.Enum.s_characterRace.TOrk,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfDwarf,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfElf,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfTrow,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfGnome,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfGoblin,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfHob,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfNymph,
			LegendaryQuest.Rules.Enum.s_characterRace.THalfOrk,
			];
		var randomRace = randomRaceArray[Math.floor(Math.random() * randomRaceArray.length)];
		inout_nodeCollection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyRaceRaw, randomRace);
	}

	//handedness
	{
		var d6 = LegendaryQuest.Roll.Dice(6);
		var d12 = LegendaryQuest.Roll.Dice(12);
		var right = (d6 <= d12);
		var left = (d12 <= d6);
		inout_nodeCollection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLeftHanded, left);
		inout_nodeCollection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyRightHanded, right);
	}

	return;
}

////////////////////////////////////////////////////////////////////////
// private 
//  UPDATE FUNCTIONS

LegendaryQuest.Rules.UpdateFunctionLevel = function(in_arrayInputValues)
{
	if (1 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionLevel: 1 fuction with " + in_arrayInputValues.length + " inputs.");
	var experence = in_arrayInputValues[0];
	var level = Math.max(1, Math.floor(2 + Math.log((experence/25))/Math.log(2)));
	return level;
}

LegendaryQuest.Rules.UpdateFunctionSellectHighestLevelEffect = function (in_arrayInputValues)
{
	//go through input array of effects, select the strongest, else the most recent
	var selectedValue = undefined;
	var bestLevel = undefined;
	for (var index = 0; index < in_arrayInputValues.length; ++index)
	{
		var data = in_arrayInputValues[index];
		if ((undefined == bestLevel) ||
			(bestLevel == data.m_level))
		{
			selectedValue = data.m_value;
		}
	}
	return selectedValue;
}

LegendaryQuest.Rules.UpdateFunctionModifyEnum = function (in_arrayInputValues)
{
	if (2 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionModifyEnum: pair fuction with " + in_arrayInputValues.length + " inputs.");
	if (undefined != in_arrayInputValues[1])
		return in_arrayInputValues[1];
	return in_arrayInputValues[0]
}

LegendaryQuest.Rules.UpdateFunctionAttributeRacialMax = function (in_arrayInputValues, in_oldValue, in_attributeEnum)
{
	if (2 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionRcialMax: pair fuction with " + in_arrayInputValues.length + " inputs.");
	var gender = in_arrayInputValues[0];
	var race = in_arrayInputValues[1];
	var result = LegendaryQuest.Rules.Data.GetRacialMax(gender, race, in_attributeEnum);
	return result;
}

LegendaryQuest.Rules.UpdateFunctionAttribute = function (in_arrayInputValues, in_oldValue, in_attributeEnum)
{
	if (3 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionAttribute: 3 fuction with " + in_arrayInputValues.length + " inputs.");
	var base = in_arrayInputValues[0];
	var racialMax = in_arrayInputValues[1];
	var spent = in_arrayInputValues[2];

	var result = base;
	result += Math.min(spent, (racialMax - base));
	result += Math.floor(Math.max(0, spent - (racialMax - base)) / 2);

	return result;
}

LegendaryQuest.Rules.UpdateFunctionMinNegPlusMaxPos = function(in_arrayInputValues)
{
	var bestMin = 0;
	var bestMax = 0;
	in_arrayInputValues.forEach(function (inputValues) {
		bestMin = Math.min(inputValues, bestMin); 
		bestMax = Math.max(inputValues, bestMax); 
	});
	return (bestMin + bestMax);
}

LegendaryQuest.Rules.UpdateFunctionSpeed = function(in_arrayInputValues)
{
	if (2 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionSpeed: 2 fuction with " + in_arrayInputValues.length + " inputs.");
	var vigor = in_arrayInputValues[0];
	var perception = in_arrayInputValues[1];
	return ((vigor + perception) * 5) + 40;
}

LegendaryQuest.Rules.UpdateFunctionDamageTolerance = function(in_arrayInputValues)
{
	if (1 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionDamageTolerance: 1 fuction with " + in_arrayInputValues.length + " inputs.");
	var brawn = in_arrayInputValues[0];
	return ((4 * brawn) + 32);
}

LegendaryQuest.Rules.UpdateFunctionDamageUnconscious = function(in_arrayInputValues)
{
	if (1 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionDamageUnconscious: 1 fuction with " + in_arrayInputValues.length + " inputs.");
	var willpower = in_arrayInputValues[0];
	return -(willpower + 10);
}

LegendaryQuest.Rules.UpdateFunctionDamageDeath = function(in_arrayInputValues)
{
	if (1 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionDamageDeath: 1 fuction with " + in_arrayInputValues.length + " inputs.");
	var stamina = in_arrayInputValues[0];
	return -((stamina * 5) + 15);
}

// nb classes =  3 plus half his Intelligence
LegendaryQuest.Rules.UpdateFunctionMaxNbClasses = function(in_arrayInputValues)
{
	if (1 != in_arrayInputValues.length)
		alert("LegendaryQuest.Rules.UpdateFunctionMaxNbClasses: 1 fuction with " + in_arrayInputValues.length + " inputs.");
	var intelligence = in_arrayInputValues[0];
	return 3 + Math.floor(intelligence / 2);
}


////////////////////////////////////////////////////////////////////////
// private 
//  rule methods

LegendaryQuest.Rules.AddRulesCharacterLevel = function(inout_nodeCollection)
{
	var dngExperence = DSC.DNG.Node.FactoryRaw(0);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, dngExperence);

	var dngLevel = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionLevel);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel, dngLevel);
	DSC.DNG.Container.LinkNodes(dngLevel, dngExperence, 0);

	return;
}

LegendaryQuest.Rules.AddRulesCharacterGender = function(inout_nodeCollection)
{
	LegendaryQuest.Rules.AddRulesEnum(
		inout_nodeCollection, 
		LegendaryQuest.Rules.Enum.s_characterGender.TMale, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyGenderEffect, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyGenderEffectPropergate, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate
		);
	return;
}

LegendaryQuest.Rules.AddRulesCharacterRace = function(inout_nodeCollection)
{
	LegendaryQuest.Rules.AddRulesEnum(
		inout_nodeCollection, 
		LegendaryQuest.Rules.Enum.s_characterRace.TGoblin, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyRaceRaw, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyRaceEffect, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModified, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyRaceEffectPropergate, 
		LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModifiedPropergate
		);
	return;
}

LegendaryQuest.Rules.AddRulesEnum = function(
	inout_nodeCollection, 
	in_defaultValue, 
	in_keyNameRaw, 
	in_keyNameEffect, 
	in_keyNameModified, 
	in_keyNameEffectPropergate, 
	in_keyNameEffectModifiedPropergate
	)
{
	var dngRaw = DSC.DNG.Node.FactoryRaw(in_defaultValue);
	inout_nodeCollection.AddNode(in_keyNameRaw, dngRaw);

	var dngEffect = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionSellectHighestLevelEffect);
	inout_nodeCollection.AddNode(in_keyNameEffect, dngEffect);

	var dngModified = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionModifyEnum);
	inout_nodeCollection.AddNode(in_keyNameModified, dngModified);
	DSC.DNG.Container.LinkNodes(dngModified, dngRaw, 0);
	DSC.DNG.Container.LinkNodes(dngModified, dngEffect, 1);

	var dngEffectPropergate = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionSellectHighestLevelEffect);
	inout_nodeCollection.AddNode(in_keyNameEffectPropergate, dngEffectPropergate);

	var dngModifiedPropergate = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionModifyEnum);
	inout_nodeCollection.AddNode(in_keyNameEffectModifiedPropergate, dngModifiedPropergate);
	DSC.DNG.Container.LinkNodes(dngModifiedPropergate, dngRaw, 0);
	DSC.DNG.Container.LinkNodes(dngModifiedPropergate, dngEffectPropergate, 1);

	return;	
}

LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributes = function(inout_nodeCollection)
{
	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TPhysicalStrength,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TStamina,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaSpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TAgility,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilitySpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TManualDexterity,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexteritySpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TPerception,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionSpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TWillpower,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerSpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate
		);

	LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.Enum.s_characterAttribute.TFaith,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithBase,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithSpent,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithRacialMax,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModifiedPropergate
		);
}

LegendaryQuest.Rules.AddRulesCharacterPrimaryAttributeImplementation = function(
	inout_nodeCollection,
	in_attributeEnum,
	in_dngKeyBase,
	in_dngKeySpent,
	in_dngKeyRacialMax,
	in_dngKeyRaw,
	in_dngKeyEffectMundane,
	in_dngKeyEffectMagic,
	in_dngKeyEffectPropergateMundane,
	in_dngKeyEffectPropergateMagic,
	in_dngKeyModified,
	in_dngKeyModifiedPropergate
	)
{
	var dngBase = DSC.DNG.Node.FactoryRaw(-2);
	inout_nodeCollection.AddNode(in_dngKeyBase, dngBase);

	var dngSpent = DSC.DNG.Node.FactoryRaw(0);
	inout_nodeCollection.AddNode(in_dngKeySpent, dngSpent);

	var dngRacialMax = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionAttributeRacialMax, in_attributeEnum);
	inout_nodeCollection.AddNode(in_dngKeyRacialMax, dngRacialMax);
	DSC.DNG.Container.LinkNodes(dngRacialMax, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate), 0);
	DSC.DNG.Container.LinkNodes(dngRacialMax, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModifiedPropergate), 1);

	var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionAttribute);
	inout_nodeCollection.AddNode(in_dngKeyRaw, dngRaw);
	DSC.DNG.Container.LinkNodes(dngRaw, dngBase, 0);
	DSC.DNG.Container.LinkNodes(dngRaw, dngRacialMax, 1);
	DSC.DNG.Container.LinkNodes(dngRaw, dngSpent, 2);

	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngRaw,
		in_dngKeyEffectMundane,
		in_dngKeyEffectMagic,
		in_dngKeyEffectPropergateMundane,
		in_dngKeyEffectPropergateMagic,
		in_dngKeyModified,
		in_dngKeyModifiedPropergate
		);
	
	return;	
}

LegendaryQuest.Rules.AddRulesCharacterAttributePoints = function(inout_nodeCollection)
{
	var dngBase = DSC.DNG.Node.FactoryRaw(20);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointBase, dngBase);

	var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	DSC.DNG.Container.LinkNodes(dngRaw, dngBase, 0);
	DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel), 1);

	var dngLost = DSC.DNG.Node.FactoryRaw(0);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointLost, dngLost);
	
	var dngSpent = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointSpent, dngSpent);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent), 0);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaSpent), 1);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAgilitySpent), 2);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexteritySpent), 3);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionSpent), 4);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerSpent), 5);
	DSC.DNG.Container.LinkNodes(dngSpent, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyFaithSpent), 6);

	var dngRemaining = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.FirstMinusAll);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointRemaining, dngRemaining);
	DSC.DNG.Container.LinkNodes(dngRemaining, dngRaw, 0);
	DSC.DNG.Container.LinkNodes(dngRemaining, dngSpent, 1);
	DSC.DNG.Container.LinkNodes(dngRemaining, dngLost, 2);
	
	return;
}

LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributes = function(inout_nodeCollection)
{
	//CD = AG + MD
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModifiedPropergate
		);

	//VG = PS + AG
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModifiedPropergate
		);

	//HE = MD + PC
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModifiedPropergate
		);

	//BR = PS + ST
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModifiedPropergate
		);

	//CH = FA + WP
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModifiedPropergate
		);

	//IN = PC + WP
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModifiedPropergate
		);

	//SP = (VG+PC) x 5 + 40
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionSpeed);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeySpeedRaw, dngRaw);
		DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModifiedPropergate), 0);
		DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate), 1);

		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModifiedPropergate
			);
	}

	//DT = (4 x BR) + 32
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionDamageTolerance);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceRaw, dngRaw);
		DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModifiedPropergate), 0);

		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModifiedPropergate
			);
	}
	//DHR = ST + 10
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AddConstant, 10);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateRaw, dngRaw);
		DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate), 0);

		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateModifiedPropergate
			);
	}
	//RD = AG + 15
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AddConstant, 15);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseRaw, dngRaw);
		DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate), 0);

		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseModifiedPropergate
			);
	}


	return;
}

LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation = function(
	inout_nodeCollection,
	in_dngKeySourceA,
	in_dngKeySourceB,
	in_dngKeyRaw,
	in_dngKeyEffectMundane,
	in_dngKeyEffectMagic,
	in_dngKeyEffectPropergateMundane,
	in_dngKeyEffectPropergateMagic,
	in_dngKeyModified,
	in_dngKeyModifiedPropergate
	)
{
	var dngRaw = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(in_dngKeyRaw, dngRaw);
	DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(in_dngKeySourceA), 0);
	DSC.DNG.Container.LinkNodes(dngRaw, inout_nodeCollection.GetNode(in_dngKeySourceB), 1);

	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngRaw,
		in_dngKeyEffectMundane,
		in_dngKeyEffectMagic,
		in_dngKeyEffectPropergateMundane,
		in_dngKeyEffectPropergateMagic,
		in_dngKeyModified,
		in_dngKeyModifiedPropergate
		);

	return;
}

LegendaryQuest.Rules.AddRulesCharacterAttributeModifier = function(
	inout_nodeCollection,
	inout_dngRaw,
	in_dngKeyEffectMundane,
	in_dngKeyEffectMagic,
	in_dngKeyEffectPropergateMundane,
	in_dngKeyEffectPropergateMagic,
	in_dngKeyModified,
	in_dngKeyModifiedPropergate
	)
{
	var dngEffectMundane = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(in_dngKeyEffectMundane, dngEffectMundane);

	var dngEffectMagic = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionMinNegPlusMaxPos);
	inout_nodeCollection.AddNode(in_dngKeyEffectMagic, dngEffectMagic);

	var dngModified = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(in_dngKeyModified, dngModified);
	DSC.DNG.Container.LinkNodes(dngModified, inout_dngRaw, 0);
	DSC.DNG.Container.LinkNodes(dngModified, dngEffectMundane, 1);
	DSC.DNG.Container.LinkNodes(dngModified, dngEffectMagic, 2);

	var dngEffectPropergateMundane = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(in_dngKeyEffectPropergateMundane, dngEffectPropergateMundane);

	var dngEffectPropergateMagic = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionMinNegPlusMaxPos);
	inout_nodeCollection.AddNode(in_dngKeyEffectPropergateMagic, dngEffectPropergateMagic);

	var dngModifiedPropergate = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AllAddition);
	inout_nodeCollection.AddNode(in_dngKeyModifiedPropergate, dngModifiedPropergate);
	DSC.DNG.Container.LinkNodes(dngModifiedPropergate, inout_dngRaw, 0);
	DSC.DNG.Container.LinkNodes(dngModifiedPropergate, dngEffectPropergateMundane, 1);
	DSC.DNG.Container.LinkNodes(dngModifiedPropergate, dngEffectPropergateMagic, 2);

	return;
}

LegendaryQuest.Rules.AddRulesCharacterMisc = function(inout_nodeCollection)
{
	// nb classes =  3 plus half his Intelligence
	var dngMaxNbClasses = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionMaxNbClasses);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyMaxNbClasses, dngMaxNbClasses);
	DSC.DNG.Container.LinkNodes(dngMaxNbClasses, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModifiedPropergate), 0);

	// Max Nb Magic Items = 4 + WP
	var dngMaxNbMagicItems = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.AddConstant, 4);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyMaxNbMagicItems, dngMaxNbMagicItems);
	DSC.DNG.Container.LinkNodes(dngMaxNbMagicItems, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate), 0);

	//LeftHanded
	var dngLeftHanded = DSC.DNG.Node.FactoryRaw(false);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyLeftHanded, dngLeftHanded);

	//RightHanded
	var dngRightHanded = DSC.DNG.Node.FactoryRaw(true);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyRightHanded, dngRightHanded);
	
	return;
}

LegendaryQuest.Rules.AddRulesMonsterPrimaryAttributes = function(inout_nodeCollection, in_data)
{
	//PhysicalStrength
	var dngPhysicalStrength = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_physicalStrength) ? 0 : in_data.m_physicalStrength);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw, dngPhysicalStrength);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngPhysicalStrength,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate
		);	

	//Stamina
	var dngStamina = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_stamina) ? 0 : in_data.m_stamina);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaRaw, dngStamina);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngStamina,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate
		);	

	//Agility
	var dngAgility = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_agility) ? 0 : in_data.m_agility);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityRaw, dngAgility);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngAgility,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate
		);	

	//ManualDexterity
	var dngManualDexterity = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_manualDexterity) ? 0 : in_data.m_manualDexterity);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityRaw, dngManualDexterity);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngManualDexterity,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate
		);	

	//Perception
	var dngPerception = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_perception) ? 0 : in_data.m_perception);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionRaw, dngPerception);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngPerception,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate
		);	

	//Willpower
	var dngWillpower = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_willpower) ? 0 : in_data.m_willpower);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerRaw, dngWillpower);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngWillpower,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate
		);	

	//Faith
	var dngFaith = DSC.DNG.Node.FactoryRaw((undefined == in_data.m_willpower) ? 0 : in_data.m_willpower);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyFaithRaw, dngFaith);
	LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
		inout_nodeCollection,
		dngFaith,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModifiedPropergate
		);	
	return;
}

LegendaryQuest.Rules.AddRulesMonsterSecondaryAttributes = function(inout_nodeCollection, in_data)
{
	//CD = AG + MD
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModifiedPropergate
		);

	//VG = PS + AG
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModifiedPropergate
		);

	//HE = MD + PC
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModifiedPropergate
		);

	//BR = PS + ST
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModifiedPropergate
		);

	//CH = FA + WP
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyFaithPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModifiedPropergate
		);

	//IN = PC + WP
	LegendaryQuest.Rules.AddRulesCharacterSecondaryAttributeImplementation(
		inout_nodeCollection,
		LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceRaw,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMundane,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMagic,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModified,
		LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModifiedPropergate
		);

	//speed
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(in_data.m_speed);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeySpeedRaw, dngRaw);

		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModifiedPropergate
			);
	}

	//damage tollerance
	{
		var damageTollerance = in_data.m_damageTolerance + LegendaryQuest.Roll.DiceCount(in_data.m_damageToleranceDice, in_data.m_damageToleranceDiceCount);
		var dngDamageTolleranceRaw = DSC.DNG.Node.FactoryRaw(damageTollerance);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceRaw, dngDamageTolleranceRaw);
		LegendaryQuest.Rules.AddRulesCharacterAttributeModifier(
			inout_nodeCollection,
			dngDamageTolleranceRaw,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMundane,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMagic,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModified,
			LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModifiedPropergate
			);
	}

	//defence
	{
		var dngRaw = DSC.DNG.Node.FactoryRaw(in_data.m_defense);
		inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDefense, dngRaw);
	}

}


LegendaryQuest.Rules.AddRulesHealth = function(inout_nodeCollection)
{
	//Damage Unconscious = -10 - willpower
	var dngDamageUnconscious = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionDamageUnconscious);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageUnconscious, dngDamageUnconscious);
	DSC.DNG.Container.LinkNodes(dngDamageUnconscious, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate), 0);

	//Damage Death = -15 - (stamina * 5)
	var dngDamageDeath = DSC.DNG.Node.FactoryRaw(undefined, LegendaryQuest.Rules.UpdateFunctionDamageDeath);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageDeath, dngDamageDeath);
	DSC.DNG.Container.LinkNodes(dngDamageDeath, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate), 0);

	//LegendaryQuest.Rules.DNGKey.s_dngKeyDamageFatigue
	var dngDamageFatigue = DSC.DNG.Node.FactoryRaw(0);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageFatigue, dngDamageFatigue);

	//LegendaryQuest.Rules.DNGKey.s_dngKeyDamagePhysical
	var dngDamagePhysical = DSC.DNG.Node.FactoryRaw(0);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamagePhysical, dngDamagePhysical);

	//LegendaryQuest.Rules.DNGKey.s_dngKeyDamage
	var dngDamage = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.FirstMinusAll);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamage, dngDamage);
	DSC.DNG.Container.LinkNodes(dngDamage, inout_nodeCollection.GetNode(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModified), 0);
	DSC.DNG.Container.LinkNodes(dngDamage, dngDamageFatigue, 1);
	DSC.DNG.Container.LinkNodes(dngDamage, dngDamagePhysical, 2);
	
	return;
}

LegendaryQuest.Rules.AddRulesAlignment = function(inout_nodeCollection)
{
	var dngSocial = DSC.DNG.Node.FactoryRaw(LegendaryQuest.Rules.Enum.s_alignmentSocial.TNeutral);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentSocial, dngSocial);

	var dngLocal = DSC.DNG.Node.FactoryRaw(LegendaryQuest.Rules.Enum.s_alignmentLocal.TNeutral);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentLocal, dngLocal);

	var dngWorld = DSC.DNG.Node.FactoryRaw(LegendaryQuest.Rules.Enum.s_alignmentWorld.TNeutral);
	inout_nodeCollection.AddNode(LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentWorld, dngWorld);
	
	return;
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

		// level
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();
			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (1 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 1);
			result &= (1 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 24);
			result &= (1 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 25);
			result &= (2 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 26);
			result &= (2 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 49);
			result &= (2 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 50);
			result &= (3 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 51);
			result &= (3 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 99);
			result &= (3 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 100);
			result &= (4 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 204800);
			result &= (15 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyExperence, 204801);
			result &= (15 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyLevel));

			if (!result)
				return "Fail: LegendaryQuest.Rules AddRulesCharacterLevel";
		}


		// gender
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();

			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, LegendaryQuest.Rules.Enum.s_characterGender.TBoth);
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TBoth == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TBoth == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TBoth == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, LegendaryQuest.Rules.Enum.s_characterGender.TFemale);
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TFemale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TFemale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TFemale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, LegendaryQuest.Rules.Enum.s_characterGender.TMale);
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TMale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TMale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TMale == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, LegendaryQuest.Rules.Enum.s_characterGender.TNeither);
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TNeither == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TNeither == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified));
			result &= (LegendaryQuest.Rules.Enum.s_characterGender.TNeither == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate));

			if (!result)
				return "Fail: LegendaryQuest.Rules AddRulesCharacterGender";
		}

		// attribute
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();

			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw, LegendaryQuest.Rules.Enum.s_characterGender.TFemale);
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyRaceRaw, LegendaryQuest.Rules.Enum.s_characterRace.TGnome);
			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent, 5);

			result &= (1 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent, 4);
			result &= (0 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent, 3);
			result &= (0 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw));

			collection.SetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent, 7);
			result &= (2 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate));

			if (!result)
				return "Fail: LegendaryQuest.Rules Attribute";
		}

		//sanity
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();

			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateModifiedPropergate));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseModifiedPropergate));

			if (!result)
				return "Fail: LegendaryQuest.Rules Sanity";
		}

		//remaining
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();

			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (21 == collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointRemaining));

			if (!result)
				return "Fail: LegendaryQuest.Rules Remaining";
		}

		//damage
		if (true == result)
		{
			var collection = DSC.DNG.Container.FactoryRaw();

			LegendaryQuest.Rules.AddRulesCharacter(collection);

			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageUnconscious));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageDeath));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModified));
			result &= (undefined != collection.GetValue(LegendaryQuest.Rules.DNGKey.s_dngKeyDamage));

			if (!result)
				return "Fail: LegendaryQuest.Rules damage";
		}

		if (true != result)
			return "Fail: LegendaryQuest.Rules";
		return "Pass: LegendaryQuest.Rules";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
