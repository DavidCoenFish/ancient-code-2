/*
	basic shader with no transform, 
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2
	uniform 
		u_colourOrigin: [rgba] bottom left
		u_colourDeltaWidth: [rgba delta] width
		u_colourDeltaHeight: [rgba delta] height
*/
DSC.Framework.Asset.Shader.Pool.PassInitial16Test00 = 
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
	return clamp(floor((colour * (range + 1.0))), 0.0, range);\
}\
vec2 encodeColour(vec4 colour)\
{\
	float adjust = 1.0 / 64.0;\
	float x = ((encodeChannel(colour.r, 31.0) / 1.0) + (encodeChannel(colour.g, 31.0) / 32.0)) + adjust;\
	float y = ((encodeChannel(colour.b, 31.0) / 1.0) + (encodeChannel(colour.a, 31.0) / 32.0)) + adjust;\
    return vec2(x, y);\
}\
void main() {\
	 vec4 colour = u_colourOrigin + (u_colourDeltaWidth * v_uv.x) + (u_colourDeltaHeight * v_uv.y);\
	 vec2 enColour = encodeColour(colour);\
	 gl_FragColor = vec4(enColour, enColour);\
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

/*
    return vec2(0.5 + 0.25 + 0.125 + (1.0 / 16.0) + (1.0 / 32.0) + (1.0 / 64.0) + (1.0 / 128.0) + (1.0 / 256.0), 0.5);\

    return vec2((1.0 / 2.0) + (0.0 / 4.0) + (0.0 / 8.0) + (0.0 / 16.0) + (0.0 / 32.0) + (0.0 / 64.0) + (0.0 / 128.0) + (0.0 / 256.0) +\
	(1.0 / 512.0) + (0.0 / 1024.0) + (0.0 / 2048.0) + (0.0 / 4096.0) + (0.0 / 8192.0) + (0.0 / 16384.0) + (0.0 / 32768.0) + (0.0 / 65536.0), 0.5);\

*/