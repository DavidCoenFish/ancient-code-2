/*
	basic shader with no transform, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2
	uniform 
		u_colourOrigin: [rgba] bottom left
		u_colourDeltaWidth: [rgba delta] width
		u_colourDeltaHeight: [rgba delta] height

		15 / 16 = 0.9375
		0.9375 * 255 = 239.0625
		239 / 16
*/
DSC.Framework.Asset.Shader.Pool.PassInitial8Test00 = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
attribute vec2 a_uv;\
varying vec2 v_uv;\
void main() {\
	gl_Position = vec4(a_position, 1.0, 1.0);\
	v_uv = a_uv;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colourOrigin;\
uniform vec4 u_colourDeltaWidth;\
uniform vec4 u_colourDeltaHeight;\
varying vec2 v_uv;\
float encodeChannel(float colour, float range)\
{\
	return clamp(floor(colour * (range + 1.0)), 0.0, range);\
}\
vec2 encodeColour(vec4 colour)\
{\
	float x = ((encodeChannel(colour.r, 15.0) * 16.0) + (encodeChannel(colour.g, 15.0)) + 0.1) / 255.0;\
	float y = ((encodeChannel(colour.b, 15.0) * 16.0) + (encodeChannel(colour.a, 15.0)) + 0.1) / 255.0;\
    return vec2(x, y);\
}\
void main() {\
	 vec4 colour = u_colourOrigin + (u_colourDeltaWidth * v_uv.x) + (u_colourDeltaHeight * v_uv.y);\
	 vec2 enColour = encodeColour(colour);\
	 gl_FragColor = vec4(0.0, 0.0, enColour.x, enColour.y);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_colourOrigin" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_colourDeltaWidth" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_colourDeltaHeight" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		}
}
