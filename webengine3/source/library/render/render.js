/**
 * @private
 * @final
 * @constructor
 * @this {!c.Render}
 * @param {!Object} in_canvas
 * @param {!Object=} _paramObject
 * @return {undefined}
 */
c.Render = function(in_canvas, _paramObject) {
	this.m_canvas = in_canvas;
	this.m_webGL = undefined;
	this.m_paramObject = _paramObject;
	this.m_viewportDng = undefined;

	this.m_arrayContextListener = [];

	//var that = this;
	//this.m_canvas.addEventListener("webglcontextlost", function(in_event){ that.ContextLostCallback(in_event); }, false);
	//this.m_canvas.addEventListener("webglcontextrestored", function(in_event){ that.ContextRestoredCallback(in_event); }, false);
	
	this.SetupWebGL();

	return;
}
c["Render"] = c.Render;

/**
 * @param {!Object} in_canvas
 * @param {!Object=} _paramObject
 * @return {c.Render}
 */
c.Render.Factory = function(in_canvas, _paramObject) {

	//a canvas width, height is 300,150 by default (coordinate space). lets change that to what size it is
	if (null != in_canvas) {
		in_canvas.width = in_canvas.clientWidth;
		in_canvas.height = in_canvas.clientHeight;

		c.Log(LOG, "canvas.width:" + in_canvas.width + " canvas.height:" + in_canvas.height);
	}

	return new c.Render(in_canvas, _paramObject);
}
c.Render["Factory"] = c.Render.Factory;

/**
 * @return {undefined}
 */
c.Render.prototype.SetupWebGL = function() {
	this.m_webGL = undefined;
	this.m_webGL = c.WebGL.Factory(this.m_canvas, this.m_paramObject);

	//this.SetViewport(0, 0, this.m_canvas.width, this.m_canvas.height);

	//c.ContextWebGL.prototype["SetViewport"] = c.ContextWebGL.prototype.SetViewport;
	//c.ContextWebGL.prototype.GetDefaultViewport = function(_frame) //return frame

	var viewport;
	if (undefined !== this.m_webGL){
		viewport = this.m_webGL.GetViewport();
	}
	this.m_viewportDng = c.DagNodeValue.Factory("viewport", viewport);

	return;
}

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.Render.prototype.GetViewport = function() {
	return /** @type{!c.DagNodeValue} */ (this.m_viewportDng);
}
c.Render.prototype["GetViewport"] = c.Render.prototype.GetViewport;

/**
 * @param {!Int32Array} in_viewport
 * @return {undefined}
 */
c.Render.prototype.SetViewport = function(in_viewport) {
	if (undefined !== this.m_webGL){
		this.m_webGL.SetViewport(in_viewport);
		//this.m_viewportDng.SetValue(this.m_webGL.GetViewport());
		this.m_viewportDng.SetValue(in_viewport);
	}
	return;
}
c.Render.prototype["SetViewport"] = c.Render.prototype.SetViewport;

/**
 * @param {!(c.ColourRGBType|c.ColourRGBAType)=} _colour
 * @param {!number=} _depth
 * @param {!number=} _stencil
 * @return {undefined}
 */
c.Render.prototype.Clear = function(_colour, _depth, _stencil) {
	if (undefined !== this.m_webGL){
		this.m_webGL.Clear(_colour, _depth, _stencil);
	}
	return;
}
c.Render.prototype["Clear"] = c.Render.prototype.Clear;

/**
 * @param {!string} in_vertexShaderSource
 * @param {!string} in_fragmentShaderSource
 * @param {!Object<!string, ?number>} in_mapAttributeLocation
 * @param {!Object<!string, ?number>} in_mapUniformLocation
 * @return {c.Shader}
 */
c.Render.prototype.NewShader = function(
	in_vertexShaderSource,
	in_fragmentShaderSource,
	in_mapAttributeLocation, 
	in_mapUniformLocation
	) {
	if (undefined !== this.m_webGL){
		return c.Shader.Factory(
			in_vertexShaderSource,
			in_fragmentShaderSource,
			in_mapAttributeLocation, 
			in_mapUniformLocation,
			this.m_webGL		
			);
	}
	return null;
}
c.Render.prototype["NewShader"] = c.Render.prototype.NewShader;

/**
 * @param {!number} in_mode
 * @param {!number} in_elementCount
 * @param {!Object} in_mapDataStream
 * @param {!(Uint8Array|Uint16Array|Uint32Array)=} _elementIndex
 * @return {c.Model}
 */
c.Render.prototype.NewModel = function(
	in_mode,
	in_elementCount, 
	in_mapDataStream, 
	_elementIndex	
	) {
	if (undefined !== this.m_webGL){
		return c.Model.Factory(
			in_mode,
			in_elementCount, 
			in_mapDataStream, 
			this.m_webGL,
			_elementIndex	
			);
	}
	return null;
}
c.Render.prototype["NewModel"] = c.Render.prototype.NewModel;

/**
 * @param {!c.Material} in_material
 * @param {!c.Model} in_model
 * @param {!number=} _first
 * @param {!number=} _count
 * @return {undefined}
 */
c.Render.prototype.RenderModel = function(in_material, in_model, _first, _count) {
	if ((undefined !== this.m_webGL) && (0 !== _count)){
		this.m_webGL.ApplyMaterial(in_material);
		this.m_webGL.RenderModel(in_model, in_material.m_shader.m_mapAttributeLocation, _first, _count);
	}
	return;
}
c.Render.prototype["RenderModel"] = c.Render.prototype.RenderModel;

/**
 * @param {!c.ModelDataStream} in_modelDataStream
 * @return {undefined}
 */
c.Render.prototype.UpdateModelDataStream = function(in_modelDataStream) {
	if ((undefined !== this.m_webGL) && (null !== in_modelDataStream.m_bufferHandle)){
		this.m_webGL.UpdateBuffer(
			in_modelDataStream.m_bufferHandle, 
			in_modelDataStream.m_arrayData, 
			c.WebGL.ARRAY_BUFFER,
			in_modelDataStream.m_dynamicFlag
			);
	}
	return;
}
c.Render.prototype["UpdateModelDataStream"] = c.Render.prototype.UpdateModelDataStream;

