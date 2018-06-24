//guitext.js

//in_textAlign = left, right, center, start, end
//in_textBaseline = top, hanging, middle, alphabetic, ideographic, bottom

function GuiText(in_text, in_pixelOrigin, in_font, in_textAlign, in_textBaseline)
{
	//DEBUG if ( !(this instanceof GuiText) )
	//DEBUG {
	//DEBUG 	alert("GuiText: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_font)
	{
		in_font = GuiTextGetDefaultFont();
	}
	if (undefined == in_textAlign)
	{
		in_textAlign = "left";
	}
	if (undefined == in_textBaseline)
	{
		in_textBaseline = "top";
	}
		
	this.m_text = in_text;
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_font = in_font;
	this.m_fill = GuiTextGetDefaultFill();
	this.m_textAlign = in_textAlign;
	this.m_textBaseline = in_textBaseline;
	this.m_visible = true;
}

GuiText.prototype.Draw = function(in_context, in_canvas)
{
	//draw text
	if (("" != this.m_text) && (true == this.m_visible))
	{
		in_context.font = this.m_font;
		in_context.textAlign = this.m_textAlign;		
		in_context.textBaseline = this.m_textBaseline;

		in_context.fillStyle = this.m_fill;
		in_context.fillText(this.m_text, this.m_pixelOrigin.m_x, this.m_pixelOrigin.m_y);		
	}
}

function GuiTextGetDefaultFill()
{
	return "#542c11";
}

function GuiTextGetLargeFont()
{
	return "36px sans-serif";
}

function GuiTextGetDefaultFont()
{
	return "24px sans-serif";
}

function GuiTextGetSmallFont()
{
	return "12px sans-serif";
}


//-- END // End Concatinate, unit test or other follows

