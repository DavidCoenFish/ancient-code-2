/**
 * @const
 * @unrestricted
 */
c.ColourRGB = {}
c["ColourRGB"] = c.ColourRGB;

/** @typedef {Float32Array} */
c.ColourRGBType = Float32Array;

/**
 * @param {!number=} _red
 * @param {!number=} _green
 * @param {!number=} _blue
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Factory = function(_red, _green, _blue) {
	return new c.ColourRGBType([
		(undefined != _red) ? _red : 0.0,
		(undefined != _green) ? _green : 0.0,
		(undefined != _blue) ? _blue : 0.0
		]);
}
c.ColourRGB["Factory"] = c.ColourRGB.Factory;

/**
 * @param {!c.ColourRGBType} in_data
 * @return {!number}
 */
c.ColourRGB.GetRed = function(in_data) {
	return in_data[0];
}
c.ColourRGB["GetRed"] = c.ColourRGB.GetRed;

/**
 * @param {!c.ColourRGBType} in_data
 * @return {!number}
 */
c.ColourRGB.GetGreen = function(in_data) {
	return in_data[1];
}
c.ColourRGB["GetGreen"] = c.ColourRGB.GetGreen;

/**
 * @param {!c.ColourRGBType} in_data
 * @return {!number}
 */
c.ColourRGB.GetBlue = function(in_data) {
	return in_data[2];
}
c.ColourRGB["GetBlue"] = c.ColourRGB.GetBlue;


/**
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_red
 * @return {undefined}
 */
c.ColourRGB.SetRed = function(in_data, in_red) {
	in_data[0] = in_red;
	return;
}
c.ColourRGB["SetRed"] = c.ColourRGB.SetRed;


/**
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_green
 * @return {undefined}
 */
c.ColourRGB.SetGreen = function(in_data, in_green) {
	in_data[1] = in_green;
	return;
}
c.ColourRGB["SetGreen"] = c.ColourRGB.SetGreen;


/**
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_blue
 * @return {undefined}
 */
c.ColourRGB.SetBlue = function(in_data, in_blue) {
	in_data[2] = in_blue;
	return;
}
c.ColourRGB["SetBlue"] = c.ColourRGB.SetBlue;


/**
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_red
 * @param {!number} in_green
 * @param {!number} in_blue
 * @return {undefined}
 */
c.ColourRGB.Set = function(in_data, in_red, in_green, in_blue) {
	in_data[0] = in_red;
	in_data[1] = in_green;
	in_data[2] = in_blue;
	return;
}
c.ColourRGB["Set"] = c.ColourRGB.Set;


/**
 * create or set the result and return it
 * @param {!c.ColourRGBType} in_data
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Clone = function(in_data, _result) {
	var result = _result;
	if (undefined === result) {
		result = c.ColourRGB.Factory(in_data[0], in_data[1], in_data[2]);
	} else {
		c.ColourRGB.Set(result, in_data[0], in_data[1], in_data[2]);
	}
	return result;
}
c.ColourRGB["Clone"] = c.ColourRGB.Clone;


/**
 * @param {!c.ColourRGBType} in_data
 * @return {string}
 */
c.ColourRGB.AsString = function(in_data) {
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + "]"
}
c.ColourRGB["AsString"] = c.ColourRGB.AsString;

/**
 * @param {!c.ColourRGBType} in_lhs
 * @param {!c.ColourRGBType} in_rhs
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Plus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2]);
	return _result;
}
c.ColourRGB["Plus"] = c.ColourRGB.Plus;


/**
 * @param {!c.ColourRGBType} in_lhs
 * @param {!c.ColourRGBType} in_rhs
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Minus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2]);
	return _result;
}
c.ColourRGB["Minus"] = c.ColourRGB.Minus;


/**
 * @param {!c.ColourRGBType} in_lhs
 * @param {!number} in_operand
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.MultiplyNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand);
	return _result;
}
c.ColourRGB["MultiplyNumeric"] = c.ColourRGB.MultiplyNumeric;

/**
 * @param {!c.ColourRGBType} in_lhs
 * @param {!number} in_operand
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.DivideNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand);
	return _result;
}
c.ColourRGB["DivideNumeric"] = c.ColourRGB.DivideNumeric;

/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!c.ColourRGBType} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.ColourRGB.AlmostZero = function(in_data, _epsilon) {
	var result = true;
	result &= c.Math.AlmostZero(in_data[0], _epsilon);
	result &= c.Math.AlmostZero(in_data[1], _epsilon);
	result &= c.Math.AlmostZero(in_data[2], _epsilon);
	return result;
}
c.ColourRGB["AlmostZero"] = c.ColourRGB.AlmostZero;

/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!c.ColourRGBType} in_lhs
 * @param {!c.ColourRGBType} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.ColourRGB.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	c.ColourRGB.AlmostEqual.temp = c.ColourRGB.Minus(in_lhs, in_rhs, c.ColourRGB.AlmostEqual.temp);
	return c.ColourRGB.AlmostZero(c.ColourRGB.AlmostEqual.temp, _epsilon);
}
c.ColourRGB["AlmostEqual"] = c.ColourRGB.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!c.ColourRGBType} in_lhs
 * @param {!c.ColourRGBType} in_rhs
 * @param {!number} in_ratio
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Lerp = function(in_lhs, in_rhs, in_ratio, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(
		_result, 
		c.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		c.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		c.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio)
		);
	return _result;
}
c.ColourRGB["Lerp"] = c.ColourRGB.Lerp;


/**
 * return the value clamped between low and high
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Clamp = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(
		_result, 
		c.Math.Clamp(in_data[0], in_low, in_high),
		c.Math.Clamp(in_data[1], in_low, in_high),
		c.Math.Clamp(in_data[2], in_low, in_high)
		);
	return _result;
}
c.ColourRGB["Clamp"] = c.ColourRGB.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!c.ColourRGBType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!c.ColourRGBType=} _result
 * @return {!c.ColourRGBType}
 */
c.ColourRGB.Wrap = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.ColourRGB.Factory();
	}
	c.ColourRGB.Set(
		_result, 
		c.Math.Wrap(in_data[0], in_low, in_high),
		c.Math.Wrap(in_data[1], in_low, in_high),
		c.Math.Wrap(in_data[2], in_low, in_high)
		);
	return _result;
}
c.ColourRGB["Wrap"] = c.ColourRGB.Wrap;


c.ColourRGB["s_black"] = c.ColourRGB.Factory(0.0, 0.0, 0.0);
c.ColourRGB["s_white"] = c.ColourRGB.Factory(1.0, 1.0, 1.0);
c.ColourRGB["s_grey"] = c.ColourRGB.Factory(0.5, 0.5, 0.5);
c.ColourRGB["s_red"] = c.ColourRGB.Factory(1.0, 0.0, 0.0);
c.ColourRGB["s_green"] = c.ColourRGB.Factory(0.0, 1.0, 0.0);
c.ColourRGB["s_blue"] = c.ColourRGB.Factory(0.0, 0.0, 1.0);
