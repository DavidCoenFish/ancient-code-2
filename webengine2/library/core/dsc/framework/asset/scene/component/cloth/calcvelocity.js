/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2
	uniform 
		u_sampler0: sampler2D //old vel
		u_sampler1: sampler2D //force
		u_timeDelta : float
		u_matrixFrameDelta: mat4 //the change of model space from last frame to this frame
*/
DSC.Framework.Asset.Shader.Pool.ClothCalcVelocity = 
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
uniform float u_timeDelta;\
uniform mat4 u_matrixFrameDelta;\
varying vec2 v_uv;\
vec3 GetVel(vec2 in_uv)\
{\
	return (texture2D(u_sampler0, in_uv).xyz - 0.5) * 20.0;\
}\
vec3 GetForce(vec2 in_uv)\
{\
	return (texture2D(u_sampler1, in_uv).xyz - 0.5) * 64.0;\
}\
void main()\
{\
	vec3 vel = GetVel(v_uv);\
	vel = (vec4(vel, 1.0) * u_matrixFrameDelta).xyz;\
	vec3 force = GetForce(v_uv);\
	vel += (force * u_timeDelta);\
	gl_FragColor = vec4((vel / 20.0) + 0.5, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_sampler1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_timeDelta" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TFloat),
		"u_matrixFrameDelta" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		}
}
