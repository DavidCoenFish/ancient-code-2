DSC.Framework.Asset.Gui.Drawable = function(
	in_model, 
	in_state, 
	in_subState, 
	_coordinateOrigin, 
	_coordinateSize,
	_stateMask,
	_modelDrawStart,
	_modelDrawEnd
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Drawable) )
		alert("Gui.Drawable: call constuctor with new keyword");	

	this.m_model = in_model;
	this.m_state = in_state;
	this.m_subState = in_subState;
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_stateMask = _stateMask;
	this.m_modelDrawStart = _modelDrawStart;
	this.m_modelDrawEnd = _modelDrawEnd;
	return;
}

DSC.Framework.Asset.Gui.Drawable.prototype.SetState = function(in_state, _subStateFilter)
{
	if ((undefined == _subStateFilter) || (_subStateFilter == this.m_subState))
		this.m_state = in_state;
}

DSC.Framework.Asset.Gui.Drawable.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	if ((undefined != this.m_stateMask) &&
		(this.m_stateMask == this.m_state))
		return;
		
	if (!(this.m_state in in_mapMaterial))
		return;

	var context = in_framework.m_context;
	this.m_frame1 = DSC.Math.Frame.CalculateFrame(this.m_frame1, in_originX, in_originY, in_sizeX, in_sizeY, this.m_coordinateOrigin, this.m_coordinateSize);
	DSC.Framework.Asset.Gui.s_viewport = context.GetViewport(DSC.Framework.Asset.Gui.s_viewport);
	this.m_frame2 = DSC.Math.Frame.CalculateClipFrame(
		this.m_frame2, 
		DSC.Framework.Asset.Gui.s_viewport, 
		this.m_frame1[0],
		this.m_frame1[1],
		this.m_frame1[2],
		this.m_frame1[3]
		);

	var material = in_mapMaterial[this.m_state][this.m_subState];

	context.ApplyMaterial(material);
	context.SetUniform(DSC.Framework.Context.Uniform.Collection.s_frame, this.m_frame2, true);

	if ((undefined == this.m_modelDrawStart) ||
		(undefined == this.m_modelDrawEnd))
	{
		context.DrawModel(this.m_model);
	}
	else
	{
		context.SubDrawModelPre(this.m_model);
		context.SubDrawModel(this.m_model, this.m_modelDrawStart, this.m_modelDrawEnd);
		context.SubDrawModelPost(this.m_model);
	}

	return;
}

//DSC.Framework.Asset.Gui.Drawable.FactoryModelPanel = function(in_framework)
//{
//	if (undefined != in_framework.m_asset)
//		return in_framework.m_asset.GetModel("QuadAPos2");
//	return undefined;
//}

DSC.Framework.Asset.Gui.Drawable.FactoryWidget = function(
	in_framework, 
	in_widgetName, 
	in_key,
	in_state, 
	in_subState, 
	_coordinateOrigin, 
	_coordinateSize,
	_stateMask
	)
{
	if (undefined == in_framework.m_asset)
		return undefined;

	var widget = in_framework.m_asset.GetWidget(in_widgetName, in_framework.m_context);
	if ((undefined == widget) ||
		(undefined == widget.m_model))
		return undefined;

	if (!(in_key in widget.m_mapData))
		return undefined;
	var data = widget.m_mapData[in_key];

	return DSC.Framework.Asset.Gui.Drawable.FactoryRaw(
		widget.m_model,
		in_state, 
		in_subState, 
		_coordinateOrigin, 
		_coordinateSize,
		_stateMask,
		data.m_drawElementStart,
		data.m_drawElementCount	
		);
}


DSC.Framework.Asset.Gui.Drawable.FactoryRaw = function(
	in_model, 
	in_state, 
	in_subState, 
	_coordinateOrigin, 
	_coordinateSize,
	_stateMask,
	_modelDrawStart,
	_modelDrawEnd
	)
{
	return new DSC.Framework.Asset.Gui.Drawable(
		in_model, 
		in_state, 
		in_subState, 
		_coordinateOrigin, 
		_coordinateSize,
		_stateMask,
		_modelDrawStart,
		_modelDrawEnd
		);
}
