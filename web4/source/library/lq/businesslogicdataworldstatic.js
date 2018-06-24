/**
 * @private
 * @constructor
 * @dict
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Array.<!LQ.BusinessLogicDataWorldStaticData>} in_arrayData
 */
LQ.BusinessLogicDataWorldStatic = function(
	in_width,
	in_height,
	in_arrayData
	)
{
	this['w'] = in_width;
	this['h'] = in_height;
	this['a'] = in_arrayData;
}

/**
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Array.<!LQ.BusinessLogicDataWorldStaticData>} in_arrayData
 * @return {!LQ.BusinessLogicDataWorldStatic}
 */
LQ.BusinessLogicDataWorldStatic.Factory = function(
	in_width,
	in_height,
	in_arrayData
	)
{
	return new LQ.BusinessLogicDataWorldStatic(
		in_width, 
		in_height,
		in_arrayData
		);
}

/**
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList1
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList2
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList3
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList4
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList5
 * @param {!number} in_randomSeed
 * @return {!LQ.BusinessLogicDataWorldStatic}
 */
LQ.BusinessLogicDataWorldStatic.FactoryCreateGame = function(
	in_arrayMobList1,
	in_arrayMobList2,
	in_arrayMobList3,
	in_arrayMobList4,
	in_arrayMobList5,
	in_randomSeed
	)
{
	// 2 2 1 1 2 2 3 3 4 4 5 5 4 4 3 3
	var /** number */ width = 16; //(((5 - 2) * 2) + 2) * 2
	var /** number */ height = 12; //8 * 3 / 2

	/** @type {!Array.<!LQ.BusinessLogicDataWorldStaticData>} */
	var arrayData = [];
	arrayData.length = width * height;

	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 0, width, height, in_arrayMobList2, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 1, width, height, in_arrayMobList1, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 2, width, height, in_arrayMobList2, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 3, width, height, in_arrayMobList3, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 4, width, height, in_arrayMobList4, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 5, width, height, in_arrayMobList5, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 6, width, height, in_arrayMobList4, in_randomSeed);
	LQ.BusinessLogicDataWorldStatic.SetArrayMob(arrayData, 7, width, height, in_arrayMobList3, in_randomSeed);

	return LQ.BusinessLogicDataWorldStatic.Factory(
		width,
		height,
		arrayData
		);
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.AccessorGetWidth = function(
	in_dataWorldStatic
	)
{
	return in_dataWorldStatic['w'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.AccessorGetHeight = function(
	in_dataWorldStatic
	)
{
	return in_dataWorldStatic['h'];
}

/**
 * accessor
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @return {!Array.<!LQ.BusinessLogicDataWorldStaticData>}
 */
LQ.BusinessLogicDataWorldStatic.AccessorGetArrayData = function(
	in_dataWorldStatic
	)
{
	return in_dataWorldStatic['a'];
}

/**
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @param {!number} in_x
 * @param {!number} in_y
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.CalculateIndex = function(
	in_dataWorldStatic,
	in_x,
	in_y
	)
{
	/** @type {!number} */
	var width = LQ.BusinessLogicDataWorldStatic.AccessorGetWidth(in_dataWorldStatic);
	/** @type {!number} */
	var height = LQ.BusinessLogicDataWorldStatic.AccessorGetHeight(in_dataWorldStatic);

	return LQ.BusinessLogicDataWorldStatic.CalculateIndexImplement(width, height, in_x, in_y);
}

/**
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @param {!number} in_index
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.CalculateX = function(
	in_dataWorldStatic,
	in_index
	)
{
	/** @type {!number} */
	var width = LQ.BusinessLogicDataWorldStatic.AccessorGetWidth(in_dataWorldStatic);
	return (in_index % width);
}

/**
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @param {!number} in_index
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.CalculateY = function(
	in_dataWorldStatic,
	in_index
	)
{
	/** @type {!number} */
	var width = LQ.BusinessLogicDataWorldStatic.AccessorGetWidth(in_dataWorldStatic);
	return Math.floor(in_index / width);
}

/**
 * @param {!LQ.BusinessLogicDataWorldStatic} in_dataWorldStatic
 * @param {!number} in_randomSeed
 * @param {!number} in_attempt
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.SelectStartPosIndex = function(
	in_dataWorldStatic,
	in_randomSeed,
	in_attempt
	)
{
	/** @type {!DSC.RandomSequence} */
	var randomSequence = DSC.RandomSequence.Factory(in_randomSeed + in_attempt);
	/** @type {!number} */
	var x = Math.floor(randomSequence.Random() * 6); 
	/** @type {!number} */
	var height = LQ.BusinessLogicDataWorldStatic.AccessorGetHeight(in_dataWorldStatic);
	/** @type {!number} */
	var y = Math.floor(randomSequence.Random() * height); 
	/** @type {!number} */
	var index = LQ.BusinessLogicDataWorldStatic.CalculateIndex(in_dataWorldStatic, x, y);
	return index;
}

/**
 * @private
 * @param {!Array.<!LQ.BusinessLogicDataWorldStaticData>} inout_arrayMob
 * @param {!number} in_offset
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Array.<!LQ.BusinessLogic.s_mob>} in_arrayMobList
 * @param {!number} in_randomSeed
 */
LQ.BusinessLogicDataWorldStatic.SetArrayMob = function(
	inout_arrayMob, 
	in_offset, 
	in_width, 
	in_height, 
	in_arrayMobList, 
	in_randomSeed
	)
{
	/** @type {!DSC.RandomSequence} */
	var randomSequence = DSC.RandomSequence.Factory(in_randomSeed + in_offset);
	/** @type {!Array.<!LQ.BusinessLogic.s_mob>} */
	var shuffeledMob = randomSequence.ShuffelArray(in_arrayMobList, null);
	/** @type {!Array.<!LQ.BusinessLogic.s_mobType>} */
	var arrayMobType = [ LQ.BusinessLogic.s_mobType.e_alpha, LQ.BusinessLogic.s_mobType.e_beta, LQ.BusinessLogic.s_mobType.e_gamma ];

	var /** number */ traceX = 0;
	var /** number */ traceY = 0;

	for (var /** @type {!number} */ index = 0; index < 8; ++index)
	{
		/** @type {!Array.<!LQ.BusinessLogic.s_mobType>} */
		var shuffeledMobType = randomSequence.ShuffelArray(arrayMobType, null);
		for (var /** @type {!number} */ subIndex = 0; subIndex < 3; ++subIndex)
		{
			/** @type {!LQ.BusinessLogicDataWorldStaticData} */
			var data = LQ.BusinessLogicDataWorldStaticData.Factory(shuffeledMob[index], shuffeledMobType[subIndex]);
			var /** number */ x = (in_offset * 2) + traceX;
			/** @type {!number} */
			var dataIndex = LQ.BusinessLogicDataWorldStatic.CalculateIndexImplement(in_width, in_height, x, traceY);

			inout_arrayMob[dataIndex] = data;
			traceX += 1;
			if (2 == traceX)
			{
				traceX = 0;
				traceY += 1;
			}
		}
	}

	return;
}

/**
 * @private
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!number} in_x
 * @param {!number} in_y
 * @return {!number}
 */
LQ.BusinessLogicDataWorldStatic.CalculateIndexImplement = function(
	in_width,
	in_height,
	in_x,
	in_y
	)
{
	/** @type {!number} */
	var x = DSC.Math.Wrap(in_x, 0, in_width);
	/** @type {!number} */
	var y = DSC.Math.Wrap(in_y, 0, in_height);
	/** @type {!number} */
	var index = (y * in_width) + x; 
	return index;
}
