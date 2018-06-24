DSC.Framework.Asset.RenderTarget.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.RenderTarget.Pool) )
		alert("DSC.Framework.Asset.RenderTarget.Pool: call constuctor with new keyword");

	this.m_mapData = {};
	this.m_createdObjects = [];

	return;
}

DSC.Framework.Asset.RenderTarget.Pool.prototype.OnContextLost = function()
{
	this.m_createdObjects.forEach( function(item)
	{
		item.OnContextLost();
	});

	return;
}

DSC.Framework.Asset.RenderTarget.Pool.prototype.OnContextRestored = function(in_context)
{
	this.m_createdObjects.forEach( function(item)
	{
		item.OnContextRestored(in_context);
	});

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.RenderTarget.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload, _mapData)
{
	if (in_name in DSC.Framework.Asset.RenderTarget.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.RenderTarget.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var mapData = _mapData;
		if (undefined == mapData)
		{
			mapData = {};
			for (var key in data.m_mapData)
			{
				var subData = data.m_mapData[key];
				var texture = in_asset.GetTexture(subData.m_texture, in_context);
				mapData[key] = DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(
					texture,
					subData.m_target,
					subData.m_attachment,
					subData.m_texTarget,
					subData.m_level
					);
			}

		}
		var renderTarget = DSC.Framework.Asset.RenderTarget.FactoryRaw(
			in_context,
			mapData, //data.m_mapData,
			data.m_width,
			data.m_height
			);

		this.m_createdObjects.push(renderTarget);

		return renderTarget;
	}

	alert("RenderTarget.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

DSC.Framework.Asset.RenderTarget.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_mapData)
		return this.m_mapData[in_name];

	if (in_name in DSC.Framework.Asset.RenderTarget.Pool)
	{
		var renderTarget = this.NewAsset(in_name, in_asset, in_context);
		this.m_mapData[in_name] = renderTarget;
		return renderTarget;
	}

	alert("RenderTarget not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.RenderTarget.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.RenderTarget.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
