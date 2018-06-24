/////////////////////////////////////////////////////////////////////////////////////////
//class BOX
////////////////////////////////////////////////   /////////////////////////////////////////
function GuiBox(in_pixelLeft, in_pixelTop, in_pixelRight, in_pixelBottom)
{
    if (!(this instanceof GuiBox))
	alert("GuiBox: call constuctor with new keyword");
    this.m_pixelTop = in_pixelTop;
    this.m_pixelLeft = in_pixelLeft;
    this.m_pixelBottom = in_pixelBottom;
    this.m_pixelRight = in_pixelRight;
    this.m_fillStyle = "#000000";
    this.m_outlineFillStyle = "#FF0000";
    this.m_drawFill = true;
    this.m_drawOutline = true;
    this.m_hit = true;
}

GuiBox.prototype.Draw = function()
{
    this.DrawFill();
    this.DrawOutline();
};

GuiBox.prototype.DrawFill = function()
{
    if (true == this.m_drawFill)
    {
	g_context.fillStyle = this.m_fillStyle;
	g_context.fillRect(this.m_pixelLeft, this.m_pixelTop, this.m_pixelRight
		- this.m_pixelLeft, this.m_pixelBottom - this.m_pixelTop);
    }
};

GuiBox.prototype.DrawOutline = function()
{
    if (true == this.m_drawOutline)
    {
	g_context.lineWidth = 1.0;
	g_context.strokeStyle = this.m_outlineFillStyle;
	g_context.strokeRect(
	    this.m_pixelLeft,
	    this.m_pixelTop,
	    this.m_pixelRight - this.m_pixelLeft,
	    this.m_pixelBottom - this.m_pixelTop);
    }
};

GuiBox.prototype.Hit = function(in_pixelX, in_pixelY)
{
    if (false == this.m_hit)
	return false;
    return CollisionBoxPoint(
	this.m_pixelLeft,
	this.m_pixelTop,
	this.m_pixelRight,
	this.m_pixelBottom,
	in_pixelX,
	in_pixelY);
};
