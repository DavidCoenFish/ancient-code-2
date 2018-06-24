/**
 * @const
 * @unrestricted
 */
DSC.Math.Bound2 = {}
DSC.Math['Bound2'] = DSC.Math.Bound2;

/** @typedef {DSC.Common.t_floatArray} */
DSC.Math.Bound2Type;

/**
 * @param {!number=} _lowX
 * @param {!number=} _lowY
 * @param {!number=} _highX
 * @param {!number=} _highY
 * @return {DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.Factory = function(_lowX, _lowY, _highX, _highY)
{
	return new DSC.Common.t_floatArray([
		(undefined != _lowX) ? _lowX : 0.0,
		(undefined != _lowY) ? _lowY : 0.0,
		(undefined != _highX) ? _highX : 0.0,
		(undefined != _highY) ? _highY : 0.0
		]);
}
DSC.Math.Bound2['Factory'] = DSC.Math.Bound2.Factory;

/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetLowX = function(in_data)
{
	return in_data[0];
}
DSC.Math.Bound2['GetLowX'] = DSC.Math.Bound2.GetLowX;

/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetLowY = function(in_data)
{
	return in_data[1];
}
DSC.Math.Bound2['GetLowY'] = DSC.Math.Bound2.GetLowY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetHighX = function(in_data)
{
	return in_data[2];
}
DSC.Math.Bound2['GetHighX'] = DSC.Math.Bound2.GetHighX;

/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetHighY = function(in_data)
{
	return in_data[3];
}
DSC.Math.Bound2['GetHighY'] = DSC.Math.Bound2.GetHighY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetSizeX = function(in_data)
{
	return in_data[2] - in_data[0];
}
DSC.Math.Bound2['GetSizeX'] = DSC.Math.Bound2.GetSizeX;

/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {!number}
 */
DSC.Math.Bound2.GetSizeY = function(in_data)
{
	return in_data[3] - in_data[1];
}
DSC.Math.Bound2['GetSizeY'] = DSC.Math.Bound2.GetSizeY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_lowX
 */
DSC.Math.Bound2.SetLowX = function(in_data, in_lowX)
{
	in_data[0] = in_lowX;
	return;
}
DSC.Math.Bound2['SetLowX'] = DSC.Math.Bound2.SetLowX;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_lowY
 */
DSC.Math.Bound2.SetLowY = function(in_data, in_lowY)
{
	in_data[1] = in_lowY;
	return;
}
DSC.Math.Bound2['SetLowY'] = DSC.Math.Bound2.SetLowY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_highX
 */
DSC.Math.Bound2.SetHighX = function(in_data, in_highX)
{
	in_data[2] = in_highX;
	return;
}
DSC.Math.Bound2['SetHighX'] = DSC.Math.Bound2.SetHighX;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_highY
 */
DSC.Math.Bound2.SetHighY = function(in_data, in_highY)
{
	in_data[3] = in_highY;
	return;
}
DSC.Math.Bound2['SetHighY'] = DSC.Math.Bound2.SetHighY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_sizeX
 */
DSC.Math.Bound2.SetSizeX = function(in_data, in_sizeX)
{
	in_data[2] = in_sizeX + in_data[0]; 
	return;
}
DSC.Math.Bound2['SetSizeX'] = DSC.Math.Bound2.SetSizeX;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_sizeY
 */
DSC.Math.Bound2.SetSizeY = function(in_data, in_sizeY)
{
	in_data[3] = in_sizeY + in_data[1];
	return;
}
DSC.Math.Bound2['SetSizeY'] = DSC.Math.Bound2.SetSizeY;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number} in_lowX
 * @param {!number} in_lowY
 * @param {!number} in_highX
 * @param {!number} in_highY
 */
DSC.Math.Bound2.Set = function(in_data, in_lowX, in_lowY, in_highX, in_highY)
{
	in_data[0] = in_lowX;
	in_data[1] = in_lowY;
	in_data[2] = in_highX;
	in_data[3] = in_highY;
	return;
}
DSC.Math.Bound2['Set'] = DSC.Math.Bound2.Set;


/**
 * create or set the result and return it
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.Clone = function(in_data, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory(in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	else
	{
		DSC.Math.Bound2.Set(_result, in_data[0], in_data[1], in_data[2], in_data[3]);
	}
	return _result;
}
DSC.Math.Bound2['Clone'] = DSC.Math.Bound2.Clone;


/**
 * @param {!DSC.Math.Bound2Type} in_data
 * @return {string}
 */
DSC.Math.Bound2.AsString = function(in_data)
{
	return "[" + in_data[0] + ", " + in_data[1] + ", " + in_data[2] + ", " + in_data[3] + "]"
}
DSC.Math.Bound2['AsString'] = DSC.Math.Bound2.AsString;


/**
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!DSC.Math.Bound2Type} in_rhs
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.Plus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(
		_result, 
		in_lhs[0] + in_rhs[0], 
		in_lhs[1] + in_rhs[1],
		in_lhs[2] + in_rhs[2],
		in_lhs[3] + in_rhs[3]
		);
	return _result;
}
DSC.Math.Bound2['Plus'] = DSC.Math.Bound2.Plus;


/**
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!DSC.Math.Bound2Type} in_rhs
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.Minus = function(in_lhs, in_rhs, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(
		_result, 
		in_lhs[0] - in_rhs[0], 
		in_lhs[1] - in_rhs[1],
		in_lhs[2] - in_rhs[2],
		in_lhs[3] - in_rhs[3]
		);
	return _result;
}
DSC.Math.Bound2['Minus'] = DSC.Math.Bound2.Minus;


/**
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.MultiplyNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(
		_result, 
		in_lhs[0] * in_operand, 
		in_lhs[1] * in_operand,
		in_lhs[2] * in_operand,
		in_lhs[3] * in_operand
		);
	return _result;
}
DSC.Math.Bound2['MultiplyNumeric'] = DSC.Math.Bound2.MultiplyNumeric;


/**
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!number} in_operand
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.DivideNumeric = function(in_lhs, in_operand, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(
		_result, 
		in_lhs[0] / in_operand, 
		in_lhs[1] / in_operand,
		in_lhs[2] / in_operand,
		in_lhs[3] / in_operand
		);
	return _result;
}
DSC.Math.Bound2['DivideNumeric'] = DSC.Math.Bound2.DivideNumeric;


/**
 * return true if the given value is equal or within epsilon of zero
 * @param {!DSC.Math.Bound2Type} in_data
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Bound2.AlmostZero = function(in_data, _epsilon)
{
	var result = true;
	result &= DSC.Math.AlmostZero(in_data[0], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[1], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[2], _epsilon);
	result &= DSC.Math.AlmostZero(in_data[3], _epsilon);
	return result;
}
DSC.Math.Bound2['AlmostZero'] = DSC.Math.Bound2.AlmostZero;


/**
 * return true if the lhs is equal or within epsilon of rhs
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!DSC.Math.Bound2Type} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
DSC.Math.Bound2.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	DSC.Math.Bound2.AlmostEqual.temp = DSC.Math.Bound2.Minus(in_lhs, in_rhs, DSC.Math.Bound2.AlmostEqual.temp);
	return DSC.Math.Bound2.AlmostZero(DSC.Math.Bound2.AlmostEqual.temp, _epsilon);
}
DSC.Math.Bound2['AlmostEqual'] = DSC.Math.Bound2.AlmostEqual;

/**
 * return the lerp between a and b
 * export
 * @param {!DSC.Math.Bound2Type} in_lhs
 * @param {!DSC.Math.Bound2Type} in_rhs
 * @param {!number} in_ratio
 * @param {!DSC.Math.Bound2Type=} _result
 * @return {!DSC.Math.Bound2Type}
 */
DSC.Math.Bound2.Lerp = function(in_lhs, in_rhs, in_ratio, _result)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(
		_result, 
		DSC.Math.Lerp(in_lhs[0], in_rhs[0], in_ratio),
		DSC.Math.Lerp(in_lhs[1], in_rhs[1], in_ratio),
		DSC.Math.Lerp(in_lhs[2], in_rhs[2], in_ratio),
		DSC.Math.Lerp(in_lhs[3], in_rhs[3], in_ratio)
		);
	return _result;
}
DSC.Math.Bound2['Lerp'] = DSC.Math.Bound2.Lerp;
