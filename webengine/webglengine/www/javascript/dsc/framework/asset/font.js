DSC.Framework.Asset.Font = function(in_mapLetterData, in_model, in_material, _align)
{
	if ( !(this instanceof DSC.Framework.Asset.Font) )
		alert("DSC.Framework.Asset.Font: call constuctor with new keyword");

	this.m_mapLetterData = in_mapLetterData;
	this.m_model = in_model;
	this.m_material = in_material;
	this.m_align = (undefined == _align) ? DSC.Framework.Asset.Font.s_align.e_topLeft : _align;

	return;
}

DSC.Framework.Asset.Font.s_align = 
{
	e_topLeft : 0,
	e_topCenter : 1
};

DSC.Framework.Asset.Font.prototype.Measure = function(_result2, in_string, in_glyphWidth, in_glyphHeight)
{
	if (undefined == _result2)
		_result2 = DSC.Math.Vector2.FactoryRaw();

	var traceY = 0.0;
	var traceX = 0.0;
	var maxTraceX = 0.0;

	for (var index = 0; index < in_string.length; index++)
	{
		var char = in_string.charAt(index);
		if (!(char in this.m_mapLetterData))
		{
			char = undefined;
		}
		var letterData = this.m_mapLetterData[char];
		if (true == letterData.m_newLine)
		{
			traceY -= in_glyphHeight;
			traceX = 0.0;
		}
		else 
		{
			traceX += (letterData.m_width / 255) * in_glyphWidth;
			maxTraceX = Math.max(maxTraceX, traceX);
		}
	}

	_result2[0] = maxTraceX;
	_result2[1] = traceY;

	return _result2;
}


/*
context has the current viewport
	draw relative to the clip space of the context viewport. 
	for 3d, this will be (-1.0 ... 1.0) on xy? plane after matrix transform
*/
DSC.Framework.Asset.Font.prototype.Draw = function(in_context, in_string, in_offsetX, in_offsetY, in_glyphWidth, in_glyphHeight)
{
	if ((0 == in_string.length) || (0 == in_glyphHeight) || (0 == in_glyphWidth))
		return;
	
	if (undefined == DSC.Framework.Asset.Font.s_transform)
		DSC.Framework.Asset.Font.s_transform = DSC.Math.Frame.FactoryRaw();

	in_context.ApplyMaterial(this.m_material);

	DSC.Math.Frame.SetSizeX(DSC.Framework.Asset.Font.s_transform, in_glyphWidth);
	DSC.Math.Frame.SetSizeY(DSC.Framework.Asset.Font.s_transform, in_glyphHeight);

	in_context.SubDrawModelPre(this.m_model);

	var traceXInit = 0.0;
	var traceYInit = -in_glyphHeight;

	switch (this.m_align)
	{
	default:
	case DSC.Framework.Asset.Font.s_align.e_topLeft:
		break;
	case DSC.Framework.Asset.Font.s_align.e_topCenter:
		this.m_origin = this.Measure(this.m_origin, in_string, in_glyphWidth, in_glyphHeight);
		traceXInit = (-(this.m_origin[0] * 0.5));
		break;
	}

	var traceY = traceYInit;
	var traceX = traceXInit;
	for (var index = 0; index < in_string.length; index++)
	{
		var char = in_string.charAt(index);
		if (!(char in this.m_mapLetterData))
		{
			char = undefined;
			//continue;
		}
		var letterData = this.m_mapLetterData[char];
		if (true == letterData.m_newLine)
		{
			traceY -= in_glyphHeight;
			traceX = traceXInit;
		}
		else if (0 == letterData.m_drawElementCount)
		{
			traceX += (letterData.m_width / 255) * in_glyphWidth;
		}
		else
		{
			DSC.Math.Frame.SetOriginX(DSC.Framework.Asset.Font.s_transform, in_offsetX + traceX);
			DSC.Math.Frame.SetOriginY(DSC.Framework.Asset.Font.s_transform, in_offsetY + traceY);

			in_context.SetUniform(DSC.Framework.Context.Uniform.Collection.s_frame, DSC.Framework.Asset.Font.s_transform, true);
			in_context.SubDrawModel(this.m_model, letterData.m_drawElementStart, letterData.m_drawElementCount);

			traceX += (letterData.m_width / 255) * in_glyphWidth;
		}
	}

	in_context.SubDrawModelPost(this.m_model);

	return;
}


DSC.Framework.Asset.Font.FactoryRaw = function(in_mapLetterData, in_model, in_material, _align)
{
	return new DSC.Framework.Asset.Font(in_mapLetterData, in_model, in_material, _align);
}
