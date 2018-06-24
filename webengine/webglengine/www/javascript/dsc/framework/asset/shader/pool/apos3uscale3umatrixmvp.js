/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
	uniform 
		u_scale: vec3
		u_matrixMVP: mat4
*/
DSC.Framework.Asset.Shader.Pool.APos3UMatrixMVP = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
uniform vec3 u_scale;\
attribute vec3 a_position;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position * u_scale, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
void main() {\
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		}, 
	"m_mapUniformsNames" : {
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_scale" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3)
		}
}



