/**
 * Common namespace
 * @const
 * @unrestricted
 */
DSC.Common = {}
DSC['Common'] = DSC.Common;

/**
 * @param {!object=} in_data
 * @param {!object=} _overload
 * @return {!object}
 */
DSC.Common.OverloadData = function(in_data, _overload)
{
	if (undefined == _overload)
		return in_data;
	var result = {};
	for (var key in in_data)
	{
		result[key] = in_data[key];
	}
	for (var key in _overload)
	{
		result[key] = _overload[key];
	}
	return result;
}
DSC.Common['OverloadData'] = DSC.Common.OverloadData;


DSC.Common.t_floatArray = (undefined != Float32Array) ? Float32Array : Array;
DSC.Common['t_floatArray'] = DSC.Common.t_floatArray;

DSC.Common.t_s8Array = (undefined != Int8Array) ? Int8Array : Array;
DSC.Common['t_s8Array'] = DSC.Common.t_s8Array;

DSC.Common.t_u8Array = (undefined != Uint8Array) ? Uint8Array : Array;
DSC.Common['t_u8Array'] = DSC.Common.t_u8Array;

DSC.Common.t_s16Array = (undefined != Int16Array) ? Int16Array : Array;
DSC.Common['t_s16Array'] = DSC.Common.t_s16Array;

DSC.Common.t_u16Array = (undefined != Uint16Array) ? Uint16Array : Array;
DSC.Common['t_u16Array'] = DSC.Common.t_u16Array;

DSC.Common.t_s32Array = (undefined != Int32Array) ? Int32Array : Array;
DSC.Common['t_s32Array'] = DSC.Common.t_s32Array;

DSC.Common.t_u32Array = (undefined != Uint32Array) ? Uint32Array : Array;
DSC.Common['t_u32Array'] = DSC.Common.t_u32Array;

//todo. array copy by memory
