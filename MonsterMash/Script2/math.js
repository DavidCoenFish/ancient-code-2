function GetDotProduct(in_x0, in_y0, in_x1, in_y1)
{
	return ((in_x0 * in_x1) + (in_y0 * in_y1));
}

function GetLengthSquared(in_x, in_y)
{
	return GetDotProduct(in_x, in_y, in_x, in_y);
}

function Clamp(in_value, in_low, in_high)
{
	if (in_value < in_low)
		return in_low;
	if (in_high < in_value)
		return in_high;
	return in_value;
}

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:Math";
		return "Pass:Math";
	};

	g_arrayUnitTest.push(out_object);
}