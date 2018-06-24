//DSC.Framework.Asset.Types.Font = {};
//DSC.Framework.Asset.Types.Font.GetName = function()
//{
//	return "Font";
//}

/**
 * @private
 * @constructor
 * @param {!number} in_mapLetterData
 * @param {!number=} in_model
 * @param {!number=} in_material
 * @param {!DSC.Framework.Asset.Font.s_align=} _align
 */
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

/**
 * @const
 * @enum {number}
 */
DSC.Framework.Asset.Font.s_align = 
{
	e_topLeft : 0,
	e_topCenter : 1
};
DSC.Framework.Asset.Font['s_align'] = DSC.Framework.Asset.Font.s_align;
DSC.Framework.Asset.Font.s_align['e_topLeft'] = DSC.Framework.Asset.Font.s_align.e_topLeft;
DSC.Framework.Asset.Font.s_align['e_topCenter'] = DSC.Framework.Asset.Font.s_align.e_topCenter;

/**
 * @param {!number} in_mapLetterData
 * @param {!number=} in_model
 * @param {!number=} in_material
 * @param {!DSC.Framework.Asset.Font.s_align=} _align
 * @return {!DSC.Framework.Asset.Font}
 */
DSC.Framework.Asset.Font.Factory = function(in_mapLetterData, in_model, in_material, _align)
{
	return new DSC.Framework.Asset.Font(in_mapLetterData, in_model, in_material, _align);
}

/**
 * @param {!string} in_string
 * @param {!number} in_glyphWidth
 * @param {!number} in_glyphHeight
 * @param {!DSC.Math.Vector2Type=} _result2
 */
DSC.Framework.Asset.Font.prototype.Measure = function(in_string, in_glyphWidth, in_glyphHeight, _result2)
{
	if (undefined == _result2)
		_result2 = DSC.Math.Vector2.Factory();

	var traceY = 0.0;
	var traceX = 0.0;
	var maxTraceX = 0.0;

	for (var index = 0; index < in_string.length; index++)
	{
		var charactor = in_string.charAt(index);
		if (!(charactor in this.m_mapLetterData))
		{
			charactor = undefined;
		}
		var letterData = this.m_mapLetterData[charactor];
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
DSC.Framework.Asset.Font.prototype['Measure'] = DSC.Framework.Asset.Font.prototype.Measure;


/*
context has the current viewport
	draw relative to the clip space of the context viewport. 
	for 3d, this will be (-1.0 ... 1.0) on xy? plane after matrix transform
*/

/**
 * @param {!DSC.Framework.Context} in_context
 * @param {!string} in_string
 * @param {!DSC.Math.Vector2Type} in_location
 * @param {!number} in_glyphWidth
 * @param {!number} in_glyphHeight
 */
DSC.Framework.Asset.Font.prototype.Draw = function(in_context, in_string, in_location, in_glyphWidth, in_glyphHeight)
{
	if ((0 == in_string.length) || (0 == in_glyphHeight) || (0 == in_glyphWidth))
		return;
	
	if (undefined == DSC.Framework.Asset.Font.prototype.Draw.s_transform)
	{
		DSC.Framework.Asset.Font.prototype.Draw.s_transform = DSC.Math.Bound2.Factory();
	}
	DSC.Math.Bound2.Set(DSC.Framework.Asset.Font.prototype.Draw.s_transform, 0.0, 0.0, in_glyphWidth, in_glyphHeight);

	//in_context.ApplyMaterial(this.m_material);
	in_context.SubDrawModelPre(this.m_model);

	var traceXInit = 0.0;
	var traceYInit = -in_glyphHeight;

	switch (this.m_align)
	{
	default:
	case DSC.Framework.Asset.Font.s_align.e_topLeft:
		break;
	case DSC.Framework.Asset.Font.s_align.e_topCenter:
		DSC.Framework.Asset.Font.prototype.Draw.s_origin = this.Measure(in_string, in_glyphWidth, in_glyphHeight, DSC.Framework.Asset.Font.prototype.Draw.s_origin);
		traceXInit = (-(DSC.Math.Vector2.GetX(DSC.Framework.Asset.Font.prototype.Draw.s_origin) * 0.5));
		break;
	}

	var traceY = traceYInit;
	var traceX = traceXInit;
	for (var index = 0; index < in_string.length; index++)
	{
		var charactor = in_string.charAt(index);
		if (!(charactor in this.m_mapLetterData))
		{
			charactor = undefined;
			//continue;
		}
		var letterData = this.m_mapLetterData[charactor];
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
			DSC.Math.Bound2.SetLowX(DSC.Framework.Asset.Font.prototype.Draw.s_transform, traceX + DSC.Math.Vector2.GetX(in_location));
			DSC.Math.Bound2.SetLowY(DSC.Framework.Asset.Font.prototype.Draw.s_transform, traceY + DSC.Math.Vector2.GetY(in_location));

			in_context.SetUniform(DSC.Framework.Context.Uniform.Collection.s_frame, DSC.Framework.Asset.Font.prototype.Draw.s_transform, true);
			in_context.SubDrawModel(this.m_model, letterData.m_drawElementStart, letterData.m_drawElementCount);

			traceX += (letterData.m_width / 255) * in_glyphWidth;
		}
	}

	in_context.SubDrawModelPost(this.m_model);

	return;
}
DSC.Framework.Asset.Font.prototype['Draw'] = DSC.Framework.Asset.Font.prototype.Draw;

DSC.Framework.Asset.Font.prototype.GetMaterial = function()
{
	return this.m_material;
}
DSC.Framework.Asset.Font.prototype['GetMaterial'] = DSC.Framework.Asset.Font.prototype.GetMaterial;
