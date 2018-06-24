DSC.Math.Angle = function()
{
	alert("Angle: static class, do not construct");	
}

DSC.Math.Angle.DegToRad = function(in_deg)
{
	return (in_deg / 180.0) * Math.PI;
};

DSC.Math.Angle.RadToDeg = function(in_rad)
{
	return (in_rad / Math.PI) * 180.0;
};


//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//RadToDeg
		if (true == result)
		{
			result &= 0.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(0.0)));
			result &= 45.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(45.0)));
			result &= 90.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(90.0)));
			result &= 180.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(180.0)));
			result &= 360.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(360.0)));
			result &= -45.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(-45.0)));
			result &= -90.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(-90.0)));
			result &= -180.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(-180.0)));
			result &= -360.0 == (DSC.Math.Angle.RadToDeg(DSC.Math.Angle.DegToRad(-360.0)));

			if (!result)
				return "Fail: Math.Angle DegToRad";
		}
		
		if (true != result)
			return "Fail: Math.Angle";
		return "Pass: Math.Angle";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

