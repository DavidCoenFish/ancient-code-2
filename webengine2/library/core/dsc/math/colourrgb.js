/**
 * @const
 * @unrestricted
 */
DSC.Math.ColourRGB = {}
DSC.Math['ColourRGB'] = DSC.Math.ColourRGB;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.ColourRGBType;

/**
 * @param {!number=} _red
 * @param {!number=} _green
 * @param {!number=} _blue
 * @return {DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Factory = function(_red, _green, _blue)
{
	return new DSC.Common.t_floatArray([
		(undefined != _red) ? _red : 0.0,
		(undefined != _green) ? _green : 0.0,
		(undefined != _blue) ? _blue : 0.0
		]);
}
DSC.Math.ColourRGB['Factory'] = DSC.Math.ColourRGB.Factory;

/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.GetRed = function(in_data)
{
	return in_data[0];
}
DSC.Math.ColourRGB['GetRed'] = DSC.Math.ColourRGB.GetRed;

/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.GetGreen = function(in_data)
{
	return in_data[1];
}
DSC.Math.ColourRGB['GetGreen'] = DSC.Math.ColourRGB.GetGreen;

/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.GetBlue = function(in_data)
{
	return in_data[2];
}
DSC.Math.ColourRGB['GetBlue'] = DSC.Math.ColourRGB.GetBlue;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_red
 */
DSC.Math.ColourRGB.SetRed = function(in_data, in_red)
{
	in_data[0] = in_red;
	return;
}
DSC.Math.ColourRGB['SetRed'] = DSC.Math.ColourRGB.SetRed;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_green
 */
DSC.Math.ColourRGB.SetGreen = function(in_data, in_green)
{
	in_data[1] = in_green;
	return;
}
DSC.Math.ColourRGB['SetGreen'] = DSC.Math.ColourRGB.SetGreen;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_blue
 */
DSC.Math.ColourRGB.SetBlue = function(in_data, in_blue)
{
	in_data[2] = in_blue;
	return;
}
DSC.Math.ColourRGB['SetBlue'] = DSC.Math.ColourRGB.SetBlue;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_red
 * @param {!number} in_green
 * @param {!number} in_blue
 */
DSC.Math.ColourRGB.Set = function(in_data, in_red, in_green, in_blue)
{
	in_data[0] = in_red;
	in_data[1] = in_green;
	in_data[2] = in_blue;
	return;
}
DSC.Math.ColourRGB['Set'] = DSC.Math.ColourRGB.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory(in_data[0], in_data[1], in_data[2]);
	}
	else
	{
		DSC.Math.ColourRGB.Set(_result, in_data[0], in_data[1], in_data[2]);
	}
	return _result;
}
DSC.Math.ColourRGB['Clone'] = DSC.Math.ColourRGB.Clone;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {string}
 */
DSC.Math.ColourRGB.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + "]"
}
DSC.Math.ColourRGB['AsString'] = DSC.Math.ColourRGB.AsString;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {string}
 */
DSC.Math.ColourRGB.AsFillString = function(in_data)
{
	return "rgb(" + 
		Math.floor((in_data[0] * 255.0) + 0.5) + ", " + 
		Math.floor((in_data[1] * 255.0) + 0.5) + ", " + 
		Math.floor((in_data[2] * 255.0) + 0.5) + ")";
}
DSC.Math.ColourRGB['AsFillString'] = DSC.Math.ColourRGB.AsFillString;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.LengthSquared = function(in_data)
{
	return DSC.Math.ColourRGB.DotProduct(in_data, in_data);
}
DSC.Math.ColourRGB['LengthSquared'] = DSC.Math.ColourRGB.LengthSquared;


/**
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.Length = function(in_data)
{
	return Math.sqrt(DSC.Math.ColourRGB.LengthSquared(in_data));
}
DSC.Math.ColourRGB['Length'] = DSC.Math.ColourRGB.Length;


/**
 * export
 * @param {!DSC.Math.ColourRGBType} in_data
 * @return {!number}
 */
DSC.Math.ColourRGB.ApproxLength = function(in_data)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.ColourRGB.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
DSC.Math.ColourRGB['ApproxLength'] = DSC.Math.ColourRGB.ApproxLengthRaw;


/**
 * export
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!DSC.Math.ColourRGBType} in_rhs
 * @return {!number}
 */
DSC.Math.ColourRGB.DotProduct = function(in_lhs, in_rhs)
{
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]);
}
DSC.Math.ColourRGB['DotProduct'] = DSC.Math.ColourRGB.DotProduct;


/**
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!DSC.Math.ColourRGBType} in_rhs
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2]);
	return _result;
}
DSC.Math.ColourRGB['Plus'] = DSC.Math.ColourRGB.Plus;


/**
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!DSC.Math.ColourRGBType} in_rhs
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2]);
	return _result;
}
DSC.Math.ColourRGB['Minus'] = DSC.Math.ColourRGB.Minus;


/**
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand);
	return _result;
}
DSC.Math.ColourRGB['MultiplyNumeric'] = DSC.Math.ColourRGB.MultiplyNumeric;


/**
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand);
	return _result;
}
DSC.Math.ColourRGB['DivideNumeric'] = DSC.Math.ColourRGB.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.ColourRGB.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[2], _epsilon);
	return result;
}
DSC.Math.ColourRGB['AlmostZero'] = DSC.Math.ColourRGB.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!DSC.Math.ColourRGBType} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.ColourRGB.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.ColourRGB.AlmostEqual.temp = DSC.Math.ColourRGB.Minus(in_lhs, in_rhs, DSC.Math.ColourRGB.AlmostEqual.temp);
	return DSC.Math.ColourRGB.AlmostZero(DSC.Math.ColourRGB.AlmostEqual.temp, _epsilon);
}
DSC.Math.ColourRGB['AlmostEqual'] = DSC.Math.ColourRGB.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.ColourRGBType} in_lhs
 * @param {!DSC.Math.ColourRGBType} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		DSC.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio)
		);
	return _result;
}
DSC.Math.ColourRGB['Lerp'] = DSC.Math.ColourRGB.Lerp;


/**
 * return the value clamped between low and high
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Clamp = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(
		_result, 
		DSC.Math.Clamp(in_data[0], in_low, in_high),
		DSC.Math.Clamp(in_data[1], in_low, in_high),
		DSC.Math.Clamp(in_data[2], in_low, in_high)
		);
	return _result;
}
DSC.Math.ColourRGB['Clamp'] = DSC.Math.ColourRGB.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!DSC.Math.ColourRGBType} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.ColourRGBType=} _result
 * @return {!DSC.Math.ColourRGBType}
 */
DSC.Math.ColourRGB.Wrap = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.ColourRGB.Factory();
	}
	DSC.Math.ColourRGB.Set(
		_result, 
		DSC.Math.Wrap(in_data[0], in_low, in_high),
		DSC.Math.Wrap(in_data[1], in_low, in_high),
		DSC.Math.Wrap(in_data[2], in_low, in_high)
		);
	return _result;
}
DSC.Math.ColourRGB['Wrap'] = DSC.Math.ColourRGB.Wrap;


DSC.Math.ColourRGB['s_black'] = DSC.Math.ColourRGB.Factory(0.0, 0.0, 0.0);
DSC.Math.ColourRGB['s_white'] = DSC.Math.ColourRGB.Factory(1.0, 1.0, 1.0);
DSC.Math.ColourRGB['s_grey'] = DSC.Math.ColourRGB.Factory(0.5, 0.5, 0.5);
DSC.Math.ColourRGB['s_red'] = DSC.Math.ColourRGB.Factory(1.0, 0.0, 0.0);
DSC.Math.ColourRGB['s_green'] = DSC.Math.ColourRGB.Factory(0.0, 1.0, 0.0);
DSC.Math.ColourRGB['s_blue'] = DSC.Math.ColourRGB.Factory(0.0, 0.0, 1.0);
