/*
	procedural torus
	input
		ring radius
		ring divisions
		tube radius
		tube divisions
*/



DSC.Framework.Asset.Model.Pool.ProcTorus = function(
	in_ringRadius,
	in_ringDivisions,
	in_tubeRadius,
	in_tubeDivisions,
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 0,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			2,
			new DSC.Common.t_s8Array([
				//pannel
				-128, -128,
				-128, 127,
				127, -128,
				127, 127, 
				127, -128,
				-128, 127,
				
				//left arrow
				-85, 0,
				65, -87,
				65, 87,

				//right arrow
				85, 0,
				-65, 87,
				-65, -87,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : undefined
}
