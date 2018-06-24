/*
//update force texture
input posA, velA? 
output force

//update velocity texture
input force, velA
output velB

//update pos texture
input posA, velB
output posB

+ - - - t - - - T - - - t - - - +
| 0.125   0.375   0.625   0.875 |

do we have a dummy edge (right, bottom) of the cloth mesh 
to allow adequate uv coverage of the positions

v0 - v1 - v2 - v3 - v4 (v4 ultimatly uses v3's position)
+ - - - t - - - T - - - t - - - +
|  v0      v1      v2       v3  |
//what about value interpolation? -> do test. yes it works, 
// but need to be wary of moving past draw point


*/
DSC.Framework.Asset.Scene.Component.Cloth.Resource = function(
	in_modelQuad,
	in_materialCalcForce,
	in_materialCalcVelocity,
	in_materialCalcPosition,
	in_materialSetupPosition,
	in_arrayTextureTargets,
	in_arrayRenderTargets
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Component.Cloth.Resource) )
		alert("DSC.Framework.Asset.Scene.Component.Cloth.Resource: call constuctor with new keyword");

	this.m_modelQuad = in_modelQuad; 
	this.m_materialCalcForce = in_materialCalcForce;
	this.m_materialCalcVelocity = in_materialCalcVelocity;
	this.m_materialCalcPosition = in_materialCalcPosition;
	this.m_materialSetupPosition = in_materialSetupPosition;
	this.m_arrayTextureTargets = in_arrayTextureTargets;
	this.m_arrayRenderTargets = in_arrayRenderTargets;
	this.m_textureArrayLayoutToggle = true;
	this.m_setupDone = false;
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout = {}
DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[true] = 
{
//	TPosA : 0,
//	TVelA : 1,
//	TForce : 2,
//	TVelB : 3,
//	TPosB : 2 // recycle force texture

	TPosA : 0,
	TVelA : 1,
	TForce : 2,
	TVelB : 3,
	TPosB : 4
}
DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[false] = 
{
//	TPosA : 2,
//	TVelA : 3,
//	TForce : 0,
//	TVelB : 1,
//	TPosB : 0

	TPosA : 4,
	TVelA : 3,
	TForce : 2,
	TVelB : 1,
	TPosB : 0
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.GetPosATexture = function()
{
	var textureIndex = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosA;
	return this.m_arrayTextureTargets[textureIndex];
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.GetPosBTexture = function()
{
	var textureIndex = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosB;
	return this.m_arrayTextureTargets[textureIndex];
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.GetVelATexture = function()
{
	var textureIndex = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelA;
	return this.m_arrayTextureTargets[textureIndex];
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.GetVelBTexture = function()
{
	var textureIndex = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelB;
	return this.m_arrayTextureTargets[textureIndex];
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.GetForceTexture = function()
{
	var textureIndex = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TForce;
	return this.m_arrayTextureTargets[textureIndex];
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.Update = function(
	in_timeDelta, 
	in_context, 
	in_model,
	in_worldTransformDng, 
	in_worldInvertTransformDng, 
	in_transformDeltaInvertDng,
	in_clothParamDng, 
	in_accelerationDng
	)
{	
	this.m_textureArrayLayoutToggle = (0 != (this.m_textureArrayLayoutToggle ^ true));

	if (true != this.m_setupDone)
	{
		this.m_setupDone = true;
		this.ZeroVelocityTexture(in_context);
		this.SetupPositionTexture(in_context, in_model);
	}
	else
	{
		this.CalcForceTexture(in_context, in_model, in_transformDeltaInvertDng, in_clothParamDng, in_accelerationDng);
		this.CalcVelocityTexture(in_context, in_timeDelta, in_transformDeltaInvertDng);
		this.CalcPositionTexture(in_context, in_model, in_timeDelta, in_transformDeltaInvertDng);
	}

	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.ZeroVelocityTexture = function(in_context)
{
	var indexVelB = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelB;
	var renderTarget = this.m_arrayRenderTargets[indexVelB];
	in_context.ApplyRenderTarget(renderTarget);
	in_context.SetViewport(0, 0, renderTarget.m_width, renderTarget.m_height);
	in_context.Clear(DSC.Math.Colour.s_transparent);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.SetupPositionTexture = function(in_context, in_model)
{
	var indexPosB = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosB;
	var renderTarget = this.m_arrayRenderTargets[indexPosB];
	in_context.ApplyRenderTarget(renderTarget);
	in_context.SetViewport(0, 0, renderTarget.m_width, renderTarget.m_height);
	in_context.ApplyMaterial(this.m_materialSetupPosition);
	in_context.DrawModel(in_model);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.CalcForceTexture = function(in_context, in_model, in_transformDeltaDng, in_clothParamDng, in_accelerationDng)
{
	this.m_materialCalcForce.m_uniformCollection.SetUniform("u_clothParam", in_clothParamDng.GetValue());
	this.m_materialCalcForce.m_uniformCollection.SetUniform("u_gravity", in_accelerationDng.GetValue());
	this.m_materialCalcForce.m_uniformCollection.SetUniform("u_matrixFrameDelta", in_transformDeltaDng.GetValue());

	var indexPosA = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosA;
	var indexVelA = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelA;
	this.m_materialCalcForce.m_textureArray[0] = this.m_arrayTextureTargets[indexPosA];
	this.m_materialCalcForce.m_textureArray[1] = this.m_arrayTextureTargets[indexVelA];

	var index = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TForce;
	var renderTarget = this.m_arrayRenderTargets[index];
	in_context.ApplyRenderTarget(renderTarget);
	in_context.SetViewport(0, 0, renderTarget.m_width, renderTarget.m_height);
	in_context.ApplyMaterial(this.m_materialCalcForce);
	in_context.DrawModel(in_model);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.CalcVelocityTexture = function(in_context, in_timeDelta, in_transformDeltaDng)
{
	this.m_materialCalcVelocity.m_uniformCollection.SetUniform("u_timeDelta", in_timeDelta);
	this.m_materialCalcVelocity.m_uniformCollection.SetUniform("u_matrixFrameDelta", in_transformDeltaDng.GetValue());

	var indexVelA = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelA;
	var indexForce = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TForce;
	this.m_materialCalcVelocity.m_textureArray[0] = this.m_arrayTextureTargets[indexVelA];
	this.m_materialCalcVelocity.m_textureArray[1] = this.m_arrayTextureTargets[indexForce];

	var index = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelB;
	var renderTarget = this.m_arrayRenderTargets[index];
	in_context.ApplyRenderTarget(renderTarget);
	in_context.SetViewport(0, 0, renderTarget.m_width, renderTarget.m_height);
	in_context.ApplyMaterial(this.m_materialCalcVelocity);
	in_context.DrawModel(this.m_modelQuad);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.prototype.CalcPositionTexture = function(in_context, in_model, in_timeDelta, in_transformDeltaDng)
{
	this.m_materialCalcPosition.m_uniformCollection.SetUniform("u_timeDelta", in_timeDelta);
	this.m_materialCalcPosition.m_uniformCollection.SetUniform("u_matrixFrameDelta", in_transformDeltaDng.GetValue());

	var indexPosA = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosA;
	var indexVelB = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TVelB;
	this.m_materialCalcPosition.m_textureArray[0] = this.m_arrayTextureTargets[indexPosA];
	this.m_materialCalcPosition.m_textureArray[1] = this.m_arrayTextureTargets[indexVelB];

	var index = DSC.Framework.Asset.Scene.Component.Cloth.Resource.s_textureArrayLayout[this.m_textureArrayLayoutToggle].TPosB;
	var renderTarget = this.m_arrayRenderTargets[index];
	in_context.ApplyRenderTarget(renderTarget);
	in_context.SetViewport(0, 0, renderTarget.m_width, renderTarget.m_height);
	in_context.ApplyMaterial(this.m_materialCalcPosition);
	in_context.DrawModel(in_model);
	return;
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.Factory = function(
	in_width,
	in_height,
	in_assetManager,
	in_context
	)
{
	var modelQuad = in_assetManager.GetModel("QuadAPos2AUv2", in_context);

	var textureArray = [];
	var textureTemplate = 
	{
		m_width : in_width,
		m_height : in_height,
		m_flip : false,
		m_magFilter : DSC.Framework.Context.WebGL.NEAREST,
		m_minFilter : DSC.Framework.Context.WebGL.NEAREST, //NEAREST_MIPMAP_NEAREST,
		m_wrapS : DSC.Framework.Context.WebGL.CLAMP_TO_EDGE,
		m_wrapT : DSC.Framework.Context.WebGL.CLAMP_TO_EDGE
	};

	//RGBByte
	textureArray.push(in_assetManager.NewTexture("RGBHalfFloat", in_context, textureTemplate));
	textureArray.push(in_assetManager.NewTexture("RGBHalfFloat", in_context, textureTemplate));
	textureArray.push(in_assetManager.NewTexture("RGBHalfFloat", in_context, textureTemplate));
	textureArray.push(in_assetManager.NewTexture("RGBHalfFloat", in_context, textureTemplate));
	textureArray.push(in_assetManager.NewTexture("RGBHalfFloat", in_context, textureTemplate));

	var renderTargetArray = [];
	var renderTargetTemplate = 
	{
		m_width : in_width,
		m_height : in_height
	};
	renderTargetArray.push(in_assetManager.NewRenderTarget("Default", in_context, renderTargetTemplate, { colour0 : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(textureArray[0]) } ));
	renderTargetArray.push(in_assetManager.NewRenderTarget("Default", in_context, renderTargetTemplate, { colour0 : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(textureArray[1]) } ));
	renderTargetArray.push(in_assetManager.NewRenderTarget("Default", in_context, renderTargetTemplate, { colour0 : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(textureArray[2]) } ));
	renderTargetArray.push(in_assetManager.NewRenderTarget("Default", in_context, renderTargetTemplate, { colour0 : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(textureArray[3]) } ));
	renderTargetArray.push(in_assetManager.NewRenderTarget("Default", in_context, renderTargetTemplate, { colour0 : DSC.Framework.Asset.RenderTarget.Data.FactoryRaw(textureArray[4]) } ));

	var materialCalcForce = in_assetManager.NewMaterial(
		"Default", 
		in_context,
		{ m_shaderName : "ClothCalcForce" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_clothSize : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector4.FactoryRaw(in_width * 1.0, in_height * 1.0, 1.0 / in_width, 1.0 / in_height),
				DSC.Framework.Context.Uniform.s_type.TVector4
				),
			u_clothParam : DSC.Framework.Context.Uniform.FactoryRaw(
				undefined,
				DSC.Framework.Context.Uniform.s_type.TVector4
				),
			u_gravity : DSC.Framework.Context.Uniform.FactoryRaw(
				undefined,
				DSC.Framework.Context.Uniform.s_type.TVector3
				),
			u_matrixFrameDelta : DSC.Framework.Context.Uniform.FactoryRaw(
				undefined,
				DSC.Framework.Context.Uniform.s_type.TMatrix4
				),
			}),
		[ undefined, undefined ]
		);

	var materialCalcVelocity = in_assetManager.NewMaterial(
		"Default", 
		in_context,
		{ m_shaderName : "ClothCalcVelocity" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_timeDelta : DSC.Framework.Context.Uniform.FactoryRaw(
				0.0,
				DSC.Framework.Context.Uniform.s_type.TFloat
				),
			u_matrixFrameDelta : DSC.Framework.Context.Uniform.FactoryRaw(
				undefined,
				DSC.Framework.Context.Uniform.s_type.TMatrix4
				),
			}),
		[ undefined, undefined ]
		);

	var materialCalcPosition = in_assetManager.NewMaterial(
		"Default", 
		in_context,
		{ m_shaderName : "ClothCalcPosition" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_timeDelta : DSC.Framework.Context.Uniform.FactoryRaw(
				0.0,
				DSC.Framework.Context.Uniform.s_type.TFloat
				),		
			u_matrixFrameDelta : DSC.Framework.Context.Uniform.FactoryRaw(
				undefined,
				DSC.Framework.Context.Uniform.s_type.TMatrix4
				),
			}),
		[ undefined, undefined ]
		);

	var materialSetupPosition = in_assetManager.NewMaterial(
		"Default", 
		in_context,
		{ m_shaderName : "ClothInitialWritePos" },
		DSC.Framework.Context.Uniform.Collection.FactoryRaw({
			u_clothSize : DSC.Framework.Context.Uniform.FactoryRaw(
				DSC.Math.Vector4.FactoryRaw(in_width * 1.0, in_height * 1.0, 1.0 / in_width, 1.0 / in_height),
				DSC.Framework.Context.Uniform.s_type.TVector4
				)			
			})
		);

	return DSC.Framework.Asset.Scene.Component.Cloth.Resource.FactoryRaw(
		modelQuad,
		materialCalcForce,
		materialCalcVelocity,
		materialCalcPosition,
		materialSetupPosition,
		textureArray,
		renderTargetArray
		);
}

DSC.Framework.Asset.Scene.Component.Cloth.Resource.FactoryRaw = function(
	in_modelQuad,
	in_materialCalcForce,
	in_materialCalcVelocity,
	in_materialCalcPosition,
	in_materialSetupPosition,
	in_arrayTextureTargets,
	in_arrayRenderTargets
	)
{
	return new DSC.Framework.Asset.Scene.Component.Cloth.Resource(
		in_modelQuad,
		in_materialCalcForce,
		in_materialCalcVelocity,
		in_materialCalcPosition,
		in_materialSetupPosition,
		in_arrayTextureTargets,
		in_arrayRenderTargets
		);
}
