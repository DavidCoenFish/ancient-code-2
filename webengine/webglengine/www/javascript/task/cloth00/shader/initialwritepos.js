/*
	attibute 
		a_position: vec3
		a_uv: vec2
	uniform 
*/
DSC.Framework.Asset.Shader.Pool.ClothInitialWritePos = 
{
	"m_vertexShaderSource" : "\
attribute vec3 a_position;\
attribute vec2 a_uv;\
varying vec3 v_position;\
void main() {\
	v_position = a_position;\
	gl_Position = vec4((a_uv - 0.5) * 2.0, 0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
varying vec3 v_position;\
void main()\
{\
	gl_FragColor = vec4((v_position * 0.5) + 0.5, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {}
}
