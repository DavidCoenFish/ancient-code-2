DSC.Framework.Asset.Gui.Slider = function(
	in_lable,
	in_text,
	in_scrollHorizontal,
	in_dngValue,
	in_minimumValue,
	in_maximumValue,
	in_stepValue,
	_coordinateOrigin, 
	_coordinateSize,
	_loopValue
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Slider) )
		alert("Gui.Slider: call constuctor with new keyword");	

	this.m_lable = in_lable;
	this.m_text = in_text;
	this.m_scrollHorizontal = in_scrollHorizontal;
	this.m_dngValue = in_dngValue;
	this.m_minimumValue = in_minimumValue;
	this.m_maximumValue = in_maximumValue;
	this.m_stepValue = in_stepValue;
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_scrollHorizontal.m_callbackTarget = this;
	this.m_loopValue = _loopValue;

	return;
}

DSC.Framework.Asset.Gui.Slider.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	this.m_frame = DSC.Math.Frame.CalculateFrame(this.m_frame, in_originX, in_originY, in_sizeX, in_sizeY, this.m_coordinateOrigin, this.m_coordinateSize);

	this.m_scrollHorizontal.Run(
		in_framework,
		this.m_frame[0],
		this.m_frame[1],
		this.m_frame[2],
		this.m_frame[3], 
		_timeDelta,
		in_mapMaterial
		);
	this.m_text.m_text = this.m_lable + String(this.m_dngValue.GetValue().toFixed(3));
	this.m_text.Run(
		in_framework,
		this.m_frame[0],
		this.m_frame[1],
		this.m_frame[2],
		this.m_frame[3], 
		_timeDelta,
		in_mapMaterial
		);
}

DSC.Framework.Asset.Gui.Slider.prototype.CallbackGetSize = function()
{
	var length = this.m_maximumValue - this.m_minimumValue;
	if (0 != length)
	{
		return this.m_stepValue / length;
	}
	return 0.05;
}

DSC.Framework.Asset.Gui.Slider.prototype.CallbackGetRatio = function()
{
	var length = this.m_maximumValue - this.m_minimumValue;
	if (0 != length)
	{
		return (this.m_dngValue.GetValue() - this.m_minimumValue) / length;
	}
	return 0.5;
}

DSC.Framework.Asset.Gui.Slider.prototype.CallbackSetRatio = function(in_ratio)
{
	var ratio;
	if (this.m_loopValue)
	{
		ratio = DSC.Math.Wrap(in_ratio, 0.0, 1.0);
	}
	else
	{
		ratio = DSC.Math.Clamp(in_ratio, 0.0, 1.0);
	}
	this.m_dngValue.SetValue(DSC.Math.Lerp(this.m_minimumValue, this.m_maximumValue, ratio));
	return;
}

DSC.Framework.Asset.Gui.Slider.prototype.CallbackStepValue = function(in_mag, in_timeButtonDown, in_tickDelta)
{
	var ratio = this.CallbackGetRatio();
	var step = 1.0;
	var length = this.m_maximumValue - this.m_minimumValue;
	if (0 != length)
	{
		step = this.m_stepValue / length;
	}
	if (0.0 == in_timeButtonDown)
	{
		ratio += (step * in_mag);
	}
	else if (0.5 < in_timeButtonDown)
	{
		ratio += (step * 4.0 * in_mag * in_timeButtonDown * in_tickDelta);
	}
	this.CallbackSetRatio(ratio);
	return;
}

//in_framework
DSC.Framework.Asset.Gui.Slider.FactoryWidget = function(
	in_framework,
	in_lable,
	in_fontName, 
	in_widgetName, 
	in_dngValue,
	in_minimumValue,
	in_maximumValue,
	in_stepValue,
	_coordinateOrigin, 
	_coordinateSize,
	_loopValue
	)
{	
	var font = in_framework.m_asset.GetFont(in_fontName, in_framework.m_context);
	var text = DSC.Framework.Asset.Gui.Text.FactoryRaw(
		font, 
		DSC.Framework.Asset.Gui.s_state.e_static, 
		DSC.Framework.Asset.Gui.s_subState.e_foreground,
		in_lable, 
		DSC.Math.Coordinate.FactoryRaw(0.3, 0.3, DSC.Math.Coordinate.s_percentageType.e_useAxisY), 
		DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY)
		);

	var scrollHorizontal = DSC.Framework.Asset.Gui.ScrollHorizontal.FactoryFramework(
		in_framework,
		in_widgetName, 
		undefined, 
		undefined, 
		DSC.Math.Coordinate.FactoryRaw(1.0, 0.3)
		);

	return DSC.Framework.Asset.Gui.Slider.FactoryRaw(
		in_lable,
		text,
		scrollHorizontal,
		in_dngValue,
		in_minimumValue,
		in_maximumValue,
		in_stepValue,
		_coordinateOrigin, 
		_coordinateSize,
		_loopValue
		);
}

//in_framework
DSC.Framework.Asset.Gui.Slider.FactoryRaw = function(
	in_lable,
	in_text,
	in_scrollHorizontal,
	in_dngValue,
	in_minimumValue,
	in_maximumValue,
	in_stepValue,
	_coordinateOrigin, 
	_coordinateSize,
	_loopValue
	)
{
	return new DSC.Framework.Asset.Gui.Slider(
		in_lable,
		in_text,
		in_scrollHorizontal,
		in_dngValue,
		in_minimumValue,
		in_maximumValue,
		in_stepValue,
		_coordinateOrigin, 
		_coordinateSize,
		_loopValue
		);
}
