/**
 * @private
 * @constructor
 * @dict
 * @param {!number} in_randomSeed
 */
LQ.BusinessLogicDataGameStatic = function(
	in_randomSeed
	)
{
	this['r'] = in_randomSeed;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataGameStatic} in_dataGameStatic
 * @return {!number}
 */
LQ.BusinessLogicDataGameStatic.AccessorGetRandomSeed = function(
	in_dataGameStatic
	)
{
	return in_dataGameStatic['r'];
}

/**
 * @param {!number} in_randomSeed
 * @return {!LQ.BusinessLogicDataGameStatic}
 */
LQ.BusinessLogicDataGameStatic.Factory = function(
	in_randomSeed
	)
{
	return new LQ.BusinessLogicDataGameStatic(
		in_randomSeed
		);
}
