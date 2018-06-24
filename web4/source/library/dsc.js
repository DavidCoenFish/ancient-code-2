/**
 * @const
 */
var DSC = {};

//set via cmd line for closure compiler --define="DEBUG=false"
/** @define {boolean} */
var DEBUG = true;

//set via cmd line for closure compiler --define="LOG=false"
/** @define {boolean} */
var LOG = true;

/** @const */
DSC.t_floatArray = (undefined != Float32Array) ? Float32Array : Array;
/** @typedef {!(Float32Array|Array)} */
DSC.t_floatArray;

/** @const */
DSC.t_s8Array = (undefined != Int8Array) ? Int8Array : Array;
/** @typedef {!(Int8Array|Array)} */
DSC.t_s8Array;

/** @const */
DSC.t_u8Array = (undefined != Uint8Array) ? Uint8Array : Array;
/** @typedef {!(Uint8Array|Array)} */
DSC.t_u8Array;

/** @const */
DSC.t_s16Array = (undefined != Int16Array) ? Int16Array : Array;
/** @typedef {!(Int16Array|Array)} */
DSC.t_s16Array;

/** @const */
DSC.t_u16Array = (undefined != Uint16Array) ? Uint16Array : Array;
/** @typedef {!(Uint16Array|Array)} */
DSC.t_u16Array;

/** @const */
DSC.t_s32Array = (undefined != Int32Array) ? Int32Array : Array;
/** @typedef {!(Int32Array|Array)} */
DSC.t_s32Array;

/** @const */
DSC.t_u32Array = (undefined != Uint32Array) ? Uint32Array : Array;
/** @typedef {!(Uint32Array|Array)} */
DSC.t_u32Array;

/**
 * @param {!Object<!string, !Object>} in_data
 * @param {!Object<!string, !Object>=} _overload
 * @return {!Object<!string, !Object>}
 */
DSC.OverloadData = function(in_data, _overload)
{
	if (undefined == _overload)
	{
		return in_data;
	}

	/** @type {!Object<!string, !Object>} */
	var result = {};
	/** @type {!string} */ 
	var key = "";
	for (key in in_data)
	{
		result[key] = in_data[key];
	}

	for (key in _overload)
	{
		/** @type {!Object<!string, !Object>} */
		var item = _overload[key];
		//recurse rather than replace objects
		/** @type {!boolean} */
		var isObject = (item !== null && typeof item === 'object');
		if (true == isObject)
		{
			result[key] = DSC.OverloadData(result[key], item);
		}
		else
		{
			result[key] = item;
		}
	}

	return result;
}

/**
 * @param {!boolean} in_topic
 * @param {!string} in_message
 */
DSC.Log = function(in_topic, in_message)
{
	if (true == in_topic)
	{
		console.info(in_message);
	}
	return;
}
/**
 * @param {!boolean} in_topic
 * @param {!string} in_message
 */
DSC.LogCritical = function(in_topic, in_message)
{
	DSC.Log(in_topic, in_message);
	alert(in_message);
	return;
}
