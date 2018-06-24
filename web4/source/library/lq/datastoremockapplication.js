/**
 * @private
 * @constructor
 * @struct
 */
LQ.DataStoreMockApplication = function()
{
	/** @dict @type {!Object.<!string, !string>} */
	this.m_data = {
		"MobList.1" : JSON.stringify([
			LQ.BusinessLogic.s_mob.e_fairy,
			LQ.BusinessLogic.s_mob.e_giantAnt,
			LQ.BusinessLogic.s_mob.e_giantRat,
			LQ.BusinessLogic.s_mob.e_poisonousSheep,
			LQ.BusinessLogic.s_mob.e_slime,
			LQ.BusinessLogic.s_mob.e_imp,
			LQ.BusinessLogic.s_mob.e_dog,
			LQ.BusinessLogic.s_mob.e_bat
			]),
		"MobList.2" : JSON.stringify([
			LQ.BusinessLogic.s_mob.e_giantSpider,
			LQ.BusinessLogic.s_mob.e_goblin,
			LQ.BusinessLogic.s_mob.e_skeleton,
			LQ.BusinessLogic.s_mob.e_wolf,
			LQ.BusinessLogic.s_mob.e_Afrit,
			LQ.BusinessLogic.s_mob.e_zombie,
			LQ.BusinessLogic.s_mob.e_bugbear,
			LQ.BusinessLogic.s_mob.e_banshee
			]),
		"MobList.3" : JSON.stringify([
			LQ.BusinessLogic.s_mob.e_human,
			LQ.BusinessLogic.s_mob.e_elf,
			LQ.BusinessLogic.s_mob.e_dwarf,
			LQ.BusinessLogic.s_mob.e_skeletonMage,
			LQ.BusinessLogic.s_mob.e_ork,
			LQ.BusinessLogic.s_mob.e_arachnidae,
			LQ.BusinessLogic.s_mob.e_centaur,
			LQ.BusinessLogic.s_mob.e_halfNymph 
			]),
		"MobList.4" : JSON.stringify([
			LQ.BusinessLogic.s_mob.e_unicorn,
			LQ.BusinessLogic.s_mob.e_wrym,
			LQ.BusinessLogic.s_mob.e_vampire,
			LQ.BusinessLogic.s_mob.e_ker, //vis
			LQ.BusinessLogic.s_mob.e_gryphon,
			LQ.BusinessLogic.s_mob.e_minotaur,
			LQ.BusinessLogic.s_mob.e_bucentaur,
			LQ.BusinessLogic.s_mob.e_chimera
			]),
		"MobList.5" : JSON.stringify([
			LQ.BusinessLogic.s_mob.e_dragon,
			LQ.BusinessLogic.s_mob.e_lich,
			LQ.BusinessLogic.s_mob.e_angel,
			LQ.BusinessLogic.s_mob.e_demon,
			LQ.BusinessLogic.s_mob.e_androSphinx,
			LQ.BusinessLogic.s_mob.e_golem,
			LQ.BusinessLogic.s_mob.e_manticore,
			LQ.BusinessLogic.s_mob.e_efriti
			]),

	};

	return;
}

/**
 * @return {!LQ.DataStoreMockApplication}
 */
LQ.DataStoreMockApplication.Factory = function()
{
	return new LQ.DataStoreMockApplication();
}

/**
 * GetData
 * @param {!string} in_key
 * @return {!string}
 */
LQ.DataStoreMockApplication.prototype.GetData = function(in_key)
{
	if (false === (in_key in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failApplicationKeyNotFound);
	}
	return this.m_data[in_key];
};

