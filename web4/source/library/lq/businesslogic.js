/**
 * @const
 * @unrestricted
 */
LQ.BusinessLogic = {}

LQ.BusinessLogic.s_dataKeyGameStatic = "GameStatic";
LQ.BusinessLogic.s_dataKeyGameDynamic = "GameDynamic";
LQ.BusinessLogic.s_dataKeyWorldStatic = "WorldStatic";
LQ.BusinessLogic.s_dataKeyWorldDynamic = "WorldDynamic";


LQ.BusinessLogic.s_setDataRetryCount = 10;

LQ.BusinessLogic.s_fateStoneMaxCount = 3;
LQ.BusinessLogic.s_millisecondsFateStoneRecover = 1000 * 60 * 60 * 2; //2 hours

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_actions = 
{
	e_confirmDeleteGame : 0, //[yes, no]
	e_openingCinematic : 1,
	e_startGame0 : 2, //intro cinematic [accept random, reroll, get list]
	e_startGame1 : 3, //[accept random, reroll]
	e_startGame2 : 4, //[accept random, get list]
	e_startGameList : 5, //[accept list index]
}

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_mobType = 
{
	e_alpha : 0, //strongest
	e_beta : 1, //meh
	e_gamma : 2, //meh
}

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_mob = 
{
	//level 1
	e_fairy : 100,
	e_giantAnt : 101,
	e_giantRat : 102,
	e_poisonousSheep : 103,
	e_slime : 104,
	e_imp : 105,
	e_dog : 106,
	e_bat : 107,
	//Giant Porcupine
	
	//level2
	e_giantSpider : 200,
	e_goblin : 201,
	e_skeleton : 202,
	e_wolf : 203,
	e_Afrit : 204,
	e_zombie : 205,
	e_bugbear : 206,
	e_banshee : 207,
	//gremlin

	//level3
	e_human : 300,
	e_elf : 301,
	e_dwarf : 302,
	e_skeletonMage : 303,
	e_ork : 304,
	e_arachnidae : 305,
	e_centaur : 306,
	e_halfNymph : 307, 
	//e_cockatrice : 404,
	//e_ghoul
	//Apedemak
	//incubus

	//level4
	e_unicorn : 400,
	e_wrym : 401,
	e_vampire : 402,
	e_ker : 403, //viscious demoness of death with razor sharp claws and long white teeth. From her shoulders grow a large pair of powerful pitch-black wings capable of transporting her at great speed. 
	e_gryphon : 404,
	e_minotaur : 405,
	e_bucentaur : 406,
	e_chimera : 407,
	//e_baykok :
	//e_rakshasa : 
	//e_giantCacus : 507,

	//level5
	e_dragon : 500,
	e_lich : 501,
	e_angel : 502,
	e_demon : 503,
	e_androSphinx : 504,
	e_golem : 505,
	e_manticore : 506,
	e_efriti : 507,
	//djinni
	//gorgon
	//hydra
	//royal mummy


};

/**
 * @const
 * @type {!Array.<!LQ.BusinessLogic.s_mob>}
 */
LQ.BusinessLogic.s_mobStartGameList = 
[
	LQ.BusinessLogic.s_mob.e_fairy,
	LQ.BusinessLogic.s_mob.e_giantAnt,
	LQ.BusinessLogic.s_mob.e_giantRat,
	LQ.BusinessLogic.s_mob.e_poisonousSheep,
	LQ.BusinessLogic.s_mob.e_slime,
	LQ.BusinessLogic.s_mob.e_imp,
	LQ.BusinessLogic.s_mob.e_dog,
	LQ.BusinessLogic.s_mob.e_bat,
	LQ.BusinessLogic.s_mob.e_giantSpider,
	LQ.BusinessLogic.s_mob.e_goblin,
	LQ.BusinessLogic.s_mob.e_skeleton,
	LQ.BusinessLogic.s_mob.e_wolf,
	LQ.BusinessLogic.s_mob.e_Afrit,
	LQ.BusinessLogic.s_mob.e_zombie,
	LQ.BusinessLogic.s_mob.e_bugbear,
	LQ.BusinessLogic.s_mob.e_banshee
]

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_worldDynamicFlag = 
{
	e_none : 0,
	e_firstContact : 1 << 0,
	e_firstAmbush : 1 << 1,
	e_firstDialog : 1 << 2,
	e_traversable : 1 << 3
}

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_worldDynamicAward = 
{
	e_none : 0,
	e_oneStar : 1,
	e_twoStar : 2,
	e_threeStar : 3,
	e_dominance : 4,
}

/**
 * @const
 * @enum {number}
 */
LQ.BusinessLogic.s_callResult = 
{
	e_none : 0,
	e_success : 1,
	e_failure : 2,
	e_tryAgain : 3,
}


/**
 * wanted an easy way for presentation facing methods to call a function and deal with (datasource) exceptions
 * @param {!function() : !string} in_call
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogic.CallHelper = function(in_call, in_language, in_dataStore)
{
	/** @type {!string} */
	var data = "";
	try
	{
		data = in_call();
	}
	catch (in_error)
	{
		/** @type {!string} */
		var errorMessage = "";
		if (in_error instanceof LQ.DataStoreException)
		{
			errorMessage = LQ.BusinessLogic.GetErrorMessage(in_error.m_enum, in_language, in_dataStore);
		}
		else
		{
			errorMessage = "Unknown error <" + in_error + ">";
		}
		return LQ.BusinessLogicResult.FactoryError(errorMessage);
	}
	return LQ.BusinessLogicResult.FactorySuccess(data);
}

/**
 * @param {!LQ.DataStoreException.s_enum} in_error
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!string}
 */
LQ.BusinessLogic.GetErrorMessage = function(in_error, in_language, in_dataStore)
{
	/** @type {!string} */
	var translationKeyError = "Error." + in_error;
	/** @type {!string} */
	var translationError = in_dataStore.GetTranslatedString(in_language, translationKeyError);

	return translationError;
}

/**
 * collect atomic tasks into a function and allow multiple attempts (amazon database multithreading solution)
 * @param {!function() : !LQ.BusinessLogic.s_callResult} in_call
 * @param {!number} in_attemptCount LQ.BusinessLogic.s_setDataRetryCount
 * @return {!boolean}
 */
LQ.BusinessLogic.CallRetry = function(in_call, in_attemptCount)
{
	for (var /** @type {!number} */ index = 0; index < in_attemptCount; ++index)
	{
		/** @type {!LQ.BusinessLogic.s_callResult} */
		var result = in_call();
		switch (result)
		{
		default:
		case LQ.BusinessLogic.s_callResult.e_tryAgain:
			break;
		case LQ.BusinessLogic.s_callResult.e_success:
			return true;
		case LQ.BusinessLogic.s_callResult.e_failure:
			return false;
		}
	}
	return false;
}


