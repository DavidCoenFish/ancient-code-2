/*
*/
Task.LQMockMenu00.Menu.Slice = function(
	in_isRolledOverDNG,
	_coordinateOrigin,
	_coordinateSize,
	_arrayDrawable,
	_pieAngleDegrees,
	_scaleDefault,
	_scaleRollover
	)
{
	if ( !(this instanceof Task.LQMockMenu00.Menu.Slice) )
		alert("Task.LQMockMenu00.Menu.Slice: call constuctor with new keyword");	

	this.m_isRolledOverDNG = in_isRolledOverDNG;
	//we do not apply these coordinates to te frame on run, they are used by certain children that scale
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_arrayDrawable = (undefined == _arrayDrawable) ? [] : _arrayDrawable;
	this.m_pieAngleDegrees = (undefined == _pieAngleDegrees) ? 1.0 : _pieAngleDegrees;

	this.m_scaleDefault = (undefined == _scaleDefault) ? 0.25 : _scaleDefault;
	this.m_scaleRollover = (undefined == _scaleRollover) ? 0.4 : _scaleRollover;
	this.m_lerpRatio = 0.0; //not rolled over to rolled over ratio

	this.UpdateScale(this.m_scaleDefault);
}

Task.LQMockMenu00.Menu.Slice.s_action = 
{
	TNavigation : 0,
	TDismiss : 1,
	TBack : 2,
	TDataButton : 3,  //invoke a function based on data
	TNavigationData : 4,  //invoke a function based on data and navigate...
}

Task.LQMockMenu00.Menu.Slice.prototype.UpdateScale = function(in_scale)
{
	this.m_coordinateOrigin.m_percentageX = Math.cos(Math.PI * this.m_pieAngleDegrees / 180.0) * 0.7 - (in_scale / 2.0);
	this.m_coordinateOrigin.m_percentageY = Math.sin(Math.PI * this.m_pieAngleDegrees / 180.0) * 0.7 - (in_scale / 2.0);
	this.m_coordinateSize.m_percentageX = in_scale;
	this.m_coordinateSize.m_percentageY = in_scale;
}

Task.LQMockMenu00.Menu.Slice.prototype.TickScale = function(_timeDelta)
{
	var over = this.m_isRolledOverDNG.GetValue();
	if (over && (1.0 != this.m_lerpRatio))
	{
		this.m_lerpRatio = Math.min(1.0, this.m_lerpRatio + (5.0 * _timeDelta));
	}
	else if (!over && (0.0 != this.m_lerpRatio))
	{
		this.m_lerpRatio = Math.max(0.0, this.m_lerpRatio - (5.0 * _timeDelta));
	}
	else
	{ 
		return;
	}
	this.m_scale = DSC.Math.Lerp(this.m_scaleDefault, this.m_scaleRollover, DSC.Math.Smooth(this.m_lerpRatio));
	this.UpdateScale(this.m_scale);
}

Task.LQMockMenu00.Menu.Slice.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	this.TickScale(_timeDelta);

	var that = this;
	this.m_arrayDrawable.forEach(function(drawable)
	{
		drawable.Run(
			in_framework,
			in_originX, 
			in_originY, 
			in_sizeX, 
			in_sizeY,
			_timeDelta,
			in_mapMaterial
			);
	});
}

Task.LQMockMenu00.Menu.Slice.Factory = function(
	in_framework, 
	in_widgetName,
	_rolloverText,
	_callbackClickAction,
	_pieAngleDegrees,
	_callbackFunction,
	_scaleDefault,
	_scaleRollover
	)
{
	var coordinateOrigin = DSC.Math.Coordinate.FactoryRaw(
		undefined, undefined,
		DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter
		);
	var coordinateSize = DSC.Math.Coordinate.FactoryRaw();
	var isRolledOverDNG = DSC.DNG.Node.FactoryRaw(false);

	var rolloverText = DSC.Framework.Asset.Gui.Text.FactoryRaw(
		in_framework.m_asset.NewFont("AngiesNewHouse", in_framework.m_context, { m_align : DSC.Framework.Asset.Font.s_align.e_topCenter }), 
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Framework.Asset.Gui.s_subState.e_foreground,
		_rolloverText,
		DSC.Math.Coordinate.FactoryRaw(0.0, 0.0),
		DSC.Math.Coordinate.FactoryRaw(1.0, 1.0)	
		);

	var arrayDrawable = [];
	//add a button for the incomming container

	var collection = DSC.Framework.Asset.Gui.Collection.FactoryRaw(
		DSC.Math.Coordinate.FactoryRaw(
			Math.cos(Math.PI * _pieAngleDegrees / 180.0) * 0.7 - 0.1, 
			Math.sin(Math.PI * _pieAngleDegrees / 180.0) * 0.7 - 0.2,
			DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter
			), 
		DSC.Math.Coordinate.FactoryRaw(0.2, 0.2)	
		);
	collection.Add(rolloverText);

	arrayDrawable.push(DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		coordinateOrigin, 
		coordinateSize,
		{	
			CallbackUp : function(in_ratioX, in_ratioY)
			{
				if (undefined != _callbackFunction)
				{
					_callbackFunction();
				}
			},
			CallbackOver : function(in_ratioX, in_ratioY, in_over)
			{
				if (isRolledOverDNG.GetValue() != in_over)
				{
					isRolledOverDNG.SetValue(in_over);
					if (in_over)
					{
						rolloverText.SetState(DSC.Framework.Asset.Gui.s_state.e_over);
					}
					else
					{
						rolloverText.SetState(DSC.Framework.Asset.Gui.s_state.e_default);
					}
				}
			}
		},
		[
			DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
				in_framework, 
				"SimpleGui", 
				DSC.Framework.Asset.Widget.s_key.TCircle,
				DSC.Framework.Asset.Gui.s_state.e_default,
				DSC.Framework.Asset.Gui.s_subState.e_background
				),
			DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
				in_framework, 
				"SimpleGui", 
				DSC.Framework.Asset.Widget.s_key.TSmallCircle,
				DSC.Framework.Asset.Gui.s_state.e_default,
				DSC.Framework.Asset.Gui.s_subState.e_foreground
				),
		]
		));
	arrayDrawable.push(collection);

	return Task.LQMockMenu00.Menu.Slice.FactoryRaw(
		isRolledOverDNG,
		coordinateOrigin,
		coordinateSize,
		arrayDrawable,
		_pieAngleDegrees,
		_scaleDefault,
		_scaleRollover
		);
}

Task.LQMockMenu00.Menu.Slice.FactoryRaw = function(
	in_isRolledOverDNG,
	_coordinateOrigin,
	_coordinateSize,
	_arrayDrawable,
	_pieAngleDegrees,
	_scaleDefault,
	_scaleRollover
	)
{
	return new Task.LQMockMenu00.Menu.Slice(
		in_isRolledOverDNG,
		_coordinateOrigin,
		_coordinateSize,
		_arrayDrawable,
		_pieAngleDegrees,
		_scaleDefault,
		_scaleRollover
		);
}
