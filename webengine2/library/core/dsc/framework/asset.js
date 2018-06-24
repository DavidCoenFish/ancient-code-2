/**
 * @constructor
 * @param {!DSC.Framework.Context=} _context
 */
DSC.Framework.Asset = function(_context)
{
	if ( !(this instanceof DSC.Framework.Asset) )
		alert("Asset: call constuctor with new keyword");

	this.m_factoryMap = {};

	for (var name in DSC.Framework.Pool)
	{
		//console.info("DSC.Framework.Asset " + name);
		var poolObject = DSC.Framework.Pool[name];
		this.m_factoryMap[name] = poolObject.Factory(_context);
	}

	return;
}
DSC.Framework['Asset'] = DSC.Framework.Asset;

/**
 * @param {!DSC.Framework.Context=} _context
 */
DSC.Framework.Asset.Factory = function(_context)
{
	return new DSC.Framework.Asset(_context);
}


/**
 * get a unique new asset by name and type, can override propertys
 * @param {!string} in_typeName
 * @param {!string} in_assetName
 * @param {!DSC.Framework.Context=} _context
 * @param {!object=} _dataOverride
 */
DSC.Framework.Asset.prototype.NewAsset = function(in_typeName, in_assetName, _context, _dataOverride)
{
	if (in_typeName in this.m_factoryMap)
		return this.m_factoryMap[in_typeName].NewAsset(in_assetName, this, _context, _dataOverride);
	return undefined;
}
DSC.Framework.Asset.prototype['NewAsset'] = DSC.Framework.Asset.prototype.NewAsset;


/**
 * get a asset instance by name and type
 * @param {!string} in_typeName
 * @param {!string} in_assetName
 * @param {!DSC.Framework.Context=} _context
 */
DSC.Framework.Asset.prototype.GetAsset = function(in_typeName, in_assetName, _context)
{
	if (in_typeName in this.m_factoryMap)
		return this.m_factoryMap[in_typeName].GetAsset(in_assetName, this, _context);
	return undefined;
}
DSC.Framework.Asset.prototype['GetAsset'] = DSC.Framework.Asset.prototype.GetAsset;
