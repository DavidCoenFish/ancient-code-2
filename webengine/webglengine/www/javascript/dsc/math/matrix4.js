/*
matching openGL documentation
		0_0, 0_1, 0_2, 0_3(x),
		1_0, 1_1, 1_2, 1_3(y),
		2_0, 2_1, 2_2, 2_3(z),
		3_0, 3_1, 3_2, 3_3

how i like to think of memory, (row_column)
		0_0, 1_0, 2_0, 3_0,
		0_1, 1_1, 2_1, 3_1,
		0_2, 1_2, 2_2, 3_2,
		0_3, 1_3, 2_3, 3_3
		(x)  (y)  (z)

this class works with 4x4 floats
a unit scale matix can convert <==> dual quaternion
*/

DSC.Math.Matrix4 = function()
{
	alert("Matrix4: meta class, construct via FactoryRaw");	
}

/*
	the prefered way to access internal data externally (data index could change)
	var matrix0 = DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_zero);
	var matrix1 = DSC.Math.Matrix4.FactoryRaw();
	//var m00 = matrix1[DSC.Math.Matrix4.s_enum.T_0_0];
*/
DSC.Math.Matrix4.s_enum = 
{
	"T_0_0" : 0,
	"T_1_0" : 1,
	"T_2_0" : 2,
	"T_3_0" : 3,
	"T_0_1" : 4,
	"T_1_1" : 5,
	"T_2_1" : 6,
	"T_3_1" : 7,
	"T_0_2" : 8,
	"T_1_2" : 9,
	"T_2_2" : 10,
	"T_3_2" : 11,
	"T_0_3" : 12,
	"T_1_3" : 13,
	"T_2_3" : 14,
	"T_3_3" : 15
};

DSC.Math.Matrix4.SetRaw = function(
	inout_result, 
	in_0_0,
	in_1_0,
	in_2_0,
	in_3_0,
	in_0_1,
	in_1_1,
	in_2_1,
	in_3_1,
	in_0_2,
	in_1_2,
	in_2_2,
	in_3_2,
	in_0_3,
	in_1_3,
	in_2_3,
	in_3_3
	)
{
	inout_result[0] = in_0_0;
	inout_result[1] = in_1_0;
	inout_result[2] = in_2_0;
	inout_result[3] = in_3_0;
	inout_result[4] = in_0_1;
	inout_result[5] = in_1_1;
	inout_result[6] = in_2_1;
	inout_result[7] = in_3_1;
	inout_result[8] = in_0_2;
	inout_result[9] = in_1_2;
	inout_result[10] = in_2_2;
	inout_result[11] = in_3_2;
	inout_result[12] = in_0_3;
	inout_result[13] = in_1_3;
	inout_result[14] = in_2_3;
	inout_result[15] = in_3_3;
	return;
}

DSC.Math.Matrix4.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Matrix4.SetRaw(
			_result,
			in_source[0], in_source[1], in_source[2], in_source[3],
			in_source[4], in_source[5], in_source[6], in_source[7],
			in_source[8], in_source[9], in_source[10], in_source[11],
			in_source[12], in_source[13], in_source[14], in_source[15]
			);
		return _result;
	}
	return DSC.Math.Matrix4.FactoryRaw(
		in_source[0], in_source[1], in_source[2], in_source[3],
		in_source[4], in_source[5], in_source[6], in_source[7],
		in_source[8], in_source[9], in_source[10], in_source[11],
		in_source[12], in_source[13], in_source[14], in_source[15]
		);
}


DSC.Math.Matrix4.toString = function(in_matrix)
{
	var result = "Matrix4 " + in_matrix[0] + ", " + in_matrix[1] + ", " + in_matrix[2] + ", " + in_matrix[3] + ",\n";
	result += "\t" + in_matrix[4] + ", " + in_matrix[5] + ", " + in_matrix[6] + ", " + in_matrix[7] + ",\n";
	result += "\t" + in_matrix[8] + ", " + in_matrix[9] + ", " + in_matrix[10] + ", " + in_matrix[11] + ",\n";
	result += "\t" + in_matrix[12] + ", " + in_matrix[13] + ", " + in_matrix[14] + ", " + in_matrix[15];
	return result;
}

/*
	TODO:
GetAt, Up [Set]
GetQuaternion [Set]
GetScale [Set]
Normalise
Orthogonalise

*/

DSC.Math.Matrix4.GetPosition = function(_result, in_matrix)
{
	_result = (undefined == _result) ? DSC.Math.Vector3.FactoryRaw() : _result;
	DSC.Math.Vector3.SetRaw(_result, in_matrix[12], in_matrix[13], in_matrix[14]);
	return _result;
}

DSC.Math.Matrix4.SetPosition = function(in_matrix, in_pos)
{
	return DSC.Math.Matrix4.SetPositionRaw(in_matrix, in_pos[0], in_pos[1], in_pos[2]);
}

DSC.Math.Matrix4.SetPositionRaw = function(in_matrix, in_x, in_y, in_z)
{
	in_matrix[12] = in_x;
	in_matrix[13] = in_y;
	in_matrix[14] = in_z;
	return;
}

DSC.Math.Matrix4.GetAt = function(_result, in_matrix)
{
	_result = (undefined == _result) ? DSC.Math.Vector3.FactoryRaw() : _result;
	DSC.Math.Vector3.SetRaw(_result, in_matrix[8], in_matrix[9], in_matrix[10]);
	return _result;
}

DSC.Math.Matrix4.SetAtRaw = function(in_matrix, in_x, in_y, in_z)
{
	in_matrix[2] = in_x;
	in_matrix[6] = in_y;
	in_matrix[10] = in_z;
	return;
}

DSC.Math.Matrix4.Inverse = function(_result, in_matrix)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;

	DSC.Math.Matrix4.SetRaw(
		_result,
		in_matrix[5]*in_matrix[10]*in_matrix[15] - in_matrix[5]*in_matrix[11]*in_matrix[14] - in_matrix[9]*in_matrix[6]*in_matrix[15] + in_matrix[9]*in_matrix[7]*in_matrix[14] + in_matrix[13]*in_matrix[6]*in_matrix[11] - in_matrix[13]*in_matrix[7]*in_matrix[10],
		-in_matrix[1]*in_matrix[10]*in_matrix[15] + in_matrix[1]*in_matrix[11]*in_matrix[14] + in_matrix[9]*in_matrix[2]*in_matrix[15] - in_matrix[9]*in_matrix[3]*in_matrix[14] - in_matrix[13]*in_matrix[2]*in_matrix[11] + in_matrix[13]*in_matrix[3]*in_matrix[10],
		in_matrix[1]*in_matrix[6]*in_matrix[15] - in_matrix[1]*in_matrix[7]*in_matrix[14] - in_matrix[5]*in_matrix[2]*in_matrix[15] + in_matrix[5]*in_matrix[3]*in_matrix[14] + in_matrix[13]*in_matrix[2]*in_matrix[7] - in_matrix[13]*in_matrix[3]*in_matrix[6],
		-in_matrix[1]*in_matrix[6]*in_matrix[11] + in_matrix[1]*in_matrix[7]*in_matrix[10] + in_matrix[5]*in_matrix[2]*in_matrix[11] - in_matrix[5]*in_matrix[3]*in_matrix[10] - in_matrix[9]*in_matrix[2]*in_matrix[7] + in_matrix[9]*in_matrix[3]*in_matrix[6],

		-in_matrix[4]*in_matrix[10]*in_matrix[15] + in_matrix[4]*in_matrix[11]*in_matrix[14] + in_matrix[8]*in_matrix[6]*in_matrix[15] - in_matrix[8]*in_matrix[7]*in_matrix[14] - in_matrix[12]*in_matrix[6]*in_matrix[11] + in_matrix[12]*in_matrix[7]*in_matrix[10],
		in_matrix[0]*in_matrix[10]*in_matrix[15] - in_matrix[0]*in_matrix[11]*in_matrix[14] - in_matrix[8]*in_matrix[2]*in_matrix[15] + in_matrix[8]*in_matrix[3]*in_matrix[14] + in_matrix[12]*in_matrix[2]*in_matrix[11] - in_matrix[12]*in_matrix[3]*in_matrix[10],
		-in_matrix[0]*in_matrix[6]*in_matrix[15] + in_matrix[0]*in_matrix[7]*in_matrix[14] + in_matrix[4]*in_matrix[2]*in_matrix[15] - in_matrix[4]*in_matrix[3]*in_matrix[14] - in_matrix[12]*in_matrix[2]*in_matrix[7] + in_matrix[12]*in_matrix[3]*in_matrix[6],
		in_matrix[0]*in_matrix[6]*in_matrix[11] - in_matrix[0]*in_matrix[7]*in_matrix[10] - in_matrix[4]*in_matrix[2]*in_matrix[11] + in_matrix[4]*in_matrix[3]*in_matrix[10] + in_matrix[8]*in_matrix[2]*in_matrix[7] - in_matrix[8]*in_matrix[3]*in_matrix[6],

		in_matrix[4]*in_matrix[9]*in_matrix[15] - in_matrix[4]*in_matrix[11]*in_matrix[13] - in_matrix[8]*in_matrix[5]*in_matrix[15] + in_matrix[8]*in_matrix[7]*in_matrix[13] + in_matrix[12]*in_matrix[5]*in_matrix[11] - in_matrix[12]*in_matrix[7]*in_matrix[9],
		-in_matrix[0]*in_matrix[9]*in_matrix[15] + in_matrix[0]*in_matrix[11]*in_matrix[13] + in_matrix[8]*in_matrix[1]*in_matrix[15] - in_matrix[8]*in_matrix[3]*in_matrix[13] - in_matrix[12]*in_matrix[1]*in_matrix[11] + in_matrix[12]*in_matrix[3]*in_matrix[9],
		in_matrix[0]*in_matrix[5]*in_matrix[15] - in_matrix[0]*in_matrix[7]*in_matrix[13] - in_matrix[4]*in_matrix[1]*in_matrix[15] + in_matrix[4]*in_matrix[3]*in_matrix[13] + in_matrix[12]*in_matrix[1]*in_matrix[7] - in_matrix[12]*in_matrix[3]*in_matrix[5],
		-in_matrix[0]*in_matrix[5]*in_matrix[11] + in_matrix[0]*in_matrix[7]*in_matrix[9] + in_matrix[4]*in_matrix[1]*in_matrix[11] - in_matrix[4]*in_matrix[3]*in_matrix[9] - in_matrix[8]*in_matrix[1]*in_matrix[7] + in_matrix[8]*in_matrix[3]*in_matrix[5],

		-in_matrix[4]*in_matrix[9]*in_matrix[14] + in_matrix[4]*in_matrix[10]*in_matrix[13] + in_matrix[8]*in_matrix[5]*in_matrix[14] - in_matrix[8]*in_matrix[6]*in_matrix[13] - in_matrix[12]*in_matrix[5]*in_matrix[10] + in_matrix[12]*in_matrix[6]*in_matrix[9],
		in_matrix[0]*in_matrix[9]*in_matrix[14] - in_matrix[0]*in_matrix[10]*in_matrix[13] - in_matrix[8]*in_matrix[1]*in_matrix[14] + in_matrix[8]*in_matrix[2]*in_matrix[13] + in_matrix[12]*in_matrix[1]*in_matrix[10] - in_matrix[12]*in_matrix[2]*in_matrix[9],
		-in_matrix[0]*in_matrix[5]*in_matrix[14] + in_matrix[0]*in_matrix[6]*in_matrix[13] + in_matrix[4]*in_matrix[1]*in_matrix[14] - in_matrix[4]*in_matrix[2]*in_matrix[13] - in_matrix[12]*in_matrix[1]*in_matrix[6] + in_matrix[12]*in_matrix[2]*in_matrix[5],
		in_matrix[0]*in_matrix[5]*in_matrix[10] - in_matrix[0]*in_matrix[6]*in_matrix[9] - in_matrix[4]*in_matrix[1]*in_matrix[10] + in_matrix[4]*in_matrix[2]*in_matrix[9] + in_matrix[8]*in_matrix[1]*in_matrix[6] - in_matrix[8]*in_matrix[2]*in_matrix[5]
		);

	var det = in_matrix[0] * _result[0] + in_matrix[4] * _result[1] + in_matrix[8] * _result[2] + in_matrix[12] * _result[3];
	var idet = 1.0 / det;
	_result[0] *= idet;
	_result[1] *= idet;
	_result[2] *= idet;
	_result[3] *= idet;
	_result[4] *= idet;
	_result[5] *= idet;
	_result[6] *= idet;
	_result[7] *= idet;
	_result[8] *= idet;
	_result[9] *= idet;
	_result[10] *= idet;
	_result[11] *= idet;
	_result[12] *= idet;
	_result[13] *= idet;
	_result[14] *= idet;
	_result[15] *= idet;

	return _result;
};



DSC.Math.Matrix4.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhs[0], in_rhs[0], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[1], in_rhs[1], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[2], in_rhs[2], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[3], in_rhs[3], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[4], in_rhs[4], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[5], in_rhs[5], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[6], in_rhs[6], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[7], in_rhs[7], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[8], in_rhs[8], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[9], in_rhs[9], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[10], in_rhs[10], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[11], in_rhs[11], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[12], in_rhs[12], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[13], in_rhs[13], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[14], in_rhs[14], _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhs[15], in_rhs[15], _epsilon))
		);
}

DSC.Math.Matrix4.Transpose = function(_result, in_matrix)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;
	DSC.Math.Matrix4.SetRaw(
		_result,
		in_matrix[0],
		in_matrix[4],
		in_matrix[8],
		in_matrix[12],
		in_matrix[1],
		in_matrix[5],
		in_matrix[9],
		in_matrix[13],
		in_matrix[2],
		in_matrix[6],
		in_matrix[10],
		in_matrix[14],
		in_matrix[3],
		in_matrix[7],
		in_matrix[11],
		in_matrix[15]
		);

	return _result;
}

DSC.Math.Matrix4.AtUp = function(
	_result, 
	in_targetAt, 
	in_targetUp,
	_baseAt, //UnitY
	_baseUp, //UnitZ
	_position
	)
{
	return DSC.Math.Matrix4.AtUp(
		_result, 
		in_targetAt[0], in_targetAt[1], in_targetAt[2], 
		in_targetUp[0], in_targetUp[1], in_targetUp[2],
		(undefined == _baseAt) ? undefined : _baseAt[0], 
		(undefined == _baseAt) ? undefined : _baseAt[1], 
		(undefined == _baseAt) ? undefined : _baseAt[2], 
		(undefined == _baseUp) ? undefined : _baseUp[0], 
		(undefined == _baseUp) ? undefined : _baseUp[1], 
		(undefined == _baseUp) ? undefined : _baseUp[2], 
		(undefined == _position) ? undefined : _position[0], 
		(undefined == _position) ? undefined : _position[1], 
		(undefined == _position) ? undefined : _position[2]
		);
}

DSC.Math.Matrix4.AtUpRaw = function(
		_result, 
		in_targetAtX, in_targetAtY, in_targetAtZ, 
		in_targetUpX, in_targetUpY, in_targetUpZ,
		_baseAtX, _baseAtY, _baseAtZ, //UnitY
		_baseUpX, _baseUpY, _baseUpZ, //UnitZ
		_positionX, _positionY, _positionZ
		)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;

	var in_baseAt = DSC.Math.Vector3.FactoryRaw(
		_baseAtX == undefined ? 0.0 : _baseAtX, 
		_baseAtY == undefined ? 1.0 : _baseAtY, 
		_baseAtZ == undefined ? 0.0 : _baseAtZ);
	var in_baseUp = DSC.Math.Vector3.FactoryRaw(
		_baseUpX == undefined ? 0.0 : _baseUpX, 
		_baseUpY == undefined ? 0.0 : _baseUpY, 
		_baseUpZ == undefined ? 1.0 : _baseUpZ
		);

	var crossBaseUpAt = DSC.Math.Vector3.CrossProduct(undefined, in_baseUp, in_baseAt);

	var crossTargetUpAt = DSC.Math.Vector3.CrossProductRaw(undefined, in_targetUpX, in_targetUpY, in_targetUpZ, in_targetAtX, in_targetAtY, in_targetAtZ);

	DSC.Math.Matrix4.SetRaw(
		_result,

		(in_baseAt[0] * in_targetAtX) + (crossBaseUpAt[0] * crossTargetUpAt[0]) + (in_baseUp[0] * in_targetUpX),
		(in_baseAt[0] * in_targetAtY) + (crossBaseUpAt[0] * crossTargetUpAt[1]) + (in_baseUp[0] * in_targetUpY),
		(in_baseAt[0] * in_targetAtZ) + (crossBaseUpAt[0] * crossTargetUpAt[2]) + (in_baseUp[0] * in_targetUpZ),
		0.0,

		(in_baseAt[1] * in_targetAtX) + (crossBaseUpAt[1] * crossTargetUpAt[0]) + (in_baseUp[1] * in_targetUpX),
		(in_baseAt[1] * in_targetAtY) + (crossBaseUpAt[1] * crossTargetUpAt[1]) + (in_baseUp[1] * in_targetUpY),
		(in_baseAt[1] * in_targetAtZ) + (crossBaseUpAt[1] * crossTargetUpAt[2]) + (in_baseUp[1] * in_targetUpZ),
		0.0,

		(in_baseAt[2] * in_targetAtX) + (crossBaseUpAt[2] * crossTargetUpAt[0]) + (in_baseUp[2] * in_targetUpX),
		(in_baseAt[2] * in_targetAtY) + (crossBaseUpAt[2] * crossTargetUpAt[1]) + (in_baseUp[2] * in_targetUpY),
		(in_baseAt[2] * in_targetAtZ) + (crossBaseUpAt[2] * crossTargetUpAt[2]) + (in_baseUp[2] * in_targetUpZ),
		0.0,

		(undefined == _positionX) ? 0.0 : _positionX,
		(undefined == _positionY) ? 0.0 : _positionY,
		(undefined == _positionZ) ? 0.0 : _positionZ,
		1.0
		);

	return _result;
}

DSC.Math.Matrix4.Pos = function(
	_result, 
	in_position
	)
{
	return DSC.Math.Matrix4.PosRaw(
		_result, 
		in_position[0], in_position[1], in_position[2]
		);
}

DSC.Math.Matrix4.PosRaw = function(
	_result, 
	in_positionX, in_positionY, in_positionZ
	)
{
	_result = DSC.Math.Matrix4.Clone(_result, DSC.Math.Matrix4.s_identity);
	DSC.Math.Matrix4.SetPositionRaw(_result, in_positionX, in_positionY, in_positionZ);
	return _result;
}

DSC.Math.Matrix4.RotPos = function(
	_result, 
	in_rot, 
	_position
	)
{
	return DSC.Math.Matrix4.RotPosRaw(
		_result, 
		in_rot[0], in_rot[1], in_rot[2], in_rot[3], 
		(undefined != _position) ? _position[0] : undefined,
		(undefined != _position) ? _position[1] : undefined,
		(undefined != _position) ? _position[2] : undefined
		);
}

DSC.Math.Matrix4.RotPosRaw = function(
	_result, 
	in_rotI, in_rotJ, in_rotK, in_rotW, 
	_positionX, _positionY, _positionZ
	)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;
	todo
	return _result;
}

DSC.Math.Matrix4.AxisAngle = function(_result, in_axis, in_angleRad, _position)
{
	return DSC.Math.Matrix4.AxisAngleRaw(
		_result, 
		in_axis[0], in_axis[1], in_axis[2], 
		in_angleRad, 
		(undefined != _position) ? _position[0] : undefined,
		(undefined != _position) ? _position[1] : undefined,
		(undefined != _position) ? _position[2] : undefined
		);
}

DSC.Math.Matrix4.AxisAngleRaw = function(_result, in_axisX, in_axisY, in_axisZ, in_angleRad, _positionX, _positionY, _positionZ)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;

	var axis = DSC.Math.Vector3.NormalRaw(undefined, in_axisX, in_axisY, in_axisZ);

	var c = Math.cos(in_angleRad);
	var s = Math.sin(in_angleRad);
	var t = 1.0 - c;

	var tmp1_01 = axis[0] * axis[1] * t;
	var tmp2_01 = axis[2] * s;

	var tmp1_02 = axis[0] * axis[2] * t;
	var tmp2_02 = axis[1] * s;

	var tmp1_21 = axis[1] * axis[2] * t;
	var tmp2_21 = axis[0] * s;

	DSC.Math.Matrix4.SetRaw(
		_result,

		c + axis[0] * axis[0] * t,	
		tmp1_01 + tmp2_01,				
		tmp1_02 - tmp2_02,				
		0.0,

		tmp1_01 - tmp2_01,			
		c + axis[1] * axis[1] * t,
		tmp1_21 + tmp2_21,			
		0.0,

		tmp1_02 + tmp2_02,			
		tmp1_21 - tmp2_21,			
		c + axis[2] * axis[2] * t,
		0.0,

		(undefined == _positionX) ? 0.0 : _positionX,
		(undefined == _positionY) ? 0.0 : _positionY,
		(undefined == _positionZ) ? 0.0 : _positionZ,
		1.0
		);

	return _result;
}

DSC.Math.Matrix4.PerspectiveFrustumRaw = function(_result, in_near, in_far, in_right, in_top)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;
	
	DSC.Math.Matrix4.SetRaw(
		_result,
		(in_near / in_right),	0.0,			0.0,		0.0,
		0.0,				(in_near / in_top),	0.0,		0.0,
		0.0,				0.0,				-((in_far + in_near) / (in_far - in_near)), -1.0,
		0.0,				0.0, -((2.0 * in_far * in_near) / (in_far - in_near)),		0.0
		);

	return _result;
}

DSC.Math.Matrix4.OrthographicFrustumRaw = function(_result, in_near, in_far, in_right, in_top)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;

	DSC.Math.Matrix4.SetRaw(
		_result,
		(1.0 / in_right),	0.0,			0.0,						0.0,
		0.0,				1.0 / in_top,	0.0,						0.0,
		0.0,				0.0,			-(2.0 / (in_far - in_near)), 0.0,	
		0.0,				0.0,-((in_far + in_near) / (in_far - in_near)), 1.0
		);
	return _result;
}

DSC.Math.Matrix4.Multiply = function(_result, in_lhs, in_rhs)
{
	_result = (undefined == _result) ? DSC.Math.Matrix4.FactoryRaw() : _result;
	DSC.Math.Matrix4.SetRaw(
		_result,
		(in_lhs[0] * in_rhs[0]) + (in_lhs[4] * in_rhs[1]) + (in_lhs[8] * in_rhs[2]) + (in_lhs[12] * in_rhs[3]),
		(in_lhs[1] * in_rhs[0]) + (in_lhs[5] * in_rhs[1]) + (in_lhs[9] * in_rhs[2]) + (in_lhs[13] * in_rhs[3]),
		(in_lhs[2] * in_rhs[0]) + (in_lhs[6] * in_rhs[1]) + (in_lhs[10] * in_rhs[2]) + (in_lhs[14] * in_rhs[3]),
		(in_lhs[3] * in_rhs[0]) + (in_lhs[7] * in_rhs[1]) + (in_lhs[11] * in_rhs[2]) + (in_lhs[15] * in_rhs[3]),

		(in_lhs[0] * in_rhs[4]) + (in_lhs[4] * in_rhs[5]) + (in_lhs[8] * in_rhs[6]) + (in_lhs[12] * in_rhs[7]),
		(in_lhs[1] * in_rhs[4]) + (in_lhs[5] * in_rhs[5]) + (in_lhs[9] * in_rhs[6]) + (in_lhs[13] * in_rhs[7]),
		(in_lhs[2] * in_rhs[4]) + (in_lhs[6] * in_rhs[5]) + (in_lhs[10] * in_rhs[6]) + (in_lhs[14] * in_rhs[7]),
		(in_lhs[3] * in_rhs[4]) + (in_lhs[7] * in_rhs[5]) + (in_lhs[11] * in_rhs[6]) + (in_lhs[15] * in_rhs[7]),

		(in_lhs[0] * in_rhs[8]) + (in_lhs[4] * in_rhs[9]) + (in_lhs[8] * in_rhs[10]) + (in_lhs[12] * in_rhs[11]),
		(in_lhs[1] * in_rhs[8]) + (in_lhs[5] * in_rhs[9]) + (in_lhs[9] * in_rhs[10]) + (in_lhs[13] * in_rhs[11]),
		(in_lhs[2] * in_rhs[8]) + (in_lhs[6] * in_rhs[9]) + (in_lhs[10] * in_rhs[10]) + (in_lhs[14] * in_rhs[11]),
		(in_lhs[3] * in_rhs[8]) + (in_lhs[7] * in_rhs[9]) + (in_lhs[11] * in_rhs[10]) + (in_lhs[15] * in_rhs[11]),

		(in_lhs[0] * in_rhs[12]) + (in_lhs[4] * in_rhs[13]) + (in_lhs[8] * in_rhs[14]) + (in_lhs[12] * in_rhs[15]),
		(in_lhs[1] * in_rhs[12]) + (in_lhs[5] * in_rhs[13]) + (in_lhs[9] * in_rhs[14]) + (in_lhs[13] * in_rhs[15]),
		(in_lhs[2] * in_rhs[12]) + (in_lhs[6] * in_rhs[13]) + (in_lhs[10] * in_rhs[14]) + (in_lhs[14] * in_rhs[15]),
		(in_lhs[3] * in_rhs[12]) + (in_lhs[7] * in_rhs[13]) + (in_lhs[11] * in_rhs[14]) + (in_lhs[15] * in_rhs[15])
		);
	return _result;
}

DSC.Math.Matrix4.MultiplyVector4 = function(_result, in_matrix, _x, _y, _z, _w)
{
	_result = (undefined == _result) ? DSC.Math.Vector4.FactoryRaw() : _result;

	var x = _x || 0.0;
	var y = _y || 0.0;
	var z = _z || 0.0;
	var w = _w || 0.0;
	DSC.Math.Vector4.SetRaw(
		_result,
		(x * in_matrix[0]) + (y * in_matrix[4]) + (z * in_matrix[8]) + (w * in_matrix[12]),
		(x * in_matrix[1]) + (y * in_matrix[5]) + (z * in_matrix[9]) + (w * in_matrix[13]),
		(x * in_matrix[2]) + (y * in_matrix[6]) + (z * in_matrix[10]) + (w * in_matrix[14]),
		(x * in_matrix[3]) + (y * in_matrix[7]) + (z * in_matrix[11]) + (w * in_matrix[15])
		);
	
	return _result;
}

DSC.Math.Matrix4.MultiplyPointPerspectiveDivide = function(_result, in_matrix, _x, _y, _z)
{
	_result = (undefined == _result) ? DSC.Math.Vector4.FactoryRaw() : _result;

	DSC.Math.Matrix4.MultiplyVector4(_result, in_matrix, _x, _y, _z, 1.0);
	var w = _result[3];
	if ((undefined != w) && (0.0 != w))
	{
		_result[0] /= w;
		_result[1] /= w;
		_result[2] /= w;
	}
	
	return _result;
}

DSC.Math.Matrix4.FactoryRaw = function(
	_0_0,
	_0_1,
	_0_2,
	_0_3,
	_1_0,
	_1_1,
	_1_2,
	_1_3,
	_2_0,
	_2_1,
	_2_2,
	_2_3,
	_3_0,
	_3_1,
	_3_2,
	_3_3
	)
{
	return new DSC.Common.t_floatArray([
		(undefined == _0_0) ? 0.0 : _0_0,
		(undefined == _0_1) ? 0.0 : _0_1,
		(undefined == _0_2) ? 0.0 : _0_2,
		(undefined == _0_3) ? 0.0 : _0_3,
		(undefined == _1_0) ? 0.0 : _1_0,
		(undefined == _1_1) ? 0.0 : _1_1,
		(undefined == _1_2) ? 0.0 : _1_2,
		(undefined == _1_3) ? 0.0 : _1_3,
		(undefined == _2_0) ? 0.0 : _2_0,
		(undefined == _2_1) ? 0.0 : _2_1,
		(undefined == _2_2) ? 0.0 : _2_2,
		(undefined == _2_3) ? 0.0 : _2_3,
		(undefined == _3_0) ? 0.0 : _3_0,
		(undefined == _3_1) ? 0.0 : _3_1,
		(undefined == _3_2) ? 0.0 : _3_2,
		(undefined == _3_3) ? 0.0 : _3_3,
		]);
}

DSC.Math.Matrix4.s_zero = DSC.Math.Matrix4.FactoryRaw();
DSC.Math.Matrix4.s_identity = DSC.Math.Matrix4.FactoryRaw(
	1.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
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

		//InitVar
		if (true == result)
		{
			result &= (0.0 == DSC.Math.Matrix4.s_zero[0]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[1]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[2]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[3]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[4]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[5]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[6]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[7]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[8]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[9]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[10]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[11]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[12]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[13]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[14]);
			result &= (0.0 == DSC.Math.Matrix4.s_zero[15]);

			if (!result)
				return "Fail: Math.Matrix4 InitVar";
		}


		//Matrix4.FactoryAtUp = function(
		if (true == result)
		{
			var m1 = DSC.Math.Matrix4.AtUpRaw(undefined, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,  0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
			result &= true == DSC.Math.Matrix4.AlmostEqual(DSC.Math.Matrix4.s_identity, m1);
			result &= false == DSC.Math.Matrix4.AlmostEqual(DSC.Math.Matrix4.s_identity, DSC.Math.Matrix4.s_zero);

			var m2 = DSC.Math.Matrix4.AtUpRaw(undefined, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);
			var m2b = DSC.Math.Matrix4.AxisAngleRaw(undefined, 0.0, 0.0, 1.0, DSC.Math.Angle.DegToRad(90.0));
			result &= true == DSC.Math.Matrix4.AlmostEqual(m2, m2b);

			if (!result)
				return "Fail: Math.Matrix4 FactoryAtUp";
		}
		
		//Matrix4.FactoryInverse = function(in_matrix)
		if (true == result)
		{
			var inverse1 = DSC.Math.Matrix4.Inverse(undefined, DSC.Math.Matrix4.s_identity);
			result &= true == DSC.Math.Matrix4.AlmostEqual(DSC.Math.Matrix4.s_identity, inverse1);

			var m2 = DSC.Math.Matrix4.AtUpRaw(undefined, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 3.0);
			var inverse2 = DSC.Math.Matrix4.Inverse(inverse2, m2);

			var r2 = DSC.Math.Matrix4.Multiply(r2, m2, inverse2);
			result &= true == DSC.Math.Matrix4.AlmostEqual(DSC.Math.Matrix4.s_identity, r2);
		
			if (!result)
				return "Fail: Math.Matrix4 FactoryInverse";
		}
		
		//DSC.Math.Matrix4.MultiplyVector4 = function(in_matrix, _x, _y, _z, _w)
		{
			var m1 = DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity);
			DSC.Math.Matrix4.SetPositionRaw(m1, 2.0, 3.0, 4.0);
			var offset = DSC.Math.Matrix4.GetPosition(undefined, m1);
			var p1 = DSC.Math.Matrix4.MultiplyVector4(p1, m1, 0.0, 0.0, 0.0, 1.0);
			var p2 = DSC.Math.Matrix4.MultiplyVector4(p2, m1, 0.0, 0.0, 0.0, 0.0);

			result &= true == DSC.Math.Vector3.AlmostEqual(p1, offset);
			result &= true == DSC.Math.Vector3.AlmostEqual(p2, DSC.Math.Vector3.s_zero);

			if (!result)
				return "Fail: Math.Matrix4 MultiplyPoint";
		}

		//Matrix4.OrthographicFrustumRaw(inout_result, in_near, in_far, in_right, in_top)
		if (true == result)
		{
			var orthographicFrustum = DSC.Math.Matrix4.OrthographicFrustumRaw(undefined, 1.0, 2.0, 1.0, 1.0);

			var point1 = DSC.Math.Matrix4.MultiplyVector4(undefined, orthographicFrustum, 1.0, 1.0, -1.0, 1.0)
			var point2 = DSC.Math.Matrix4.MultiplyVector4(undefined, orthographicFrustum, -1.0, -1.0, -2.0, 1.0)
			var point3 = DSC.Math.Matrix4.MultiplyVector4(undefined, orthographicFrustum, 0.0, 0.0, -1.5, 1.0)
			
			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point1[0], point1[1], point1[2], 1.0, 1.0, -1.0);
			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point2[0], point2[1], point2[2], -1.0, -1.0, 1.0);
			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point3[0], point3[1], point3[2], 0.0, 0.0, 0.0);
			
			if (!result)
				return "Fail: Math.Matrix4 OrthographicFrustumRaw";
		}

		//Matrix4.MultiplyPointPerspectiveDivide(in_point, in_matrix)
		//Matrix4.FactoryPerspectiveFrustum = function(in_near, in_far, in_right, in_top)
		if (true == result)
		{
			var perspectiveFrustum = DSC.Math.Matrix4.PerspectiveFrustumRaw(undefined, 0.1, 1.1, 0.1, 0.1);

			var point1 = DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(undefined, perspectiveFrustum, 0.1, -0.1, -0.1)
			var point2 = DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(undefined, perspectiveFrustum, -1.1, 1.1, -1.1)
			var point3 = DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(undefined, perspectiveFrustum, 0.0, 0.0, -0.1)

			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point1[0], point1[1], point1[2], 1.0, -1.0, -1.0);
			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point2[0], point2[1], point2[2], -1.0, 1.0, 1.0);
			result &= true == DSC.Math.Vector3.AlmostEqualRaw(point3[0], point3[1], point3[2], 0.0, 0.0, -1.0);

			if (!result)
				return "Fail: Math.Matrix4 FactoryPerspectiveFrustum";
		}

		//sanity A0.D = A1 -> D = A0i.A1
		if (true == result)
		{
			var A0 = DSC.Math.Matrix4.AtUpRaw(undefined, 0.0, 1.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,  0.0, 0.0, 1.0,  1.0, 2.0, 3.0);
			var A1 = DSC.Math.Matrix4.AtUpRaw(undefined, 0.0, 0.0, 1.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  0.0, 0.0, 1.0,  4.0, 5.0, 6.0);
			var A0i = DSC.Math.Matrix4.Inverse(undefined, A0);

			var D = DSC.Math.Matrix4.Multiply(undefined, A0i, A1);
			var A2 = DSC.Math.Matrix4.Multiply(undefined, A0, D);

			result &= true == DSC.Math.Matrix4.AlmostEqual(A1, A2);
		
			if (!result)
				return "Fail: Math.Matrix4 Sanity A0.D = A1";
		}
		
		//DSC.Math.Matrix4.MultiplyVector4 = function(in_matrix, _x, _y, _z, _w)
		{
			var m1 = DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity);
			DSC.Math.Matrix4.SetPositionRaw(m1, 2.0, 3.0, 4.0);
			var offset = DSC.Math.Matrix4.GetPosition(undefined, m1);
			var p1 = DSC.Math.Matrix4.MultiplyVector4(p1, m1, 0.0, 0.0, 0.0, 1.0);
			var p2 = DSC.Math.Matrix4.MultiplyVector4(p2, m1, 0.0, 0.0, 0.0, 0.0);

			result &= true == DSC.Math.Vector3.AlmostEqual(p1, offset);
			result &= true == DSC.Math.Vector3.AlmostEqual(p2, DSC.Math.Vector3.s_zero);

			if (!result)
				return "Fail: Math.Matrix4 MultiplyPoint";
		}


		if (true != result)
			return "Fail: Math.Matrix4";
		return "Pass: Math.Matrix4";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}

