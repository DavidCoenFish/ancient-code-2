DSC.Framework.Asset.Model.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Model.Pool) )
		alert("DSC.Framework.Asset.Model.Pool: call constuctor with new keyword");

	this.m_nameData = {};
	this.m_createdData = [];

	return;
}

DSC.Framework.Asset.Model.Pool.prototype.OnContextLost = function()
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextLost();
	});

	return;
}

DSC.Framework.Asset.Model.Pool.prototype.OnContextRestored = function(in_context)
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextRestored(in_context);
	});

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.Model.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload)
{
	if (in_name in DSC.Framework.Asset.Model.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.Model.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var model = DSC.Framework.Asset.Model.FactoryRaw(
			in_context,
			data.m_mode,
			data.m_elementCount, 
			data.m_mapDataStream, 
			data.m_elementIndex
			);
		this.m_createdData.push(model);
		return model;
	}

	alert("Model.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

DSC.Framework.Asset.Model.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_nameData)
		return this.m_nameData[in_name];

	if (in_name in DSC.Framework.Asset.Model.Pool)
	{
		var model = this.NewAsset(in_name, in_asset, in_context);
		this.m_nameData[in_name] = model;
		return model;
	}

	alert("Model not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.Model.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Model.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
