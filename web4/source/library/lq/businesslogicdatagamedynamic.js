/**
 * @private
 * @constructor
 * @dict
 * @param {!number} in_money
 * @param {!number} in_fateStone
 * @param {!string} in_fateStoneRecoveryTimeDate (iso string)
 * @param {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 */
LQ.BusinessLogicDataGameDynamic = function(
	in_money,
	in_fateStone,
	in_fateStoneRecoveryTimeDate,
	in_arrayPendingActions
	)
{
	this['m'] = in_money;
	this['f'] = in_fateStone;
	this['g'] = in_fateStoneRecoveryTimeDate;
	this['a'] = in_arrayPendingActions;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @return {!number}
 */
LQ.BusinessLogicDataGameDynamic.AccessorGetMoney = function(
	in_dataGameDynamic
	)
{
	return in_dataGameDynamic['m'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @param {!number} in_money
 */
LQ.BusinessLogicDataGameDynamic.AccessorSetMoney = function(
	in_dataGameDynamic,
	in_money
	)
{
	in_dataGameDynamic['m'] = in_money;
	return;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @return {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 */
LQ.BusinessLogicDataGameDynamic.AccessorGetArrayPendingActions = function(
	in_dataGameDynamic
	)
{
	return in_dataGameDynamic['a'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @param {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 */
LQ.BusinessLogicDataGameDynamic.AccessorSetArrayPendingActions = function(
	in_dataGameDynamic,
	in_arrayPendingActions
	)
{
	in_dataGameDynamic['a'] = in_arrayPendingActions;
	return;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @return {!number}
 */
LQ.BusinessLogicDataGameDynamic.AccessorGetFateStone = function(
	in_dataGameDynamic
	)
{
	return in_dataGameDynamic['f'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @param {!number} in_fateStone
 */
LQ.BusinessLogicDataGameDynamic.AccessorSetFateStone = function(
	in_dataGameDynamic,
	in_fateStone
	)
{
	in_dataGameDynamic['f'] = in_fateStone;
	return;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @return {!string}
 */
LQ.BusinessLogicDataGameDynamic.AccessorGetFateStoneRecoveryTimeDate = function(
	in_dataGameDynamic
	)
{
	return in_dataGameDynamic['g'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameDynamic} in_dataGameDynamic
 * @param {!string} in_fateStoneRecoveryTimeDate
 */
LQ.BusinessLogicDataGameDynamic.AccessorSetFateStoneRecoveryTimeDate = function(
	in_dataGameDynamic,
	in_fateStoneRecoveryTimeDate
	)
{
	in_dataGameDynamic['g'] = in_fateStoneRecoveryTimeDate;
	return;
}



/**
 * @param {!number} in_money
 * @param {!number} in_fateStone
 * @param {!string} in_fateStoneRecoveryTimeDate (iso string or empty)
 * @param {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 * @return {!LQ.BusinessLogicDataGameDynamic}
 */
LQ.BusinessLogicDataGameDynamic.Factory = function(
	in_money,
	in_fateStone,
	in_fateStoneRecoveryTimeDate,
	in_arrayPendingActions
	)
{
	return new LQ.BusinessLogicDataGameDynamic(
		in_money,
		in_fateStone,
		in_fateStoneRecoveryTimeDate,
		in_arrayPendingActions
		);
}

///**
//return true if pending action is found and removed
// * @param {!string} in_gameID
// * @param {!string} in_language
// * @param {!LQ.DataStoreRecord} in_dataStore
// * @param {!LQ.BusinessLogic.s_actions} in_pendingAction
// * @return {!boolean}
// * @throws {!LQ.DataStoreException}
// */
//LQ.BusinessLogicDataGameDynamic.HelperPendingActionRemove = function(in_gameID, in_language, in_dataStore, in_pendingAction)
//{
//	for (var /** @type {!number} */ retry = 0; retry < LQ.BusinessLogic.s_setDataRetryCount; ++retry)
//	{
//		/** @type {!LQ.DataStoreResult} */
//		var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
//		/** @type {!LQ.BusinessLogicDataGameDynamic} */
//		var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
//
//		/** @type {!Array.<!LQ.BusinessLogic.s_actions>} */
//		var arrayPendingAction = LQ.BusinessLogicDataGameDynamic.AccessorGetArrayPendingActions(gameDynamic);
//
//		var index = arrayPendingAction.indexOf(in_pendingAction);
//		if (-1 === index)
//		{
//			break;
//		}
//
//		arrayPendingAction.splice(index, 1);
//
//		LQ.BusinessLogicDataGameDynamic.AccessorSetArrayPendingActions(
//			gameDynamic,
//			arrayPendingAction
//			);
//
//		if (true === in_dataStore.SetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, JSON.stringify(gameDynamic), result.m_changeID))
//		{
//			return true;
//			break;
//		}
//	}
//
//	return false;
//}
//
///**
//return true if pending action is found and removed
// * @param {!string} in_gameID
// * @param {!string} in_language
// * @param {!LQ.DataStoreRecord} in_dataStore
// * @param {!LQ.BusinessLogic.s_actions} in_pendingAction
// * @return {!boolean}
// * @throws {!LQ.DataStoreException}
// */
//LQ.BusinessLogicDataGameDynamic.HelperPendingActionAddUnique = function(in_gameID, in_language, in_dataStore, in_pendingAction)
//{
//	for (var /** @type {!number} */ retry = 0; retry < LQ.BusinessLogic.s_setDataRetryCount; ++retry)
//	{
//		/** @type {!LQ.DataStoreResult} */
//		var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
//		/** @type {!LQ.BusinessLogicDataGameDynamic} */
//		var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
//
//		/** @type {!Array.<!LQ.BusinessLogic.s_actions>} */
//		var arrayPendingAction = LQ.BusinessLogicDataGameDynamic.AccessorGetArrayPendingActions(gameDynamic);
//
//		var index = arrayPendingAction.indexOf(in_pendingAction);
//		if (-1 !== index)
//		{
//			return false;
//		}
//
//		/** @type {!Array.<!LQ.BusinessLogic.s_actions>} */
//		var newArrayPendingAction = [in_pendingAction].concat(arrayPendingAction);
//
//		LQ.BusinessLogicDataGameDynamic.AccessorSetArrayPendingActions(
//			gameDynamic,
//			arrayPendingAction
//			);
//
//		if (true === in_dataStore.SetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, JSON.stringify(gameDynamic), result.m_changeID))
//		{
//			return true;
//			break;
//		}
//	}
//
//	return false;
//}
//
///**
//return true the given number of fate stones where spent
// * @param {!string} in_gameID
// * @param {!string} in_language
// * @param {!LQ.DataStoreRecord} in_dataStore
// * @param {!number} in_fateStoneSpend
// * @return {!boolean}
// * @throws {!LQ.DataStoreException}
// */
//LQ.BusinessLogicDataGameDynamic.HelperSpendFateStone = function(in_gameID, in_language, in_dataStore, in_fateStoneSpend)
//{
//	if (in_fateStoneSpend < 0)
//	{
//		return false;
//	}
//
//	for (var /** @type {!number} */ retry = 0; retry < LQ.BusinessLogic.s_setDataRetryCount; ++retry)
//	{
//		/** @type {!LQ.DataStoreResult} */
//		var result = in_dataStore.GetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, null);
//		/** @type {!LQ.BusinessLogicDataGameDynamic} */
//		var gameDynamic = /** @type {!LQ.BusinessLogicDataGameDynamic} */(JSON.parse(result.m_data));
//
//		/** @type {!number} */
//		var fateStoneCount = LQ.BusinessLogicDataGameDynamic.AccessorGetFateStone(gameDynamic);
//
//		/** @type {!string} */
//		var fateStoneCountRecoveryTimeDate = LQ.BusinessLogicDataGameDynamic.AccessorGetFateStoneRecoveryTimeDate(gameDynamic);
//
//		/** @type {!Date} */
//		var now = new Date();
//
//		//allow fate stone to recover before doing subtraction (see FactoryCurrent)
//		/** @type {!LQ.ResourceRecoveryHelper} */
//		var resourceRecoveryHelper = LQ.ResourceRecoveryHelper.FactoryCurrent(
//				LQ.BusinessLogic.s_fateStoneMaxCount, 
//				LQ.BusinessLogic.s_millisecondsFateStoneRecover, 
//				fateStoneCount, 
//				LQ.ResourceRecoveryHelper.StringToDateOrNull(fateStoneCountRecoveryTimeDate),
//				now
//				);
//
//		resourceRecoveryHelper.m_currentAmount -= in_fateStoneSpend;
//		if (resourceRecoveryHelper.m_currentAmount < 0)
//		{
//			return false;
//		}
//
//		//and update value after subtraction
//		resourceRecoveryHelper.Evalue(now);
//
//		//update game dynamic
//		LQ.BusinessLogicDataGameDynamic.AccessorSetFateStone(gameDynamic, resourceRecoveryHelper.m_currentAmount);
//		fateStoneCountRecoveryTimeDate = LQ.ResourceRecoveryHelper.DateOrNullToString(resourceRecoveryHelper.m_currentAmountTimeStampOrNull);
//		LQ.BusinessLogicDataGameDynamic.AccessorSetFateStoneRecoveryTimeDate(gameDynamic, fateStoneCountRecoveryTimeDate);
//
//		//write game dynamic to data store
//		if (true === in_dataStore.SetGameData(in_gameID, LQ.BusinessLogic.s_dataKeyGameDynamic, JSON.stringify(gameDynamic), result.m_changeID))
//		{
//			return true;
//			break;
//		}
//	}
//
//	return false;
//}

