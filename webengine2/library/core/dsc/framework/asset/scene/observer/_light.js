/*
light observer for deffered renderer

	VisitObserver(in_context)
	VisitGlobalComponent(in_context, in_globalComponent)
	VisitComponent(in_context, in_component)

*/
DSC.Framework.Asset.Scene.Observer_Light = function(
	in_model,
	in_materialSkybox,
	in_materialAmbient,
	in_materialDirect,
	in_materialPoint,
	in_materialPointShadow,
	in_cameraComponent,
	_sunDirectionDNG,
	_skyColourNearSunDng,
	_skyColourFarSunDng,
	_horizonColourDng,
	_ambientColourDng,
	in_lightRenderTarget
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Observer_Light) )
		alert("DSC.Framework.Asset.Scene.Observer_Light: call constuctor with new keyword");

	this.m_model = in_model;
	this.m_materialSkyBox = in_materialSkybox;
	this.m_materialAmbient = in_materialAmbient;
	this.m_materialDirect = in_materialDirect;
	this.m_materialPoint = in_materialPoint;
	this.m_materialPointShadow = in_materialPointShadow;
	this.m_cameraComponent = in_cameraComponent;
	this.m_sunDirectionDNG = _sunDirectionDNG;
	this.m_skyColourNearSunDng = _skyColourNearSunDng;
	this.m_skyColourFarSunDng = _skyColourFarSunDng;
	this.m_horizonColourDng = _horizonColourDng;
	this.m_ambientColourDng = _ambientColourDng;
	this.m_lightRenderTarget = in_lightRenderTarget;

	return;
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.VisitObserver = function(in_context)
{
	if (undefined != this.m_materialSkyBox)
	{
		var upDirection = this.m_materialSkyBox.m_uniformCollection.GetUniform("u_upDirection");
		var sunLightDirection = this.m_materialSkyBox.m_uniformCollection.GetUniform("u_sunLightDirection");
		var sunSource = this.m_sunDirectionDNG.GetValue();

		var viewMatrix = this.m_cameraComponent.GetMatrixViewDNG().GetValue();
		upDirection = DSC.Math.Matrix4.MultiplyVector4(upDirection, viewMatrix, 0.0, 1.0, 0.0, 0.0);
		sunLightDirection = DSC.Math.Matrix4.MultiplyVector4(
			sunLightDirection, 
			viewMatrix, 
			DSC.Math.Vector3.GetX(sunSource), 
			DSC.Math.Vector3.GetY(sunSource), 
			DSC.Math.Vector3.GetZ(sunSource), 
			0.0);

		this.m_materialSkyBox.m_uniformCollection.SetUniform("u_upDirection", upDirection);		
		this.m_materialSkyBox.m_uniformCollection.SetUniform("u_sunLightDirection", sunLightDirection);

		in_context.ApplyMaterial(this.m_materialSkyBox);
		in_context.DrawModel(this.m_model);
	}
	
	if (undefined != this.m_ambientColourDng)
	{
		this.m_materialAmbient.m_uniformCollection.SetUniform("u_colour0", this.m_ambientColourDng.GetValue());		
		in_context.ApplyMaterial(this.m_materialAmbient);
		in_context.DrawModel(this.m_model);
	}

	return true;
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.VisitGlobalComponent = function(in_context, in_globalComponent)
{
	//return true;

	switch (in_globalComponent.GetLightType())
	{
	case "Direct":
		var direction = in_globalComponent.GetDirection();
		var viewMatrix = this.m_cameraComponent.GetMatrixViewDNG().GetValue();
		this.m_materialDirect.m_uniformCollection.SetUniform("u_direction", DSC.Math.Matrix4.MultiplyVector4(
			this.m_materialDirect.m_uniformCollection.GetUniform("u_direction"), 
			viewMatrix, 
			DSC.Math.Vector3.GetX(direction), 
			DSC.Math.Vector3.GetY(direction), 
			DSC.Math.Vector3.GetZ(direction), 
			0.0));

		this.m_materialDirect.m_uniformCollection.SetUniform("u_lightColour", in_globalComponent.GetColour());
		in_context.ApplyMaterial(this.m_materialDirect);
		break;
	default:
		return true;
	}

	in_context.DrawModel(this.m_model);

	return true;
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.VisitComponent = function(in_context, in_component)
{
	//return true;

	switch (in_component.GetLightType())
	{
	case "PointShadow":
		//get the light pos in view space
		var position = in_component.GetPosDng().GetValue();
		var viewMatrix = this.m_cameraComponent.GetMatrixViewDNG().GetValue();
		var resultPos = DSC.Math.Matrix4.MultiplyVector4(
			this.m_materialPoint.m_uniformCollection.GetUniform("u_lightPos"), 
			viewMatrix,
			DSC.Math.Vector3.GetX(position), 
			DSC.Math.Vector3.GetY(position), 
			DSC.Math.Vector3.GetZ(position), 
			1.0);

		//u_falloff: vec3 [radius, gamma, usePerspective?]
		var falloff = this.m_materialPoint.m_uniformCollection.GetUniform("u_falloff");
		falloff = (undefined == falloff) ? DSC.Math.Vector3.FactoryRaw() : falloff;
		DSC.Math.Vector3.SetX(falloff, in_component.GetRadiusDng().GetValue()); 
		DSC.Math.Vector3.SetY(falloff, in_component.GetFalloffDng().GetValue()); 
		DSC.Math.Vector3.SetZ(falloff, 1.0);

		in_component.UpdateShadowMap(resultPos, falloff, this.m_materialPointShadow.m_textureArray[1]);

		in_context.ApplyRenderTarget(this.m_lightRenderTarget);
		in_context.SetViewport(0, 0, this.m_lightRenderTarget.m_width, this.m_lightRenderTarget.m_height);

		this.m_materialPointShadow.m_uniformCollection.SetUniform("u_lightPos", resultPos);
		this.m_materialPointShadow.m_uniformCollection.SetUniform("u_lightColour", in_component.GetColourDng().GetValue());
		this.m_materialPointShadow.m_uniformCollection.SetUniform("u_falloff", falloff);

		this.m_materialPointShadow.m_textureArray[2] = in_component.m_texture;
		in_context.ApplyMaterial(this.m_materialPointShadow);

		break;
	case "Point":
		//get the light pos in view space
		var position = in_component.GetPosDng().GetValue();
		var viewMatrix = this.m_cameraComponent.GetMatrixViewDNG().GetValue();
		var resultPos = DSC.Math.Matrix4.MultiplyVector4(
			this.m_materialPoint.m_uniformCollection.GetUniform("u_lightPos"), 
			viewMatrix,
			DSC.Math.Vector3.GetX(position), 
			DSC.Math.Vector3.GetY(position), 
			DSC.Math.Vector3.GetZ(position), 
			1.0);

		this.m_materialPoint.m_uniformCollection.SetUniform("u_lightPos", resultPos);
		this.m_materialPoint.m_uniformCollection.SetUniform("u_lightColour", in_component.GetColourDng().GetValue());

		//u_falloff: vec3 [radius, gamma, usePerspective?]
		var falloff = this.m_materialPoint.m_uniformCollection.GetUniform("u_falloff");
		falloff = (undefined == falloff) ? DSC.Math.Vector3.FactoryRaw() : falloff;
		DSC.Math.Vector3.SetX(falloff, in_component.GetRadiusDng().GetValue()); 
		DSC.Math.Vector3.SetY(falloff, in_component.GetFalloffDng().GetValue()); 
		DSC.Math.Vector3.SetZ(falloff, 1.0);
		this.m_materialPoint.m_uniformCollection.SetUniform("u_falloff", falloff);

		in_context.ApplyMaterial(this.m_materialPoint);
		break;
	default:
		return true;
	}

	in_context.DrawModel(this.m_model);

	return true;
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetNearDng = function()
{
	return this.m_cameraComponent.GetNearDng();
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetFarDng = function()
{
	return this.m_cameraComponent.GetFarDng();
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetPosDng = function()
{
	return this.m_cameraComponent.GetPosDng();
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetAtDng = function()
{
	return this.m_cameraComponent.GetAtDng();
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetUnitRadiusFustrumDng = function()
{
	return this.m_cameraComponent.GetUnitRadiusFustrumDng();
}

DSC.Framework.Asset.Scene.Observer_Light.prototype.GetFustrumRadiusDepthScaleDng = function()
{
	return this.m_cameraComponent.GetFustrumRadiusDepthScaleDng();
}

DSC.Framework.Asset.Scene.Observer_Light.Factory = function(
	in_asset,
	in_context,
	in_cameraComponent,
	in_sunLightComponent,
	in_supportHalfFloat,
	in_colourTexture,
	in_depthTexture,
	in_ambientColour,
	in_lightRenderTarget
	)
{
	var screenQuad = in_asset.GetModel("QuadAPos2AUv2", in_context);
	var lightMaterialSkybox = in_asset.NewMaterial(
		"Default", 
		in_context, 
		{ m_shaderName : "PassLightSkybox" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_colourSkyTop : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.0 / 255.0, 0.0 / 255.0, 255.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_colourSkyEdge : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(64.0 / 255.0, 128.0 / 255.0, 255.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_colourGroundEdge : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(70.0 / 255.0, 70.0 / 255.0, 58.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_colourGroundBottom : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(128.0 / 255.0, 64.0 / 255.0, 0.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_colourSun : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(255.0 / 255.0, 255.0 / 255.0, 96.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_colourFog : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(240.0 / 255.0, 240.0 / 255.0, 255.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_upDirection : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.0, 1.0, 0.0),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_sunLightDirection : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(0.7, 0.7, 0.0),
				DSC.Framework.Context.Uniform.s_type.TVector3
				)
		}),
		[in_colourTexture]
	);

	var lightMaterialAmbient = in_asset.NewMaterial(
		"Default", 
		in_context, 
		{ 
			m_shaderName : (in_supportHalfFloat ? "PassLight16Ambient" : "PassLight8Ambient"),
			m_blend : true,
			m_blendSourceFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
			m_blendDestinationFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_colour0 : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(64.0 / 255.0, 64.0 / 255.0, 64.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				)
		}),
		[in_colourTexture]
	);

	var lightMaterialDirect = in_asset.NewMaterial(
		"Default", 
		in_context, 
		{ 
			m_shaderName : (in_supportHalfFloat ? "PassLight16Direct" : "PassLight8Direct"),
			m_blend : true,
			m_blendSourceFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
			m_blendDestinationFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_lightColour : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(64.0 / 255.0, 64.0 / 255.0, 64.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_direction : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				)
		}),
		[in_colourTexture, in_depthTexture]
	);

	var lightMaterialPoint = in_asset.NewMaterial(
		"Default", 
		in_context, 
		{ 
			m_shaderName : (in_supportHalfFloat ? "PassLight16Point" : "PassLight8Point"),
			m_blend : true,
			m_blendSourceFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
			m_blendDestinationFlag : DSC.Framework.Asset.Material.s_blendFlag.One,
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_lightColour : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(64.0 / 255.0, 64.0 / 255.0, 64.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_lightPos : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_falloff : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				)
		}),
		[in_colourTexture, in_depthTexture]
	);

	var lightMaterialPointShadow = in_asset.NewMaterial(
		"Default", 
		in_context, 
		{ 
			m_shaderName : (in_supportHalfFloat ? "PassLight16Point" : "PassLight8Point"),
		},
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_lightColour : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(64.0 / 255.0, 64.0 / 255.0, 64.0 / 255.0),
				DSC.Framework.Context.Uniform.s_type.TColour3
				),
			u_lightPos : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_falloff : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector3.FactoryRaw(),
				DSC.Framework.Context.Uniform.s_type.TVector3
				)
		}),
		[in_colourTexture, in_depthTexture, undefined]
	);

	var ambientColourDng = DSC.DNG.Node.FactoryRaw(in_ambientColour);
	var sunDirectionDNG = (undefined != in_sunLightComponent) ? in_sunLightComponent.GetDirectionDNG() : DSC.DNG.Node.FactoryRaw(DSC.Math.Vector3.FactoryRaw(0.0, -1.0, 0.0));

	return DSC.Framework.Asset.Scene.Observer_Light.FactoryRaw(
		screenQuad,
		lightMaterialSkybox,
		lightMaterialAmbient,
		lightMaterialDirect,
		lightMaterialPoint,
		lightMaterialPointShadow,
		in_cameraComponent,
		sunDirectionDNG,
		undefined,
		undefined,
		undefined,
		ambientColourDng,
		in_lightRenderTarget
		);
}

DSC.Framework.Asset.Scene.Observer_Light.FactoryRaw = function(
	in_model,
	in_materialSkybox,
	in_materialAmbient,
	in_materialDirect,
	in_materialPoint,
	in_materialPointShadow,
	in_cameraComponent,
	_sunDirectionDNG,
	_skyColourNearSunDng,
	_skyColourFarSunDng,
	_horizonColourDng,
	_ambientColourDng,
	in_lightRenderTarget
	)
{
	return new DSC.Framework.Asset.Scene.Observer_Light(
		in_model,
		in_materialSkybox,
		in_materialAmbient,
		in_materialDirect,
		in_materialPoint,
		in_materialPointShadow,
		in_cameraComponent,
		_sunDirectionDNG,
		_skyColourNearSunDng,
		_skyColourFarSunDng,
		_horizonColourDng,
		_ambientColourDng,
		in_lightRenderTarget
		);
}
