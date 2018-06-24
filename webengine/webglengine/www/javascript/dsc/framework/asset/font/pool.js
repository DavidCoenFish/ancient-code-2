DSC.Framework.Asset.Font.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Font.Pool) )
		alert("DSC.Framework.Asset.Font.Pool: call constuctor with new keyword");

	this.m_data = {};

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.Font.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload)
{
	if (in_name in DSC.Framework.Asset.Font.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.Font.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var model = in_asset.GetModel(data.m_modelName, in_context);
		var material = in_asset.NewMaterial(data.m_materialName, in_context, data.m_materialOverload);
		var font = DSC.Framework.Asset.Font.FactoryRaw(
			data.m_letterData,
			model,
			material,
			data.m_align
			);
		return font;
	}

	alert("Font.NewAsset failed to find asset [" + in_name + "]");

	return undefined;
}


DSC.Framework.Asset.Font.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Asset.Font.Pool)
	{
		var font = this.NewAsset(in_name, in_asset, in_context);
		this.m_data[in_name] = font;
		return font;
	}

	alert("font not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.Font.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Font.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
