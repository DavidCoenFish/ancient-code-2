// battledistancestoredata.js

function BattleDistanceStoreData(in_key, in_battleCharacterData, in_distance, in_vector)
{
	//DEBUG if ( !(this instanceof BattleDistanceStoreData) )
	//DEBUG {
	//DEBUG 	alert("BattleDistanceStoreData: call constuctor with new keyword");	
	//DEBUG }

	this.m_key = in_key;
	this.m_battleCharacterData = in_battleCharacterData;
	this.m_distance = in_distance;
	this.m_vector = in_vector;
}