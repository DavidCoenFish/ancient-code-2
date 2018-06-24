DSC.Framework.Asset.Scene.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Pool) )
		alert("DSC.Framework.Asset.Scene.Pool: call constuctor with new keyword");

	this.m_data = {};

	return;
}

DSC.Framework.Asset.Scene.Pool.prototype.GetAsset = function(in_name, in_asset, in_context, _sceneParam)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Asset.Scene.Pool)
	{
		var data = DSC.Framework.Asset.Scene.Pool[in_name];
		var scene = DSC.Framework.Asset.Scene.FactoryRaw(
			data.m_rootNode,
			data.m_arrayGlobalComponents,
			data.m_mapDisplayList
			);
	
		if (undefined != data.Populate)
		{
			data.Populate(scene, in_asset, in_context, _sceneParam);
		}

		this.m_data[in_name] = scene;
		return scene;
	}

	alert("Scene.GetAsset failed to find asset [" + in_name + "]");

	return undefined;
}

DSC.Framework.Asset.Scene.Pool.FactoryRaw = function(in_context)
{
	return new DSC.Framework.Asset.Scene.Pool();
}
