DSC.Framework.Asset.Material.Pool = function()
{
	if ( !(this instanceof DSC.Framework.Asset.Material.Pool) )
		alert("DSC.Framework.Asset.Material.Pool: call constuctor with new keyword");

	this.m_data = {};

	return;
}

//make a new asset of the given template name
DSC.Framework.Asset.Material.Pool.prototype.NewAsset = function(in_name, in_asset, in_context, _dataOverload, _uniformCollection, _textureArray)
{
	if (in_name in DSC.Framework.Asset.Material.Pool)
	{
		var dataTemplate = DSC.Framework.Asset.Material.Pool[in_name];
		var data = DSC.Common.OverloadData(dataTemplate, _dataOverload);

		var shader = (undefined != data.m_shader) ? data.m_shader : in_asset.GetShader(data.m_shaderName, in_context);

		var uniformCollection = (undefined == _uniformCollection) ? DSC.Framework.Context.Uniform.Collection.FactoryMaterial() : _uniformCollection;
		if (undefined != data.m_colour)
		{
			uniformCollection.AddUniform(DSC.Framework.Context.Uniform.Collection.s_colour, DSC.Framework.Context.Uniform.FactoryRaw(data.m_colour));
		}
		if (undefined != data.m_frame)
		{
			uniformCollection.AddUniform(DSC.Framework.Context.Uniform.Collection.s_frame, DSC.Framework.Context.Uniform.FactoryRaw(data.m_frame));
		}
		var textureArray;
		if ((undefined != data.m_textureArray) || (undefined != _textureArray))
		{
			textureArray = (undefined == _textureArray) ? [] : _textureArray;
			if (data.m_textureArray)
			{
				if (textureArray.length < data.m_textureArray.length)
					textureArray.length = data.m_textureArray.length;
				for (var index = 0; index < data.m_textureArray.length; ++index)
				{
					if (undefined != textureArray[index])
						continue;
					var textureName = data.m_textureArray[index];
					if (undefined != textureName)
						textureArray[index] = in_asset.GetTexture(textureName, in_context);
				}
			}
		}

		var material = DSC.Framework.Asset.Material.FactoryRaw(
			shader,
			uniformCollection,
			textureArray, //texture array
			data.m_vertexTransformHint,
			data.m_triangleCull,
			data.m_triangleClockwise,
			data.m_blend,
			data.m_blendSourceFlag,
			data.m_blendDestinationFlag,
			data.m_depthFlag
			);

		return material;
	}

	alert("Material.NewAsset failed to find asset [" + in_name + "]");
	return undefined;
}

//get the master copy of the named asset
// no override or texture array, only what the data template specifies
DSC.Framework.Asset.Material.Pool.prototype.GetAsset = function(in_name, in_asset, in_context)
{
	if (undefined == in_name)
		return undefined;

	if (in_name in this.m_data)
		return this.m_data[in_name];

	if (in_name in DSC.Framework.Asset.Material.Pool)
	{
		var material = this.NewAsset(in_name, in_asset, in_context);
		this.m_data[in_name] = material;
		return material;
	}

	alert("Material not found: " + in_name);

	return undefined;
}

DSC.Framework.Asset.Material.Pool.FactoryRaw = function(in_context)
{
	var pool = new DSC.Framework.Asset.Material.Pool();
	return pool;
}
