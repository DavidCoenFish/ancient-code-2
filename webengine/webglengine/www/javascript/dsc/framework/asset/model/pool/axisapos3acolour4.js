DSC.Framework.Asset.Model.Pool.AxisAPos3AColour = 
{
	"m_mode" : DSC.Framework.Context.WebGL.LINES,
	"m_elementCount" : 12,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array([
				0, 0, 0,
				1, 0, 0, 
				0, 0, 0,
				0, 1, 0, 
				0, 0, 0,
				0, 0, 1,  

				0, 0, 0,
				-1, 0, 0, 
				0, 0, 0,
				0, -1, 0, 
				0, 0, 0,
				0, 0, -1,  

				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				false
			),
		"a_colour" : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			4,
			new DSC.Common.t_u8Array([
				255, 0, 0, 255,
				255, 0, 0, 255,
				0, 255, 0, 255,
				0, 255, 0, 255,
				0, 0, 255, 255,
				0, 0, 255, 255,

				255, 0, 0, 63,
				255, 0, 0, 63,
				0, 255, 0, 63,
				0, 255, 0, 63,
				0, 0, 255, 63,
				0, 0, 255, 63,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : new DSC.Common.t_u8Array([
		0, 1,
		2, 3,
		4, 5,
		6, 7,
		8, 9,
		10, 11,
		])
}

//7 * 2 * 7  bytes (no index)
//(7 * 7) + 12 bytes (index)
