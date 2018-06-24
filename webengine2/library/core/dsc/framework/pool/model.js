/**
 * @private
 * @constructor
 * @implements {DSC.Framework.PoolInterface}
 */
DSC.Framework.Pool['Model'] = function()
{
	if ( !(this instanceof DSC.Framework.Pool['Model']) )
		alert("DSC.Framework.Pool.Model: call constuctor with new keyword");

	this.m_nameData = {};
	this.m_createdData = [];

	return;
}

/**
 * @param {!DSC.Framework.Context} _context
 * @return {!DSC.Framework.Pool.Model}
 */
DSC.Framework.Pool['Model'].Factory = function(_context)
{
	var pool = new DSC.Framework.Pool['Model']();
	if (undefined != _context)
	{
		_context.AddContextListener(pool);
	}

	return pool;
}

DSC.Framework.Pool['Model'].prototype.OnContextLost = function()
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextLost();
	});

	return;
}

DSC.Framework.Pool['Model'].prototype.OnContextRestored = function(in_context)
{
	this.m_createdData.forEach( function(item)
	{
		item.OnContextRestored(in_context);
	});

	return;
}

//make a new asset of the given template name
DSC.Framework.Pool['Model'].prototype.NewAsset = function(in_name, in_asset, _context, _dataOverload)
{
	if (in_name in DSC.Framework.Pool['Model'])
	{
		var dataTemplate = DSC.Framework.Pool['Model'][in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var model = DSC.Framework.Asset.Model.Factory(
			data['m_mode'],
			data['m_elementCount'], 
			data['m_mapDataStream'], 
			_context,
			data['m_elementIndex']
			);
		this.m_createdData.push(model);
		return model;
	}

	alert("Model.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

DSC.Framework.Pool['Model'].prototype.GetAsset = function(in_name, in_asset, _context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_nameData)
		return this.m_nameData[in_name];

	if (in_name in DSC.Framework.Pool['Model'])
	{
		var model = this.NewAsset(in_name, in_asset, _context);
		this.m_nameData[in_name] = model;
		return model;
	}

	alert("Model not found: " + in_name);

	return undefined;
}

