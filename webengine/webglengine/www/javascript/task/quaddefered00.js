Task.QuadDefered00 = function(in_framework)
{
	if ( !(this instanceof Task.QuadDefered00) )
		alert("Task.QuadDefered00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	this.m_modelMesh = in_framework.m_asset.NewModel(
		"Default", 
		in_framework.m_context,
		{
			m_mode : DSC.Framework.Context.WebGL.TRIANGLES,
			m_elementCount : 96,
			m_mapDataStream :  	{
				a_position : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
					DSC.Framework.Context.WebGL.BYTE,
					3,
					new DSC.Common.t_s8Array([
						-128, 127, -128,
						-128, 127, 127,
						127, 127, 127,
						127, 127, -128,
						127, 127, -128,

						-128, 42, -128,
						-128, 42, 127,
						127,  42, 127,
						127,  42, -128,
						127,  42, -128,

						-128, -43, -128,
						-128, -43, 127,
						127,  -43, 127,
						127,  -43, -128,
						127,  -43, -128,

						-128, -128, -128,
						-128, -128, 127,
						127,  -128, 127,
						127,  -128, -128,
						127,  -128, -128,

						-128, -128, -128,
						-128, -128, 127,
						127, -128, 127,
						127, -128, -128,
						127, -128, -128,
						]),
						DSC.Framework.Context.WebGL.STATIC_DRAW,
						true
					),
				a_uv : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
					DSC.Framework.Context.WebGL.FLOAT,
					2,
					new DSC.Common.t_floatArray([
						-0.75, 0.751,
						-0.25, 0.751,
						 0.25, 0.751,
						 0.75, 0.751,
						 1.25, 0.751,

						-0.75, 0.25,
						-0.25, 0.25,
						 0.25, 0.25,
						 0.75, 0.25,
						 1.25, 0.25,

						-0.75, -0.25,
						-0.25, -0.25,
						 0.25, -0.25,
						 0.75, -0.25,
						 1.25, -0.25,

						-0.75, -0.75,
						-0.25, -0.75,
						 0.25, -0.75,
						 0.75, -0.75,
						 1.25, -0.75,

						-0.75, -1.25,
						-0.25, -1.25,
						 0.25, -1.25,
						 0.75, -1.25,
						 1.25, -1.25,

						]),
						DSC.Framework.Context.WebGL.STATIC_DRAW,
						false
				),

			},
			m_elementIndex : new DSC.Common.t_u8Array([
				0, 1, 5, 1, 6, 5,
				1, 2, 6, 2, 7, 6,
				2, 3, 7, 3, 8, 7,
				3, 4, 8, 4, 9, 8,

				5, 6, 10, 6, 11, 10,
				6, 7, 11, 7, 12, 11,
				7, 8, 12, 8, 13, 12,
				8, 9, 13, 9, 14, 13,

				10, 11, 15, 11, 16, 15,
				11, 12, 16, 12, 17, 16,
				12, 13, 17, 13, 18, 17,
				13, 14, 18, 14, 19, 18,

				15, 16, 19, 16, 20, 19,
				16, 17, 20, 17, 21, 20,
				17, 18, 21, 18, 22, 21,
				18, 19, 22, 19, 23, 22,
			])
		}
		);

	this.MakeInitialPass(in_framework);
	this.MakePresentPass(in_framework);
	this.MakeGui(in_framework);

	return;
}

Task.QuadDefered00.s_offscreenWidth = 4;
Task.QuadDefered00.s_offscreenHeight = 4;
Task.QuadDefered00.s_showFirstRenderBuffer = false;

Task.QuadDefered00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	var context = in_framework.m_context;

	if (undefined != this.m_initialRenderPass)
		this.m_initialRenderPass.Apply(context);

	if (true != Task.QuadDefered00.s_showFirstRenderBuffer)
	{
		if (undefined != this.m_presentRenderPass)
		{
			context.SetViewport(_originX, _originY, _sizeX, _sizeY);
			this.m_presentRenderPass.Apply(context);		
		}
	}

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	return true;
}


Task.QuadDefered00.prototype.MakeInitialPass = function(in_framework)
{
	var textureMag = {
		m_width : Task.QuadDefered00.s_offscreenWidth,
		m_height : Task.QuadDefered00.s_offscreenHeight,
		m_magFilter : DSC.Framework.Context.WebGL.NEAREST,
		m_minFilter : DSC.Framework.Context.WebGL.NEAREST
	};

	this.m_initialRenderTargetColour = in_framework.m_asset.NewTexture("RGBAByte", in_framework.m_context, textureMag);

	this.m_initialRenderTarget = in_framework.m_asset.NewRenderTarget(
		"Default", 
		in_framework.m_context, 
		{
			m_width : Task.QuadDefered00.s_offscreenWidth,
			m_height : Task.QuadDefered00.s_offscreenHeight			
		},
		{
			"colour0" : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(this.m_initialRenderTargetColour)
		}
	);

	this.m_initialRenderPass = in_framework.m_asset.NewRenderPass(
		"Default", 
		in_framework.m_context, 
		{
			m_clearColour : DSC.Math.Colour.s_transparent
		}, 
		{
			m_task : this,
			Draw : function(sub_context)
			{
				sub_context.ApplyMaterial(this.m_task.m_initialPassMaterial);
				sub_context.DrawModel(this.m_task.m_modelMesh);
			}
		},
		(true == Task.QuadDefered00.s_showFirstRenderBuffer) ? undefined : this.m_initialRenderTarget
		);

	var shader = in_framework.m_asset.NewShader(
		"Default", 
		in_framework.m_context, 
		{ 
			m_vertexShaderSource : "\
attribute vec3 a_position;\
attribute vec2 a_uv;\
varying vec3 v_position;\
void main() {\
	gl_Position = vec4(a_uv, 0.0, 1.0);\
	v_position = a_position;\
}",
			m_fragmentShaderSource : "\
precision mediump float;\
varying vec3 v_position;\
void main() {\
	gl_FragColor = vec4((v_position * 0.5) + 0.5, 1.0);\
}",
			m_mapVertexAttributeNames : {
				a_position : -1, 
				a_uv : -1			
			},
			m_mapUniformsNames : undefined
		});

	this.m_initialPassMaterial = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context, 
		{
			m_shader : shader,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({})
		);	
	return;
}

Task.QuadDefered00.prototype.MakePresentPass = function(in_framework)
{
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
void main() {\
	gl_FragColor = texture2D(u_sampler0, v_uv);\
}",
			m_mapVertexAttributeNames : {
				a_position : -1, 
				a_uv : -1			
			},
			m_mapUniformsNames : {
				"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
			}
		});

	var material = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context, 
		{ 
			m_shader : shader,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({}),
		[this.m_initialRenderTargetColour]
	);	

	this.m_presentRenderPass = in_framework.m_asset.NewRenderPass(
		"Default", 
		in_framework.m_context, 
		{
			m_model : "QuadAPos2AUv2",
		},
		undefined, 	
		undefined, 	
		undefined, 	
		material
	);

	return;
}

Task.QuadDefered00.prototype.MakeGui = function(in_framework)
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

Task.QuadDefered00.FactoryRaw = function(in_framework)
{
	return new Task.QuadDefered00(in_framework);
}
