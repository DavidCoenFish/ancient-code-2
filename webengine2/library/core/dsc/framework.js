/**
 * @private
 * @final
 * @constructor
 * @struct
 * @this {DSC.Framework}
 * @param {!object=} _document
 * @param {!object=} _taskArray
 * @param {!object=} _paramObject
 */
DSC.Framework = function(_document, _taskArray, _paramObject)
{
	if ( !(this instanceof DSC.Framework) )
		alert("Framework: call constuctor with new keyword");

	this.m_canvas = (undefined != _document) ? _document.getElementById('canvasId') : undefined;
	
	if (!this.m_canvas)
	{
		throw "canvas canvasId not found";
	}

	//a canvas width, height is 300,150 by default (coordinate space). lets change that to what size it is
	if (this.m_canvas)
	{
		this.m_canvas.width = this.m_canvas.clientWidth;
		this.m_canvas.height = this.m_canvas.clientHeight;
	}
	
	if (undefined != _paramObject) 
	{
		if (undefined != _paramObject['Context2D'])
		{
			this.m_context = DSC.Framework.Context2D.Factory(this.m_canvas, _paramObject['Context2D']);
		}
		else if (undefined != _paramObject['ContextWebGL'])
		{
			this.m_context = DSC.Framework.ContextWebGL.Factory(this.m_canvas, _paramObject['ContextWebGL']);
		}

		if (undefined != _paramObject['Input'])
		{
			this.m_input = DSC.Framework.Input.Factory(this.m_canvas, _paramObject['Input']);
		}
		if (undefined != _paramObject['Asset'])
		{
			//if (undefined == this.m_context)
			//{
			//	throw "assets requested without context";
			//}
			this.m_asset = DSC.Framework.Asset.Factory(this.m_context, _paramObject['Asset']);
		}
	}

	this.m_taskArray = (undefined != _taskArray) ? _taskArray : [];
	this.m_runKeepGoing = undefined;

	this.m_time = undefined;
	this.m_averageFPS = undefined;

	//lines up a new frame to be rendered once thread is passed back to browser
	this.m_requestAnimationFrameId = window.requestAnimationFrame(function(in_timeStamp){DSC.Framework.g_framework.RequestAnimationFrameCallback(in_timeStamp);});

	return;
}
DSC['Framework'] = DSC.Framework;

/**
 * export
 * nosideeffects
 * @return {!number}
 */
DSC.Framework.prototype.GetCanvasWidth = function()
{
	return this.m_canvas.width;
}
DSC['Framework'].prototype['GetCanvasWidth'] = DSC.Framework.prototype.GetCanvasWidth;


/**
 * export
 * nosideeffects
 * @return {!number}
 */
DSC.Framework.prototype.GetCanvasHeight = function()
{
	return this.m_canvas.height;
}
DSC['Framework'].prototype['GetCanvasHeight'] = DSC.Framework.prototype.GetCanvasHeight;


/**
 * @param {!number=} _timeStamp
 * @this {DSC.Framework}
 */
DSC.Framework.prototype.RequestAnimationFrameCallback = function(_timeStamp)
{
	var timeDelta = this.IncrementTime(_timeStamp);
	this.m_runKeepGoing = false;
	var length = this.m_taskArray.length; 
	if (0 < length)
	{
		//run the last task
		var task = this.m_taskArray[length - 1];
		this.m_runKeepGoing = task['Run'](
			this, 
			timeDelta, 
			0, 
			0,
			this.m_canvas.width,
			this.m_canvas.height
			);
	}

	//have finished task, but are there more
	if (false == this.m_runKeepGoing)
	{
		this.PopTask();
		this.m_runKeepGoing = (0 < this.m_taskArray.length);
	}

	//running the input clears the input state for the next set of events to occur
	// eventa only are process once we release cpu control by returning from this callback
	if (undefined != this.m_input)
	{
		this.m_input.Run();
	}

	if (true == this.m_runKeepGoing)
	{
		this.m_requestAnimationFrameId = window.requestAnimationFrame(function(in_timeStamp){DSC.Framework.g_framework.RequestAnimationFrameCallback(in_timeStamp);});
	}
	else
	{
		DSC['OnShutdown']();
	}

	return;
}



/**
 */
DSC.Framework.prototype.OnCancelAnimationFrame = function()
{
	if (undefined != this.m_requestAnimationFrameId)
	{
		window.cancelRequestAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}
	return;
}


/**
 * @param {!object} in_window
 */
DSC.Framework.prototype.OnResize = function(in_window)
{
	this.m_canvas.width = in_window.innerWidth;
	this.m_canvas.height = in_window.innerHeight;

	return;
}


/**
 * @this {DSC.Framework}
 * @return {DSC.Framework.Context}
 */
DSC.Framework.prototype.GetContext = function()
{
	return this.m_context;
}
DSC['Framework'].prototype['GetContext'] = DSC.Framework.prototype.GetContext;


/**
 * @this {DSC.Framework}
 * @return {DSC.Framework.Input}
 */
DSC.Framework.prototype.GetInput = function()
{
	return this.m_input;
}
DSC['Framework'].prototype['GetInput'] = DSC.Framework.prototype.GetInput;


/**
 * @this {DSC.Framework}
 * @return {DSC.Framework.Asset}
 */
DSC.Framework.prototype.GetAsset = function()
{
	return this.m_asset;
}
DSC['Framework'].prototype['GetAsset'] = DSC.Framework.prototype.GetAsset;


/**
 * @this {DSC.Framework}
 * @return {object}
 */
DSC.Framework.prototype.GetTask = function()
{
	if (0 < this.m_taskArray.length)
	{
		return this.m_taskArray[this.m_taskArray.length - 1];
	}

	return undefined;
}
DSC['Framework'].prototype['GetTask'] = DSC.Framework.prototype.GetTask;


/**
 * export
 * @param {!object} in_task
 */
DSC.Framework.prototype.SetTask = function(in_task)
{
	this.m_taskArray.length = 0;
	if (in_task)
		this.m_taskArray.push(in_task);

	return;
}
DSC['Framework'].prototype['SetTask'] = DSC.Framework.prototype.SetTask;

/**
 * export
 * @param {!object} in_task
 */
DSC.Framework.prototype.PushTask = function(in_task)
{
	if (in_task)
		this.m_taskArray.push(in_task);

	return;
}
DSC['Framework'].prototype['PushTask'] = DSC.Framework.prototype.PushTask;


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
DSC['Framework'].prototype['PopTask'] = DSC.Framework.prototype.PopTask;


/**
 */
DSC.Framework.prototype.OnDestroy = function()
{
	if (undefined != this.m_requestAnimationFrameId)
	{
		window.cancelAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}

	this.SetTask(undefined);

	if (undefined != this.m_input)
	{
		this.m_input.DeleteEvents();
		this.m_input = undefined;
	}

	return;
}


/**
 * @param {!number=} _timeStamp
 * @return {!number}
 */
DSC.Framework.prototype.IncrementTime = function(_timeStamp)
{
	if (undefined == _timeStamp)
	{
		return 0;
	}
	var timeDelta = 0.0;
	if (undefined == this.m_time)
	{
		this.m_time = _timeStamp;
	}
	else
	{
		timeDelta = (_timeStamp - this.m_time) / 1000.0;
		this.m_time = _timeStamp;

		if (0.0 != timeDelta)
		{
			var fps = 1.0 / timeDelta;
			if (undefined == this.m_averageFPS)
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
 * export
 */
DSC.Framework.RequestAnimationFrame = function(in_timeStamp)
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnRequestAnimationFrame(in_timeStamp);
	}

	return;
}
DSC['Framework']['RequestAnimationFrame'] = DSC.Framework.RequestAnimationFrame;


/**
 * export
 */
DSC.Framework.CancelAnimationFrame = function()
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnCancelAnimationFrame();
	}

	return;
}
DSC['Framework']['CancelAnimationFrame'] = DSC.Framework.CancelAnimationFrame;


/**
 * export
 * @param {!object} in_window
 */
DSC.Framework.Resize = function(in_window)
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnResize(in_window)
	}

	return;
}
DSC['Framework']['Resize'] = DSC.Framework.Resize;


/**
 * export
 * @param {!object=} _document
 * @param {!object=} _task
 * @param {!object=} _paramObject
 * @return {!DSC.Framework}
 */
DSC.Framework.Create = function(_document, _task, _paramObject)
{
	DSC.Framework.g_framework = new DSC.Framework(_document, _task, _paramObject);

	return DSC.Framework.g_framework;
}
DSC['Framework']['Create'] = DSC.Framework.Create;

/**
 * export
 */
DSC.Framework.Destroy = function()
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnDestroy();
	}

	DSC.Framework.g_framework = undefined;

	return;
}
DSC['Framework']['Destroy'] = DSC.Framework.Destroy;

