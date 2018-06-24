LegendaryQuest.Bestiary.Enum = function()
{
	alert("LegendaryQuest.Bestiary.Enum: static namespace, do not construct");	
}

LegendaryQuest.Bestiary.Enum.s_habitat = 
{
	TEverywhere : 0,
}

LegendaryQuest.Bestiary.Enum.s_lifeStyle = 
{
	TNone : 0,
	TAnimal : 1<<0,
	TAquatic : 1<<1,
	TCivilized : 1<<2,
	TComunal : 1<<3,
	TControlled : 1<<4,
	TInstinctive : 1<<5,
	TInsect : 1<<6,
	TMigratory : 1<<7,
	TNocturnal : 1<<8,
	TNomadic : 1<<9,
	TScheming : 1<<10,
	TSoltary : 1<<11,
	TTribal : 1<<12,
	TTrooping : 1<<13,
}

LegendaryQuest.Bestiary.Enum.s_wealth = 
{
	TIncidental : 0,
	THoard : 1,
	TMineral : 2,
	TMonetary : 3,
}

LegendaryQuest.Bestiary.Enum.s_alignment = 
{
	TNeutral : 0,
}

LegendaryQuest.Bestiary.Enum.s_cunning = 
{
	TNil : 0, 
	TLow : 1,
	TBelowAverage: 2,
	TAverage : 3,
	TAboveAverage : 4,
	THigh : 5,
	TExceptional : 6
}

LegendaryQuest.Bestiary.Enum.s_strength = 
{
	TLow : 0, //PS = 1d2 - 5
	TBelowAverage: 1, //PS = 1d3 - 3
	TAverage : 2, //PS = 1d2
	TAboveAverage : 3, //PS = 2 + 1d3
	THigh : 4, //PS = 5 + 1d4
	TVeryHigh : 5, //PS = 9 + 1d4
	TExceptional : 6, //PS = 13 + 1d10
	TGodLike : 6, //24 <= PS
}

LegendaryQuest.Bestiary.Enum.s_size = 
{
	TSmall : 0, //2 feet tall, 30 pounds
	TMedium : 1, //small wolf to small pony, 35 to 300 punds
	TAverage : 2, //huminoid 5 to 7 feet
	TLarge : 3, //500 to 2500 punds. huminoids 8 to 13 feet
	TGreat : 4, //few tons, huminoids 13 to 25 feet
	THuge : 5, //25tons, huminoidd 25 to 45 feet
	TImmense : 6
}

LegendaryQuest.Bestiary.Enum.s_specialCharacteristicResistance = 
{
	THighlySusceptible : 0,
	TSusceptibleTo : 1,
	TResistantTo : 2,
	TImmunityTo : 3,
}
LegendaryQuest.Bestiary.Enum.s_specialCharacteristicResistanceSubject = 
{
	TFrostSpell : 0,
	TMentalSpell : 1,
	TSeverityDamage : 2,
	THolyWater : 3,
	TSunlight : 4,
}

LegendaryQuest.Bestiary.Enum.s_specialCharacteristicBehaviour =
{
	TUncontrollableLustFor : 0,
	TLustFor : 1,
	TOverpoweringAffinityTowards : 2,
	TAffinityTowards : 3,
	TAversionTo : 4,
	TStrongAversionTo : 5,
	TAfraidOf : 6,
	TTerrifiedOf : 7,
	TEnmityToward : 8,
	THatredToward : 9,
} 

