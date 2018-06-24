DSC.Framework.Asset.Widget.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Widget.Pool) )
		alert("DSC.Framework.Asset.Widget.Pool: call constuctor with new keyword");

	this.m_data = {};

	return;
}

DSC.Framework.Asset.Widget.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Asset.Widget.Pool)
	{
		var data = DSC.Framework.Asset.Widget.Pool[in_name];
		var model = in_asset.GetModel(data.m_modelName, in_context);
		var Widget = DSC.Framework.Asset.Widget.FactoryRaw(
			data.m_data,
			model
			);
		this.m_data[in_name] = Widget;
		return Widget;
	}

	alert("Widget.GetAsset failed to find asset [" + in_name + "]");

	return undefined;
}

DSC.Framework.Asset.Widget.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Widget.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
