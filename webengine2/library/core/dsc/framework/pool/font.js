/**
 * @private
 * @constructor
 * @implements {DSC.Framework.PoolInterface}
 */
DSC.Framework.Pool['Font'] = function()
{
	if ( !(this instanceof DSC.Framework.Pool['Font']) )
		alert("DSC.Framework.Pool.Font: call constuctor with new keyword");

	this.m_data = {};

	return;
}

/**
 * @param {!DSC.Framework.Context} _context
 * @return {!DSC.Framework.Pool.Font}
 */
DSC.Framework.Pool['Font'].Factory = function(_context)
{
	var pool = new DSC.Framework.Pool['Font']();
	if (undefined != _context)
	{
		_context.AddContextListener(pool);
	}

	return pool;
}

//make a new asset of the given template name
DSC.Framework.Pool['Font'].prototype.NewAsset = function(in_name, in_asset, _context, _dataOverload)
{
	if (in_name in DSC.Framework.Pool['Font'])
	{
		var dataTemplate = DSC.Framework.Pool['Font'][in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);

		var model = in_asset.GetAsset("Model", data['m_modelName'], _context);
		var material = in_asset.NewAsset("Material", data['m_materialName'], _context, data['m_materialOverload']);
		var font = DSC.Framework.Asset.Font.Factory(
			data['m_letterData'],
			model,
			material,
			data['m_align']
			);
		return font;
	}

	alert("Font.NewAsset failed to find asset [" + in_name + "]");

	return undefined;
}


DSC.Framework.Pool['Font'].prototype.GetAsset = function(in_name, in_asset, _context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Pool['Font'])
	{
		var font = this.NewAsset(in_name, in_asset, _context);
		this.m_data[in_name] = font;
		return font;
	}

	alert("font not found: " + in_name);

	return undefined;
}
