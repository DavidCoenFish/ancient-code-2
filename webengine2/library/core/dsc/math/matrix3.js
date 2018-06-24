/*
matching openGL documentation
		0_0, 0_1, 0_2(x),
		1_0, 1_1, 1_2(y),
		2_0, 2_1, 2_2
*/

DSC.Math.Matrix3 = function()
{
	alert("Matrix4: meta class, construct via FactoryRaw");	
}

DSC.Math.Matrix3.s_enum = 
{
	"T_0_0" : 0,
	"T_0_1" : 1,
	"T_0_2" : 2,
	"T_1_0" : 3,
	"T_1_1" : 4,
	"T_1_2" : 5,
	"T_2_0" : 6,
	"T_2_1" : 7,
	"T_2_2" : 8
};

DSC.Math.Matrix3.SetRaw = function(
	in_0_0,
	in_0_1,
	in_0_2,
	in_1_0,
	in_1_1,
	in_1_2,
	in_2_0,
	in_2_1,
	in_2_2
	)
{
	inout_result[0] = in_0_0;
	inout_result[1] = in_0_1;
	inout_result[2] = in_0_2;
	inout_result[3] = in_1_0;
	inout_result[4] = in_1_1;
	inout_result[5] = in_1_2;
	inout_result[6] = in_2_0;
	inout_result[7] = in_2_1;
	inout_result[8] = in_2_2;
	return;
}

DSC.Math.Matrix3.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Matrix3.SetRaw(
			_result,
			in_source[0], in_source[1], in_source[2], 
			in_source[3], in_source[4], in_source[5], 
			in_source[6], in_source[7], in_source[8]
			);
		return _result;
	}
	return DSC.Math.Matrix3.FactoryRaw(
		in_source[0], in_source[1], in_source[2], 
		in_source[3], in_source[4], in_source[5], 
		in_source[6], in_source[7], in_source[8]
		);
}


DSC.Math.Matrix3.toString = function(in_matrix)
{
	var result = "Matrix4 " + in_matrix[0] + ", " + in_matrix[1] + ", " + in_matrix[2] + ",\n";
	result += "\t" + in_matrix[3] + ", " + in_matrix[4] + ", " + in_matrix[5] + ",\n";
	result += "\t" + in_matrix[6] + ", " + in_matrix[7] + ", " + in_matrix[8] + "\n";
	return result;
}

DSC.Math.Matrix3.Inverse = function(inout_result, in_matrix)
{
	inout_result = (undefined == inout_result) ? DSC.Math.Matrix3.FactoryRaw() : inout_result;

	// Cache the matrix values (makes for huge speed increases!)
	var a00 = in_matrix[0];
	var a01 = in_matrix[1]; 
	var a02 = in_matrix[2]; 
	var a10 = in_matrix[3];
	var a11 = in_matrix[4]; 
	var a12 = in_matrix[5]; 
	var a20 = in_matrix[6];
	var a21 = in_matrix[7]; 
	var a22 = in_matrix[8]; 

	var b01 = a22*a11-a12*a21;
	var b11 = -a22*a10+a12*a20;
	var b21 = a21*a10-a11*a20;

	var d = a00*b01 + a01*b11 + a02*b21;
	if (!d) 
	{
		return DSC.Math.Matrix3.Clone(inout_result, DSC.Math.Matrix3.s_identity); 
	}
	var id = 1/d;
	DSC.Math.Matrix3.SetRaw(
		inout_result,
		b01*id,
		(-a22*a01 + a02*a21)*id,
		(a12*a01 - a02*a11)*id,
		b11*id,
		(a22*a00 - a02*a20)*id,
		(-a12*a00 + a02*a10)*id,
		b21*id,
		(-a21*a00 + a01*a20)*id,
		(a11*a00 - a01*a10)*id
		);
	return inout_result;
};

DSC.Math.Matrix3.FromQuaternion = function(_result, in_quaternion)
{
	inout_result = (undefined == inout_result) ? DSC.Math.Matrix3.FactoryRaw() : inout_result;

	var X = DSC.Math.Quaternion.GetI(in_quaternion);
	var Y = DSC.Math.Quaternion.GetJ(in_quaternion);
	var Z = DSC.Math.Quaternion.GetK(in_quaternion);
	var W = DSC.Math.Quaternion.GetW(in_quaternion);

    var xx      = X * X;
    var xy      = X * Y;
    var xz      = X * Z;
    var xw      = X * W;
    var yy      = Y * Y;
    var yz      = Y * Z;
    var yw      = Y * W;
    var zz      = Z * Z;
    var zw      = Z * W;

	DSC.Math.Matrix3.SetRaw(
		1 - 2 * ( yy + zz ),
		2 * ( xy - zw ),
		2 * ( xz + yw ),
		2 * ( xy + zw ),
		1 - 2 * ( xx + zz ),
		2 * ( yz - xw ),
		2 * ( xz - yw ),
		2 * ( yz + xw ),
		1 - 2 * ( xx + yy )
		);
	return inout_result;
}

DSC.Math.Matrix3.FactoryRaw = function(
	_0_0,
	_0_1,
	_0_2,
	_1_0,
	_1_1,
	_1_2,
	_2_0,
	_2_1,
	_2_2
	)
{
	return new DSC.Common.t_floatArray([
		(undefined == _0_0) ? 0.0 : _0_0,
		(undefined == _0_1) ? 0.0 : _0_1,
		(undefined == _0_2) ? 0.0 : _0_2,
		(undefined == _1_0) ? 0.0 : _1_0,
		(undefined == _1_1) ? 0.0 : _1_1,
		(undefined == _1_2) ? 0.0 : _1_2,
		(undefined == _2_0) ? 0.0 : _2_0,
		(undefined == _2_1) ? 0.0 : _2_1,
		(undefined == _2_2) ? 0.0 : _2_2,
		]);
}

DSC.Math.Matrix3.s_zero = DSC.Math.Matrix3.FactoryRaw();
DSC.Math.Matrix3.s_identity = DSC.Math.Matrix3.FactoryRaw(
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0
	);

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;



		if (true != result)
			return "Fail: Math.Matrix3";
		return "Pass: Math.Matrix3";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

