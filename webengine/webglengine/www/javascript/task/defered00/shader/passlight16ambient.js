/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2 //or use frag coords?
	uniform 
		u_sampler0: sampler2D [initial render pass texture colour]
		u_sampler1: sampler2D [initial render pass depth]
		u_colour0: vec3 [rgb]
*/
DSC.Framework.Asset.Shader.Pool.PassLight16Ambient = 
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
	float red = (floor(colour0 * 1.0)) / 31.0;\
	float green = (floor(fract(colour0 * 1.0) * 32.0)) / 31.0;\
	float blue = (floor(colour1 * 1.0)) / 31.0;\
	float light = (floor(fract(colour1 * 1.0) * 32.0)) / 31.0;\
	return vec4(red, green, blue, light);\
}\
void main()\
{\
	vec4 sampleColour = texture2D(u_sampler0, v_uv);\
	vec4 colour = decodeColour(sampleColour.b, sampleColour.a);\
	float sampleDepth = texture2D(u_sampler1, v_uv).x;\
	float mul = 1.0 - step(sampleDepth, 0.9999999);\
	gl_FragColor = vec4(colour.r * 1.0, colour.g * 1.0, colour.b * 1.0, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_sampler1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_colour0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
		}
}

/*
	float red = (floor(value / 256.0)) / 255.0;\


	vec4 sampleColour = texture2D(u_sampler0, v_uv);\
	vec4 colour = decodeColour(sampleColour);\
	float sampleDepth = texture2D(u_sampler1, v_uv).x;\
	float mul = 1.0 - step(sampleDepth, 0.9999999);\
	gl_FragColor = vec4(colour.rgb * u_colour0, mul);\

	float value = floor((colour0 * 65536.0) + 0.5);\
	float red = (floor(value / 256.0)) / 255;\
	float green = (floor(fract(value / 256.0) * 256.0)) / 255.0;\
	float blue = (floor(colour1 * 256.0)) / 256.0;\
	float light = (floor(fract(colour1 * 256.0) * 256.0)) / 255.0;\
	return vec4(red, green, blue, light);\

*/