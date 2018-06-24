//textAlign = left, right, center, start, end
//textBaseline = top, hanging, middle, alphabetic, ideographic, bottom

//class TEXT
function GuiText(in_pixelX, in_pixelY, in_text, in_font)
{
    if (!(this instanceof GuiText))
	alert("GuiText: call constuctor with new keyword");
    this.m_pixelX = in_pixelX;
    this.m_pixelY = in_pixelY;
    this.m_text = in_text;
    this.m_fillStyle = "#FF0000";
    this.m_draw = true;
    this.m_font = in_font;
    this.m_textAlign = "center";
    this.m_textBaseline = "middle";
}

GuiText.prototype.Draw = function()
{
    if (false == this.m_draw)
	return;
    g_context.font = this.m_font;
    g_context.textAlign = this.m_textAlign;
    g_context.textBaseline = this.m_textBaseline;
    g_context.fillStyle = this.m_fillStyle;
    g_context.fillText(this.m_text, this.m_pixelX, this.m_pixelY);
};