//guibutton.js


var s_guiButtonStyle = {
  "e_simple" : 0,
  "e_fancy" : 1
};

function GuiButton(in_text, in_pixelOrigin,  in_pixelSize, in_callbackTarget, in_callbackFunctionKey, in_style, in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof GuiButton) )
	//DEBUG {
	//DEBUG 	alert("GuiButton: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_callbackTarget)
	{
		in_callbackTarget = null;
	}
	if (undefined == in_callbackFunctionKey)
	{
		in_callbackFunctionKey = null;
	}		
	if (undefined == in_style)
	{
		in_style = s_guiButtonStyle.e_simple;
	}

	this.m_text = in_text;
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackFunctionKey = in_callbackFunctionKey;
	this.m_visible = true; 
	this.m_enabled = true; //accept click/ rollover
	this.m_rollover = false;
	this.m_font = GuiTextGetDefaultFont();
	
	switch (in_style)
	{
	case s_guiButtonStyle.e_simple:
		this.m_panelFillStyleRollover = "#fde18f";
		this.m_panelShadowColorRollover = "#662c0e";		
		this.m_panelFillStyleEnable = "#b27c4d";
		this.m_panelShadowColorEnable = "#331607";
		this.m_panelFillStyle = "#d9b479";
		this.m_panelShadowColor = "#84633f";
		this.m_panel = new GuiPanel(in_pixelOrigin, in_pixelSize, this.m_panelFillStyleEnable, this.m_panelShadowColorEnable, true, 16);
		
		break;
	case s_guiButtonStyle.e_fancy:
		this.m_panelFillStyleRollover = in_context.createLinearGradient(0, in_pixelOrigin.m_y, 0, in_pixelOrigin.m_y + in_pixelSize.m_y);
		this.m_panelFillStyleRollover.addColorStop(0.0, "#a75722");
		this.m_panelFillStyleRollover.addColorStop(0.1, "#eb7b36");
		this.m_panelFillStyleRollover.addColorStop(0.25, "#fde18f");
		this.m_panelFillStyleRollover.addColorStop(0.4, "#fee8aa");
		this.m_panelFillStyleRollover.addColorStop(0.65, "#934817");
		this.m_panelFillStyleRollover.addColorStop(0.75, "#94521e");
		this.m_panelFillStyleRollover.addColorStop(1.0, "#2a1102");
		this.m_panelShadowColorRollover = "#662c0e";		
		
		this.m_panelFillStyleEnable = in_context.createLinearGradient(0, in_pixelOrigin.m_y, 0, in_pixelOrigin.m_y + in_pixelSize.m_y);
		this.m_panelFillStyleEnable.addColorStop(0.0, "#542c11");
		this.m_panelFillStyleEnable.addColorStop(0.1, "#7d4221");
		this.m_panelFillStyleEnable.addColorStop(0.25, "#b27c4d");
		this.m_panelFillStyleEnable.addColorStop(0.4, "#c8ab71");
		this.m_panelFillStyleEnable.addColorStop(0.65, "#49240b");
		this.m_panelFillStyleEnable.addColorStop(0.75, "#49280f");
		this.m_panelFillStyleEnable.addColorStop(1.0, "#231200");
		this.m_panelShadowColorEnable = "#331607";
		
		this.m_panelFillStyle = in_context.createLinearGradient(0, in_pixelOrigin.m_y, 0, in_pixelOrigin.m_y + in_pixelSize.m_y);
		this.m_panelFillStyle.addColorStop(0.0, "#b78954");
		this.m_panelFillStyle.addColorStop(0.1, "#a7774b");
		this.m_panelFillStyle.addColorStop(0.25, "#d9b479");
		this.m_panelFillStyle.addColorStop(0.4, "#a38552");
		this.m_panelFillStyle.addColorStop(0.65, "#896740");
		this.m_panelFillStyle.addColorStop(0.75, "#896942");
		this.m_panelFillStyle.addColorStop(1.0, "#675438");
		this.m_panelShadowColor = "#84633f";
				
		this.m_panel = new GuiPanelFancy(in_pixelOrigin, in_pixelSize, this.m_panelFillStyleEnable, this.m_panelShadowColorEnable);

		break;
	default:
		alert("default case GuiButton:" + in_style);		
	}
	
}

GuiButton.prototype.SetVisible = function(in_visible)
{
	if (this.m_visible == in_visible)
	{
		return;
	}
	this.m_visible = in_visible;
	if (false == in_visible)
	{
	  this.m_rollover = false;
	}
}

GuiButton.prototype.SetEnable = function(in_enable)
{
	if (this.m_enabled == in_enable)
	{
		return;
	}
	this.m_enabled = in_enable;
	if (false == in_enable)
	{
	  this.m_rollover = false;
	}
}
  
GuiButton.prototype.Reset = function()
{
	this.m_rollover = false;
}

GuiButton.prototype.Draw = function(in_context, in_canvas)
{
	if (false == this.m_visible)
	{
		return;
	}
	
	in_context.save();

	if (true == this.m_rollover)
	{
		this.m_panel.m_fillStyle = this.m_panelFillStyleRollover;
		this.m_panel.m_shadowColor = this.m_panelShadowColorRollover;
	}
	else if (true == this.m_enabled)
	{
		this.m_panel.m_fillStyle = this.m_panelFillStyleEnable;
		this.m_panel.m_shadowColor = this.m_panelShadowColorEnable;
	}
	else
	{
		this.m_panel.m_fillStyle = this.m_panelFillStyle;
		this.m_panel.m_shadowColor = this.m_panelShadowColor;
	}
	
	this.m_panel.Draw(in_context, in_canvas);
		
	
	//draw text
	if ("" != this.m_text)
	{
		in_context.font = this.m_font;
		in_context.textAlign = "center";
		in_context.textBaseline = "middle";
		var baseX = this.m_pixelOrigin.m_x + (0.5 * this.m_pixelSize.m_x);
		var baseY = this.m_pixelOrigin.m_y + (0.5 * this.m_pixelSize.m_y);
		if (true == this.m_rollover)
		{
			in_context.fillStyle = "#a75722";
			in_context.fillText(this.m_text, baseX, baseY);      
			in_context.fillStyle = "#f5dcb4";
			in_context.fillText(this.m_text, baseX + 1, baseY + 1);      
		}		
		else if (true == this.m_enabled)
		{
			in_context.fillStyle = "#140600";
			in_context.fillText(this.m_text, baseX, baseY);      
			in_context.fillStyle = "#d5bc94";
			in_context.fillText(this.m_text, baseX + 1, baseY + 1);      
		}
		else
		{
			in_context.fillStyle = "#a38552";
			in_context.fillText(this.m_text, baseX, baseY);      
		}	
	}
}

GuiButton.prototype.Tick = function(in_timeDelta)
{
    if ((false == this.m_enabled) || (false == this.m_visible))
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
      this.m_callbackTarget[this.m_callbackFunctionKey](this);
    }
}

//-- END // End Concatinate, unit test or other follows


