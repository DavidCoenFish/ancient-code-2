/*
	attibute 
		a_position: vec3 pos (viewport range is [-1 ... 1])
		a_uvWrite: vec2
		a_weight: float

	uniform 
		u_sampler0: sampler2D //old pos
		u_sampler1: sampler2D //vel
		u_timeDelta : float
*/
DSC.Framework.Asset.Shader.Pool.ClothCalcPosition = 
{
	"m_vertexShaderSource" : "\
attribute vec3 a_position;\
attribute vec2 a_uvWrite;\
attribute float a_weight;\
varying vec3 v_position;\
varying vec2 v_uv;\
varying float v_weight;\
void main() {\
	v_position = a_position;\
	v_uv = a_uvWrite;\
	v_weight = a_weight;\
	gl_Position = vec4(a_uvWrite, 0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform sampler2D u_sampler0;\
uniform sampler2D u_sampler1;\
uniform float u_timeDelta;\
varying vec3 v_position;\
varying vec2 v_uv;\
varying float v_weight;\
vec3 GetPos(vec2 in_uv)\
{\
	return (texture2D(u_sampler0, in_uv).xyz - 0.5) * 2.0;\
}\
vec3 GetVel(vec2 in_uv)\
{\
	return (texture2D(u_sampler1, in_uv).xyz - 0.5) * 20.0;\
}\
void main()\
{\
	vec3 pos = GetPos(v_uv);\
	vec3 vel = GetVel(v_uv);\
	pos += (vel * u_timeDelta);\
	pos = mix(pos, v_position, v_weight);\
	gl_FragColor = vec4((pos / 2.0) + 0.5, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uvWrite" : -1,
		"a_weight" : -1
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_sampler1" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_timeDelta" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TFloat),
		}
}

