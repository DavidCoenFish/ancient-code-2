/**
 * @private
 * @constructor
 * @dict
 * @param {!LQ.BusinessLogic.s_worldDynamicFlag} in_flag
 * @param {!LQ.BusinessLogic.s_worldDynamicAward} in_combatAward
 * @param {!LQ.BusinessLogic.s_worldDynamicAward} in_dialogAward
 */
LQ.BusinessLogicDataWorldDynamicData = function(
	in_flag,
	in_combatAward,
	in_dialogAward
	)
{
	this['f'] = in_flag; //flag
	this['c'] = in_combatAward;
	this['d'] = in_dialogAward;
}

/**
 * @param {!LQ.BusinessLogic.s_worldDynamicFlag} in_flag
 * @param {!LQ.BusinessLogic.s_worldDynamicAward} in_combatAward
 * @param {!LQ.BusinessLogic.s_worldDynamicAward} in_dialogAward
 * @return {!LQ.BusinessLogicDataWorldDynamicData}
 */
LQ.BusinessLogicDataWorldDynamicData.Factory = function(
	in_flag,
	in_combatAward,
	in_dialogAward
	)
{
	return new LQ.BusinessLogicDataWorldDynamicData(
		in_flag,
		in_combatAward,
		in_dialogAward
		);
}
