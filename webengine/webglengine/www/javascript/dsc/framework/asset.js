DSC.Framework.Asset = function(in_context)
{
	if ( !(this instanceof DSC.Framework.Asset) )
		alert("Asset: call constuctor with new keyword");

	if (undefined != DSC.Framework.Asset.Font)
	{
		this.m_fontPool = DSC.Framework.Asset.Font.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Gui)
	{
		this.m_guiPool = DSC.Framework.Asset.Gui.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Material)
	{
		this.m_materialPool = DSC.Framework.Asset.Material.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Model)
	{
		this.m_modelPool = DSC.Framework.Asset.Model.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.RenderPass)
	{
		this.m_renderPassPool = DSC.Framework.Asset.RenderPass.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.RenderTarget)
	{
		this.m_renderTargetPool = DSC.Framework.Asset.RenderTarget.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Scene)
	{
		this.m_scenePool = DSC.Framework.Asset.Scene.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Shader)
	{
		this.m_shaderPool = DSC.Framework.Asset.Shader.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Texture)
	{
		this.m_texturePool = DSC.Framework.Asset.Texture.Pool.FactoryRaw(in_context);
	}

	if (undefined != DSC.Framework.Asset.Widget)
	{
		this.m_widgetPool = DSC.Framework.Asset.Widget.Pool.FactoryRaw(in_context);
	}

	return;
}

DSC.Framework.Asset.prototype.NewFont = function(in_name, in_context, _dataOverride)
{
	if (this.m_fontPool)
		return this.m_fontPool.NewAsset(in_name, this, in_context, _dataOverride);
	return undefined;
}

DSC.Framework.Asset.prototype.GetFont = function(in_name, in_context)
{
	if (this.m_fontPool)
		return this.m_fontPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.NewMaterial = function(in_name, in_context, _dataOverride, _uniformCollection, _textureArray)
{
	if (this.m_materialPool)
		return this.m_materialPool.NewAsset(in_name, this, in_context, _dataOverride, _uniformCollection, _textureArray);
	return undefined;
}

DSC.Framework.Asset.prototype.GetMaterial = function(in_name, in_context)
{
	if (this.m_materialPool)
		return this.m_materialPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.NewModel = function(in_name, in_context, _dataOverride)
{
	if (this.m_modelPool)
		return this.m_modelPool.NewAsset(in_name, this, in_context, _dataOverride);
	return undefined;
}

DSC.Framework.Asset.prototype.GetModel = function(in_name, in_context)
{
	if (this.m_modelPool)
		return this.m_modelPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.NewRenderPass = function(in_name, in_context, _dataOverride, _drawable, _renderTarget, _model, _material)
{
	if (this.m_renderPassPool)
		return this.m_renderPassPool.NewAsset(in_name, this, in_context, _dataOverride, _drawable, _renderTarget, _model, _material);
	return undefined;
}

DSC.Framework.Asset.prototype.GetRenderPass = function(in_name, in_context)
{
	if (this.m_renderPassPool)
		return this.m_renderPassPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.NewRenderTarget = function(in_name, in_context, _dataOverride, _mapData)
{
	if (this.m_renderTargetPool)
		return this.m_renderTargetPool.NewAsset(in_name, this, in_context, _dataOverride, _mapData);
	return undefined;
}

DSC.Framework.Asset.prototype.GetRenderTarget = function(in_name, in_context)
{
	if (this.m_renderTargetPool)
		return this.m_renderTargetPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.GetScene = function(in_name, in_context, _sceneParam)
{
	if (this.m_scenePool)
		return this.m_scenePool.GetAsset(in_name, this, in_context, _sceneParam);
	return undefined;
}

//todo: use name as template?
DSC.Framework.Asset.prototype.NewShader = function(in_name, in_context, _dataOverload)
{
	if (this.m_shaderPool)
		return this.m_shaderPool.NewAsset(in_name, this, in_context, _dataOverload);
	return undefined;
}

DSC.Framework.Asset.prototype.GetShader = function(in_name, in_context)
{
	if (this.m_shaderPool)
		return this.m_shaderPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.NewTexture = function(in_name, in_context, _dataOverload)
{
	if (this.m_texturePool)
		return this.m_texturePool.NewAsset(in_name, this, in_context, _dataOverload);
	return undefined;
}

DSC.Framework.Asset.prototype.GetTexture = function(in_name, in_context)
{
	if (this.m_texturePool)
		return this.m_texturePool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.prototype.GetWidget = function(in_name, in_context)
{
	if (this.m_widgetPool)
		return this.m_widgetPool.GetAsset(in_name, this, in_context);
	return undefined;
}

DSC.Framework.Asset.FactoryRaw = function(in_context)
{
	return new DSC.Framework.Asset(in_context);
}
