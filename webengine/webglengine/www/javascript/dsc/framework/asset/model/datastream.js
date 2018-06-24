DSC.Framework.Asset.Model.DataStream = function(
	in_type,
	in_elementsPerVertex,
	in_arrayData,
	_dynamicFlag,
	_normalise
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Model.DataStream) )
		alert("DSC.Framework.Asset.Model.DataStream: call constuctor with new keyword");

	this.m_type = in_type;
	this.m_elementsPerVertex = in_elementsPerVertex;
	this.m_arrayData = in_arrayData;
	this.m_dynamicFlag = (undefined == _dynamicFlag) ? DSC.Framework.Context.WebGL.STATIC_DRAW : _dynamicFlag;
	this.m_normalise = (undefined == _normalise) ? false : _normalise;
	
	this.m_bufferHandle = undefined;	

	return;
}

DSC.Framework.Asset.Model.DataStream.prototype.Init = function(in_webGL)
{
	this.m_bufferHandle = undefined;	
	this.m_bufferHandle = in_webGL.CreateBuffer(
		this.m_arrayData, 
		DSC.Framework.Context.WebGL.ARRAY_BUFFER,
		this.m_dynamicFlag
		);
}

//DSC.Framework.Asset.Model.DataStream.prototype.BindBuffer = function(in_webGL)
//{
//	in_webGL.BindBuffer(this.m_bufferHandle, DSC.Framework.Context.WebGL.ARRAY_BUFFER);
//}

DSC.Framework.Asset.Model.DataStream.FactoryRaw = function(
	in_type,
	in_elementsPerVertex,
	in_arrayData,
	_dynamicFlag,
	_normalise
	)
{
	return new DSC.Framework.Asset.Model.DataStream(
		in_type,
		in_elementsPerVertex,
		in_arrayData,
		_dynamicFlag,
		_normalise
		);
}
