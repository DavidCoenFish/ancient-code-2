/**
 * @const
 * @unrestricted
 */
DSC.Math.ColourRGBA = {}
DSC.Math['ColourRGBA'] = DSC.Math.ColourRGBA;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.ColourRGBAType;

/**
 * @param {!number=} _red
 * @param {!number=} _green
 * @param {!number=} _blue
 * @param {!number=} _alpha
 * @return {DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Factory = function(_red, _green, _blue, _alpha)
{
	return new DSC.Common.t_floatArray([
		(undefined != _red) ? _red : 0.0,
		(undefined != _green) ? _green : 0.0,
		(undefined != _blue) ? _blue : 0.0,
		(undefined != _alpha) ? _alpha : 0.0
		]);
}
DSC.Math.ColourRGBA['Factory'] = DSC.Math.ColourRGBA.Factory;

/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.GetRed = function(in_data)
{
	return in_data[0];
}
DSC.Math.ColourRGBA['GetRed'] = DSC.Math.ColourRGBA.GetRed;

/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.GetGreen = function(in_data)
{
	return in_data[1];
}
DSC.Math.ColourRGBA['GetGreen'] = DSC.Math.ColourRGBA.GetGreen;

/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.GetBlue = function(in_data)
{
	return in_data[2];
}
DSC.Math.ColourRGBA['GetBlue'] = DSC.Math.ColourRGBA.GetBlue;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.GetAlpha = function(in_data)
{
	return in_data[3];
}
DSC.Math.ColourRGBA['GetAlpha'] = DSC.Math.ColourRGBA.GetAlpha;


/**
 * @param {!(DSC.Math.ColourRGB|DSC.Math.ColourRGBA)} in_default
 * @param {!number}
 * @return {!number}
 */
DSC.Math.ColourRGBA.GetAlphaSafe = function(in_data, in_default)
{
	if (4 <= in_data.length)
		return in_data[3];
	return in_default;
}
DSC.Math.ColourRGBA['GetAlphaSafe'] = DSC.Math.ColourRGBA.GetAlphaSafe;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_red
 */
DSC.Math.ColourRGBA.SetRed = function(in_data, in_red)
{
	in_data[0] = in_red;
	return;
}
DSC.Math.ColourRGBA['SetRed'] = DSC.Math.ColourRGBA.SetRed;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_green
 */
DSC.Math.ColourRGBA.SetGreen = function(in_data, in_green)
{
	in_data[1] = in_green;
	return;
}
DSC.Math.ColourRGBA['SetGreen'] = DSC.Math.ColourRGBA.SetGreen;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_blue
 */
DSC.Math.ColourRGBA.SetBlue = function(in_data, in_blue)
{
	in_data[2] = in_blue;
	return;
}
DSC.Math.ColourRGBA['SetBlue'] = DSC.Math.ColourRGBA.SetBlue;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_alpha
 */
DSC.Math.ColourRGBA.SetAlpha = function(in_data, in_alpha)
{
	in_data[3] = in_alpha;
	return;
}
DSC.Math.ColourRGBA['SetAlpha'] = DSC.Math.ColourRGBA.SetAlpha;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_red
 * @param {!number} in_green
 * @param {!number} in_blue
 * @param {!number} in_alpha
 */
DSC.Math.ColourRGBA.Set = function(in_data, in_red, in_green, in_blue, in_alpha)
{
	in_data[0] = in_red;
	in_data[1] = in_green;
	in_data[2] = in_blue;
	in_data[3] = in_alpha;
	return;
}
DSC.Math.ColourRGBA['Set'] = DSC.Math.ColourRGBA.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory(in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	else
	{
		DSC.Math.ColourRGBA.Set(_result, in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	return _result;
}
DSC.Math.ColourRGBA['Clone'] = DSC.Math.ColourRGBA.Clone;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {string}
 */
DSC.Math.ColourRGBA.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + ", " + in_data[3] + "]"
}
DSC.Math.ColourRGBA['AsString'] = DSC.Math.ColourRGBA.AsString;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.LengthSquared = function(in_data)
{
	return DSC.Math.ColourRGBA.DotProduct(in_data, in_data);
}
DSC.Math.ColourRGBA['LengthSquared'] = DSC.Math.ColourRGBA.LengthSquared;


/**
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.Length = function(in_data)
{
	return Math.sqrt(DSC.Math.ColourRGBA.LengthSquared(in_data));
}
DSC.Math.ColourRGBA['Length'] = DSC.Math.ColourRGBA.Length;


/**
 * export
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGBA.ApproxLength = function(in_data)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.ColourRGBA.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
DSC.Math.ColourRGBA['ApproxLength'] = DSC.Math.ColourRGBA.ApproxLengthRaw;


/**
 * export
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!DSC.Math.ColourRGBAType} in_rhs
 * @return {!number}
 */
DSC.Math.ColourRGBA.DotProduct = function(in_lhs, in_rhs)
{
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]) + (in_lhs[3] * in_rhs[3]);
}
DSC.Math.ColourRGBA['DotProduct'] = DSC.Math.ColourRGBA.DotProduct;


/**
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!DSC.Math.ColourRGBAType} in_rhs
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2], in_lhs[3] + in_rhs[3]);
	return _result;
}
DSC.Math.ColourRGBA['Plus'] = DSC.Math.ColourRGBA.Plus;


/**
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!DSC.Math.ColourRGBAType} in_rhs
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2], in_lhs[3] - in_rhs[3]);
	return _result;
}
DSC.Math.ColourRGBA['Minus'] = DSC.Math.ColourRGBA.Minus;


/**
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand, in_lhs[3] * in_operand);
	return _result;
}
DSC.Math.ColourRGBA['MultiplyNumeric'] = DSC.Math.ColourRGBA.MultiplyNumeric;


/**
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand, in_lhs[3] / in_operand);
	return _result;
}
DSC.Math.ColourRGBA['DivideNumeric'] = DSC.Math.ColourRGBA.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.ColourRGBA.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[2], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[3], _epsilon);
	return result;
}
DSC.Math.ColourRGBA['AlmostZero'] = DSC.Math.ColourRGBA.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!DSC.Math.ColourRGBAType} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.ColourRGBA.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.ColourRGBA.AlmostEqual.temp = DSC.Math.ColourRGBA.Minus(in_lhs, in_rhs, DSC.Math.ColourRGBA.AlmostEqual.temp);
	return DSC.Math.ColourRGBA.AlmostZero(DSC.Math.ColourRGBA.AlmostEqual.temp, _epsilon);
}
DSC.Math.ColourRGBA['AlmostEqual'] = DSC.Math.ColourRGBA.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.ColourRGBAType} in_lhs
 * @param {!DSC.Math.ColourRGBAType} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		DSC.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio),
		DSC.Math.Lerp(in_lhs[3], in_rhs[3], in_ratio)
		);
	return _result;
}
DSC.Math.ColourRGBA['Lerp'] = DSC.Math.ColourRGBA.Lerp;


/**
 * return the value clamped between low and high
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Clamp = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(
		_result, 
		DSC.Math.Clamp(in_data[0], in_low, in_high),
		DSC.Math.Clamp(in_data[1], in_low, in_high),
		DSC.Math.Clamp(in_data[2], in_low, in_high),
		DSC.Math.Clamp(in_data[3], in_low, in_high)
		);
	return _result;
}
DSC.Math.ColourRGBA['Clamp'] = DSC.Math.ColourRGBA.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!DSC.Math.ColourRGBAType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.ColourRGBAType=} _result
 * @return {!DSC.Math.ColourRGBAType}
 */
DSC.Math.ColourRGBA.Wrap = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGBA.Factory();
	}
	DSC.Math.ColourRGBA.Set(
		_result, 
		DSC.Math.Wrap(in_data[0], in_low, in_high),
		DSC.Math.Wrap(in_data[1], in_low, in_high),
		DSC.Math.Wrap(in_data[2], in_low, in_high),
		DSC.Math.Wrap(in_data[3], in_low, in_high)
		);
	return _result;
}
DSC.Math.ColourRGBA['Wrap'] = DSC.Math.ColourRGBA.Wrap;


DSC.Math.ColourRGBA['s_transparent'] = DSC.Math.ColourRGBA.Factory(0.0, 0.0, 0.0, 0.0);
DSC.Math.ColourRGBA['s_half'] = DSC.Math.ColourRGBA.Factory(0.0, 0.0, 0.0, 0.5);
DSC.Math.ColourRGBA['s_black'] = DSC.Math.ColourRGBA.Factory(0.0, 0.0, 0.0, 1.0);
DSC.Math.ColourRGBA['s_white'] = DSC.Math.ColourRGBA.Factory(1.0, 1.0, 1.0, 1.0);
DSC.Math.ColourRGBA['s_grey'] = DSC.Math.ColourRGBA.Factory(0.5, 0.5, 0.5, 1.0);
DSC.Math.ColourRGBA['s_red'] = DSC.Math.ColourRGBA.Factory(1.0, 0.0, 0.0, 1.0);
DSC.Math.ColourRGBA['s_green'] = DSC.Math.ColourRGBA.Factory(0.0, 1.0, 0.0, 1.0);
DSC.Math.ColourRGBA['s_blue'] = DSC.Math.ColourRGBA.Factory(0.0, 0.0, 1.0, 1.0);
