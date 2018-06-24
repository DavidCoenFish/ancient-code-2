/**
 * @const
 * @unrestricted
 */
c.Math = {}
c["Math"] = c.Math;

/**
 * return true if the given value is equal or within epsilon of zero
 * export
 * @param {!number} in_value
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Math.AlmostZero = function(in_value, _epsilon) {
	var epsilon = (_epsilon === undefined) ? 1e-6 : _epsilon;
	if (Math.abs(in_value) <= epsilon)
		return true;
	return false;
}
c.Math["AlmostZero"] = c.Math.AlmostZero;

/**
 * return true if the lhs is equal or within epsilon of rhs
 * export
 * @param {!number} in_lhs
 * @param {!number} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Math.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	return c.Math.AlmostZero(in_lhs - in_rhs, _epsilon);
}
c.Math["AlmostEqual"] = c.Math.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!number} in_a
 * @param {!number} in_b
 * @param {!number} in_ratio
 * @return {!number}
 */
c.Math.Lerp = function(in_a, in_b, in_ratio) {
	return (in_a * (1.0 - in_ratio)) + (in_b * in_ratio);
}
c.Math["Lerp"] = c.Math.Lerp;

/**
 * return the value clamped between low and high
 * export
 * @param {!number} in_value
 * @param {!number} in_low
 * @param {!number} in_high
 * @return {!number}
 */
c.Math.Clamp = function(in_value, in_low, in_high) {
	if (in_value < in_low)
		return in_low;
	if (in_high < in_value)
		return in_high;
	return in_value;
}
c.Math["Clamp"] = c.Math.Clamp;

/**
 * return the value wrapped (modulus) between low and high
 * export
 * @param {!number} in_value
 * @param {!number} in_low
 * @param {!number} in_high
 * @return {!number}
 */
c.Math.Wrap = function(in_value, in_low, in_high) {
	var length = in_high - in_low;
	if (0.0 == length)
		return in_low;
	return (in_value) - (Math.floor((in_value - in_low) / length) * length);
}
c.Math["Wrap"] = c.Math.Wrap;

/**
 * return the value [0 ... 1] with a smooth progression
 * 3.v^2 - 2.v^3
 * export
 * @param {!number} in_value
 * @return {!number}
 */
c.Math.Smooth = function(in_value) {
	return (3.0 - (2.0 * in_value)) * in_value * in_value;
}
c.Math["Smooth"] = c.Math.Smooth;

/**
 * @param {!number} in_degree
 * @return {!number}
 */
c.Math.DegreeToRadian = function(in_degree){
	return (in_degree * Math.PI) / 180.0;
}
c.Math["DegreeToRadian"] = c.Math.DegreeToRadian;

/**
 * @param {!number} in_radian
 * @return {!number}
 */
c.Math.RadianToDegree = function(in_radian){
	return (180.0 * in_radian) / Math.PI;
}
c.Math["RadianToDegree"] = c.Math.RadianToDegree;

