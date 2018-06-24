/*

cloth width 4 (power of two for texture), vertex width 5
v0 - v1 - v2 - v3 - v4 (v4 uses v3's position)
+ - - - t - - - T - - - t - - - +
|  v0      v1      v2       v3  |

change a_neigbour to distance to next point

*/
DSC.Framework.Asset.Scene.Component.Cloth.GenerateMesh = function(in_name, in_x, in_y)
{
	var meshData = {
		m_mode : DSC.Framework.Context.WebGL.TRIANGLES,
		m_elementCount : (in_x * in_y * 6),
		m_posScale : 1.0,
		m_mapDataStream : undefined,
		m_elementIndex : undefined
	};

	var posData = []; //-128 ... 127 -> -1.0 to 1.0
	var uvWriteData = []; //0.0 ... 1.0
	var uvData = []; //0 ... 255 -> 0.0 to 1.0
	var neigbourData0 = []; //0 ... 255 -> 0.0 to 1.0
	var neigbourData1 = []; //0 ... 255 -> 0.0 to 1.0
	var weightData = []; //0 ... 255
	var elementIndexData = [];

	var ByteRange = function(in_value)
	{
		return Math.max(-128, Math.min(127, Math.floor(in_value * 127.5)));
	}
	var UnsignedByteRange = function(in_value)
	{
		return Math.max(0, Math.min(255, Math.floor(in_value * 255.0)));
	}
	for (var indexY = 0; indexY <= in_y; ++indexY)
	{
		for (var indexX = 0; indexX <= in_x; ++indexX)
		{
			var posX = (-0.5 + Math.min(1.0, (indexX / (in_x - 1))));
			var posY = -(Math.min(1.0, (indexY / (in_y - 1.0))));
			posData.push(ByteRange(posX));
			posData.push(ByteRange(posY));
			posData.push(ByteRange(0.0));

			var uWrite = (((indexX + 0.5) / in_x) * 2.0) - 1.0;
			var vWrite = (((indexY + 0.5) / in_y) * 2.0) - 1.0;
			uvWriteData.push(uWrite);
			uvWriteData.push(vWrite);

			var u = Math.min(1.0, indexX / (in_x - 1));
			var v = Math.min(1.0, indexY / (in_y - 1));
			uvData.push(UnsignedByteRange(u));
			uvData.push(UnsignedByteRange(v));

			//first, last, outside
			var outside = ((indexX == in_x) || (indexY == in_y));
			var hasLeft = (0 != indexX);
			var hasRight = (indexX < (in_x - 1));
			var hasTop = (0 != indexY);
			var hasBottom = (indexY < (in_y - 1));

			neigbourData0.push(((true != outside) && (true == hasLeft) && (true == hasTop)) ? 255 : 0);
			neigbourData0.push(((true != outside) && (true == hasTop)) ? 255 : 0);
			neigbourData0.push(((true != outside) && (true == hasRight) && (true == hasTop)) ? 255 : 0);

			neigbourData0.push(((true != outside) && (true == hasLeft)) ? 255 : 0);
			neigbourData1.push(((true != outside) && (true == hasRight)) ? 255 : 0);

			neigbourData1.push(((true != outside) && (true == hasLeft) && (true == hasBottom)) ? 255 : 0);
			neigbourData1.push(((true != outside) && (true == hasBottom)) ? 255 : 0);
			neigbourData1.push(((true != outside) && (true == hasRight) && (true == hasBottom)) ? 255 : 0);

			weightData.push(((indexX == 0 && indexY == 0) || (indexY == 0 && indexX == (in_x - 1))) ? 255 : 0);
		}
	}
	for (var indexY = 0; indexY < in_y; ++indexY)
	{
		for (var indexX = 0; indexX < in_x; ++indexX)
		{
			var index0 = (indexY * (in_x + 1)) + indexX;
			var index1 = (indexY * (in_x + 1)) + indexX + 1;
			var index2 = ((indexY + 1) * (in_x + 1)) + indexX;
			var index3 = ((indexY + 1) * (in_x + 1)) + indexX + 1;
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
		a_uvWrite : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.FLOAT,
			2,
			new DSC.Common.t_floatArray(uvWriteData),
			undefined,
			false //normalise
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
			),
		a_weight : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			1,
			new DSC.Common.t_u8Array(weightData),
			undefined,
			true //normalise
			),
	}

	meshData.m_elementIndex = new DSC.Common.t_u16Array(elementIndexData);

	DSC.Framework.Asset.Model.Pool[in_name] = meshData;
	return;
}
