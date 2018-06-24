/*
*/

DSC.Math.DualQuaternion = function()
{
	alert("Quaternion: meta class, construct via FactoryRaw");	
}

//DSC.Math.DualQuaternion.s_enum = 
//{
//	"TI0" : 0,
//	"TJ0" : 1,
//	"TK0" : 2,
//	"TW0" : 3,
//	"TI1" : 4,
//	"TJ1" : 5,
//	"TK1" : 6,
//	"TW1" : 7
//};

DSC.Math.DualQuaternion.GetI0 = function(in_source)
{
	return in_source[0];
}
DSC.Math.DualQuaternion.GetJ0 = function(in_source)
{
	return in_source[1];
}
DSC.Math.DualQuaternion.GetK0 = function(in_source)
{
	return in_source[2];
}
DSC.Math.DualQuaternion.GetW0 = function(in_source)
{
	return in_source[3];
}
DSC.Math.DualQuaternion.GetI1 = function(in_source)
{
	return in_source[4];
}
DSC.Math.DualQuaternion.GetJ1 = function(in_source)
{
	return in_source[5];
}
DSC.Math.DualQuaternion.GetK1 = function(in_source)
{
	return in_source[6];
}
DSC.Math.DualQuaternion.GetW1 = function(in_source)
{
	return in_source[7];
}

DSC.Math.DualQuaternion.SetI0 = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetJ0 = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetK0 = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetW0 = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetI1 = function(in_source, in_value)
{
	in_source[4] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetJ1 = function(in_source, in_value)
{
	in_source[5] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetK1 = function(in_source, in_value)
{
	in_source[6] = in_value;
	return;
}
DSC.Math.DualQuaternion.SetW1 = function(in_source, in_value)
{
	in_source[7] = in_value;
	return;
}

DSC.Math.DualQuaternion.toString = function(in_source)
{
	return "DualQuaternion m_i0:" + in_source[0] + " m_j0:" + in_source[1] + " m_k0:" + in_source[2] + " m_w0:" + in_source[3] + " m_i1:" + in_source[4] + " m_j1:" + in_source[5] + " m_k1:" + in_source[6] + " m_w1:" + in_source[7];
}

DSC.Math.DualQuaternion.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.DualQuaternion.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_lhs[3], in_lhs[4], in_lhs[5], in_lhs[6], in_lhs[7], in_rhs[0], in_rhs[1], in_rhs[2], in_rhs[3], in_rhs[4], in_rhs[5], in_rhs[6], in_rhs[7]);
}

DSC.Math.DualQuaternion.AlmostEqualRaw = function(in_lhsI0, in_lhsJ0, in_lhsK0, in_lhsW0, in_lhsI1, in_lhsJ1, in_lhsK1, in_lhsW1, in_rhsI0, in_rhsJ0, in_rhsK0, in_rhsW0, in_rhsI1, in_rhsJ1, in_rhsK1, in_rhsW1, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhsI0, in_rhsI0, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsJ0, in_rhsJ0, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsK0, in_rhsK0, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsW0, in_rhsW0, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsI1, in_rhsI1, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsJ1, in_rhsJ1, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsK1, in_rhsK1, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsW1, in_rhsW1, _epsilon))
		);
}

DSC.Math.DualQuaternion.FactoryRaw = function(_i0, _j0, _k0, _w0, _i1, _j1, _k1, _w1)
{
	return new DSC.Math.DualQuaternion(_i0, _j0, _k0, _w0, _i1, _j1, _k1, _w1);
}

DSC.Math.DualQuaternion.s_zero = DSC.Math.DualQuaternion.FactoryRaw();

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
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[0]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[1]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[2]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[3]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[4]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[5]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[6]);
			result &= (0.0 == DSC.Math.DualQuaternion.s_zero[7]);

			if (!result)
				return "Fail: Math.DualQuaternion InitVar";
		}

		//construction
		if (true == result)
		{
			var vector0 = DSC.Math.DualQuaternion.FactoryRaw();
			var vector1 = DSC.Math.DualQuaternion.FactoryRaw(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0);
			
			result &= (0.0 == vector0[0]);
			result &= (0.0 == vector0[1]);
			result &= (0.0 == vector0[2]);
			result &= (0.0 == vector0[3]);
			result &= (0.0 == vector0[4]);
			result &= (0.0 == vector0[5]);
			result &= (0.0 == vector0[6]);
			result &= (0.0 == vector0[6]);
			result &= (1.0 == vector1[0]);
			result &= (2.0 == vector1[1]);
			result &= (3.0 == vector1[2]);
			result &= (4.0 == vector1[3]);
			result &= (5.0 == vector1[4]);
			result &= (6.0 == vector1[5]);
			result &= (7.0 == vector1[6]);
			result &= (8.0 == vector1[7]);
			
			if (!result)
				return "Fail: Math.DualQuaternion construction";
		}

		if (true != result)
			return "Fail: Math.DualQuaternion";
		return "Pass: Math.DualQuaternion";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

