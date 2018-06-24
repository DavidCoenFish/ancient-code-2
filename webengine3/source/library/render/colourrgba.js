/**
 * @const
 * @unrestricted
 */
c.ColourRGBA = {}
c["ColourRGBA"] = c.ColourRGBA;

/** @typedef {Float32Array} */
c.ColourRGBAType = Float32Array;

/**
 * @param {!number=} _red
 * @param {!number=} _green
 * @param {!number=} _blue
 * @param {!number=} _alpha
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Factory = function(_red, _green, _blue, _alpha, _result){
	if (undefined == _result){
		_result = new c.ColourRGBAType([
			(undefined != _red) ? _red : 0.0,
			(undefined != _green) ? _green : 0.0,
			(undefined != _blue) ? _blue : 0.0,
			(undefined != _alpha) ? _alpha : 0.0
			]);
	} else {
		c.ColourRGBA.Set(
			_result, 
			(undefined != _red) ? _red : 0.0,
			(undefined != _green) ? _green : 0.0,
			(undefined != _blue) ? _blue : 0.0,
			(undefined != _alpha) ? _alpha : 0.0
			);
	}
	return _result;
}
c.ColourRGBA["Factory"] = c.ColourRGBA.Factory;

/**
 * @param {!c.ColourRGBAType} in_data
 * @return {!number}
 */
c.ColourRGBA.GetRed = function(in_data) {
	return in_data[0];
}
c.ColourRGBA["GetRed"] = c.ColourRGBA.GetRed;

/**
 * @param {!c.ColourRGBAType} in_data
 * @return {!number}
 */
c.ColourRGBA.GetGreen = function(in_data) {
	return in_data[1];
}
c.ColourRGBA["GetGreen"] = c.ColourRGBA.GetGreen;

/**
 * @param {!c.ColourRGBAType} in_data
 * @return {!number}
 */
c.ColourRGBA.GetBlue = function(in_data) {
	return in_data[2];
}
c.ColourRGBA["GetBlue"] = c.ColourRGBA.GetBlue;


/**
 * @param {!c.ColourRGBAType} in_data
 * @return {!number}
 */
c.ColourRGBA.GetAlpha = function(in_data) {
	return in_data[3];
}
c.ColourRGBA["GetAlpha"] = c.ColourRGBA.GetAlpha;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_default
 * @return {!number}
 */
c.ColourRGBA.GetAlphaSafe = function(in_data, in_default) {
	if (4 <= in_data.length)
		return in_data[3];
	return in_default;
}
c.ColourRGBA["GetAlphaSafe"] = c.ColourRGBA.GetAlphaSafe;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_red
 * @return {undefined}
 */
c.ColourRGBA.SetRed = function(in_data, in_red) {
	in_data[0] = in_red;
	return;
}
c.ColourRGBA["SetRed"] = c.ColourRGBA.SetRed;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_green
 * @return {undefined}
 */
c.ColourRGBA.SetGreen = function(in_data, in_green) {
	in_data[1] = in_green;
	return;
}
c.ColourRGBA["SetGreen"] = c.ColourRGBA.SetGreen;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_blue
 * @return {undefined}
 */
c.ColourRGBA.SetBlue = function(in_data, in_blue) {
	in_data[2] = in_blue;
	return;
}
c.ColourRGBA["SetBlue"] = c.ColourRGBA.SetBlue;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_alpha
 * @return {undefined}
 */
c.ColourRGBA.SetAlpha = function(in_data, in_alpha) {
	in_data[3] = in_alpha;
	return;
}
c.ColourRGBA["SetAlpha"] = c.ColourRGBA.SetAlpha;


/**
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_red
 * @param {!number} in_green
 * @param {!number} in_blue
 * @param {!number} in_alpha
 * @return {undefined}
 */
c.ColourRGBA.Set = function(in_data, in_red, in_green, in_blue, in_alpha) {
	in_data[0] = in_red;
	in_data[1] = in_green;
	in_data[2] = in_blue;
	in_data[3] = in_alpha;
	return;
}
c.ColourRGBA["Set"] = c.ColourRGBA.Set;


/**
 * create or set the result and return it
 * @param {!c.ColourRGBAType} in_data
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Clone = function(in_data, _result) {
	_result = c.ColourRGBA.Factory(in_data[0], in_data[1], in_data[2], in_data[3], _result);
	return _result;
}
c.ColourRGBA["Clone"] = c.ColourRGBA.Clone;


/**
 * @param {!c.ColourRGBAType} in_data
 * @return {string}
 */
c.ColourRGBA.AsString = function(in_data) {
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + ", " + in_data[3] + "]"
}
c.ColourRGBA["AsString"] = c.ColourRGBA.AsString;

/**
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!c.ColourRGBAType} in_rhs
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Plus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2], in_lhs[3] + in_rhs[3]);
	return _result;
}
c.ColourRGBA["Plus"] = c.ColourRGBA.Plus;


/**
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!c.ColourRGBAType} in_rhs
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Minus = function(in_lhs, in_rhs, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2], in_lhs[3] - in_rhs[3]);
	return _result;
}
c.ColourRGBA["Minus"] = c.ColourRGBA.Minus;


/**
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!number} in_operand
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.MultiplyNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand, in_lhs[3] * in_operand);
	return _result;
}
c.ColourRGBA["MultiplyNumeric"] = c.ColourRGBA.MultiplyNumeric;


/**
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!number} in_operand
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.DivideNumeric = function(in_lhs, in_operand, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand, in_lhs[3] / in_operand);
	return _result;
}
c.ColourRGBA["DivideNumeric"] = c.ColourRGBA.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!c.ColourRGBAType} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.ColourRGBA.AlmostZero = function(in_data, _epsilon) {
	var result = true;
	result &= c.Math.AlmostZero(in_data[0], _epsilon);
	result &= c.Math.AlmostZero(in_data[1], _epsilon);
	result &= c.Math.AlmostZero(in_data[2], _epsilon);
	result &= c.Math.AlmostZero(in_data[3], _epsilon);
	return result;
}
c.ColourRGBA["AlmostZero"] = c.ColourRGBA.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!c.ColourRGBAType} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.ColourRGBA.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	c.ColourRGBA.AlmostEqual.temp = c.ColourRGBA.Minus(in_lhs, in_rhs, c.ColourRGBA.AlmostEqual.temp);
	return c.ColourRGBA.AlmostZero(c.ColourRGBA.AlmostEqual.temp, _epsilon);
}
c.ColourRGBA["AlmostEqual"] = c.ColourRGBA.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!c.ColourRGBAType} in_lhs
 * @param {!c.ColourRGBAType} in_rhs
 * @param {!number} in_ratio
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Lerp = function(in_lhs, in_rhs, in_ratio, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(
		_result, 
		c.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		c.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		c.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio),
		c.Math.Lerp(in_lhs[3], in_rhs[3], in_ratio)
		);
	return _result;
}
c.ColourRGBA["Lerp"] = c.ColourRGBA.Lerp;


/**
 * return the value clamped between low and high
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Clamp = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(
		_result, 
		c.Math.Clamp(in_data[0], in_low, in_high),
		c.Math.Clamp(in_data[1], in_low, in_high),
		c.Math.Clamp(in_data[2], in_low, in_high),
		c.Math.Clamp(in_data[3], in_low, in_high)
		);
	return _result;
}
c.ColourRGBA["Clamp"] = c.ColourRGBA.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!c.ColourRGBAType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!c.ColourRGBAType=} _result
 * @return {!c.ColourRGBAType}
 */
c.ColourRGBA.Wrap = function(in_data, in_low, in_high, _result) {
	if (undefined == _result) {
		_result = c.ColourRGBA.Factory();
	}
	c.ColourRGBA.Set(
		_result, 
		c.Math.Wrap(in_data[0], in_low, in_high),
		c.Math.Wrap(in_data[1], in_low, in_high),
		c.Math.Wrap(in_data[2], in_low, in_high),
		c.Math.Wrap(in_data[3], in_low, in_high)
		);
	return _result;
}
c.ColourRGBA["Wrap"] = c.ColourRGBA.Wrap;


c.ColourRGBA.s_transparent = c.ColourRGBA.Factory(0.0, 0.0, 0.0, 0.0);
c.ColourRGBA["s_transparent"] = c.ColourRGBA.s_transparent;

c.ColourRGBA.s_half = c.ColourRGBA.Factory(0.0, 0.0, 0.0, 0.5);
c.ColourRGBA["s_half"] = c.ColourRGBA.s_half;

c.ColourRGBA.s_black = c.ColourRGBA.Factory(0.0, 0.0, 0.0, 1.0);
c.ColourRGBA["s_black"] = c.ColourRGBA.s_black;

c.ColourRGBA.s_white = c.ColourRGBA.Factory(1.0, 1.0, 1.0, 1.0);
c.ColourRGBA["s_white"] = c.ColourRGBA.s_white;

c.ColourRGBA.s_grey = c.ColourRGBA.Factory(0.5, 0.5, 0.5, 1.0);
c.ColourRGBA["s_grey"] = c.ColourRGBA.s_grey;

c.ColourRGBA.s_red = c.ColourRGBA.Factory(1.0, 0.0, 0.0, 1.0);
c.ColourRGBA["s_red"] = c.ColourRGBA.s_red;

c.ColourRGBA.s_green = c.ColourRGBA.Factory(0.0, 1.0, 0.0, 1.0);
c.ColourRGBA["s_green"] = c.ColourRGBA.s_green;

c.ColourRGBA.s_blue = c.ColourRGBA.Factory(0.0, 0.0, 1.0, 1.0);
c.ColourRGBA["s_blue"] = c.ColourRGBA.s_blue;
