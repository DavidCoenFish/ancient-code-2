/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
		a_uv: vec2
	uniform 
		u_matrixMVP: mat4
		u_sampler0: sampler2D
*/
DSC.Framework.Asset.Shader.Pool.APos3AUv2USample0UMatrixMVP = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
attribute vec3 a_position;\
attribute vec2 a_uv;\
varying vec2 v_uv;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position, 1.0);\
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
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		}
}



