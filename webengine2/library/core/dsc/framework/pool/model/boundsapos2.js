// bounds is (-1.0 ... 1.0)
// see frame for (0 .. 1.0)

DSC.Framework.Asset.Model.Pool.BoundsAPos2 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.LINES,
	"m_elementCount" : 8,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			2,
			new DSC.Common.t_s8Array([
				-128, -128, -128, 127,
				-128, 127, 127, 127,
				127, 127, 127, -128,
				127, -128, -128, -128
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : undefined
}

//16 bytes - no index, 8 verts
//16 bytes - for 4 verts and 8 index 