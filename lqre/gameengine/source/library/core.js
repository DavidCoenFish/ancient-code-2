/**
 * @preserve
//@ sourceMappingURL=library.map
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
var LOG = false;

/**
 * @param {!boolean} in_topic
 * @param {!string} in_message
 * @param {!boolean=} _critical
 * nosideeffects
 */
c.Log = function(in_topic, in_message, _critical) {
	var doCritical = ((undefined != _critical) && (true == _critical));
	if((true === in_topic) || (true === doCritical)) {
		console.info(in_message);
	}

	if(true === doCritical) {
		alert(in_message);
	}
}
