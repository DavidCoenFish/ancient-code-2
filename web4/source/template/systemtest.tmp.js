/**
 * @private
 * @constructor
 * @struct
 */
var Task = function(){};

/**
 * @param {!DSC.Framework} in_framework
 * @param {!number} in_timeDelta
 * @return {!boolean} 
 */
Task.prototype.Run = function(in_framework, in_timeDelta)
{
	DSC.Log(LOG, "Run in_timeDelta:" + in_timeDelta);
	return false;
};

/**
 */
DSC.OnPageLoad = function()
{
	DSC.Log(LOG, "OnPageLoad");

	/** @type {!Task} */
	var task = new Task();
	/** @type {!Array.<!DSC.TaskRecord>} */
	var taskArray = [task];
	/** @type {!DSC.Framework} */
	var framework = DSC.Framework.Factory(document, taskArray);
}

window.addEventListener('load', DSC.OnPageLoad, true);