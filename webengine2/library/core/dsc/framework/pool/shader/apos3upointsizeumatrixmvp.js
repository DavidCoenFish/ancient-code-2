/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
	uniform 
		u_pointSize: vec3 [pointsize, screenPixelHeight?, pad]
		u_matrixMVP: mat4
*/
DSC.Framework.Pool.Shader.APos3UPointSizeUMatrixMVP = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
uniform vec3 u_pointSize;\
attribute vec3 a_position;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position, 1.0);\
	gl_PointSize = u_pointSize[0];\
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
		"u_pointSize" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TVector3), 
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TMatrix4)
		}
}



