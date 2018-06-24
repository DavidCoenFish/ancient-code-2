/**
 * @private
 * @constructor
 * @param {!number} in_type
 * @param {!number} in_elementsPerVertex
 * @param {!(Float32Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array)} in_arrayData
 * @param {!number=} _dynamicFlag
 * @param {!boolean=} _normalise
 * @return {undefined}
 */
c.ModelDataStream = function(
	in_type,
	in_elementsPerVertex,
	in_arrayData,
	_dynamicFlag,
	_normalise
	) {
	this.m_type = in_type;
	this.m_elementsPerVertex = in_elementsPerVertex;
	this.m_arrayData = in_arrayData;
	this.m_dynamicFlag = (undefined == _dynamicFlag) ? c.WebGL.STATIC_DRAW : _dynamicFlag;
	this.m_normalise = (undefined == _normalise) ? false : _normalise;
	
	this.m_bufferHandle = null;	

	return;
}
c["ModelDataStream"] = c.ModelDataStream;

/**
 * @param {!number} in_type
 * @param {!number} in_elementsPerVertex
 * @param {!(Float32Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array)} in_arrayData
 [c.WebGL.STATIC_DRAW|
 * @param {!number=} _dynamicFlag
 * @param {!boolean=} _normalise
 * @return {!c.ModelDataStream}
 */
c.ModelDataStream.Factory = function(
	in_type,
	in_elementsPerVertex,
	in_arrayData,
	_dynamicFlag,
	_normalise
	) {
	return new c.ModelDataStream(
		in_type,
		in_elementsPerVertex,
		in_arrayData,
		_dynamicFlag,
		_normalise
		);
}
c.ModelDataStream["Factory"] = c.ModelDataStream.Factory;

/**
 * @param {!c.WebGL} in_webGL
 * @return {undefined}
 */
c.ModelDataStream.prototype.Init = function(in_webGL) {
	this.m_bufferHandle = null;	
	this.m_bufferHandle = in_webGL.CreateBuffer(
		this.m_arrayData, 
		c.WebGL.ARRAY_BUFFER,
		this.m_dynamicFlag
		);
}
