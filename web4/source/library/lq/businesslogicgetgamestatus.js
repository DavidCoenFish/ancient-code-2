/**

get the game status

 * @const
 * @unrestricted
 */
LQ.BusinessLogicGetGameStatus = {}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicGetGameStatus.Run = function(in_gameID, in_language, in_dataStore)
{
	return LQ.BusinessLogic.CallHelper(function(){ return LQ.BusinessLogicGetGameStatus.RunThrow(in_gameID, in_language, in_dataStore); }, in_language, in_dataStore);
}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicGetGameStatus.RunThrow = function(in_gameID, in_language, in_dataStore)
{
	/** @type {!LQ.DataStoreResult} */
	var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
	/** @type {!LQ.BusinessLogicDataGameDynamic} */
	var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
	/** @type {!LQ.PresentationLayerDataGameStatus} */
	var gameStatus = LQ.PresentationLayerDataGameStatus.FactoryBusinessLogic(gameDynamic);

	return JSON.stringify(gameStatus);
}
