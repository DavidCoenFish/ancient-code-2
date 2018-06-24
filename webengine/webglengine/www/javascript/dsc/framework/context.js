DSC.Framework.Context = function()
{
	alert("Framework.Context: abstract class, do not construct");	
}

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

DSC.Framework.Context.FactoryRaw = function(_canvas, _paramObject)
{
	try 
	{
		if (undefined != DSC.Framework.Context_WebGL)
			return DSC.Framework.Context_WebGL.FactoryRaw(_canvas, _paramObject);
	}
	catch(in_exception) 
	{
		alert("Unable to initialize WebGL. " + in_exception);
	}

	try 
	{
		if (undefined != DSC.Framework.Context_2D)
			return DSC.Framework.Context_2D.FactoryRaw(_canvas, _paramObject);
	}
	catch(in_exception) 
	{
		alert("Unable to initialize Canvas2d. " + in_exception);
	}

	return undefined;
}



