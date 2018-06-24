/*
	attibute 
		a_uv: vec2 //or use frag coords?
	uniform 
		u_sampler0: sampler2D
		u_clothSize : width, height, 1 / width, 1 / height
		u_matrixMVP: mat4
*/
DSC.Framework.Asset.Shader.Pool.Cloth00 = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_uv;\
uniform sampler2D u_sampler0;\
uniform vec4 u_clothSize;\
varying vec3 v_normal;\
vec3 GetPos(vec2 in_uv)\
{\
	return (texture2D(u_sampler0, in_uv).xyz - 0.5) * 2.0;\
}\
void main() {\
	vec3 pos = GetPos(a_uv);\
	vec3 up = GetPos(a_uv + vec2(0.0, u_clothSize.w)) - GetPos(a_uv - vec2(0.0, u_clothSize.w));\
	vec3 right = GetPos(a_uv + vec2(u_clothSize.z, 0.0)) - GetPos(a_uv - vec2(u_clothSize.z, 0.0));\
	vec3 normal = normalize(cross(up, right));\
	v_normal = (vec4(normal, 0.0) * u_matrixMVP).xyz;\
	gl_Position = vec4(pos, 1.0) * u_matrixMVP;\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
varying vec3 v_normal;\
void main()\
{\
	gl_FragColor = vec4((v_normal * 0.5) + 0.5, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_clothSize" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		"u_matrixMVP" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		}
}
