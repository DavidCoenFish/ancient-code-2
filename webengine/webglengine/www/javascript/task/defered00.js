Task.Defered00 = function(in_framework)
{
	if ( !(this instanceof Task.Defered00) )
		alert("Task.Defered00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	this.MakeAssets(in_framework);

	var cameraNode = DSC.Framework.Asset.Scene.FindNodeByName(this.m_scene, "camera0");
	var cammeraComponent = cameraNode.GetComponent("camera");
	var sunLightComponent = DSC.Framework.Asset.Scene.FindGlobalComponentByName(this.m_scene, "sunLight");

	var lightNode = DSC.Framework.Asset.Scene.FindNodeByName(this.m_scene, "point light 0");
	this.m_lightComponent = lightNode.GetComponent("globalLight");

	this.MakeRenderPassInitial(in_framework, cammeraComponent);
	this.MakeRenderPassLight(in_framework, cammeraComponent, sunLightComponent);

	var width = in_framework.GetCanvasWidth();
	var height = in_framework.GetCanvasHeight();
	this.MakeRenderPassPresent(in_framework, width, height, Math.max(width, height) * (500.0 / 640.0));

	this.MakeGui(in_framework, cameraNode);

	this.m_textureCheckMaterial = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context,
		{
			m_shaderName : "APos2AUv2UFrame4USample0"
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_frame : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector4.FactoryRaw(-0.75, -0.5, 0.25, 0.5),
				DSC.Framework.Context.Uniform.s_type.TVector4
				)
			}),
		[ undefined ]
		);
	this.m_modelQuad = in_framework.m_asset.GetModel("QuadAPos2AUv2", in_framework.m_context);

	return;
}

Task.Defered00.s_offscreenWidth = 1024;
Task.Defered00.s_offscreenHeight = 512;
Task.Defered00.s_showFirstRenderBuffer = false;

Task.Defered00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	var context = in_framework.m_context;

	if (undefined != this.m_initialRenderPass)
		this.m_initialRenderPass.Apply(context);

	if (true != Task.Defered00.s_showFirstRenderBuffer)
	{
		if (undefined != this.m_lightRenderPass)
			this.m_lightRenderPass.Apply(context);
	
		if (undefined != this.m_presentRenderPass)
		{
			context.SetViewport(_originX, _originY, _sizeX, _sizeY);
			this.m_presentRenderPass.Apply(context);		
		}
	}

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	this.m_textureCheckMaterial.m_textureArray[0] = this.m_lightComponent.m_texture;
	context.ApplyMaterial(this.m_textureCheckMaterial);
	context.DrawModel(this.m_modelQuad);

	return true;
}

Task.Defered00.prototype.MakeAssets = function(in_framework)
{
	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	var data = {};
	data.m_data = DSC.Framework.Asset.Texture.Pool.Noise3d64.MakeData();
	this.m_noise3d64 = in_framework.m_asset.NewTexture("Noise3d64", in_framework.m_context, data); 

	var width = in_framework.GetCanvasWidth();
	var height = in_framework.GetCanvasHeight();
	var sceneParam = 
	{
		m_width : width, 
		m_height : height,
		m_noise : this.m_noise3d64,
		m_lowPerformance : false,
		m_supportHalfFloat : false
	};
	sceneParam.m_lowPerformance = true != in_framework.m_context.SupportsExtention("WEBGL_depth_texture");
	this.m_scene = in_framework.m_asset.GetScene("Scene00", in_framework.m_context, sceneParam);
}

Task.Defered00.prototype.MakeRenderPassInitial = function(in_framework, in_cameraComponent)
{
	var textureMag = {
		m_width : Task.Defered00.s_offscreenWidth,
		m_height : Task.Defered00.s_offscreenHeight,
		m_magFilter : DSC.Framework.Context.WebGL.LINEAR,
		m_minFilter : DSC.Framework.Context.WebGL.LINEAR
	};

	var supportDepth = in_framework.m_context.SupportsExtention("WEBGL_depth_texture");
	var supportHalfFloat = false; //in_framework.m_context.SupportsExtention("OES_texture_half_float");

	this.m_initialRenderTargetColour = in_framework.m_asset.NewTexture((true == supportHalfFloat) ? "RGBAHalfFloat" : "RGBAByte", in_framework.m_context, textureMag);
	if (supportDepth)
	{
		this.m_initialRenderTargetDepth = in_framework.m_asset.NewTexture("DepthUInt", in_framework.m_context, textureMag);
	}

	var mapData = 
	{
		"colour0" : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(this.m_initialRenderTargetColour)
	};
	if (supportDepth)
	{
		mapData["depth0"] = DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(
			this.m_initialRenderTargetDepth,
			undefined,
			DSC.Framework.Context.WebGL.DEPTH_ATTACHMENT
			);
	}

	this.m_initialRenderTarget = in_framework.m_asset.NewRenderTarget(
		"Default", 
		in_framework.m_context, 
		{
			m_width : Task.Defered00.s_offscreenWidth,
			m_height : Task.Defered00.s_offscreenHeight			
		},
		mapData
	);

	this.m_initialRenderPass = in_framework.m_asset.NewRenderPass(
		"Default", 
		in_framework.m_context, 
		{
			m_clearColour : DSC.Math.Colour.s_transparent,
			m_clearDepth : 1.0
		}, 
		{
			m_task : this,
			Draw : function(sub_context)
			{
				this.m_task.m_scene.VisitDisplayList(
					sub_context, 
					"render"
					);
			}
		},
		(true == Task.Defered00.s_showFirstRenderBuffer) ? undefined : this.m_initialRenderTarget
		);

	//display list
	var observerRender = DSC.Framework.Asset.Scene.Observer_Render.FactoryRaw(in_cameraComponent);
	this.m_scene.AddDisplayList(
		"render",
		DSC.Framework.Asset.Scene.DisplayList.FactoryRaw(
			observerRender,
			"render",
			DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar
			)
		);


	return;
}

Task.Defered00.prototype.MakeRenderPassLight = function(in_framework, in_cameraComponent, in_sunLightComponent)
{
	var textureMag = {
		m_width : Task.Defered00.s_offscreenWidth,
		m_height : Task.Defered00.s_offscreenHeight,
		m_magFilter : DSC.Framework.Context.WebGL.LINEAR,
		m_minFilter : DSC.Framework.Context.WebGL.LINEAR
	};

	var supportHalfFloat = in_framework.m_context.SupportsExtention("OES_texture_half_float");
	this.m_lightRenderTargetColour = in_framework.m_asset.NewTexture((true == supportHalfFloat) ? "RGBAHalfFloat" : "RGBAByte", in_framework.m_context, textureMag);

	var mapData = { "colour0" : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(this.m_lightRenderTargetColour) };
	this.m_lightRenderTarget = in_framework.m_asset.NewRenderTarget(
		"Default", 
		in_framework.m_context, 
		{
			m_width : Task.Defered00.s_offscreenWidth,
			m_height : Task.Defered00.s_offscreenHeight			
		},
		mapData
	);

	this.m_lightRenderPass = in_framework.m_asset.NewRenderPass(
		"Default", 
		in_framework.m_context, 
		undefined,
		{
			m_task : this,
			Draw : function(sub_context)
			{
				this.m_task.m_scene.VisitDisplayList(
					sub_context, 
					"globalLight"
					);
			}
		},
		this.m_lightRenderTarget
	);

	var observerLight = DSC.Framework.Asset.Scene.Observer_Light.Factory(
		in_framework.m_asset,
		in_framework.m_context,
		in_cameraComponent,
		in_sunLightComponent,
		false, //supportHalfFloat,
		this.m_initialRenderTargetColour,
		this.m_initialRenderTargetDepth,
		DSC.Math.Colour.FactoryRaw3(0.1, 0.1, 0.1),
		this.m_lightRenderTarget
		);
	this.m_scene.AddDisplayList(
		"globalLight",
		DSC.Framework.Asset.Scene.DisplayList.FactoryRaw(
			observerLight,
			"globalLight",
			DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar
			)
		);

	return;
}

Task.Defered00.prototype.MakeRenderPassPresent = function(in_framework, in_width, in_height, in_fisheyeRadius)
{
	var material = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context, 
		{ m_shaderName : "PassPresent" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_param : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector4.FactoryRaw(in_fisheyeRadius, in_width, in_height, DSC.Framework.Asset.Shader.Pool.PassPresent.CalculateScale(in_fisheyeRadius, in_width, in_height)),
				DSC.Framework.Context.Uniform.s_type.TVector4
				),
			u_gammaRed : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.0, 1.0, 0.5),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_gammaGreen : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.0, 1.0, 0.5),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_gammaBlue : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.0, 1.0, 0.5),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
		}),
		[this.m_lightRenderTargetColour]
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

}

Task.Defered00.prototype.MakeGui = function(in_framework, in_cameraNode)
{
	this.m_gui = DSC.Framework.Asset.Gui.FactoryRaw(in_framework);
	if (undefined != in_cameraNode)
	{
		//slider
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"Latitude:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_lat,
			-Math.PI / 2,
			Math.PI / 2,
			0.01,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -40), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"Longitude:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_long,
			-Math.PI,
			Math.PI,
			0.01,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -70), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30),
			true
			));
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"Distance:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_distance,
			0.0,
			100.0,
			0.1,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -100), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"PosX:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_posX,
			-1000.0,
			1000.0,
			0.1,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -130), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"PosY:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_posY,
			-1000.0,
			1000.0,
			0.1,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -160), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"PosZ:",
			"AngiesNewHouse", 
			"SimpleGui", 
			in_cameraNode.m_localTransform.m_posZ,
			-1000.0,
			1000.0,
			0.1,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -190), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));
	}

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

Task.Defered00.FactoryRaw = function(in_framework)
{
	return new Task.Defered00(in_framework);
}
