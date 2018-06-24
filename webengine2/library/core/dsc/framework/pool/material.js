/**
 * @private
 * @constructor
 * @implements {DSC.Framework.PoolInterface}
 */
DSC.Framework.Pool['Material'] = function()
{
	if ( !(this instanceof DSC.Framework.Pool['Material']) )
		alert("DSC.Framework.Pool.Material: call constuctor with new keyword");

	this.m_data = {};

	return;
}


/**
 * @param {!DSC.Framework.Context=} _context
 * @return {!DSC.Framework.Pool.Material}
 */
DSC.Framework.Pool['Material'].Factory = function(_context)
{
	var pool = new DSC.Framework.Pool['Material']();
	return pool;
}

//make a new asset of the given template name
//, _uniformCollection, _textureArray)
DSC.Framework.Pool['Material'].prototype.NewAsset = function(in_name, in_asset, _context, _dataOverload)
{
	if (in_name in DSC.Framework.Pool['Material'])
	{
		var dataTemplate = DSC.Framework.Pool['Material'][in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);

		var shader = undefined;
		if ('m_shader' in data)
		{
			shader = data['m_shader'];
		}
		if ((undefined == shader) && ('m_newShaderName' in data))
		{
			shader = in_asset.NewAsset("Shader", data['m_newShaderName'], _context, data['m_newShaderNameParam']);
		}
		if ((undefined == shader) && ('m_getShaderName' in data))
		{
			shader = in_asset.GetAsset("Shader", data['m_getShaderName'], _context);
		}

		var uniformCollection = ('m_uniformCollection' in data) ? data['m_uniformCollection'] : DSC.Framework.Context.Uniform.Collection.FactoryMaterial();
		var textureArray = ('m_textureArray' in data) ? data['m_textureArray'] : [];

		var material = DSC.Framework.Asset.Material.Factory(
			shader,
			uniformCollection,
			textureArray, //texture array
			data['m_vertexTransformHint'],
			data['m_triangleCull'],
			data['m_triangleClockwise'],
			data['m_blend'],
			data['m_blendSourceFlag'],
			data['m_blendDestinationFlag'],
			data['m_depthFlag']
			);

		return material;
	}

	alert("Material.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

//get the master copy of the named asset
// no override or texture array, only what the data template specifies
DSC.Framework.Pool['Material'].prototype.GetAsset = function(in_name, in_asset, _context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Pool['Material'])
	{
		var material = this.NewAsset(in_name, in_asset, _context);
		this.m_data[in_name] = material;
		return material;
	}

	alert("Material not found: " + in_name);

	return undefined;
}

