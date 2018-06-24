/*
	basic shader transformed relative to a frame, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
	uniform 
		u_frame: vec4 [originx, originy, sizex, sizey]
		u_colour: vec4 colour
*/
DSC.Framework.Asset.Shader.Pool.APos2UFrame4UColour4 = 
{
	"m_vertexShaderSource" : "\
precision mediump float;\
attribute vec2 a_position;\
uniform vec4 u_frame;\
void main() {\
	gl_Position = vec4(\
		u_frame.x + (a_position.x * u_frame.z),\
		u_frame.y + (a_position.y * u_frame.w),\
		0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colour;\
void main() {\
	gl_FragColor = u_colour;\
}",
	"m_mapVertexAttributeNames" : {"a_position" : -1}, 
	"m_mapUniformsNames" : {
		"u_frame" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TFrame),
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4)
	}
}


//	gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\
//	gl_FragColor = u_colour;\


