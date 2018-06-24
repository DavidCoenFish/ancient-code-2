/*
	basic shader transformed relative to a frame, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
	uniform 
		u_frame: vec4 [originx, originy, sizex, sizey]
		u_clamp: vec4 [originx, originy, sizex, sizey]
		u_colour: vec4 colour
*/
DSC.Framework.Pool['Shader']['APos2UFrame4UClamp4UColour4'] =
{
	"m_vertexShaderSource" : "\
precision mediump float;\
attribute vec2 a_position;\
uniform vec4 u_frame;\
varying vec2 v_coord;\
void main() {\
	v_coord.x = u_frame.x + (a_position.x * u_frame.z);\
	v_coord.y = u_frame.y + (a_position.y * u_frame.w);\
	gl_Position = vec4(\
		v_coord.x,\
		v_coord.y,\
		0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colour;\
uniform vec4 u_clamp;\
varying vec2 v_coord;\
void main() {\
	if ((v_coord.x < u_clamp.x) ||\
		(v_coord.y < u_clamp.y) ||\
		(u_clamp.z < v_coord.x) ||\
		(u_clamp.w < v_coord.y))\
	{\
		discard;\
	}\
	gl_FragColor = u_colour;\
	gl_FragColor = vec4(v_coord.x, v_coord.y, 1.0, 1.0);\
}",
	"m_mapVertexAttributeNames" : {"a_position" : -1}, 
	"m_mapUniformsNames" : {
		"u_frame" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TFrame),
		"u_clamp" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TFrame),
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TColour4)
	}
}


//	gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\
//	gl_FragColor = u_colour;\


