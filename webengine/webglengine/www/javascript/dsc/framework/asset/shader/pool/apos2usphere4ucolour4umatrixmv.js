/*
'raytrace' debug sphere
todo: pass in frame to allow client side calculation of frame bounds
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
	uniform 
		u_screen: vec4 [near, far, width, height] //treated as state, thus not in name
		u_sphere: vec4 [posx, posy, posz, radius]
		u_colour: vec4 colour
		u_matrixMV: mat4
*/
DSC.Framework.Asset.Shader.Pool.APos2USphere4UColour4UMatrixMV = 
{
	"m_vertexShaderSource" : "\
attribute vec2 a_position;\
void main() {\
	gl_Position = vec4(a_position, 0.0, 1.0);\
}",
	"m_fragmentShaderSource" : "\
precision mediump float;\
uniform vec4 u_sphere;\
uniform vec4 u_screen;\
uniform vec4 u_colour;\
uniform mat4 u_matrixMV;\
void main()\
{\
	float fragX = (((((gl_FragCoord.x - (0.5 * u_screen[2])) / u_screen[3]) + 0.5) * 2.0) - 1.0);\
	float fragY = (((gl_FragCoord.y / u_screen[3]) * 2.0) - 1.0);\
	vec3 ray = normalize(vec3(fragX * u_screen[0], fragY * u_screen[0], -u_screen[0]));\
	vec3 spherePos = (u_matrixMV * vec4(u_sphere.xyz, 1.0)).xyz;\
	float nearestDist = dot(ray, spherePos);\
	vec3 nearestPos = ray * nearestDist;\
	vec3 offset = nearestPos - spherePos;\
	if ((u_sphere[3] * u_sphere[3]) < dot(offset, offset))\
	{\
		discard;\
	}\
	gl_FragColor = u_colour;\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1
		}, 
	"m_mapUniformsNames" : {
		"u_sphere" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		"u_colour" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TColour4),
		"u_screen" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		"u_matrixMV" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		}
}
