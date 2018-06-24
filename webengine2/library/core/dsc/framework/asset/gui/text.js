DSC.Framework.Asset.Gui.Text = function(
	in_font, 
	in_state, 
	in_subState,
	_text, 
	_coordinateOrigin, 
	_coordinateGlyphSize
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Text) )
		alert("Gui.Text: call constuctor with new keyword");	

	this.m_font = in_font;
	this.m_state = in_state;
	this.m_subState = in_subState;
	this.m_text = (undefined == _text) ? "" : _text;
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateGlyphSize = _coordinateGlyphSize;
}

DSC.Framework.Asset.Gui.Text.prototype.SetState = function(in_state, _subStateFilter)
{
	if ((undefined == _subStateFilter) || (_subStateFilter == this.m_subState))
		this.m_state = in_state;
}

DSC.Framework.Asset.Gui.Text.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	if ("" == this.m_text)
		return;

	if (!(this.m_state in in_mapMaterial))
		return;

	var originX = (undefined == this.m_coordinateOrigin) ? in_originX : this.m_coordinateOrigin.CalculateX(in_originX, in_originY, in_sizeX, in_sizeY);
	var originY = (undefined == this.m_coordinateOrigin) ? in_originY : this.m_coordinateOrigin.CalculateY(in_originX, in_originY, in_sizeX, in_sizeY);
	var sizeX = (undefined == this.m_coordinateGlyphSize) ? 20 : this.m_coordinateGlyphSize.CalculateSizeX(in_sizeX, in_sizeY);
	var sizeY = (undefined == this.m_coordinateGlyphSize) ? 20 : this.m_coordinateGlyphSize.CalculateSizeY(in_sizeX, in_sizeY);

	var context = in_framework.m_context;

	DSC.Framework.Asset.Gui.s_viewport = context.GetViewport(DSC.Framework.Asset.Gui.s_viewport);
	this.m_frame = DSC.Math.Frame.CalculateClipFrame(
		this.m_frame, 
		DSC.Framework.Asset.Gui.s_viewport, 
		originX,
		originY,
		sizeX,
		sizeY
		);
	var material = in_mapMaterial[this.m_state][this.m_subState];

	this.m_font.m_material = material;
	this.m_font.Draw(context, this.m_text, this.m_frame[0], this.m_frame[1], this.m_frame[2], this.m_frame[3]);
}

DSC.Framework.Asset.Gui.Text.FactoryRaw = function(
	in_font, 
	in_state, 
	in_subState,
	_text, 
	_coordinateOrigin, 
	_coordinateGlyphSize
	)
{
	return new DSC.Framework.Asset.Gui.Text(
		in_font, 
		in_state, 
		in_subState,
		_text, 
		_coordinateOrigin, 
		_coordinateGlyphSize	
		);
}
