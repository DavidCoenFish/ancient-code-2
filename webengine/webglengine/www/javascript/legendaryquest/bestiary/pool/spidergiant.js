LegendaryQuest.Bestiary.Pool.SpiderGiant =
{
	m_name : "Giant Spider",

	m_habitat : LegendaryQuest.Bestiary.Enum.s_habitat.TEverywhere,
	m_lifestyle : LegendaryQuest.Bestiary.Enum.s_lifeStyle.TInstinctive |
		 LegendaryQuest.Bestiary.Enum.s_lifeStyle.TInsect,
	m_wealthType : LegendaryQuest.Bestiary.Enum.s_wealth.TIncidental,
	m_alignment :  LegendaryQuest.Bestiary.Enum.s_alignment.TNeutral,
	m_cunning :  LegendaryQuest.Bestiary.Enum.s_cunning.TLow,
	m_speed : 60,
	m_strength : LegendaryQuest.Bestiary.Enum.s_strength.TBelowAverage,
	m_size : LegendaryQuest.Bestiary.Enum.s_size.TMedium,
	m_specialCharacteristicArray : undefined,
		//Moderately Hazardous Paralyzing Venom
	m_recoveryTime : 6,
	m_absorption : 0,
	m_surpriseAdjust : 2,
	m_arrayAttackName : [ "bite" ],
		//no severity damage

	m_physicalStrength : -1,
	m_stamina : -1,
	m_agility : 1,
	m_manualDexterity : undefined,
	m_perception : 1,
	m_willpower : -4,
	m_faith : -4,

	m_effectedBySeverityDamage : true,
	m_effectedByFaithDamage : false,

}
