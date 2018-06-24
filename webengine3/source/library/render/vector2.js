/**
 * @const
 * @unrestricted
 */
c.Vector2 = {}
c["Vector2"] = c.Vector2;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Factory = function(_x, _y, _result) {
	if (undefined === _result) {
		_result = new Float32Array([
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0
			]);
	} else {
		c.Vector2.Set(
			_result, 
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0
			);
	}
	return _result;
}
c.Vector2["Factory"] = c.Vector2.Factory;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector2.GetX = function(in_data) {
	return in_data[0];
}
c.Vector2["GetX"] = c.Vector2.GetX;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector2.GetY = function(in_data) {
	return in_data[1];
}
c.Vector2["GetY"] = c.Vector2.GetY;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 * @return {undefined}
 */
c.Vector2.SetX = function(in_data, in_x) {
	in_data[0] = in_x;
	return;
}
c.Vector2["SetX"] = c.Vector2.SetX;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_y
 * @return {undefined}
 */
c.Vector2.SetY = function(in_data, in_y) {
	in_data[1] = in_y;
	return;
}
c.Vector2["SetY"] = c.Vector2.SetY;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 * @return {undefined}
 */
c.Vector2.Set = function(in_data, in_x, in_y) {
	in_data[0] = in_x;
	in_data[1] = in_y;
	return;
}
c.Vector2["Set"] = c.Vector2.Set;


/**
 * create or set the result and return it
 * @param {!Float32Array} in_data
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Clone = function(in_data, _result) {
	_result = c.Vector2.Factory(in_data[0], in_data[1], _result);
	return _result;
}
c.Vector2["Clone"] = c.Vector2.Clone;


/**
 * @param {!Float32Array} in_data
 * @return {string}
 */
c.Vector2.AsString = function(in_data) {
	return "[" + in_data[0] + ", " + in_data[1] + "]"
}
c.Vector2["AsString"] = c.Vector2.AsString;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector2.LengthSquared = function(in_data) {
	return c.Vector2.DotProduct(in_data, in_data);
}
c.Vector2["LengthSquared"] = c.Vector2.LengthSquared;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector2.Length = function(in_data) {
	return Math.sqrt(c.Vector2.LengthSquared(in_data));
}
c.Vector2["Length"] = c.Vector2.Length;


/**
 * export
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector2.ApproxLength = function(in_data) {
	//terms of tailor series
	var lengthSquared = c.Vector2.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
c.Vector2["ApproxLength"] = c.Vector2.ApproxLength;


/**
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @return {!number}
 */
c.Vector2.DotProduct = function(in_lhs, in_rhs) {
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]);
}
c.Vector2["DotProduct"] = c.Vector2.DotProduct;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Plus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1]);
	return _result;
}
c.Vector2["Plus"] = c.Vector2.Plus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Minus = function(in_lhs, in_rhs, _result) {
	if (undefined === _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1]);
	return _result;
}
c.Vector2["Minus"] = c.Vector2.Minus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.MultiplyNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand);
	return _result;
}
c.Vector2["MultiplyNumeric"] = c.Vector2.MultiplyNumeric;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.DivideNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand);
	return _result;
}
c.Vector2["DivideNumeric"] = c.Vector2.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!Float32Array} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector2.AlmostZero = function(in_data, _epsilon) {
	var result = true;
	result &= c.Math.AlmostZero(in_data[0], _epsilon);
	result &= c.Math.AlmostZero(in_data[1], _epsilon);
	return result;
}
c.Vector2["AlmostZero"] = c.Vector2.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector2.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	c.Vector2.AlmostEqual.temp = c.Vector2.Minus(in_lhs, in_rhs, c.Vector2.AlmostEqual.temp);
	return c.Vector2.AlmostZero(c.Vector2.AlmostEqual.temp, _epsilon);
}
c.Vector2["AlmostEqual"] = c.Vector2.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number} in_ratio
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Lerp = function(in_lhs, in_rhs, in_ratio, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(
		_result, 
		c.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		c.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio)
		);
	return _result;
}
c.Vector2["Lerp"] = c.Vector2.Lerp;


/**
 * return the value clamped between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Clamp = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(
		_result, 
		c.Math.Clamp(in_data[0], in_low, in_high),
		c.Math.Clamp(in_data[1], in_low, in_high)
		);
	return _result;
}
c.Vector2["Clamp"] = c.Vector2.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector2.Wrap = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector2.Factory();
	}
	c.Vector2.Set(
		_result, 
		c.Math.Wrap(in_data[0], in_low, in_high),
		c.Math.Wrap(in_data[1], in_low, in_high)
		);
	return _result;
}
c.Vector2["Wrap"] = c.Vector2.Wrap;

c.Vector2.s_zero = c.Vector2.Factory();
c.Vector2["s_zero"] = c.Vector2.s_zero;
c.Vector2.s_unitX = c.Vector2.Factory(1.0, 0.0);
c.Vector2["s_unitX"] = c.Vector2.s_unitX;
c.Vector2.s_unitY = c.Vector2.Factory(0.0, 1.0);
c.Vector2["s_unitY"] = c.Vector2.s_unitY;
