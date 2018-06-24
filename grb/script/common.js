//common.js

function GetFibinarchy(in_value)
{
	if (0 < in_value)
	{
		return (GetFibinarchy(in_value - 1) + in_value);
	}
    return 0;
}

function Clamp(in_value, in_low, in_high)
{
	if (in_value < in_low)
	{
		return in_low;
	}
	if (in_high < in_value)
	{
		return in_high;
	}
	return in_value;
}


function SplitStringLength(in_string, in_length)
{
	var result = [];
	var tempString = "";
	for (var index = 0; index < in_string.length; ++index)
	{
		var vchar = in_string[index];
		if ((in_length < tempString.length) &&
			(vchar == " "))
		{
			result.push(tempString);
			tempString = "";
			continue;
		}
		tempString += vchar;
	}
	if (0 < tempString.length)
	{
		result.push(tempString);
	}
	
	return result;
}

function ArraySubtract(inout_array, in_arrayToSubtract)
{
	for (var index = 0; index < in_arrayToSubtract.length; ++index)
	{
		var foundIndex = inout_array.indexOf(in_arrayToSubtract[index])
		if (foundIndex != -1)
		{
			inout_array.splice(foundIndex, 1); 
		}
	}
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;
		
		//GetFibinarchy
		if (true == result)
		{
			
			result &= (0 == GetFibinarchy(0));
			result &= (1 == GetFibinarchy(1));
			result &= (3 == GetFibinarchy(2));
			result &= (6 == GetFibinarchy(3));
			result &= (10 == GetFibinarchy(4));

		}

		//Clamp
		if (true == result)
		{
			
			result &= (1 == Clamp(1, 0, 2));
			result &= (2 == Clamp(1, 2, 3));
			result &= (2.0 == Clamp(3.0, 0.0, 2.0));

		}
		
		//SplitStringLength
		if (true == result)
		{
			var splitString = SplitStringLength("The rain in spain falls mainly on the plane. though i can never recall the correct spelling on plain, plane or plan", 20);
			result &= ("The rain in spain falls" == splitString[0]);
			
		}
		
		if (true != result)
		{
			return "Fail:Common";
		}
		return "Pass:Common";
	}
	
	g_arrayUnitTest.push(out_object);
}

