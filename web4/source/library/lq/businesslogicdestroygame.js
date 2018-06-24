/**

insert a 'confirm destroy game' action into the pending actions of the game

 * @const
 * @unrestricted
 */
LQ.BusinessLogicDestroyGame = {}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicDestroyGame.Run = function(in_gameID, in_language, in_dataStore)
{
	return LQ.BusinessLogic.CallHelper(function(){ return LQ.BusinessLogicDestroyGame.RunThrow(in_gameID, in_language, in_dataStore); }, in_language, in_dataStore);
}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicDestroyGame.RunThrow = function(in_gameID, in_language, in_dataStore)
{
	LQ.BusinessLogicDataGameDynamic.HelperPendingActionAddUnique(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_confirmDeleteGame);

	/** @type {!LQ.DataStoreResult} */
	var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
	/** @type {!LQ.BusinessLogicDataGameDynamic} */
	var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
	/** @type {!LQ.PresentationLayerDataGameStatus} */
	var gameStatus = LQ.PresentationLayerDataGameStatus.FactoryBusinessLogic(gameDynamic);

	return JSON.stringify(gameStatus);
}
