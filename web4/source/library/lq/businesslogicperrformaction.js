/**

perform a game action, requires it to be present in the pending array

 * @const
 * @unrestricted
 */
LQ.BusinessLogicPerformAction = {}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.BusinessLogic.s_actions} in_action
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicPerformAction.Run = function(in_gameID, in_language, in_action, in_choice, in_data, in_dataStore)
{
	return LQ.BusinessLogic.CallHelper(function(){ return LQ.BusinessLogicPerformAction.RunThrow(in_gameID, in_language, in_action, in_choice, in_data, in_dataStore); }, in_language, in_dataStore);
}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.BusinessLogic.s_actions} in_action
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunThrow = function(in_gameID, in_language, in_action, in_choice, in_data, in_dataStore)
{
	switch (in_action)
	{
	default:
		break;
	case LQ.BusinessLogic.s_actions.e_confirmDeleteGame:
		LQ.BusinessLogicPerformAction.RunConfirmDeleteGame(in_gameID, in_language, in_choice, in_data, in_dataStore);
		break;
	case LQ.BusinessLogic.s_actions.e_openingCinematic:
		LQ.BusinessLogicPerformAction.RunOpeningCinematic(in_gameID, in_language, in_dataStore);
		break;
	case LQ.BusinessLogic.s_actions.e_startGame0:
		LQ.BusinessLogicPerformAction.RunStartGame0(in_gameID, in_language, in_choice, in_data, in_dataStore);
		break;
	case LQ.BusinessLogic.s_actions.e_startGame1:
		LQ.BusinessLogicPerformAction.RunStartGame1(in_gameID, in_language, in_choice, in_data, in_dataStore);
		break;
	case LQ.BusinessLogic.s_actions.e_startGame2:
		LQ.BusinessLogicPerformAction.RunStartGame2(in_gameID, in_language, in_choice, in_data, in_dataStore);
		break;
	case LQ.BusinessLogic.s_actions.e_startGameList:
		LQ.BusinessLogicPerformAction.RunStartGameList(in_gameID, in_language, in_choice, in_data, in_dataStore);
		break;
	}

	/** @type {!LQ.DataStoreResult} */
	var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
	/** @type {!LQ.BusinessLogicDataGameDynamic} */
	var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
	/** @type {!LQ.PresentationLayerDataGameStatus} */
	var gameStatus = LQ.PresentationLayerDataGameStatus.FactoryBusinessLogic(gameDynamic);

	return JSON.stringify(gameStatus);
}

/**

[accept] [cancel]

 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunConfirmDeleteGame = function(in_gameID, in_language, in_choice, in_data, in_dataStore)
{
	if (0 === in_choice) //accept
	{
		in_dataStore.RemoveGame(in_gameID);
	}
	return;
}

/**
 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunOpeningCinematic = function(in_gameID, in_language, in_dataStore)
{
	LQ.BusinessLogicDataGameDynamic.HelperPendingActionAddUnique(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame0);
	return;
}

/**

[accept random, reroll, get list]

 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunStartGame0 = function(in_gameID, in_language, in_choice, in_data, in_dataStore)
{
	if (0 === in_choice) //accept
	{
		LQ.BusinessLogicPerformAction.ActionAcceptHero(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame0);
	}
	else if (1 == in_choice) //reroll
	{
		LQ.BusinessLogicPerformAction.ActionReroll(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame0, LQ.BusinessLogic.s_actions.e_startGame1);
	}
	else if (2 == in_choice) //get list
	{
		LQ.BusinessLogicPerformAction.ActionGetList(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame0, 3);
	}

	return;
}


/**

[accept random, reroll]

 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunStartGame1 = function(in_gameID, in_language, in_choice, in_data, in_dataStore)
{
	if (0 === in_choice) //accept
	{
		LQ.BusinessLogicPerformAction.ActionAcceptHero(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame1);
	}
	else if (1 == in_choice) //reroll
	{
		LQ.BusinessLogicPerformAction.ActionReroll(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame1, LQ.BusinessLogic.s_actions.e_startGame2);
	}

	return;
}

/**

[accept random, get list]

 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!number} in_choice
 * @param {!number} in_data
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunStartGame2 = function(in_gameID, in_language, in_choice, in_data, in_dataStore)
{
	if (0 === in_choice) //accept
	{
		LQ.BusinessLogicPerformAction.ActionAcceptHero(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame2);
	}
	else if (1 == in_choice) //get list
	{
		LQ.BusinessLogicPerformAction.ActionGetList(in_gameID, in_language, in_dataStore, LQ.BusinessLogic.s_actions.e_startGame2, 1);
	}
}

/**

[accept list index]

 * @param {!string} in_gameID
 * @param {!string} in_language
 * @param {!number} in_choice
 * @param {!number} in_data // inde of avaliable races
 * @param {!LQ.DataStoreRecord} in_dataStore
 * @throws {!LQ.DataStoreException}
 */
LQ.BusinessLogicPerformAction.RunStartGameList = function(in_gameID, in_language, in_choice, in_data, in_dataStore)
{
	if (0 === in_choice) //accept
	{
		LQ.BusinessLogicPerformAction.ActionAcceptGameList(in_gameID, in_language, in_dataStore, in_data);
	}
}

LQ.BusinessLogicPerformAction.ActionAcceptHero = function(in_gameID, in_language, in_dataStore, in_causeAction)
{
}

LQ.BusinessLogicPerformAction.ActionReroll = function(in_gameID, in_language, in_dataStore, in_causeAction, in_nextAction)
{
}

//LQ.BusinessLogic.s_actions
LQ.BusinessLogicPerformAction.ActionGetList = function(in_gameID, in_language, in_dataStore, in_causeAction, in_fateStoneCost)
{
}


LQ.BusinessLogicPerformAction.ActionAcceptGameList = function(in_gameID, in_language, in_dataStore, in_selectIndex)
{
	/** @type {!function() : !LQ.BusinessLogic.s_callResult} */
	var callFunc = function()
	{
		// check if we have the correct action and remove it
		/** @type {!LQ.DataStoreResult} */
		var resultGameDynamic = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
		/** @type {!LQ.BusinessLogicDataGameDynamic} */
		var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(resultGameDynamic.m_data));
		/** @type {!Array.<!LQ.BusinessLogic.s_actions>} */
		var arrayPendingAction = LQ.BusinessLogicDataGameDynamic.AccessorGetArrayPendingActions(gameDynamic);
		/** @type {!number} */
		var index = arrayPendingAction.indexOf(LQ.BusinessLogic.s_actions.e_startGameList);
		if (-1 === index)
		{
			return LQ.BusinessLogic.s_callResult.e_failure;
		}
		arrayPendingAction.splice(index, 1);
		LQ.BusinessLogicDataGameDynamic.AccessorSetArrayPendingActions(gameDynamic, arrayPendingAction);

		// if we have valid race index, select a starting position
		if ((in_selectIndex < 0) ||
			(LQ.BusinessLogic.s_mobStartGameList.length <= in_selectIndex))
		{
			return LQ.BusinessLogic.s_callResult.e_failure;
		}
		/** @type {!LQ.BusinessLogic.s_mob} */
		var newHeroRace = LQ.BusinessLogic.s_mobStartGameList[in_selectIndex];
		// get start index

		//create new hero

		/** @type {!boolean} */
		var dataWrite = true;
		dataWrite &= in_dataStore.SetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, JSON.stringify(gameDynamic), resultGameDynamic.m_changeID);

		//did data write failed, we can try again (threading?)
		if (true !== dataWrite)
		{
			return LQ.BusinessLogic.s_callResult.e_tryAgain;
		}

		return LQ.BusinessLogic.s_callResult.e_success;
	}

	LQ.BusinessLogic.CallRetry(callFunc, LQ.BusinessLogic.s_setDataRetryCount);

	return;
}

