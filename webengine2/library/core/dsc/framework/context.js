/**
 * @interface
 */
DSC.Framework.Context = function()
{
	alert("DSC.Framework.Context: abstract class, do not construct");	
}
DSC.Framework['Context'] = DSC.Framework.Context;

/**
 * @param {!DSC.Math.Bound2.Factory=) _frame
 * @return {!DSC.Math.Bound2.Factory)
 */
DSC.Framework.Context.prototype.GetViewport = function(_frame) {}

/**
 * the viewport is the dimintions of the drawing area inside the window canvas
 * @param {!number} in_lowX
 * @param {!number} in_lowY
 * @param {!number} in_highX
 * @param {!number} in_highY
 */
DSC.Framework.Context.prototype.SetViewport = function(in_lowX, in_lowY, in_highX, in_highY) {}

/**
 * @param {!(DSC.Math.ColourRGBType|DSC.Math.ColourRGBAType)=} _colour
 * @param {!number=} _depth
 * @param {!number=} _stencilValue
 */
DSC.Framework.Context.prototype.Clear = function(_colour, _depth, _stencilValue) {}


/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.Context.prototype.AddContextListener = function(in_contextListener) {}


/**
 * @param {!Object} in_contextListener
 */
DSC.Framework.Context.prototype.RemoveContextListener = function(in_contextListener) {}


/**
 * @param {!DSC.Framework.Asset.Model} in_model
 */
DSC.Framework.Context.prototype.InitModel = function(in_model) {}

/**
 * @param {!DSC.Framework.Asset.Model} in_model
 * @param {!number=} _start
 * @param {!number=} _count
 */
DSC.Framework.Context.prototype.DrawModel = function(in_model, _start, _count){}


/*
	if someone asks for a Context, depending on what contexts are included by client
	and what we can create, 

interface
		//todo webgl clear is not clamped to viewport, adopt that solution
	Clear(_colour, _depth, _stencilValue);
		+__________width, height
		|            |	(webgl treats bottom left as 0, 0)
		0, 0_________+
	SetViewport(in_originX, in_originY, in_sizeX, in_sizeY)
	GetViewport(_frame) //return frame

	AddContextListener(in_listener)
	RemoveContextListener(in_listener)
		in_listener implements
			OnContextLost
			OnContextRestored(in_context)
	SetUniform(name, value, _imediatly)
		Colour
		MatrixModel
		MatrixView
		MatrixProjection
		Frame // font glyph bounds, or gui bounds, viewport area...
	InitModel(in_model)
	InitShader(in_shader)
	InitTexture(in_texture)
	InitRenderTarget(in_renderTarget)
	ApplyRenderTarget(in_renderTarget)
	ApplyCamera(in_camera) //GetMatrixProjection(_result), GetMatrixView(_result)
	ApplyMaterial(in_material)
	DrawModel(in_model, _start, _count)
	SubDrawModelPre(in_model)
	SubDrawModel(in_model, _start, _count)
	SubDrawModelPost(in_model)
	SupportsExtention(in_extentionName)
	//common uniforms? or move to sub class. stored in context. on new shader, upload var.

*/

//DSC.Framework.Context2D.prototype.SetViewport = function(in_originX, in_originY, in_sizeX, in_sizeY) {}
//DSC.Framework.Context2D.prototype.GetViewport = function(_frame) {}
//DSC.Framework.Context2D.prototype.SetUniform = function(in_name, in_value) {}
//DSC.Framework.Context2D.prototype.AddContextListener = function() {}
//DSC.Framework.Context2D.prototype.RemoveContextListener = function() {}
//DSC.Framework.Context2D.prototype.InitModel = function(in_model) {}
//DSC.Framework.Context2D.prototype.InitShader = function(in_shader) {}
//DSC.Framework.Context2D.prototype.InitTexture = function(in_texture) {}
//DSC.Framework.Context2D.prototype.InitRenderTarget = function(in_renderTarget) {}
//DSC.Framework.Context2D.prototype.ApplyCamera = function(in_camera) {}
//DSC.Framework.Context2D.prototype.ApplyMaterial = function(in_material) {}
//DSC.Framework.Context2D.prototype.DrawModel = function(in_model, _start, _count) {}
//DSC.Framework.Context2D.prototype.SubDrawModelPre = function(in_model) {}
//DSC.Framework.Context2D.prototype.SubDrawModel = function(in_model, _start, _count) {}
//DSC.Framework.Context2D.prototype.SubDrawLine = function(in_model, in_offset) {}
//DSC.Framework.Context2D.prototype.SubDrawTriangle = function(in_model, in_offset) {}
//DSC.Framework.Context2D.prototype.GetScreenCoords = function(inout_vector2, in_dataStream, in_dataIndex) {}
//DSC.Framework.Context2D.prototype.SubDrawModelPost = function(in_model) {}
//DSC.Framework.Context2D.prototype.RemoveContextListener = function(in_listener) {}
//DSC.Framework.Context2D.prototype.SupportsExtention = function(in_extentionName) {}



