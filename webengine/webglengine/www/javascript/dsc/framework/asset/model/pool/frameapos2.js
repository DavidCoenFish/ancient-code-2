// frame is (0 .. 1.0)
// see bounds for (-1.0 ... 1.0)

DSC.Framework.Asset.Model.Pool.FrameAPos2 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.LINES,
	"m_elementCount" : 8,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			2,
			new DSC.Common.t_u8Array([
				0, 0, 0, 255,
				0, 255, 255, 255, 
				255, 255, 255, 0,
				255, 0, 0, 0
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : undefined
}

//16 bytes - no index, 8 verts
//16 bytes - for 4 verts and 8 index 