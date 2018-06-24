/*
TODO: drag in screen width/ height for populate
*/
DSC.Framework.Asset.Scene.Pool.Scene00 = 
{
	"m_rootNode" : undefined,
	"m_mapDisplayList" : {},
	"Populate" : function(inout_scene, in_asset, in_context, _sceneParam)
	{
		var lowPerformance = (undefined == _sceneParam || undefined == _sceneParam.m_lowPerformance) ? false : _sceneParam.m_lowPerformance;
		var supportHalfFloat = (undefined == _sceneParam || undefined == _sceneParam.m_supportHalfFloat) ? false : _sceneParam.m_supportHalfFloat;

		//camera
		var cameraNode = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixLatLongPos.Factory(
				0.37, -0.3, 2.5,
				0.0, 0.5, 0.0
				),
			"camera0"
			);
		var width = (undefined == _sceneParam || undefined == _sceneParam.m_width) ? 320 : _sceneParam.m_width;
		var height = (undefined == _sceneParam || undefined == _sceneParam.m_height) ? 240 : _sceneParam.m_height;
		var aspect = width / height;
		var cameraComponent = DSC.Framework.Asset.Scene.Component.Camera.FactoryPerspective(
			0.1,
			10.0,
			0.1 * aspect,
			0.1,
			{ "camera" : undefined }
			);
		cameraNode.AddComponent(cameraComponent);
		inout_scene.AddNode(undefined, cameraNode);

		//platform
		{
			var model = in_asset.GetModel("Model00", in_context);
			var material;
			if (true == lowPerformance)
			{
				material = in_asset.NewMaterial(
					"Default", 
					in_context,
					{
						m_depthFlag : DSC.Framework.Asset.Material.s_depthTestFlag.LessOrEqual,
						m_shaderName : "PassInitial8Flat00",
						m_triangleCull : DSC.Framework.Asset.Material.s_triangleCull.Back,
					},
					DSC.Framework.Context.Uniform.Collection.FactoryRaw({
						u_scale : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector3.FactoryRaw(1.0, 1.0, 1.0),
							DSC.Framework.Context.Uniform.s_type.TVector3
							),
						u_colour : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector4.FactoryRaw(0.25, 0.25, 0.25, 0.25),
							DSC.Framework.Context.Uniform.s_type.TColour4
							),
						})
					);
			}
			else
			{
				material = in_asset.NewMaterial(
					"Default", 
					in_context,
					{
						m_depthFlag : DSC.Framework.Asset.Material.s_depthTestFlag.LessOrEqual,
						m_shaderName : "PassInitial8Stone00",
						m_triangleCull : DSC.Framework.Asset.Material.s_triangleCull.Back,
					},
					DSC.Framework.Context.Uniform.Collection.FactoryRaw({
						u_scale : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector3.FactoryRaw(1.0, 1.0, 1.0),
							DSC.Framework.Context.Uniform.s_type.TVector3
							),
						u_noiseScale : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector3.FactoryRaw(2.0, 2.0, 2.0),
							DSC.Framework.Context.Uniform.s_type.TVector3
							), 
						u_colour0 : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector4.FactoryRaw(0.25, 0.25, 0.25, 0.25),
							DSC.Framework.Context.Uniform.s_type.TColour4
							),
						u_colour1 : DSC.Framework.Context.Uniform.FactoryRaw(
							DSC.Math.Vector4.FactoryRaw(0.0, 0.0, 0.0, 0.25),
							DSC.Framework.Context.Uniform.s_type.TColour4
							),
						}),
					[_sceneParam.m_noise]
					);
			}

			var node0 = DSC.Framework.Asset.Scene.Node.Factory(
				undefined, 
				DSC.DNG.Pool.MatrixPos.Factory(0, 0, 0),
				"platform"
				);
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					material, 
					model,
					DSC.DNG.Node.FactoryRaw(3.0),
					true, 
					{ "render" : undefined }
					)
				);
			inout_scene.AddNode(undefined, node0);
		}

		//background cube
		{
			//var model = in_asset.GetModel("CubeAPos3ANormal3", in_context);
			var model = in_asset.GetModel("PlaneAPos3ANormal3", in_context);
			var material = in_asset.NewMaterial(
				"Default", 
				in_context,
				{
					m_depthFlag : DSC.Framework.Asset.Material.s_depthTestFlag.LessOrEqual,
					m_shaderName : "PassInitial8Flat00",
					m_triangleCull : DSC.Framework.Asset.Material.s_triangleCull.Back,
				},
				DSC.Framework.Context.Uniform.Collection.FactoryRaw({
					u_scale : DSC.Framework.Context.Uniform.FactoryRaw(
						//DSC.Math.Vector3.FactoryRaw(-5.0, -5.0, -5.0),
						DSC.Math.Vector3.FactoryRaw(5.0, 5.0, 5.0),
						DSC.Framework.Context.Uniform.s_type.TVector3
						),
					u_colour : DSC.Framework.Context.Uniform.FactoryRaw(
						DSC.Math.Vector4.FactoryRaw(0.8, 0.8, 0.8, 0.8),
						DSC.Framework.Context.Uniform.s_type.TColour4
						),
					})
				);

			var node0 = DSC.Framework.Asset.Scene.Node.Factory(
				undefined, 
				//DSC.DNG.Pool.MatrixPos.Factory(0, 5.0, 0),
				DSC.DNG.Pool.MatrixPos.Factory(0, 0.0, 0),
				"cube"
				);
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					material, 
					model,
					DSC.DNG.Node.FactoryRaw(15.0),
					true, 
					{ "render" : undefined }
					)
				);
			inout_scene.AddNode(undefined, node0);
		}

		//sun light
		var lightDir = DSC.Math.Vector3.NormalRaw(undefined, 0.6, 0.8, 0.6);
		var sunGlobalComponent = DSC.Framework.Asset.Scene.GlobalComponent.LightDirect.Factory(
			lightDir,
			DSC.Math.Vector3.FactoryRaw(0.5, 0.5, 0.5),
			{ "globalLight" : undefined, "sunLight" : undefined }
			);
		inout_scene.AddGlobalComponent(sunGlobalComponent);

		//drawable axis
		//var materialAxis = in_asset.NewMaterial(
		//	"Blend", 
		//	in_context,
		//	{
		//		m_shaderName : "APos3AColour4UMatrixMVP",
		//		m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T3D,
		//	}
		//);
		//var node1 = DSC.Framework.Asset.Scene.Node.Factory(
		//	undefined, 
		//	DSC.DNG.Pool.MatrixPos.Factory(0.0, 0.0, 0.0),
		//	"axis 0"
		//	);
		//node1.AddComponent(
		//	DSC.Framework.Asset.Scene.Component.Renderable.Factory(
		//		materialAxis, 
		//		in_asset.GetModel("AxisAPos3AColour", in_context), 
		//		DSC.DNG.Node.FactoryRaw(1.0),
		//		true, 
		//		{ "render" : undefined }
		//		)
		//	);
		//inout_scene.AddNode(undefined, node1);

		//point light
		var nodePointLight = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixPos.Factory(-1.0, 0.25, 1.0),
			"point light 0"
			);
		nodePointLight.AddComponent(
			DSC.Framework.Asset.Scene.Component.LightPointShadow.Factory(
				in_asset,
				in_context,
				1024,
				1024,
				256,
				256,
				DSC.Math.Vector3.FactoryRaw(10.0, 0.0, 0.0),
				3.0,
				1.0,
				{ "globalLight" : undefined }
				)
			//DSC.Framework.Asset.Scene.Component.LightPoint.Factory(
			//	DSC.Math.Vector3.FactoryRaw(10.0, 0.0, 0.0),
			//	2.5,
			//	2.0,
			//	{ "globalLight" : undefined }
			//	)
			);
	//	nodePointLight.AddComponent(
	//		DSC.Framework.Asset.Scene.Component.Renderable.Factory(
	//			materialAxis, 
	//			in_asset.GetModel("AxisAPos3AColour", in_context), 
	//			DSC.DNG.Node.FactoryRaw(1.0),
	//			true, 
	//			{ "render" : undefined }
	//			)
	//		);
		inout_scene.AddNode(undefined, nodePointLight);
	}
}

