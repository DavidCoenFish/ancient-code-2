Task.RayMarch00 = function(in_framework)
{
	if ( !(this instanceof Task.RayMarch00) )
		alert("Task.RayMarch00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	this.m_quad = in_framework.m_asset.GetModel("QuadAPos2", in_framework.m_context);

	this.m_cameraMatrix = DSC.DNG.Pool.MatrixLatLongPos.Factory(
		0.2, -0.5, 30.0, 
		0.0, 2.0, 0.0
		);

	this.m_projectionWidthDNG = DSC.DNG.Node.FactoryRaw(640.0);
	this.m_projectionHeightDNG = DSC.DNG.Node.FactoryRaw(480.0);
	this.m_projectionRadiusDNG = DSC.DNG.Node.FactoryRaw(600.0);
	this.m_projectionFarDNG = DSC.DNG.Node.FactoryRaw(100.0);
	this.m_projectionDNG = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector4, undefined, "m_projectionDNG");
	DSC.DNG.Container.LinkNodes(this.m_projectionDNG, this.m_projectionWidthDNG, 0);
	DSC.DNG.Container.LinkNodes(this.m_projectionDNG, this.m_projectionHeightDNG, 1);
	DSC.DNG.Container.LinkNodes(this.m_projectionDNG, this.m_projectionRadiusDNG, 2);
	DSC.DNG.Container.LinkNodes(this.m_projectionDNG, this.m_projectionFarDNG, 3);

	this.m_material = in_framework.m_asset.NewMaterial(
		"Default", 
		in_framework.m_context, 
		{ 
			m_shaderName : "RayMarch00" 
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_cameraMat : DSC.Framework.Context.Uniform_DNG.FactoryRaw(
				this.m_cameraMatrix.m_matrix,
				DSC.Framework.Context.Uniform.s_type.TMatrix4
				),
			u_projection : DSC.Framework.Context.Uniform_DNG.FactoryRaw(
				this.m_projectionDNG,
				DSC.Framework.Context.Uniform.s_type.TVector4
				),
			})
		);

	this.m_gui = DSC.Framework.Asset.Gui.FactoryRaw(in_framework);

		//slider
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"Latitude:",
			"AngiesNewHouse", 
			"SimpleGui", 
			this.m_cameraMatrix.m_lat,
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
			this.m_cameraMatrix.m_long,
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
			this.m_cameraMatrix.m_distance,
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
			this.m_cameraMatrix.m_posX,
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
			this.m_cameraMatrix.m_posY,
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
			this.m_cameraMatrix.m_posZ,
			-1000.0,
			1000.0,
			0.1,
			DSC.Math.Coordinate.FactoryRaw(1.0, 1.0, undefined, -100, -190), 
			DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 30)
			));

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

	return;
}

Task.RayMarch00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	in_framework.m_context.SetViewport(_originX, _originY, _sizeX, _sizeY);
	in_framework.m_context.Clear(DSC.Math.Colour.s_grey);

	in_framework.m_context.ApplyMaterial(this.m_material);
	in_framework.m_context.DrawModel(this.m_quad);

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(in_framework.m_context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	return true;
}

Task.RayMarch00.FactoryRaw = function(in_framework)
{
	return new Task.RayMarch00(in_framework);
}
