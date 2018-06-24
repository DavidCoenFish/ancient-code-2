//DSC.Framework.Asset.Model.Pool.Model00

Task.Cloth00.GenerateClothMesh = function(in_name, in_x, in_y)
{
	var meshData = {
		m_mode : DSC.Framework.Context.WebGL.TRIANGLES,
		m_elementCount : ((in_x - 1) * (in_y - 1) * 6),
		m_posScale : 1.0,
		m_mapDataStream : undefined,
		m_elementIndex : undefined
	};

	var posData = []; //-128 ... 127 -> -1.0 to 1.0
	var uvData = []; //0 ... 255 -> 0.0 to 1.0
	var neigbourData0 = []; //0 ... 255 -> 0.0 to 1.0
	var neigbourData1 = []; //0 ... 255 -> 0.0 to 1.0
	var elementIndexData = [];

	var ByteRange = function(in_value)
	{
		return Math.max(-128, Math.min(127, Math.floor(in_value * 127.5)));
	}
	var UnsignedByteRange = function(in_value)
	{
		return Math.max(0, Math.min(255, Math.floor(in_value * 255.0)));
	}
	for (var indexY = 0; indexY < in_y; ++indexY)
	{
		for (var indexX = 0; indexX < in_x; ++indexX)
		{
			var posX = (-0.5 + (indexX / (in_x - 1)));
			var posY = -(indexY / (in_y - 1));
			posData.push(ByteRange(posX));
			posData.push(ByteRange(posY));
			posData.push(ByteRange(0.0));
			var u = (indexX / (in_x - 1));
			var y = (indexY / (in_y - 1));
			uvData.push(u);
			uvData.push(y);
			neigbourData0.push(indexX != 0 ? 255 : 0);
			neigbourData0.push(indexY != 0 ? 255 : 0);
			neigbourData0.push(indexX != (in_x - 1) ? 255 : 0);
			neigbourData0.push(indexX != 0 ? 255 : 0);
			neigbourData1.push(indexX != (in_x - 1) ? 255 : 0);
			neigbourData1.push(indexX != 0 ? 255 : 0);
			neigbourData1.push(indexY != (in_y - 1) ? 255 : 0);
			neigbourData1.push(indexX != (in_x - 1) ? 255 : 0);
		}
	}
	for (var indexY = 0; indexY < (in_y - 1); ++indexY)
	{
		for (var indexX = 0; indexX < (in_x - 1); ++indexX)
		{
			var index0 = (indexY * in_x) + indexX;
			var index1 = (indexY * in_x) + indexX + 1;
			var index2 = ((indexY + 1) * in_x) + indexX;
			var index3 = ((indexY + 1) * in_x) + indexX + 1;
			elementIndexData.push(index0);
			elementIndexData.push(index1);
			elementIndexData.push(index2);
			elementIndexData.push(index1);
			elementIndexData.push(index3);
			elementIndexData.push(index2);
		}
	}

	meshData.m_mapDataStream = {
		a_position : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array(posData),
			undefined,
			true //normalise
			),
		a_uv : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			2,
			new DSC.Common.t_u8Array(uvData),
			undefined,
			true //normalise
			),
		a_neigbour0 : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			4,
			new DSC.Common.t_u8Array(neigbourData0),
			undefined,
			true //normalise
			),
		a_neigbour1 : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			4,
			new DSC.Common.t_u8Array(neigbourData1),
			undefined,
			true //normalise
			)
	}

	meshData.m_elementIndex = new DSC.Common.t_u16Array(elementIndexData);

	DSC.Framework.Asset.Model.Pool[in_name] = meshData;
	return;
}
