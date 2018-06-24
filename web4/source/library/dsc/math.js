/**
 * @const
 * @unrestricted
 */
DSC.Math = {}

/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!number} in_value
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.AlmostZero = function(in_value, _epsilon)
{
	/** @type {!number} */
	var epsilon = (undefined === _epsilon) ? 1e-6 : _epsilon;
	if (Math.abs(in_value) <= epsilon)
		return true;
	return false;
}

/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!number} in_lhs
 * @param {!number} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.AlmostZero(in_lhs - in_rhs, _epsilon);
}

/**
 * return the lerp between a and b
 * @param {!number} in_a
 * @param {!number} in_b
 * @param {!number} in_ratio
 * @return {!number}
 */
DSC.Math.Lerp = function(in_a, in_b, in_ratio)
{
	return (in_a * (1.0 - in_ratio)) + (in_b * in_ratio);
}

/**
 * return the value clamped between low and high
 * @param {!number} in_value
 * @param {!number} in_low
 * @param {!number} in_high
 * @return {!number}
 */
DSC.Math.Clamp = function(in_value, in_low, in_high)
{
	if (in_value < in_low)
		return in_low;
	if (in_high < in_value)
		return in_high;
	return in_value;
}

/**
 * return the value wrapped (modulus) between low and high
 * @param {!number} in_value
 * @param {!number} in_low
 * @param {!number} in_high
 * @return {!number}
 */
DSC.Math.Wrap = function(in_value, in_low, in_high)
{
	var length = in_high - in_low;
	if (0.0 == length)
		return in_low;
	return (in_value) - (Math.floor((in_value - in_low) / length) * length);
}

/**
 * return the value [0 ... 1] with a smooth progression
 * 3.v^2 - 2.v^3
 * export
 * @param {!number} in_value
 * @return {!number}
 */
DSC.Math.Smooth = function(in_value)
{
	return (3.0 - (2.0 * in_value)) * in_value * in_value;
}
