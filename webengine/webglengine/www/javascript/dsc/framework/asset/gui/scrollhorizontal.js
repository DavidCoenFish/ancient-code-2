/*
_callbackTarget interface
	CallbackGetSize() //return 0 .. 1.0
	CallbackGetRatio() //return 0 .. 1.0
	CallbackSetRatio(in_ratio)
	CallbackStepValue(in_mag, in_timeButtonDown, in_tickDelta)
*/

DSC.Framework.Asset.Gui.ScrollHorizontal = function(
	_buttonLeft,
	_buttonRight,
	_buttonKnot,
	_pannelKnot,
	_callbackTarget, 
	_coordinateOrigin, 
	_coordinateSize
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.ScrollHorizontal) )
		alert("Gui.ScrollHorizontal: call constuctor with new keyword");	

	this.m_buttonLeft = _buttonLeft;
	this.m_buttonRight = _buttonRight;
	this.m_buttonKnot = _buttonKnot;
	this.m_pannelKnot = _pannelKnot;
	this.m_callbackTarget = _callbackTarget;
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;

	if (this.m_buttonLeft)
	{
		var that = this;
		this.m_buttonLeft.m_callbackTarget = {
			CallbackDown : function(in_ratioX, in_ratioY)
			{
				if ((that.m_callbackTarget) &&
					("CallbackStepValue" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackStepValue(-1, 0, 0);
				}
			},
			CallbackHeld : function(in_totalTime, in_currentTimeDelta)
			{
				if ((that.m_callbackTarget) &&
					("CallbackStepValue" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackStepValue(-1, in_totalTime, in_currentTimeDelta);
				}
			}
		};
	}
	if (this.m_buttonRight)
	{
		var that = this;
		this.m_buttonRight.m_callbackTarget = {
			CallbackDown : function(in_ratioX, in_ratioY)
			{
				if ((that.m_callbackTarget) &&
					("CallbackStepValue" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackStepValue(1, 0, 0);
				}
			},
			CallbackHeld : function(in_totalTime, in_currentTimeDelta)
			{
				if ((that.m_callbackTarget) &&
					("CallbackStepValue" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackStepValue(1, in_totalTime, in_currentTimeDelta);
				}
			}
		};
	}
	if (this.m_buttonKnot)
	{
		var that = this;
		this.m_buttonKnot.m_callbackTarget = {
			CallbackDown : function(in_ratioX, in_ratioY)
			{
				if ((that.m_callbackTarget) &&
					("CallbackSetRatio" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackSetRatio(in_ratioX);
				}
			},
			CallbackDrag : function(in_ratioX, in_ratioY)
			{
				if ((that.m_callbackTarget) &&
					("CallbackSetRatio" in that.m_callbackTarget))
				{
					that.m_callbackTarget.CallbackSetRatio(in_ratioX);
				}
			},
		};
	}
}

DSC.Framework.Asset.Gui.ScrollHorizontal.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	var context = in_framework.m_context;

	this.m_frame = DSC.Math.Frame.CalculateFrame(this.m_frame, in_originX, in_originY, in_sizeX, in_sizeY, this.m_coordinateOrigin, this.m_coordinateSize);

	if (this.m_callbackTarget)
	{
		var size = 0.05;
		if ("CallbackGetSize" in this.m_callbackTarget)
			size = Math.max(size, this.m_callbackTarget.CallbackGetSize());
		var ratio = 0.0;
		if ("CallbackGetRatio" in this.m_callbackTarget)
			ratio = this.m_callbackTarget.CallbackGetRatio();

		this.m_pannelKnot.m_coordinateSize.m_percentageX = size;
		this.m_pannelKnot.m_coordinateOrigin.m_percentageX = (ratio * (1.0 - size));
	}

	if (undefined != this.m_buttonKnot)
	{
		this.m_buttonKnot.Run(in_framework, this.m_frame[0], this.m_frame[1], this.m_frame[2], this.m_frame[3], _timeDelta, in_mapMaterial);
	}
	if (undefined != this.m_buttonLeft)
	{
		this.m_buttonLeft.Run(in_framework, this.m_frame[0], this.m_frame[1], this.m_frame[2], this.m_frame[3], _timeDelta, in_mapMaterial);
	}
	if (undefined != this.m_buttonRight)
	{
		this.m_buttonRight.Run(in_framework, this.m_frame[0], this.m_frame[1], this.m_frame[2], this.m_frame[3], _timeDelta, in_mapMaterial);
	}

	return;
}

DSC.Framework.Asset.Gui.ScrollHorizontal.FactoryFramework = function(
	in_framework,
	in_widgetName, 
	_callbackTarget, 
	_coordinateOrigin, 
	_coordinateSize
	)
{
	var buttonLeft = DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Math.Coordinate.FactoryRaw(0.0, 0.0), 
		DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY),
		undefined
		);
	buttonLeft.Add(
		DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TPannel,
			DSC.Framework.Asset.Gui.s_state.e_static,
			DSC.Framework.Asset.Gui.s_subState.e_background
			)
		);
	buttonLeft.Add(
		DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TArrowLeft,
			DSC.Framework.Asset.Gui.s_state.e_default,
			DSC.Framework.Asset.Gui.s_subState.e_foreground
			)
		);

	var buttonRight = DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Math.Coordinate.FactoryRaw(-1.0, -1.0, DSC.Math.Coordinate.s_percentageType.e_useAxisYTop), 
		DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY),
		undefined
		);
	buttonRight.Add(
		DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TPannel,
			DSC.Framework.Asset.Gui.s_state.e_static,
			DSC.Framework.Asset.Gui.s_subState.e_background
			)
		);
	buttonRight.Add(
		DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TArrowRight,
			DSC.Framework.Asset.Gui.s_state.e_default,
			DSC.Framework.Asset.Gui.s_subState.e_foreground
			)
		);

	var buttonKnot = DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Math.Coordinate.FactoryRaw(1.0, 0.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY), 
		DSC.Math.Coordinate.FactoryRaw(-2.0, 0.0, DSC.Math.Coordinate.s_percentageType.e_useAxisYTop),
		undefined
		);
	buttonKnot.Add(
		DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TPannel,
			DSC.Framework.Asset.Gui.s_state.e_static,
			DSC.Framework.Asset.Gui.s_subState.e_background
			)
		);
	var pannelKnot = DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
			in_framework, 
			in_widgetName, 
			DSC.Framework.Asset.Widget.s_key.TPannel,
			DSC.Framework.Asset.Gui.s_state.e_default,
			DSC.Framework.Asset.Gui.s_subState.e_foreground,
			DSC.Math.Coordinate.FactoryRaw(0.1, 0.0), 
			DSC.Math.Coordinate.FactoryRaw(0.1, 1.0)
			)
	buttonKnot.Add(pannelKnot);

	return DSC.Framework.Asset.Gui.ScrollHorizontal.FactoryRaw(
		buttonLeft,
		buttonRight,
		buttonKnot,
		pannelKnot,
		_callbackTarget, 
		_coordinateOrigin, 
		_coordinateSize
		);
}

DSC.Framework.Asset.Gui.ScrollHorizontal.FactoryRaw = function(
	_buttonLeft,
	_buttonRight,
	_buttonKnot,
	_pannelKnot,
	_callbackTarget, 
	_coordinateOrigin, 
	_coordinateSize
	)
{
	return new DSC.Framework.Asset.Gui.ScrollHorizontal(
		_buttonLeft,
		_buttonRight,
		_buttonKnot,
		_pannelKnot,
		_callbackTarget, 
		_coordinateOrigin, 
		_coordinateSize
		);
}
