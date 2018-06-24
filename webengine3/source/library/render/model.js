/*
	TODO:
		concat data streams into one array (if data is static)

*/

/**
 * @private
 * @param {!number} in_mode
 * @param {!number} in_elementCount
 * @param {!Object} in_mapDataStream
 * @param {!(Uint8Array|Uint16Array|Uint32Array)=} _elementIndex
 * @constructor
 */
c.Model = function(in_mode, in_elementCount, in_mapDataStream, _elementIndex) {
	this.m_mode = in_mode;
	this.m_elementCount = in_elementCount;
	this.m_mapDataStream = in_mapDataStream;
	this.m_elementIndex = _elementIndex;
	this.m_elementIndexHandle = undefined;

	if (null != this.m_elementIndex) {
		this.m_elementByteSize = 1;
		this.m_elementType = c.WebGL.UNSIGNED_BYTE;

		if (this.m_elementIndex instanceof Uint16Array) {
			this.m_elementByteSize = 2;
			this.m_elementType = c.WebGL.UNSIGNED_SHORT;
		}
		else if (this.m_elementIndex instanceof Uint32Array) {
			this.m_elementByteSize = 4;
			this.m_elementType = c.WebGL.UNSIGNED_INT;
		}	
	}

	return;
}
c["Model"] = c.Model;


/**
 * @param {!number} in_mode
 * @param {!number} in_elementCount
 * @param {!Object} in_mapDataStream
 * @param {!c.WebGL} in_webGL
 * @param {!(Uint8Array|Uint16Array|Uint32Array)=} _elementIndex
 * @return {!c.Model}
 */
c.Model.Factory = function(
	in_mode,
	in_elementCount, 
	in_mapDataStream, 
	in_webGL, 
	_elementIndex	
	)
{
	var model = new c.Model(
		in_mode,
		in_elementCount, 
		in_mapDataStream, 
		_elementIndex
		);

	model.Init(in_webGL);

	return model;
}
c.Model["Factory"] = c.Model.Factory;


/**
 * @param {!c.WebGL} in_webGL
 * @return {undefined}
 */
c.Model.prototype.Init = function(in_webGL) {
	for (var key in this.m_mapDataStream) {
		var dataStream = this.m_mapDataStream[key];
		dataStream.Init(in_webGL);
	}

	if (undefined !== this.m_elementIndex) {
		this.m_elementIndexHandle = undefined;	
		this.m_elementIndexHandle = in_webGL.CreateBuffer(
			this.m_elementIndex, 
			c.WebGL.ELEMENT_ARRAY_BUFFER,
			c.WebGL.STATIC_DRAW
			);
	}

	return;
}

/**
 * @return {undefined}
 */
c.Model.prototype.OnContextLost = function() {
	this.m_programHandle = undefined;
	return;
}

/**
 * @param {!c.WebGL} in_webGL
 * @return {undefined}
 */
c.Model.prototype.OnContextRestored = function(in_webGL) {
	this.Init(in_webGL);
	return;
}

