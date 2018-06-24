Task.Quad00 = function(in_framework)
{
	if ( !(this instanceof Task.Quad00) )
		alert("Task.Quad00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	this.MakeQuad(in_framework);
	this.MakeGui(in_framework);

	return;
}

Task.Quad00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	var context = in_framework.m_context;

	context.ApplyMaterial(this.m_material);
	context.DrawModel(this.m_modelQuad);

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	return true;
}


Task.Quad00.prototype.MakeQuad = function(in_framework)
{
	this.m_modelQuad = in_framework.m_asset.GetModel("QuadAPos2AUv2", in_framework.m_context);
	var shader = in_framework.m_asset.NewShader(
		"Default", 
		in_framework.m_context, 
		{ 
			m_vertexShaderSource : "\
attribute vec2 a_position;\
attribute vec2 a_uv;\
varying vec2 v_uv;\
void main() {\
	gl_Position = vec4(a_position, 0.0, 1.0);\
	v_uv = a_uv;\
}",
			m_fragmentShaderSource : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
varying vec2 v_uv;\
vec4 FractionalBrownianMotion(float u, float v, float w)\
{\
	vec4 result = vec4(0.0, 0.0, 0.0, 0.0);\
    float weightSum = 0.5;\
    float dx = 0.0;\
    float dz = 0.0;\
    for( int i=0; i < 8 ; i++ )\
    {\
		vec4 sampleColour = texture2D(u_sampler0, vec2(u, v));\
        dx += (sampleColour.x - 0.5) * 2.0;\
        dz += (sampleColour.y - 0.5) * 2.0;\
        float weight =  weightSum / (1.0 + dx*dx + dz*dz);\
		result += sampleColour * weight;\
		weightSum *= 0.5;\
		u *= 2.0;\
		v *= 2.0;\
	}\
	return result;\
}\
void main() {\
	vec4 sampleColour = FractionalBrownianMotion(v_uv.x / 8.0, v_uv.y / 8.0, 0.0);\
	float value = sampleColour.a;\
	gl_FragColor = vec4(value, value, value, 1.0);\
}",

//        float weight =  weightSum / (1.0 + dx*dx + dz*dz);\

			m_mapVertexAttributeNames : {
				a_position : -1, 
				a_uv : -1			
			},
			m_mapUniformsNames : {
				"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger)
			}
		});

	var textureData = {
		m_width : 64,
		m_height : 64,
		m_data : undefined,		
		m_wrapS : DSC.Framework.Context.WebGL.REPEAT,
		m_wrapT : DSC.Framework.Context.WebGL.REPEAT
	};
	var arrayData = [];
	for (var index = 0; index < (textureData.m_width * textureData.m_height); ++index)
	{	
		arrayData.push(0);
		arrayData.push(0);
		arrayData.push(0);
		value = Math.max(0, Math.min(255, Math.floor(Math.random() * 256)));
		arrayData.push(value);
	}
	for (var indexY = 0; indexY < textureData.m_height; ++indexY)
	{
		for (var indexX = 0; indexX < textureData.m_width; ++indexX)
		{
			var trace = (indexY * textureData.m_width) + indexX;
			var traceXmin1 = (indexY * textureData.m_width) + ((indexX - 1 + textureData.m_width) % textureData.m_width);
			var traceYmin1 = (((indexY - 1 + textureData.m_height) % textureData.m_height) * textureData.m_width) + indexX;
			var orig = arrayData[(trace * 4) + 3];
			var xmin1 = arrayData[(traceXmin1 * 4) + 3];
			var ymin1 = arrayData[(traceYmin1 * 4) + 3];
			arrayData[(trace * 4) + 0] = Math.max(0, Math.min(255, Math.floor(((xmin1 - orig) / 2.0) + 128)));
			arrayData[(trace * 4) + 1] = Math.max(0, Math.min(255, Math.floor(((ymin1 - orig) / 2.0) + 128)));
		}
	}
	textureData.m_data = new DSC.Common.t_u8Array(arrayData);
	this.m_noiseTexture = in_framework.m_asset.NewTexture("RGBAByte", in_framework.m_context, textureData);

	this.m_material = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context, 
		{
			m_shader : shader,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({}),
		[this.m_noiseTexture]
		);	
	return;
}

Task.Quad00.prototype.MakeGui = function(in_framework)
{
	this.m_gui = DSC.Framework.Asset.Gui.FactoryRaw(in_framework);
	this.m_continue = true;
	var that = this;
	this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Math.Coordinate.FactoryRaw(1.0, 0.0, undefined, -100, 10), 
		DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 20),
		{	
			"CallbackDown" : function()
			{
				that.m_continue = false;
			}
		},
		[
			DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
				in_framework, 
				"SimpleGui", 
				DSC.Framework.Asset.Widget.s_key.TPannel,
				DSC.Framework.Asset.Gui.s_state.e_static,
				DSC.Framework.Asset.Gui.s_subState.e_background
				),
			DSC.Framework.Asset.Gui.Text.FactoryRaw(
				in_framework.m_asset.GetFont("AngiesNewHouse", in_framework.m_context), 
				DSC.Framework.Asset.Gui.s_state.e_default, 
				DSC.Framework.Asset.Gui.s_subState.e_foreground,
				"Exit", 
				DSC.Math.Coordinate.FactoryRaw(0.35, 0.0), 
				DSC.Math.Coordinate.FactoryRaw(2.0, 2.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY)
				)
		]
		));
}

Task.Quad00.FactoryRaw = function(in_framework)
{
	return new Task.Quad00(in_framework);
}
