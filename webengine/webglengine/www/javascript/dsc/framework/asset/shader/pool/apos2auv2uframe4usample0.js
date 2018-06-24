/*
	basic shader with no transform, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2
	uniform 
		u_frame: vec4 [originx, originy, sizex, sizey]
		u_sampler0: sampler2D
*/
DSC.Framework.Asset.Shader.Pool.APos2AUv2UFrame4USample0 = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
attribute vec2 a_uv;\
uniform vec4 u_frame;\
varying vec2 v_uv;\
void main() {\
	gl_Position = vec4(\
		u_frame.x + (a_position.x * u_frame.z),\
		u_frame.y + (a_position.y * u_frame.w),\
		0.0, 1.0);\
	v_uv = a_uv;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
varying vec2 v_uv;\
void main() {\
	gl_FragColor = texture2D(u_sampler0, v_uv);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1
		}, 
	"m_mapUniformsNames" : {
		"u_frame" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TFrame),
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		}
}


