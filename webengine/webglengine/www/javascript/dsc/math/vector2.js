DSC.Math.Vector2 = function()
{
	alert("Vector2: meta class, construct via FactoryRaw");	
}

/*
	the prefered way to access a colour channel external to class
	var vector0 = DSC.Math.Vector2.Clone(DSC.Math.Vector2.s_zero);
	var vector1 = DSC.Math.Vector2.FactoryRaw(0.0, 0.0, 0.0);
	var x = vector1[DSC.Math.Vector2.s_enum.TX];
*/
//DSC.Math.Vector2.s_enum = 
//{
//	"TX" : 0,
//	"TY" : 1
//};

DSC.Math.Vector2.GetX = function(in_source)
{
	return in_source[0];
}
DSC.Math.Vector2.GetY = function(in_source)
{
	return in_source[1];
}

DSC.Math.Vector2.SetX = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Vector2.SetY = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}


DSC.Math.Vector2.toString = function(in_source)
{
	return "Vector2 m_x:" + in_source[0] + " m_y:" + in_source[1];
}

DSC.Math.Vector2.SetRaw = function(inout_result, in_x, in_y)
{
	inout_result[0] = in_x;
	inout_result[1] = in_y;
}

DSC.Math.Vector2.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Vector2.SetRaw(_result, in_source[0], in_source[1]);
		return _result;
	}
	return DSC.Math.Vector2.FactoryRaw(in_source[0], in_source[1]);
}

DSC.Math.Vector2.LengthSquaredRaw = function(in_x, in_y)
{
	return DSC.Math.Vector2.DotProductRaw(in_x, in_y, in_x, in_y);
}

DSC.Math.Vector2.LengthSquared = function(in_source)
{
	return DSC.Math.Vector2.LengthSquaredRaw(in_source[0], in_source[1]);
}

DSC.Math.Vector2.LengthRaw = function(in_x, in_y)
{
	return Math.sqrt(DSC.Math.Vector2.LengthSquaredRaw(in_x, in_y));
}

DSC.Math.Vector2.Length = function(in_source)
{
	return DSC.Math.Vector2.LengthRaw(in_source[0], in_source[1]);
}

DSC.Math.Vector2.ApproxLengthRaw = function(in_x, in_y)
{
	//terms of tailor series
	var lengthSquared = DSC.Math.Vector2.LengthSquaredRaw(in_x, in_y);
	var approx = (lengthSquared + 1.0) * 0.5;
	return approx;
}

DSC.Math.Vector2.DotProduct = function(in_lhs, in_rhs)
{
	return DSC.Math.Vector2.DotProductRaw(in_lhs[0], in_lhs[1], in_rhs[0], in_rhs[1]);
}

DSC.Math.Vector2.DotProductRaw = function(in_lhsX, in_lhsY, in_rhsX, in_rhsY)
{
	return (in_lhsX * in_rhsX) + (in_lhsY * in_rhsY);
}

//DSC.Math.Vector2.prototype.LengthSquared = function()
//{
//	return DSC.Math.Vector2.LengthSquaredRaw(this[0], this[1]);
//}
//
//DSC.Math.Vector2.LengthSquaredRaw = function(_x, _y)
//{
//	return DSC.Math.Vector2.DotProductRaw(_x, _y, _x, _y);
//}
//
//DSC.Math.Vector2.prototype.Length = function()
//{
//	return Math.sqrt(this.LengthSquared());
//}
//
//DSC.Math.Vector2.LengthRaw = function(_x, _y)
//{
//	return Math.sqrt(DSC.Math.Vector2.LengthSquaredRaw(_x, _y));
//}
//
//DSC.Math.Vector2.prototype.ApproxLength = function()
//{
//	return DSC.Math.Vector2.ApproxLengthRaw(this[0], this[1]);
//}
//
//DSC.Math.Vector2.ApproxLengthRaw = function(_x, _y)
//{
//	//terms of tailor series
//	var lengthSquared = DSC.Math.Vector2.LengthSquaredRaw(_x, _y);
//	var approx = (lengthSquared + 1.0) * 0.5;
//	return approx;
//}
//
//DSC.Math.Vector2.DotProduct = function(in_lhs, in_rhs)
//{
//	return DSC.Math.Vector2.DotProductRaw(in_lhs[0], in_lhs[1], in_rhs[0], in_rhs[1]);
//}
//
//DSC.Math.Vector2.DotProductRaw = function(in_lhsX, in_lhsY, in_rhsX, in_rhsY)
//{
//	return (in_lhsX * in_rhsX) + (in_lhsY * in_rhsY);
//}
//
//DSC.Math.Vector2.CrossProduct = function(inout_result, in_src)
//{
//	return DSC.Math.Vector2.CrossProductRaw(inout_result, in_src[0], in_src[1]);
//}
//
//DSC.Math.Vector2.CrossProductRaw = function(inout_result, in_srcX, in_srcY)
//{
//	inout_result = (undefined == inout_result) ? DSC.Math.Vector2.FactoryRaw() : inout_result;
//
//	inout_result.SetRaw(
//		-in_srcY, 
//		in_srcX
//		);
//	return inout_result;
//}
//
//DSC.Math.Vector2.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
//{
//	return DSC.Math.Vector2.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_rhs[0], in_rhs[1]);
//}
//
//DSC.Math.Vector2.AlmostEqualRaw = function(in_lhsX, in_lhsY, in_rhsX, in_rhsY, _epsilon)
//{
//	return (
//		(DSC.Math.AlmostEqual(in_lhsX, in_rhsX, _epsilon)) &&
//		(DSC.Math.AlmostEqual(in_lhsY, in_rhsY, _epsilon))
//		);
//}
//
//DSC.Math.Vector2.NormalRaw = function(inout_result, in_x, in_y)
//{
//	inout_result = (undefined == inout_result) ? DSC.Math.Vector2.FactoryRaw() : inout_result;
//
//	var lengthSquared = DSC.Math.Vector2.LengthSquaredRaw(in_x, in_y);
//	var mul = 1.0;
//	var length = lengthSquared;
//	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
//	{
//		length = Math.sqrt(lengthSquared);
//		mul = 1.0 / length;
//	}
//	inout_result.SetRaw(in_x * mul, in_y * mul);
//	return inout_result;
//}
//
//DSC.Math.Vector2.NormalFromPointsRaw = function(
//	inout_result,
//	in_pointOneX, in_pointOneY, 
//	in_pointTwoX, in_pointTwoY
//	)
//{
//	inout_result = (undefined == inout_result) ? DSC.Math.Vector2.FactoryRaw() : inout_result;
//
//	var crossProduct = DSC.Math.Vector2.CrossProductRaw(
//		undefined,
//		in_pointTwoX - in_pointOneX,
//		in_pointTwoY - in_pointOneY
//		);
//
//	inout_result = DSC.Math.Vector2.NormalRaw(
//		inout_result,
//		crossProduct[0],
//		crossProduct[1]
//		);
//
//	return inout_result;
//}

DSC.Math.Vector2.FactoryRaw = function(_x, _y)
{
	return new DSC.Common.t_floatArray([
		(undefined == _x) ? 0.0 : _x,
		(undefined == _y) ? 0.0 : _y
		]);
}

DSC.Math.Vector2.s_zero = DSC.Math.Vector2.FactoryRaw();
DSC.Math.Vector2.s_unitX = DSC.Math.Vector2.FactoryRaw(1.0, 0.0);
DSC.Math.Vector2.s_unitY = DSC.Math.Vector2.FactoryRaw(0.0, 1.0);

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
			result &= (0.0 == DSC.Math.Vector2.s_zero[0]);
			result &= (0.0 == DSC.Math.Vector2.s_zero[1]);
			result &= (1.0 == DSC.Math.Vector2.s_unitX[0]);
			result &= (0.0 == DSC.Math.Vector2.s_unitX[1]);
			result &= (0.0 == DSC.Math.Vector2.s_unitY[0]);
			result &= (1.0 == DSC.Math.Vector2.s_unitY[1]);

			if (!result)
				return "Fail: Math.Vector2 InitVar";
		}

		//construction
		if (true == result)
		{
			var vector0 = DSC.Math.Vector2.FactoryRaw();
			var vector1 = DSC.Math.Vector2.FactoryRaw(1.0, 2.0);
			var vector2 = DSC.Math.Vector2.FactoryRaw(3.0, 4.0);
			
			result &= (0.0 == vector0[0]);
			result &= (0.0 == vector0[1]);
			result &= (1.0 == vector1[0]);
			result &= (2.0 == vector1[1]);
			result &= (3.0 == vector2[0]);
			result &= (4.0 == vector2[1]);
			
			if (!result)
				return "Fail: Math.Vector2 construction";
		}

		////method DotProduct
		//if (true == result)
		//{
		//	var vector1 = DSC.Math.Vector2.FactoryRaw(1.0, 2.0);
		//	var vector2 = DSC.Math.Vector2.FactoryRaw(3.0, 4.0);
		//	
		//	result &= (DSC.Math.AlmostEqual(11.0, DSC.Math.Vector2.DotProduct(vector1, vector2)));
		//	result &= (DSC.Math.AlmostEqual(11.0, DSC.Math.Vector2.DotProduct(vector2, vector1)));
		//	
		//	if (!result)
		//		return "Fail: Math.Vector2 DotProduct";
		//}
		//
		////method LengthSquared
		//if (true == result)
		//{
		//	var vector = DSC.Math.Vector2.FactoryRaw(3.0, 4.0);
		//
		//	result &= (DSC.Math.AlmostEqual(25.0, vector.LengthSquared()));
		//
		//	if (!result)
		//		return "Fail: Math.Vector2 LengthSquared";
		//}
		//
		////method Length
		//if (true == result)
		//{
		//	var vector = DSC.Math.Vector2.FactoryRaw(3.0, 4.0);
		//	var vector1 = DSC.Math.Vector2.FactoryRaw();
		//	
		//	result &= DSC.Math.AlmostEqual(5.0, vector.Length());
		//	result &= DSC.Math.AlmostEqual(0.0, vector1.Length());
		//
		//	if (!result)
		//		return "Fail: Math.Vector2 Length";
		//}		
		//
		////CrossProductRaw(inout_result, _lhsX, _lhsY)
		//if (true == result)
		//{
		//	var vector1 = DSC.Math.Vector2.FactoryRaw();
		//	DSC.Math.Vector2.CrossProductRaw(vector1, 1.0, 0.1);
		//	result &= DSC.Math.AlmostEqual(-0.1, vector1[0]);
		//	result &= DSC.Math.AlmostEqual(1.0, vector1[1]);
		//
		//	if (!result)
		//		return "Fail: Math.Vector2 CrossProductRaw";
		//}
		//
		////method Normalise
		//if (true == result)
		//{
		//	var vector1 = DSC.Math.Vector2.FactoryRaw();
		//	var vector2 = DSC.Math.Vector2.FactoryRaw();
		//	DSC.Math.Vector2.NormalRaw(vector1, 0.0, 0.0);
		//	DSC.Math.Vector2.NormalRaw(vector2, 3.0, 4.0);
		//
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[0]);
		//	result &= DSC.Math.AlmostEqual(0.0, vector1[1]);
		//	result &= DSC.Math.AlmostEqual(0.6, vector2[0]);
		//	result &= DSC.Math.AlmostEqual(0.8, vector2[1]);
		//
		//	if (!result)
		//		return "Fail: Math.Vector2 Normalise";
		//}	

		if (true != result)
			return "Fail: Math.Vector2";
		return "Pass: Math.Vector2";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

