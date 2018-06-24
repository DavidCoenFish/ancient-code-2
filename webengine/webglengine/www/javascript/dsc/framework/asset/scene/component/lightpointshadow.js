/*
*/
DSC.Framework.Asset.Scene.Component.LightPointShadow = function(
	in_model,
	in_shadowMaterial,
	in_texture,
	in_textureDepth,
	in_renderTarget,
	in_colourDng,
	in_radiusDng,
	in_posDng,
	in_falloffDng,
	_active,
	_mapFilter
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.LightPointShadow) )
		alert("DSC.Framework.Asset.Scene.Component.LightPointShadow: call constuctor with new keyword");
	this.m_model = in_model;
	this.m_shadowMaterial = in_shadowMaterial;
	this.m_texture = in_texture;
	this.m_textureDepth = in_textureDepth;
	this.m_renderTarget = in_renderTarget;
	this.m_colourDng = in_colourDng;
	this.m_radiusDng = in_radiusDng;
	this.m_posDng = in_posDng;
	this.m_falloffDng = in_falloffDng;
	this.m_active = (undefined == _active) ? true : _active;
	this.m_mapFilter = (undefined == _mapFilter) ? {} : _mapFilter;
	this.m_worldTransformDng;
	return;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.IsActive = function()
{
	return this.m_active;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.SetParentNode = function(_parentNode)
{
	this.m_worldTransformDng = (undefined == _parentNode) ? undefined : _parentNode.GetWorldTransformDng();
	DSC.DNG.Container.LinkNodes(this.m_posDng, this.m_worldTransformDng, 0);
	return;	
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.PassFilter = function(in_filter)
{
	return (in_filter in this.m_mapFilter);
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.GetRadiusDng = function()
{
	return this.m_radiusDng;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.GetPosDng = function()
{
	return this.m_posDng;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.GetLightType = function()
{
	return "PointShadow";
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.GetColourDng = function()
{
	return this.m_colourDng;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.GetFalloffDng = function()
{
	return this.m_falloffDng;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.prototype.UpdateShadowMap = function(
	in_viewPos, 
	in_fallOff, 
	in_depthTexture,
	in_context
	)
{
	this.m_shadowMaterial.m_uniformCollection.SetUniform("u_lightPos", in_viewPos);
	this.m_shadowMaterial.m_uniformCollection.SetUniform("u_falloff", in_fallOff);
	this.m_shadowMaterial.m_textureArray[0] = in_depthTexture;
	in_context.ApplyRenderTarget(this.m_renderTarget);
	in_context.SetViewport(0, 0, this.m_renderTarget.m_width, this.m_renderTarget.m_height);
	in_context.Clear(DSC.Math.Colour.s_black, 1.0);
	in_context.ApplyMaterial(this.m_shadowMaterial);
	in_context.DrawModel(this.m_model);
	return;
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.Factory = function(
	in_assetManager,
	in_context,
	in_width,
	in_height,
	in_widthMesh,
	in_heightMesh,
	in_colour,
	in_radius,
	in_falloff,
	_mapFilter
	)
{
	var modelName = "" + in_widthMesh + "x" + in_heightMesh + "PointGridAPos2";
	DSC.Framework.Asset.Model.GeneratePointGridAPos2(modelName, in_widthMesh, in_heightMesh);
	var model = in_assetManager.GetModel(modelName, in_context);

	var textureTemplate = 
	{
		m_width : in_width,
		m_height : in_height,
		m_flip : true,
		m_magFilter : DSC.Framework.Context.WebGL.NEAREST,
		m_minFilter : DSC.Framework.Context.WebGL.NEAREST, //NEAREST_MIPMAP_NEAREST,
		m_wrapS : DSC.Framework.Context.WebGL.CLAMP_TO_EDGE,
		m_wrapT : DSC.Framework.Context.WebGL.CLAMP_TO_EDGE
	};

	var texture = in_assetManager.NewTexture("RGBByte", in_context, textureTemplate);
	var textureDepth = in_assetManager.NewTexture("DepthUInt", in_context, textureTemplate);
	var supportDepth = in_context.SupportsExtention("WEBGL_depth_texture");
	var mapData = {
		"colour0" : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(texture)
	};
	if (supportDepth)
	{
		mapData["depth0"] = DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(
			textureDepth,
			undefined,
			DSC.Framework.Context.WebGL.DEPTH_ATTACHMENT
			);
	}

	var renderTargetTemplate = 
	{
		m_width : in_width,
		m_height : in_height
	};
	var renderTarget = in_assetManager.NewRenderTarget(
		"Default", 
		in_context, 
		renderTargetTemplate, 
		mapData
		);
	var shadowMaterial = in_assetManager.NewMaterial(
		"Depth", 
		in_context, 
		{ 
			m_shaderName : "Light8PointShadow",
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_lightPos : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_falloff : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				)
		}),
		[undefined]
	);

	var colourDng = DSC.DNG.Node.FactoryRaw(in_colour);
	var radiusDng = DSC.DNG.Node.FactoryRaw(in_radius);
	var falloffDng = DSC.DNG.Node.FactoryRaw(in_falloff);
	var posDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.GetMatrix4Pos, "Light Point posDng");
	return DSC.Framework.Asset.Scene.Component.LightPointShadow.FactoryRaw(
		model,
		shadowMaterial,
		texture,
		textureDepth,
		renderTarget,
		colourDng,
		radiusDng,
		posDng,
		falloffDng,
		true,
		_mapFilter
		);
}

DSC.Framework.Asset.Scene.Component.LightPointShadow.FactoryRaw = function(
	in_model,
	in_shadowMaterial,
	in_texture,
	in_textureDepth,
	in_renderTarget,
	in_colourDng,
	in_radiusDng,
	in_posDng,
	in_falloffDng,
	_active,
	_mapFilter
	)
{
	return new DSC.Framework.Asset.Scene.Component.LightPointShadow(
		in_model,
		in_shadowMaterial,
		in_texture,
		in_textureDepth,
		in_renderTarget,
		in_colourDng,
		in_radiusDng,
		in_posDng,
		in_falloffDng,
		_active,
		_mapFilter
		);
}
