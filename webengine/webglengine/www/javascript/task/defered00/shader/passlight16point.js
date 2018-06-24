/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2
	uniform 
		u_sampler0: sampler2D [initial render pass texture colour]
		u_sampler1: sampler2D [initial render pass depth] //x component is zero near, 1.0 far
		u_lightColour: vec3 [rgb]
		u_lightPos: vec3 [xyz]
		u_falloff: vec3 [radius, gamma, usePerspective?]
		u_projection: vec4 [near, far, left, top]
*/
DSC.Framework.Asset.Shader.Pool.PassLight16Point = 
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
uniform vec3 u_lightColour;\
uniform vec3 u_lightPos;\
uniform vec3 u_falloff;\
varying vec4 u_nearfar;\
vec3 decodeHemi(vec2 enc)\
{\
    vec2 fenc = (enc * 2.84) - 1.42;\
    float f = dot(fenc,fenc);\
    float g = sqrt(1.0 - (f / 4.0));\
    vec3 normal;\
    normal.xy = fenc * g;\
    normal.z = 1.0 - (f / 2.0);\
    return normal;\
}\
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
	vec3 normal = decodeHemi(sampleColour.xy);\
	vec4 colour = decodeColour(sampleColour.z, sampleColour.w);\
	float sampleDepth = texture2D(u_sampler1, v_uv).x;\
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_sampler1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_lightColour" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
		"u_lightPos" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_falloff" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_projection" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		}
}
