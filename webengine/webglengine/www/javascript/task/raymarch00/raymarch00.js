/*
Ray March 00
test ray march with camera and plane, (plus whatever)

	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1]) screen quad
	uniform 
		u_cameraMat: mat4 [the world space camera transform]
		u_projection: vec4 [width, height, radius, far]

cylinder: vec2(radius, +- height over origin)
*/
DSC.Framework.Asset.Shader.Pool.RayMarch00 = 
{
	m_vertexShaderSource : "\
attribute vec2 a_position;\
void main() {\
	gl_Position = vec4(a_position, 0.0, 1.0);\
}",
	m_fragmentShaderSource : "\
precision mediump float;\
uniform mat4 u_cameraMat;\
uniform vec4 u_projection;\
float GetGridBump(vec3 testpoint)\
{\
	vec3 bump = min(vec3(0.1, 0.1, 0.1), abs(mod(testpoint - 0.5, 1.0) - 0.5));\
	float value = min(bump.x, max(bump.y, bump.z));\
	value = min(value, min(bump.y, max(bump.x, bump.z)));\
	value = min(value, min(bump.z, max(bump.x, bump.y)));\
	return value;\
}\
float GetDistancePlaneY(vec3 testpoint, float depth)\
{\
	return testpoint.y + depth;\
}\
float GetDistanceCylinderY(vec3 testpoint, vec2 cylinder)\
{\
	vec2 d = abs(vec2(length(testpoint.xz), testpoint.y)) - cylinder;\
	return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\
}\
float GetDistanceBox(vec3 testpoint, vec3 box)\
{\
	return length(max(abs(testpoint) - box, 0.0));\
}\
float GetDistanceBoxSigned(vec3 testpoint, vec3 box)\
{\
	vec3 d = abs(testpoint) - box;\
	return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));\
}\
float GetDistClostestSurfacePlatform(vec3 testpoint)\
{\
	vec3 localTestPoint = vec3(abs(testpoint.x), testpoint.y, abs(testpoint.z));\
	float distance = GetDistanceBox(localTestPoint - vec3(0.0, -0.5, 0.0), vec3(3.0, 1.5, 3.0));\
	distance = min(distance, max(GetDistanceBox(localTestPoint - vec3(4.5, -0.5, 0.0), vec3(1.5, 1.5, 3.0)), -GetDistanceBoxSigned(localTestPoint - vec3(6.0, 1.0, 0.0), vec3(1.0, 1.0, 2.0))));\
	distance = min(distance, max(GetDistanceBox(localTestPoint - vec3(0.0, -0.5, 4.5), vec3(3.0, 1.5, 1.5)), -GetDistanceBoxSigned(localTestPoint - vec3(0.0, 1.0, 6.0), vec3(2.0, 1.0, 1.0))));\
	distance = min(distance, max(GetDistanceBox(localTestPoint - vec3(4.5, 0.0, 4.5), vec3(1.5, 2.0, 1.5)), -GetDistanceBoxSigned(localTestPoint - vec3(5.5, 0.0, 5.5), vec3(1.5, 1.0, 1.5))));\
	distance = min(distance, GetDistanceBox(localTestPoint - vec3(6.5, -1.5, 0.0), vec3(0.5, 0.5, 3.0)));\
	distance = min(distance, GetDistanceBox(localTestPoint - vec3(0.0, -1.5, 6.5), vec3(3.0, 0.5, 0.5)));\
	distance = min(distance, GetDistanceCylinderY(localTestPoint - vec3(5.0, 0.0, 5.0), vec2(1.0, 1.0)));\
	distance = min(distance, GetDistancePlaneY(localTestPoint, 2.0));\
	return distance;\
}\
float GetDistanceClostestSurface(vec3 testpoint)\
{\
	float distance = GetDistClostestSurfacePlatform(testpoint);\
	distance = min(distance, GetDistancePlaneY(testpoint, 2.0));\
	return distance;\
}\
vec3 GetNormalAtPos(vec3 testpoint)\
{\
	vec3 eps = vec3(0.02, 0.0, 0.0);\
	return normalize( vec3(\
		GetDistanceClostestSurface(testpoint + eps.xyy) - GetDistanceClostestSurface(testpoint - eps.xyy),\
		GetDistanceClostestSurface(testpoint + eps.yxy) - GetDistanceClostestSurface(testpoint - eps.yxy),\
		GetDistanceClostestSurface(testpoint + eps.yyx) - GetDistanceClostestSurface(testpoint - eps.yyx) ) );\
}\
float SoftShadow(vec3 testPoint, vec3 direction, float maxt, float k)\
{\
	float res = 1.0;\
	float t=0.01;\
	for (int index = 0; index < 32; ++index)\
	{\
		float h = GetDistanceClostestSurface(testPoint + (direction * t));\
		if (h<0.001)\
			return 0.0;\
		res = min(res, k*h/t);\
		t+=h;\
		if (maxt < t)\
			break;\
	}\
	return res;\
}\
void AddLighting(vec3 eye, vec3 ray, vec3 testPoint)\
{\
	vec3 normal = GetNormalAtPos(testPoint);\
	vec3 lightOffset = vec3(10.0, 30.0, 20.0) - testPoint;\
	float lightDistance = length(lightOffset);\
	vec3 lightNormal = lightOffset / lightDistance;\
	float ao = SoftShadow(testPoint, lightNormal, lightDistance, 2.0);\
	gl_FragColor.xyz = vec3(((normal.x * 0.5) + 0.5) * ao, ((normal.y * 0.5) + 0.5) * ao, ((normal.z * 0.5) + 0.5) * ao);\
}\
void AddFogFragColor(vec3 eye, vec3 ray, float rayDepth)\
{\
	gl_FragColor.xyz = mix(gl_FragColor.xyz, vec3(0.5, 0.5, 0.5), (rayDepth / u_projection[3]));\
}\
void Raymarch(vec3 eye, vec3 ray)\
{\
	float totalDepth = 0.0;\
	vec3 testPoint = eye;\
	for (int index = 0; index < 160; ++index)\
	{\
		float stepDepth = GetDistanceClostestSurface(testPoint);\
		if (stepDepth < 0.001)\
		{\
			AddLighting(eye, ray, testPoint);\
			AddFogFragColor(eye, ray, totalDepth);\
			return;\
		}\
		totalDepth += stepDepth;\
		if (u_projection[3] < totalDepth)\
			break;\
		testPoint = eye + (ray * totalDepth);\
	}\
	gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);\
	AddFogFragColor(eye, ray, u_projection[3]);\
	return;\
}\
void main()\
{\
	float projectX = gl_FragCoord.x - (u_projection[0] * 0.5);\
	float projectY = gl_FragCoord.y - (u_projection[1] * 0.5);\
	float projectZ = sqrt((u_projection[2] * u_projection[2]) - (projectX * projectX) - (projectY * projectY));\
	vec3 ray = vec3(projectX, projectY, -projectZ) / u_projection[2];\
	ray = (u_cameraMat * vec4(ray.xyz, 0.0)).xyz;\
	vec3 eye = (u_cameraMat * vec4(0.0, 0.0, 0.0, 1.0)).xyz;\
	Raymarch(eye, ray);\
	return;\
}",
	m_mapVertexAttributeNames : {
		"a_position" : -1
		}, 
	m_mapUniformsNames : {
		u_cameraMat : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TMatrix4),
		u_projection : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		}
}
