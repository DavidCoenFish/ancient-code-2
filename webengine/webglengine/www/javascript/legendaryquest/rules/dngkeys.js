/*
xxx Base
//xxx Spent
xxx Raw  //base + spent or other selection
xxx Modified //raw plus Modifiedal modifiers, this is the value that is the characters state, but may not be propergated to other calculations
xxx Modified Propergate //raw plus Modifiedal modifiers, propegated to other calculations

Physical Strength: PS
Stamina: ST
Agility: AG
Manual Dexterity: MD
Perception: PC
Willpower: WP
Faith: FA

Coordination: CD
Vigor: VG
Hand / Eye: HE
Brawn: BR
Charisma: CH
Intelligence: IN
Speed: SP
Damage Tolerance: DT
Daily Healing Rate: DHR
Raw Defense: RD


*/

LegendaryQuest.Rules.DNGKey = function()
{
	alert("LegendaryQuest.Rules.DNGKey: static namespace, do not construct");	
}

LegendaryQuest.Rules.DNGKey.s_dngKeyExperence = "Experence";
LegendaryQuest.Rules.DNGKey.s_dngKeyLevel = "Level";

LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointBase = "Atrib Point Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointSpent = "Atrib Point Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointLost = "Atrib Point Lost";
LegendaryQuest.Rules.DNGKey.s_dngKeyAttributePointRemaining = "Atrib Point Remaining";

LegendaryQuest.Rules.DNGKey.s_dngKeyDamageUnconscious = "Damage Unconscious";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageDeath = "Damage Death";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageFatigue = "Damage Fatigue";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamagePhysical = "Damage Physical";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamage = "Damage";

LegendaryQuest.Rules.DNGKey.s_dngKeyGenderRaw = "Gender Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyGenderEffect = "Gender Effect";
LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModified = "Gender Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyGenderEffectPropergate = "Gender Effect Propergate";
LegendaryQuest.Rules.DNGKey.s_dngKeyGenderModifiedPropergate = "Gender Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyRaceRaw = "Race Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyRaceEffect = "Race Effect";
LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModified = "Race Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyRaceEffectPropergate = "Race Effect Propergate";
LegendaryQuest.Rules.DNGKey.s_dngKeyRaceModifiedPropergate = "Race Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthBase = "PS Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthSpent = "PS Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRaw = "PS Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthRacialMax = "PS RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMundane = "PS Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectMagic = "PS Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMundane = "PS Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthEffectPropergateMagic = "PS Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModified = "PS Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyPhysicalStrengthModifiedPropergate = "PS Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaBase = "ST Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaSpent = "ST Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaRaw = "ST Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaRacialMax = "ST RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMundane = "ST Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectMagic = "ST Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMundane = "ST Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaEffectPropergateMagic = "ST Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModified = "ST Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyStaminaModifiedPropergate = "ST Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityBase = "AG Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilitySpent = "AG Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityRaw = "AG Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityRacialMax = "AG RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMundane = "AG Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectMagic = "AG Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMundane = "AG Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityEffectPropergateMagic = "AG Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModified = "AG Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyAgilityModifiedPropergate = "AG Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityBase = "MD Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexteritySpent = "MD Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityRaw = "MD Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityRacialMax = "MD RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMundane = "MD Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectMagic = "MD Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMundane = "MD Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityEffectPropergateMagic = "MD Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModified = "MD Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyManualDexterityModifiedPropergate = "MD Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionBase = "PC Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionSpent = "PC Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionRaw = "PC Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionRacialMax = "PC RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMundane = "PC Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectMagic = "PC Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMundane = "PC Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionEffectPropergateMagic = "PC Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModified = "PC Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyPerceptionModifiedPropergate = "PC Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerBase = "WP Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerSpent = "WP Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerRaw = "WP Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerRacialMax = "WP RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMundane = "WP Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectMagic = "WP Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMundane = "WP Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerEffectPropergateMagic = "WP Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModified = "WP Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyWillpowerModifiedPropergate = "WP Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyFaithBase = "FA Base";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithSpent = "FA Spent";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithRaw = "FA Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithRacialMax = "FA RacialMax";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMundane = "FA Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectMagic = "FA Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMundane = "FA Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithEffectPropergateMagic = "FA Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModified = "FA Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyFaithModifiedPropergate = "FA Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationRaw = "CD Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMundane = "CD Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectMagic = "CD Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMundane = "CD Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationEffectPropergateMagic = "CD Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModified = "CD Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyCoordinationModifiedPropergate = "CD Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyVigorRaw = "VG Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMundane = "VG Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectMagic = "VG Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMundane = "VG Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorEffectPropergateMagic = "VG Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModified = "VG Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyVigorModifiedPropergate = "VG Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeRaw = "HE Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMundane = "HE Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectMagic = "HE Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMundane = "HE Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeEffectPropergateMagic = "HE Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModified = "HE Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyHandEyeModifiedPropergate = "HE Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnRaw = "BR Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMundane = "BR Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectMagic = "BR Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMundane = "BR Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnEffectPropergateMagic = "BR Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModified = "BR Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyBrawnModifiedPropergate = "BR Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaRaw = "CH Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMundane = "CH Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectMagic = "CH Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMundane = "CH Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaEffectPropergateMagic = "CH Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModified = "CH Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyCharismaModifiedPropergate = "CH Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceRaw = "IN Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMundane = "IN Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectMagic = "IN Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMundane = "IN Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceEffectPropergateMagic = "IN Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModified = "IN Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyIntelligenceModifiedPropergate = "IN Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeySpeedRaw = "SP Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMundane = "SP Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectMagic = "SP Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMundane = "SP Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedEffectPropergateMagic = "SP Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModified = "SP Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedModifiedPropergate = "SP Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceRaw = "DT Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMundane = "DT Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectMagic = "DT Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMundane = "DT Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceEffectPropergateMagic = "DT Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModified = "DT Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyDamageToleranceModifiedPropergate = "DT Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateRaw = "DHR Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectMundane = "DHR Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectMagic = "DHR Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectPropergateMundane = "DHR Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateEffectPropergateMagic = "DHR Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateModified = "DHR Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyDailyHealingRateModifiedPropergate = "DHR Modified Propergate";

LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseRaw = "RD Raw";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectMundane = "RD Effect Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectMagic = "RD Effect Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectPropergateMundane = "RD Effect Propergate Mundane";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseEffectPropergateMagic = "RD Effect Propergate Magic";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseModified = "RD Modified";
LegendaryQuest.Rules.DNGKey.s_dngKeyRawDefenseModifiedPropergate = "RD Modified Propergate";

// nb classes =  3 plus half his Intelligence
LegendaryQuest.Rules.DNGKey.s_dngKeyMaxNbClasses = "Max Nb Classes";
// Max Nb Magic Items = 4 + WP
LegendaryQuest.Rules.DNGKey.s_dngKeyMaxNbMagicItems = "Max Nb Magic Items";

LegendaryQuest.Rules.DNGKey.s_dngKeyLeftHanded = "Handed Left";
LegendaryQuest.Rules.DNGKey.s_dngKeyRightHanded = "Handed Right";

LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentSocial = "Alignment Social";
LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentLocal = "Alignment Local";
LegendaryQuest.Rules.DNGKey.s_dngKeyAlignmentWorld = "Alignment World";

// level of weapon equipt and able to parry
LegendaryQuest.Rules.DNGKey.s_dngKeyWeaponLevelMax = "Weapon Level Max";

//average character level and weapon level rounded up, if more than one weapon, use max
LegendaryQuest.Rules.DNGKey.s_dngKeyCombatLevel = "Combat Level";
//parry of equipt weapon, if more than one, use max (+ 1 if skill)
LegendaryQuest.Rules.DNGKey.s_dngKeyParryMax = "Parry Max";
LegendaryQuest.Rules.DNGKey.s_dngKeyArmourType = "Armour Type";
LegendaryQuest.Rules.DNGKey.s_dngKeyDefensePenalty = "Defense Penalty";
LegendaryQuest.Rules.DNGKey.s_dngKeyDefense = "Defense";
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedPenalty = "Speed Penalty";
//yards per turn
LegendaryQuest.Rules.DNGKey.s_dngKeySpeedInArmor = "Speed In Armor"; 
/*
AttackBonus
	unschooled -4, otherwise weapon level + training, then 
	Large & Med. Hand-held or polearm    Vigour (VG)
	Small hand-held & entrapment         Coordination (CD)
	Range weapons (bows, sling)          Hand/Eye (HE)
*/
LegendaryQuest.Rules.DNGKey.s_dngKeyAttackBonus = "AttackBonus";

