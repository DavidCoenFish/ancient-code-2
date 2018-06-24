DSC.Framework.Asset.Model.GeneratePointGridAPos2 = function(
	in_name,
	in_width,
	in_height
	)
{
	if (in_name in DSC.Framework.Asset.Model.Pool)
		return;

	var template = {
		m_mode : DSC.Framework.Context.WebGL.POINTS,
		m_elementCount : (in_width * in_height),
		m_mapDataStream : {},
		m_elementIndex : undefined	
	};

	var data = [];
	for (var indexY = 0; indexY < in_height; ++indexY)
	{
		var y = (((indexY + 0.5) / in_height) * 2.0) - 1.0;
		for (var indexX = 0; indexX < in_width; ++indexX)
		{
			var x = (((indexX + 0.5) / in_width) * 2.0) - 1.0;
			data.push(x);
			data.push(y);
		}
	}

	template.m_mapDataStream["a_position"] = DSC.Framework.Asset.Model.DataStream.FactoryRaw(
		DSC.Framework.Context.WebGL.FLOAT,
		2,
		new DSC.Common.t_floatArray(data),
		DSC.Framework.Context.WebGL.STATIC_DRAW,
		false
		);
	DSC.Framework.Asset.Model.Pool[in_name] = template;
	return;
}
