/**

create a new game for the given key

 * @const
 * @unrestricted
 */
LQ.BusinessLogicCreateGame = {}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicCreateGame.Run = function(in_gameID, in_language, in_dataStore)
{
	return LQ.BusinessLogic.CallHelper(function(){ return LQ.BusinessLogicCreateGame.RunThrow(in_gameID, in_language, in_dataStore); }, in_language, in_dataStore);
}


/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicCreateGame.RunThrow = function(in_gameID, in_language, in_dataStore)
{
	// create game
	in_dataStore.CreateGame(in_gameID);

	//random seed
	/** @type {!number} */
	var randomSeed = DSC.RandomSequence.MakeSeed();

	//create the game static
	/** @type {!LQ.BusinessLogicDataGameStatic} */
	var gameStatic = LQ.BusinessLogicDataGameStatic.Factory(randomSeed);
	in_dataStore.CreateGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameStatic, JSON.stringify(gameStatic));

	/** @type {!Array.<!LQ.BusinessLogic.s_actions>} */
	var arrayPendingActions = [LQ.BusinessLogic.s_actions.e_startGame0];

	/** @type {!LQ.BusinessLogicDataGameDynamic} */
	var gameDynamic = LQ.BusinessLogicDataGameDynamic.Factory(0, 3, "", arrayPendingActions);
	in_dataStore.CreateGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, JSON.stringify(gameDynamic));
	
	//create the world static
	/** @type {!LQ.BusinessLogicDataWorldStatic} */
	var worldStatic = LQ.BusinessLogicDataWorldStatic.FactoryCreateGame(
		/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */(JSON.parse(in_dataStore.GetApplicationData("MobList.1"))),
		/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */(JSON.parse(in_dataStore.GetApplicationData("MobList.2"))),
		/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */(JSON.parse(in_dataStore.GetApplicationData("MobList.3"))),
		/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */(JSON.parse(in_dataStore.GetApplicationData("MobList.4"))),
		/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */(JSON.parse(in_dataStore.GetApplicationData("MobList.5"))),
		randomSeed
		);
	in_dataStore.CreateGameData(in_gameID, LQ.BusinessLogic.s_dataKeyWorldStatic, JSON.stringify(worldStatic));

	//create the world dynamic
	/** @type {!LQ.BusinessLogicDataWorldDynamic} */
	var worldDynamic = LQ.BusinessLogicDataWorldDynamic.FactoryCreateGame(worldStatic, randomSeed);
	in_dataStore.CreateGameData(in_gameID, LQ.BusinessLogic.s_dataKeyWorldDynamic, JSON.stringify(worldDynamic));

	/** @type {!LQ.PresentationLayerDataGameStatus} */
	var gameStatus = LQ.PresentationLayerDataGameStatus.FactoryBusinessLogic(gameDynamic);

	return JSON.stringify(gameStatus);
}
