DSC.Framework.Asset.Texture.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Texture.Pool) )
		alert("DSC.Framework.Asset.Texture.Pool: call constuctor with new keyword");

	this.m_nameData = {};
	this.m_createdData = [];

	return;
}

DSC.Framework.Asset.Texture.Pool.prototype.OnContextLost = function()
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextLost();
	});

	return;
}

DSC.Framework.Asset.Texture.Pool.prototype.OnContextRestored = function(in_context)
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextRestored(in_context);
	});

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.Texture.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload)
{
	if (in_name in DSC.Framework.Asset.Texture.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.Texture.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var texture = DSC.Framework.Asset.Texture.FactoryRaw(
			in_context,
			data.m_width, 
			data.m_height,
			data.m_data, 
			data.m_internalFormat,
			data.m_format,
			data.m_type,
			data.m_flip,
			data.m_magFilter,
			data.m_minFilter,
			data.m_wrapS,
			data.m_wrapT
			);
		this.m_createdData.push(texture);
		return texture;
	}

	alert("Texture.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

DSC.Framework.Asset.Texture.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_nameData)
		return this.m_nameData[in_name];

	if (in_name in DSC.Framework.Asset.Texture.Pool)
	{
		var texture = this.NewAsset(in_name, in_asset, in_context);
		this.m_nameData[in_name] = texture;
		return texture;
	}

	alert("Texture not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.Texture.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Texture.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
