DSC.Framework = function(_document, _paramObject)
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
	
	this.m_context = DSC.Framework.Context.FactoryRaw(this.m_canvas, _paramObject);

	//client is not obliged to include input script
	this.m_input = (undefined != DSC.Framework.Input) ? DSC.Framework.Input.FactoryRaw(this.m_canvas) : undefined;
	this.m_asset = (undefined != DSC.Framework.Asset) ? DSC.Framework.Asset.FactoryRaw(this.m_context) : undefined;

	this.m_taskArray = [];
	this.m_runKeepGoing = undefined;

	this.m_time = undefined;
	this.m_averageFPS = undefined;

	//lines up a new frame to be rendered once thread is passed back to browser
	var framework = this;
	this.m_requestAnimationFrameId = window.requestAnimationFrame(function(in_timeStamp){framework.RequestAnimationFrameCallback(in_timeStamp);});

	return;
}

DSC.Framework.prototype.GetCanvasWidth = function()
{
	return this.m_canvas.width;
}

DSC.Framework.prototype.GetCanvasHeight = function()
{
	return this.m_canvas.height;
}

DSC.Framework.prototype.RequestAnimationFrameCallback = function(_timeStamp)
{
	var timeDelta = this.IncrementTime(_timeStamp);

	this.m_runKeepGoing = false;
	if (0 < this.m_taskArray.length)
	{
		this.m_context.Begin();
		//run the last task
		this.m_runKeepGoing = this.m_taskArray[this.m_taskArray.length - 1].Run(
			this, 
			timeDelta, 
			0, 
			0,
			this.m_canvas.width,
			this.m_canvas.height
			);
		this.m_context.End();
	}

	//have finished task, but are there more
	if (false == this.m_runKeepGoing)
	{
		this.PopTask();
		this.m_runKeepGoing = (0 < this.m_taskArray.length);
	}

	//running the input clears the input state for the next set of events to occur
	// eventa only are process once we release cpu control by returning from this callback
	if (this.m_input)
	{
		this.m_input.Run();
	}

	if (true == this.m_runKeepGoing)
	{
		var framework = this;
		this.m_requestAnimationFrameId = window.requestAnimationFrame(function(in_timeStamp){framework.RequestAnimationFrameCallback(in_timeStamp);});
	}
	else
	{
		DSC.OnShutdown();
	}

	return;
}

DSC.Framework.prototype.OnCancelAnimationFrame = function()
{
	if (undefined != this.m_requestAnimationFrameId)
	{
		window.cancelRequestAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}
	return;
}

DSC.Framework.prototype.OnResize = function(in_window)
{
	this.m_canvas.width = in_window.innerWidth;
	this.m_canvas.height = in_window.innerHeight;

	return;
}

DSC.Framework.prototype.GetTask = function()
{
	if (0 < this.m_taskArray.length)
	{
		return this.m_taskArray[this.m_taskArray.length - 1];
	}

	return undefined;
}


DSC.Framework.prototype.SetTask = function(in_task)
{
	this.m_taskArray.length = 0;
	if (in_task)
		this.m_taskArray.push(in_task);

	return;
}

DSC.Framework.prototype.PushTask = function(in_task)
{
	if (in_task)
		this.m_taskArray.push(in_task);

	return;
}

DSC.Framework.prototype.PopTask = function()
{
	if (0 < this.m_taskArray.length)
	{
		this.m_taskArray = this.m_taskArray.slice(0, this.m_taskArray.length - 1);
	}

	return;
}

DSC.Framework.prototype.OnDestroy = function()
{
	if (undefined != this.m_requestAnimationFrameId)
	{
		window.cancelAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}

	this.SetTask(undefined);

	if (this.m_input)
	{
		this.m_input.DeleteEvents();
		this.m_input = undefined;
	}

	return;
}

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


DSC.Framework.RequestAnimationFrame = function(in_timeStamp)
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnRequestAnimationFrame(in_timeStamp);
	}

	return;
}

DSC.Framework.CancelAnimationFrame = function()
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnCancelAnimationFrame();
	}

	return;
}

DSC.Framework.Resize = function(in_window)
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnResize(in_window)
	}

	return;
}

DSC.Framework.Create = function(_document, _task, _paramObject)
{
	DSC.Framework.g_framework = new DSC.Framework(_document, _task, _paramObject);

	return DSC.Framework.g_framework;
}

DSC.Framework.Destroy = function(in_document)
{
	if (undefined != DSC.Framework.g_framework)
	{
		DSC.Framework.g_framework.OnDestroy();
	}

	DSC.Framework.g_framework = undefined;

	return;
}
