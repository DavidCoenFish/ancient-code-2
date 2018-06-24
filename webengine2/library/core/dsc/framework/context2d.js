/**
 * @constructor
 * @implements {DSC.Framework.Context}
 * @param {!object} in_canvas
 * @param {!object=} _paramObject
 */
DSC.Framework.Context2D = function(in_canvas, _paramObject)
{
	if ( !(this instanceof DSC.Framework.Context2D) )
		alert("DSC.Framework.Context2D: call constuctor with new keyword");

	this.m_context = in_canvas.getContext('2d');
	if (undefined == this.m_context)
	{
		throw "get 2d context failed";
	}

	this.m_canvas = in_canvas;
	this.m_viewportBounds = DSC.Math.Bound2.Factory(0.0, 0.0, in_canvas.width, in_canvas.height);
	this.m_uniformCollection = DSC.Framework.Context.Uniform.Collection.FactoryContext();
	this.m_vertexTransformHint = undefined;

	return;
}

/**
 * @param {!object} in_canvas
 * @param {!object=} _paramObject
 * @return {DSC.Framework.Context2D}
 */
DSC.Framework.Context2D.Factory = function(in_canvas, _paramObject)
{
	return new DSC.Framework.Context2D(in_canvas, _paramObject);
}


/**
 * @param {!DSC.Math.Bound2.Factory=) _frame
 * @return {!DSC.Math.Bound2.Factory)
 */
DSC.Framework.Context2D.prototype.GetViewport = function(_frame) //return frame
{
	return this.m_viewportBounds.Clone(_frame);
}
DSC.Framework.Context2D.prototype['GetViewport'] = DSC.Framework.Context2D.prototype.GetViewport;


/**
 * @param {!number} in_lowX
 * @param {!number} in_lowY
 * @param {!number} in_highX
 * @param {!number} in_highY
 */
DSC.Framework.Context2D.prototype.SetViewport = function(in_lowX, in_lowY, in_highX, in_highY)
{
	if (undefined == this.m_context)
	{
		return;
	}

	DSC.Math.Bound2.Set(this.m_viewportBounds, in_lowX, in_lowY, in_highX, in_highY);

	this.m_context.beginPath();
	this.m_context.rect(in_lowX, in_lowY, in_highX - in_lowX, in_highY - in_lowY);
	this.m_context.closePath();
	this.m_context.clip();

	return;
}
DSC.Framework.Context2D.prototype['SetViewport'] = DSC.Framework.Context2D.prototype.SetViewport;


/**
 * @param {!(DSC.Math.ColourRGB|DSC.Math.ColourRGBA)=} _colour
 * @param {!number=} _depth
 * @param {!number=} _stencilValue
 */
DSC.Framework.Context2D.prototype.Clear = function(_colour, _depth, _stencilValue)
{
	if (!this.m_context)
		return;

	if (undefined != _colour)
	{
		var alpha = 1.0;
		if (undefined != _colour.GetAlpha)
		{
			alpha = _colour.GetAlpha();
		}

		this.m_context.save();
		this.SetStyle(_colour, undefined, alpha);
		this.m_context.fillRect(
			DSC.Math.Bound2.GetLowX(this.m_viewportBounds),
			DSC.Math.Bound2.GetLowY(this.m_viewportBounds),
			DSC.Math.Bound2.GetSizeX(this.m_viewportBounds),
			DSC.Math.Bound2.GetSizeY(this.m_viewportBounds)
			);
		this.m_context.restore();
	}

	return;
}
DSC.Framework.Context2D.prototype['Clear'] = DSC.Framework.Context2D.prototype.Clear;

/**
 * @param {!DSC.Math.Colour=} _colourFill
 * @param {!DSC.Math.Colour=} _colourStroke
 * @param {!number=} _alpha
 */
DSC.Framework.Context2D.prototype.SetStyle = function(_colourFill, _colourStroke, _alpha)
{
	if (!this.m_context)
		return;

	if (undefined != _colourFill)
	{
		var stringFill = DSC.Math.ColourRGB.AsFillString(_colourFill);
		this.m_context.fillStyle = stringFill;
	}

	if (undefined != _colourStroke)
	{
		var stringStroke = DSC.Math.ColourRGB.AsFillString(_colourStroke);
		this.m_context.strokeStyle = stringStroke;
	}

	if (undefined != _alpha)
	{
		this.m_context.globalAlpha = _alpha;
	}
}

/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.Context2D.prototype.AddContextListener = function(in_contextListener) {}
/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.Context2D.prototype.RemoveContextListener = function(in_contextListener) {}



DSC.Framework.Context2D.prototype.SetUniform = function(in_name, in_value)
{
	this.m_uniformCollection.SetUniform(in_name, in_value);
}

DSC.Framework.Context2D.prototype.AddContextListener = function()
{
	//NOP
}

DSC.Framework.Context2D.prototype.RemoveContextListener = function()
{
	//NOP
}

DSC.Framework.Context2D.prototype.InitModel = function(in_model)
{
	//NOP
}
DSC.Framework.Context2D.prototype.InitShader = function(in_shader)
{
	//NOP
}
DSC.Framework.Context2D.prototype.InitTexture = function(in_texture)
{
	//NOP
}
DSC.Framework.Context2D.prototype.InitRenderTarget = function(in_renderTarget)
{
	//NOP
}

DSC.Framework.Context2D.prototype.ApplyCamera = function(in_camera)
{
	this.m_uniformCollection.SetUniform(
		DSC.Framework.Context.Uniform.Collection.s_matrixProjection, 
		in_camera.GetMatrixProjection(this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixProjection))
		);
	this.m_uniformCollection.SetUniform(
		DSC.Framework.Context.Uniform.Collection.s_matrixView, 
		in_camera.GetMatrixView(this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixView))
		);
	return;
}

DSC.Framework.Context2D.prototype.ApplyMaterial = function(in_material)
{
	var colour = in_material.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_colour);
	this.SetStyle(colour);
	this.m_vertexTransformHint = in_material.m_vertexTransformHint;
}
DSC.Framework.Context2D.prototype['ApplyMaterial'] = DSC.Framework.Context2D.prototype.ApplyMaterial;


DSC.Framework.Context2D.prototype.DrawModel = function(in_model, _start, _count)
{
	this.SubDrawModelPre(in_model);
	this.SubDrawModel(in_model, _start, _count);
	this.SubDrawModelPost(in_model);
}
DSC.Framework.Context2D.prototype['DrawModel'] = DSC.Framework.Context2D.prototype.DrawModel;


DSC.Framework.Context2D.prototype.SubDrawModelPre = function(in_model)
{
	switch (in_model.m_mode)
	{
		default:
			break;
		case DSC.Framework.Context.WebGL.LINES:
			this.m_context.beginPath();
			break;
		case DSC.Framework.Context.WebGL.TRIANGLES:
		{
			switch (this.m_vertexTransformHint)
			{
			default:
				break;
			case DSC.Framework.Asset.Material.s_vertexTransformHint.T2D:
			case DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame:
				this.m_context.beginPath();
				break;
			}
		}
		break;
	}

	return;
}

DSC.Framework.Context2D.prototype.SubDrawModel = function(in_model, _start, _count)
{
	if (DSC.Framework.Asset.Material.s_vertexTransformHint.NoDraw == this.m_vertexTransformHint)
		return;

	var trace = (undefined == _start) ? 0 : _start;
	var end = (undefined == _count) ? in_model.m_elementCount : trace + _count;
	while (trace < end)
	{
		switch (in_model.m_mode)
		{
			default:
				return;
			case DSC.Framework.Context.WebGL.LINES:
				this.SubDrawLine(in_model, trace);
				trace += 2;
				break;
			case DSC.Framework.Context.WebGL.TRIANGLES:
				this.SubDrawTriangle(in_model, trace);
				trace += 3;
				break;
		}
	}

	return;
}

DSC.Framework.Context2D.prototype.SubDrawLine = function(in_model, in_offset)
{
	if (undefined == DSC.Framework.Context2D.s_tempVector2a)
		DSC.Framework.Context2D.s_tempVector2a = DSC.Math.Vector2.Factory();

	if (undefined == DSC.Framework.Context2D.s_tempVector2b)
		DSC.Framework.Context2D.s_tempVector2b = DSC.Math.Vector2.Factory();

	var positionDataStream = in_model.m_mapDataStream["a_position"];
	var step = positionDataStream.m_elementsPerVertex;
	var dataIndex0;
	var dataIndex1;
	if (in_model.m_elementIndex)
	{
		dataIndex0 = in_model.m_elementIndex[(in_offset + 0)] * step;
		dataIndex1 = in_model.m_elementIndex[(in_offset + 1)] * step;
	}
	else
	{
		dataIndex0 = (in_offset + 0) * step;
		dataIndex1 = (in_offset + 1) * step;
	}

	if (!this.GetScreenCoords(DSC.Framework.Context2D.s_tempVector2a, positionDataStream, dataIndex0) ||
		!this.GetScreenCoords(DSC.Framework.Context2D.s_tempVector2b, positionDataStream, dataIndex1))
	{
		return;
	}

	this.m_context.moveTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2a)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2b),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2b)
		);

	return;
}

DSC.Framework.Context2D.prototype.SubDrawTriangle = function(in_model, in_offset)
{
	if (undefined == DSC.Framework.Context2D.s_tempVector2a)
		DSC.Framework.Context2D.s_tempVector2a = DSC.Math.Vector2.Factory();

	if (undefined == DSC.Framework.Context2D.s_tempVector2b)
		DSC.Framework.Context2D.s_tempVector2b = DSC.Math.Vector2.Factory();
	
	if (undefined == DSC.Framework.Context2D.s_tempVector2c)
		DSC.Framework.Context2D.s_tempVector2c = DSC.Math.Vector2.Factory();

	var positionDataStream = in_model.m_mapDataStream["a_position"];
	var step = positionDataStream.m_elementsPerVertex;
	var dataIndex0;
	var dataIndex1;
	var dataIndex2;
	if (in_model.m_elementIndex)
	{
		dataIndex0 = in_model.m_elementIndex[(in_offset + 0)] * step;
		dataIndex1 = in_model.m_elementIndex[(in_offset + 1)] * step;
		dataIndex2 = in_model.m_elementIndex[(in_offset + 2)] * step;
	}
	else
	{
		dataIndex0 = (in_offset + 0) * step;
		dataIndex1 = (in_offset + 1) * step;
		dataIndex2 = (in_offset + 2) * step;
	}

	if (!this.GetScreenCoords(DSC.Framework.Context2D.s_tempVector2a, positionDataStream, dataIndex0) ||
		!this.GetScreenCoords(DSC.Framework.Context2D.s_tempVector2b, positionDataStream, dataIndex1) ||
		!this.GetScreenCoords(DSC.Framework.Context2D.s_tempVector2c, positionDataStream, dataIndex2))
	{
		return;
	}

	switch (this.m_vertexTransformHint)
	{
	default:
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3D:
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3DFrame:
		this.m_context.beginPath();
		break;
	}

	this.m_context.moveTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2a)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2b),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2b)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2c),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2c)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context2D.s_tempVector2a)
		);

	switch (this.m_vertexTransformHint)
	{
	default:
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3D:
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3DFrame:
		this.m_context.closePath();
		this.m_context.fill();
		break;
	}

	return;
}

DSC.Framework.Context2D.prototype.GetScreenCoords = function(inout_vector2, in_dataStream, in_dataIndex)
{
	if (undefined == DSC.Framework.Context2D.s_tempVertex)
		DSC.Framework.Context2D.s_tempVertex = DSC.Math.Vector4.Factory();

	//gather value
	DSC.Math.Vector3.Set(DSC.Framework.Context2D.s_tempVertex, 0.0, 0.0, 0.0);
	var count = Math.min(3, in_dataStream.m_elementsPerVertex);
	var value = 0.0;
	for (var index = 0; index < count; ++index)
	{
		value = in_dataStream.m_arrayData[in_dataIndex + index];
		if (true == in_dataStream.m_normalise)
		{
			switch (in_dataStream.m_type)
			{
			default:
				break;
			case DSC.Framework.Context.WebGL.BYTE:
				value = (( 2.0 * value) + 1.0) / 255.0;
				break;
			case DSC.Framework.Context.WebGL.UNSIGNED_BYTE:
				value = value / 255.0;
				break;
			case DSC.Framework.Context.WebGL.SHORT:
				value = (( 2.0 * value) + 1.0) / 65535.0;
				break;
			case DSC.Framework.Context.WebGL.UNSIGNED_SHORT:
				value = value / 65535.0;
				break;
			case DSC.Framework.Context.WebGL.INT:
				value = (( 2.0 * value) + 1.0) / 4294967295.0;
				break;
			case DSC.Framework.Context.WebGL.UNSIGNED_INT:
				value = value / 4294967295.0;
				break;
			}
		}
		DSC.Framework.Context2D.s_tempVertex[index] = value; 
	}

	switch (this.m_vertexTransformHint)
	{
	default:
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T2D:
		var value0 = (DSC.Framework.Context2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
		var value1 = (DSC.Framework.Context2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]

		inout_vector2[0] = this.m_viewportBounds[0] + (value0 * this.m_viewportBounds[2]); 
		inout_vector2[1] = this.m_viewportBounds[1] + (value1 * this.m_viewportBounds[3]); 

		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame:
		var frame = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_frame);
		if (undefined != frame)
		{
			var value0 = frame[0] + (DSC.Framework.Context2D.s_tempVertex[0] * frame[2]);
			var value1 = frame[1] + (DSC.Framework.Context2D.s_tempVertex[1] * frame[3]);
			value0 = (value0 * 0.5) + 0.5; //normalise to [0 ... 1]
			value1 = (value1 * 0.5) + 0.5; //normalise to [0 ... 1]
			inout_vector2[0] = this.m_viewportBounds[0] + (value0 * this.m_viewportBounds[2]); 
			inout_vector2[1] = this.m_viewportBounds[1] + (value1 * this.m_viewportBounds[3]); 
		}
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3D:
		var transform = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixMVP);
		if (undefined != transform)
		{
			DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(DSC.Framework.Context2D.s_tempVertex, transform, DSC.Framework.Context2D.s_tempVertex[0], DSC.Framework.Context2D.s_tempVertex[1], DSC.Framework.Context2D.s_tempVertex[2]);
			if ((DSC.Framework.Context2D.s_tempVertex[2] <= -1) || 
				(1.0 <= DSC.Framework.Context2D.s_tempVertex[2]))
				return false;

			var value0 = (DSC.Framework.Context2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
			var value1 = (DSC.Framework.Context2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]
			inout_vector2[0] = this.m_viewportBounds[0] + (value0 * this.m_viewportBounds[2]); 
			inout_vector2[1] = this.m_viewportBounds[1] + (value1 * this.m_viewportBounds[3]); 
		}
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3DFrame:
		var frame = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_frame);
		if (undefined != frame)
		{
			DSC.Framework.Context2D.s_tempVertex[0] = frame[0] + (DSC.Framework.Context2D.s_tempVertex[0] * frame[2]);
			DSC.Framework.Context2D.s_tempVertex[1] = frame[1] + (DSC.Framework.Context2D.s_tempVertex[1] * frame[3]);
		}

		var transform = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixMVP);
		if (undefined != transform)
		{
			DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(DSC.Framework.Context2D.s_tempVertex, transform, DSC.Framework.Context2D.s_tempVertex[0], DSC.Framework.Context2D.s_tempVertex[1], DSC.Framework.Context2D.s_tempVertex[2]);
			if ((DSC.Framework.Context2D.s_tempVertex[2] <= -1) || 
				(1.0 <= DSC.Framework.Context2D.s_tempVertex[2]))
				return false;
		}

		var value0 = (DSC.Framework.Context2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
		var value1 = (DSC.Framework.Context2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]
		inout_vector2[0] = this.m_viewportBounds[0] + (value0 * this.m_viewportBounds[2]); 
		inout_vector2[1] = this.m_viewportBounds[1] + (value1 * this.m_viewportBounds[3]); 

		break;
	}

	inout_vector2[1] = this.m_canvas.height - inout_vector2[1];

	return true;
}

DSC.Framework.Context2D.prototype.SubDrawModelPost = function(in_model)
{
	switch (in_model.m_mode)
	{
	default:
		break;
	case DSC.Framework.Context.WebGL.LINES:
		this.m_context.closePath();
		this.m_context.stroke();
		break;
	case DSC.Framework.Context.WebGL.TRIANGLES:
		{
			switch (this.m_vertexTransformHint)
			{
			default:
				break;
			case DSC.Framework.Asset.Material.s_vertexTransformHint.T2D:
			case DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame:
				this.m_context.closePath();
				this.m_context.fill();
				break;
			}
		}
		break;
	}

	return;
}

DSC.Framework.Context2D.prototype.SupportsExtention = function(in_extentionName)
{
	return false;
}
