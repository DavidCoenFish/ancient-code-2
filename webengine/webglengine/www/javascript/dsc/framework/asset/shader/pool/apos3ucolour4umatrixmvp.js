/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
	uniform 
		u_colour: vec4
		u_matrixMVP: mat4
*/
DSC.Framework.Asset.Shader.Pool.APos3UColour4UMatrixMVP = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
attribute vec3 a_position;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colour;\
void main() {\
	gl_FragColor = u_colour;\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		}, 
	"m_mapUniformsNames" : {
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4)
		}
}



