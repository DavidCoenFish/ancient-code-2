/**
 * @const
 * @unrestricted
 */
DSC.Math.Vector3 = {}
DSC.Math['Vector3'] = DSC.Math.Vector3;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.Vector3Type;

/**
 * @param {!number=} _x
 * @param {!number=} _y
 * @param {!number=} _z
 * @return {DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Factory = function(_x, _y, _z)
{
	return new DSC.Common.t_floatArray([
		(undefined != _x) ? _x : 0.0,
		(undefined != _y) ? _y : 0.0,
		(undefined != _z) ? _z : 0.0
		]);
}
DSC.Math.Vector3['Factory'] = DSC.Math.Vector3.Factory;

/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.GetX = function(in_data)
{
	return in_data[0];
}
DSC.Math.Vector3['GetX'] = DSC.Math.Vector3.GetX;

/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.GetY = function(in_data)
{
	return in_data[1];
}
DSC.Math.Vector3['GetY'] = DSC.Math.Vector3.GetY;

/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.GetZ = function(in_data)
{
	return in_data[2];
}
DSC.Math.Vector3['GetZ'] = DSC.Math.Vector3.GetZ;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_x
 */
DSC.Math.Vector3.SetX = function(in_data, in_x)
{
	in_data[0] = in_x;
	return;
}
DSC.Math.Vector3['SetX'] = DSC.Math.Vector3.SetX;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_y
 */
DSC.Math.Vector3.SetY = function(in_data, in_y)
{
	in_data[1] = in_y;
	return;
}
DSC.Math.Vector3['SetY'] = DSC.Math.Vector3.SetY;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_z
 */
DSC.Math.Vector3.SetZ = function(in_data, in_z)
{
	in_data[2] = in_z;
	return;
}
DSC.Math.Vector3['SetZ'] = DSC.Math.Vector3.SetZ;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_x
 * @param {!number} in_y
 * @param {!number} in_z
 */
DSC.Math.Vector3.Set = function(in_data, in_x, in_y, in_z)
{
	in_data[0] = in_x;
	in_data[1] = in_y;
	in_data[2] = in_z;
	return;
}
DSC.Math.Vector3['Set'] = DSC.Math.Vector3.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory(in_data[0], in_data[1], in_data[2]);
	}
	else
	{
		DSC.Math.Vector3.Set(_result, in_data[0], in_data[1], in_data[2]);
	}
	return _result;
}
DSC.Math.Vector3['Clone'] = DSC.Math.Vector3.Clone;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {string}
 */
DSC.Math.Vector3.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + "]"
}
DSC.Math.Vector3['AsString'] = DSC.Math.Vector3.AsString;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.LengthSquared = function(in_data)
{
	return DSC.Math.Vector3.DotProduct(in_data, in_data);
}
DSC.Math.Vector3['LengthSquared'] = DSC.Math.Vector3.LengthSquared;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.Length = function(in_data)
{
	return Math.sqrt(DSC.Math.Vector3.LengthSquared(in_data));
}
DSC.Math.Vector3['Length'] = DSC.Math.Vector3.Length;


/**
 * export
 * @param {!DSC.Math.Vector3Type} in_data
 * @return {!number}
 */
DSC.Math.Vector3.ApproxLength = function(in_data)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.Vector3.LengthSquared(in_data);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}
DSC.Math.Vector3['ApproxLength'] = DSC.Math.Vector3.ApproxLengthRaw;


/**
 * export
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @return {!number}
 */
DSC.Math.Vector3.DotProduct = function(in_lhs, in_rhs)
{
	return (in_lhs[0] * in_rhs[0]) + (in_lhs[1] * in_rhs[1]) + (in_lhs[2] * in_rhs[2]);
}
DSC.Math.Vector3['DotProduct'] = DSC.Math.Vector3.DotProduct;


/**
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(_result, in_lhs[0] + in_rhs[0], in_lhs[1] + in_rhs[1], in_lhs[2] + in_rhs[2]);
	return _result;
}
DSC.Math.Vector3['Plus'] = DSC.Math.Vector3.Plus;


/**
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(_result, in_lhs[0] - in_rhs[0], in_lhs[1] - in_rhs[1], in_lhs[2] - in_rhs[2]);
	return _result;
}
DSC.Math.Vector3['Minus'] = DSC.Math.Vector3.Minus;


/**
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(_result, in_lhs[0] * in_operand, in_lhs[1] * in_operand, in_lhs[2] * in_operand);
	return _result;
}
DSC.Math.Vector3['MultiplyNumeric'] = DSC.Math.Vector3.MultiplyNumeric;


/**
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(_result, in_lhs[0] / in_operand, in_lhs[1] / in_operand, in_lhs[2] / in_operand);
	return _result;
}
DSC.Math.Vector3['DivideNumeric'] = DSC.Math.Vector3.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector3.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[2], _epsilon);
	return result;
}
DSC.Math.Vector3['AlmostZero'] = DSC.Math.Vector3.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Vector3.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.Vector3.AlmostEqual.temp = DSC.Math.Vector3.Minus(in_lhs, in_rhs, DSC.Math.Vector3.AlmostEqual.temp);
	return DSC.Math.Vector3.AlmostZero(DSC.Math.Vector3.AlmostEqual.temp, _epsilon);
}
DSC.Math.Vector3['AlmostEqual'] = DSC.Math.Vector3.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		DSC.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio)
		);
	return _result;
}
DSC.Math.Vector3['Lerp'] = DSC.Math.Vector3.Lerp;


/**
 * return the value clamped between low and high
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Clamp = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(
		_result, 
		DSC.Math.Clamp(in_data[0], in_low, in_high),
		DSC.Math.Clamp(in_data[1], in_low, in_high),
		DSC.Math.Clamp(in_data[2], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector3['Clamp'] = DSC.Math.Vector3.Clamp;


/**
 * return the value wrapped (modulus) between low and high
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!number} in_low
 * @param {!number} in_high
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Wrap = function(in_data, in_low, in_high, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}
	DSC.Math.Vector3.Set(
		_result, 
		DSC.Math.Wrap(in_data[0], in_low, in_high),
		DSC.Math.Wrap(in_data[1], in_low, in_high),
		DSC.Math.Wrap(in_data[2], in_low, in_high)
		);
	return _result;
}
DSC.Math.Vector3['Wrap'] = DSC.Math.Vector3.Wrap;

/**
 * @param {!DSC.Math.Vector3Type} in_lhs
 * @param {!DSC.Math.Vector3Type} in_rhs
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.CrossProduct = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}

	DSC.Math.Vector3.Set(
		_result,
		(in_lhs[1] * in_rhs[2]) - (in_lhs[2] * in_rhs[1]),
		(in_lhs[2] * in_rhs[0]) - (in_lhs[0] * in_rhs[2]),
		(in_lhs[0] * in_rhs[1]) - (in_lhs[1] * in_rhs[0])
		);
	return _result;
}
DSC.Math.Vector3['CrossProduct'] = DSC.Math.Vector3.CrossProduct;


/**
 * @param {!DSC.Math.Vector3Type} in_data
 * @param {!DSC.Math.Vector3Type=} _result
 * @return {!DSC.Math.Vector3Type}
 */
DSC.Math.Vector3.Normalise = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Vector3.Factory();
	}

	var lengthSquared = DSC.Math.Vector3.LengthSquared(in_data);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
	{
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	DSC.Math.Vector3.Set(
		_result, 
		in_data[0] * mul, 
		in_data[1] * mul, 
		in_data[2] * mul
		);
	return _result;
}
DSC.Math.Vector3['Normalise'] = DSC.Math.Vector3.Normalise;


DSC.Math.Vector3.s_zero = DSC.Math.Vector3.Factory();
DSC.Math.Vector3['s_zero'] = DSC.Math.Vector3.s_zero;
DSC.Math.Vector3.s_unitX = DSC.Math.Vector3.Factory(1.0, 0.0, 0.0);
DSC.Math.Vector3['s_unitX'] = DSC.Math.Vector3.s_unitX;
DSC.Math.Vector3.s_unitY = DSC.Math.Vector3.Factory(0.0, 1.0, 0.0);
DSC.Math.Vector3['s_unitY'] = DSC.Math.Vector3.s_unitY;
DSC.Math.Vector3.s_unitZ = DSC.Math.Vector3.Factory(0.0, 0.0, 1.0);
DSC.Math.Vector3['s_unitZ'] = DSC.Math.Vector3.s_unitZ;


