/*
	attibute 
		a_position: vec2 pos (viewport range is [-1.0 ... 1.0]) with half pixel adjust?
	uniform 
		u_sampler0: sampler2D [initial render pass depth] //x component is zero near, 1.0 far
		u_lightPos: vec3 [xyz] //in view space?
		u_falloff: vec3 [radius, gamma, usePerspective?]
		u_projection: vec4 [near, far, right, top]
todo: 
	increace point size as away from center shadow map
	lookup hemi ecode for more than 90 deg range
*/
DSC.Framework.Asset.Shader.Pool.Light8PointShadow = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
uniform sampler2D u_sampler0;\
uniform vec4 u_projection;\
uniform vec3 u_lightPos;\
float decodeDepth(float depth, float near, float far)\
{\
	float a = -(far + near) / (far - near);\
	float b = -(2.0 * far * near) / (far - near);\
	float z = b / (depth + a);\
	return z;\
}\
highp vec3 decodeViewSpace(float z, float u, float v, float near, float far, float right, float top)\
{\
	float scale = z / near;\
	return vec3(((u * 2.0) - 1.0) * right * scale, ((v * 2.0) - 1.0) * top * scale, -z);\
}\
vec2 encodeHemi(vec3 normal)\
{\
    float p = sqrt((normal.z * 8.0) + 8.0) * 0.71;\
    return vec2(normal.xy / p + 0.5);\
}\
void main() {\
	vec2 uv = (a_position + 1.0) * 0.5;\
	float sampleDepth = texture2D(u_sampler1, uv).x;\
	float z = decodeDepth((sampleDepth * 2.0) - 1.0, u_projection.x, u_projection.y);\
	vec3 viewSpaceCoord = decodeViewSpace(z, uv.x, uv.y, u_projection.x, u_projection.y, u_projection.z, u_projection.w);\
	vec3 fromLight = u_lightPos - viewSpaceCoord;\
	vec3 range = length(fromLight);\
	vec3 normal = fromLight / range;\
	vec2 pos = encodeHemi(normal);\
	float z = min(0.0, max(1.0, range / u_falloff.x));\
	gl_Position = vec4(pos, z, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision medp float;\
void main()\
{\
	float z = gl_FragCoord.z;\
	gl_FragColor = vec4(z, z, z, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_lightPos" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_falloff" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_projection" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		}
}
