/**
 * @private
 * @constructor
 * @dict
 * @param {!number} in_originIndex
 * @param {!Array.<!LQ.BusinessLogicDataWorldDynamicData>} in_arrayData
 */
LQ.BusinessLogicDataWorldDynamic = function(
	in_originIndex,
	in_arrayData
	)
{
	this['i'] = in_originIndex;
	this['a'] = in_arrayData;
}

/**
 * @param {!number} in_originIndex
 * @param {!Array.<!LQ.BusinessLogicDataWorldDynamicData>} in_arrayData
 * @return {!LQ.BusinessLogicDataWorldDynamic}
 */
LQ.BusinessLogicDataWorldDynamic.Factory = function(
	in_originIndex,
	in_arrayData
	)
{
	return new LQ.BusinessLogicDataWorldDynamic(
		in_originIndex,
		in_arrayData
		);
}

/**
 * @param {!LQ.BusinessLogicDataWorldStatic} in_worldStatic
 * @param {!number} in_randomSeed
 * @return {!LQ.BusinessLogicDataWorldDynamic}
 */
LQ.BusinessLogicDataWorldDynamic.FactoryCreateGame = function(
	in_worldStatic,
	in_randomSeed
	)
{
	var /** number */ width = LQ.BusinessLogicDataWorldStatic.AccessorGetWidth(in_worldStatic);
	var /** number */ height = LQ.BusinessLogicDataWorldStatic.AccessorGetHeight(in_worldStatic);
	var /** !Array.<!LQ.BusinessLogicDataWorldDynamicData> */ arrayData = [];
	for (var /** @type {!number} */ index = 0; index < width * height; ++index)
	{
		arrayData.push(LQ.BusinessLogicDataWorldDynamicData.Factory(
			LQ.BusinessLogic.s_worldDynamicFlag.e_none,
			LQ.BusinessLogic.s_worldDynamicAward.e_none,
			LQ.BusinessLogic.s_worldDynamicAward.e_none
			));
	}
	var /** number */ originIndex = LQ.BusinessLogicDataWorldStatic.SelectStartPosIndex(in_worldStatic, in_randomSeed, 0);
	return new LQ.BusinessLogicDataWorldDynamic(
		originIndex,
		arrayData
		);
}
