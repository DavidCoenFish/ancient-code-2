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
DSC.Framework.Asset.Shader.Pool.PassInitial16Stone00 = 
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
	return clamp(floor((colour * range)), 0.0, range);\
}\
vec2 encodeColour(vec4 colour)\
{\
	float adjust = 65536.0 / 65535.0;\
	float x = ((encodeChannel(colour.r, 256.0) / 256.0) + (encodeChannel(colour.g, 255.0) / 65536.0)) * adjust;\
	float y = ((encodeChannel(colour.b, 256.0) / 256.0) + (encodeChannel(colour.a, 255.0) / 65536.0)) * adjust;\
    return vec2(x, y);\
}\
void main() {\
	vec2 packedNormal = encodeHemi(v_normal);\
	vec2 packedRgb = encodeColour(u_colour0);\
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
		}
}
