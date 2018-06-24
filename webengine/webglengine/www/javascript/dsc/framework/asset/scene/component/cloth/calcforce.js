/*
	attibute 
		a_uvWrite: vec2
		a_neigbour0: vec4
		a_neigbour1: vec4
	uniform 
		u_sampler0: sampler2D //prev frame pos
		u_sampler1: sampler2D //prev frame vel
		u_clothSize :  
		u_clothParam : //springk, dampen, vertlet mass
		u_gravity: vec3 //in model space
		u_matrixFrameDelta: mat4 //the change of model space from last frame to this frame

f = ma
f = -kd
*/
DSC.Framework.Asset.Shader.Pool.ClothCalcForce = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_uvWrite;\
attribute vec4 a_neigbour0;\
attribute vec4 a_neigbour1;\
varying vec2 v_uv;\
varying vec4 v_neigbour0;\
varying vec4 v_neigbour1;\
void main() {\
	v_uv = (a_uvWrite * 0.5) + 0.5;\
	v_neigbour0 = a_neigbour0;\
	v_neigbour1 = a_neigbour1;\
	gl_Position = vec4(a_uvWrite, 0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
uniform sampler2D u_sampler1;\
uniform vec4 u_clothSize;\
uniform vec3 u_clothParam;\
uniform vec3 u_gravity;\
uniform mat4 u_matrixFrameDelta;\
varying vec3 v_position;\
varying vec2 v_uv;\
varying vec4 v_neigbour0;\
varying vec4 v_neigbour1;\
vec3 GetPos(vec2 in_uv)\
{\
	return (texture2D(u_sampler0, in_uv).xyz - 0.5) * 2.0;\
}\
vec3 GetVel(vec2 in_uv)\
{\
	return (texture2D(u_sampler1, in_uv).xyz - 0.5) * 20.0;\
}\
vec3 SpringForce(float in_value, float in_distance, vec2 in_uv, vec3 in_pos, vec3 in_vel)\
{\
	if (in_value < 0.5)\
		return vec3(0.0, 0.0, 0.0);\
	vec3 offset = GetPos(in_uv) - in_pos;\
	float dist = length(offset);\
	vec3 normal = offset / dist;\
	float fscalar = (u_clothParam.x * (in_distance - dist));\
	vec3 relVel = GetVel(in_uv) - in_vel;\
	float dampen = dot(normal, relVel) * u_clothParam.y;\
	return normal * (fscalar - dampen);\
}\
void main()\
{\
	vec3 pos = GetPos(v_uv);\
	vec3 vel = GetVel(v_uv);\
	vec3 springForce = vec3(0.0, 0.0, 0.0);\
	float du = 1.0 / u_clothSize.x;\
	float dv = 1.0 / u_clothSize.y;\
	float d0 = 1.0 / u_clothSize.x;\
	float d1 = 1.4142 / u_clothSize.x;\
	springForce += SpringForce(v_neigbour0.x, d1, v_uv + vec2(-du, -dv), pos, vel);\
	springForce += SpringForce(v_neigbour0.y, d0, v_uv + vec2(0.0, -dv), pos, vel);\
	vec3 force = u_gravity * u_clothParam.z;\
	force += (vec4(springForce, 0.0) * u_matrixFrameDelta).xyz;\
	gl_FragColor = vec4((force / 64.0) + 0.5, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		a_uvWrite : -1, 
		a_neigbour0 : -1, 
		a_neigbour1 : -1 
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_sampler1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_clothSize" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		"u_clothParam" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3), ////springk, dampen, vertlet mass
		"u_gravity" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_matrixFrameDelta" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		}
}


/*
todo: ran out of instructions on laptop
	springForce += SpringForce(v_neigbour0.z, d1, v_uv + vec2(du, -dv), pos, vel);\
	springForce += SpringForce(v_neigbour0.w, d0, v_uv + vec2(-du, 0.0), pos, vel);\
	springForce += SpringForce(v_neigbour1.x, d0, v_uv + vec2(du, 0.0), pos, vel);\
	springForce += SpringForce(v_neigbour1.y, d1, v_uv + vec2(-du, dv), pos, vel);\
	springForce += SpringForce(v_neigbour1.z, d0, v_uv + vec2(0.0, dv), pos, vel);\
	springForce += SpringForce(v_neigbour1.w, d1, v_uv + vec2(du, dv), pos, vel);\

todo: add friction force from velocity along normal of 
*/