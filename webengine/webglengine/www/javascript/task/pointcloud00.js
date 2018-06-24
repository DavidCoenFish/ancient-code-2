Task.PointCloud00 = function(in_framework)
{
	if ( !(this instanceof Task.PointCloud00) )
		alert("Task.PointCloud00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	var width = in_framework.GetCanvasWidth();
	var height = in_framework.GetCanvasHeight();

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	var sceneParam = 
	{
		m_width : width, 
		m_height : height
	};
	this.m_scene = in_framework.m_asset.GetScene("Scene00", in_framework.m_context, sceneParam);
	var cameraNode = DSC.Framework.Asset.Scene.FindNodeByName(this.m_scene, "camera0");
	var cammeraComponent = cameraNode.GetComponent("camera")

	//display list
	var observerRender = DSC.Framework.Asset.Scene.Observer_Render.FactoryRaw(cammeraComponent);
	this.m_scene.AddDisplayList(
		"render",
		DSC.Framework.Asset.Scene.DisplayList.FactoryRaw(
			observerRender,
			"render",
			DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar
			)
		);


	this.m_gui = DSC.Framework.Asset.Gui.FactoryRaw(in_framework);
	if (undefined != cameraNode)
	{
		//slider
		this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Slider.FactoryWidget(
			in_framework,
			"Latitude:",
			"AngiesNewHouse", 
			"SimpleGui", 
			cameraNode.m_localTransform.m_lat,
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
			cameraNode.m_localTransform.m_long,
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
			cameraNode.m_localTransform.m_distance,
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
			cameraNode.m_localTransform.m_posX,
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
			cameraNode.m_localTransform.m_posY,
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
			cameraNode.m_localTransform.m_posZ,
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

	return;
}

Task.PointCloud00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	in_framework.m_context.SetViewport(_originX, _originY, _sizeX, _sizeY);
	in_framework.m_context.Clear(DSC.Math.Colour.s_grey);

	this.m_scene.VisitDisplayList(
		in_framework.m_context, 
		"render"
		);

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(in_framework.m_context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	return true;
}

Task.PointCloud00.FactoryRaw = function(in_framework)
{
	return new Task.PointCloud00(in_framework);
}
