/**
 * @private
 * @constructor
 * @dict
 * @param {!LQ.BusinessLogic.s_mob} in_mob
 * @param {!LQ.BusinessLogic.s_mobType} in_type
 */
LQ.BusinessLogicDataWorldStaticData = function(
	in_mob,
	in_type
	)
{
	this['m'] = in_mob;
	this['t'] = in_type;
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataWorldStaticData} in_dataWorldStaticData
 * @return {!LQ.BusinessLogic.s_mob}
 */
LQ.BusinessLogicDataWorldStaticData.AccessorGetMob = function(
	in_dataWorldStaticData
	)
{
	return in_dataWorldStaticData['m'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataWorldStaticData} in_dataWorldStaticData
 * @return {!LQ.BusinessLogic.s_mobType}
 */
LQ.BusinessLogicDataWorldStaticData.AccessorGetType = function(
	in_dataWorldStaticData
	)
{
	return in_dataWorldStaticData['t'];
}

/**
 * @param {!LQ.BusinessLogic.s_mob} in_mob
 * @param {!LQ.BusinessLogic.s_mobType} in_type
 * @return {!LQ.BusinessLogicDataWorldStaticData}
 */
LQ.BusinessLogicDataWorldStaticData.Factory = function(
	in_mob,
	in_type
	)
{
	return new LQ.BusinessLogicDataWorldStaticData(
		in_mob,
		in_type
		);
}
