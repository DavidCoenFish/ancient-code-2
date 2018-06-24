/*
	http://easyweb.easynet.co.uk/~mrmeanie/quatern/quatern.htm

	w is real scalar component
	i,j,k are imaginary

	rules
	i^2 = -1
	j^2 = -1
	k^2 = -1

	ij = k
	jk = i
	ki = j
	ji = -k
	kj = -i
	ik = -j

	addition:
	q = w + xi + yj + zk
	r = a + bi + cj + dk
	q + r = a + w + i(x + b) + j(y + c) + k(z + d)

	subtraction:
	q = w + xi + yj + zk
	r = a + bi + cj + dk
	q - r = a - w + i(x - b) + j(y - c) + k(z - d)

	multiplication:
	q = w + xi + yj + zk
	r = a + bi + cj + dk
	qr = wa - xb - yc - zd + i(wb + xa + yd - zc) + j(wc - xd + ya - zb) + k(wd + xc - yb + za)

	norm:
	q = w + xi + yj + zk
	norm(q) = w^2 + x^2 + y^2 + z^2

	modulus:
	q = w + xi + yj + zk
	|q| = ( w^2 + x^2 + y^2 + z^2 ) ^ (1/2)

	conjugate:
	q = w + xi + yj + zk
	q* = w - xi - yj - zk

	inverse:
	q = w + xi + yj + zk
	q^(-1) = ( w - xi - yj - zk ) / ( w^2 + x^2 + y^2 + z^2 )

	division:
	q = w + xi + yj + zk
	r = a + bi + cj + dk
	q/r = ( aw + bx + cy + dz + i(ax - bw - cz + dy) + j(ay + bz - cw - dx) + k(az - by + cx - dw) ) / (a^2 + b^2 + c^2 + d^2)

	rotation:
	R radians around axis [s t u]
	q = cos( R / 2 ) + is( sin( R / 2 ) ) + jt( sin( R / 2 ) ) + kt( sint( R / 2 ) )

	matrix:
		1 - 2y^2 - 2z^2		2xy + 2wz			2xz - 2wy			0
	[	2xy - 2wz			1 - 2x^2 - 2z^2		2yz + 2wx			0	]
		2xz + 2wy			2yz - 2wx			1 - 2x^2 - 2y^2		0
			0					0					0				1

*/

DSC.Math.Quaternion = function()
{
	alert("Quaternion: meta class, construct via FactoryRaw");	
}

//DSC.Math.Quaternion.s_enum = 
//{
//	"TI" : 0,
//	"TJ" : 1,
//	"TK" : 2,
//	"TW" : 3
//};


DSC.Math.Quaternion.GetI = function(in_source)
{
	return in_source[0];
}
DSC.Math.Quaternion.GetJ = function(in_source)
{
	return in_source[1];
}
DSC.Math.Quaternion.GetK = function(in_source)
{
	return in_source[2];
}
DSC.Math.Quaternion.GetW = function(in_source)
{
	return in_source[3];
}

DSC.Math.Quaternion.SetI = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Quaternion.SetJ = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.Quaternion.SetK = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
DSC.Math.Quaternion.SetW = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}

DSC.Math.Quaternion.toString = function(in_source)
{
	return "Quaternion m_i:" + in_source[0] + " m_j:" + in_source[1] + " m_k:" + in_source[2] + " m_w:" + in_source[3];
}

DSC.Math.Quaternion.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.Quaternion.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_lhs[3], in_rhs[0], in_rhs[1], in_rhs[2], in_rhs[3]);
}

DSC.Math.Quaternion.AlmostEqualRaw = function(in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhsI, in_rhsI, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsJ, in_rhsJ, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsK, in_rhsK, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsW, in_rhsW, _epsilon))
		);
}

DSC.Math.Quaternion.Addition = function(inout_result, in_lhs, in_rhs)
{
	return DSC.Math.Quaternion.AdditionRaw(inout_result, 
		in_lhs[0], 
		in_lhs[1], 
		in_lhs[2], 
		in_lhs[3], 
		in_rhs[0],
		in_rhs[1],
		in_rhs[2],
		in_rhs[3]
		);
}

DSC.Math.Quaternion.AdditionRaw = function(inout_result, in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW)
{
	inout_result = (undefined == inout_result) ? DSC.Quaternion.FactoryRaw() : inout_result;
	inout_result.SetRaw(
		(in_lhsI + in_rhsI),	
		(in_lhsJ + in_rhsJ),	
		(in_lhsK + in_rhsK),	
		(in_lhsW + in_rhsW)
		);
	return inout_result;
}

DSC.Math.Quaternion.Subtraction = function(inout_result, in_lhs, in_rhs)
{
	return DSC.Math.Quaternion.SubtractionRaw(inout_result, 
		in_lhs[0], 
		in_lhs[1], 
		in_lhs[2], 
		in_lhs[3], 
		in_rhs[0],
		in_rhs[1],
		in_rhs[2],
		in_rhs[3]
		);
}

DSC.Math.Quaternion.SubtractionRaw = function(inout_result, in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW)
{
	inout_result = (undefined == inout_result) ? DSC.Quaternion.FactoryRaw() : inout_result;
	inout_result.SetRaw(
		(in_lhsI - in_rhsI),	
		(in_lhsJ - in_rhsJ),	
		(in_lhsK - in_rhsK),	
		(in_lhsW - in_rhsW)
		);
	return inout_result;
}

DSC.Math.Quaternion.Multiplication = function(inout_result, in_lhs, in_rhs)
{
	return DSC.Math.Quaternion.MultiplicationRaw(inout_result, 
		in_lhs[0], 
		in_lhs[1], 
		in_lhs[2], 
		in_lhs[3], 
		in_rhs[0],
		in_rhs[1],
		in_rhs[2],
		in_rhs[3]
		);
}

DSC.Math.Quaternion.MultiplicationRaw = function(inout_result, in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW)
{
	inout_result = (undefined == inout_result) ? DSC.Quaternion.FactoryRaw() : inout_result;
	inout_result.SetRaw(
		(in_lhsW * in_rhsI) + (in_lhsI * in_rhsW) + (in_lhsJ * in_rhsK) - (in_lhsK * in_rhsJ),	
		(in_lhsW * in_rhsJ) - (in_lhsI * in_rhsK) + (in_lhsJ * in_rhsW) - (in_lhsK * in_rhsI),	
		(in_lhsW * in_rhsK) + (in_lhsI * in_rhsJ) - (in_lhsJ * in_rhsI) + (in_lhsK * in_rhsW),	
		(in_lhsW * in_rhsW) - (in_lhsI * in_rhsI) - (in_lhsJ * in_rhsJ) - (in_lhsK * in_rhsK)
		);
	return inout_result;
}

DSC.Math.Quaternion.Normalise = function(inout_result, in_src)
{
	return DSC.Math.Quaternion.NormaliseRaw(
		inout_result, 
		in_src[0], 
		in_src[1], 
		in_src[2], 
		in_src[3]
		);
}

DSC.Math.Quaternion.NormaliseRaw = function(inout_result, in_srcI, in_srcJ, in_srcK, in_srcW)
{
	var lengthSquared = DSC.Math.Vector3.LengthSquaredRaw(in_srcI, in_srcJ, in_srcK, in_srcW);
	var mul = 1.0;
	var length = lengthSquared;
	if ((0.0 != lengthSquared) && (1.0 != lengthSquared))
	{
		length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	inout_result.SetRaw(
		in_srcI * mul,
		in_srcJ * mul,
		in_srcK * mul,
		in_srcW * mul
		);
	return inout_result;
}

DSC.Math.Quaternion.Slerp = function(inout_result, in_lhs, in_rhs, in_ratio)
{
	return DSC.Math.Quaternion.SlerpRaw(
		inout_result, 
		in_lhs[0], 
		in_lhs[1], 
		in_lhs[2], 
		in_lhs[3], 
		in_rhs[0],
		in_rhs[1],
		in_rhs[2],
		in_rhs[3],
		in_ratio
		);
}

DSC.Math.Quaternion.SlerpRaw = function(inout_result, in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW, in_ratio)
{
	inout_result = (undefined == inout_result) ? DSC.Quaternion.FactoryRaw() : inout_result;
	// Reverse the sign of q2 if q1.q2 < 0.
	if (DSC.Math.Vector3.DotProductRaw(in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW) < 0)
	{
		in_rhsI = -in_rhsI;
		in_rhsJ = -in_rhsJ;
		in_rhsK = -in_rhsK;
		in_rhsW = -in_rhsW;
	}
	   
	var theta = Math.acos(DSC.Math.Vector3.DotProductRaw(in_lhsI, in_lhsJ, in_lhsK, in_lhsW, in_rhsI, in_rhsJ, in_rhsK, in_rhsW));

	if (0.000001 < theta) 
	{
		var temp = Math.sin(theta);
		var mult1 = Math.sin((1.0 - in_ratio) * theta) / temp;
		var mult2 = Math.sin(in_ratio * theta) / temp;
	}
	else
	{
		var mult1 = 1.0 - in_ratio;
		var mult2 = in_ratio;
	}

	inout_result.SetRaw(
		(mult1 * in_lhsI) + (mult2 * in_rhsI),
		(mult1 * in_lhsJ) + (mult2 * in_rhsJ),
		(mult1 * in_lhsK) + (mult2 * in_rhsK),
		(mult1 * in_lhsW) + (mult2 * in_rhsW)
		);
   
	return inout_result;
}

DSC.Math.Quaternion.FromMatrix3 = function(_result, in_matrix3)
{
	_result = (undefined == _result) ? DSC.Quaternion.FactoryRaw() : _result;

	var tr = in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] + in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1] + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2];

	if (tr > 0) 
	{ 
		var S = Math.sqrt(tr+1.0) * 2; // S=4*qw 
		_result.SetRaw(
			0.25 * S,
			(in_matrix3[DSC.Math.Matrix3.s_enum.T_2_1] - in_matrix3[DSC.Math.Matrix3.s_enum.T_1_2]) / S,
			(in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2] - in_matrix3[DSC.Math.Matrix3.s_enum.T_2_0]) / S, 
			(in_matrix3[DSC.Math.Matrix3.s_enum.T_1_0] - in_matrix3[DSC.Math.Matrix3.s_enum.T_0_1]) / S
			);
	} 
	else if ((in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] > in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1])&(in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] > in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2])) 
	{ 
		var S = Math.sqrt(1.0 + in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] - in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1] - in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2]) * 2; // S=4*qx 
		_result.SetRaw(
			qw = (in_matrix3[DSC.Math.Matrix3.s_enum.T_2_1] - in_matrix3[DSC.Math.Matrix3.s_enum.T_1_2]) / S,
			qx = 0.25 * S,
			qy = (in_matrix3[DSC.Math.Matrix3.s_enum.T_0_1] + in_matrix3[DSC.Math.Matrix3.s_enum.T_1_0]) / S, 
			qz = (in_matrix3[DSC.Math.Matrix3.s_enum.T_0_2] + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_0]) / S
			);
	} 
	else if (in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1] > in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2]) 
	{ 
		var S = Math.sqrt(1.0 + in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1] - in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] - in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2]) * 2; // S=4*qy
		_result.SetRaw(
			qw = (in_matrix3[DSC.Math.Matrix3.s_enum.T_0_2] - in_matrix3[DSC.Math.Matrix3.s_enum.T_2_0]) / S,
			qx = (in_matrix3[DSC.Math.Matrix3.s_enum.T_0_1] + in_matrix3[DSC.Math.Matrix3.s_enum.T_1_0]) / S,
			qy = 0.25 * S,
			qz = (in_matrix3[DSC.Math.Matrix3.s_enum.T_1_2] + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_1]) / S
			);
	} 
	else 
	{ 
		var S = Math.sqrt(1.0 + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_2] - in_matrix3[DSC.Math.Matrix3.s_enum.T_0_0] - in_matrix3[DSC.Math.Matrix3.s_enum.T_1_1]) * 2; // S=4*qz
		_result.SetRaw(
			qw = (in_matrix3[DSC.Math.Matrix3.s_enum.T_1_0] - in_matrix3[DSC.Math.Matrix3.s_enum.T_0_1]) / S,
			qx = (in_matrix3[DSC.Math.Matrix3.s_enum.T_0_2] + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_0]) / S,
			qy = (in_matrix3[DSC.Math.Matrix3.s_enum.T_1_2] + in_matrix3[DSC.Math.Matrix3.s_enum.T_2_1]) / S,
			qz = 0.25 * S
			);
	}

	return _result;
}

DSC.Math.Quaternion.FactoryRaw = function(_i, _j, _k, _w)
{
	return new DSC.Common.t_floatArray([
		(undefined == _i) ? 0.0 : _i,
		(undefined == _j) ? 0.0 : _j,
		(undefined == _k) ? 0.0 : _k,
		(undefined == _w) ? 0.0 : _w
		]);
}

DSC.Math.Quaternion.s_zero = DSC.Math.Quaternion.FactoryRaw();

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
			result &= (0.0 == DSC.Math.Quaternion.s_zero[0]);
			result &= (0.0 == DSC.Math.Quaternion.s_zero[1]);
			result &= (0.0 == DSC.Math.Quaternion.s_zero[2]);
			result &= (0.0 == DSC.Math.Quaternion.s_zero[3]);

			if (!result)
				return "Fail: Math.Quaternion InitVar";
		}

		//construction
		if (true == result)
		{
			var vector0 = DSC.Math.Quaternion.FactoryRaw();
			var vector1 = DSC.Math.Quaternion.FactoryRaw(1.0, 2.0, 3.0, 4.0);
			var vector2 = DSC.Math.Quaternion.FactoryRaw(3.0, 4.0, 5.0, 6.0);
			
			result &= (0.0 == vector0[0]);
			result &= (0.0 == vector0[1]);
			result &= (0.0 == vector0[2]);
			result &= (0.0 == vector0[3]);
			result &= (1.0 == vector1[0]);
			result &= (2.0 == vector1[1]);
			result &= (3.0 == vector1[2]);
			result &= (4.0 == vector1[3]);
			result &= (3.0 == vector2[0]);
			result &= (4.0 == vector2[1]);
			result &= (5.0 == vector2[2]);
			result &= (6.0 == vector2[3]);
			
			if (!result)
				return "Fail: Math.Quaternion construction";
		}

		if (true != result)
			return "Fail: Math.Quaternion";
		return "Pass: Math.Quaternion";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

