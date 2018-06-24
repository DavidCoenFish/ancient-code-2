// guigamebattleminimap.js

function GuiGameBattleMiniMap(in_pixelOrigin, in_pixelSize, in_callbackTarget, in_zoomPlus, in_zoomMinus, in_clickPos, in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof GuiGameBattleMiniMap) )
	//DEBUG {
	//DEBUG 	alert("GuiGameBattleMiniMap: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_callbackTarget = in_callbackTarget;
	this.m_zoomPlus = in_zoomPlus;
	this.m_zoomMinus = in_zoomMinus;
	this.m_clickPos = in_clickPos; //click down in mini map not on zoom buttons, put zoom outside minimap?
	
	this.m_boundLow = new Vector(0.25, 0.25); 
	this.m_boundHigh = new Vector(0.75, 0.75); 
	
	this.m_arrayGui = [];
	this.m_arrayDot = [];
	this.m_dotSize = 2.0;
	
	this.m_buttonZoomPlus = new GuiButton(
		"+", 
		new Vector(in_pixelOrigin.m_x + in_pixelSize.m_x + 2, in_pixelOrigin.m_y + in_pixelSize.m_y - 48), 
		new Vector(18, 18), 
		in_callbackTarget, 
		in_zoomPlus, 
		s_guiButtonStyle.e_simple,
		in_context, 
		in_canvas
		);
	this.m_arrayGui.push(this.m_buttonZoomPlus);
	
	this.m_buttonZoomMinus = new GuiButton(
		"-", 
		new Vector(in_pixelOrigin.m_x + in_pixelSize.m_x + 2, in_pixelOrigin.m_y + in_pixelSize.m_y - 24), 
		new Vector(18, 18), 
		in_callbackTarget, 
		in_zoomMinus, 
		s_guiButtonStyle.e_simple,
		in_context, 
		in_canvas
		);
	this.m_arrayGui.push(this.m_buttonZoomMinus);
}

GuiGameBattleMiniMap.prototype.Tick = function(in_timeDelta)
{
	this.m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });

	if (g_mouseDown && this.m_clickPos)
	{
		if ((this.m_pixelOrigin.m_x < g_mouseX) &&
			  (g_mouseX < (this.m_pixelOrigin.m_x + this.m_pixelSize.m_x)) &&
			  (this.m_pixelOrigin.m_y < g_mouseY) &&
			  (g_mouseY < (this.m_pixelOrigin.m_y + this.m_pixelSize.m_y)))
		{
			var ratioX = (g_mouseX - this.m_pixelOrigin.m_x) / this.m_pixelSize.m_x;
			var ratioY = (g_mouseY - this.m_pixelOrigin.m_y) / this.m_pixelSize.m_y;
			this.m_callbackTarget[this.m_clickPos](ratioX, ratioY);
		}
	}
}

GuiGameBattleMiniMap.prototype.ClearDots = function()
{
	this.m_arrayDot.length = 0;
}

GuiGameBattleMiniMap.prototype.AddDot = function(in_positionRatioX, in_positionRatioY, in_fillStyle)
{
	this.m_arrayDot.push({ 
		"m_pixelOrigin" : new Vector(
			this.m_pixelOrigin.m_x + (in_positionRatioX * this.m_pixelSize.m_x) - (this.m_dotSize * 0.5),
			this.m_pixelOrigin.m_y + (in_positionRatioY * this.m_pixelSize.m_y) - (this.m_dotSize * 0.5)
			),
		"m_fillStyle" : in_fillStyle
		});
}


GuiGameBattleMiniMap.prototype.Draw = function(in_context, in_canvas)
{
	in_context.strokeStyle = "#b27c4d";
	in_context.strokeRect(
		this.m_pixelOrigin.m_x, 
		this.m_pixelOrigin.m_y, 
		this.m_pixelSize.m_x, 
		this.m_pixelSize.m_y
		);

	in_context.strokeRect(
		this.m_pixelOrigin.m_x + (this.m_pixelSize.m_x * this.m_boundLow.m_x), 
		this.m_pixelOrigin.m_y + (this.m_pixelSize.m_y * this.m_boundLow.m_y), 
		this.m_pixelSize.m_x * (this.m_boundHigh.m_x - this.m_boundLow.m_x), 
		this.m_pixelSize.m_y * (this.m_boundHigh.m_y - this.m_boundLow.m_y)
		);
		
	this.m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	
	var self = this;
	this.m_arrayDot.forEach(function(in_item)
	{ 
		in_context.fillStyle = in_item.m_fillStyle;
		in_context.fillRect(
			in_item.m_pixelOrigin.m_x,
			in_item.m_pixelOrigin.m_y,
			self.m_dotSize,
			self.m_dotSize
			);
	});
		
}
