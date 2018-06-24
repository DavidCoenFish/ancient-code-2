DSC.Framework.Asset.Gui.Collection = function(_coordinateOrigin, _coordinateSize)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Collection) )
		alert("Gui.Collection: call constuctor with new keyword");	

	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_arrayDrawable = [];
}

DSC.Framework.Asset.Gui.Collection.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
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
}

DSC.Framework.Asset.Gui.Collection.prototype.SetState = function(in_state)
{
	this.m_arrayDrawable.forEach(function(drawable)
	{
		drawable.SetState(in_state);
	});
}

DSC.Framework.Asset.Gui.Collection.prototype.Add = function(in_drawable)
{
	if (undefined != in_drawable)
		this.m_arrayDrawable.push(in_drawable);
}

DSC.Framework.Asset.Gui.Collection.prototype.Remove = function(in_drawable)
{
	var index = this.m_arrayDrawable.indexOf(in_drawable);
	if (-1 == index)
		return;
	this.m_arrayDrawable.splice(index, 1);
}

DSC.Framework.Asset.Gui.Collection.FactoryRaw = function(_coordinateOrigin, _coordinateSize)
{
	return new DSC.Framework.Asset.Gui.Collection(_coordinateOrigin, _coordinateSize);
}
