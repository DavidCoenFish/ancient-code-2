DSC.Framework.Asset.Model.Pool.QuadAPos2AUv2 = 
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
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				false
			),
		"a_uv" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			2,
			new DSC.Common.t_u8Array([
				0,		0,
				0,		1,
				1,		0,
				1,		1,
				1,		0,
				0,		1
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				false
			),
	},
	"m_elementIndex" : undefined
}

//24 bytes - no index (overhead of add a index is a new array, which is more than 2 bytes...)
//22 bytes - for 4 verts and 6 index 