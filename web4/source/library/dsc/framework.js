/**
 * @private
 * @constructor
 * @struct
 * @param {!Object=} _document
 * @param {!Array.<!DSC.TaskRecord>=} _taskArray
 */
DSC.Framework = function(_document, _taskArray)
{
	/** @type {null|Object} */
	this.m_document = (undefined === _document) ? null : _document;

	/** @type {!Array.<!DSC.TaskRecord>} */
	this.m_taskArray = (undefined === _taskArray) ? [] : _taskArray;
	/** @type {!boolean} */
	this.m_runKeepGoing = false;

	/** @type {null|number} */
	this.m_time = null;
	/** @type {null|number} */
	this.m_averageFPS = null;

	//lines up a new frame to be rendered once thread is passed back to browser
	/** @type {null|number} */
	this.m_requestAnimationFrameId = window.requestAnimationFrame(DSC.Framework.RequestAnimationFrameCallback);

	return;
}

/** 
 * @private
 * @type {null|DSC.Framework} 
 */
DSC.g_framework = null;

/**
 * @param {!Object=} _document
 * @param {!Array.<!DSC.TaskRecord>=} _taskArray
 * @return {!DSC.Framework}
 */
DSC.Framework.Factory = function(_document, _taskArray)
{
	DSC.Log(LOG, "DSC.Framework Create");

	DSC.g_framework = new DSC.Framework(_document, _taskArray);

	return DSC.g_framework;
}

/**
 */
DSC.Framework.Destroy = function()
{
	DSC.Log(LOG, "DSC.Framework Destroy");

	if (null !== DSC.g_framework)
	{
		DSC.g_framework.OnDestroy();
	}

	DSC.g_framework = null;

	return;
}

/**
 * @param {!number} in_timeStamp
 */
DSC.Framework.RequestAnimationFrameCallback = function(in_timeStamp)
{
	if (null !== DSC.g_framework)
	{
		DSC.g_framework.OnRequestAnimationFrameCallback(in_timeStamp);
	}
}

/**
 * @param {!number} in_timeStamp
 * @this {DSC.Framework}
 */
DSC.Framework.prototype.OnRequestAnimationFrameCallback = function(in_timeStamp)
{
	/** @type {!number} */
	var timeDelta = this.IncrementTime(in_timeStamp);
	this.m_runKeepGoing = false;

	/** @type {!number} */
	var length = this.m_taskArray.length; 
	if (0 < length)
	{
		/** @type {!DSC.TaskRecord} */
		var task = this.m_taskArray[length - 1];
		this.m_runKeepGoing = task.Run(this, timeDelta);
	}

	//have finished task, but are there more
	if (false === this.m_runKeepGoing)
	{
		this.PopTask();
		this.m_runKeepGoing = (0 < this.m_taskArray.length);
	}

	if (true === this.m_runKeepGoing)
	{
		this.m_requestAnimationFrameId = window.requestAnimationFrame(DSC.Framework.RequestAnimationFrameCallback);
	}
	else
	{
		DSC.Framework.Destroy()
	}

	return;
}

/**
 */
DSC.Framework.prototype.OnCancelAnimationFrame = function()
{
	if (null !== this.m_requestAnimationFrameId)
	{
		window.cancelRequestAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = null;
	}
	return;
}

/**
 * @this {DSC.Framework}
 * @return {?DSC.TaskRecord}
 */
DSC.Framework.prototype.GetTask = function()
{
	if (0 < this.m_taskArray.length)
	{
		return this.m_taskArray[this.m_taskArray.length - 1];
	}

	return null;
}


/**
 * export
 * @param {null|DSC.TaskRecord} in_task
 */
DSC.Framework.prototype.SetTask = function(in_task)
{
	this.m_taskArray = [];
	if (null !== in_task)
	{
		this.m_taskArray.push(in_task);
	}

	return;
}

/**
 * export
 * @param {!DSC.TaskRecord} in_task
 */
DSC.Framework.prototype.PushTask = function(in_task)
{
	if (null != in_task)
	{
		this.m_taskArray.push(in_task);
	}

	return;
}


/**
 * export
 */
DSC.Framework.prototype.PopTask = function()
{
	if (0 < this.m_taskArray.length)
	{
		this.m_taskArray = this.m_taskArray.slice(0, this.m_taskArray.length - 1);
	}

	return;
}


/**
 */
DSC.Framework.prototype.OnDestroy = function()
{
	if (null !== this.m_requestAnimationFrameId)
	{
		window.cancelAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = null;
	}

	this.SetTask(null);

	return;
}


/**
 * @param {!number=} _timeStamp
 * @return {!number}
 */
DSC.Framework.prototype.IncrementTime = function(_timeStamp)
{
	if (undefined === _timeStamp)
	{
		return 0;
	}
	/** @type {!number} */
	var timeDelta = 0.0;
	if (null === this.m_time)
	{
		this.m_time = _timeStamp;
	}
	else
	{
		timeDelta = (_timeStamp - this.m_time) / 1000.0;
		this.m_time = _timeStamp;

		if (0.0 != timeDelta)
		{
			/** @type {!number} */
			var fps = 1.0 / timeDelta;
			if (null === this.m_averageFPS)
			{
				this.m_averageFPS = fps;
			}
			else
			{
				this.m_averageFPS = (fps * 0.05) + (this.m_averageFPS * 0.95);
			}
		}
	}
	return timeDelta;
}

/**
 * since we can cancel the animation frame request, allow some method to restart the animation loop
 */
DSC.Framework.RequestAnimationFrame = function()
{
	/** @type {!number} */
	var timeStamp = new Date().getTime();
	if (null !== DSC.g_framework)
	{
		DSC.Framework.RequestAnimationFrameCallback(timeStamp);
	}

	return;
}

/**
 */
DSC.Framework.CancelAnimationFrame = function()
{
	if (null !== DSC.g_framework)
	{
		DSC.g_framework.OnCancelAnimationFrame();
	}

	return;
}
