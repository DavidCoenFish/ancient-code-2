/**
 * @private
 * @constructor
 * @dict
 * @param {!number} in_money
 * @param {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 */
LQ.PresentationLayerDataGameStatus = function(
	in_money,
	in_arrayPendingActions
	)
{
	this['money'] = in_money;
	this['actions'] = in_arrayPendingActions;
}

/**
 * @param {!number} in_money
 * @param {!Array.<!LQ.BusinessLogic.s_actions>} in_arrayPendingActions
 * @return {!LQ.PresentationLayerDataGameStatus}
 */
LQ.PresentationLayerDataGameStatus.Factory = function(
	in_money,
	in_arrayPendingActions
	)
{
	return new LQ.PresentationLayerDataGameStatus(
		in_money,
		in_arrayPendingActions
		);
}

/**
 * @param {!LQ.BusinessLogicDataGameDynamic} in_gameDynamic
 * @return {!LQ.PresentationLayerDataGameStatus}
 */
LQ.PresentationLayerDataGameStatus.FactoryBusinessLogic = function(
	in_gameDynamic
	)
{
	return LQ.PresentationLayerDataGameStatus.Factory(
		LQ.BusinessLogicDataGameDynamic.AccessorGetMoney(in_gameDynamic),
		LQ.BusinessLogicDataGameDynamic.AccessorGetArrayPendingActions(in_gameDynamic)
		);
}
