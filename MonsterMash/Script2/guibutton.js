/////////////////////////////////////////////////////////////////////////////////////////
//class BUTTON
/////////////////////////////////////////////////////////////////////////////////////////
function GuiButton(in_shape, in_guiText, in_callbackFunction)
{
	if (!(this instanceof GuiButton))
		alert("GuiButton: call constuctor with new keyword");

	var m_input = true;
	var m_draw = true;

	var m_guiText = in_guiText;
	var m_shape = in_shape;

	var m_callbackFunction = in_callbackFunction;

	var s_stateEnum = {
		"TNone" : 0,
		"TUnderTouch" : 1, // mouse over and button down, or touch down on
		// button
		"TUnderMouse" : 2, // mouse over
	};

	var m_state = s_stateEnum.TNone;

	var m_strokeStyle = "#900000";
	var m_strokeThickness = 1.0;
	var m_fillStyle = [];
	m_fillStyle[s_stateEnum.TNone] = "#ea9a00";
	m_fillStyle[s_stateEnum.TUnderTouch] = "#289b0a";
	m_fillStyle[s_stateEnum.TUnderMouse] = "#000000";

	this.Input = function(in_input)
	{
		if (false == m_input)
			return;
		m_state = s_stateEnum.TNone;
		// TODO
	};

	this.Draw = function(in_canvas, in_context)
	{
		if (false == m_draw)
			return;
		m_shape.DrawFill(in_canvas, in_context, m_fillStyle[m_state]);
		m_shape.DrawOutline(in_canvas, in_context, m_strokeStyle, m_strokeThickness);
		m_guiText.Draw(in_canvas, in_context, "#FF0000");
	};

	this.SetFillStyleNone = function(in_fillStyle)
	{
		m_fillStyle[s_stateEnum.TNone] = in_fillStyle;
	};
	this.SetFillStyleUnderTouch = function(in_fillStyle)
	{
		m_fillStyle[s_stateEnum.TUnderTouch] = in_fillStyle;
	};
	this.SetFillStyleUnderMouse = function(in_fillStyle)
	{
		m_fillStyle[s_stateEnum.TUnderMouse] = in_fillStyle;
	};
}

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
			in_button.SetFillStyleNone("#0000FF");
			in_button.SetFillStyleUnderTouch("#289bFF");
		}
		else
		{
			in_button.SetFillStyleNone("#000000");
			in_button.SetFillStyleUnderTouch("#289b0a");
		}
	};
	return ButtonFactory(
		callback,
		in_name,
		in_left,
		in_top,
		in_right,
		in_bottom
		);
}

function ButtonFactory(
	in_callback,
	in_name,
	in_left,
	in_top,
	in_right,
	in_bottom
	)
{
	var origin = new Vector((in_left + in_right) * 0.5, (in_top + in_bottom) * 0.5);

	var box = new Box(
		origin,
		in_right - in_left, 
		in_bottom - in_top
		);
	var guiText = new GuiText(
		origin,
		in_name, 
		GuiText.s_fontDefault,
		GuiText.s_alignCenter,
		GuiText.s_baselineMiddle
		);
	
	return new GuiButton(
		box,
		guiText,
		in_callback
		);
}



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
			return "Fail:GuiButton";
		return "Pass:GuiButton";
	};

	g_arrayUnitTest.push(out_object);
}