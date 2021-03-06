/*
	TODO:
		concat data streams into one array (if data is static)

*/

/**
 * @private
 * @param {!string} in_mode
 * @param {!string} in_elementCount
 * @param {!string} in_mapDataStream
 * @param {!DSC.Framework.Context=} _context
 * @param {!object=} _elementIndex
 * @constructor
 */
DSC.Framework.Asset.Model = function(in_mode, in_elementCount, in_mapDataStream, _context, _elementIndex)
{
	if ( !(this instanceof DSC.Framework.Asset.Model) )
		alert("DSC.Framework.Asset.Model: call constuctor with new keyword");

	this.m_mode = in_mode;
	this.m_elementCount = in_elementCount;
	this.m_mapDataStream = in_mapDataStream;
	this.m_elementIndex = _elementIndex;
	this.m_elementIndexHandle = undefined;

	if (undefined != this.m_elementIndex)
	{
		this.m_elementByteSize = 1;
		this.m_elementType = DSC.Framework.Context.WebGL.UNSIGNED_BYTE;

		if (this.m_elementIndex instanceof DSC.Common.t_u16Array)
		{
			this.m_elementByteSize = 2;
			this.m_elementType = DSC.Framework.Context.WebGL.UNSIGNED_SHORT;
		}
		else if (this.m_elementIndex instanceof DSC.Common.t_u32Array)
		{
			this.m_elementByteSize = 4;
			this.m_elementType = DSC.Framework.Context.WebGL.UNSIGNED_INT;
		}	
	}

	if (undefined != _context)
	{
		_context.InitModel(this);
	}

	return;
}
DSC.Framework.Asset['Model'] = DSC.Framework.Asset.Model;


/**
 * @return {!DSC.Framework.Asset.Model}
 */
DSC.Framework.Asset.Model.Factory = function(
	in_mode,
	in_elementCount, 
	in_mapDataStream, 
	_context, 
	_elementIndex	
	)
{
	var model = new DSC.Framework.Asset.Model(
		in_mode,
		in_elementCount, 
		in_mapDataStream, 
		_context, 
		_elementIndex
		);
	return model;
}

DSC.Framework.Asset.Model.prototype.Init = function(in_webGL)
{
	for (var key in this.m_mapDataStream)
	{
		var dataStream = this.m_mapDataStream[key];
		dataStream.Init(in_webGL);
	}

	if (undefined != this.m_elementIndex)
	{
		this.m_elementIndexHandle = undefined;	
		this.m_elementIndexHandle = in_webGL.CreateBuffer(
			this.m_elementIndex, 
			DSC.Framework.Context.WebGL.ELEMENT_ARRAY_BUFFER,
			DSC.Framework.Context.WebGL.STATIC_DRAW
			);
	}

	return;
}

DSC.Framework.Asset.Model.prototype.OnContextLost = function()
{
	this.m_programHandle = undefined;
}

DSC.Framework.Asset.Model.prototype.OnContextRestored = function(in_context)
{
	in_context.InitModel(this);
}

