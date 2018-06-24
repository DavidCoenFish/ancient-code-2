/*
matching openGL documentation
		0_0, 0_1, 0_2(x),
		1_0, 1_1, 1_2(y),
		2_0, 2_1, 2_2
*/

/**
 * @const
 * @unrestricted
 */
c.Matrix3 = {};
c["Matrix3"] = c.Matrix3;


/**
 * @param {!number=} _0_0
 * @param {!number=} _0_1
 * @param {!number=} _0_2
 * @param {!number=} _1_0
 * @param {!number=} _1_1
 * @param {!number=} _1_2
 * @param {!number=} _2_0
 * @param {!number=} _2_1
 * @param {!number=} _2_2
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.Factory = function(
	_0_0,
	_0_1,
	_0_2,
	_1_0,
	_1_1,
	_1_2,
	_2_0,
	_2_1,
	_2_2,
	_result
	) {
	_0_0 = (undefined === _0_0) ? 0.0 : _0_0;
	_0_1 = (undefined === _0_1) ? 0.0 : _0_1;
	_0_2 = (undefined === _0_2) ? 0.0 : _0_2;
	_1_0 = (undefined === _1_0) ? 0.0 : _1_0;
	_1_1 = (undefined === _1_1) ? 0.0 : _1_1;
	_1_2 = (undefined === _1_2) ? 0.0 : _1_2;
	_2_0 = (undefined === _2_0) ? 0.0 : _2_0;
	_2_1 = (undefined === _2_1) ? 0.0 : _2_1;
	_2_2 = (undefined === _2_2) ? 0.0 : _2_2;

	if (undefined === _result) {
		return new Float32Array([
			_0_0,
			_0_1,
			_0_2,
			_1_0,
			_1_1,
			_1_2,
			_2_0,
			_2_1,
			_2_2
			]);
	} else {
		c.Matrix3.Set(
			_result, 
			_0_0,
			_0_1,
			_0_2,
			_1_0,
			_1_1,
			_1_2,
			_2_0,
			_2_1,
			_2_2
			);
	}
	return _result;
}
c.Matrix3["Factory"] = c.Matrix3.Factory;

/**
 * @param {!Float32Array} inout_result
 * @param {!number} in_0_0
 * @param {!number} in_0_1
 * @param {!number} in_0_2
 * @param {!number} in_1_0
 * @param {!number} in_1_1
 * @param {!number} in_1_2
 * @param {!number} in_2_0
 * @param {!number} in_2_1
 * @param {!number} in_2_2
 * @return {undefined}
 */
c.Matrix3.Set = function(
	inout_result,
	in_0_0,
	in_0_1,
	in_0_2,
	in_1_0,
	in_1_1,
	in_1_2,
	in_2_0,
	in_2_1,
	in_2_2
	) {
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
c.Matrix3["Set"] = c.Matrix3.Set;

/**
 * @param {!Float32Array} in_source
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.Clone = function(in_source, _result) {
	return c.Matrix3.Factory(
		in_source[0], in_source[1], in_source[2], 
		in_source[3], in_source[4], in_source[5], 
		in_source[6], in_source[7], in_source[8],
		_result
		);
}
c.Matrix3["Clone"] = c.Matrix3.Clone;

/**
 * @param {!Float32Array} in_matrix
 * @return {!string}
 */
c.Matrix3.AsString = function(in_matrix) {
	var result = "Matrix4 " + in_matrix[0] + ", " + in_matrix[1] + ", " + in_matrix[2] + ",\n";
	result += "\t" + in_matrix[3] + ", " + in_matrix[4] + ", " + in_matrix[5] + ",\n";
	result += "\t" + in_matrix[6] + ", " + in_matrix[7] + ", " + in_matrix[8] + "\n";
	return result;
}
c.Matrix3["AsString"] = c.Matrix3.AsString;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.Inverse = function(in_matrix, _result) {
	var inout_result = (undefined === _result) ? c.Matrix3.Factory() : _result;

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
	if (!d) {
		return c.Matrix3.Clone(c.Matrix3.s_identity, inout_result); 
	}
	var id = 1/d;
	c.Matrix3.Set(
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


/**
 * @param {!Float32Array} in_lhs
 * @param {!Float32Array} in_rhs
 * @param {!number=} _epsilon
 * @return {!boolean}
 */
c.Matrix3.AlmostEqual = function(in_lhs, in_rhs, _epsilon) {
	return (
		(c.Math.AlmostEqual(in_lhs[0], in_rhs[0], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[1], in_rhs[1], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[2], in_rhs[2], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[3], in_rhs[3], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[4], in_rhs[4], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[5], in_rhs[5], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[6], in_rhs[6], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[7], in_rhs[7], _epsilon)) &&
		(c.Math.AlmostEqual(in_lhs[8], in_rhs[8], _epsilon))
		);
}
c.Matrix3["AlmostEqual"] = c.Matrix3.AlmostEqual;

/**
 * @param {!Float32Array} in_matrix
 * @param {!Float32Array} in_vector
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.MultiplyVector3 = function(in_matrix, in_vector, _result) {
	_result = (undefined === _result) ? c.Vector3.Factory() : _result;

	var x = c.Vector3.GetX(in_vector);
	var y = c.Vector3.GetY(in_vector);
	var z = c.Vector3.GetZ(in_vector);
	c.Vector3.Set(
		_result,
		(x * in_matrix[0]) + (y * in_matrix[3]) + (z * in_matrix[6]),
		(x * in_matrix[1]) + (y * in_matrix[4]) + (z * in_matrix[7]),
		(x * in_matrix[2]) + (y * in_matrix[5]) + (z * in_matrix[8])
		);
	
	return _result;
}
c.Matrix3["MultiplyVector3"] = c.Matrix3.MultiplyVector3;

/**
 * @param {!Float32Array} in_quaternion
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.FromQuaternion = function(in_quaternion, _result){
	inout_result = (undefined == _result) ? c.Matrix3.Factory() : _result;

	var X = c.Quaternion.GetI(in_quaternion);
	var Y = c.Quaternion.GetJ(in_quaternion);
	var Z = c.Quaternion.GetK(in_quaternion);
	var W = c.Quaternion.GetW(in_quaternion);

	var xx      = X * X;
	var xy      = X * Y;
	var xz      = X * Z;
	var xw      = X * W;
	var yy      = Y * Y;
	var yz      = Y * Z;
	var yw      = Y * W;
	var zz      = Z * Z;
	var zw      = Z * W;

	c.Matrix3.Set(
		inout_result,
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

/**
 * @param {!Float32Array} in_targetAt
 * @param {!Float32Array} in_targetUp
 * @param {!Float32Array=} _baseAt
 * @param {!Float32Array=} _baseUp
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.FromAtUp = function(
	in_targetAt, 
	in_targetUp,
	_baseAt, //UnitY
	_baseUp, //UnitZ
	_result
	){
	_result = (undefined === _result) ? c.Matrix4.Factory() : _result;

	var in_baseAt = (undefined === _baseAt) ? c.Vector3.s_unitY : _baseAt;
	var in_baseUp = (undefined === _baseUp) ? c.Vector3.s_unitZ : _baseUp;
	
	c.Matrix3.FromAtUp.sCrossBaseUpAt = c.Vector3.CrossProduct(in_baseUp, in_baseAt, c.Matrix3.FromAtUp.sCrossBaseUpAt);
	var crossBaseUpAt = c.Matrix3.FromAtUp.sCrossBaseUpAt;
	c.Matrix3.FromAtUp.sCossTargetUpAt = c.Vector3.CrossProduct(in_targetUp, in_targetAt, c.Matrix3.FromAtUp.sCossTargetUpAt);
	var crossTargetUpAt = c.Matrix3.FromAtUp.sCossTargetUpAt;

	c.Matrix3.Set(
		_result,
		(in_baseAt[0] * in_targetAt[0]) + (crossBaseUpAt[0] * crossTargetUpAt[0]) + (in_baseUp[0] * in_targetUp[0]),
		(in_baseAt[0] * in_targetAt[1]) + (crossBaseUpAt[0] * crossTargetUpAt[1]) + (in_baseUp[0] * in_targetUp[1]),
		(in_baseAt[0] * in_targetAt[2]) + (crossBaseUpAt[0] * crossTargetUpAt[2]) + (in_baseUp[0] * in_targetUp[2]),

		(in_baseAt[1] * in_targetAt[0]) + (crossBaseUpAt[1] * crossTargetUpAt[0]) + (in_baseUp[1] * in_targetUp[0]),
		(in_baseAt[1] * in_targetAt[1]) + (crossBaseUpAt[1] * crossTargetUpAt[1]) + (in_baseUp[1] * in_targetUp[1]),
		(in_baseAt[1] * in_targetAt[2]) + (crossBaseUpAt[1] * crossTargetUpAt[2]) + (in_baseUp[1] * in_targetUp[2]),

		(in_baseAt[2] * in_targetAt[0]) + (crossBaseUpAt[2] * crossTargetUpAt[0]) + (in_baseUp[2] * in_targetUp[0]),
		(in_baseAt[2] * in_targetAt[1]) + (crossBaseUpAt[2] * crossTargetUpAt[1]) + (in_baseUp[2] * in_targetUp[1]),
		(in_baseAt[2] * in_targetAt[2]) + (crossBaseUpAt[2] * crossTargetUpAt[2]) + (in_baseUp[2] * in_targetUp[2])
		);

	return _result;
}
c.Matrix3["FromAtUp"] = c.Matrix3.FromAtUp;

/**
 * @param {!Float32Array} in_axis
 * @param {!number} in_angleRad
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.FromAxisAngle = function(in_axis, in_angleRad, _result) {
	_result = (undefined === _result) ? c.Matrix3.Factory() : _result;

	c.Matrix3.FromAxisAngle.Axis = c.Vector3.Normalise(in_axis, c.Matrix3.FromAxisAngle.Axis);
	var axis = c.Matrix3.FromAxisAngle.Axis;

	var localc = Math.cos(in_angleRad);
	var s = Math.sin(in_angleRad);
	var t = 1.0 - localc;

	var tmp1_01 = axis[0] * axis[1] * t;
	var tmp2_01 = axis[2] * s;

	var tmp1_02 = axis[0] * axis[2] * t;
	var tmp2_02 = axis[1] * s;

	var tmp1_21 = axis[1] * axis[2] * t;
	var tmp2_21 = axis[0] * s;

	c.Matrix3.Set(
		_result,

		localc + axis[0] * axis[0] * t,	
		tmp1_01 + tmp2_01,				
		tmp1_02 - tmp2_02,				

		tmp1_01 - tmp2_01,			
		localc + axis[1] * axis[1] * t,
		tmp1_21 + tmp2_21,			

		tmp1_02 + tmp2_02,			
		tmp1_21 - tmp2_21,			
		localc + axis[2] * axis[2] * t
		);

	return _result;
}
c.Matrix3["FromAxisAngle"] = c.Matrix3.FromAxisAngle;


/**
http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToMatrix/
//around z (bank)
		cb, -sb, 0,
		sb, cb, 0,
		0, 0, 1
//around x (altitude)
		1, 0, 0,
		0, ca, -sa,
		0, sa, ca
//around y (heading)
		ch, 0, sh,
		0, 1, 0,
		-sh, 0, ch

 * @param {!number} in_heading
 * @param {!number} in_altitude
 * @param {!number} in_bank
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Matrix3.FromEuler = function(in_heading, in_altitude, in_bank, _result) {
	_result = (undefined === _result) ? c.Matrix3.Factory() : _result;
	var ch = Math.cos(in_heading);
	var sh = Math.sin(in_heading);
	var ca = Math.cos(in_altitude);
	var sa = Math.sin(in_altitude);
	var cb = Math.cos(in_bank);
	var sb = Math.sin(in_bank);

	c.Matrix3.Set(
		_result,

		cb*ch - sb*sa*sh,	
		-sb*ca,	
		cb*sh + sb*sa*ch,

		sb*ch + cb*sa*sh,	
		cb*ca,	
		sb*sh -cb*sa*ch,

		-ca*sh,	
		sa,	
		ca*ch

		);

	return _result;
}
c.Matrix3["FromEuler"] = c.Matrix3.FromEuler;

/**
 * @const
 */
c.Matrix3.s_zero = c.Matrix3.Factory();
c.Matrix3["s_zero"] = c.Matrix3.s_zero;

/**
 * @const
 */
c.Matrix3.s_identity = c.Matrix3.Factory(
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0
	);
c.Matrix3["s_identity"] = c.Matrix3.s_identity;
