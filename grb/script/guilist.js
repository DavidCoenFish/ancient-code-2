//guilist.js

function GuiList(in_pixelOrigin, in_pixelSize, in_arrayData, in_displayCount, in_context, in_callbackTarget, in_callbackFunctionNameRollover, in_callbackFunctionNameClick)
{
	//DEBUG if ( !(this instanceof GuiList) )
	//DEBUG {
	//DEBUG 	alert("GuiList: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_callbackTarget)
	{
		in_callbackTarget = null;
	}
	if (undefined == in_callbackFunctionNameRollover)
	{
		in_callbackFunctionNameRollover = null;
	}		
	if (undefined == in_callbackFunctionNameClick)
	{
		in_callbackFunctionNameClick = null;
	}

	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_displayCount = in_displayCount;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackFunctionNameRollover = in_callbackFunctionNameRollover;
	this.m_callbackFunctionNameClick = in_callbackFunctionNameClick;
	this.m_visible = true;
	this.m_arrayData = in_arrayData;
	this.m_viewIndexBase = 0;
	this.m_softShadow = true;
	this.m_font = GuiTextGetDefaultFont();

	//for repeat scroll on rollover of scroll widgits
	this.m_rolloverRepeatTimer = 0.0;
	this.m_rolloverRepeatDuration = 0.5;
	
	this.m_scrollUpVisible = false;
	this.m_scrollUpRollover = false;
	this.m_scrollDownVisible = false;
	this.m_scrollDownRollover = false;
	
	this.m_gradientBackground = in_context.createLinearGradient(this.m_pixelOrigin.m_x, 0, this.m_pixelOrigin.m_x + this.m_pixelSize.m_x, 0);
	this.m_gradientBackground.addColorStop(0.0, "#d2b387");
	this.m_gradientBackground.addColorStop(0.3, "#e3c69e");
	this.m_gradientBackground.addColorStop(0.7, "#e3c69c");
	this.m_gradientBackground.addColorStop(1.0, "#d4b080");	

}

GuiList.prototype.ClearSelectedAll = function()
{
	this.m_arrayData.forEach(function(in_item){ in_item.m_selected = false; });	
}

GuiList.prototype.SetSelected = function(in_key, in_selected)
{
	this.m_arrayData.forEach(function(in_item)
	{ 
		if (in_key == in_item.m_key)
		{
			in_item.m_selected = in_selected; 
		}
	});	
}

GuiList.prototype.FitKeyInView = function(in_key)
{
	var foundIndex = 0;
	this.m_arrayData.forEach(function(in_item, in_index)
	{ 
		if (in_key == in_item.m_key)
		{
			foundIndex = in_index;
		}
	});	
	
	if (0 != foundIndex)
	{
		this.m_viewIndexBase = Math.min(foundIndex - 1, this.m_arrayData.length - this.m_displayCount);
	}
}

GuiList.prototype.TestRollover = function(in_index)
{
	return ((this.m_pixelOrigin.m_x < g_mouseX) &&
			(g_mouseX < (this.m_pixelOrigin.m_x + this.m_pixelSize.m_x)) &&
			(this.m_pixelOrigin.m_y + (this.m_pixelSize.m_y * in_index) < g_mouseY) &&
			(g_mouseY < (this.m_pixelOrigin.m_y + (this.m_pixelSize.m_y * (in_index + 1)))));
}

GuiList.prototype.Tick = function(in_timeDelta)
{
	//detect rollover
	if (true == this.m_scrollUpVisible)
	{
		if (this.TestRollover(0))
		{
			var triggerRoll = false;
			if ((true == g_mouseEdge) &&
				(true == g_mouseDown))
			{
				triggerRoll = true;
				g_mouseEdge = false;
			}
			if (true == this.m_scrollUpRollover)
			{
				this.m_rolloverRepeatTimer += in_timeDelta;
				if (this.m_rolloverRepeatDuration < this.m_rolloverRepeatTimer)
				{
					triggerRoll = true;
					this.m_rolloverRepeatTimer -= this.m_rolloverRepeatDuration;
					this.m_rolloverRepeatDuration = (this.m_rolloverRepeatDuration * 0.8) + (0.1 * 0.2); 
				}
			}
			else
			{
				triggerRoll = true;
				this.m_rolloverRepeatTimer = 0.0; 
				this.m_rolloverRepeatDuration = 0.5;
				this.m_scrollUpRollover = true;
			}
			
			if (true == triggerRoll)
			{
				this.m_viewIndexBase -= 1;
				if (this.m_viewIndexBase < 0)
				{
					this.m_viewIndexBase = 0;
				}
			}
		}
		else
		{
			this.m_scrollUpRollover = false;
		}
	}
	if (true == this.m_scrollDownVisible)
	{
		if (this.TestRollover(this.m_displayCount - 1))
		{
			var triggerRoll = false;
			if ((true == g_mouseEdge) &&
				(true == g_mouseDown))
			{
				triggerRoll = true;
				g_mouseEdge = false;
			}
			if (true == this.m_scrollDownRollover)
			{
				this.m_rolloverRepeatTimer += in_timeDelta;
				if (this.m_rolloverRepeatDuration < this.m_rolloverRepeatTimer)
				{
					triggerRoll = true;
					this.m_rolloverRepeatTimer -= this.m_rolloverRepeatDuration;
					this.m_rolloverRepeatDuration = (this.m_rolloverRepeatDuration * 0.8) + (0.1 * 0.2); 
				}
			}
			else
			{
				triggerRoll = true;
				this.m_rolloverRepeatTimer = 0.0; 
				this.m_rolloverRepeatDuration = 0.5;
				this.m_scrollDownRollover = true;
			}
			
			if (true == triggerRoll)
			{
				this.m_viewIndexBase += 1;
				if (this.m_arrayData.length < (this.m_viewIndexBase + this.m_displayCount))
				{
					this.m_viewIndexBase = this.m_arrayData.length - this.m_displayCount;
				}
			}
		}
		else
		{
			this.m_scrollDownRollover = false;
		}
	}
	
	this.m_scrollUpVisible = (0 < this.m_viewIndexBase);
	if (false == this.m_scrollUpVisible)
	{
		this.m_scrollUpRollover = false;	
	}
	this.m_scrollDownVisible = ((this.m_viewIndexBase + this.m_displayCount) < this.m_arrayData.length);
	if (false == this.m_scrollDownVisible)
	{
		this.m_scrollDownRollover = false;	
	}	
		
	for (var index = 0; index < this.m_displayCount; ++index)
	{
		if ((0 == index) &&
			(true == this.m_scrollUpVisible))
		{
			continue;
		}
		if ((this.m_displayCount - 1 == index) &&
			(true == this.m_scrollDownVisible))
		{
			continue;
		}
		
		if (true == this.TestRollover(index)) //rolled over something that wasn't a scroll
		{				
			var data = this.m_arrayData[this.m_viewIndexBase + index];
			if (!data)
			{
				continue;
			}
		
			if ((true == g_mouseDown) &&
				(true == g_mouseEdge))
			{		
				//click
				if (this.m_callbackTarget &&  this.m_callbackFunctionNameClick)
				{
					this.m_callbackTarget[this.m_callbackFunctionNameClick](data);
				}
			}
			else
			{
				//rollover
				if (this.m_callbackTarget &&  this.m_callbackFunctionNameRollover)
				{
					this.m_callbackTarget[this.m_callbackFunctionNameRollover](data);
				}			
			}
		}
		
	}
}

GuiList.prototype.Draw = function(in_context, in_canvas)
{
	in_context.save();
	
	if (true == this.m_softShadow)
	{
		in_context.shadowBlur = 8;
		in_context.shadowOffsetX = 2;
		in_context.shadowOffsetY = 4;
		in_context.shadowColor = "#2a1102";
	}
	else
	{
		in_context.fillStyle = "#2a1102";
		in_context.fillRect(
			this.m_pixelOrigin.m_x + 2, 
			this.m_pixelOrigin.m_y + 4, 
			this.m_pixelSize.m_x, 
			this.m_pixelSize.m_y * this.m_displayCount
			);
	}

	in_context.fillStyle = this.m_gradientBackground; //"#fdde9e";
	in_context.fillRect(
		this.m_pixelOrigin.m_x, 
		this.m_pixelOrigin.m_y, 
		this.m_pixelSize.m_x, 
		this.m_pixelSize.m_y * this.m_displayCount
		);
	
	in_context.restore();
					
	var centerLine = this.m_pixelOrigin.m_x + (0.5 * this.m_pixelSize.m_x);
	var selected = false;
	var data = undefined;
	for (var index = 0; index < this.m_displayCount; ++index)
	{
		selected = false;
		data = undefined;
		if ((0 == index) && 
			(true == this.m_scrollUpVisible))
		{
			selected = (true == this.m_scrollUpRollover);
		}
		else if ((index == (this.m_displayCount - 1)) && 
			(true == this.m_scrollDownVisible))
		{
			selected = (true == this.m_scrollDownRollover);
		}
		else
		{
			data = this.m_arrayData[this.m_viewIndexBase + index];
			if (data)
			{
				selected = data.m_selected;
			}			
		}
	
		//draw selection box
		if (true == selected)
		{
			in_context.fillStyle = "#a75722";
			in_context.fillRect(
				this.m_pixelOrigin.m_x + 1, 
				this.m_pixelOrigin.m_y + (this.m_pixelSize.m_y * index) + 1, 
				this.m_pixelSize.m_x - 2, 
				this.m_pixelSize.m_y - 2
				);
		}
		
		//draw text
		if (data && data.m_text)
		{
			if (true == selected)
			{
				in_context.fillStyle = "#fdde9e";
			}
			else
			{
				in_context.fillStyle = "#2a1102";
			}
			
			in_context.font = this.m_font;
			in_context.textAlign = "center";		
			in_context.textBaseline = "middle";
			in_context.fillText(data.m_text, centerLine, this.m_pixelOrigin.m_y + (0.5 * this.m_pixelSize.m_y) + (this.m_pixelSize.m_y * index));		
		}
	}
	
	var arrowHelperY = this.m_pixelSize.m_y * 0.33;
	if (true == this.m_scrollUpVisible)
	{
		if (true == this.m_scrollUpRollover)
		{
			in_context.fillStyle = "#fdde9e";
		}
		else
		{
			in_context.fillStyle = "#2a1102";
		}
		
		var baseHeight = this.m_pixelOrigin.m_y + arrowHelperY;
		in_context.beginPath();
		in_context.moveTo(centerLine, baseHeight);
		in_context.lineTo(centerLine + arrowHelperY, baseHeight + arrowHelperY);
		in_context.lineTo(centerLine - arrowHelperY, baseHeight + arrowHelperY);
		in_context.closePath();
		in_context.fill();
	}
	
	if (true == this.m_scrollDownVisible)
	{
		if (true == this.m_scrollDownRollover)
		{
			in_context.fillStyle = "#fdde9e";
		}
		else
		{
			in_context.fillStyle = "#2a1102";
		}

		var baseHeight = this.m_pixelOrigin.m_y + (this.m_pixelSize.m_y * (this.m_displayCount - 1)) + arrowHelperY;
		in_context.beginPath();
		in_context.moveTo(centerLine, baseHeight + arrowHelperY);
		in_context.lineTo(centerLine + arrowHelperY, baseHeight);
		in_context.lineTo(centerLine - arrowHelperY, baseHeight);
		in_context.closePath();
		in_context.fill();
	}
}


//-- END // End Concatinate, unit test or other follows
