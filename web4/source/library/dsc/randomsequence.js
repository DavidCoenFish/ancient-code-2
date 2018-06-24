/**
 * @private
 * @constructor
 * @struct
 * @param {!number} in_seed
 */
DSC.RandomSequence = function(in_seed)
{
	/** @type {!number} */
	this.m_seed = in_seed % 233280;
	return;
}

/**
 * @param {!number} in_seed
 * @return {!DSC.RandomSequence}
 */
DSC.RandomSequence.Factory = function(in_seed)
{
	return new DSC.RandomSequence(in_seed);
}

/**
 * @return {!number}
 */
DSC.RandomSequence.MakeSeed = function()
{
	return Math.floor(Math.random() * 233280);
}

/**
 * return [0 ... 1> not inclusive of 1.0, just approaches 0.99999
 * @return {!number}
 */
DSC.RandomSequence.prototype.Random = function()
{
	this.m_seed = (this.m_seed * 9301 + 49297) % 233280;
	/** @type {!number} */
	var result = this.m_seed / 233280;
	return result;
}

/**
 * @template TYPE
 * @param {!Array.<!TYPE>} in_arraySource
 * @param {null|Array.<!TYPE>} in_arrayDestOrNull
 * @return {!Array.<!TYPE>}
 */
DSC.RandomSequence.prototype.ShuffelArray = function(
	in_arraySource,
	in_arrayDestOrNull
	)
{
	if (null === in_arrayDestOrNull)
	{
		in_arrayDestOrNull = [];
	}
	in_arrayDestOrNull.length = in_arraySource.length;

	/** @type {!number} */
	var index = 0;
	for (; index < in_arrayDestOrNull.length; ++index)
	{
		in_arrayDestOrNull[index] = in_arraySource[index];
	}

	/** @type {!number} */
	var currentIndex = in_arrayDestOrNull.length;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) 
	{
		// Pick a remaining element...
		/** @type {!number} */
		var randomIndex = Math.floor(this.Random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		/** @type {?} */
		var temporaryValue = in_arrayDestOrNull[currentIndex];
		in_arrayDestOrNull[currentIndex] = in_arrayDestOrNull[randomIndex];
		in_arrayDestOrNull[randomIndex] = temporaryValue;
	}

	return in_arrayDestOrNull;
}

