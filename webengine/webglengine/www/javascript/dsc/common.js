DSC.Common = function()
{
	alert("Common: static class, do not construct");	
}

DSC.Common.OverloadData = function(in_data, _overload)
{
	if (undefined == _overload)
		return in_data;
	var result = {};
	for (var key in in_data)
	{
		result[key] = in_data[key];
	}
	for (var key in _overload)
	{
		result[key] = _overload[key];
	}
	return result;
}


DSC.Common.t_floatArray = (undefined != Float32Array) ? Float32Array : Array;
DSC.Common.t_s8Array = (undefined != Int8Array) ? Int8Array : Array;
DSC.Common.t_u8Array = (undefined != Uint8Array) ? Uint8Array : Array;
DSC.Common.t_s16Array = (undefined != Int16Array) ? Int16Array : Array;
DSC.Common.t_u16Array = (undefined != Uint16Array) ? Uint16Array : Array;
DSC.Common.t_s32Array = (undefined != Int32Array) ? Int32Array : Array;
DSC.Common.t_u32Array = (undefined != Uint32Array) ? Uint32Array : Array;

//todo. array copy by memory

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			var testArray0 = new DSC.Common.t_floatArray([1.0, 1.5, 2.0]);
			result &= (3 == testArray0.length);
			result &= (DSC.Math.AlmostEqual(1.0, testArray0[0]));
			result &= (DSC.Math.AlmostEqual(1.5, testArray0[1]));
			result &= (DSC.Math.AlmostEqual(2.0, testArray0[2]));

			var testArray1 = new DSC.Common.t_floatArray(16);
			result &= (16 == testArray1.length);

			if (!result)
				return "Fail: Common t_floatArray";
		}


		if (true != result)
			return "Fail: Common";
		return "Pass: Common";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
