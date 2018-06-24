DSC.Framework.Asset.Gui.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Pool) )
		alert("DSC.Framework.Asset.Gui.Pool: call constuctor with new keyword");

	this.m_data = {};

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.Gui.Pool.prototype.NewAsset = function(in_name, in_asset, in_context)
{
	return undefined;
}

//get the master copy of the named asset
DSC.Framework.Asset.Gui.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	return undefined;
}

DSC.Framework.Asset.Gui.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Gui.Pool();
	return pool;
}
