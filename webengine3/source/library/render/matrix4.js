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



/**
 * @const
 * @unrestricted
 */
c.Matrix4 = {}
c["Matrix4"] = c.Matrix4;

/** @typedef {Float32Array} */
Float32Array = Float32Array;


/**
 * @param {!number=} _0_0
 * @param {!number=} _0_1
 * @param {!number=} _0_2
 * @param {!number=} _0_3
 * @param {!number=} _1_0
 * @param {!number=} _1_1
 * @param {!number=} _1_2
 * @param {!number=} _1_3
 * @param {!number=} _2_0
 * @param {!number=} _2_1
 * @param {!number=} _2_2
 * @param {!number=} _2_3
 * @param {!number=} _3_0
 * @param {!number=} _3_1
 * @param {!number=} _3_2
 * @param {!number=} _3_3
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.Factory = function(
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
	_3_3,
	_result
	) {
	_0_0 = (undefined === _0_0) ? 0.0 : _0_0;
	_0_1 = (undefined === _0_1) ? 0.0 : _0_1;
	_0_2 = (undefined === _0_2) ? 0.0 : _0_2;
	_0_3 = (undefined === _0_3) ? 0.0 : _0_3;
	_1_0 = (undefined === _1_0) ? 0.0 : _1_0;
	_1_1 = (undefined === _1_1) ? 0.0 : _1_1;
	_1_2 = (undefined === _1_2) ? 0.0 : _1_2;
	_1_3 = (undefined === _1_3) ? 0.0 : _1_3;
	_2_0 = (undefined === _2_0) ? 0.0 : _2_0;
	_2_1 = (undefined === _2_1) ? 0.0 : _2_1;
	_2_2 = (undefined === _2_2) ? 0.0 : _2_2;
	_2_3 = (undefined === _2_3) ? 0.0 : _2_3;
	_3_0 = (undefined === _3_0) ? 0.0 : _3_0;
	_3_1 = (undefined === _3_1) ? 0.0 : _3_1;
	_3_2 = (undefined === _3_2) ? 0.0 : _3_2;
	_3_3 = (undefined === _3_3) ? 0.0 : _3_3;

	if (undefined === _result) {
		_result = new Float32Array([
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
			]);
	} else {
		c.Matrix4.Set(
			_result, 
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
			);
	}
	return _result;
}
c.Matrix4["Factory"] = c.Matrix4.Factory;

/**
 * @param {!Float32Array} inout_result
 * @param {!number} in_0_0
 * @param {!number} in_0_1
 * @param {!number} in_0_2
 * @param {!number} in_0_3
 * @param {!number} in_1_0
 * @param {!number} in_1_1
 * @param {!number} in_1_2
 * @param {!number} in_1_3
 * @param {!number} in_2_0
 * @param {!number} in_2_1
 * @param {!number} in_2_2
 * @param {!number} in_2_3
 * @param {!number} in_3_0
 * @param {!number} in_3_1
 * @param {!number} in_3_2
 * @param {!number} in_3_3
 * @return {undefined}
 */
c.Matrix4.Set = function(
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
	) {
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
c.Matrix4["Set"] = c.Matrix4.Set;


/**
 * @param {!Float32Array} in_source
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.Clone = function(in_source, _result) {
	return c.Matrix4.Factory(
		in_source[0], in_source[1], in_source[2], in_source[3],
		in_source[4], in_source[5], in_source[6], in_source[7],
		in_source[8], in_source[9], in_source[10], in_source[11],
		in_source[12], in_source[13], in_source[14], in_source[15],
		_result
		);
}
c.Matrix4["Clone"] = c.Matrix4.Clone;


/**
 * @param {!Float32Array} in_matrix
 * @return {!string}
 */
c.Matrix4.AsString = function(in_matrix) {
	var result = "[ " + in_matrix[0] + ", " + in_matrix[1] + ", " + in_matrix[2] + ", " + in_matrix[3] + ",\n";
	result += "\t" + in_matrix[4] + ", " + in_matrix[5] + ", " + in_matrix[6] + ", " + in_matrix[7] + ",\n";
	result += "\t" + in_matrix[8] + ", " + in_matrix[9] + ", " + in_matrix[10] + ", " + in_matrix[11] + ",\n";
	result += "\t" + in_matrix[12] + ", " + in_matrix[13] + ", " + in_matrix[14] + ", " + in_matrix[15] + " ]";
	return result;
}
c.Matrix4["AsString"] = c.Matrix4.AsString;

/*
	TODO:
GetUp, Right [Set]
GetQuaternion [Set]
GetScale [Set]
Normalise
Orthogonalise

*/


/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.GetRotMatrix = function(in_matrix, _result) {
	_result = (undefined == _result) ? c.Matrix3.Factory() : _result;
	c.Matrix3.Set(_result, 
		in_matrix[0], in_matrix[1], in_matrix[2],
		in_matrix[4], in_matrix[5], in_matrix[6],
		in_matrix[8], in_matrix[9], in_matrix[10]
		);
	return _result;
}
c.Matrix4["GetRotMatrix"] = c.Matrix4.GetRotMatrix;


/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_rotMatrix
 */
c.Matrix4.SetRotMatrix = function(in_matrix, in_rotMatrix) {
	in_matrix[0] = in_rotMatrix[0];
	in_matrix[1] = in_rotMatrix[1];
	in_matrix[2] = in_rotMatrix[2];

	in_matrix[4] = in_rotMatrix[3];
	in_matrix[5] = in_rotMatrix[4];
	in_matrix[6] = in_rotMatrix[5];

	in_matrix[8] = in_rotMatrix[6];
	in_matrix[9] = in_rotMatrix[7];
	in_matrix[10] = in_rotMatrix[8];

	return;
}
c.Matrix4["SetRotMatrix"] = c.Matrix4.SetRotMatrix;




/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.GetPosition = function(in_matrix, _result) {
	_result = (undefined == _result) ? c.Vector3.Factory() : _result;
	c.Vector3.Set(_result, in_matrix[12], in_matrix[13], in_matrix[14]);
	return _result;
}
c.Matrix4["GetPosition"] = c.Matrix4.GetPosition;


/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_pos
 */
c.Matrix4.SetPosition = function(in_matrix, in_pos) {
	in_matrix[12] = c.Vector3.GetX(in_pos);
	in_matrix[13] = c.Vector3.GetY(in_pos);
	in_matrix[14] = c.Vector3.GetZ(in_pos);
	return;
}
c.Matrix4["SetPosition"] = c.Matrix4.SetPosition;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.Inverse = function(in_matrix, _result) {
	_result = (undefined === _result) ? c.Matrix4.Factory() : _result;

	c.Matrix4.Set(
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
c.Matrix4["Inverse"] = c.Matrix4.Inverse;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Matrix4.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	return (
		(c.Math.AlmostEqual(in_lhs[0], in_rhs[0], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[1], in_rhs[1], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[2], in_rhs[2], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[3], in_rhs[3], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[4], in_rhs[4], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[5], in_rhs[5], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[6], in_rhs[6], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[7], in_rhs[7], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[8], in_rhs[8], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[9], in_rhs[9], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[10], in_rhs[10], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[11], in_rhs[11], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[12], in_rhs[12], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[13], in_rhs[13], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[14], in_rhs[14], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[15], in_rhs[15], _epsilon))
		);
}
c.Matrix4["AlmostEqual"] = c.Matrix4.AlmostEqual;


/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.Transpose = function(in_matrix, _result) {
	_result = (undefined === _result) ? c.Matrix4.Factory() : _result;
	c.Matrix4.Set(
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
c.Matrix4["Transpose"] = c.Matrix4.Transpose;

/**
 * @param {!Float32Array=} _position
 * @param {!Float32Array=} _rotMatrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.FactoryPosRot = function(_position, _rotMatrix, _result) {
	_result = c.Matrix4.Clone(c.Matrix4.s_identity, _result);
	if (undefined !== _position){
		c.Matrix4.SetPosition(_result, _position);
	}
	if (undefined !== _rotMatrix){
		c.Matrix4.SetRotMatrix(_result, _rotMatrix);
	}
	return _result;
}
c.Matrix4["FactoryPosRot"] = c.Matrix4.FactoryPosRot;

/**
 * @param {!number} in_near
 * @param {!number} in_far
 * @param {!number} in_left
 * @param {!number} in_top
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.FactoryPerspectiveFrustum = function(in_near, in_far, in_left, in_top, _result) {
	_result = (undefined == _result) ? c.Matrix4.Factory() : _result;
	
	c.Matrix4.Set(
		_result,
		(in_near / in_left),	0.0,				0.0,												0.0,
		0.0,					(in_near / in_top),	0.0,												0.0,
		0.0,					0.0,				((in_far + in_near) / (in_near - in_far)),			-1.0,
		0.0,					0.0,				((2.0 * in_far * in_near) / (in_near - in_far)),	0.0
		);

	return _result;
}
c.Matrix4["FactoryPerspectiveFrustum"] = c.Matrix4.FactoryPerspectiveFrustum;

/**
 * @param {!number} in_near
 * @param {!number} in_far
 * @param {!number} in_fovRad
 * @param {!number} in_aspect
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.FactoryPerspectiveFrustum2 = function(in_near, in_far, in_fovRad, in_aspect, _result) {
	_result = (undefined == _result) ? c.Matrix4.Factory() : _result;
	var f = 1.0 / Math.tan(in_fovRad * 0.5);
	c.Matrix4.Set(
		_result,
		(f / in_aspect),	0.0,				0.0,												0.0,
		0.0,				f,					0.0,												0.0,
		0.0,				0.0,				((in_far + in_near) / (in_near - in_far)),			-1.0,
		0.0,				0.0,				((2.0 * in_far * in_near) / (in_near - in_far)),	0.0
		);

	return _result;
}
c.Matrix4["FactoryPerspectiveFrustum2"] = c.Matrix4.FactoryPerspectiveFrustum2;


/**
 * @param {!number} in_near
 * @param {!number} in_far
 * @param {!number} in_right
 * @param {!number} in_top
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.FactoryOrthographicFrustum = function(in_near, in_far, in_right, in_top, _result) {
	_result = (undefined === _result) ? c.Matrix4.Factory() : _result;

	c.Matrix4.Set(
		_result,
		(1.0 / in_right),	0.0,			0.0,						0.0,
		0.0,				1.0 / in_top,	0.0,						0.0,
		0.0,				0.0,			-(2.0 / (in_far - in_near)), 0.0,	
		0.0,				0.0,-((in_far + in_near) / (in_far - in_near)), 1.0
		);
	return _result;
}
c.Matrix4["FactoryOrthographicFrustum"] = c.Matrix4.FactoryOrthographicFrustum;


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.Multiply = function(in_lhs, in_rhs, _result){
	_result = (undefined === _result) ? c.Matrix4.Factory() : _result;
	c.Matrix4.Set(
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
c.Matrix4["Multiply"] = c.Matrix4.Multiply;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_vector
 * @param {!number=} _w
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.MultiplyVector3 = function(in_matrix, in_vector, _w, _result) {
	_result = (undefined === _result) ? c.Vector4.Factory() : _result;

	var x = c.Vector3.GetX(in_vector);
	var y = c.Vector3.GetY(in_vector);
	var z = c.Vector3.GetZ(in_vector);
	var w = (undefined === _w) ? 0.0 : _w;
	c.Vector4.Set(
		_result,
		(x * in_matrix[0]) + (y * in_matrix[4]) + (z * in_matrix[8]) + (w * in_matrix[12]),
		(x * in_matrix[1]) + (y * in_matrix[5]) + (z * in_matrix[9]) + (w * in_matrix[13]),
		(x * in_matrix[2]) + (y * in_matrix[6]) + (z * in_matrix[10]) + (w * in_matrix[14]),
		(x * in_matrix[3]) + (y * in_matrix[7]) + (z * in_matrix[11]) + (w * in_matrix[15])
		);
	
	return _result;
}
c.Matrix4["MultiplyVector3"] = c.Matrix4.MultiplyVector3;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_vector
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.MultiplyVector4 = function(in_matrix, in_vector, _result) {
	return c.Matrix4.MultiplyVector3(
		in_matrix, 
		in_vector, 
		c.Vector4.GetW(in_vector), 
		_result
		);
}
c.Matrix4["MultiplyVector4"] = c.Matrix4.MultiplyVector4;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_vector
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix4.MultiplyPointPerspectiveDivide = function(in_matrix, in_vector, _result) {
	_result = (undefined === _result) ? c.Vector4.Factory() : _result;

	c.Matrix4.MultiplyVector3(in_matrix, in_vector, 1.0, _result);
	var w = _result[3];
	if ((undefined != w) && (0.0 != w))
	{
		_result[0] /= w;
		_result[1] /= w;
		_result[2] /= w;
	}
	
	return _result;
}
c.Matrix4["MultiplyPointPerspectiveDivide"] = c.Matrix4.MultiplyPointPerspectiveDivide;

/**
 * @const
 */
c.Matrix4.s_zero = c.Matrix4.Factory();
c.Matrix4["s_zero"] = c.Matrix4.s_zero;

/**
 * @const
 */
c.Matrix4.s_identity = c.Matrix4.Factory(
	1.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
	);
c.Matrix4["s_identity"] = c.Matrix4.s_identity;
