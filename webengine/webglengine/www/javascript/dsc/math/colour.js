DSC.Math.Colour = function()
{
	alert("Colour: meta class, construct via FactoryRaw");	
}

/*
	the prefered way to access a colour channel external to class
	var colour0 = DSC.Math.Colour.Clone(undefined, DSC.Math.Colour.s_black);
	var colour1 = DSC.Math.Colour.FactoryRaw(0.0, 0.0, 0.0, 1.0);
	var red1 = DSC.Math.Colour.GetRed(colour1);
*/
//DSC.Math.Colour.s_enum = 
//{
//	"TRed" : 0,
//	"TGreen" : 1,
//	"TBlue" : 2,
//	"TAlpha" : 3
//};

DSC.Math.Colour.GetRed = function(in_source)
{
	return in_source[0];
}
DSC.Math.Colour.GetGreen = function(in_source)
{
	return in_source[1];
}
DSC.Math.Colour.GetBlue = function(in_source)
{
	return in_source[2];
}
DSC.Math.Colour.GetAlpha = function(in_source)
{
	return in_source[3];
}

DSC.Math.Colour.SetRed = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Colour.SetGreen = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.Colour.SetBlue = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
DSC.Math.Colour.SetAlpha = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}


DSC.Math.Colour.SetRaw = function(inout_result, in_red, in_green, in_blue, in_alpha)
{
	inout_result[0] = in_red;
	inout_result[1] = in_green;
	inout_result[2] = in_blue;
	inout_result[3] = in_alpha;
}

DSC.Math.Colour.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Colour.SetRaw(_result, in_source[0], in_source[1], in_source[2], in_source[3]);
		return _result;
	}
	return DSC.Math.Colour.FactoryRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Colour.ToStringFill = function(in_source)
{
	return "rgb(" + 
		Math.floor((in_source[0] * 255.0) + 0.5) + ", " + 
		Math.floor((in_source[1] * 255.0) + 0.5) + ", " + 
		Math.floor((in_source[2] * 255.0) + 0.5) + ")";
}

DSC.Math.Colour.FactoryRaw = function(_red, _green, _blue, _alpha)
{
	return new DSC.Common.t_floatArray([
		(undefined == _red) ? 0.0 : _red,
		(undefined == _green) ? 0.0 : _green,
		(undefined == _blue) ? 0.0 : _blue,
		(undefined == _alpha) ? 0.0 : _alpha		
		]);
}

DSC.Math.Colour.FactoryRaw3 = function(_red, _green, _blue)
{
	return new DSC.Common.t_floatArray([
		(undefined == _red) ? 0.0 : _red,
		(undefined == _green) ? 0.0 : _green,
		(undefined == _blue) ? 0.0 : _blue
		]);
}

DSC.Math.Colour.s_transparent = DSC.Math.Colour.FactoryRaw(0.0, 0.0, 0.0, 0.0);
DSC.Math.Colour.s_halfBlack = DSC.Math.Colour.FactoryRaw(0.0, 0.0, 0.0, 0.5);
DSC.Math.Colour.s_black = DSC.Math.Colour.FactoryRaw(0.0, 0.0, 0.0, 1.0);
DSC.Math.Colour.s_white = DSC.Math.Colour.FactoryRaw(1.0, 1.0, 1.0, 1.0);
DSC.Math.Colour.s_grey = DSC.Math.Colour.FactoryRaw(0.5, 0.5, 0.5, 1.0);
DSC.Math.Colour.s_red = DSC.Math.Colour.FactoryRaw(1.0, 0.0, 0.0, 1.0);
DSC.Math.Colour.s_green = DSC.Math.Colour.FactoryRaw(0.0, 1.0, 0.0, 1.0);
DSC.Math.Colour.s_blue = DSC.Math.Colour.FactoryRaw(0.0, 0.0, 1.0, 1.0);

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//Statics
		if (true == result)
		{
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_black[0], 0.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_black[1], 0.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_black[2], 0.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_black[3], 1.0);

			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_white[0], 1.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_white[1], 1.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_white[2], 1.0);
			result &= true == DSC.Math.AlmostEqual(DSC.Math.Colour.s_white[3], 1.0);

			if (!result)
				return "Fail: Math.Colour Statics";
		}

		//Ctor
		if (true == result)
		{
			var colour0 = DSC.Math.Colour.FactoryRaw();
			var colour1 = DSC.Math.Colour.FactoryRaw(0.1, 0.2, 0.3, 0.4);
			
			result &= true == DSC.Math.AlmostEqual(colour0[0], 0.0);
			result &= true == DSC.Math.AlmostEqual(colour0[1], 0.0);
			result &= true == DSC.Math.AlmostEqual(colour0[2], 0.0);
			result &= true == DSC.Math.AlmostEqual(colour0[3], 0.0);

			result &= true == DSC.Math.AlmostEqual(colour1[0], 0.1);
			result &= true == DSC.Math.AlmostEqual(colour1[1], 0.2);
			result &= true == DSC.Math.AlmostEqual(colour1[2], 0.3);
			result &= true == DSC.Math.AlmostEqual(colour1[3], 0.4);

			if (!result)
				return "Fail: Math.Colour Ctor";
		}

		//Clone
		if (true == result)
		{
			var colour0 = DSC.Math.Colour.FactoryRaw(0.1, 0.2, 0.3, 0.4);
			var colour1 = DSC.Math.Colour.Clone(undefined, colour0);

			result &= true == DSC.Math.AlmostEqual(colour1[0], 0.1);
			result &= true == DSC.Math.AlmostEqual(colour1[1], 0.2);
			result &= true == DSC.Math.AlmostEqual(colour1[2], 0.3);
			result &= true == DSC.Math.AlmostEqual(colour1[3], 0.4);

			colour0[0] = 0.9;
			colour0[1] = 0.8;
			colour0[2] = 0.7;
			colour0[3] = 0.6;

			colour1 = DSC.Math.Colour.Clone(colour1, colour0);

			result &= true == DSC.Math.AlmostEqual(colour1[0], 0.9, 0.000001);
			result &= true == DSC.Math.AlmostEqual(colour1[1], 0.8, 0.000001);
			result &= true == DSC.Math.AlmostEqual(colour1[2], 0.7, 0.000001);
			result &= true == DSC.Math.AlmostEqual(colour1[3], 0.6, 0.000001);

			if (!result)
				return "Fail: Math.Colour Clone";
		}
		
		if (true != result)
			return "Fail: Math.Colour";
		return "Pass: Math.Colour";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

