/**
 * @constructor
 * @param {!object=} _canvas
 */
DSC.Framework.Input = function(_canvas)
{
	if ( !(this instanceof DSC.Framework.Input) )
		alert("DSC.Framework.Input: call constuctor with new keyword");

	this['m_mouseDown'] = false;
	this['m_mouseEdge'] = false;
	this['m_mouseX'] = undefined;
	this['m_mouseY'] = undefined;
	this['m_mouseDeltaX'] = undefined;
	this['m_mouseDeltaY'] = undefined;
	// a public callback called once then cleared at end of tick
	this['m_action'] = undefined;

	this.m_mouseDownOld = false;
	this.m_mouseXOld = undefined;
	this.m_mouseYOld = undefined;
	this.m_canvas = _canvas;

	this.AddEvents();

	return;
}

/**
 * @param {!object=} _canvas
 */
DSC.Framework.Input.Factory = function(_canvas)
{
	return new DSC.Framework.Input(_canvas);
}

/**
 */
DSC.Framework.Input.prototype.AddEvents = function()
{
	if (!this.m_canvas)
		return;
	
	var input = this;
	this.m_mousedownCallback = function(){ input.CallbackMouseDown(); };
	this.m_canvas.addEventListener("mousedown", this.m_mousedownCallback, false);

	this.m_mouseupCallback = function(){ input.CallbackMouseUp(); };
	this.m_canvas.addEventListener("mouseup", this.m_mouseupCallback, false);
	
	this.m_mousemoveCallback = function(in_event){ input.CallbackMouseMove(in_event); };
	this.m_canvas.addEventListener("mousemove", this.m_mousemoveCallback, false);

	this.m_touchCallback = function(in_event){ input.CallbackTouch(in_event); };
	this.m_canvas.addEventListener("touchstart", this.m_touchCallback, false);
	this.m_canvas.addEventListener("touchmove", this.m_touchCallback, false);
	this.m_canvas.addEventListener("touchend", this.m_touchCallback, false);
	this.m_canvas.addEventListener("touchcancel", this.m_touchCallback, false);
}

/**
 */
DSC.Framework.Input.prototype.DeleteEvents = function()
{
	if (!this.m_canvas)
		return;
	this.m_canvas.removeEventListener("mousedown", this.m_mousedownCallback);
	this.m_canvas.removeEventListener("mouseup", this.m_mouseupCallback);
	this.m_canvas.removeEventListener("mousemove", this.m_mousemoveCallback);

	this.m_canvas.removeEventListener("touchstart", this.m_touchCallback);
	this.m_canvas.removeEventListener("touchmove", this.m_touchCallback);
	this.m_canvas.removeEventListener("touchend", this.m_touchCallback);
	this.m_canvas.removeEventListener("touchcancel", this.m_touchCallback);
}

/**
 */
DSC.Framework.Input.prototype.Run = function()
{
	this.m_mouseDownOld = this['m_mouseDown'];
	this['m_mouseEdge'] = false;
	this['m_mouseDeltaX'] = this['m_mouseX'] - this.m_mouseXOld;
	this['m_mouseDeltaY'] = this['m_mouseY'] - this.m_mouseYOld;
	this.m_mouseXOld = this['m_mouseX'];
	this.m_mouseYOld = this['m_mouseY'];

	if (undefined != this.m_action)
	{
		this.m_action.call(undefined);
		this.m_action = undefined;
	}

	return;
}
	
/**
 */
DSC.Framework.Input.prototype.CallbackMouseDown = function()
{
	//console.info("CallbackMouseDown");

	this['m_mouseDown'] = true;
	if (this.m_mouseDownOld != this['m_mouseDown'])
	{
		this['m_mouseEdge'] = true;
	}
}
	
/**
 */
DSC.Framework.Input.prototype.CallbackMouseUp = function()
{
	//console.info("CallbackMouseUp");

	this.m_mouseDown = false;
	if (this.m_mouseDownOld != this['m_mouseDown'])
	{
		this['m_mouseEdge'] = true;
	}
}

/**
 */
DSC.Framework.Input.prototype.CallbackMouseMove = function(in_event)
{
	this['m_mouseX'] = in_event.clientX - DSC.Framework.Input.GetTrueOffsetLeft(this.m_canvas) + window.pageXOffset;
	this['m_mouseY'] = in_event.clientY - DSC.Framework.Input.GetTrueOffsetTop(this.m_canvas) + window.pageYOffset;
	this['m_mouseY'] = (this.m_canvas.height - this['m_mouseY']);

	//console.info("CallbackMouseMove m_mouseX:" + this['m_mouseX'] + " m_mouseY:" + this['m_mouseY']);
}

/**
 */
DSC.Framework.Input.prototype.CallbackTouch = function(in_event)
{
	in_event.preventDefault();

	switch(event.type)
	{
	case "touchmove":
		break;
	case "touchstart":
		this.m_input.CallbackMouseDown(in_event);
		break;
	case "touchend":
	case "touchcancel":
		this.CallbackMouseUp(in_event);
		break;
	default: 
		return;
	}

	var touches = in_event.changedTouches;
	var first = touches[0];

	this['m_mouseX'] = first.pageX - DSC.Framework.Input.GetTrueOffsetLeft(this.m_canvas) + window.pageXOffset;
	this['m_mouseY'] = first.pageY - DSC.Framework.Input.GetTrueOffsetTop(this.m_canvas) + window.pageYOffset;

	this['m_mouseY'] = (this.m_canvas.height - this['m_mouseY']);

	return;
}

/**
 */
DSC.Framework.Input.GetTrueOffsetLeft = function(in_element)
{
	var traceElement = in_element;
	var result = 0;
	while (traceElement)
	{
		result += traceElement.offsetLeft || 0;
		traceElement = traceElement.offsetParent;
	}
	return result;
}

/**
 */
DSC.Framework.Input.GetTrueOffsetTop = function(in_element)
{
	var traceElement = in_element;
	var result = 0;
	while (traceElement)
	{
		result += traceElement.offsetTop || 0;
		traceElement = traceElement.offsetParent;
	}
	return result;
}
