/*
	a 'disk' menu (pie)

	inner space content (title - text, user name - password,...)
		on rollover of slice, slice can put content into inner space
	slice
	mode [full screen, minimised]
	icon // what we display when we are minimised/ used as slice
	//position

	-> one class does one thing
		don't use menu as [fullscreen, minimised, slice content]
		make different class for each?
		this is the 'Menu disk' which starts as full screen

	->change to a gui type interface
*/

Task.LQMockMenu00.Menu = function(
	_coordinateOrigin,
	_coordinateSize,
	_content,
	_arrayDrawable
	)
{
	if ( !(this instanceof Task.LQMockMenu00.Menu) )
		alert("Task.LQMockMenu00.Menu: call constuctor with new keyword");	

	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_content = _content;
	this.m_contentActive = false;
	this.m_arrayDrawable = (undefined == _arrayDrawable) ? [] : _arrayDrawable;
}

//Task.LQMockMenu00.Menu.State = 
//{
//	TFullScreen : 0,
//	TMinimised : 1,
//	TUnfocused : 2, // still on screen but around object not activated in view
//}


Task.LQMockMenu00.Menu.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	this.m_frame = DSC.Math.Frame.CalculateFrame(this.m_frame, in_originX, in_originY, in_sizeX, in_sizeY, this.m_coordinateOrigin, this.m_coordinateSize);

	var that = this;
	this.m_arrayDrawable.forEach(function(drawable)
	{
		drawable.Run(
			in_framework,
			that.m_frame[0],
			that.m_frame[1],
			that.m_frame[2],
			that.m_frame[3], 
			_timeDelta,
			in_mapMaterial
			);
	});

	return;
}

Task.LQMockMenu00.Menu.prototype.RemoveFromGui = function(in_gui)
{
	in_gui.GetRoot().Remove(this.m_guiCollection);
}

Task.LQMockMenu00.Menu.Factory = function(
	in_framework, 
	in_widgetName,
	in_offsetScreenPercentage,
	in_radiusYPercentage,
	_content,
	_arraySlice
	)
{
	var coordinateOrigin = DSC.Math.Coordinate.FactoryRaw(
		in_offsetScreenPercentage[0] - (in_radiusYPercentage * 0.5), 
		in_offsetScreenPercentage[1] - (in_radiusYPercentage * 0.5), 
		DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter
		);

	var coordinateSize = DSC.Math.Coordinate.FactoryRaw(
		in_radiusYPercentage, 
		in_radiusYPercentage, 
		DSC.Math.Coordinate.s_percentageType.e_useAxisY
		);

	var arrayDrawable = [];

	//add something to represent disk
	arrayDrawable.push(
		DSC.Framework.Asset.Gui.Drawable.FactoryRaw(
			in_framework.m_asset.GetModel("Ring00", in_framework.m_context), 
			DSC.Framework.Asset.Gui.s_state.e_static,
			DSC.Framework.Asset.Gui.s_subState.e_background
			)
		//DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
		//	in_framework, 
		//	in_widgetName, 
		//	DSC.Framework.Asset.Widget.s_key.TCircle,
		//	DSC.Framework.Asset.Gui.s_state.e_static,
		//	DSC.Framework.Asset.Gui.s_subState.e_background
		//	)
		);
			
	if (undefined != _arraySlice)
	{
		_arraySlice.forEach( function(slice)
		{
			arrayDrawable.push(slice);
		});
	}

	return Task.LQMockMenu00.Menu.FactoryRaw(
		coordinateOrigin,
		coordinateSize,
		_content,
		arrayDrawable
		);
}


Task.LQMockMenu00.Menu.FactoryRaw = function(
	_coordinateOrigin,
	_coordinateSize,
	_content,
	_arrayDrawable
	)
{
	return new Task.LQMockMenu00.Menu(
		_coordinateOrigin,
		_coordinateSize,
		_content,
		_arrayDrawable
		);
}
