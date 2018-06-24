// bounds should be (-1.0 ... 1.0)
/*
	  6 -- 7
	 /	  /
	4 -- 5

	  2 -- 3
	 /	  /
	0 -- 1
*/
DSC.Framework.Asset.Model.Pool.BoundsAPos3 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.LINES,
	"m_elementCount" : 24,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.FactoryRaw(
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
	},
	"m_elementIndex" : new DSC.Common.t_u8Array([
		0, 1,
		0, 2,
		2, 3,
		1, 3,

		0, 4,
		1, 5,
		2, 6, 
		3, 7, 

		4, 5,
		4, 6,
		6, 7,
		5, 7,
		])
}

//72 bytes - no index
//48 bytes - for 8 verts and 24 index 