/*
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
		{
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
		}

		//drawable axis
		var materialAxis = in_asset.NewMaterial(
			"Blend", 
			in_context,
			{
				m_shaderName : "APos3AColour4UMatrixMVP",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T3D,
			}
		);
		var modelAxis = in_asset.GetModel("AxisAPos3AColour", in_context);
		{
			var nodeAxis = DSC.Framework.Asset.Scene.Node.Factory(
				undefined, 
				DSC.DNG.Pool.MatrixPos.Factory(0.0, 0.0, 0.0),
				"axis 0"
				);
			nodeAxis.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					materialAxis, 
					modelAxis, 
					DSC.DNG.Node.FactoryRaw(1.0),
					true, 
					{ "render" : undefined }
					)
				);
			inout_scene.AddNode(undefined, nodeAxis);
		}

		//cloth Cloth00
		{
			var clothWidth = 8;
			var clothHeight = 8;
			var model = in_asset.GetModel("Cloth00", in_context);
			var material = in_asset.NewMaterial(
				"Default", 
				in_context,
				{
					m_shaderName : "Cloth00"
				},
				DSC.Framework.Context.Uniform.Collection.FactoryRaw({
					u_scale : DSC.Framework.Context.Uniform.FactoryRaw(
						DSC.Math.Vector3.FactoryRaw(1.0, 1.0, 1.0),
						DSC.Framework.Context.Uniform.s_type.TVector3
						),
					u_colour : DSC.Framework.Context.Uniform.FactoryRaw(
						DSC.Math.Vector4.FactoryRaw(0.75, 0.75, 0.75, 1.0),
						DSC.Framework.Context.Uniform.s_type.TColour4
						),
					u_clothSize : DSC.Framework.Context.Uniform.FactoryRaw(
						DSC.Math.Vector4.FactoryRaw(clothWidth * 1.0, clothHeight * 1.0, 1.0 / clothWidth, 1.0 / clothHeight),
						DSC.Framework.Context.Uniform.s_type.TColour4
						), 
					}),
				[ undefined ]
				);
		
			var node0 = DSC.Framework.Asset.Scene.Node.Factory(
				undefined, 
				DSC.DNG.Pool.MatrixPos.Factory(0, 1.0, 0),
				"cloth"
				);
			
			//springk, dampen, vertlet mass
			var clothParamDNG = DSC.DNG.Node.FactoryRaw(DSC.Math.Vector3.FactoryRaw(1.0, 0.1, 1.0));
			var gravityDNG = DSC.DNG.Node.FactoryRaw(DSC.Math.Vector3.FactoryRaw(0.0, -0.988, 0.0));
			var radiusDng = DSC.DNG.Node.FactoryRaw(1.0);
		
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Cloth.FactoryRaw(
					DSC.Framework.Asset.Scene.Component.Cloth.Resource.Factory(
						clothWidth,
						clothHeight,
						in_asset,
						in_context
						),
					material, // first texture slot will be assigned as the cloth pos tex
					model,
					clothParamDNG, 
					gravityDNG,
					radiusDng, 
					true, 
					{ "update" : undefined }
					)
				);
		
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					materialAxis, 
					modelAxis, 
					DSC.DNG.Node.FactoryRaw(1.0),
					true, 
					{ "render" : undefined }
					)
				);
		
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					material, 
					model,
					radiusDng,
					true, 
					{ "render" : undefined }
					)
				);
		
			inout_scene.AddNode(undefined, node0);
		}
	}
}

