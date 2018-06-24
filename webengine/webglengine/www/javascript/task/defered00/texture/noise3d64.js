/*
*/
DSC.Framework.Asset.Texture.Pool.Noise3d64 = 
{
	m_width : 512,
	m_height : 512,
	m_data : undefined,
	m_internalFormat : DSC.Framework.Context.WebGL.RGBA,
	m_format : DSC.Framework.Context.WebGL.RGBA,
	m_type : DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
	m_flip : true,
	m_magFilter : undefined,
	m_minFilter : undefined,
	m_wrapS : DSC.Framework.Context.WebGL.REPEAT,
	m_wrapT : DSC.Framework.Context.WebGL.REPEAT
}

DSC.Framework.Asset.Texture.Pool.Noise3d64.MakeData = function()
{
	var arrayData = [];
	for (var index = 0; index < (512 * 512); ++index)
	{	
		arrayData.push(0);
		arrayData.push(0);
		arrayData.push(0);
		value = Math.max(0, Math.min(255, Math.floor(Math.random() * 256)));
		arrayData.push(value);
	}
	var CalculateIndex = function(in_x, in_y, in_z)
	{
		var safeX = (in_x + 64) % 64;
		var safeY = (in_y + 64) % 64;
		var safeZ = (in_z + 64) % 64;
		var z_uv_x = safeZ % 8;
		var z_uv_y = Math.floor(safeZ / 8);
		var index = (safeX + (z_uv_x * 64)) + ((safeY + (z_uv_y * 64)) * 512);
		return index;
	}
	for (var indexZ = 0; indexZ < 64; ++indexZ)
	{
		for (var indexY = 0; indexY < 64; ++indexY)
		{
			for (var indexX = 0; indexX < 64; ++indexX)
			{
				var index = CalculateIndex(indexX, indexY, indexZ);
				var indexMinus1X = CalculateIndex(indexX - 1, indexY, indexZ);
				var indexMinus1Y = CalculateIndex(indexX, indexY - 1, indexZ);
				var indexMinus1Z = CalculateIndex(indexX, indexY, indexZ - 1);
				var orig = arrayData[(index * 4) + 3];
				var xmin1 = arrayData[(indexMinus1X * 4) + 3];
				var ymin1 = arrayData[(indexMinus1Y * 4) + 3];
				var zmin1 = arrayData[(indexMinus1Z * 4) + 3];
				arrayData[(index * 4) + 0] = Math.max(0, Math.min(255, Math.floor(((xmin1 - orig) / 2.0) + 128)));
				arrayData[(index * 4) + 1] = Math.max(0, Math.min(255, Math.floor(((ymin1 - orig) / 2.0) + 128)));
				arrayData[(index * 4) + 2] = Math.max(0, Math.min(255, Math.floor(((zmin1 - orig) / 2.0) + 128)));
			}
		}
	}
	var textureData = new DSC.Common.t_u8Array(arrayData);
	return textureData;
}



