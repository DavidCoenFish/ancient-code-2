//guiscrollbarvertical.js

function GuiScrollBarVertical(in_pixelOrigin, in_pixelSize, in_visible, in_barLow, in_barHigh, in_callbackTarget, in_callbackFunctionKey)
{
	//DEBUG if ( !(this instanceof GuiScrollBarVertical) )
	//DEBUG {
	//DEBUG 	alert("GuiScrollBarVertical: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_visible = in_visible;
	this.m_barLow = in_barLow;
	this.m_barHigh = in_barHigh;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackFunctionKey = in_callbackFunctionKey;
	
	this.m_rollover = false;
}

GuiScrollBarVertical.prototype.Tick = function(in_timeDelta)
{
	if (false == this.m_visible)
	{
		return;
	}
    this.m_rollover = ((this.m_pixelOrigin.m_x < g_mouseX) &&
          (g_mouseX < (this.m_pixelOrigin.m_x + this.m_pixelSize.m_x)) &&
          (this.m_pixelOrigin.m_y < g_mouseY) &&
          (g_mouseY < (this.m_pixelOrigin.m_y + this.m_pixelSize.m_y)));
          
    //call callback on mouse down
    if ((this.m_callbackTarget != null) &&
        g_mouseEdge &&
        g_mouseDown &&
        this.m_rollover
        )
    {
		g_mouseEdge = false; //consume mouse input
		this.m_rollover = false;

		var pad = this.m_pixelSize.m_x / 4;	
		var height = this.m_pixelSize.m_y - (2 * pad);
		var clickLocation = (g_mouseY - this.m_pixelOrigin.m_y + pad) / height;
		this.m_callbackTarget[this.m_callbackFunctionKey](this, clickLocation);
    }
}

GuiScrollBarVertical.prototype.Draw = function(in_context, in_canvas)
{
	if (false == this.m_visible)
	{
		return;
	}
	
	in_context.save();
	
	//in_context.shadowBlur = 8;
	//in_context.shadowOffsetX = 0;
	//in_context.shadowOffsetY = 2;
	in_context.lineWidth = 4;
	in_context.lineJoin = "round";	
	
	if (true == this.m_rollover)
	{
		//in_context.shadowColor = "#662c0e";
		in_context.strokeStyle = "#fde18f";
	}
	else
	{
		//in_context.shadowColor = "#331607";
		in_context.strokeStyle = "#b27c4d";
	}

	

	var pad = this.m_pixelSize.m_x / 4;	
	var halfPad = pad * 0.5;
	
	in_context.strokeRect(
		this.m_pixelOrigin.m_x + halfPad, 
		this.m_pixelOrigin.m_y, 
		this.m_pixelSize.m_x - pad, 
		this.m_pixelSize.m_y
		);	
	

	var height = this.m_pixelSize.m_y - (2 * pad);
	
	in_context.strokeRect(
		this.m_pixelOrigin.m_x + pad+ halfPad, 
		this.m_pixelOrigin.m_y + pad + (height * this.m_barLow), 
		pad, 
		(height * (this.m_barHigh - this.m_barLow))
		);	
	
	in_context.restore();
	
}

//-- END // End Concatinate, unit test or other follows

