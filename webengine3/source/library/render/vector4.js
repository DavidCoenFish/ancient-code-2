/**
 * @const
 * @unrestricted
 */
c.Vector4 = {}
c["Vector4"] = c.Vector4;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @param {!number=} _z
 * @param {!number=} _w
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Factory = function(_x, _y, _z, _w, _result) {
	if (undefined === _result) {
		_result = new Float32Array([
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0,
			(undefined != _z) ? _z : 0.0,
			(undefined != _w) ? _w : 0.0
			]);
	} else {
		c.Vector4.Set(
			_result, 
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0,
			(undefined != _z) ? _z : 0.0,
			(undefined != _w) ? _w : 0.0
			);
	}
	return _result;
}
c.Vector4["Factory"] = c.Vector4.Factory;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.GetX = function(in_data) {
	return in_data[0];
}
c.Vector4["GetX"] = c.Vector4.GetX;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.GetY = function(in_data) {
	return in_data[1];
}
c.Vector4["GetY"] = c.Vector4.GetY;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.GetZ = function(in_data) {
	return in_data[2];
}
c.Vector4["GetZ"] = c.Vector4.GetZ;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.GetW = function(in_data) {
	return in_data[3];
}
c.Vector4["GetW"] = c.Vector4.GetW;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 * @return {undefined}
 */
c.Vector4.SetX = function(in_data, in_x) {
	in_data[0] = in_x;
	return;
}
c.Vector4["SetX"] = c.Vector4.SetX;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_y
 * @return {undefined}
 */
c.Vector4.SetY = function(in_data, in_y) {
	in_data[1] = in_y;
	return;
}
c.Vector4["SetY"] = c.Vector4.SetY;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_z
 * @return {undefined}
 */
c.Vector4.SetZ = function(in_data, in_z) {
	in_data[2] = in_z;
	return;
}
c.Vector4["SetZ"] = c.Vector4.SetZ;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_w
 * @return {undefined}
 */
c.Vector4.SetW = function(in_data, in_w) {
	in_data[3] = in_w;
	return;
}
c.Vector4["SetW"] = c.Vector4.SetW;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 * @param {!number} in_z
 * @param {!number} in_w
 * @return {undefined}
 */
c.Vector4.Set = function(in_data, in_x, in_y, in_z, in_w) {
	in_data[0] = in_x;
	in_data[1] = in_y;
	in_data[2] = in_z;
	in_data[3] = in_w;
	return;
}
c.Vector4["Set"] = c.Vector4.Set;


/**
 * create or set the result and return it
 * @param {!Float32Array} in_data
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Clone = function(in_data, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory(in_data[0], in_data[1], in_data[2], in_data[3]);
	} else {
		c.Vector4.Set(_result, in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	return _result;
}
c.Vector4["Clone"] = c.Vector4.Clone;


/**
 * @param {!Float32Array} in_data
 * @return {string}
 */
c.Vector4.AsString = function(in_data) {
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + ", " + in_data[3] + "]"
}
c.Vector4["AsString"] = c.Vector4.AsString;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.LengthSquared = function(in_data) {
	return c.Vector4.DotProduct(in_data, in_data);
}
c.Vector4["LengthSquared"] = c.Vector4.LengthSquared;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.Length = function(in_data) {
	return Math.sqrt(c.Vector4.LengthSquared(in_data));
}
c.Vector4["Length"] = c.Vector4.Length;


/**
 * export
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector4.ApproxLength = function(in_data) {
	//terms of tailor series
	var lengthSquared = c.Vector4.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
c.Vector4["ApproxLength"] = c.Vector4.ApproxLength;


/**
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @return {!number}
 */
c.Vector4.DotProduct = function(in_lhs, in_rhs) {
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]) + (in_lhs[3] * in_rhs[3]);
}
c.Vector4["DotProduct"] = c.Vector4.DotProduct;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Plus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result)
	{
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2], in_lhs[3] + in_rhs[3]);
	return _result;
}
c.Vector4["Plus"] = c.Vector4.Plus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Minus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2], in_lhs[3] - in_rhs[3]);
	return _result;
}
c.Vector4["Minus"] = c.Vector4.Minus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.MultiplyNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand, in_lhs[3] * in_operand);
	return _result;
}
c.Vector4["MultiplyNumeric"] = c.Vector4.MultiplyNumeric;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.DivideNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand, in_lhs[3] / in_operand);
	return _result;
}
c.Vector4["DivideNumeric"] = c.Vector4.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!Float32Array} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector4.AlmostZero = function(in_data, _epsilon) {
	var result = true;
	result &= c.Math.AlmostZero(in_data[0], _epsilon);
	result &= c.Math.AlmostZero(in_data[1], _epsilon);
	result &= c.Math.AlmostZero(in_data[2], _epsilon);
	result &= c.Math.AlmostZero(in_data[3], _epsilon);
	return result;
}
c.Vector4["AlmostZero"] = c.Vector4.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector4.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	c.Vector4.AlmostEqual.temp = c.Vector4.Minus(in_lhs, in_rhs, c.Vector4.AlmostEqual.temp);
	return c.Vector4.AlmostZero(c.Vector4.AlmostEqual.temp, _epsilon);
}
c.Vector4["AlmostEqual"] = c.Vector4.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number} in_ratio
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Lerp = function(in_lhs, in_rhs, in_ratio, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(
		_result, 
		c.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		c.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		c.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio),
		c.Math.Lerp(in_lhs[3], in_rhs[3], in_ratio)
		);
	return _result;
}
c.Vector4["Lerp"] = c.Vector4.Lerp;


/**
 * return the value clamped between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Clamp = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(
		_result, 
		c.Math.Clamp(in_data[0], in_low, in_high),
		c.Math.Clamp(in_data[1], in_low, in_high),
		c.Math.Clamp(in_data[2], in_low, in_high),
		c.Math.Clamp(in_data[3], in_low, in_high)
		);
	return _result;
}
c.Vector4["Clamp"] = c.Vector4.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Wrap = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}
	c.Vector4.Set(
		_result, 
		c.Math.Wrap(in_data[0], in_low, in_high),
		c.Math.Wrap(in_data[1], in_low, in_high),
		c.Math.Wrap(in_data[2], in_low, in_high),
		c.Math.Wrap(in_data[3], in_low, in_high)
		);
	return _result;
}
c.Vector4["Wrap"] = c.Vector4.Wrap;


/**
 * @param {!Float32Array} in_data
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector4.Normalise = function(in_data, _result) {
	if (undefined == _result) {
		_result = c.Vector4.Factory();
	}

	var lengthSquared = c.Vector4.LengthSquared(in_data);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared)){
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	c.Vector4.Set(
		_result, 
		in_data[0] * mul, 
		in_data[1] * mul, 
		in_data[2] * mul,
		in_data[3] * mul
		);
	return _result;
}
c.Vector4["Normalise"] = c.Vector4.Normalise;


c.Vector4.s_zero = c.Vector4.Factory();
c.Vector4["s_zero"] = c.Vector4.s_zero;
c.Vector4.s_unitX = c.Vector4.Factory(1.0, 0.0, 0.0, 0.0);
c.Vector4["s_unitX"] = c.Vector4.s_unitX;
c.Vector4.s_unitY = c.Vector4.Factory(0.0, 1.0, 0.0, 0.0);
c.Vector4["s_unitY"] = c.Vector4.s_unitY;
c.Vector4.s_unitZ = c.Vector4.Factory(0.0, 0.0, 1.0, 0.0);
c.Vector4["s_unitZ"] = c.Vector4.s_unitZ;
c.Vector4.s_unitW = c.Vector4.Factory(0.0, 0.0, 0.0, 1.0);
c.Vector4["s_unitW"] = c.Vector4.s_unitW;


