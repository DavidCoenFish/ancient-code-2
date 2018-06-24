DSC.Math = function()
{
	alert("Math: static class, do not construct");	
}

DSC.Math.AlmostZero = function(in_value, _epsilon)
{
	var epsilon = _epsilon || 1e-6;
	if (Math.abs(in_value) <= epsilon)
		return true;
	return false;
}

DSC.Math.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.AlmostZero(in_lhs - in_rhs, _epsilon);
}

DSC.Math.Lerp = function(in_a, in_b, in_ratio)
{
	return (in_a * (1.0 - in_ratio)) + (in_b * in_ratio);
}

DSC.Math.Clamp = function(in_value, in_low, in_high)
{
	if (in_value < in_low)
		return in_low;
	if (in_high < in_value)
		return in_high;
	return in_value;
}

//3.v^2 - 2.v^3
DSC.Math.Smooth = function(in_value)
{
	return (3.0 * in_value * in_value) - (2.0 * in_value * in_value * in_value);
}


//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//AlmostZero
		if (true == result)
		{
			result &= (true == DSC.Math.AlmostZero(0.0));
			result &= (true == DSC.Math.AlmostZero(-0.0));
			result &= (false == DSC.Math.AlmostZero(0.1));
			result &= (false == DSC.Math.AlmostZero(-0.1));
			result &= (true == DSC.Math.AlmostZero(0.0000001));
			result &= (true == DSC.Math.AlmostZero(-0.0000001));
			if (!result)
				return "Fail: Math AlmostZero";
		}

		//DSC.Math.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
		if (true == result)
		{
			result &= (true == DSC.Math.AlmostEqual(0.0, 0.0));
			result &= (true == DSC.Math.AlmostEqual(1.3, 1.3));
			result &= (true != DSC.Math.AlmostEqual(1.3, 2.3));
			result &= (true != DSC.Math.AlmostEqual(1.3, -1.3));
			result &= (true == DSC.Math.AlmostEqual(1.3, 2.3, 1.1));
			if (!result)
				return "Fail: Math AlmostEqual";
		}

		//DSC.Math.Lerp = function(in_a, in_b, in_ratio)
		if (true == result)
		{
			result &= (true == DSC.Math.AlmostEqual(0.0, DSC.Math.Lerp(0.0, 1.0, 0.0)));
			result &= (true == DSC.Math.AlmostEqual(1.0, DSC.Math.Lerp(0.0, 1.0, 1.0)));
			result &= (true == DSC.Math.AlmostEqual(0.5, DSC.Math.Lerp(0.0, 1.0, 0.5)));

			result &= (true == DSC.Math.AlmostEqual(3.5, DSC.Math.Lerp(1.0, 11.0, 0.25)));

			if (!result)
				return "Fail: Math Lerp";
		}

		if (true != result)
			return "Fail: Math";
		return "Pass: Math";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
