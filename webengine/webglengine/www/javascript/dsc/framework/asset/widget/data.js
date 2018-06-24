DSC.Framework.Asset.Widget.Data = function(
	_drawElementStart,
	_drawElementCount
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Widget.Data) )
		alert("DSC.Framework.Asset.Widget.Data: call constuctor with new keyword");

	this.m_drawElementStart = (undefined == _drawElementStart) ? 0 : _drawElementStart;
	this.m_drawElementCount = (undefined == _drawElementCount) ? 0 : _drawElementCount;

	return;
}

DSC.Framework.Asset.Widget.Data.FactoryRaw = function(
	_drawElementStart,
	_drawElementCount
	)
{
	return new DSC.Framework.Asset.Widget.Data(
		_drawElementStart,
		_drawElementCount
		);
}
