DSC.Framework.Asset.Scene.Pool.Scene = 
{
	"m_rootNode" : undefined,
	"m_mapDisplayList" : {},
	"Populate" : function(inout_scene, in_asset, in_context, _sceneParam)
	{
		//camera
		var cameraNode = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixLatLongPos.Factory(
				0.0, 0.0, 5.0
				),
			"camera0"
			);
		var cameraComponent = DSC.Framework.Asset.Scene.Component.Camera.FactoryPerspective(
			0.1,
			10.0,
			0.1 * 640 / 360,
			0.1,
			{ "camera" : undefined }
			);
		cameraNode.AddComponent(cameraComponent);
		inout_scene.AddNode(undefined, cameraNode);
		
		var texture = in_asset.GetTexture("TestTexture64", in_context);
		var material = in_asset.NewMaterial(
			"Depth", 
			in_context,
			{
				m_shaderName : "APos3AUv2USample0UMatrixMVP",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T3D,
			}, 
			undefined, 
			[texture]
			);
		var cube = in_asset.GetModel("CubeAPos3AUv2", in_context);

		//drawable
		for (var index = 0; index < 10; ++index)
		{
			var node0 = DSC.Framework.Asset.Scene.Node.Factory(
				undefined, 
				DSC.DNG.Pool.MatrixPos.Factory(-1.1, -1.1, -10 + (2 * index)),
				"cube" + (index + 1)
				);
			node0.AddComponent(
				DSC.Framework.Asset.Scene.Component.Renderable.Factory(
					material, 
					cube, 
					DSC.DNG.Node.FactoryRaw(1.7320508075688772935274463415059),
					true, 
					{ "render" : undefined }
					)
				);
			inout_scene.AddNode(undefined, node0);
		}

		var node0 = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixPos.Factory(1, 1, 1),
			"cubeExtra"
			);
		node0.AddComponent(
			DSC.Framework.Asset.Scene.Component.Renderable.Factory(
				material, 
				cube, 
				DSC.DNG.Node.FactoryRaw(0.5), //1.7320508075688772935274463415059),
				true, 
				{ "render" : undefined }
				)
			);
		inout_scene.AddNode(undefined, node0);

		//drawable axis
		var materialAxis = in_asset.NewMaterial(
			"Blend", 
			in_context,
			{
				m_shaderName : "APos3AColour4UMatrixMVP",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T3D,
			}
		);

		var node1 = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixPos.Factory(0.0, 0.0, 0.0),
			"axis 0"
			);
		node1.AddComponent(
			DSC.Framework.Asset.Scene.Component.Renderable.Factory(
				materialAxis, 
				in_asset.GetModel("AxisAPos3AColour", in_context), 
				DSC.DNG.Node.FactoryRaw(1.0),
				true, 
				{ "render" : undefined }
				)
			);
		inout_scene.AddNode(undefined, node1);
	}
};

