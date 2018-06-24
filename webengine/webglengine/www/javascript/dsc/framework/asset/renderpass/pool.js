DSC.Framework.Asset.RenderPass.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.RenderPass.Pool) )
		alert("DSC.Framework.Asset.RenderPass.Pool: call constuctor with new keyword");

	this.m_mapData = {};

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.RenderPass.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload, _drawable, _renderTarget, _model, _material)
{
	if (in_name in DSC.Framework.Asset.RenderPass.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.RenderPass.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);

		var drawable = (undefined != _drawable) ? _drawable : {
			m_material : (undefined == _material) ? in_asset.GetMaterial(data.m_material, in_context) : _material,
			m_model : (undefined == _model) ? in_asset.GetModel(data.m_model, in_context) : _model,
			Draw : function(sub_context)
			{
				sub_context.ApplyMaterial(this.m_material);
				sub_context.DrawModel(this.m_model);
			}
		};
		var renderTarget = (undefined != _renderTarget) ? _renderTarget : in_asset.GetRenderTarget(data.m_renderTarget, in_context);

		var renderPass = DSC.Framework.Asset.RenderPass.FactoryRaw(
			drawable,
			renderTarget,
			data.m_clearColour,
			data.m_clearDepth
			);
			
		return renderPass;
	}

	alert("RenderPass.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

DSC.Framework.Asset.RenderPass.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_mapData)
		return this.m_mapData[in_name];

	if (in_name in DSC.Framework.Asset.RenderPass.Pool)
	{
		var RenderPass = this.NewAsset(in_name, in_asset, in_context);
		this.m_mapData[in_name] = RenderPass;
		return RenderPass;
	}

	alert("RenderPass not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.RenderPass.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.RenderPass.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
