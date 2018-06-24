/*
	we wrap the webgl context
	context can be taken AT ANY TIME (thus error check after every instruction, or not, too slow)
	and we may only get the event that context was taken once we return thread control to the browser

	also collect the atomic opengl calls into more convienient chunks, like load shader?
*/

DSC.Framework.Context.WebGL = function(in_canvas, _param)
{
	if ( !(this instanceof DSC.Framework.Context.WebGL) )
		alert("DSC.Framework.Context.WebGL: call constuctor with new keyword");

	this.m_webGL = undefined;

	if (!window.WebGLRenderingContext) 
	{
		throw(" Webgl not supported");
	} 
	
	//var param = {
	//	alpha : false,
	//	depth : true,
	//	antialias : true,
	//	//premultipliedAlpha : false,
	//	extentions : ["", ""...]
	//};

	this.m_webGL = in_canvas.getContext("webgl", _param);

	if (undefined == this.m_webGL) 
	{
		this.m_webGL = in_canvas.getContext("experimental-webgl", _param);
	}

	if (undefined == this.m_webGL) 
	{
		throw(" Unable to get webgl Context");
	}

	this.m_arrayExtention = this.m_webGL.getSupportedExtensions();
	console.info("    webgl supported extentions");
	this.m_arrayExtention.forEach( function(item)
	{
		console.info("        " + item);
	});

	this.m_maxCombinedTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS); //	GLint
	console.info("    MAX_COMBINED_TEXTURE_IMAGE_UNITS:" + this.m_maxCombinedTextureImageUnits);

	this.m_maxCubeMapTextureSize = this.m_webGL.getParameter(this.m_webGL.MAX_CUBE_MAP_TEXTURE_SIZE); //GLint
	console.info("    MAX_CUBE_MAP_TEXTURE_SIZE:" + this.m_maxCubeMapTextureSize);

	//this.m_webGL.getExtension("GL_ARB_draw_buffers");
	
	//#extension GL_EXT-draw_buffers : require
	//this.m_maxDrawBuffersWebgl = this.m_webGL.getParameter(this.m_webGL.MAX_DRAW_BUFFERS_WEBGL); //GLint
	//console.info("    MAX_DRAW_BUFFERS_WEBGL:" + this.m_maxDrawBuffersWebgl);

	this.m_maxFragmentUniformVectors = this.m_webGL.getParameter(this.m_webGL.MAX_FRAGMENT_UNIFORM_VECTORS); //GLint
	console.info("    MAX_FRAGMENT_UNIFORM_VECTORS:" + this.m_maxFragmentUniformVectors);

	this.m_maxRenderbufferSize = this.m_webGL.getParameter(this.m_webGL.MAX_RENDERBUFFER_SIZE); //GLint
	console.info("    MAX_RENDERBUFFER_SIZE:" + this.m_maxRenderbufferSize);

	this.m_maxTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_TEXTURE_IMAGE_UNITS); //GLint
	console.info("    MAX_TEXTURE_IMAGE_UNITS:" + this.m_maxTextureImageUnits);

	this.m_maxTextureSize = this.m_webGL.getParameter(this.m_webGL.MAX_TEXTURE_SIZE); //GLint
	console.info("    MAX_TEXTURE_SIZE:" + this.m_maxTextureSize);

	this.m_maxVaryingVectors = this.m_webGL.getParameter(this.m_webGL.MAX_VARYING_VECTORS); //GLint
	console.info("    MAX_VARYING_VECTORS:" + this.m_maxVaryingVectors);

	this.m_maxVertexAttribs = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_ATTRIBS); //GLint
	console.info("    MAX_VERTEX_ATTRIBS:" + this.m_maxVertexAttribs);

	this.m_maxVertexTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_TEXTURE_IMAGE_UNITS); //GLint
	console.info("    MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + this.m_maxVertexTextureImageUnits);

	this.m_maxVertexUniformVectors = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_UNIFORM_VECTORS); //GLint
	console.info("    MAX_VERTEX_UNIFORM_VECTORS:" + this.m_maxVertexUniformVectors);

	this.m_aliasedLineWidthRange = this.m_webGL.getParameter(this.m_webGL.ALIASED_LINE_WIDTH_RANGE);
	console.info("    ALIASED_LINE_WIDTH_RANGE:" + this.m_aliasedLineWidthRange[0] + " " + this.m_aliasedLineWidthRange[1]);

	this.m_maxViewportDims = this.m_webGL.getParameter(this.m_webGL.MAX_VIEWPORT_DIMS); //
	console.info("    MAX_VIEWPORT_DIMS:" + this.m_maxViewportDims[0] + " " + this.m_maxViewportDims[1]);

	this.m_vendor = this.m_webGL.getParameter(this.m_webGL.VENDOR); //DOMString
	console.info("    VENDOR:" + this.m_vendor);

	this.m_version = this.m_webGL.getParameter(this.m_webGL.VERSION); //
	console.info("    VERSION:" + this.m_version);

	this.m_shadingLanguageVersion = this.m_webGL.getParameter(this.m_webGL.SHADING_LANGUAGE_VERSION); //
	console.info("    SHADING_LANGUAGE_VERSION:" + this.m_shadingLanguageVersion);

	this.m_shaderPrecisionFormatHigh = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.HIGH_FLOAT);
	console.info("    HIGH_FLOAT precision:" + this.m_shaderPrecisionFormatHigh.precision + " rangeMax:" + this.m_shaderPrecisionFormatHigh.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatHigh.rangeMin);

	this.m_shaderPrecisionFormatMedium = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.MEDIUM_FLOAT);
	console.info("    MEDIUM_FLOAT precision:" + this.m_shaderPrecisionFormatMedium.precision + " rangeMax:" + this.m_shaderPrecisionFormatMedium.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatMedium.rangeMin);

	this.m_shaderPrecisionFormatLow = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.LOW_FLOAT);
	console.info("    LOW_FLOAT precision:" + this.m_shaderPrecisionFormatLow.precision + " rangeMax:" + this.m_shaderPrecisionFormatLow.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatLow.rangeMin);

	this.m_arraySupportedExtentions = [];
	if ((undefined != _param) &&
		(undefined != _param.extentions))
	{
		var that = this;
		_param.extentions.forEach( function(item)
		{
			if (-1 != that.m_arrayExtention.indexOf(item))
			{
				var result = that.m_webGL.getExtension(item);
				if (!result)
					console.info("getExtension failed for [" + item  + "] " + result);
				else
				{
					console.info("getExtension [" + item  + "] " + result);
					that.m_arraySupportedExtentions.push(item);
				}
			}
			else
			{
				console.info("Requested extention was not found:" + item);
			}
		});
	}


	this.GetError();

	this.Viewport(0, 0, in_canvas.width, in_canvas.height);

	return;
}

//default enums, replace by webGL values on init?
// or have our own copy to access before webGL is init

    /* WebGL-specific enums */
DSC.Framework.Context.WebGL.UNPACK_FLIP_Y_WEBGL            = 0x9240;
DSC.Framework.Context.WebGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
DSC.Framework.Context.WebGL.CONTEXT_LOST_WEBGL             = 0x9242;
DSC.Framework.Context.WebGL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
DSC.Framework.Context.WebGL.BROWSER_DEFAULT_WEBGL          = 0x9244;

    /* ErrorCode */
DSC.Framework.Context.WebGL.NO_ERROR          = 0;
DSC.Framework.Context.WebGL.INVALID_ENUM      = 0x0500;
DSC.Framework.Context.WebGL.INVALID_VALUE     = 0x0501;
DSC.Framework.Context.WebGL.INVALID_OPERATION = 0x0502;
DSC.Framework.Context.WebGL.OUT_OF_MEMORY     = 0x0505;

    /* EnableCap */
DSC.Framework.Context.WebGL.CULL_FACE                = 0x0B44;
DSC.Framework.Context.WebGL.BLEND                    = 0x0BE2;
DSC.Framework.Context.WebGL.DITHER                   = 0x0BD0;
DSC.Framework.Context.WebGL.STENCIL_TEST             = 0x0B90;
DSC.Framework.Context.WebGL.DEPTH_TEST               = 0x0B71;
DSC.Framework.Context.WebGL.SCISSOR_TEST             = 0x0C11;
DSC.Framework.Context.WebGL.POLYGON_OFFSET_FILL      = 0x8037;
DSC.Framework.Context.WebGL.SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
DSC.Framework.Context.WebGL.SAMPLE_COVERAGE          = 0x80A0;
    
DSC.Framework.Context.WebGL.POINTS = 0;
DSC.Framework.Context.WebGL.LINES = 1;
DSC.Framework.Context.WebGL.LINE_LOOP = 2;
DSC.Framework.Context.WebGL.LINE_STRIP = 3;
DSC.Framework.Context.WebGL.TRIANGLES = 4;
DSC.Framework.Context.WebGL.TRIANGLE_STRIP = 5;
DSC.Framework.Context.WebGL.TRIANGLE_FAN = 6;

DSC.Framework.Context.WebGL.FRAGMENT_SHADER = 0x8B30;
DSC.Framework.Context.WebGL.VERTEX_SHADER  = 0x8B31;

DSC.Framework.Context.WebGL.STREAM_DRAW    = 0x88E0;
DSC.Framework.Context.WebGL.STATIC_DRAW    = 0x88E4;
DSC.Framework.Context.WebGL.DYNAMIC_DRAW   = 0x88E8;

DSC.Framework.Context.WebGL.BYTE           = 0x1400;
DSC.Framework.Context.WebGL.UNSIGNED_BYTE  = 0x1401;
DSC.Framework.Context.WebGL.SHORT          = 0x1402;
DSC.Framework.Context.WebGL.UNSIGNED_SHORT = 0x1403;
DSC.Framework.Context.WebGL.INT            = 0x1404;
DSC.Framework.Context.WebGL.UNSIGNED_INT   = 0x1405;
DSC.Framework.Context.WebGL.FLOAT          = 0x1406;

DSC.Framework.Context.WebGL.HALF_FLOAT_OES = 0x8D61; //extention OES_texture_half_float

DSC.Framework.Context.WebGL.ARRAY_BUFFER   = 0x8892;
DSC.Framework.Context.WebGL.ELEMENT_ARRAY_BUFFER = 0x8893;

//CULL_FACE
DSC.Framework.Context.WebGL.FRONT = 0x0404;
DSC.Framework.Context.WebGL.BACK = 0x0405;
DSC.Framework.Context.WebGL.FRONT_AND_BACK = 0x0408;

DSC.Framework.Context.WebGL.CW = 0x0900;
DSC.Framework.Context.WebGL.CCW = 0x0901;

//blend
DSC.Framework.Context.WebGL.ZERO = 0;
DSC.Framework.Context.WebGL.ONE = 1;
DSC.Framework.Context.WebGL.SRC_COLOR = 0x0300;
DSC.Framework.Context.WebGL.ONE_MINUS_SRC_COLOR = 0x0301;
DSC.Framework.Context.WebGL.SRC_ALPHA = 0x0302;
DSC.Framework.Context.WebGL.ONE_MINUS_SRC_ALPHA = 0x0303;
DSC.Framework.Context.WebGL.DST_ALPHA = 0x0304;
DSC.Framework.Context.WebGL.ONE_MINUS_DST_ALPHA = 0x0305;
DSC.Framework.Context.WebGL.DST_COLOR = 0x0306;
DSC.Framework.Context.WebGL.ONE_MINUS_DST_COLOR = 0x0307;
DSC.Framework.Context.WebGL.SRC_ALPHA_SATURATE = 0x0308

DSC.Framework.Context.WebGL.NEVER    = 0x0200;
DSC.Framework.Context.WebGL.LESS     = 0x0201;
DSC.Framework.Context.WebGL.EQUAL    = 0x0202;
DSC.Framework.Context.WebGL.LEQUAL   = 0x0203;
DSC.Framework.Context.WebGL.GREATER  = 0x0204;
DSC.Framework.Context.WebGL.NOTEQUAL = 0x0205;
DSC.Framework.Context.WebGL.GEQUAL   = 0x0206;
DSC.Framework.Context.WebGL.ALWAYS   = 0x0207;

/* PixelFormat */
DSC.Framework.Context.WebGL.DEPTH_COMPONENT = 0x1902;
DSC.Framework.Context.WebGL.ALPHA           = 0x1906;
DSC.Framework.Context.WebGL.RGB             = 0x1907;
DSC.Framework.Context.WebGL.RGBA            = 0x1908;
DSC.Framework.Context.WebGL.LUMINANCE       = 0x1909;
DSC.Framework.Context.WebGL.LUMINANCE_ALPHA = 0x190A;


    /* TextureMagFilter */
DSC.Framework.Context.WebGL.NEAREST                        = 0x2600;
DSC.Framework.Context.WebGL.LINEAR                         = 0x2601;
    
    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
DSC.Framework.Context.WebGL.NEAREST_MIPMAP_NEAREST         = 0x2700;
DSC.Framework.Context.WebGL.LINEAR_MIPMAP_NEAREST          = 0x2701;
DSC.Framework.Context.WebGL.NEAREST_MIPMAP_LINEAR          = 0x2702;
DSC.Framework.Context.WebGL.LINEAR_MIPMAP_LINEAR           = 0x2703;
    
    /* TextureParameterName */
DSC.Framework.Context.WebGL.TEXTURE_MAG_FILTER             = 0x2800;
DSC.Framework.Context.WebGL.TEXTURE_MIN_FILTER             = 0x2801;
DSC.Framework.Context.WebGL.TEXTURE_WRAP_S                 = 0x2802;
DSC.Framework.Context.WebGL.TEXTURE_WRAP_T                 = 0x2803;
    
    /* TextureTarget */
DSC.Framework.Context.WebGL.TEXTURE_2D                     = 0x0DE1;
DSC.Framework.Context.WebGL.TEXTURE                        = 0x1702;
    
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP               = 0x8513;
DSC.Framework.Context.WebGL.TEXTURE_BINDING_CUBE_MAP       = 0x8514;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
DSC.Framework.Context.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851A;
DSC.Framework.Context.WebGL.MAX_CUBE_MAP_TEXTURE_SIZE      = 0x851C;
    
    /* TextureUnit */
DSC.Framework.Context.WebGL.TEXTURE0                       = 0x84C0;

    /* TextureWrapMode */
DSC.Framework.Context.WebGL.REPEAT                         = 0x2901;
DSC.Framework.Context.WebGL.CLAMP_TO_EDGE                  = 0x812F;
DSC.Framework.Context.WebGL.MIRRORED_REPEAT                = 0x8370;

    /* Framebuffer Object. */
DSC.Framework.Context.WebGL.FRAMEBUFFER                    = 0x8D40;
DSC.Framework.Context.WebGL.RENDERBUFFER                   = 0x8D41;

DSC.Framework.Context.WebGL.COLOR_ATTACHMENT0              = 0x8CE0;
DSC.Framework.Context.WebGL.DEPTH_ATTACHMENT               = 0x8D00;
DSC.Framework.Context.WebGL.STENCIL_ATTACHMENT             = 0x8D20;
DSC.Framework.Context.WebGL.DEPTH_STENCIL_ATTACHMENT       = 0x821A;

DSC.Framework.Context.WebGL.prototype.GetError = function()
{
	return;

	if (undefined != this.m_webGL)
	{
		var error = this.m_webGL.getError();
		var message;
	
		switch (error)
		{
		default:
			message = "DSC.Framework.Context.WebGL.GetError: [unknown] " + error;
			break;
		case DSC.Framework.Context.WebGL.NO_ERROR:
			return true;
		case DSC.Framework.Context.WebGL.CONTEXT_LOST_WEBGL:
			console.info("CONTEXT_LOST_WEBGL");
			break;
		case DSC.Framework.Context.WebGL.INVALID_ENUM:
			message = "DSC.Framework.Context.WebGL.GetError: INVALID_ENUM";
			break;
		case DSC.Framework.Context.WebGL.INVALID_VALUE:
			message = "DSC.Framework.Context.WebGL.GetError: INVALID_VALUE";
			break;
		case DSC.Framework.Context.WebGL.INVALID_OPERATION:
			message = "DSC.Framework.Context.WebGL.GetError: INVALID_OPERATION";
			break;
		case DSC.Framework.Context.WebGL.OUT_OF_MEMORY:
			message = "DSC.Framework.Context.WebGL.GetError: OUT_OF_MEMORY";
			break;
		}
		if (undefined != message)
		{
			console.info(message);
			alert(message);
		}

		this.m_webGL = undefined;
	}
	return false;
}

DSC.Framework.Context.WebGL.prototype.Viewport = function(in_originX, in_originY, in_sizeX, in_sizeY)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.viewport(in_originX, in_originY, in_sizeX, in_sizeY);
	this.GetError();
}

DSC.Framework.Context.WebGL.prototype.Clear = function(_colour, _depth, _stencil)
{
	var clearFlag = 0;

	if (undefined != _colour)
	{
		if (this.m_webGL)
		{
			clearFlag |= this.m_webGL.COLOR_BUFFER_BIT;
			this.m_webGL.clearColor(
				DSC.Math.Colour.GetRed(_colour),
				DSC.Math.Colour.GetGreen(_colour),
				DSC.Math.Colour.GetBlue(_colour),
				DSC.Math.Colour.GetAlpha(_colour)
				);		
		}
		this.GetError();
	}
	if (undefined != _depth)
	{
		if (this.m_webGL)
		{
			clearFlag |= this.m_webGL.DEPTH_BUFFER_BIT;
			this.m_webGL.clearDepth(_depth);
		}
		this.GetError();
	}

	if (undefined != _stencil)
	{
		if (this.m_webGL)
		{
			clearFlag |= this.m_webGL.STENCIL_BUFFER_BIT;
			this.m_webGL.clearStencil(_stencil);
		}
		this.GetError();
	}

	if (this.m_webGL)
		this.m_webGL.clear(clearFlag);		
	this.GetError();
	
	this.m_material = undefined;

	return;
}

DSC.Framework.Context.WebGL.prototype.Flush = function()
{
	if (!this.m_webGL)
		return;
	this.m_webGL.flush();		
	this.GetError();
	return;
}

DSC.Framework.Context.WebGL.prototype.LoadShader = function(in_shaderText, in_type)
{
	if (!this.m_webGL)
		return undefined;

	var shaderHandle = this.m_webGL.createShader(in_type);	
	this.GetError();
	if (shaderHandle == 0) 
		return shaderHandle;
		
	// Pass in the shader source.
	if (this.m_webGL)
		this.m_webGL.shaderSource(shaderHandle, in_shaderText);		
	this.GetError();
		
	// Compile the shader.
	if (this.m_webGL)
		this.m_webGL.compileShader(shaderHandle);
	this.GetError();

	// Get the compilation status.		
	if (this.m_webGL)
		var compiled = this.m_webGL.getShaderParameter(shaderHandle, this.m_webGL.COMPILE_STATUS);		
	this.GetError();

	var errorInfo = "";
	// If the compilation failed, delete the shader.
	if (!compiled) 
	{				
		errorInfo = this.m_webGL.getShaderInfoLog(shaderHandle);			
		if (this.m_webGL)
			this.m_webGL.deleteShader(shaderHandle);
		this.GetError();
		shaderHandle = 0;
	}

	if (shaderHandle == 0)
	{
		alert("Error creating shader: " + errorInfo);
	}
	
	return shaderHandle;
}

DSC.Framework.Context.WebGL.prototype.LinkProgram = function(inout_attributeMap, inout_uniformMap, in_vertexShaderHandle, in_fragmentShaderHandle)
{
	if (!this.m_webGL || !in_vertexShaderHandle || !in_fragmentShaderHandle)
		return undefined;

	// Create a program object and store the handle to it.
	var programHandle = this.m_webGL.createProgram();
	this.GetError();

	if ((0 == programHandle) || (undefined == programHandle))
		return undefined;
	
	if (this.m_webGL)
		this.m_webGL.attachShader(programHandle, in_vertexShaderHandle);
	this.GetError();

	if (this.m_webGL)
		this.m_webGL.attachShader(programHandle, in_fragmentShaderHandle);
	this.GetError();
	
	var attributeKeyArray = Object.keys(inout_attributeMap);
	for (var index = 0; index < attributeKeyArray.length; ++index)
	{
		var key = attributeKeyArray[key];
		if (this.m_webGL)
			this.m_webGL.bindAttribLocation(programHandle, index, key);
		this.GetError();
	}		
		
	if (this.m_webGL)
		this.m_webGL.linkProgram(programHandle);
	this.GetError();

	// Get the link status.
	if (this.m_webGL)
		var linked = this.m_webGL.getProgramParameter(programHandle, this.m_webGL.LINK_STATUS);
	this.GetError();

	if (!linked) 
	{				
		if (this.m_webGL)
			this.m_webGL.deleteProgram(programHandle);
		this.GetError();
		return undefined
	}

	//inout_attributeMap
	for (var index = 0; index < attributeKeyArray.length; ++index)
	{
		var key = attributeKeyArray[index];
		var location = undefined;
		if (this.m_webGL)
		    inout_attributeMap[key] = this.m_webGL.getAttribLocation(programHandle, key);
		this.GetError();
	}

	//inout_uniformMap
	if (undefined != inout_uniformMap)
	{
		var uniformKeyArray = Object.keys(inout_uniformMap);
		for (var index = 0; index < uniformKeyArray.length; ++index)
		{
			var key = uniformKeyArray[index];
			var uniform = inout_uniformMap[key];
			if (this.m_webGL)
				uniform.m_location = this.m_webGL.getUniformLocation(programHandle, key);
			this.GetError();
		}
	}	
		
	return programHandle;
}

DSC.Framework.Context.WebGL.prototype.UseProgram = function(in_programHandle)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.useProgram(in_programHandle);
	this.GetError();

	return;
}   

DSC.Framework.Context.WebGL.prototype.SetUniformFloat = function(in_uniformHandle, in_float)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.uniform1f(in_uniformHandle, in_float);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.SetUniformFloat2 = function(in_uniformHandle, in_floatArray)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.uniform2fv(in_uniformHandle, in_floatArray);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.SetUniformFloat3 = function(in_uniformHandle, in_floatArray)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.uniform3fv(in_uniformHandle, in_floatArray);
	this.GetError();

	return;
}

// if uniform in shader is a vec4[3], then float array should be 12 floats?
DSC.Framework.Context.WebGL.prototype.SetUniformFloat4 = function(in_uniformHandle, in_floatArray)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.uniform4fv(in_uniformHandle, in_floatArray);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.SetUniformFloat16 = function(in_uniformHandle, in_floatArray, _transpose)
{
	if (!this.m_webGL)
		return;
	var transpose = (undefined == _transpose) ? false : _transpose;
	this.m_webGL.uniformMatrix4fv(in_uniformHandle, transpose, in_floatArray);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.SetUniformInteger = function(in_uniformHandle, in_value)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.uniform1i(in_uniformHandle, in_value);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.ActivateTexture = function(in_textureHandle, in_index)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.activeTexture(this.m_webGL.TEXTURE0 + in_index);
	this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, in_textureHandle);
	this.GetError();

	return;	
}

DSC.Framework.Context.WebGL.prototype.DeactivateTexture = function(in_index)
{
	if (!this.m_webGL)
		return;
	this.m_webGL.activeTexture(this.m_webGL.TEXTURE0 + in_index);
	this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, undefined);
	this.GetError();

	return;	
}

DSC.Framework.Context.WebGL.prototype.SetVertexAttributeBufferFloat = function(in_attribute, in_buffer, in_dataSize)
{
	if (!this.m_webGL)
		return undefined;

	this.m_webGL.enableVertexAttribArray(in_attribute);
	this.GetError();

	if (this.m_webGL)
		this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, in_buffer);
	this.GetError();

	if (this.m_webGL)
		this.m_webGL.vertexAttribPointer(
			in_attribute, 
			in_dataSize, 
			this.m_webGL.FLOAT, 
			false,
			0, 
			0);  
	this.GetError();
}

DSC.Framework.Context.WebGL.prototype.CreateBuffer = function(in_arrayData, _bufferObjectType, _type)
{
	if (!this.m_webGL)
		return undefined;
	var bufferObject = this.m_webGL.createBuffer();
	this.GetError();

	var bufferObjectType = (undefined == _bufferObjectType) ? DSC.Framework.Context.WebGL.ARRAY_BUFFER : _bufferObjectType;

	if (this.m_webGL)
		this.m_webGL.bindBuffer(bufferObjectType, bufferObject);
	this.GetError();

	var type = (undefined == _type) ? DSC.Framework.Context.WebGL.STATIC_DRAW : _type;

	if (this.m_webGL)
		this.m_webGL.bufferData(bufferObjectType, in_arrayData, type);
	this.GetError();

	return bufferObject;
}


DSC.Framework.Context.WebGL.prototype.UpdateBuffer = function(in_handle, in_arrayData, _bufferObjectType, _type)
{
	if (!this.m_webGL)
		return undefined;

	var bufferObjectType = (undefined == _bufferObjectType) ? DSC.Framework.Context.WebGL.ARRAY_BUFFER : _bufferObjectType;

	if (this.m_webGL)
		this.m_webGL.bindBuffer(bufferObjectType, in_handle);
	this.GetError();

	var type = (undefined == _type) ? DSC.Framework.Context.WebGL.DYNAMIC_DRAW : _type;

	if (this.m_webGL)
		this.m_webGL.bufferData(bufferObjectType, in_arrayData, type);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.BindBuffer = function(in_handle, _bufferObjectType)
{
	var bufferObjectType = (undefined == _bufferObjectType) ? DSC.Framework.Context.WebGL.ARRAY_BUFFER : _bufferObjectType;

	if (this.m_webGL)
		this.m_webGL.bindBuffer(bufferObjectType, in_handle);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.EnableVertexAttribArray = function(in_position, in_elementsPerVertex, in_type, in_normalise, _stride, _offset)
{
	var stride = (undefined == _stride) ? 0 : _stride;
	var offset = (undefined == _offset) ? 0 : _offset;

	if (this.m_webGL)
		this.m_webGL.enableVertexAttribArray(in_position);
	this.GetError();

	if (this.m_webGL)
		this.m_webGL.vertexAttribPointer(in_position, in_elementsPerVertex, in_type, in_normalise, stride, offset);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.DisableVertexAttribArray = function(in_position)
{
	if (this.m_webGL)
		this.m_webGL.disableVertexAttribArray(in_position);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.DrawArrays = function(in_mode, in_first, in_count)
{
	if (this.m_webGL)
		this.m_webGL.drawArrays(in_mode, in_first, in_count);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.DrawElements = function(in_mode, in_count, in_type, in_offset)
{
	if (this.m_webGL)
		this.m_webGL.drawElements(in_mode, in_count, in_type, in_offset);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.Enable = function(in_capability, _enable)
{
	if (this.m_webGL)
	{
		if (true == _enable)
		{
			this.m_webGL.enable(in_capability);
		}
		else
		{
			this.m_webGL.disable(in_capability);
		}
	}
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.FrontFace = function(in_mode)
{
	if (this.m_webGL)
		this.m_webGL.frontFace(in_mode);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.CullFace = function(in_mode)
{
	if (this.m_webGL)
		this.m_webGL.cullFace(in_mode);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.BlendFunc = function(in_sfactor, in_dfactor)
{
	if (this.m_webGL)
		this.m_webGL.blendFunc(in_sfactor, in_dfactor);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.DepthFunc = function(in_mode)
{
	if (this.m_webGL)
		this.m_webGL.depthFunc(in_mode);
	this.GetError();

	return;
}

DSC.Framework.Context.WebGL.prototype.GetViewport = function(_result)
{
	if (!this.m_webGL)
		return;
	var viewport = this.m_webGL.getParameter(this.m_webGL.VIEWPORT); //Int32Array (with 4 elements)

	if (undefined != _result)
	{
		DSC.Math.Frame.SetRaw(_result, viewport[0], viewport[1], viewport[2], viewport[3]);
		return _result;
	}
	return DSC.Math.Frame.FactoryRaw(viewport[0], viewport[1], viewport[2], viewport[3]);
}



DSC.Framework.Context.WebGL.FactoryRaw = function(_canvas, _param)
{
	return new DSC.Framework.Context.WebGL(_canvas, _param);
}
