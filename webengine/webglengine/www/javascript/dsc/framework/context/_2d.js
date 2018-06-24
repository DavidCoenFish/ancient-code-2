DSC.Framework.Context_2D = function(in_canvas)
{
	if ( !(this instanceof DSC.Framework.Context_2D) )
		alert("DSC.Framework.Context_2D: call constuctor with new keyword");

	this.m_context = in_canvas.getContext('2d');
	if (undefined == this.m_context)
	{
		throw "get 2d context failed";
	}

	this.m_canvas = in_canvas;
	this.m_viewportFrame = DSC.Math.Frame.FactoryRaw(0, 0, in_canvas.width, in_canvas.height);
	this.m_uniformCollection = DSC.Framework.Context.Uniform.Collection.FactoryContext();
	this.m_vertexTransformHint = undefined;

	return;
}

DSC.Framework.Context_2D.prototype.Begin = function()
{
	this.m_context.save();
}

DSC.Framework.Context_2D.prototype.End = function()
{
	this.m_context.restore();
}

DSC.Framework.Context_2D.prototype.SetStyle = function(_colour)
{
	if (!this.m_context)
		return;
	if (undefined == _colour)
		_colour = DSC.Math.Colour.s_black;

	var stringFill = DSC.Math.Colour.ToStringFill(_colour);
	this.m_context.fillStyle = stringFill;
	this.m_context.strokeStyle = stringFill;
	this.m_context.globalAlpha = DSC.Math.Colour.GetAlpha(_colour);
}

DSC.Framework.Context_2D.prototype.Clear = function(_colour)
{
	if (!this.m_context)
		return;

	if (undefined != _colour)
	{
		this.m_context.save();
		this.SetStyle(_colour);
		this.m_context.fillRect(
			0,
			0,
			this.m_canvas.width,
			this.m_canvas.height
			);
		this.m_context.restore();
	}

	return;
}

DSC.Framework.Context_2D.prototype.SetViewport = function(in_originX, in_originY, in_sizeX, in_sizeY)
{
	if (!this.m_context)
		return;

	DSC.Math.Frame.SetRaw(this.m_viewportFrame, in_originX, in_originY, in_sizeX, in_sizeY);

	this.m_context.beginPath();
	this.m_context.rect(in_originX, this.m_canvas.height - in_originY, in_sizeX, -in_sizeY);
	this.m_context.closePath();
	this.m_context.clip();

	return;
}

DSC.Framework.Context_2D.prototype.GetViewport = function(_frame) //return frame
{
	return DSC.Math.Frame.Clone(_frame, this.m_viewportFrame);
}

DSC.Framework.Context_2D.prototype.SetUniform = function(in_name, in_value)
{
	this.m_uniformCollection.SetUniform(in_name, in_value);
}

DSC.Framework.Context_2D.prototype.AddContextListener = function()
{
	//NOP
}

DSC.Framework.Context_2D.prototype.RemoveContextListener = function()
{
	//NOP
}

DSC.Framework.Context_2D.prototype.InitModel = function(in_model)
{
	//NOP
}
DSC.Framework.Context_2D.prototype.InitShader = function(in_shader)
{
	//NOP
}
DSC.Framework.Context_2D.prototype.InitTexture = function(in_texture)
{
	//NOP
}
DSC.Framework.Context_2D.prototype.InitRenderTarget = function(in_renderTarget)
{
	//NOP
}

DSC.Framework.Context_2D.prototype.ApplyCamera = function(in_camera)
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

DSC.Framework.Context_2D.prototype.ApplyMaterial = function(in_material)
{
	var colour = in_material.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_colour);
	this.SetStyle(colour);
	this.m_vertexTransformHint = in_material.m_vertexTransformHint;
}

DSC.Framework.Context_2D.prototype.DrawModel = function(in_model, _start, _count)
{
	this.SubDrawModelPre(in_model);
	this.SubDrawModel(in_model, _start, _count);
	this.SubDrawModelPost(in_model);
}

DSC.Framework.Context_2D.prototype.SubDrawModelPre = function(in_model)
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

DSC.Framework.Context_2D.prototype.SubDrawModel = function(in_model, _start, _count)
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

DSC.Framework.Context_2D.prototype.SubDrawLine = function(in_model, in_offset)
{
	if (undefined == DSC.Framework.Context_2D.s_tempVector2a)
		DSC.Framework.Context_2D.s_tempVector2a = DSC.Math.Vector2.FactoryRaw();

	if (undefined == DSC.Framework.Context_2D.s_tempVector2b)
		DSC.Framework.Context_2D.s_tempVector2b = DSC.Math.Vector2.FactoryRaw();

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

	if (!this.GetScreenCoords(DSC.Framework.Context_2D.s_tempVector2a, positionDataStream, dataIndex0) ||
		!this.GetScreenCoords(DSC.Framework.Context_2D.s_tempVector2b, positionDataStream, dataIndex1))
	{
		return;
	}

	this.m_context.moveTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2a)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2b),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2b)
		);

	return;
}

DSC.Framework.Context_2D.prototype.SubDrawTriangle = function(in_model, in_offset)
{
	if (undefined == DSC.Framework.Context_2D.s_tempVector2a)
		DSC.Framework.Context_2D.s_tempVector2a = DSC.Math.Vector2.FactoryRaw();

	if (undefined == DSC.Framework.Context_2D.s_tempVector2b)
		DSC.Framework.Context_2D.s_tempVector2b = DSC.Math.Vector2.FactoryRaw();
	
	if (undefined == DSC.Framework.Context_2D.s_tempVector2c)
		DSC.Framework.Context_2D.s_tempVector2c = DSC.Math.Vector2.FactoryRaw();

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

	if (!this.GetScreenCoords(DSC.Framework.Context_2D.s_tempVector2a, positionDataStream, dataIndex0) ||
		!this.GetScreenCoords(DSC.Framework.Context_2D.s_tempVector2b, positionDataStream, dataIndex1) ||
		!this.GetScreenCoords(DSC.Framework.Context_2D.s_tempVector2c, positionDataStream, dataIndex2))
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
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2a)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2b),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2b)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2c),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2c)
		);
	this.m_context.lineTo(
		DSC.Math.Vector2.GetX(DSC.Framework.Context_2D.s_tempVector2a),
		DSC.Math.Vector2.GetY(DSC.Framework.Context_2D.s_tempVector2a)
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

DSC.Framework.Context_2D.prototype.GetScreenCoords = function(inout_vector2, in_dataStream, in_dataIndex)
{
	if (undefined == DSC.Framework.Context_2D.s_tempVertex)
		DSC.Framework.Context_2D.s_tempVertex = DSC.Math.Vector4.FactoryRaw();

	//gather value
	DSC.Math.Vector3.SetRaw(DSC.Framework.Context_2D.s_tempVertex, 0.0, 0.0, 0.0);
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
		DSC.Framework.Context_2D.s_tempVertex[index] = value; 
	}

	switch (this.m_vertexTransformHint)
	{
	default:
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T2D:
		var value0 = (DSC.Framework.Context_2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
		var value1 = (DSC.Framework.Context_2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]
		inout_vector2[0] = this.m_viewportFrame[0] + (value0 * this.m_viewportFrame[2]); 
		inout_vector2[1] = this.m_viewportFrame[1] + (value1 * this.m_viewportFrame[3]); 
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame:
		var frame = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_frame);
		if (undefined != frame)
		{
			var value0 = frame[0] + (DSC.Framework.Context_2D.s_tempVertex[0] * frame[2]);
			var value1 = frame[1] + (DSC.Framework.Context_2D.s_tempVertex[1] * frame[3]);
			value0 = (value0 * 0.5) + 0.5; //normalise to [0 ... 1]
			value1 = (value1 * 0.5) + 0.5; //normalise to [0 ... 1]
			inout_vector2[0] = this.m_viewportFrame[0] + (value0 * this.m_viewportFrame[2]); 
			inout_vector2[1] = this.m_viewportFrame[1] + (value1 * this.m_viewportFrame[3]); 
		}
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3D:
		var transform = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixMVP);
		if (undefined != transform)
		{
			DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(DSC.Framework.Context_2D.s_tempVertex, transform, DSC.Framework.Context_2D.s_tempVertex[0], DSC.Framework.Context_2D.s_tempVertex[1], DSC.Framework.Context_2D.s_tempVertex[2]);
			if ((DSC.Framework.Context_2D.s_tempVertex[2] <= -1) || 
				(1.0 <= DSC.Framework.Context_2D.s_tempVertex[2]))
				return false;

			var value0 = (DSC.Framework.Context_2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
			var value1 = (DSC.Framework.Context_2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]
			inout_vector2[0] = this.m_viewportFrame[0] + (value0 * this.m_viewportFrame[2]); 
			inout_vector2[1] = this.m_viewportFrame[1] + (value1 * this.m_viewportFrame[3]); 
		}
		break;
	case DSC.Framework.Asset.Material.s_vertexTransformHint.T3DFrame:
		var frame = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_frame);
		if (undefined != frame)
		{
			DSC.Framework.Context_2D.s_tempVertex[0] = frame[0] + (DSC.Framework.Context_2D.s_tempVertex[0] * frame[2]);
			DSC.Framework.Context_2D.s_tempVertex[1] = frame[1] + (DSC.Framework.Context_2D.s_tempVertex[1] * frame[3]);
		}

		var transform = this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixMVP);
		if (undefined != transform)
		{
			DSC.Math.Matrix4.MultiplyPointPerspectiveDivide(DSC.Framework.Context_2D.s_tempVertex, transform, DSC.Framework.Context_2D.s_tempVertex[0], DSC.Framework.Context_2D.s_tempVertex[1], DSC.Framework.Context_2D.s_tempVertex[2]);
			if ((DSC.Framework.Context_2D.s_tempVertex[2] <= -1) || 
				(1.0 <= DSC.Framework.Context_2D.s_tempVertex[2]))
				return false;
		}

		var value0 = (DSC.Framework.Context_2D.s_tempVertex[0] * 0.5) + 0.5; //normalise to [0 ... 1]
		var value1 = (DSC.Framework.Context_2D.s_tempVertex[1] * 0.5) + 0.5; //normalise to [0 ... 1]
		inout_vector2[0] = this.m_viewportFrame[0] + (value0 * this.m_viewportFrame[2]); 
		inout_vector2[1] = this.m_viewportFrame[1] + (value1 * this.m_viewportFrame[3]); 

		break;
	}

	inout_vector2[1] = this.m_canvas.height - inout_vector2[1];

	return true;
}

DSC.Framework.Context_2D.prototype.SubDrawModelPost = function(in_model)
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

DSC.Framework.Context_2D.prototype.AddContextListener = function(in_listener)
{
	return;
}

DSC.Framework.Context_2D.prototype.RemoveContextListener = function(in_listener)
{
	return;
}

DSC.Framework.Context_2D.prototype.SupportsExtention = function(in_extentionName)
{
	return false;
}

DSC.Framework.Context_2D.FactoryRaw = function(in_canvas)
{
	return new DSC.Framework.Context_2D(in_canvas);
}
