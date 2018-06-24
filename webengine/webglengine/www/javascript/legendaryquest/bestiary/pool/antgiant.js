LegendaryQuest.Bestiary.Pool.AntGiant =
{
	m_name : "Giant Ant",

	m_habitat : LegendaryQuest.Bestiary.Enum.s_habitat.TEverywhere,
	m_lifestyle : LegendaryQuest.Bestiary.Enum.s_lifeStyle.TInstinctive |
		 LegendaryQuest.Bestiary.Enum.s_lifeStyle.TComunal | 
		 LegendaryQuest.Bestiary.Enum.s_lifeStyle.TInsect,
	m_wealthType : LegendaryQuest.Bestiary.Enum.s_wealth.TMineral,
	m_alignment :  LegendaryQuest.Bestiary.Enum.s_alignment.TNeutral,
	m_cunning :  LegendaryQuest.Bestiary.Enum.s_cunning.TLow,
	m_speed : 70,
	m_strength : LegendaryQuest.Bestiary.Enum.s_strength.THigh,
	//m_sizeLow : LegendaryQuest.Bestiary.Enum.s_size.TSmall,
	m_size : LegendaryQuest.Bestiary.Enum.s_size.TMedium,
	//m_origin : undefined,
	m_specialCharacteristicArray : undefined,
	m_recoveryTime : 7,
	m_absorption : 6,
	m_surpriseAdjust : 0,
	m_arrayAttackName : [ "mandibles" ],

	m_physicalStrength : 6,
	m_stamina : 6,
	m_agility : 0,
	m_manualDexterity : undefined,
	m_perception : 0,
	m_willpower : -3,
	m_faith : -3,

	m_effectedBySeverityDamage : true,
	m_effectedByFaithDamage : false,
}
