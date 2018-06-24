/*
	OnContextLost
	OnContextRestored(in_context)

	change map uniforms to have uniform type
*/

/**
 * @private
 * @constructor
 */
DSC.Framework.Asset.Shader = function(
	in_mapVertexAttribute, 
	in_mapUniform,
	in_vertexShaderSource, 
	in_fragmentShaderSource,
	_context
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Shader) )
		alert("DSC.Framework.Asset.Shader: call constuctor with new keyword");

	this.m_mapVertexAttribute = in_mapVertexAttribute;
	this.m_mapUniform = in_mapUniform;
	this.m_vertexShaderSource = in_vertexShaderSource;
	this.m_fragmentShaderSource = in_fragmentShaderSource;

	this.m_programHandle = undefined;

	if (undefined != _context)
	{
		_context.InitShader(this);
	}

	return;
}
DSC.Framework.Asset['Shader'] = DSC.Framework.Asset.Shader;

/**
 * @return {!DSC.Framework.Asset.Shader}
 */
DSC.Framework.Asset.Shader.Factory = function(
	in_vertexShaderSource,
	in_fragmentShaderSource,
	in_mapVertexAttribute, 
	in_mapUniform,
	_context
	)
{
	return new DSC.Framework.Asset.Shader(in_mapVertexAttribute, in_mapUniform, in_vertexShaderSource, in_fragmentShaderSource, _context);
}

DSC.Framework.Asset.Shader.prototype.Init = function(in_webGL)
{
	var vertexShader = in_webGL.LoadShader(this.m_vertexShaderSource, DSC.Framework.Context.WebGL.VERTEX_SHADER);
	var fragmentShader = in_webGL.LoadShader(this.m_fragmentShaderSource, DSC.Framework.Context.WebGL.FRAGMENT_SHADER);

	this.m_programHandle = undefined;
	this.m_programHandle = in_webGL.LinkProgram(
		this.m_mapVertexAttribute,
		this.m_mapUniform,
		vertexShader,
		fragmentShader
		);

	return;
}

DSC.Framework.Asset.Shader.prototype.OnContextLost = function()
{
	this.m_programHandle = undefined;
}

DSC.Framework.Asset.Shader.prototype.OnContextRestored = function(in_context)
{
	in_context.InitShader(this);
}

DSC.Framework.Asset.Shader.prototype.ApplyUniform = function(in_webGL, in_key, in_value)
{
	if (!(in_key in this.m_mapUniform))
		return;
	var uniform = this.m_mapUniform[in_key]; 

	var handle = uniform.m_location;
	if (undefined == handle)
	{
		console.info("DSC.Framework.Asset.Shader.ApplyUniform undefined handle for " + in_key);
		return;
	}
	switch (uniform.m_type)
	{
	default:
		alert ("unsupported type" + uniform.m_type);
		break;
	case DSC.Framework.Context.Uniform.s_type.TVector2:
		in_webGL.SetUniformFloat2(handle, in_value);
		break;
	case DSC.Framework.Context.Uniform.s_type.TVector3:
	case DSC.Framework.Context.Uniform.s_type.TColour3:
		in_webGL.SetUniformFloat3(handle, in_value);
		break;
	case DSC.Framework.Context.Uniform.s_type.TVector4:
	case DSC.Framework.Context.Uniform.s_type.TColour4:
	case DSC.Framework.Context.Uniform.s_type.TFrame:
	case DSC.Framework.Context.Uniform.s_type.TQuaternion:
		in_webGL.SetUniformFloat4(handle, in_value);
		break;
	case DSC.Framework.Context.Uniform.s_type.TMatrix4:
		in_webGL.SetUniformFloat16(handle, in_value);
		break;
	case DSC.Framework.Context.Uniform.s_type.TDualQuaternion:
		break;
	case DSC.Framework.Context.Uniform.s_type.TInteger:
		in_webGL.SetUniformInteger(handle, in_value);
		break;
	case DSC.Framework.Context.Uniform.s_type.TFloat:
		in_webGL.SetUniformFloat(handle, in_value);
		break;
	}
}

DSC.Framework.Asset.Shader.prototype.Apply = function(in_webGL, _uniformCollectionA, _uniformCollectionB)
{
	in_webGL.UseProgram(this.m_programHandle);

	for (var key in this.m_mapUniform)
	{
		var handle = this.m_mapUniform[key];
		var value = undefined;
		if ((undefined != _uniformCollectionB))
			value = _uniformCollectionB.GetUniform(key);
		if ((undefined == value) && (undefined != _uniformCollectionA))
			value = _uniformCollectionA.GetUniform(key);
		if (undefined == value)
			continue;
		this.ApplyUniform(in_webGL, key, value);
	};

	return;
}
