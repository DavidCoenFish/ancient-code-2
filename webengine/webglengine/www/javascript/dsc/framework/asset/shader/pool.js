DSC.Framework.Asset.Shader.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Shader.Pool) )
		alert("DSC.Framework.Asset.Shader.Pool: call constuctor with new keyword");

	this.m_data = {};
	this.m_arrayUnnamed = [];

	return;
}

DSC.Framework.Asset.Shader.Pool.prototype.OnContextLost = function()
{
	for (var key in this.m_data)
	{
		this.m_data[key].OnContextLost();
	}
	this.m_arrayUnnamed.forEach(function(item)
	{
		item.OnContextLost();
	});

	return;
}

DSC.Framework.Asset.Shader.Pool.prototype.OnContextRestored = function(in_context)
{
	for (var key in this.m_data)
	{
		this.m_data[key].OnContextRestored(in_context);
	}
	this.m_arrayUnnamed.forEach(function(item)
	{
		item.OnContextRestored(in_context);
	});

	return;
}

DSC.Framework.Asset.Shader.Pool.prototype.Create = function(in_context, in_data)
{
	var shader = DSC.Framework.Asset.Shader.FactoryRaw(
		in_context,
		in_data.m_vertexShaderSource,
		in_data.m_fragmentShaderSource,
		in_data.m_mapVertexAttributeNames, 
		in_data.m_mapUniformsNames
		);

	return shader;
}


DSC.Framework.Asset.Shader.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload)
{
	if (in_name in DSC.Framework.Asset.Shader.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.Material.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var shader = this.Create(in_context, data);
		this.m_arrayUnnamed.push(shader);
		return shader;
	}
	else
	{
		alert("Shader.NewAsset failed to find asset [" + in_name + "]");
	}
	return undefined;
}

DSC.Framework.Asset.Shader.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Asset.Shader.Pool)
	{
		var data = DSC.Framework.Asset.Shader.Pool[in_name];
		var shader = this.Create(in_context, data);
		this.m_data[in_name] = shader;
		return shader;
	}

	alert("Shader.GetAsset failed to find asset [" + in_name + "]");

	return undefined;
}

DSC.Framework.Asset.Shader.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Shader.Pool();
	in_context.AddContextListener(pool);

	return pool;
}
