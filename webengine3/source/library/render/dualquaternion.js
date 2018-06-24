/**
 * @const
 * @unrestricted
 */
c.DualQuaternion = {}
c["DualQuaternion"] = c.DualQuaternion;

/** @typedef {Float32Array} */
Float32Array;

/**
 * @param {!number=} _i0
 * @param {!number=} _j0
 * @param {!number=} _k0
 * @param {!number=} _w0
 * @param {!number=} _i1
 * @param {!number=} _j1
 * @param {!number=} _k1
 * @param {!number=} _w1
 * @param {!Float32Array=} _result
 * @return {Float32Array}
 */
c.DualQuaternion.Factory = function(_i0, _j0, _k0, _w0, _i1, _j1, _k1, _w1, _result)
{
	_i0 = (undefined == _i0) ? 0.0 : _i0;
	_j0 = (undefined == _j0) ? 0.0 : _j0;
	_k0 = (undefined == _k0) ? 0.0 : _k0;
	_w0 = (undefined == _w0) ? 0.0 : _w0;
	_i1 = (undefined == _i1) ? 0.0 : _i1;
	_j1 = (undefined == _j1) ? 0.0 : _j1;
	_k1 = (undefined == _k1) ? 0.0 : _k1;
	_w1 = (undefined == _w1) ? 0.0 : _w1;

	if (undefined == _result)
	{
		_result = new Float32Array([
			_i0,
			_j0,
			_k0,
			_w0,
			_i1,
			_j1,
			_k1,
			_w1
			]);
	}
	else
	{
		c.DualQuaternion.Set(
			_result, 
			_i0,
			_j0,
			_k0,
			_w0,
			_i1,
			_j1,
			_k1,
			_w1
			);
	}
	return _result;
}
c.DualQuaternion["Factory"] = c.DualQuaternion.Factory;

c.DualQuaternion.GetI0 = function(in_source)
{
	return in_source[0];
}
c.DualQuaternion.GetJ0 = function(in_source)
{
	return in_source[1];
}
c.DualQuaternion.GetK0 = function(in_source)
{
	return in_source[2];
}
c.DualQuaternion.GetW0 = function(in_source)
{
	return in_source[3];
}
c.DualQuaternion.GetI1 = function(in_source)
{
	return in_source[4];
}
c.DualQuaternion.GetJ1 = function(in_source)
{
	return in_source[5];
}
c.DualQuaternion.GetK1 = function(in_source)
{
	return in_source[6];
}
c.DualQuaternion.GetW1 = function(in_source)
{
	return in_source[7];
}

c.DualQuaternion.SetI0 = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
c.DualQuaternion.SetJ0 = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
c.DualQuaternion.SetK0 = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
c.DualQuaternion.SetW0 = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}
c.DualQuaternion.SetI1 = function(in_source, in_value)
{
	in_source[4] = in_value;
	return;
}
c.DualQuaternion.SetJ1 = function(in_source, in_value)
{
	in_source[5] = in_value;
	return;
}
c.DualQuaternion.SetK1 = function(in_source, in_value)
{
	in_source[6] = in_value;
	return;
}
c.DualQuaternion.SetW1 = function(in_source, in_value)
{
	in_source[7] = in_value;
	return;
}


/**
 * @param {!Float32Array} in_data
 * @param {!number} in_i0
 * @param {!number} in_j0
 * @param {!number} in_k0
 * @param {!number} in_w0
 * @param {!number} in_i1
 * @param {!number} in_j1
 * @param {!number} in_k1
 * @param {!number} in_w1
 */
c.DualQuaternion.Set = function(in_data, in_i0, in_j0, in_k0, in_w0, in_i1, in_j1, in_k1, in_w1)
{
	in_data[0] = in_i0;
	in_data[1] = in_j0;
	in_data[2] = in_k0;
	in_data[3] = in_w0;
	in_data[4] = in_i1;
	in_data[5] = in_j1;
	in_data[6] = in_k1;
	in_data[7] = in_w1;
	return;
}
c.DualQuaternion["Set"] = c.DualQuaternion.Set;

c.DualQuaternion.s_zero = c.DualQuaternion.Factory();


