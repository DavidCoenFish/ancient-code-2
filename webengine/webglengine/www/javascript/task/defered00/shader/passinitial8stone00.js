/*
	attibute 
		a_position: vec3
		a_normal: vec3
	uniform 
		u_colour0: vec4 [rgb, gloss]
		u_colour1: vec4 [rgb, gloss]
		u_noiseScale: vec3
		u_matrixModel: mat4
		u_matrixMV: mat4
		u_matrixMVP: mat4
want point in world space to get noise texture sample
want normal in view space, or in projection space. thinking view, do lighting in view space 

*/
DSC.Framework.Asset.Shader.Pool.PassInitial8Stone00 = 
{
	"m_vertexShaderSource" : "\
attribute vec3 a_position;\
attribute vec3 a_normal;\
uniform mat4 u_matrixMVP;\
uniform mat4 u_matrixModel;\
uniform mat4 u_matrixMV;\
varying vec3 v_normal;\
varying vec3 v_position;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position, 1.0);\
	v_position = (u_matrixModel * vec4(a_position, 1.0)).xyz;\
	v_normal = (u_matrixMV * vec4(a_normal, 0.0)).xyz;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
uniform vec4 u_colour0;\
uniform vec4 u_colour1;\
uniform vec3 u_noiseScale;\
varying vec3 v_normal;\
varying vec3 v_position;\
vec2 encodeHemi(vec3 normal)\
{\
    float p = sqrt((normal.z * 8.0) + 8.0) * 0.71;\
    return vec2(normal.xy / p + 0.5);\
}\
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
vec4 TextureSample3d(sampler2D sampler, vec3 sampleUVW)\
{\
	float u = fract(sampleUVW.x) / 8.0;\
	float v = fract(sampleUVW.y) / 8.0;\
	float w = fract(sampleUVW.z) * 64.0;\
	float w_remainder = fract(w);\
	float w_index = floor(w);\
	float u_x_low = floor(fract(w_index / 8.0) * 8.0);\
	float u_x_high = floor(fract((w_index + 1.0) / 8.0) * 8.0);\
	float u_y_low = floor(w_index / 8.0);\
	float u_y_high = floor((w_index + 1.0) / 8.0);\
	vec4 sampleColourLow = texture2D(u_sampler0, vec2(u + (u_x_low / 8.0), v + (u_y_low / 8.0)));\
	vec4 sampleColourHigh = texture2D(u_sampler0, vec2(u + (u_x_high / 8.0), v + (u_y_high / 8.0)));\
	vec4 sampleColour = mix(sampleColourLow, sampleColourHigh, w_remainder);\
	return sampleColour;\
}\
vec4 FractionalBrownianMotion(vec3 sampleUVW)\
{\
	vec4 result = vec4(0.0, 0.0, 0.0, 0.0);\
    float weightSum = 0.5;\
	vec3 delta = vec3(0.0, 0.0, 0.0);\
    for (int index = 0; index < 8; index++)\
    {\
		vec4 sampleColour = TextureSample3d(u_sampler0, sampleUVW);\
		delta += (sampleColour.xyz - 0.5) * 2.0;\
        float weight =  weightSum / (1.0 + dot(delta, delta));\
		result += sampleColour * weight;\
		weightSum *= 0.5;\
		sampleUVW *= 2.0;\
	}\
	return result;\
}\
void main() {\
	vec4 noiseSample = FractionalBrownianMotion(v_position * u_noiseScale);\
	vec3 normal = normalize(v_normal + ((noiseSample.xyz - 0.5) * 2.0));\
	vec4 colour = mix(u_colour0, u_colour1, noiseSample.w);\
	vec2 packedNormal = encodeHemi(normal);\
	vec2 packedRgb = encodeColour(colour);\
	gl_FragColor = vec4(packedNormal, packedRgb);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_normal" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_matrixModel" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_matrixMV" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_colour0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_colour1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_noiseScale" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		}
}

/*
	"m_fragmentShaderSource" : "\
precision mediump float;\
void main() {\
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\
}",

*/