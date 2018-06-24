//textAlign = left, right, center, start, end
//textBaseline = top, hanging, middle, alphabetic, ideographic, bottom

function GuiText(in_origin, in_text, in_font, in_align, in_baseline)
{
	if (!(this instanceof GuiText))
		alert("GuiText: call constuctor with new keyword");
	var m_origin = in_origin.Clone();
	var m_text = in_text;
	var m_draw = true;
	var m_font = in_font || GuiText.s_defaultFont;
	var m_align = in_align || GuiText.s_alignCenter;
	var m_baseline = in_baseline || GuiText.s_baselineMiddle;

	this.Draw = function(in_canvas, in_context, in_fillStyle)
	{
		if (false == m_draw)
			return;
		in_context.font = m_font;
		in_context.textAlign = m_align;
		in_context.textBaseline = m_baseline;
		in_context.fillStyle = in_fillStyle;
		in_context.fillText(m_text, m_origin.m_x, m_origin.m_y);
	};
	
	this.SetText = function(in_text)
	{
		m_text = in_text;
	};
}

GuiText.s_fontDefault = "16px sans-serif";
GuiText.s_fontSmall = "12px sans-serif";

GuiText.s_alignLeft = "left";
GuiText.s_alignRight = "right";
GuiText.s_alignCenter = "center";
GuiText.s_alignStart = "start";
GuiText.s_alignEnd = "end";

GuiText.s_baselineTop = "top";
GuiText.s_baselineHanging = "hanging";
GuiText.s_baselineMiddle = "middle";
GuiText.s_baselineAlphabetic = "alphabetic";
GuiText.s_baselineIdeographic = "ideographic";
GuiText.s_baselineBottom = "bottom";

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:GuiText";
		return "Pass:GuiText";
	};

	g_arrayUnitTest.push(out_object);
}