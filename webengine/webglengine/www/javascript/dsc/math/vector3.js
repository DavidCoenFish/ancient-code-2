DSC.Math.Vector3 = function()
{
	alert("Vector3: meta class, construct via FactoryRaw");	
}

/*
	the prefered way to access a colour channel external to class
	var vector0 = DSC.Math.Vector3.Clone(DSC.Math.Vector3.s_zero);
	var vector1 = DSC.Math.Vector3.FactoryRaw(0.0, 0.0, 0.0);
	var x = vector1[DSC.Math.Vector3.s_enum.TX];

	or make accessors DSC.Math.Vector3.GetX = function(in_source) ?
*/
//DSC.Math.Vector3.s_enum = 
//{
//	"TX" : 0,
//	"TY" : 1,
//	"TZ" : 2,
//};
DSC.Math.Vector3.GetX = function(in_source)
{
	return in_source[0];
}
DSC.Math.Vector3.GetY = function(in_source)
{
	return in_source[1];
}
DSC.Math.Vector3.GetZ = function(in_source)
{
	return in_source[2];
}

DSC.Math.Vector3.SetX = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Vector3.SetY = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.Vector3.SetZ = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}

DSC.Math.Vector3.toString = function(in_source)
{
	return "Vector3 m_x:" + in_source[0] + " m_y:" + in_source[1] + " m_z:" + in_source[2];
}

DSC.Math.Vector3.SetRaw = function(inout_result, in_x, in_y, in_z)
{
	if (undefined == inout_result)
	{
		return DSC.Math.Vector3.FactoryRaw(in_x, in_y, in_z);
	}
	inout_result[0] = in_x;
	inout_result[1] = in_y;
	inout_result[2] = in_z;
	return inout_result;
}

DSC.Math.Vector3.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Vector3.SetRaw(_result, in_source[0], in_source[1], in_source[2]);
		return _result;
	}
	return DSC.Math.Vector3.FactoryRaw(in_source[0], in_source[1], in_source[2]);
}

DSC.Math.Vector3.LengthSquaredRaw = function(in_x, in_y, in_z)
{
	return DSC.Math.Vector3.DotProductRaw(in_x, in_y, in_z, in_x, in_y, in_z);
}

DSC.Math.Vector3.LengthSquared = function(in_source)
{
	return DSC.Math.Vector3.LengthSquaredRaw(in_source[0], in_source[1], in_source[2]);
}

DSC.Math.Vector3.LengthRaw = function(in_x, in_y, in_z)
{
	return Math.sqrt(DSC.Math.Vector3.LengthSquaredRaw(in_x, in_y, in_z));
}

DSC.Math.Vector3.Length = function(in_source)
{
	return DSC.Math.Vector3.LengthRaw(in_source[0], in_source[1], in_source[2]);
}

DSC.Math.Vector3.ApproxLengthRaw = function(in_x, in_y, in_z)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.Vector3.LengthSquaredRaw(in_x, in_y, in_z);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}

DSC.Math.Vector3.DotProduct = function(in_lhs, in_rhs)
{
	return DSC.Math.Vector3.DotProductRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_rhs[0], in_rhs[1], in_rhs[2]);
}

DSC.Math.Vector3.DotProductRaw = function(in_lhsX, in_lhsY, in_lhsZ, in_rhsX, in_rhsY, in_rhsZ)
{
	return (in_lhsX * in_rhsX) + (in_lhsY * in_rhsY) + (in_lhsZ * in_rhsZ);
}

DSC.Math.Vector3.CrossProduct = function(inout_result, in_lhs, in_rhs)
{
	return DSC.Math.Vector3.CrossProductRaw(inout_result, in_lhs[0], in_lhs[1], in_lhs[2], in_rhs[0], in_rhs[1], in_rhs[2]);
}

DSC.Math.Vector3.CrossProductRaw = function(inout_result, in_lhsX, in_lhsY, in_lhsZ, in_rhsX, in_rhsY, in_rhsZ)
{
	inout_result = (undefined == inout_result) ? DSC.Math.Vector3.FactoryRaw() : inout_result;

	DSC.Math.Vector3.SetRaw(
		inout_result,
		(in_lhsY * in_rhsZ) - (in_lhsZ * in_rhsY),
		(in_lhsZ * in_rhsX) - (in_lhsX * in_rhsZ),
		(in_lhsX * in_rhsY) - (in_lhsY * in_rhsX)
		);
	return inout_result;
}

DSC.Math.Vector3.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.Vector3.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_rhs[0], in_rhs[1], in_rhs[2]);
}

DSC.Math.Vector3.AlmostEqualRaw = function(in_lhsX, in_lhsY, in_lhsZ, in_rhsX, in_rhsY, in_rhsZ, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhsX, in_rhsX, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsY, in_rhsY, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsZ, in_rhsZ, _epsilon))
		);
}

DSC.Math.Vector3.NormalRaw = function(_result, in_x, in_y, in_z)
{
	_result = (undefined == _result) ? DSC.Math.Vector3.FactoryRaw() : _result;

	var lengthSquared = DSC.Math.Vector3.LengthSquaredRaw(in_x, in_y, in_z);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
	{
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	DSC.Math.Vector3.SetRaw(_result, in_x * mul, in_y * mul, in_z * mul);
	return _result;
}

DSC.Math.Vector3.NormalFromPointsRaw = function(
	_result,
	in_pointOneX, in_pointOneY, in_pointOneZ, 
	in_pointTwoX, in_pointTwoY, in_pointTwoZ, 
	in_pointThreeX, in_pointThreeY, in_pointThreeZ
	)
{
	_result = (undefined == _result) ? DSC.Math.Vector3.FactoryRaw() : _result;

	var crossProduct = DSC.Math.Vector3.CrossProductRaw(
		undefined,
		in_pointTwoX - in_pointOneX,
		in_pointTwoY - in_pointOneY,
		in_pointTwoZ - in_pointOneZ,
		in_pointThreeX - in_pointOneX,
		in_pointThreeY - in_pointOneY,
		in_pointThreeZ - in_pointOneZ
		);

	_result = DSC.Math.Vector3.NormalRaw(
		_result,
		crossProduct[0],
		crossProduct[1],
		crossProduct[2]
		);

	return _result;
}

DSC.Math.Vector3.FactoryRaw = function(_x, _y, _z)
{
	return new DSC.Common.t_floatArray([
		(undefined == _x) ? 0.0 : _x,
		(undefined == _y) ? 0.0 : _y,
		(undefined == _z) ? 0.0 : _z
		]);
}

DSC.Math.Vector3.s_zero = DSC.Math.Vector3.FactoryRaw();
DSC.Math.Vector3.s_unitX = DSC.Math.Vector3.FactoryRaw(1.0, 0.0, 0.0);
DSC.Math.Vector3.s_unitY = DSC.Math.Vector3.FactoryRaw(0.0, 1.0, 0.0);
DSC.Math.Vector3.s_unitZ = DSC.Math.Vector3.FactoryRaw(0.0, 0.0, 1.0);

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//InitVar
		if (true == result)
		{
			result &= (0.0 == DSC.Math.Vector3.s_zero[0]);
			result &= (0.0 == DSC.Math.Vector3.s_zero[1]);
			result &= (0.0 == DSC.Math.Vector3.s_zero[2]);
			result &= (1.0 == DSC.Math.Vector3.s_unitX[0]);
			result &= (0.0 == DSC.Math.Vector3.s_unitX[1]);
			result &= (0.0 == DSC.Math.Vector3.s_unitX[2]);
			result &= (0.0 == DSC.Math.Vector3.s_unitY[0]);
			result &= (1.0 == DSC.Math.Vector3.s_unitY[1]);
			result &= (0.0 == DSC.Math.Vector3.s_unitY[2]);
			result &= (0.0 == DSC.Math.Vector3.s_unitZ[0]);
			result &= (0.0 == DSC.Math.Vector3.s_unitZ[1]);
			result &= (1.0 == DSC.Math.Vector3.s_unitZ[2]);

			if (!result)
				return "Fail: Math.Vector3 InitVar";
		}

		//construction
		if (true == result)
		{
			var vector0 = DSC.Math.Vector3.FactoryRaw();
			var vector1 = DSC.Math.Vector3.FactoryRaw(1.0, 2.0, 3.0);
			var vector2 = DSC.Math.Vector3.Clone(undefined, vector1);
			
			result &= (0.0 == vector0[0]);
			result &= (0.0 == vector0[1]);
			result &= (0.0 == vector0[2]);
			result &= (1.0 == vector1[0]);
			result &= (2.0 == vector1[1]);
			result &= (3.0 == vector1[2]);
			result &= (1.0 == vector2[0]);
			result &= (2.0 == vector2[1]);
			result &= (3.0 == vector2[2]);
			
			if (!result)
				return "Fail: Math.Vector3 construction";
		}

		//method DotProduct
		if (true == result)
		{
			var vector1 = DSC.Math.Vector3.FactoryRaw(1.0, 2.0, 3.0);
			var vector2 = DSC.Math.Vector3.FactoryRaw(3.0, 4.0, 5.0);
			
			result &= (DSC.Math.AlmostEqual(26.0, DSC.Math.Vector3.DotProduct(vector1, vector2)));
			result &= (DSC.Math.AlmostEqual(26.0, DSC.Math.Vector3.DotProduct(vector2, vector1)));
			
			if (!result)
				return "Fail: Math.Vector3 DotProduct";
		}
		
		//method LengthSquared
		if (true == result)
		{
			var vector = DSC.Math.Vector3.FactoryRaw(3.0, 4.0, 5.0);
		
			result &= (DSC.Math.AlmostEqual(50.0, DSC.Math.Vector3.LengthSquared(vector)));
		
			if (!result)
				return "Fail: Math.Vector3 LengthSquared";
		}
		
		//method Length
		if (true == result)
		{
			var vector = DSC.Math.Vector3.FactoryRaw(3.0, 4.0, 5.0);
			var vector1 = DSC.Math.Vector3.FactoryRaw();
			
			result &= DSC.Math.AlmostEqual(7.0710678118654755, DSC.Math.Vector3.Length(vector));
			result &= DSC.Math.AlmostEqual(0.0, DSC.Math.Vector3.Length(vector1));
		
			if (!result)
				return "Fail: Math.Vector3 Length";
		}		

		//CrossProductRaw(inout_result, _lhsX, _lhsY, _lhsZ, _rhsX, _rhsY, _rhsZ)
		if (true == result)
		{
			var vector1 = DSC.Math.Vector3.CrossProductRaw(vector1, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0);
			result &= DSC.Math.AlmostEqual(0.0, vector1[0]);
			result &= DSC.Math.AlmostEqual(0.0, vector1[1]);
			result &= DSC.Math.AlmostEqual(1.0, vector1[2]);
		}

		//method Normalise
		if (true == result)
		{
			var vector1 = DSC.Math.Vector3.NormalRaw(vector1, 0.0, 0.0, 0.0);
			var vector2 = DSC.Math.Vector3.NormalRaw(vector2, 3.0, 4.0, 5.0);
		
			result &= DSC.Math.AlmostEqual(0.0, vector1[0]);
			result &= DSC.Math.AlmostEqual(0.0, vector1[1]);
			result &= DSC.Math.AlmostEqual(0.0, vector1[2]);
			result &= DSC.Math.AlmostEqual(0.4242640687119285, vector2[0]);
			result &= DSC.Math.AlmostEqual(0.565685424949238, vector2[1]);
			result &= DSC.Math.AlmostEqual(0.7071067811865475, vector2[2]);
		
			if (!result)
				return "Fail: Math.Vector3 Normalise";
		}	

		if (true != result)
			return "Fail: Math.Vector3";
		return "Pass: Math.Vector3";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

