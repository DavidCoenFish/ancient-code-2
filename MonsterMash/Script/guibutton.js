/////////////////////////////////////////////////////////////////////////////////////////
//class BUTTON
/////////////////////////////////////////////////////////////////////////////////////////
function GuiButton(
    in_pixelLeft,
    in_pixelTop,
    in_pixelRight,
    in_pixelBottom,
    in_text,
    in_callbackFunction)
{
    if (!(this instanceof GuiButton))
	alert("GuiButton: call constuctor with new keyword");
    this.m_draw = true;
    this.m_box = new GuiBox(
	in_pixelLeft,
	in_pixelTop,
	in_pixelRight,
	in_pixelBottom);
    this.m_text = new GuiText(
	(in_pixelLeft + in_pixelRight) * 0.5,
	(in_pixelTop + in_pixelBottom) * 0.5,
	in_text,
	s_defaultTextFont);
    this.m_callbackFunction = in_callbackFunction;
    this.m_selected = false;
    this.m_fillStyleSelected = "#289b0a";
    this.m_fillStyleSelectedDown = "#ea9a00";
    this.m_fillStyleUnselected = "#000000";
}

GuiButton.prototype.Input = function()
{
    this.m_selected = this.m_box.Hit(g_mouseX, g_mouseY);
    if ((true == this.m_selected)
	    && ((false == g_mouseDown) && (true == g_mouseEdge)))
    {
	if (null != this.m_callbackFunction)
	    this.m_callbackFunction.Run(this);
    }
};

GuiButton.prototype.Draw = function()
{
    if (false == this.m_draw)
	return;
    if (true == this.m_selected)
    {
	if (g_mouseDown)
	    this.m_box.m_fillStyle = this.m_fillStyleSelectedDown;
	else
	    this.m_box.m_fillStyle = this.m_fillStyleSelected;
    }
    else
	this.m_box.m_fillStyle = this.m_fillStyleUnselected;
    this.m_box.Draw();
    this.m_text.Draw();
};

function ButtonToggleFactory(
    in_value,
    in_name,
    in_left,
    in_top,
    in_right,
    in_bottom)
{
    var callback = {};
    callback.m_value = in_value;
    callback.Run = function(in_button)
    {
	this.m_value.m_value ^= true;
	if (true == this.m_value.m_value)
	{
	    in_button.m_fillStyleUnselected = "#0000FF";
	    in_button.m_fillStyleSelected = "#289bFF";

	}
	else
	{
	    in_button.m_fillStyleUnselected = "#000000";
	    in_button.m_fillStyleSelected = "#289b0a";
	}
    };
    return new GuiButton(
	in_left,
	in_top,
	in_right,
	in_bottom,
	in_name,
	callback);
}