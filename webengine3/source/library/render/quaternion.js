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

/**
 * @const
 * @unrestricted
 */
c.Quaternion = {}
c["Quaternion"] = c.Quaternion;

/** @typedef {Float32Array} */
Float32Array;

/**
 * @param {!number=} _i
 * @param {!number=} _j
 * @param {!number=} _k
 * @param {!number=} _w
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Factory = function(_i, _j, _k, _w, _result) {
	_i = (undefined === _i) ? 0.0 : _i;
	_j = (undefined === _j) ? 0.0 : _j;
	_k = (undefined === _k) ? 0.0 : _k;
	_w = (undefined === _w) ? 0.0 : _w;

	if (undefined == _result) {
		_result = new Float32Array([
			_i,
			_j,
			_k,
			_w
			]);
	} else {
		c.Quaternion.Set(
			_result, 
			_i,
			_j,
			_k,
			_w
			);
	}
	return _result;
}
c.Quaternion["Factory"] = c.Quaternion.Factory;

/**
 * @param {!Float32Array} in_source
 * @return {!number}
 */
c.Quaternion.GetI = function(in_source) {
	return in_source[0];
}

/**
 * @param {!Float32Array} in_source
 * @return {!number}
 */
c.Quaternion.GetJ = function(in_source) {
	return in_source[1];
}

/**
 * @param {!Float32Array} in_source
 * @return {!number}
 */
c.Quaternion.GetK = function(in_source) {
	return in_source[2];
}

/**
 * @param {!Float32Array} in_source
 * @return {!number}
 */
c.Quaternion.GetW = function(in_source) {
	return in_source[3];
}

/**
 * @param {!Float32Array} in_source
 * @param {!number} in_value
 * @return {undefined}
 */
c.Quaternion.SetI = function(in_source, in_value) {
	in_source[0] = in_value;
	return;
}

/**
 * @param {!Float32Array} in_source
 * @param {!number} in_value
 * @return {undefined}
 */
c.Quaternion.SetJ = function(in_source, in_value) {
	in_source[1] = in_value;
	return;
}

/**
 * @param {!Float32Array} in_source
 * @param {!number} in_value
 * @return {undefined}
 */
c.Quaternion.SetK = function(in_source, in_value) {
	in_source[2] = in_value;
	return;
}

/**
 * @param {!Float32Array} in_source
 * @param {!number} in_value
 * @return {undefined}
 */
c.Quaternion.SetW = function(in_source, in_value) {
	in_source[3] = in_value;
	return;
}

/**
 * @param {!Float32Array} in_data
 * @param {!number} in_i
 * @param {!number} in_j
 * @param {!number} in_k
 * @param {!number} in_w
 * @return {undefined}
 */
c.Quaternion.Set = function(in_data, in_i, in_j, in_k, in_w) {
	in_data[0] = in_i;
	in_data[1] = in_j;
	in_data[2] = in_k;
	in_data[3] = in_w;
	return;
}
c.Quaternion["Set"] = c.Quaternion.Set;

/**
 * @param {!Float32Array} in_lhs 
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Addition = function(in_lhs, in_rhs, _result) {
	_result = (undefined == _result) ? c.Quaternion.Factory() : _result;
	c.Quaternion.Set(
		_result,
		(in_lhs[0] + in_rhs[0]),	
		(in_lhs[1] + in_rhs[1]),	
		(in_lhs[2] + in_rhs[2]),	
		(in_lhs[3] + in_rhs[3])
		);
	return _result;
}

/**
 * @param {!Float32Array} in_lhs 
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Subtraction = function(in_lhs, in_rhs, _result) {
	_result = (undefined == _result) ? c.Quaternion.Factory() : _result;
	c.Quaternion.Set(
		_result,
		(in_lhs[0] - in_rhs[0]),	
		(in_lhs[1] - in_rhs[1]),	
		(in_lhs[2] - in_rhs[2]),	
		(in_lhs[3] - in_rhs[3])
		);
	return _result;
}

/**
 * @param {!Float32Array} in_lhs 
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Multiplication = function(in_lhs, in_rhs, _result) {
	_result = (undefined == _result) ? c.Quaternion.Factory() : _result;
	c.Quaternion.Set(
		_result,
		(in_lhs[3] * in_rhs[0]) + (in_lhs[0] * in_rhs[3]) + (in_lhs[1] * in_rhs[2]) - (in_lhs[2] * in_rhs[1]),	
		(in_lhs[3] * in_rhs[1]) - (in_lhs[0] * in_rhs[2]) + (in_lhs[1] * in_rhs[3]) - (in_lhs[2] * in_rhs[0]),	
		(in_lhs[3] * in_rhs[2]) + (in_lhs[0] * in_rhs[1]) - (in_lhs[1] * in_rhs[0]) + (in_lhs[2] * in_rhs[3]),	
		(in_lhs[3] * in_rhs[3]) - (in_lhs[0] * in_rhs[0]) - (in_lhs[1] * in_rhs[1]) - (in_lhs[2] * in_rhs[2])
		);
	return _result;
}


/**
 * @param {!Float32Array} in_src
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Normalise = function(in_src, _result) {
	_result = (undefined == _result) ? c.Quaternion.Factory() : _result;
	var lengthSquared = c.Vector4.LengthSquared(in_src);
	var mul = 1.0;
	if ((0.0 !== lengthSquared) && (1.0 !== lengthSquared)) {
		var length = Math.sqrt(lengthSquared);
		mul = 1.0 / length;
	}
	c.Quaternion.Set(
		_result,
		(in_src[0] * mul),	
		(in_src[1] * mul),	
		(in_src[2] * mul),	
		(in_src[3] * mul)
		);
	return _result;
}


/**
 * @param {!Float32Array} in_lhs 
 * @param {!Float32Array} in_rhs
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.Slerp = function(in_lhs, in_rhs, in_ratio, _result) {
	_result = (undefined == _result) ? c.Quaternion.Factory() : _result;

	var rhs = in_rhs;
	var DotResult = c.Vector4.DotProduct(in_lhs, in_rhs);
	if (DotResult < 0) {
		c.Quaternion.Slerp.sTemp = c.Quaternion.Factory(-in_rhs[0], -in_rhs[1], -in_rhs[2], -in_rhs[3], c.Quaternion.Slerp.sTemp);
		rhs = c.Quaternion.Slerp.sTemp;
	}

	var theta = Math.acos(c.Vector4.DotProduct(in_lhs, rhs));
	if (0.000001 < theta) {
		var temp = Math.sin(theta);
		var mult1 = Math.sin((1.0 - in_ratio) * theta) / temp;
		var mult2 = Math.sin(in_ratio * theta) / temp;
	} else {
		var mult1 = 1.0 - in_ratio;
		var mult2 = in_ratio;
	}

	c.Quaternion.Set(
		_result,
		(mult1 * in_lhs[0]) + (mult2 * rhs[0]),
		(mult1 * in_lhs[1]) + (mult2 * rhs[1]),
		(mult1 * in_lhs[2]) + (mult2 * rhs[2]),
		(mult1 * in_lhs[3]) + (mult2 * rhs[3])
		);
	return _result;
}

/**
 * @param {!Float32Array} in_matrix3
 * @param {!Float32Array=} _result
 * @return {!Float32Array}
 */
c.Quaternion.FromMatrix3 = function(in_matrix3, _result) {
	_result = (undefined === _result) ? c.Quaternion.Factory() : _result;

	var a00 = in_matrix3[0];
	var a01 = in_matrix3[1]; 
	var a02 = in_matrix3[2]; 
	var a10 = in_matrix3[3];
	var a11 = in_matrix3[4]; 
	var a12 = in_matrix3[5]; 
	var a20 = in_matrix3[6];
	var a21 = in_matrix3[7]; 
	var a22 = in_matrix3[8]; 

	var tr = a00 + a11 + a22;

	if (tr > 0)  { 
		var S = Math.sqrt(tr+1.0) * 2; // S=4*qw 
		c.Quaternion.Set(
			_result,
			0.25 * S,
			(a21 - a12) / S,
			(a22 - a20) / S, 
			(a10 - a01) / S
			);
	}  else if ((a00 > a11)&(a00 > a22)) { 
		var S = Math.sqrt(1.0 + a00 - a11 - a22) * 2; // S=4*qx 
		c.Quaternion.Set(
			_result,
			qw = (a21 - a12) / S,
			qx = 0.25 * S,
			qy = (a01 + a10) / S, 
			qz = (a02 + a20) / S
			);
	} else if (a11 > a22) { 
		var S = Math.sqrt(1.0 + a11 - a00 - a22) * 2; // S=4*qy
		c.Quaternion.Set(
			_result,
			qw = (a02 - a20) / S,
			qx = (a01 + a10) / S,
			qy = 0.25 * S,
			qz = (a12 + a21) / S
			);
	} else { 
		var S = Math.sqrt(1.0 + a22 - a00 - a11) * 2; // S=4*qz
		c.Quaternion.Set(
			_result,
			qw = (a10 - a01) / S,
			qx = (a02 + a20) / S,
			qy = (a12 + a21) / S,
			qz = 0.25 * S
			);
	}

	return _result;
}
