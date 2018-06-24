/*
	basic shader with no transform, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
	uniform 
		u_colourOrigin: [rgba] bottom left
		u_colourDeltaWidth: [rgba delta] width
		u_colourDeltaHeight: [rgba delta] height
*/
DSC.Framework.Pool.Shader.APos2UColour4UColour4UColour4 = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
varying vec2 v_uv;\
void main() {\
	v_uv = vec2((a_position * 0.5) + vec2(0.5, 0.5));\
	gl_Position = vec4(a_position, 1.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colourOrigin;\
uniform vec4 u_colourDeltaWidth;\
uniform vec4 u_colourDeltaHeight;\
varying vec2 v_uv;\
void main() {\
	gl_FragColor = u_colourOrigin + (u_colourDeltaWidth * v_uv.x) + (u_colourDeltaHeight * v_uv.y);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		}, 
	"m_mapUniformsNames" : {
		"u_colourOrigin" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_colourDeltaWidth" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_colourDeltaHeight" : DSC.Framework.Asset.Shader.Uniform.Factory(DSC.Framework.Context.Uniform.s_type.TColour4),
		}
}


