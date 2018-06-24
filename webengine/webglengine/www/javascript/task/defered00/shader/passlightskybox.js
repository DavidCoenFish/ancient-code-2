/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2 //or use frag coords?
	uniform 
		u_sampler0: sampler2D [initial render pass colour]
		u_colourSkyTop: vec3 
		u_colourSkyEdge: vec3 
		u_colourGroundEdge: vec3 
		u_colourGroundBottom: vec3 
		u_colourSun: vec3 
		u_colourFog: vec3 
		u_sunLightDirection: vec3 
		u_upDirection: vec3 
		u_projection: vec4 
*/
DSC.Framework.Asset.Shader.Pool.PassLightSkybox = 
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
uniform vec3 u_colourSkyTop;\
uniform vec3 u_colourSkyEdge;\
uniform vec3 u_colourGroundEdge;\
uniform vec3 u_colourGroundBottom;\
uniform vec3 u_colourSun;\
uniform vec3 u_colourFog;\
uniform vec3 u_sunLightDirection;\
uniform vec3 u_upDirection;\
uniform vec4 u_projection;\
varying vec2 v_uv;\
highp vec3 decodeViewSpace(float u, float v, float near, float far, float right, float top)\
{\
	float scale = far / near;\
	return vec3(((u * 2.0) - 1.0) * right * scale, ((v * 2.0) - 1.0) * top * scale, -far);\
}\
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
	vec4 sampleTexel = texture2D(u_sampler0, v_uv);\
	vec4 sampleColour = decodeColour(sampleTexel.z, sampleTexel.w);\
	if (sampleColour.a <= 0.0)\
	{\
		vec3 cameraAt = decodeViewSpace(v_uv.x, v_uv.y, u_projection.x, u_projection.y, u_projection.z, u_projection.w);\
		vec3 cameraRay = normalize(cameraAt);\
		float dotUp = dot(cameraRay, u_upDirection);\
		float backgroundAmount = 1.0 - abs(dotUp);\
		backgroundAmount = ((0.8 * backgroundAmount) + 0.2) * backgroundAmount;\
		backgroundAmount = 1.0 - backgroundAmount;\
		vec3 skyColour = mix(u_colourSkyEdge, u_colourSkyTop, backgroundAmount);\
		vec3 groundColour = mix(u_colourGroundEdge, u_colourGroundBottom, backgroundAmount);\
		vec3 domeColour = mix(groundColour, skyColour, float(0.0 < dotUp));\
		float fogAmount = 1.0 - abs(dotUp);\
		fogAmount *= fogAmount;\
		fogAmount *= fogAmount;\
		fogAmount *= fogAmount;\
		fogAmount *= fogAmount;\
		vec3 fogColour = mix(domeColour, u_colourFog, fogAmount);\
		float dotSun = max(0.0, dot(cameraRay, u_sunLightDirection));\
		float sunAmount = min(1.0, max(0.0, dotSun - 0.5) / 0.5);\
		sunAmount *= sunAmount;\
		sunAmount *= sunAmount;\
		sunAmount *= sunAmount;\
		sunAmount *= sunAmount;\
		sunAmount *= sunAmount;\
		vec3 sunColour = mix(fogColour, u_colourSun * 1.5, sunAmount);\
		gl_FragColor = vec4(sunColour, 0.0);\
	}\
	else\
	{\
		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\
	}\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
 		"u_colourSkyTop" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_colourSkyEdge" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_colourGroundEdge" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_colourGroundBottom" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_colourSun" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_colourFog" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour3),
 		"u_sunLightDirection" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
 		"u_upDirection" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
 		"u_projection" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		}
}
/*
		vec3 cameraRay = cameraAt / (abs(cameraAt.z) + abs(cameraAt.x) + abs(cameraAt.y));\
		vec3 cameraRay = normalize(cameraAt);\

*/