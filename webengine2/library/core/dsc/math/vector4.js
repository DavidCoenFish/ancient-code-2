/**
 * @const
 * @unrestricted
 */
DSC.Math.Vector4 = {}
DSC.Math['Vector4'] = DSC.Math.Vector4;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.Vector4Type;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @param {!number=} _z
 * @param {!number=} _w
 * @return {DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Factory = function(_x, _y, _z, _w)
{
	return new DSC.Common.t_floatArray([
		(undefined != _x) ? _x : 0.0,
		(undefined != _y) ? _y : 0.0,
		(undefined != _z) ? _z : 0.0,
		(undefined != _w) ? _w : 0.0
		]);
}
DSC.Math.Vector4['Factory'] = DSC.Math.Vector4.Factory;

/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.GetX = function(in_data)
{
	return in_data[0];
}
DSC.Math.Vector4['GetX'] = DSC.Math.Vector4.GetX;

/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.GetY = function(in_data)
{
	return in_data[1];
}
DSC.Math.Vector4['GetY'] = DSC.Math.Vector4.GetY;

/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.GetZ = function(in_data)
{
	return in_data[2];
}
DSC.Math.Vector4['GetZ'] = DSC.Math.Vector4.GetZ;

/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.GetW = function(in_data)
{
	return in_data[3];
}
DSC.Math.Vector4['GetW'] = DSC.Math.Vector4.GetW;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_x
 */
DSC.Math.Vector4.SetX = function(in_data, in_x)
{
	in_data[0] = in_x;
	return;
}
DSC.Math.Vector4['SetX'] = DSC.Math.Vector4.SetX;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_y
 */
DSC.Math.Vector4.SetY = function(in_data, in_y)
{
	in_data[1] = in_y;
	return;
}
DSC.Math.Vector4['SetY'] = DSC.Math.Vector4.SetY;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_z
 */
DSC.Math.Vector4.SetZ = function(in_data, in_z)
{
	in_data[2] = in_z;
	return;
}
DSC.Math.Vector4['SetZ'] = DSC.Math.Vector4.SetZ;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_w
 */
DSC.Math.Vector4.SetW = function(in_data, in_w)
{
	in_data[3] = in_w;
	return;
}
DSC.Math.Vector4['SetW'] = DSC.Math.Vector4.SetW;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 * @param {!number} in_z
 * @param {!number} in_w
 */
DSC.Math.Vector4.Set = function(in_data, in_x, in_y, in_z, in_w)
{
	in_data[0] = in_x;
	in_data[1] = in_y;
	in_data[2] = in_z;
	in_data[3] = in_w;
	return;
}
DSC.Math.Vector4['Set'] = DSC.Math.Vector4.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory(in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	else
	{
		DSC.Math.Vector4.Set(_result, in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	return _result;
}
DSC.Math.Vector4['Clone'] = DSC.Math.Vector4.Clone;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {string}
 */
DSC.Math.Vector4.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + ", " + in_data[3] +  + "]"
}
DSC.Math.Vector4['AsString'] = DSC.Math.Vector4.AsString;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.LengthSquared = function(in_data)
{
	return DSC.Math.Vector4.DotProduct(in_data, in_data);
}
DSC.Math.Vector4['LengthSquared'] = DSC.Math.Vector4.LengthSquared;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.Length = function(in_data)
{
	return Math.sqrt(DSC.Math.Vector4.LengthSquared(in_data));
}
DSC.Math.Vector4['Length'] = DSC.Math.Vector4.Length;


/**
 * export
 * @param {!DSC.Math.Vector4Type} in_data
 * @return {!number}
 */
DSC.Math.Vector4.ApproxLength = function(in_data)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.Vector4.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
DSC.Math.Vector4['ApproxLength'] = DSC.Math.Vector4.ApproxLengthRaw;


/**
 * export
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!DSC.Math.Vector4Type} in_rhs
 * @return {!number}
 */
DSC.Math.Vector4.DotProduct = function(in_lhs, in_rhs)
{
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]) + (in_lhs[3] * in_rhs[3]);
}
DSC.Math.Vector4['DotProduct'] = DSC.Math.Vector4.DotProduct;


/**
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!DSC.Math.Vector4Type} in_rhs
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2], in_lhs[3] + in_rhs[3]);
	return _result;
}
DSC.Math.Vector4['Plus'] = DSC.Math.Vector4.Plus;


/**
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!DSC.Math.Vector4Type} in_rhs
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2], in_lhs[3] - in_rhs[3]);
	return _result;
}
DSC.Math.Vector4['Minus'] = DSC.Math.Vector4.Minus;


/**
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand, in_lhs[3] * in_operand);
	return _result;
}
DSC.Math.Vector4['MultiplyNumeric'] = DSC.Math.Vector4.MultiplyNumeric;


/**
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand, in_lhs[3] / in_operand);
	return _result;
}
DSC.Math.Vector4['DivideNumeric'] = DSC.Math.Vector4.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector4.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[2], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[3], _epsilon);
	return result;
}
DSC.Math.Vector4['AlmostZero'] = DSC.Math.Vector4.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!DSC.Math.Vector4Type} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector4.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.Vector4.AlmostEqual.temp = DSC.Math.Vector4.Minus(in_lhs, in_rhs, DSC.Math.Vector4.AlmostEqual.temp);
	return DSC.Math.Vector4.AlmostZero(DSC.Math.Vector4.AlmostEqual.temp, _epsilon);
}
DSC.Math.Vector4['AlmostEqual'] = DSC.Math.Vector4.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.Vector4Type} in_lhs
 * @param {!DSC.Math.Vector4Type} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		DSC.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio),
		DSC.Math.Lerp(in_lhs[3], in_rhs[3], in_ratio)
		);
	return _result;
}
DSC.Math.Vector4['Lerp'] = DSC.Math.Vector4.Lerp;


/**
 * return the value clamped between low and high
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Clamp = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(
		_result, 
		DSC.Math.Clamp(in_data[0], in_low, in_high),
		DSC.Math.Clamp(in_data[1], in_low, in_high),
		DSC.Math.Clamp(in_data[2], in_low, in_high),
		DSC.Math.Clamp(in_data[3], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector4['Clamp'] = DSC.Math.Vector4.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Wrap = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}
	DSC.Math.Vector4.Set(
		_result, 
		DSC.Math.Wrap(in_data[0], in_low, in_high),
		DSC.Math.Wrap(in_data[1], in_low, in_high),
		DSC.Math.Wrap(in_data[2], in_low, in_high),
		DSC.Math.Wrap(in_data[3], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector4['Wrap'] = DSC.Math.Vector4.Wrap;


/**
 * @param {!DSC.Math.Vector4Type} in_data
 * @param {!DSC.Math.Vector4Type=} _result
 * @return {!DSC.Math.Vector4Type}
 */
DSC.Math.Vector4.Normalise = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector4.Factory();
	}

	var lengthSquared = DSC.Math.Vector4.LengthSquared(in_data);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
	{
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	DSC.Math.Vector4.Set(
		_result, 
		in_data[0] * mul, 
		in_data[1] * mul, 
		in_data[2] * mul,
		in_data[3] * mul
		);
	return _result;
}
DSC.Math.Vector4['Normalise'] = DSC.Math.Vector4.Normalise;


DSC.Math.Vector4.s_zero = DSC.Math.Vector4.Factory();
DSC.Math.Vector4['s_zero'] = DSC.Math.Vector4.s_zero;
DSC.Math.Vector4.s_unitX = DSC.Math.Vector4.Factory(1.0, 0.0, 0.0, 0.0);
DSC.Math.Vector4['s_unitX'] = DSC.Math.Vector4.s_unitX;
DSC.Math.Vector4.s_unitY = DSC.Math.Vector4.Factory(0.0, 1.0, 0.0, 0.0);
DSC.Math.Vector4['s_unitY'] = DSC.Math.Vector4.s_unitY;
DSC.Math.Vector4.s_unitZ = DSC.Math.Vector4.Factory(0.0, 0.0, 1.0, 0.0);
DSC.Math.Vector4['s_unitZ'] = DSC.Math.Vector4.s_unitZ;
DSC.Math.Vector4.s_unitW = DSC.Math.Vector4.Factory(0.0, 0.0, 0.0, 1.0);
DSC.Math.Vector4['s_unitW'] = DSC.Math.Vector4.s_unitW;


