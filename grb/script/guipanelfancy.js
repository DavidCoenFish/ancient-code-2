//guipanelfancy.js

function GuiPanelFancy(in_pixelOrigin, in_pixelSize, in_fillStyle, in_shadowColor)
{
	//DEBUG if ( !(this instanceof GuiPanelFancy) )
	//DEBUG {
	//DEBUG 	alert("GuiPanelFancy: call constuctor with new keyword");	
	//DEBUG }

	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_fillStyle = in_fillStyle;
	this.m_shadowColor = in_shadowColor;
}

GuiPanelFancy.prototype.Draw = function(in_context, in_canvas)
{
	in_context.save();

	in_context.fillStyle = this.m_fillStyle;

	in_context.shadowBlur = 8;
	in_context.shadowOffsetX = 2;
	in_context.shadowOffsetY = 4;
	in_context.shadowColor = this.m_shadowColor;

	in_context.fillRect(
		this.m_pixelOrigin.m_x,
		this.m_pixelOrigin.m_y + 12,
		this.m_pixelSize.m_x,
		this.m_pixelSize.m_y - 24
		);
	in_context.fillRect(
		this.m_pixelOrigin.m_x + 9,
		this.m_pixelOrigin.m_y + 8,
		this.m_pixelSize.m_x - 18,
		this.m_pixelSize.m_y - 16
		);
	in_context.fillRect(
		this.m_pixelOrigin.m_x + 18,
		this.m_pixelOrigin.m_y + 4,
		this.m_pixelSize.m_x - 36,
		this.m_pixelSize.m_y - 8
		);
	in_context.fillRect(
		this.m_pixelOrigin.m_x + 27,
		this.m_pixelOrigin.m_y,
		this.m_pixelSize.m_x - 54,
		this.m_pixelSize.m_y
		);
				
	in_context.restore();
}

//-- END // End Concatinate, unit test or other follows

