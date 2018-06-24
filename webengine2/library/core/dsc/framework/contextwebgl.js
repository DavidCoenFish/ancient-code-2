/**
 * @private
 * @constructor
 * @struct
 * @implements {DSC.Framework.Context}
 * @this {!DSC.Framework.ContextWebGL}
 * @param {!object} in_canvas
 * @param {!object=} _paramObject
 */
DSC.Framework.ContextWebGL = function(in_canvas, _paramObject)
{
	if ( !(this instanceof DSC.Framework.ContextWebGL) )
		alert("DSC.Framework.ContextWebGL: call constuctor with new keyword");

	this.m_canvas = in_canvas;
	this.m_webGL = undefined;
	this.m_paramObject = _paramObject;
	this.m_arrayContextListener = [];
	this.m_viewportBounds = DSC.Math.Bound2.Factory(0.0, 0.0, in_canvas.width, in_canvas.height);

	this.m_uniformCollection = DSC.Framework.Context.Uniform.Collection.FactoryContext();

	var context = this;
	this.m_canvas.addEventListener("webglcontextlost", function(in_event){ context.ContextLostCallback(in_event); }, false);
	this.m_canvas.addEventListener("webglcontextrestored", function(in_event){ context.ContextRestoredCallback(in_event); }, false);
	
	this.SetupWebGL();

	return;
}

/**
 * @param {!object) in_canvas
 * @param {!object=) _paramObject
 * @return {DSC.Framework.ContextWebGL}
 */
DSC.Framework.ContextWebGL.Factory = function(in_canvas, _paramObject)
{
	return new DSC.Framework.ContextWebGL(in_canvas, _paramObject);
}


/**
 * @param {!number} in_lowX
 * @param {!number} in_lowY
 * @param {!number} in_highX
 * @param {!number} in_highY
 */
DSC.Framework.ContextWebGL.prototype.SetViewport = function(in_lowX, in_lowY, in_highX, in_highY)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.SetViewport(in_lowX, in_lowY, in_highX, in_highY);
	DSC.Math.Bound2.Set(this.m_viewportBounds, in_lowX, in_lowY, in_highX, in_highY);
	return;
}
DSC.Framework.ContextWebGL.prototype['SetViewport'] = DSC.Framework.ContextWebGL.prototype.SetViewport;


/**
 * @param {!DSC.Math.Bound2.Factory=) _frame
 * @return {!DSC.Math.Bound2.Factory)
 */
DSC.Framework.ContextWebGL.prototype.GetViewport = function(_frame) //return frame
{
	return DSC.Math.Bound2.Clone(this.m_viewportBounds, _frame);
}
DSC.Framework.ContextWebGL.prototype['GetViewport'] = DSC.Framework.ContextWebGL.prototype.GetViewport;


/**
 * @param {!(DSC.Math.ColourRGB|DSC.Math.ColourRGBA)=} _colour
 * @param {!number=} _depth
 * @param {!number=} _stencilValue
 */
DSC.Framework.ContextWebGL.prototype.Clear = function(_colour, _depth, _stencilValue)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.Clear(_colour, _depth, _stencilValue);

	return;
}
DSC.Framework.ContextWebGL.prototype['Clear'] = DSC.Framework.ContextWebGL.prototype.Clear;


/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.ContextWebGL.prototype.AddContextListener = function(in_contextListener) 
{
	this.m_arrayContextListener.push(in_contextListener);
	return;
}

/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.ContextWebGL.prototype.RemoveContextListener = function(in_contextListener)
{
	var index = this.m_arrayContextListener.indexOf(in_contextListener);
	if (-1 < index)
		this.m_arrayContextListener.splice(index, 1);

	return;
}

DSC.Framework.ContextWebGL.prototype.InitModel = function(in_model)
{
	in_model.Init(this.m_webGL);
	return;
}


/**
 * @private
 */
DSC.Framework.ContextWebGL.prototype.SetupWebGL = function() 
{
	this.m_webGL = undefined;
	this.m_webGL = DSC.Framework.Context.WebGL.Factory(this.m_canvas, this.m_paramObject);

	this.GetViewport();

	return;
}

/**
 * @private
 */
DSC.Framework.ContextWebGL.prototype.ContextLostCallback = function(in_event)
{
	this.m_webGL = undefined;
	in_event.preventDefault();
	DSC.Framework.CancelAnimationFrame();

	//visit all context lost listeners
	this.m_arrayContextListener.forEach( function(item)
	{
		item.OnContextLost();		
	});	

	return;
}

/**
 * @private
 */
DSC.Framework.ContextWebGL.prototype.ContextRestoredCallback = function(in_event) 
{
	this.SetupWebGL();

	//visit all context lost listeners
	var context = this;
	this.m_arrayContextListener.forEach( function(item)
	{
		item.OnContextRestored(context);		
	});	

	DSC.Framework.RequestAnimationFrame();

	return;
}




//so, do we update the shader uniform?
DSC.Framework.ContextWebGL.prototype.SetUniform = function(in_name, in_value, _updateCurrentShader)
{
	if (_updateCurrentShader)
	{
		var webGL = this.m_webGL;
		if (webGL && webGL.m_material)
			webGL.m_material.m_shader.ApplyUniform(webGL, in_name, in_value);
	}
	else
	{
		this.m_uniformCollection.SetUniform(in_name, in_value);
	}
}
DSC.Framework.ContextWebGL.prototype['SetUniform'] = DSC.Framework.ContextWebGL.prototype.SetUniform;



DSC.Framework.ContextWebGL.prototype.InitShader = function(in_shader)
{
	in_shader.Init(this.m_webGL);
	return;
}

DSC.Framework.ContextWebGL.prototype.InitTexture = function(in_texture)
{
	in_texture.Init(this.m_webGL);
	return;
}

DSC.Framework.ContextWebGL.prototype.InitRenderTarget = function(in_renderTarget)
{
	in_renderTarget.Init(this.m_webGL);
	return;
}

DSC.Framework.ContextWebGL.prototype.ApplyRenderTarget = function(in_renderTarget)
{	
	DSC.Framework.Asset.RenderTarget.Apply(this.m_webGL, in_renderTarget);
	return;
}
DSC.Framework.ContextWebGL.prototype['ApplyRenderTarget'] = DSC.Framework.ContextWebGL.prototype.ApplyRenderTarget;

DSC.Framework.ContextWebGL.prototype.ApplyCamera = function(in_camera)
{
	this.m_uniformCollection.SetUniform(
		DSC.Framework.Context.Uniform.Collection.s_matrixProjection, 
		in_camera.GetMatrixProjection(this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixProjection))
		);
	this.m_uniformCollection.SetUniform(
		DSC.Framework.Context.Uniform.Collection.s_matrixView, 
		in_camera.GetMatrixView(this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_matrixView))
		);
	this.m_uniformCollection.SetUniform(
		DSC.Framework.Context.Uniform.Collection.s_projection, 
		in_camera.GetProjection(this.m_uniformCollection.GetUniform(DSC.Framework.Context.Uniform.Collection.s_projection))
		);
	return;
}
DSC.Framework.ContextWebGL.prototype['ApplyCamera'] = DSC.Framework.ContextWebGL.prototype.ApplyCamera;

DSC.Framework.ContextWebGL.prototype.ApplyMaterial = function(in_material)
{
	var webGL = this.m_webGL;

	if (undefined == in_material.m_shader)
	{
		alert("DSC.Framework.ContextWebGL.ApplyMaterial: shader required for webgl codepath");
		undefined();
		return;
	}

	//uniforms
	in_material.m_shader.Apply(webGL, this.m_uniformCollection, in_material.m_uniformCollection);

	//texture
	if (in_material.m_textureArray)
	{
		for (var index = 0; index < in_material.m_textureArray.length; ++index)
		{
			var texture = in_material.m_textureArray[index];
			if (undefined == texture)
			{
				webGL.DeactivateTexture(index);
				continue;
			}
			texture.Activate(webGL, index);
			in_material.m_shader.ApplyUniform(webGL, DSC.Framework.Context.Uniform.Collection.s_sampler + index, index);
		}
	}

	// triangle cull
	if ((undefined == webGL.m_material) || 
		(in_material.m_triangleCull != webGL.m_material.m_triangleCull))
	{
		switch (in_material.m_triangleCull)
		{
		default:
		case DSC.Framework.Asset.Material.s_triangleCull.None:
			webGL.Enable(DSC.Framework.Context.WebGL.CULL_FACE, false);
			break;
		case DSC.Framework.Asset.Material.s_triangleCull.Front:
			webGL.Enable(DSC.Framework.Context.WebGL.CULL_FACE, true);
			webGL.CullFace(DSC.Framework.Context.WebGL.FRONT);
			break;
		case DSC.Framework.Asset.Material.s_triangleCull.Back:
			webGL.Enable(DSC.Framework.Context.WebGL.CULL_FACE, true);
			webGL.CullFace(DSC.Framework.Context.WebGL.BACK);
			break;
		case DSC.Framework.Asset.Material.s_triangleCull.FrontAndBack:
			webGL.Enable(DSC.Framework.Context.WebGL.CULL_FACE, true);
			webGL.CullFace(DSC.Framework.Context.WebGL.FRONT_AND_BACK);
			break;
		}
	}

	// triangle clockwise
	if ((undefined == webGL.m_material) || 
		(in_material.m_triangleClockwise != webGL.m_material.m_triangleClockwise))
	{
		if (in_material.m_triangleClockwise)
		{
			webGL.FrontFace(DSC.Framework.Context.WebGL.CW);
		}
		else
		{
			webGL.FrontFace(DSC.Framework.Context.WebGL.CCW);
		}
	}

	// blend  m_blendSourceFlag  m_blendDestinationFlag
	if ((undefined == webGL.m_material) || 
		(in_material.m_blend != webGL.m_material.m_blend))
	{
		webGL.Enable(DSC.Framework.Context.WebGL.BLEND, in_material.m_blend);
	}

	// blend  m_blendSourceFlag  m_blendDestinationFlag
	if ((undefined == webGL.m_material) || 
		((in_material.m_blend) && 
		((in_material.m_blendSourceFlag != webGL.m_material.m_blendSourceFlag) ||
		(in_material.m_blendDestinationFlag != webGL.m_material.m_blendDestinationFlag)
		)))
	{
		webGL.BlendFunc(
			DSC.Framework.Asset.Material.BlendFlagToWebGL(in_material.m_blendSourceFlag), 
			DSC.Framework.Asset.Material.BlendFlagToWebGL(in_material.m_blendDestinationFlag)
			);
	}

	// depth  m_depthFlag
	if ((undefined == webGL.m_material) || 
		(in_material.m_depthFlag != webGL.m_material.m_depthFlag))
	{
		switch (in_material.m_depthFlag)
		{
		default:
		case DSC.Framework.Asset.Material.s_depthTestFlag.None:
			webGL.Enable(DSC.Framework.Context.WebGL.DEPTH_TEST, false);
			break;
		case DSC.Framework.Asset.Material.s_depthTestFlag.Less:
			webGL.Enable(DSC.Framework.Context.WebGL.DEPTH_TEST, true);
			webGL.DepthFunc(DSC.Framework.Context.WebGL.LESS);
			break;
		case DSC.Framework.Asset.Material.s_depthTestFlag.LessOrEqual:
			webGL.Enable(DSC.Framework.Context.WebGL.DEPTH_TEST, true);
			webGL.DepthFunc(DSC.Framework.Context.WebGL.LEQUAL);
			break;
		case DSC.Framework.Asset.Material.s_depthTestFlag.Greater:
			webGL.Enable(DSC.Framework.Context.WebGL.DEPTH_TEST, true);
			webGL.DepthFunc(DSC.Framework.Context.WebGL.GREATER);
			break;
		case DSC.Framework.Asset.Material.s_depthTestFlag.Always:
			webGL.Enable(DSC.Framework.Context.WebGL.DEPTH_TEST, true);
			webGL.DepthFunc(DSC.Framework.Context.WebGL.ALWAYS);
			break;
		}
	}

	webGL.m_material = in_material;
}
DSC.Framework.ContextWebGL.prototype['ApplyMaterial'] = DSC.Framework.ContextWebGL.prototype.ApplyMaterial;

DSC.Framework.ContextWebGL.prototype.DrawModel = function(in_model, _first, _count)
{
	this.SubDrawModelPre(in_model);
	this.SubDrawModel(in_model, _first, _count);
	this.SubDrawModelPost(in_model);
}
DSC.Framework.ContextWebGL.prototype['DrawModel'] = DSC.Framework.ContextWebGL.prototype.DrawModel;

DSC.Framework.ContextWebGL.prototype.SubDrawModelPre = function(in_model)
{
	var webGL = this.m_webGL;
	var shader = webGL.m_material.m_shader;
	for (var key in shader.m_mapVertexAttribute)
	{
		var position = shader.m_mapVertexAttribute[key];
		if (!(key in in_model.m_mapDataStream))
			continue;

		var dataStream = in_model.m_mapDataStream[key];
		webGL.BindBuffer(dataStream.m_bufferHandle, DSC.Framework.Context.WebGL.ARRAY_BUFFER);
		webGL.EnableVertexAttribArray(position, dataStream.m_elementsPerVertex, dataStream.m_type, dataStream.m_normalise);
	};

	if (in_model.m_elementIndexHandle)
	{
		webGL.BindBuffer(in_model.m_elementIndexHandle, DSC.Framework.Context.WebGL.ELEMENT_ARRAY_BUFFER);
	}

	return;
}

DSC.Framework.ContextWebGL.prototype.SubDrawModel = function(in_model, _first, _count)
{
	var first = (undefined == _first) ? 0 : _first; 
	var count = (undefined == _count) ? in_model.m_elementCount : _count; 

	if (undefined == in_model.m_elementIndex)
	{
		this.m_webGL.DrawArrays(in_model.m_mode, first, count);
	}
	else
	{
		this.m_webGL.DrawElements(in_model.m_mode, count, in_model.m_elementType, first * in_model.m_elementByteSize);
	}

	return;
}

DSC.Framework.ContextWebGL.prototype.SubDrawModelPost = function(in_model)
{
	var webGL = this.m_webGL;
	var shader = webGL.m_material.m_shader;
	for (var key in shader.m_mapVertexAttribute)
	{
		var position = shader.m_mapVertexAttribute[key];
		webGL.DisableVertexAttribArray(position);
	}

	return;
}


DSC.Framework.ContextWebGL.prototype.AddContextListener = function(in_listener)
{
	this.m_arrayContextListener.push(in_listener);

	return;
}

DSC.Framework.ContextWebGL.prototype.RemoveContextListener = function(in_listener)
{
	var index = this.m_arrayContextListener.indexOf(in_listener);
	if (-1 < in_listener)
		this.m_arrayContextListener.splice(index, 1);

	return;
}

DSC.Framework.ContextWebGL.prototype.SupportsExtention = function(in_extentionName)
{
	if (this.m_webGL &&
		(-1 != this.m_webGL.m_arraySupportedExtentions.indexOf(in_extentionName)))
	{
		return true;
	}
	return false;
}

