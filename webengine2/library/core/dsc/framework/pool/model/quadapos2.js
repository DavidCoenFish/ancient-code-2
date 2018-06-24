DSC.Framework.Asset.Model.Pool.QuadAPos2 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 6,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			2,
			new DSC.Common.t_s8Array([
				-1, -1,
				-1, 1,
				1, -1,

				1, 1, 
				1, -1,
				-1, 1
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW
			),
	},
	"m_elementIndex" : undefined
}

//12 bytes - no index
//14 bytes - for 4 verts and 6 index 