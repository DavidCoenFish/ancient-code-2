DSC.Framework.Asset.Scene.Pool.Scene00 = 
{
	"m_rootNode" : undefined,
	"m_mapDisplayList" : {},
	"Populate" : function(inout_scene, in_asset, in_context, _sceneParam)
	{
		//camera
		var cameraNode = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixLatLongPos.Factory(
				0.37, -0.3, 2.5
				),
			"camera0"
			);
		var width = (undefined == _sceneParam || undefined == _sceneParam.m_width) ? 320 : _sceneParam.m_width;
		var height = (undefined == _sceneParam || undefined == _sceneParam.m_height) ? 240 : _sceneParam.m_height;
		var aspect = width / height;

		var cameraComponent = DSC.Framework.Asset.Scene.Component.Camera.FactoryPerspective(
			0.1,
			10.0,
			0.1 * 320 / 240,
			0.1,
			{ "camera" : undefined }
			);
		cameraNode.AddComponent(cameraComponent);
		inout_scene.AddNode(undefined, cameraNode);

		var model = in_asset.GetModel("Model00", in_context);
		var material = in_asset.NewMaterial(
			"Default", 
			in_context,
			{
				m_shaderName : "APos3UPointSizeUMatrixMVP",
			},
			DSC.Framework.Context.Uniform.Collection.FactoryRaw({
				u_pointSize : DSC.Framework.Context.Uniform.FactoryRaw(
					DSC.Math.Vector3.FactoryRaw(2.5, 0.0, 0.0),
					DSC.Framework.Context.Uniform.s_type.TVector3
					),
				})
			);

		var node0 = DSC.Framework.Asset.Scene.Node.Factory(
			undefined, 
			DSC.DNG.Pool.MatrixPos.Factory(0, 0, 0),
			"platform"
			);
		node0.AddComponent(
			DSC.Framework.Asset.Scene.Component.Renderable.Factory(
				material, 
				model,
				DSC.DNG.Node.FactoryRaw(2.0),
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
}