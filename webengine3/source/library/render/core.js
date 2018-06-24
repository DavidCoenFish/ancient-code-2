/**
 * @preserve
//@ sourceMappingURL=fubar_core_render.map
 */

/**
 * root namespace
 * @const
 * @unrestricted
 */
c = {}

//set via cmd line for closure compiler --define="DEBUG=false"
/** @define {boolean} */
var DEBUG = false;

//set via cmd line for closure compiler --define="LOG=false"
/** @define {boolean} */
var LOG = true;
var LOG_WEBGL = true;
var LOG_SHADER = true;

/**
 * @param {!boolean} in_topic
 * @param {!string} in_message
 * @param {!boolean=} _critical
 * nosideeffects
 */
c.Log = function(in_topic, in_message, _critical) {
	var doCritical = ((undefined != _critical) && (true == _critical));
	if ((true === in_topic) || (true === doCritical)) {
		console.info(in_message);
	}

	if (true === doCritical){
		alert(in_message);
	}
}


//Float32Array = (undefined != Float32Array) ? Float32Array : Array;
//c["t_floatArray"] = Float32Array;
//
//Int8Array = (undefined != Int8Array) ? Int8Array : Array;
//c["t_s8Array"] = Int8Array;
//
//Uint8Array = (undefined != Uint8Array) ? Uint8Array : Array;
//c["t_u8Array"] = Uint8Array;
//
//Int16Array = (undefined != Int16Array) ? Int16Array : Array;
//c["t_s16Array"] = Int16Array;
//
//Uint16Array = (undefined != Uint16Array) ? Uint16Array : Array;
//c["t_u16Array"] = Uint16Array;
//
//Int32Array = (undefined != Int32Array) ? Int32Array : Array;
//c["t_s32Array"] = Int32Array;
//
//Uint32Array = (undefined != Uint32Array) ? Uint32Array : Array;
//c["t_u32Array"] = Uint32Array;

