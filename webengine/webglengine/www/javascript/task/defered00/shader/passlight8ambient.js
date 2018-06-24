/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2 //or use frag coords?
	uniform 
		u_sampler0: sampler2D [initial render pass texture colour]
		u_colour0: vec3 [rgb]
*/
DSC.Framework.Asset.Shader.Pool.PassLight8Ambient = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
attribute vec2 a_uv;\
varying vec2 v_uv;\
void main() {\
	gl_Position = vec4(a_position, 0.0, 1.0);\
	v_uv = a_uv;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
uniform sampler2D u_sampler1;\
uniform vec3 u_colour0;\
varying vec2 v_uv;\
vec4 decodeColour(float colour0, float colour1)\
{\
	float red = floor((colour0 * 255.0 + 0.5) / 16.0) / 15.0;\
	float green = fract(floor(colour0 * 255.0 + 0.5) / 16.0);\
	float blue = floor((colour1 * 255.0 + 0.5) / 16.0) / 15.0;\
	float light = fract(floor(colour1 * 255.0 + 0.5) / 16.0);\
	return vec4(red, green, blue, light);\
}\
void main()\
{\
	vec4 sampleColour = texture2D(u_sampler0, v_uv);\
	vec4 colour = decodeColour(sampleColour.z, sampleColour.w);\
	gl_FragColor = vec4(u_colour0.rgb * colour.a, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_colour0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
		}
}

/*

	return clamp(floor((colour * 15.0) + 0.5), 0.0, 15.0);\
	float y = (encodeChannel(colour.b) / 16.0) + (encodeChannel(colour.a) / 256.0);\



	float red = (floor(colour0 * 16.0)) / 16.0;\
	float green = (floor(fract(colour0 * 16.0) * 16.0)) / 15.0;\
	float blue = (floor(colour1 * 16.0)) / 16.0;\
	float light = (floor(fract(colour1 * 16.0) * 16.0)) / 15.0;\
	return vec4(red, green, blue, light);\
*/