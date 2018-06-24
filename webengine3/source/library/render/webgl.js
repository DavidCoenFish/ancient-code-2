/**
 * @private
 * @final
 * @constructor
 * @this {!c.WebGL}
 * @param {!Object} in_canvas
 * @param {!Object=} _paramObject
 * @return {undefined}
 */
c.WebGL = function(in_canvas, _paramObject) {
	/** @type {?Object} */
	this.m_webGL = null;

	if (!window.WebGLRenderingContext) {
		throw(" Webgl not supported");
	} 
	
	//var _paramObject = {
	//	alpha : false,
	//	depth : true,
	//	antialias : true,
	//	//premultipliedAlpha : false,
	//	extentions : ["", ""...]
	//};

	this.m_webGL = in_canvas.getContext("webgl", _paramObject);

	if (null === this.m_webGL) {
		this.m_webGL = in_canvas.getContext("experimental-webgl", _paramObject);
	}

	if (null === this.m_webGL) {
		throw(" Unable to get webgl Context");
	}

	/** type {?c.Material} */
	this.m_material = null;

	this.m_arrayExtention = this.m_webGL.getSupportedExtensions();
	this.m_maxCombinedTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS); //	GLint
	this.m_maxCubeMapTextureSize = this.m_webGL.getParameter(this.m_webGL.MAX_CUBE_MAP_TEXTURE_SIZE); //GLint
	this.m_maxFragmentUniformVectors = this.m_webGL.getParameter(this.m_webGL.MAX_FRAGMENT_UNIFORM_VECTORS); //GLint
	//this.m_webGL.getExtension("GL_ARB_draw_buffers");
	//#extension GL_EXT-draw_buffers : require
	//this.m_maxDrawBuffersWebgl = this.m_webGL.getParameter(this.m_webGL.MAX_DRAW_BUFFERS_WEBGL); //GLint
	this.m_maxRenderbufferSize = this.m_webGL.getParameter(this.m_webGL.MAX_RENDERBUFFER_SIZE); //GLint
	this.m_maxTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_TEXTURE_IMAGE_UNITS); //GLint
	this.m_maxTextureSize = this.m_webGL.getParameter(this.m_webGL.MAX_TEXTURE_SIZE); //GLint
	this.m_maxVaryingVectors = this.m_webGL.getParameter(this.m_webGL.MAX_VARYING_VECTORS); //GLint
	this.m_maxVertexAttribs = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_ATTRIBS); //GLint
	this.m_maxVertexTextureImageUnits = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_TEXTURE_IMAGE_UNITS); //GLint
	this.m_maxVertexUniformVectors = this.m_webGL.getParameter(this.m_webGL.MAX_VERTEX_UNIFORM_VECTORS); //GLint
	this.m_maxViewportDims = this.m_webGL.getParameter(this.m_webGL.MAX_VIEWPORT_DIMS); //
	this.m_aliasedLineWidthRange = this.m_webGL.getParameter(this.m_webGL.ALIASED_LINE_WIDTH_RANGE);
	this.m_vendor = this.m_webGL.getParameter(this.m_webGL.VENDOR); //DOMString
	this.m_version = this.m_webGL.getParameter(this.m_webGL.VERSION); //
	this.m_shadingLanguageVersion = this.m_webGL.getParameter(this.m_webGL.SHADING_LANGUAGE_VERSION); //
	this.m_shaderPrecisionFormatHigh = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.HIGH_FLOAT);
	this.m_shaderPrecisionFormatMedium = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.MEDIUM_FLOAT);
	this.m_shaderPrecisionFormatLow = this.m_webGL.getShaderPrecisionFormat(this.m_webGL.FRAGMENT_SHADER, this.m_webGL.LOW_FLOAT);
	this.m_arraySupportedExtentions = [];
	if ((undefined != _paramObject) &&
		(undefined != _paramObject['extentions']))
	{
		var that = this;
		_paramObject['extentions'].forEach( function(item)
		{
			if (-1 != that.m_arrayExtention.indexOf(item))
			{
				var result = that.m_webGL.getExtension(item);
				if (!result)
				{
					c.Log(LOG_WEBGL, "getExtension failed for [" + item  + "] " + result);
				}
				else
				{
					c.Log(LOG_WEBGL, "getExtension [" + item  + "] " + result);
					that.m_arraySupportedExtentions.push(item);
				}
			}
			else
			{
				c.Log(LOG_WEBGL, "Requested extention was not found:" + item);
			}
		});
	}

	if (DEBUG)
	{
		c.Log(LOG_WEBGL, "    webgl supported extentions");
		this.m_arrayExtention.forEach( function(item)
		{
			c.Log(LOG_WEBGL, "        " + item);
		});
		c.Log(LOG_WEBGL, "    MAX_COMBINED_TEXTURE_IMAGE_UNITS:" + this.m_maxCombinedTextureImageUnits);
		c.Log(LOG_WEBGL, "    MAX_CUBE_MAP_TEXTURE_SIZE:" + this.m_maxCubeMapTextureSize);
		//c.Log(LOG_WEBGL, "    MAX_DRAW_BUFFERS_WEBGL:" + this.m_maxDrawBuffersWebgl);
		c.Log(LOG_WEBGL, "    MAX_FRAGMENT_UNIFORM_VECTORS:" + this.m_maxFragmentUniformVectors);
		c.Log(LOG_WEBGL, "    MAX_RENDERBUFFER_SIZE:" + this.m_maxRenderbufferSize);
		c.Log(LOG_WEBGL, "    MAX_TEXTURE_IMAGE_UNITS:" + this.m_maxTextureImageUnits);
		c.Log(LOG_WEBGL, "    MAX_TEXTURE_SIZE:" + this.m_maxTextureSize);
		c.Log(LOG_WEBGL, "    MAX_VARYING_VECTORS:" + this.m_maxVaryingVectors);
		c.Log(LOG_WEBGL, "    MAX_VERTEX_ATTRIBS:" + this.m_maxVertexAttribs);
		c.Log(LOG_WEBGL, "    MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + this.m_maxVertexTextureImageUnits);
		c.Log(LOG_WEBGL, "    MAX_VERTEX_UNIFORM_VECTORS:" + this.m_maxVertexUniformVectors);
		c.Log(LOG_WEBGL, "    ALIASED_LINE_WIDTH_RANGE:" + this.m_aliasedLineWidthRange[0] + " " + this.m_aliasedLineWidthRange[1]);
		c.Log(LOG_WEBGL, "    MAX_VIEWPORT_DIMS:" + this.m_maxViewportDims[0] + " " + this.m_maxViewportDims[1]);
		c.Log(LOG_WEBGL, "    VENDOR:" + this.m_vendor);
		c.Log(LOG_WEBGL, "    VERSION:" + this.m_version);
		c.Log(LOG_WEBGL, "    SHADING_LANGUAGE_VERSION:" + this.m_shadingLanguageVersion);
		c.Log(LOG_WEBGL, "    HIGH_FLOAT precision:" + this.m_shaderPrecisionFormatHigh.precision + " rangeMax:" + this.m_shaderPrecisionFormatHigh.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatHigh.rangeMin);
		c.Log(LOG_WEBGL, "    MEDIUM_FLOAT precision:" + this.m_shaderPrecisionFormatMedium.precision + " rangeMax:" + this.m_shaderPrecisionFormatMedium.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatMedium.rangeMin);
		c.Log(LOG_WEBGL, "    LOW_FLOAT precision:" + this.m_shaderPrecisionFormatLow.precision + " rangeMax:" + this.m_shaderPrecisionFormatLow.rangeMax + " rangeMin:" + this.m_shaderPrecisionFormatLow.rangeMin);
	}

	this.GetError();

	return;
}
c["WebGL"] = c.WebGL;

/**
 * @param {!Object} in_canvas
 * @param {!Object=} _paramObject
 * @return {!c.WebGL}
 */
c.WebGL.Factory = function(in_canvas, _paramObject){
	return new c.WebGL(in_canvas, _paramObject);
}
c.WebGL["Factory"] = c.WebGL.Factory;

/* WebGL-specific enums */
c.WebGL.UNPACK_FLIP_Y_WEBGL            = 0x9240;
c.WebGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
c.WebGL.CONTEXT_LOST_WEBGL             = 0x9242;
c.WebGL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
c.WebGL.BROWSER_DEFAULT_WEBGL          = 0x9244;

/* ErrorCode */
c.WebGL.NO_ERROR          = 0;
c.WebGL.INVALID_ENUM      = 0x0500;
c.WebGL.INVALID_VALUE     = 0x0501;
c.WebGL.INVALID_OPERATION = 0x0502;
c.WebGL.OUT_OF_MEMORY     = 0x0505;

    /* EnableCap */
c.WebGL.CULL_FACE                = 0x0B44;
c.WebGL.BLEND                    = 0x0BE2;
c.WebGL.DITHER                   = 0x0BD0;
c.WebGL.STENCIL_TEST             = 0x0B90;
c.WebGL.DEPTH_TEST               = 0x0B71;
c.WebGL.SCISSOR_TEST             = 0x0C11;
c.WebGL.POLYGON_OFFSET_FILL      = 0x8037;
c.WebGL.SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
c.WebGL.SAMPLE_COVERAGE          = 0x80A0;

c.WebGL.POINTS = 0;
c.WebGL["POINTS"] = c.WebGL.POINTS;
c.WebGL.LINES = 1;
c.WebGL["LINES"] = c.WebGL.LINES;
c.WebGL.LINE_LOOP = 2;
c.WebGL["LINE_LOOP"] = c.WebGL.LINE_LOOP;
c.WebGL.LINE_STRIP = 3;
c.WebGL["LINE_STRIP"] = c.WebGL.LINE_STRIP;
c.WebGL.TRIANGLES = 4;
c.WebGL["TRIANGLES"] = c.WebGL.TRIANGLES;
c.WebGL.TRIANGLE_STRIP = 5;
c.WebGL["TRIANGLE_STRIP"] = c.WebGL.TRIANGLE_STRIP;
c.WebGL.TRIANGLE_FAN = 6;
c.WebGL["TRIANGLE_FAN"] = c.WebGL.TRIANGLE_FAN;

c.WebGL.FRAGMENT_SHADER = 0x8B30;
c.WebGL.VERTEX_SHADER  = 0x8B31;

c.WebGL.STREAM_DRAW    = 0x88E0;
c.WebGL["STREAM_DRAW"] = c.WebGL.STREAM_DRAW;
c.WebGL.STATIC_DRAW    = 0x88E4;
c.WebGL["STATIC_DRAW"] = c.WebGL.STATIC_DRAW;
c.WebGL.DYNAMIC_DRAW   = 0x88E8;
c.WebGL["DYNAMIC_DRAW"] = c.WebGL.DYNAMIC_DRAW;

c.WebGL.BYTE           = 0x1400;
c.WebGL["BYTE"] = c.WebGL.BYTE;
c.WebGL.UNSIGNED_BYTE  = 0x1401;
c.WebGL["UNSIGNED_BYTE"] = c.WebGL.UNSIGNED_BYTE;
c.WebGL.SHORT          = 0x1402;
c.WebGL["SHORT"] =c.WebGL.SHORT;
c.WebGL.UNSIGNED_SHORT = 0x1403;
c.WebGL["UNSIGNED_SHORT"] = c.WebGL.UNSIGNED_SHORT;
c.WebGL.INT            = 0x1404;
c.WebGL["INT"] = c.WebGL.INT;
c.WebGL.UNSIGNED_INT   = 0x1405;
c.WebGL["UNSIGNED_INT"] = c.WebGL.UNSIGNED_INT;
c.WebGL.FLOAT          = 0x1406;
c.WebGL["FLOAT"] = c.WebGL.FLOAT;

c.WebGL.HALF_FLOAT_OES = 0x8D61; //extention OES_texture_half_float
c.WebGL["HALF_FLOAT_OES"] = c.WebGL.HALF_FLOAT_OES;

c.WebGL.ARRAY_BUFFER   = 0x8892;
c.WebGL.ELEMENT_ARRAY_BUFFER = 0x8893;

//CULL_FACE
c.WebGL.FRONT = 0x0404;
c.WebGL.BACK = 0x0405;
c.WebGL.FRONT_AND_BACK = 0x0408;

c.WebGL.CW = 0x0900;
c.WebGL.CCW = 0x0901;

//blend
c.WebGL.ZERO = 0;
c.WebGL.ONE = 1;
c.WebGL.SRC_COLOR = 0x0300;
c.WebGL.ONE_MINUS_SRC_COLOR = 0x0301;
c.WebGL.SRC_ALPHA = 0x0302;
c.WebGL.ONE_MINUS_SRC_ALPHA = 0x0303;
c.WebGL.DST_ALPHA = 0x0304;
c.WebGL.ONE_MINUS_DST_ALPHA = 0x0305;
c.WebGL.DST_COLOR = 0x0306;
c.WebGL.ONE_MINUS_DST_COLOR = 0x0307;
c.WebGL.SRC_ALPHA_SATURATE = 0x0308

c.WebGL.NEVER    = 0x0200;
c.WebGL["NEVER"] = c.WebGL.NEVER;
c.WebGL.LESS     = 0x0201;
c.WebGL["LESS"] = c.WebGL.LESS;
c.WebGL.EQUAL    = 0x0202;
c.WebGL["EQUAL"] = c.WebGL.EQUAL;
c.WebGL.LEQUAL   = 0x0203;
c.WebGL["LEQUAL"] = c.WebGL.LEQUAL;
c.WebGL.GREATER  = 0x0204;
c.WebGL["GREATER"] = c.WebGL.GREATER;
c.WebGL.NOTEQUAL = 0x0205;
c.WebGL["NOTEQUAL"] = c.WebGL.NOTEQUAL;
c.WebGL.GEQUAL   = 0x0206;
c.WebGL["GEQUAL"] = c.WebGL.GEQUAL;
c.WebGL.ALWAYS   = 0x0207;
c.WebGL["ALWAYS"] = c.WebGL.ALWAYS;

/* PixelFormat */
c.WebGL.DEPTH_COMPONENT = 0x1902;
c.WebGL.ALPHA           = 0x1906;
c.WebGL.RGB             = 0x1907;
c.WebGL.RGBA            = 0x1908;
c.WebGL.LUMINANCE       = 0x1909;
c.WebGL.LUMINANCE_ALPHA = 0x190A;


    /* TextureMagFilter */
c.WebGL.NEAREST                        = 0x2600;
c.WebGL.LINEAR                         = 0x2601;
    
    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
c.WebGL.NEAREST_MIPMAP_NEAREST         = 0x2700;
c.WebGL.LINEAR_MIPMAP_NEAREST          = 0x2701;
c.WebGL.NEAREST_MIPMAP_LINEAR          = 0x2702;
c.WebGL.LINEAR_MIPMAP_LINEAR           = 0x2703;
    
    /* TextureParameterName */
c.WebGL.TEXTURE_MAG_FILTER             = 0x2800;
c.WebGL.TEXTURE_MIN_FILTER             = 0x2801;
c.WebGL.TEXTURE_WRAP_S                 = 0x2802;
c.WebGL.TEXTURE_WRAP_T                 = 0x2803;
    
    /* TextureTarget */
c.WebGL.TEXTURE_2D                     = 0x0DE1;
c.WebGL.TEXTURE                        = 0x1702;
    
c.WebGL.TEXTURE_CUBE_MAP               = 0x8513;
c.WebGL.TEXTURE_BINDING_CUBE_MAP       = 0x8514;
c.WebGL.TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
c.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
c.WebGL.TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
c.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
c.WebGL.TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
c.WebGL.TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851A;
c.WebGL.MAX_CUBE_MAP_TEXTURE_SIZE      = 0x851C;
    
    /* TextureUnit */
c.WebGL.TEXTURE0                       = 0x84C0;

    /* TextureWrapMode */
c.WebGL.REPEAT                         = 0x2901;
c.WebGL.CLAMP_TO_EDGE                  = 0x812F;
c.WebGL.MIRRORED_REPEAT                = 0x8370;

    /* Framebuffer Object. */
c.WebGL.FRAMEBUFFER                    = 0x8D40;
c.WebGL.RENDERBUFFER                   = 0x8D41;

c.WebGL.COLOR_ATTACHMENT0              = 0x8CE0;
c.WebGL.DEPTH_ATTACHMENT               = 0x8D00;
c.WebGL.STENCIL_ATTACHMENT             = 0x8D20;
c.WebGL.DEPTH_STENCIL_ATTACHMENT       = 0x821A;


/**
 * returns true if error in DEBUG===true
 * @return {boolean}
 */
c.WebGL.prototype.GetError = function() {
	if (false === DEBUG) {
		return false;
	}

	if (null !== this.m_webGL) {
		var error = this.m_webGL.getError();
		var message;
	
		switch (error) {
		case c.WebGL.NO_ERROR:
			return false;
		default:
			message = "c.WebGL.GetError: [unknown] " + error;
			break;
		case c.WebGL.CONTEXT_LOST_WEBGL:
			message = "CONTEXT_LOST_WEBGL";
			break;
		case c.WebGL.INVALID_ENUM:
			message = "c.WebGL.GetError: INVALID_ENUM";
			break;
		case c.WebGL.INVALID_VALUE:
			message = "c.WebGL.GetError: INVALID_VALUE";
			break;
		case c.WebGL.INVALID_OPERATION:
			message = "c.WebGL.GetError: INVALID_OPERATION";
			break;
		case c.WebGL.OUT_OF_MEMORY:
			message = "c.WebGL.GetError: OUT_OF_MEMORY";
			break;
		}
		if (undefined != message) {
			c.Log(LOG_WEBGL, message, true);
		}

		this.m_webGL = null;
	}
	return true;
}

/**
 * @param {!string=} in_extention
 * @return {!boolean}
 */
c.WebGL.prototype.SupportsExtention = function(in_extention) {
	if (this.m_webGL &&
		(-1 != this.m_arrayExtention.indexOf(in_extentionName))) {
		return true;
	}
	return false;
}

/**
 * @nosideefect
 * @return {!Int32Array}
 */
c.WebGL.prototype.GetViewport = function() {
	var viewport;
	if (null != this.m_webGL) {
		viewport = this.m_webGL.getParameter(this.m_webGL.VIEWPORT); //Int32Array (with 4 elements)
	}
	this.GetError();
	if (undefined === viewport){
		viewport = new Int32Array([0, 0, 0, 0]);
	}
	return viewport;
}

/**
 * @param {!Int32Array} in_viewport
 * @return {undefined}
 */
c.WebGL.prototype.SetViewport = function(in_viewport) {
	var originX = in_viewport[0];
	var originY = in_viewport[1];
	var sizeX = in_viewport[2];
	var sizeY = in_viewport[3];
	if (null != this.m_webGL) {
		this.m_webGL.viewport(originX, originY, sizeX, sizeY);
	}
	this.GetError();
	return;
}

/**
 * @param {!(c.ColourRGBType|c.ColourRGBAType)=} _colour
 * @param {!number=} _depth
 * @param {!number=} _stencil
 * @return {undefined}
 */
c.WebGL.prototype.Clear = function(_colour, _depth, _stencil) {
	//c.Log(LOG_WEBGL, "Clear:" + _colour + " " + _depth + " " + _stencil);

	/** @type {!number} */
	var clearFlag = 0;

	if (undefined != _colour) {
		if (null != this.m_webGL) {
			clearFlag |= this.m_webGL.COLOR_BUFFER_BIT;
			this.m_webGL.clearColor(
				c.ColourRGBA.GetRed(_colour),
				c.ColourRGBA.GetGreen(_colour),
				c.ColourRGBA.GetBlue(_colour),
				c.ColourRGBA.GetAlphaSafe(_colour, 1.0)
				);
		}
		this.GetError();
	}

	if (undefined != _depth) {
		if (null != this.m_webGL) {
			clearFlag |= this.m_webGL.DEPTH_BUFFER_BIT;
			this.m_webGL.depthMask(true);
			this.m_webGL.clearDepth(_depth);
		}
		this.GetError();
	}

	if (undefined != _stencil) {
		if (null != this.m_webGL) {
			clearFlag |= this.m_webGL.STENCIL_BUFFER_BIT;
			this.m_webGL.clearStencil(_stencil);
		}
	}

	if (0 != clearFlag) {
		if (null != this.m_webGL) {
			this.m_webGL.clear(clearFlag);
		}
		this.GetError();
	}
	
	return;
}

/**
 * @param {!Object} in_arrayData
 * @param {!number=} _bufferObjectType
 * @param {!number=} _type
 * @return {?Object}
 */
c.WebGL.prototype.CreateBuffer = function(in_arrayData, _bufferObjectType, _type) {
	//c.Log(LOG_WEBGL, "CreateBuffer:" + in_arrayData + " " + _bufferObjectType + " " + _type);

	/** @type {?Object} */
	var bufferObject = null;
	if (null != this.m_webGL) {
		bufferObject = this.m_webGL.createBuffer();
	}
	this.GetError();

	/** @type {!number} */
	var bufferObjectType = (undefined == _bufferObjectType) ? c.WebGL.ARRAY_BUFFER : _bufferObjectType;
	if (null != this.m_webGL) {
		this.m_webGL.bindBuffer(bufferObjectType, bufferObject);
	}
	this.GetError();

	/** @type {!number} */
	var type = (undefined == _type) ? c.WebGL.STATIC_DRAW : _type;
	if (null != this.m_webGL) {
		this.m_webGL.bufferData(bufferObjectType, in_arrayData, type);
	}
	this.GetError();

	//c.Log(LOG_WEBGL, "CreateBuffer return:" + typeof(bufferObject));
	return bufferObject;
}

/**
 * @param {!Object} in_handle
 * @param {!Object} in_arrayData
 * @param {!number=} _bufferObjectType
 * @param {!number=} _type
 * @return {undefined}
 */
c.WebGL.prototype.UpdateBuffer = function(in_handle, in_arrayData, _bufferObjectType, _type) {
	//c.Log(LOG_WEBGL, "UpdateBuffer:" + in_handle + " " + in_arrayData + " " + _bufferObjectType + " " + _type);

	/** @type {!number} */
	var bufferObjectType = (undefined === _bufferObjectType) ? c.WebGL.ARRAY_BUFFER : _bufferObjectType;

	if (null !== this.m_webGL) {
		this.m_webGL.bindBuffer(bufferObjectType, in_handle);
	}
	this.GetError();

	/** @type {!number} */
	var type = (undefined === _type) ? c.WebGL.DYNAMIC_DRAW : _type;

	if (null !== this.m_webGL) {
		this.m_webGL.bufferData(bufferObjectType, in_arrayData, type);
	}
	this.GetError();

	return;
}

/**
 * @param {!Object} in_handle
 * @param {!number=} _bufferObjectType
 * @return {undefined}
 */
c.WebGL.prototype.BindBuffer = function(in_handle, _bufferObjectType) {
	//c.Log(LOG_WEBGL, "BindBuffer:" + in_handle + " " + _bufferObjectType);

	/** @type {!number} */
	var bufferObjectType = (undefined === _bufferObjectType) ? c.WebGL.ARRAY_BUFFER : _bufferObjectType;
	if (null != this.m_webGL) {
		this.m_webGL.bindBuffer(bufferObjectType, in_handle);
	}
	this.GetError();

	return;
}

/**
 * @param {!string} in_shaderText
 * @param {!number} in_type
 * @return {?Object}
 */
c.WebGL.prototype.LoadShader = function(in_shaderText, in_type) {
	//c.Log(LOG_WEBGL, "LoadShader:" + in_shaderText + " " + in_type);

	/** @type {?Object} */
	var shaderHandle = null;
	if (null != this.m_webGL) {
		shaderHandle = this.m_webGL.createShader(in_type);	
	}
	this.GetError();

	if (null == shaderHandle) {
		return shaderHandle;
	}
		
	// Pass in the shader source.
	if (null != this.m_webGL) {
		this.m_webGL.shaderSource(shaderHandle, in_shaderText);
	}
	this.GetError();
		
	// Compile the shader.
	if (null != this.m_webGL) {
		this.m_webGL.compileShader(shaderHandle);
	}
	this.GetError();

	// Get the compilation status.
	/** @type {!boolean} */
	var compiled = false;
	if (null != this.m_webGL) {
		compiled = this.m_webGL.getShaderParameter(shaderHandle, this.m_webGL.COMPILE_STATUS);		
	}
	this.GetError();

	/** @type {!string} */
	var errorInfo = "";
	// If the compilation failed, delete the shader.
	if (true != compiled) {
		if (null != this.m_webGL) {
			errorInfo = this.m_webGL.getShaderInfoLog(shaderHandle);
		}
		this.GetError();

		if (null != this.m_webGL) {
			this.m_webGL.deleteShader(shaderHandle);
		}
		this.GetError();
		shaderHandle = null;
	}

	if (null == shaderHandle) {
		c.Log(LOG_WEBGL, "Error creating shader: " + errorInfo, true);
	}
	
	return shaderHandle;
}

/**
 * @param {?Object} inout_attributeMap
 * @param {?Object} inout_uniformMap
 * @param {?Object} in_vertexShaderHandle
 * @param {?Object} in_fragmentShaderHandle
 * @return {?Object}
 */
c.WebGL.prototype.LinkProgram = function(inout_attributeMap, inout_uniformMap, in_vertexShaderHandle, in_fragmentShaderHandle) {
	//c.Log(LOG_WEBGL, "LinkProgram:" + inout_attributeMap + " " + inout_uniformMap + " " + in_vertexShaderHandle + " " + in_fragmentShaderHandle);

	if ((null === in_vertexShaderHandle) || (null === in_fragmentShaderHandle)) {
		return null;
	}

	// Create a program object and store the handle to it.
	/** @type {?Object} */
	var programHandle = null;
	if (null != this.m_webGL) {
		programHandle = this.m_webGL.createProgram();
	}
	this.GetError();

	if (null == programHandle) {
		return programHandle;
	}
	
	if (null != this.m_webGL) {
		this.m_webGL.attachShader(programHandle, in_vertexShaderHandle);
	}
	this.GetError();

	if (null != this.m_webGL) {
		this.m_webGL.attachShader(programHandle, in_fragmentShaderHandle);
	}
	this.GetError();
	
	/** @type {!Array} */
	var attributeKeyArray = (null !== inout_attributeMap) ? Object.keys(inout_attributeMap) : [];
	/** @type {!number} */
	var index = 0;
	/** @type {!string} */
	var key = "";

	for (index = 0; index < attributeKeyArray.length; ++index) {
		key = attributeKeyArray[index];
		//c.Log(LOG_WEBGL, "LinkProgram attribute key:" + key + " index:" + index);
		if (null != this.m_webGL) {
			this.m_webGL.bindAttribLocation(programHandle, index, key);
		}
		this.GetError();
	}		
		
	if (null != this.m_webGL) {
		this.m_webGL.linkProgram(programHandle);
	}
	this.GetError();

	// Get the link status.
	/** @type {!boolean} */
	var linked = false;
	if (null != this.m_webGL) {
		linked = this.m_webGL.getProgramParameter(programHandle, this.m_webGL.LINK_STATUS);
	}
	this.GetError();

	if (true != linked) {				
		if (null != this.m_webGL) {
			this.m_webGL.deleteProgram(programHandle);
		}
		this.GetError();
		return null
	}

	//inout_attributeMap
	for (index = 0; index < attributeKeyArray.length; ++index) {
		key = attributeKeyArray[index];
		if (null != this.m_webGL) {
			inout_attributeMap[key] = this.m_webGL.getAttribLocation(programHandle, key);
		}
		this.GetError();
	}

	//inout_uniformMap
	if (null != inout_uniformMap) {
		/** @type {!Array} */
		var uniformKeyArray = (null !== inout_uniformMap) ? Object.keys(inout_uniformMap) : [];
		for (index = 0; index < uniformKeyArray.length; ++index) {
			key = uniformKeyArray[index];
			if (null != this.m_webGL) {
				inout_uniformMap[key] = this.m_webGL.getUniformLocation(programHandle, key);
			}
			this.GetError();
		}
	}	

	return programHandle;
}

/**
 * @param {!string} in_uniformName
 * @param {!number} in_uniformLocation
 * @param {!number} in_type
 * @param {?} in_value
 * @return {undefined}
 */
c.WebGL.prototype.ApplyUniform = function(in_uniformName, in_uniformLocation, in_type, in_value) {
	if (null != this.m_webGL) {
		switch (in_type) {
		default:
			c.Log(LOG_WEBGL, "unsupported type" + in_type);
			break;
		case c.ShaderUniform.s_type.Integer:
			this.m_webGL.uniform1i(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Integer2:
			this.m_webGL.uniform2iv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Integer3:
			this.m_webGL.uniform3iv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Integer4:
			this.m_webGL.uniform4iv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Float:
			this.m_webGL.uniform1f(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Float2:
			this.m_webGL.uniform2fv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Float3:
			this.m_webGL.uniform3fv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Float4:
			this.m_webGL.uniform4fv(in_uniformLocation, in_value);
			break;
		case c.ShaderUniform.s_type.Float16:
			var transpose = false;
			//console.log(in_value);
			this.m_webGL.uniformMatrix4fv(in_uniformLocation, transpose, in_value);
			break;

			//if (DEBUG) { 
			//	var test = in_webGL.m_webGL.getUniform(this.m_programHandle, in_shaderUniform.m_value);
			//	c.Log(LOG_SHADER, "ApplyUniform getUniform:" + typeof(test) + " " + test);
			//}
		}
	}

	this.GetError();

	return;
}

/**
 * @param {!number} in_width
 * @param {!number} in_height
 * @param {!Uint8Array}	in_data
 * @param {!number} in_internalFormat
 * @param {!number} in_format
 * @param {!number} in_type
 * @param {!boolean} in_flip
 * @param {!number} in_magFilter
 * @param {!number} in_minFilter
 * @param {!number} in_wrapS
 * @param {!number} in_wrapT
 * @return {(null|number)}
 */
c.WebGL.prototype.CreateTexture = function(
	in_width,
	in_height,
	in_data,
	in_internalFormat,
	in_format,
	in_type,
	in_flip,
	in_magFilter,
	in_minFilter,
	in_wrapS,
	in_wrapT
	) {
	if (null === this.m_webGL){
		return null;
	}
	var result = this.m_webGL.createTexture();

	this.m_webGL.bindTexture(c.WebGL.TEXTURE_2D, result);

	if (true == in_flip){
		this.m_webGL.pixelStorei(c.WebGL.UNPACK_FLIP_Y_WEBGL, true);
	}
	this.m_webGL.texImage2D(
		c.WebGL.TEXTURE_2D,		//GLenum target, 
		0,									//GLint level, 
		in_internalFormat,				//GLenum internalformat, 
		in_width,						//GLsizei width, 
		in_height,						//GLsizei height, 
		0,									//GLint border, 
		in_format,						//GLenum format, 
		in_type,						//GLenum type, 
		(undefined == in_data) ? null : in_data //ArrayBufferView? pixels
		);
	this.m_webGL.texParameteri(c.WebGL.TEXTURE_2D, c.WebGL.TEXTURE_MAG_FILTER, in_magFilter);
	this.m_webGL.texParameteri(c.WebGL.TEXTURE_2D, c.WebGL.TEXTURE_MIN_FILTER, in_minFilter);
	this.m_webGL.texParameteri(c.WebGL.TEXTURE_2D, c.WebGL.TEXTURE_WRAP_S, in_wrapS);
	this.m_webGL.texParameteri(c.WebGL.TEXTURE_2D, c.WebGL.TEXTURE_WRAP_T, in_wrapT);
	this.m_webGL.bindTexture(c.WebGL.TEXTURE_2D, null);

	this.GetError();

	return result;
}

/**
 * @param {!number} in_textureHandle
 * @param {!number} in_index
 * @return {undefined}
 */
c.WebGL.prototype.ActivateTexture = function(in_textureHandle, in_index) {
	//c.Log(LOG_WEBGL, "ActivateTexture:" + in_textureHandle + " " + in_index);

	if (null != this.m_webGL) {
		this.m_webGL.activeTexture(this.m_webGL.TEXTURE0 + in_index);
	}
	this.GetError();

	if (null != this.m_webGL) {
		this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, in_textureHandle);
	}
	this.GetError();

	return;	
}

/**
 * @param {!c.Material} in_material
 * @return {undefined}
 */
c.WebGL.prototype.ApplyMaterial = function(in_material) {
	this.m_webGL.useProgram(in_material.m_shader.m_programHandle);
	for (var key in in_material.m_shader.m_mapUniformLocation) {
		var location = in_material.m_shader.m_mapUniformLocation[key];
		var shaderUniform = in_material.m_uniformMap[key];
		if ((undefined === shaderUniform) || (undefined === shaderUniform.m_value)){
			c.Log(LOG_WEBGL, "ApplyMaterial shaderUniform not found key:" + key);
			continue;
		}
		this.ApplyUniform(key, location, shaderUniform.m_type, shaderUniform.m_value.GetValue());
	}
	this.GetError();

	if (null != this.m_webGL) {
		if (true === in_material.m_depthWrite){
			this.m_webGL.depthMask(true);
		} else {
			this.m_webGL.depthMask(false);
		}
		this.GetError();
	}

	
	if (null != this.m_webGL) {
		var test = (in_material.m_depthTestFunc !== c.WebGL.NEVER);
		this.Enable(c.WebGL.DEPTH_TEST, test);
		if (true === test){
			this.m_webGL.depthFunc(in_material.m_depthTestFunc);
		}
		this.GetError();
	}

	return;
}

/**
 * @param {!number} in_capability
 * @param {!boolean} in_enable
 * @return {undefined}
 */
c.WebGL.prototype.Enable = function(in_capability, in_enable) {
	if (null !== this.m_webGL) {
		if (true === in_enable)
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

/**
 * @param {!c.Model} in_model
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @param {!number=} _first
 * @param {!number=} _count
 * @return {undefined}
 */
c.WebGL.prototype.RenderModel = function(in_model, in_mapAttributeLocation, _first, _count) {
	if (null != in_model)
	{
		this.SubDrawModelPre(in_model, in_mapAttributeLocation);
		this.SubDrawModel(in_model, _first, _count);
		this.SubDrawModelPost(in_mapAttributeLocation);
	}
	return;
}

/**
 * @param {!c.Model} in_model
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @return {undefined}
 */
c.WebGL.prototype.SubDrawModelPre = function(in_model, in_mapAttributeLocation) {
	for (/** @type {!string} */ var key in in_mapAttributeLocation) {
		/** @type {?number} */
		var position = in_mapAttributeLocation[key];
		if ((null === position) || (-1 === position)){
			continue;
		}

		//c.Log(LOG, "SubDrawModelPre key:" + key);

		if (!(key in in_model.m_mapDataStream)) {
			continue;
		}

		//c.Log(LOG, "SubDrawModelPre key found");

		/** @type {!c.ModelDataStream} */
		var dataStream = in_model.m_mapDataStream[key];

		if (null != this.m_webGL) {
			this.m_webGL.bindBuffer(c.WebGL.ARRAY_BUFFER, dataStream.m_bufferHandle);
		}
		this.GetError();

		if (null != this.m_webGL) {
			this.m_webGL.enableVertexAttribArray(position);
		}
		this.GetError();

		if (null != this.m_webGL) {
			//gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
			this.m_webGL.vertexAttribPointer(
				position, 
				dataStream.m_elementsPerVertex, 
				dataStream.m_type, 
				dataStream.m_normalise, 
				0, 
				0);
		}
		this.GetError();
	};

	if (in_model.m_elementIndexHandle) {
		if (null != this.m_webGL) {
			this.m_webGL.bindBuffer(c.WebGL.ELEMENT_ARRAY_BUFFER, in_model.m_elementIndexHandle);
		}
		this.GetError();
	}

	return;
}

/**
 * @param {!c.Model} in_model
 * @param {!number=} _first
 * @param {!number=} _count
 */
c.WebGL.prototype.SubDrawModel = function(in_model, _first, _count) {
	/** @type {!number} */
	var first = (undefined == _first) ? 0 : _first; 
	/** @type {!number} */
	var count = (undefined == _count) ? in_model.m_elementCount : _count; 

	if (undefined === in_model.m_elementIndex) {
		if (null != this.m_webGL) {
			this.m_webGL.drawArrays(in_model.m_mode, first, count);
		}
		this.GetError();
	} else {
		if (null != this.m_webGL) {
			this.m_webGL.drawElements(in_model.m_mode, count, in_model.m_elementType, first * in_model.m_elementByteSize);
		}
		this.GetError();
	}

	return;
}

/**
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @return {undefined}
 */
c.WebGL.prototype.SubDrawModelPost = function(in_mapAttributeLocation){
	for (var key in in_mapAttributeLocation) {
		/** @type {?number} */
		var position = in_mapAttributeLocation[key];
		if ((null === position) || (-1 === position)){
			continue;
		}

		if (null != this.m_webGL) {
			this.m_webGL.disableVertexAttribArray(position);
		}

		this.GetError();
	}

	return;
}

