//guipanel.js

function GuiPanel(in_pixelOrigin, in_pixelSize, in_fillStyle, in_shadowColor, in_softShadow, in_radius)
{
	//DEBUG if ( !(this instanceof GuiPanel) )
	//DEBUG {
	//DEBUG 	alert("GuiPanel: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_softShadow)
	{
		in_softShadow = true;
	}
	if (undefined == in_radius)
	{
		in_radius = 16.0;
	}

	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_fillStyle = in_fillStyle;
	this.m_shadowColor = in_shadowColor;
	this.m_softShadow = in_softShadow;
	this.m_radius = in_radius / 2.0;
	
}

GuiPanel.prototype.Draw = function(in_context, in_canvas)
{
	in_context.save();

	in_context.lineWidth = this.m_radius * 2.0;
	in_context.lineJoin = "round";	
	
	if (true == this.m_softShadow)
	{
		in_context.shadowBlur = 8;
		in_context.shadowOffsetX = 2;
		in_context.shadowOffsetY = 4;
		in_context.shadowColor = this.m_shadowColor; //"#140600";
	}
	else
	{
		in_context.strokeStyle = this.m_shadowColor;
		in_context.strokeRect(this.m_pixelOrigin.m_x + this.m_radius + 2, this.m_pixelOrigin.m_y + this.m_radius + 2, this.m_pixelSize.m_x - (2.0 * this.m_radius), this.m_pixelSize.m_y - (2.0 * this.m_radius));
	}

	in_context.strokeStyle = this.m_fillStyle;
	in_context.strokeRect(this.m_pixelOrigin.m_x + this.m_radius, this.m_pixelOrigin.m_y + this.m_radius, this.m_pixelSize.m_x - (2.0 * this.m_radius), this.m_pixelSize.m_y - (2.0 * this.m_radius));

	in_context.restore();

	in_context.fillStyle = this.m_fillStyle;
	in_context.fillRect(this.m_pixelOrigin.m_x + this.m_radius, this.m_pixelOrigin.m_y + this.m_radius, this.m_pixelSize.m_x - (2.0 * this.m_radius), this.m_pixelSize.m_y - (2.0 * this.m_radius));
	
	in_context.restore();
	
}

//-- END // End Concatinate, unit test or other follows

