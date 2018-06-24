/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
		a_colour: vec4
	uniform 
		u_matrixMVP: mat4
*/
DSC.Framework.Asset.Shader.Pool.APos3AColour4UMatrixMVP = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
attribute vec3 a_position;\
attribute vec4 a_colour;\
varying vec4 v_color;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position, 1.0);\
	v_color = a_colour;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
varying vec4 v_color;\
void main() {\
	gl_FragColor = v_color;\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_colour" : -1
		}, 
	"m_mapUniformsNames" : {
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4)
		}
}



