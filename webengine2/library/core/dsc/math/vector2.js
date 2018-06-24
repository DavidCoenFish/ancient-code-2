/**
 * @const
 * @unrestricted
 */
DSC.Math.Vector2 = {}
DSC.Math['Vector2'] = DSC.Math.Vector2;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.Vector2Type;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @return {DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Factory = function(_x, _y)
{
	return new DSC.Common.t_floatArray([
		(undefined != _x) ? _x : 0.0,
		(undefined != _y) ? _y : 0.0
		]);
}
DSC.Math.Vector2['Factory'] = DSC.Math.Vector2.Factory;

/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {!number}
 */
DSC.Math.Vector2.GetX = function(in_data)
{
	return in_data[0];
}
DSC.Math.Vector2['GetX'] = DSC.Math.Vector2.GetX;

/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {!number}
 */
DSC.Math.Vector2.GetY = function(in_data)
{
	return in_data[1];
}
DSC.Math.Vector2['GetY'] = DSC.Math.Vector2.GetY;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number} in_x
 */
DSC.Math.Vector2.SetX = function(in_data, in_x)
{
	in_data[0] = in_x;
	return;
}
DSC.Math.Vector2['SetX'] = DSC.Math.Vector2.SetX;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number} in_y
 */
DSC.Math.Vector2.SetY = function(in_data, in_y)
{
	in_data[1] = in_y;
	return;
}
DSC.Math.Vector2['SetY'] = DSC.Math.Vector2.SetY;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 */
DSC.Math.Vector2.Set = function(in_data, in_x, in_y)
{
	in_data[0] = in_x;
	in_data[1] = in_y;
	return;
}
DSC.Math.Vector2['Set'] = DSC.Math.Vector2.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory(in_data[0], in_data[1]);
	}
	else
	{
		DSC.Math.Vector2.Set(_result, in_data[0], in_data[1]);
	}
	return _result;
}
DSC.Math.Vector2['Clone'] = DSC.Math.Vector2.Clone;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {string}
 */
DSC.Math.Vector2.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + "]"
}
DSC.Math.Vector2['AsString'] = DSC.Math.Vector2.AsString;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {!number}
 */
DSC.Math.Vector2.LengthSquared = function(in_data)
{
	return DSC.Math.Vector2.DotProduct(in_data, in_data);
}
DSC.Math.Vector2['LengthSquared'] = DSC.Math.Vector2.LengthSquared;


/**
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {!number}
 */
DSC.Math.Vector2.Length = function(in_data)
{
	return Math.sqrt(DSC.Math.Vector2.LengthSquared(in_data));
}
DSC.Math.Vector2['Length'] = DSC.Math.Vector2.Length;


/**
 * export
 * @param {!DSC.Math.Vector2Type} in_data
 * @return {!number}
 */
DSC.Math.Vector2.ApproxLength = function(in_data)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.Vector2.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
DSC.Math.Vector2['ApproxLength'] = DSC.Math.Vector2.ApproxLengthRaw;


/**
 * export
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!DSC.Math.Vector2Type} in_rhs
 * @return {!number}
 */
DSC.Math.Vector2.DotProduct = function(in_lhs, in_rhs)
{
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]);
}
DSC.Math.Vector2['DotProduct'] = DSC.Math.Vector2.DotProduct;


/**
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!DSC.Math.Vector2Type} in_rhs
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1]);
	return _result;
}
DSC.Math.Vector2['Plus'] = DSC.Math.Vector2.Plus;


/**
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!DSC.Math.Vector2Type} in_rhs
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1]);
	return _result;
}
DSC.Math.Vector2['Minus'] = DSC.Math.Vector2.Minus;


/**
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand);
	return _result;
}
DSC.Math.Vector2['MultiplyNumeric'] = DSC.Math.Vector2.MultiplyNumeric;


/**
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand);
	return _result;
}
DSC.Math.Vector2['DivideNumeric'] = DSC.Math.Vector2.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector2.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	return result;
}
DSC.Math.Vector2['AlmostZero'] = DSC.Math.Vector2.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!DSC.Math.Vector2Type} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector2.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.Vector2.AlmostEqual.temp = DSC.Math.Vector2.Minus(in_lhs, in_rhs, DSC.Math.Vector2.AlmostEqual.temp);
	return DSC.Math.Vector2.AlmostZero(DSC.Math.Vector2.AlmostEqual.temp, _epsilon);
}
DSC.Math.Vector2['AlmostEqual'] = DSC.Math.Vector2.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.Vector2Type} in_lhs
 * @param {!DSC.Math.Vector2Type} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio)
		);
	return _result;
}
DSC.Math.Vector2['Lerp'] = DSC.Math.Vector2.Lerp;


/**
 * return the value clamped between low and high
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Clamp = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(
		_result, 
		DSC.Math.Clamp(in_data[0], in_low, in_high),
		DSC.Math.Clamp(in_data[1], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector2['Clamp'] = DSC.Math.Vector2.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!DSC.Math.Vector2Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector2Type=} _result
 * @return {!DSC.Math.Vector2Type}
 */
DSC.Math.Vector2.Wrap = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector2.Factory();
	}
	DSC.Math.Vector2.Set(
		_result, 
		DSC.Math.Wrap(in_data[0], in_low, in_high),
		DSC.Math.Wrap(in_data[1], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector2['Wrap'] = DSC.Math.Vector2.Wrap;

DSC.Math.Vector2.s_zero = DSC.Math.Vector2.Factory();
DSC.Math.Vector2['s_zero'] = DSC.Math.Vector2.s_zero;
DSC.Math.Vector2.s_unitX = DSC.Math.Vector2.Factory(1.0, 0.0);
DSC.Math.Vector2['s_unitX'] = DSC.Math.Vector2.s_unitX;
DSC.Math.Vector2.s_unitY = DSC.Math.Vector2.Factory(0.0, 1.0);
DSC.Math.Vector2['s_unitY'] = DSC.Math.Vector2.s_unitY;
