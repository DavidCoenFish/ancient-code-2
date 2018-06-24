/**
 * @private
 * @final
 * @constructor
 * @this {!c.RenderData}
 * @param {!c.Model} in_model
 * @param {!c.Material} in_material
 * @param {!number=} _count
 * @return {undefined}
 */
c.RenderData = function(in_model, in_material, _count) {
	this.m_model = in_model;
	this.m_material = in_material;
	this.m_count = _count;

	return;
}
c["RenderData"] = c.RenderData;

/**
 * @param {!c.Model} in_model
 * @param {!c.Material} in_material
 * @param {!number=} _count
 * @return {!c.RenderData}
 */
c.RenderData.Factory = function(in_model, in_material, _count) {
	return new c.RenderData(in_model, in_material, _count);
}
c.RenderData["Factory"] = c.RenderData.Factory;

/**
c.WebGL.prototype.RenderModel = function(in_model, in_mapAttributeLocation, _first, _count) {
 * @param {!c.Render} in_render
 * @return {undefined}
 */
c.RenderData.prototype.Render = function(in_render) {
	in_render.RenderModel(this.m_material, this.m_model, undefined, this.m_count);
	return;
}
c.RenderData.prototype["Render"] = c.RenderData.prototype.Render;
