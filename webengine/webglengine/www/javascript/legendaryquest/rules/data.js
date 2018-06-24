LegendaryQuest.Rules.Data = function()
{
	alert("LegendaryQuest.Rules.Data: static namespace, do not construct");	
}
	
LegendaryQuest.Rules.Data.s_raceAttributeMax = [];												//PS ST AG MD PC WP FA
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TDwarf] = [5, 4, 1, 3, 2, 2, 4];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TElf] = [2, 1, 4, 4, 4, 5, 1];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TTrow] = [3, 2, 4, 6, 3, 4, -1];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TGnome] = [0, 2, 5, 4, 6, 2, 2];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TGoblin] = [2, 2, 4, 6, 5, 2, 0];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THob] = [0, 3, 5, 5, 4, 1, 3];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THuman] = [3, 3, 3, 3, 3, 3, 3];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.TOrk] = [7, 8, 2, -1, 2, -1, 4];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfDwarf] = [4, 4, 2, 3, 3, 2, 3];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfElf] = [2, 2, 4, 3, 4, 4, 2];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfTrow] = [3, 2, 3, 5, 3, 4, 1];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfGnome] = [2, 2, 4, 5, 4, 2, 2];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfGoblin] = [3, 2, 3, 5, 4, 2, 2];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfHob] = [1, 3, 4, 4, 4, 2, 3];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfNymph] = [4, 3, 4, 3, 3, 0, 4];
LegendaryQuest.Rules.Data.s_raceAttributeMax[LegendaryQuest.Rules.Enum.s_characterRace.THalfOrk] = [5, 6, 3, 1, 2, 1, 3];

LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier = [];												//PS ST AG MD PC WP FA
LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier[LegendaryQuest.Rules.Enum.s_characterGender.TBoth] = [0, +1, 0, -1, 0, 0, 0];
LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier[LegendaryQuest.Rules.Enum.s_characterGender.TFemale] = [-1, 0, +1, 0, 0, 0, 0];
LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier[LegendaryQuest.Rules.Enum.s_characterGender.TMale] = [0, 0, 0, 0, 0, 0, 0];
LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier[LegendaryQuest.Rules.Enum.s_characterGender.TNeither] = [-1, 0, 0, +1, 0, 0, 0];

LegendaryQuest.Rules.Data.GetRacialMax = function(in_gender, in_race, in_attribute)
{
	return LegendaryQuest.Rules.Data.s_raceAttributeMax[in_race][in_attribute] + 
		LegendaryQuest.Rules.Data.s_genderAttributeMaxModifier[in_gender][in_attribute];
}
