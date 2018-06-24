// bounds should be (-1.0 ... 1.0)
/*
	  0 -- 1
	 /	  /
	2 -- 3

	+z
  +y/
  |/
  *--+y
Pos3 not Pos2 to allow easier shader reuse
*/
DSC.Framework.Asset.Model.Pool.PlaneAPos3ANormal3 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 6,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array([
				1, 0, -1,
				1, 0, 1,
				-1, 0, -1,
				-1, 0, 1,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				false
			),
		"a_normal" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array([
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				false
			),
	},
	"m_elementIndex" : new DSC.Common.t_u8Array([
		0, 2, 1,
		1, 2, 3,
		])
}
