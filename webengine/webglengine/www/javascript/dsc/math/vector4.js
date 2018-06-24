DSC.Math.Vector4 = function()
{
	alert("Vector4: meta class, construct via FactoryRaw");	
}

/*
	the prefered way to access a colour channel external to class
	var vector0 = DSC.Math.Vector4.Clone(DSC.Math.Vector4.s_zero);
	var vector1 = DSC.Math.Vector4.FactoryRaw(0.0, 0.0, 0.0);
	var x = DSC.Math.Vector4.GetX(vector0);
*/
//DSC.Math.Vector3.s_enum = 
//{
//	"TX" : 0,
//	"TY" : 1,
//	"TZ" : 2,
//	"TW" : 3,
//};

DSC.Math.Vector4.GetX = function(in_source)
{
	return in_source[0];
}
DSC.Math.Vector4.GetY = function(in_source)
{
	return in_source[1];
}
DSC.Math.Vector4.GetZ = function(in_source)
{
	return in_source[2];
}
DSC.Math.Vector4.GetW = function(in_source)
{
	return in_source[3];
}

DSC.Math.Vector4.SetX = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Vector4.SetY = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.Vector4.SetZ = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
DSC.Math.Vector4.SetW = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}

DSC.Math.Vector4.toString = function(in_source)
{
	return "Vector4 m_x:" + in_source[0] + " m_y:" + in_source[1] + " m_z:" + in_source[2] + " m_w:" + in_source[3];
}

DSC.Math.Vector4.SetRaw = function(inout_result, in_x, in_y, in_z, in_w)
{
	inout_result[0] = in_x;
	inout_result[1] = in_y;
	inout_result[2] = in_z;
	inout_result[3] = in_w;
}

DSC.Math.Vector4.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Vector4.SetRaw(_result, in_source[0], in_source[1], in_source[2], in_source[3]);
		return _result;
	}
	return DSC.Math.Vector4.FactoryRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Vector4.LengthSquared = function(in_source)
{
	return DSC.Math.Vector4.LengthSquaredRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Vector4.LengthSquaredRaw = function(in_x, in_y, in_z, in_w)
{
	return DSC.Math.Vector4.DotProductRaw(in_x, in_y, in_z, in_w, in_x, in_y, in_z, in_w);
}

DSC.Math.Vector4.Length = function(in_source)
{
	return DSC.Math.Vector4.LengthRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Vector4.LengthRaw = function(in_x, in_y, in_z, in_w)
{
	return Math.sqrt(DSC.Math.Vector4.LengthSquaredRaw(in_x, in_y, in_z, in_w));
}

DSC.Math.Vector4.ApproxLength = function(in_source)
{
	return DSC.Math.Vector4.ApproxLengthRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Vector4.ApproxLengthRaw = function(in_x, in_y, in_z, in_w)
{
	//tailor series
	var lengthSquared = DSC.Math.Vector4.LengthSquaredRaw(in_x, in_y, in_z, in_w);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}

DSC.Math.Vector4.DotProduct = function(in_lhs, in_rhs)
{
	return DSC.Math.Vector4.DotProductRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_lhs[3], in_rhs[0], in_rhs[1], in_rhs[2], in_rhs[3]);
}

DSC.Math.Vector4.DotProductRaw = function(in_lhsX, in_lhsY, in_lhsZ, in_lhsW, in_rhsX, in_rhsY, in_rhsZ, in_rhsW)
{
	return (in_lhsX * in_rhsX) + (in_lhsY * in_rhsY) + (in_lhsZ * in_rhsZ) + (in_lhsW * in_rhsW);
}

DSC.Math.Vector4.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.Vector4.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_lhs[3], in_rhs[0], in_rhs[1], in_rhs[2], in_rhs[3]);
}

DSC.Math.Vector4.AlmostEqualRaw = function(in_lhsX, in_lhsY, in_lhsZ, in_lhsW, in_rhsX, in_rhsY, in_rhsZ, in_rhsW, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhsX, in_rhsX, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsY, in_rhsY, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsZ, in_rhsZ, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsW, in_rhsW, _epsilon))
		);
}

DSC.Math.Vector4.NormalRaw = function(_result, in_x, in_y, in_z, in_w)
{
	_result = (undefined == _result) ? DSC.Math.Vector4.FactoryRaw() : _result;

	var lengthSquared = DSC.Math.Vector4.LengthSquaredRaw(in_x, in_y, in_z, in_w);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
	{
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	DSC.Math.Vector4.SetRaw(
		_result, 
		in_x * mul, 
		in_y * mul, 
		in_z * mul, 
		in_w * mul
		);
	return _result;
}

DSC.Math.Vector4.FactoryRaw = function(_x, _y, _z, _w)
{
	return new DSC.Common.t_floatArray([
		(undefined == _x) ? 0.0 : _x,
		(undefined == _y) ? 0.0 : _y,
		(undefined == _z) ? 0.0 : _z,
		(undefined == _w) ? 0.0 : _w
		]);
}

DSC.Math.Vector4.s_zero = DSC.Math.Vector4.FactoryRaw();
DSC.Math.Vector4.s_unitX = DSC.Math.Vector4.FactoryRaw(1.0, 0.0, 0.0, 0.0);
DSC.Math.Vector4.s_unitY = DSC.Math.Vector4.FactoryRaw(0.0, 1.0, 0.0, 0.0);
DSC.Math.Vector4.s_unitZ = DSC.Math.Vector4.FactoryRaw(0.0, 0.0, 1.0, 0.0);
DSC.Math.Vector4.s_unitW = DSC.Math.Vector4.FactoryRaw(0.0, 0.0, 0.0, 1.0);

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
			result &= (0.0 == DSC.Math.Vector4.s_zero[0]);
			result &= (0.0 == DSC.Math.Vector4.s_zero[1]);
			result &= (0.0 == DSC.Math.Vector4.s_zero[2]);
			result &= (0.0 == DSC.Math.Vector4.s_zero[3]);
			result &= (1.0 == DSC.Math.Vector4.s_unitX[0]);
			result &= (0.0 == DSC.Math.Vector4.s_unitX[1]);
			result &= (0.0 == DSC.Math.Vector4.s_unitX[2]);
			result &= (0.0 == DSC.Math.Vector4.s_unitX[3]);
			result &= (0.0 == DSC.Math.Vector4.s_unitY[0]);
			result &= (1.0 == DSC.Math.Vector4.s_unitY[1]);
			result &= (0.0 == DSC.Math.Vector4.s_unitY[2]);
			result &= (0.0 == DSC.Math.Vector4.s_unitY[3]);
			result &= (0.0 == DSC.Math.Vector4.s_unitZ[0]);
			result &= (0.0 == DSC.Math.Vector4.s_unitZ[1]);
			result &= (1.0 == DSC.Math.Vector4.s_unitZ[2]);
			result &= (0.0 == DSC.Math.Vector4.s_unitZ[3]);
			result &= (0.0 == DSC.Math.Vector4.s_unitW[0]);
			result &= (0.0 == DSC.Math.Vector4.s_unitW[1]);
			result &= (0.0 == DSC.Math.Vector4.s_unitW[2]);
			result &= (1.0 == DSC.Math.Vector4.s_unitW[3]);

			if (!result)
				return "Fail: Math.Vector4 InitVar";
		}

		//construction
		if (true == result)
		{
			var vector0 = DSC.Math.Vector4.FactoryRaw();
			var vector1 = DSC.Math.Vector4.FactoryRaw(1.0, 2.0, 3.0, 4.0);
			var vector2 = DSC.Math.Vector4.Clone(undefined, vector1);
			
			result &= (0.0 == vector0[0]);
			result &= (0.0 == vector0[1]);
			result &= (0.0 == vector0[2]);
			result &= (0.0 == vector0[3]);
			result &= (1.0 == vector1[0]);
			result &= (2.0 == vector1[1]);
			result &= (3.0 == vector1[2]);
			result &= (4.0 == vector1[3]);
			result &= (1.0 == vector2[0]);
			result &= (2.0 == vector2[1]);
			result &= (3.0 == vector2[2]);
			result &= (4.0 == vector2[3]);
			
			if (!result)
				return "Fail: Math.Vector4 construction";
		}

		////method DotProduct
		//if (true == result)
		//{
		//	var vector1 = DSC.Math.Vector4.FactoryRaw(1.0, 2.0, 3.0, 4.0);
		//	var vector2 = DSC.Math.Vector4.FactoryRaw(3.0, 4.0, 5.0, 6.0);
		//	
		//	result &= (DSC.Math.AlmostEqual(50.0, DSC.Math.Vector4.DotProduct(vector1, vector2)));
		//	result &= (DSC.Math.AlmostEqual(50.0, DSC.Math.Vector4.DotProduct(vector2, vector1)));
		//	
		//	if (!result)
		//		return "Fail: Math.Vector4 DotProduct";
		//}
		//
		////method LengthSquared
		//if (true == result)
		//{
		//	var vector = DSC.Math.Vector4.FactoryRaw(3.0, 4.0, 5.0, 6.0);
		//
		//	result &= (DSC.Math.AlmostEqual(86.0, vector.LengthSquared()));
		//
		//	if (!result)
		//		return "Fail: Math.Vector4 LengthSquared";
		//}
		//
		////method Length
		//if (true == result)
		//{
		//	var vector = DSC.Math.Vector4.FactoryRaw(3.0, 4.0, 5.0, 6.0);
		//	var vector1 = DSC.Math.Vector4.FactoryRaw(0.0, 0.0);
		//	
		//	result &= DSC.Math.AlmostEqual(9.273618495495704, vector.Length());
		//	result &= DSC.Math.AlmostEqual(0.0, vector1.Length());
		//
		//	if (!result)
		//		return "Fail: Math.Vector4 Length";
		//}		
		//
		////method Normalise
		//if (true == result)
		//{
		//	var vector1 = DSC.Math.Vector4.FactoryRaw();
		//	var vector2 = DSC.Math.Vector4.FactoryRaw();
		//	DSC.Math.Vector4.NormalRaw(vector1, 0.0, 0.0, 0.0, 0.0);
		//	DSC.Math.Vector4.NormalRaw(vector2, 3.0, 4.0, 5.0, 6.0);
		//
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[0]);
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[1]);
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[2]);
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[3]);
		//	result &= DSC.Math.AlmostEqual(0.3234983196103152, vector2[0]);
		//	result &= DSC.Math.AlmostEqual(0.43133109281375365, vector2[1]);
		//	result &= DSC.Math.AlmostEqual(0.539163866017192, vector2[2]);
		//	result &= DSC.Math.AlmostEqual(0.6469966392206304, vector2[3]);
		//
		//	if (!result)
		//		return "Fail: Math.Vector4 Normalise";
		//}	

		if (true != result)
			return "Fail: Math.Vector4";
		return "Pass: Math.Vector4";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

