/**
 * Directed Node Graph namespace
 * @const
 * @unrestricted
 */
DSC.Math = {}
DSC['Math'] = DSC.Math;

/**
 * return true if the given value is equal or within epsilon of zero
 * export
 * @param {!number} in_value
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.AlmostZero = function(in_value, _epsilon)
{
	var epsilon = _epsilon || 1e-6;
	if (Math.abs(in_value) <= epsilon)
		return true;
	return false;
}
DSC.Math['AlmostZero'] = DSC.Math.AlmostZero;

/**
 * return true if the lhs is equal or within epsilon of rhs
 * export
 * @param {!number} in_lhs
 * @param {!number} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.AlmostZero(in_lhs - in_rhs, _epsilon);
}
DSC.Math['AlmostEqual'] = DSC.Math.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!number} in_a
 * @param {!number} in_b
 * @param {!number} in_ratio
 * @return {!number}
 */
DSC.Math.Lerp = function(in_a, in_b, in_ratio)
{
	return (in_a * (1.0 - in_ratio)) + (in_b * in_ratio);
}
DSC.Math['Lerp'] = DSC.Math.Lerp;

/**
 * return the value clamped between low and high
 * export
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
DSC.Math['Clamp'] = DSC.Math.Clamp;

/**
 * return the value wrapped (modulus) between low and high
 * export
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
DSC.Math['Wrap'] = DSC.Math.Wrap;

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
DSC.Math['Smooth'] = DSC.Math.Smooth;
