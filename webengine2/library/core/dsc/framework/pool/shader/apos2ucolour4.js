/*
	basic shader with no transform, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
	uniform 
		u_colour: vec4 colour
*/
DSC.Framework.Pool['Shader']['APos2UColour4'] =
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
void main() {\
	gl_Position = vec4(a_position, 0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colour;\
void main() {\
	gl_FragColor = u_colour;\
}",
	"m_mapVertexAttributeNames" : {"a_position" : -1}, 
	"m_mapUniformsNames" : {
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TColour4)
	}
}


//	gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\
//	gl_FragColor = u_colour;\


