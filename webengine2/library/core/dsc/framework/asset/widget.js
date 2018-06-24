DSC.Framework.Asset.Widget = function(in_mapData, in_model)
{
	if ( !(this instanceof DSC.Framework.Asset.Widget) )
		alert("DSC.Framework.Asset.Widget: call constuctor with new keyword");

	this.m_mapData = in_mapData;
	this.m_model = in_model;

	return;
}

DSC.Framework.Asset.Widget.s_key = 
{
	"TPannel" : 0,
	"TArrowLeft" : 1,
	"TArrowRight" : 2,
	"TArrowUp" : 3,
	"TArrowDown" : 4,
	"TCircle" : 5,
	"TSmallCircle" : 6,
}

/*
context has the current viewport
	draw relative to the clip space of the context viewport. 
	for 3d, this will be (-1.0 ... 1.0) on xy? plane after matrix transform
*/
DSC.Framework.Asset.Widget.prototype.Draw = function(in_context, in_key, in_offsetX, in_offsetY, in_glyphWidth, in_glyphHeight)
{
	if ((0 == in_glyphHeight) || (0 == in_glyphWidth))
		return;
	
	if (!(in_key in this.m_mapData))
		return;

	in_context.SubDrawModelPre(this.m_model);

	var data = this.m_mapData[in_key];

	DSC.Math.Frame.SetRaw(DSC.Framework.Asset.Widget.s_transform, in_offsetX, in_offsetY, in_glyphWidth, in_glyphHeight)
	in_context.SetUniform(DSC.Framework.Context.Uniform.Collection.s_frame, DSC.Framework.Asset.Widget.s_transform, true);

	in_context.SubDrawModel(this.m_model, data.m_drawElementStart, data.m_drawElementCount);
	in_context.SubDrawModelPost(this.m_model);

	return;
}


DSC.Framework.Asset.Widget.FactoryRaw = function(in_mapData, in_model)
{
	return new DSC.Framework.Asset.Widget(in_mapData, in_model);
}
