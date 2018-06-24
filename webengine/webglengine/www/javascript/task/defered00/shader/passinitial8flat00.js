/*
	basic shader with 3d transform (MVP)
	attibute 
		a_position: vec3
		a_normal: vec3
	uniform 
		u_scale: vec3
		u_colour: vec4
		u_matrixMVP: mat4
		u_matrixMV: mat4
*/
DSC.Framework.Asset.Shader.Pool.PassInitial8Flat00 = 
{
	"m_vertexShaderSource" : "\
uniform mat4 u_matrixMVP;\
uniform mat4 u_matrixMV;\
uniform vec3 u_scale;\
attribute vec3 a_position;\
attribute vec3 a_normal;\
varying vec3 v_normal;\
void main() {\
	gl_Position = u_matrixMVP * vec4(a_position * u_scale, 1.0);\
	v_normal = (u_matrixMV * vec4(a_normal, 0.0)).xyz;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_colour;\
varying vec3 v_normal;\
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
	float adjust = 256.0 / 255.0;\
	float x = ((encodeChannel(colour.r, 15.0) / 16.0) + (encodeChannel(colour.g, 15.0) / 256.0)) * adjust;\
	float y = ((encodeChannel(colour.b, 15.0) / 16.0) + (encodeChannel(colour.a, 15.0) / 256.0)) * adjust;\
    return vec2(x, y);\
}\
void main() {\
	vec2 packedNormal = encodeHemi(v_normal);\
	vec2 packedRgb = encodeColour(u_colour);\
	gl_FragColor = vec4(packedNormal, packedRgb);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_normal" : -1, 
		}, 
	"m_mapUniformsNames" : {
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_matrixMV" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		"u_scale" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4)
		}
}



