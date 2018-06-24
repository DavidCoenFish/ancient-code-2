/**
 * @private
 * @constructor
 * @implements {DSC.Framework.PoolInterface}
 */
DSC.Framework.Pool['Shader'] = function()
{
	if ( !(this instanceof DSC.Framework.Pool['Shader']) )
		alert("DSC.Framework.Pool.Shader: call constuctor with new keyword");

	this.m_data = {};
	this.m_arrayUnnamed = [];

	return;
}

/**
 * @param {!DSC.Framework.Context=} _context
 * @return {!DSC.Framework.Pool.Shader}
 */
DSC.Framework.Pool['Shader'].Factory = function(_context)
{
	var pool = new DSC.Framework.Pool['Shader']();
	if (undefined != _context)
	{
		_context.AddContextListener(pool);
	}

	return pool;
}

DSC.Framework.Pool['Shader'].prototype.OnContextLost = function()
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

DSC.Framework.Pool['Shader'].prototype.OnContextRestored = function(in_context)
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

DSC.Framework.Pool['Shader'].prototype.Create = function(in_data, _context)
{
	var shader = DSC.Framework.Asset.Shader.Factory(
		in_data['m_vertexShaderSource'],
		in_data['m_fragmentShaderSource'],
		in_data['m_mapVertexAttributeNames'], 
		in_data['m_mapUniformsNames'],
		_context
		);

	return shader;
}


DSC.Framework.Pool['Shader'].prototype.NewAsset = function(in_name, in_asset, _context, _dataOverload)
{
	if (in_name in DSC.Framework.Pool['Shader'])
	{
		var dataTemplate = DSC.Framework.Pool['Shader'][in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);
		var shader = this.Create(data, _context);
		this.m_arrayUnnamed.push(shader);
		return shader;
	}
	else
	{
		alert("Shader.NewAsset failed to find asset [" + in_name + "]");
	}
	return undefined;
}

DSC.Framework.Pool['Shader'].prototype.GetAsset = function(in_name, in_asset, _context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Pool['Shader'])
	{
		var data = DSC.Framework.Pool['Shader'][in_name];
		var shader = this.Create(data, _context);
		this.m_data[in_name] = shader;
		return shader;
	}

	alert("Shader.GetAsset failed to find asset [" + in_name + "]");

	return undefined;
}

