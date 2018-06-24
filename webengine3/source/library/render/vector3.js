/**
 * @const
 * @unrestricted
 */
c.Vector3 = {}
c["Vector3"] = c.Vector3;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @param {!number=} _z
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Factory = function(_x, _y, _z, _result) {
	if (undefined === _result) {
		_result = new Float32Array([
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0,
			(undefined != _z) ? _z : 0.0
			]);
	} else {
		c.Vector3.Set(
			_result, 
			(undefined != _x) ? _x : 0.0,
			(undefined != _y) ? _y : 0.0,
			(undefined != _z) ? _z : 0.0
			);
	}
	return _result;
}
c.Vector3["Factory"] = c.Vector3.Factory;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.GetX = function(in_data) {
	return in_data[0];
}
c.Vector3["GetX"] = c.Vector3.GetX;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.GetY = function(in_data) {
	return in_data[1];
}
c.Vector3["GetY"] = c.Vector3.GetY;

/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.GetZ = function(in_data) {
	return in_data[2];
}
c.Vector3["GetZ"] = c.Vector3.GetZ;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 */
c.Vector3.SetX = function(in_data, in_x) {
	in_data[0] = in_x;
	return;
}
c.Vector3["SetX"] = c.Vector3.SetX;

/**
 * @param {!Float32Array} in_data
 * @param {!number} in_y
 */
c.Vector3.SetY = function(in_data, in_y) {
	in_data[1] = in_y;
	return;
}
c.Vector3["SetY"] = c.Vector3.SetY;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_z
 */
c.Vector3.SetZ = function(in_data, in_z) {
	in_data[2] = in_z;
	return;
}
c.Vector3["SetZ"] = c.Vector3.SetZ;


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 * @param {!number} in_z
 * @return {undefined}
 */
c.Vector3.Set = function(in_data, in_x, in_y, in_z) {
	in_data[0] = in_x;
	in_data[1] = in_y;
	in_data[2] = in_z;
	return;
}
c.Vector3["Set"] = c.Vector3.Set;

/**
 * create or set the result and return it
 * @param {!Float32Array} in_data
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Clone = function(in_data, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory(in_data[0], in_data[1], in_data[2]);
	} else {
		c.Vector3.Set(_result, in_data[0], in_data[1], in_data[2]);
	}
	return _result;
}
c.Vector3["Clone"] = c.Vector3.Clone;


/**
 * @param {!Float32Array} in_data
 * @return {string}
 */
c.Vector3.AsString = function(in_data) {
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + "]"
}
c.Vector3["AsString"] = c.Vector3.AsString;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.LengthSquared = function(in_data) {
	return c.Vector3.DotProduct(in_data, in_data);
}
c.Vector3["LengthSquared"] = c.Vector3.LengthSquared;


/**
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.Length = function(in_data) {
	return Math.sqrt(c.Vector3.LengthSquared(in_data));
}
c.Vector3["Length"] = c.Vector3.Length;


/**
 * export
 * @param {!Float32Array} in_data
 * @return {!number}
 */
c.Vector3.ApproxLength = function(in_data) {
	//terms of tailor series
	var lengthSquared = c.Vector3.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
c.Vector3["ApproxLength"] = c.Vector3.ApproxLength;


/**
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @return {!number}
 */
c.Vector3.DotProduct = function(in_lhs, in_rhs) {
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]);
}
c.Vector3["DotProduct"] = c.Vector3.DotProduct;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Plus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2]);
	return _result;
}
c.Vector3["Plus"] = c.Vector3.Plus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Minus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2]);
	return _result;
}
c.Vector3["Minus"] = c.Vector3.Minus;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.MultiplyNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand);
	return _result;
}
c.Vector3["MultiplyNumeric"] = c.Vector3.MultiplyNumeric;


/**
 * @param {!Float32Array} in_lhs
 * @param {!number} in_operand
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.DivideNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand);
	return _result;
}
c.Vector3["DivideNumeric"] = c.Vector3.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!Float32Array} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector3.AlmostZero = function(in_data, _epsilon) {
	var result = true;
	result &= c.Math.AlmostZero(in_data[0], _epsilon);
	result &= c.Math.AlmostZero(in_data[1], _epsilon);
	result &= c.Math.AlmostZero(in_data[2], _epsilon);
	return result;
}
c.Vector3["AlmostZero"] = c.Vector3.AlmostZero;

/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Vector3.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	c.Vector3.AlmostEqual.temp = c.Vector3.Minus(in_lhs, in_rhs, c.Vector3.AlmostEqual.temp);
	return c.Vector3.AlmostZero(c.Vector3.AlmostEqual.temp, _epsilon);
}
c.Vector3["AlmostEqual"] = c.Vector3.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number} in_ratio
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Lerp = function(in_lhs, in_rhs, in_ratio, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(
		_result, 
		c.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		c.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		c.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio)
		);
	return _result;
}
c.Vector3["Lerp"] = c.Vector3.Lerp;


/**
 * return the value clamped between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Clamp = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(
		_result, 
		c.Math.Clamp(in_data[0], in_low, in_high),
		c.Math.Clamp(in_data[1], in_low, in_high),
		c.Math.Clamp(in_data[2], in_low, in_high)
		);
	return _result;
}
c.Vector3["Clamp"] = c.Vector3.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!Float32Array} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Wrap = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}
	c.Vector3.Set(
		_result, 
		c.Math.Wrap(in_data[0], in_low, in_high),
		c.Math.Wrap(in_data[1], in_low, in_high),
		c.Math.Wrap(in_data[2], in_low, in_high)
		);
	return _result;
}
c.Vector3["Wrap"] = c.Vector3.Wrap;

/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.CrossProduct = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}

	c.Vector3.Set(
		_result,
		(in_lhs[1] * in_rhs[2]) - (in_lhs[2] * in_rhs[1]),
		(in_lhs[2] * in_rhs[0]) - (in_lhs[0] * in_rhs[2]),
		(in_lhs[0] * in_rhs[1]) - (in_lhs[1] * in_rhs[0])
		);
	return _result;
}
c.Vector3["CrossProduct"] = c.Vector3.CrossProduct;


/**
 * @param {!Float32Array} in_data
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Vector3.Normalise = function(in_data, _result) {
	if (undefined == _result) {
		_result = c.Vector3.Factory();
	}

	var lengthSquared = c.Vector3.LengthSquared(in_data);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared)) {
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	c.Vector3.Set(
		_result, 
		in_data[0] * mul, 
		in_data[1] * mul, 
		in_data[2] * mul
		);
	return _result;
}
c.Vector3["Normalise"] = c.Vector3.Normalise;

c.Vector3.s_zero = c.Vector3.Factory();
c.Vector3["s_zero"] = c.Vector3.s_zero;
c.Vector3.s_unitX = c.Vector3.Factory(1.0, 0.0, 0.0);
c.Vector3["s_unitX"] = c.Vector3.s_unitX;
c.Vector3.s_unitY = c.Vector3.Factory(0.0, 1.0, 0.0);
c.Vector3["s_unitY"] = c.Vector3.s_unitY;
c.Vector3.s_unitZ = c.Vector3.Factory(0.0, 0.0, 1.0);
c.Vector3["s_unitZ"] = c.Vector3.s_unitZ;


