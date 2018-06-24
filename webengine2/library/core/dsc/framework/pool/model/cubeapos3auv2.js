// bounds should be (-1.0 ... 1.0)
/*
	  6 -- 7
	 /	  /
	4 -- 5

	  2 -- 3
	 /	  /
	0 -- 1
*/
DSC.Framework.Asset.Model.Pool.CubeAPos3AUv2 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 36,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array([
				-128, -128, -128,
				127, -128, -128,
				-128, 127, -128,
				127, 127, -128,
				-128, -128, 127,
				127, -128, 127,
				-128, 127, 127,
				127, 127, 127,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
		"a_uv" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,
			2,
			new DSC.Common.t_u8Array([
				0,		0,
				255,	0,
				0,		255,
				255,	255,
				0,		0,
				255,	0,
				0,		255,
				255,	255,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : new DSC.Common.t_u8Array([
		0, 1, 2,
		1, 3, 2,

		0, 4, 5,
		0, 5, 1,
		
		1, 5, 3,
		3, 5, 7,

		3, 7, 2,
		2, 7, 6,

		0, 6, 4, 
		0, 2, 6,

		4, 6, 5,
		6, 7, 5,
		])
}
//180 bytes no index
//76 bytes index