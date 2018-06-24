Task.Cloth00 = function(in_framework)
{
	if ( !(this instanceof Task.Cloth00) )
		alert("Task.Cloth00: call constuctor with new keyword");	

	if ( !(in_framework instanceof DSC.Framework) )
		alert("in_framework: param wrong type");	

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);
	this.m_time = 0.0;

	this.MakeScene(in_framework);
	this.MakeGui(in_framework);

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

Task.Cloth00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	var context = in_framework.m_context;
	context.SetViewport(_originX, _originY, _sizeX, _sizeY);
	context.Clear(DSC.Math.Colour.s_grey, 1.0);

	this.m_time += in_timeDelta;

	if (this.m_clothNode)
	{
		this.m_clothNode.m_localTransform.m_posX.SetValue(Math.sin(this.m_time));
		this.m_clothNode.m_localTransform.m_posZ.SetValue(Math.cos(this.m_time));
	}

	this.m_scene.VisitDisplayList(
		in_timeDelta, 
		"update"
		);

	context.ApplyRenderTarget(undefined);
	context.SetViewport(_originX, _originY, _sizeX, _sizeY);
	context.Clear(DSC.Math.Colour.s_grey, 1.0);
	this.m_scene.VisitDisplayList(
		in_framework.m_context, 
		"render"
		);

	this.m_textureCheckMaterial.m_textureArray[0] = this.m_clothComponent.m_clothResources.GetPosBTexture();
	context.ApplyMaterial(this.m_textureCheckMaterial);
	context.DrawModel(this.m_modelQuad);

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		this.m_font.Draw(context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);
	}

	return true;
}


Task.Cloth00.prototype.MakeScene = function(in_framework)
{
	DSC.Framework.Asset.Scene.Component.Cloth.GenerateMesh("test", 2, 2);
	DSC.Framework.Asset.Scene.Component.Cloth.GenerateMesh("Cloth00", 8, 8);

	var width = in_framework.GetCanvasWidth();
	var height = in_framework.GetCanvasHeight();
	var sceneParam = 
	{
		m_width : width, 
		m_height : height
	};
	this.m_scene = in_framework.m_asset.GetScene("Scene00", in_framework.m_context, sceneParam);

	//display list update
	observerUpdate = DSC.Framework.Asset.Scene.Observer_Update.FactoryRaw(in_framework.m_context);
	this.m_scene.AddDisplayList(
		"update",
		DSC.Framework.Asset.Scene.DisplayList.FactoryRaw(
			observerUpdate,
			"update",
			DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNone
			)
		);

	//display list render
	var cameraNode = DSC.Framework.Asset.Scene.FindNodeByName(this.m_scene, "camera0");
	var cammeraComponent = cameraNode.GetComponent("camera")
	var observerRender = DSC.Framework.Asset.Scene.Observer_Render.FactoryRaw(cammeraComponent);
	this.m_scene.AddDisplayList(
		"render",
		DSC.Framework.Asset.Scene.DisplayList.FactoryRaw(
			observerRender,
			"render",
			DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar
			)
		);

	//cloth node
	this.m_clothNode = DSC.Framework.Asset.Scene.FindNodeByName(this.m_scene, "cloth"); 
	this.m_clothComponent = this.m_clothNode.GetComponent("update");

	return;
}

Task.Cloth00.prototype.MakeGui = function(in_framework)
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

Task.Cloth00.FactoryRaw = function(in_framework)
{
	return new Task.Cloth00(in_framework);
}
