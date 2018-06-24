/*
	attibute 
		a_position: vec2 pos (viewport range is [-1 ... 1])
		a_uv: vec2 //or use frag coords?
	uniform 
		u_sampler0: sampler2D
		u_param: vec4 [radius, width, height, scale]
		u_gammaRed: vec3 [low, range, gamma]
		u_gammaGreen: vec3 [low, range, gamma]
		u_gammaBlue: vec3 [low, range, gamma]
*/
DSC.Framework.Asset.Shader.Pool.PassPresent = 
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
uniform vec4 u_param;\
uniform vec3 u_gammaRed;\
uniform vec3 u_gammaGreen;\
uniform vec3 u_gammaBlue;\
varying vec2 v_uv;\
float gammaColour(float value, float low, float range, float gamma)\
{\
	return pow(((value - low) / range), gamma);\
}\
void main()\
{\
	float sourceX = (v_uv.x - 0.5) * u_param[1];\
	float sourceY = (v_uv.y - 0.5) * u_param[2];\
	float length = sqrt((u_param[0] * u_param[0]) + (sourceX * sourceX) + (sourceY * sourceY));\
	float factor = (length / u_param[0]) * u_param[3];\
	float remappedX = ((v_uv.x - 0.5) * factor) + 0.5;\
	float remappedY = ((v_uv.y - 0.5) * factor) + 0.5;\
	vec3 sampleColour = texture2D(u_sampler0, vec2(remappedX, remappedY)).xyz;\
	float red = gammaColour(sampleColour.r, u_gammaRed[0], u_gammaRed[1], u_gammaRed[2]);\
	float green = gammaColour(sampleColour.g, u_gammaGreen[0], u_gammaGreen[1], u_gammaGreen[2]);\
	float blue = gammaColour(sampleColour.b, u_gammaBlue[0], u_gammaBlue[1], u_gammaBlue[2]);\
	gl_FragColor = vec4(red, green, blue, 1.0);\
}",
	"m_mapVertexAttributeNames" : {
		"a_position" : -1, 
		"a_uv" : -1	
		}, 
	"m_mapUniformsNames" : {
		"u_sampler0" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TInteger),
		"u_param" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector4),
		"u_gammaRed" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_gammaGreen" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		"u_gammaBlue" : DSC.Framework.Asset.Shader.Uniform.FactoryRaw(DSC.Framework.Context.Uniform.s_type.TVector3),
		}
}

DSC.Framework.Asset.Shader.Pool.PassPresent.CalculateScale = function(in_radius, in_width, in_height)
{
	var topLeft = Math.sqrt((in_radius * in_radius) + ((in_width * 0.5) * (in_width * 0.5)) + ((in_height * 0.5) * (in_height * 0.5)));
	return in_radius / topLeft;
}

/*
	float sourceX = (v_uv.x - 0.5) * u_param[1];\
	float sourceY = (v_uv.y - 0.5) * u_param[2];\
	float length = sqrt((u_param[0] * u_param[0]) + (sourceX * sourceX) + (sourceY * sourceY));\
	float factor = (length / u_param[0]) * u_param[3];\
	float remappedX = ((v_uv.x - 0.5) * factor) + 0.5;\
	float remappedY = ((v_uv.y - 0.5) * factor) + 0.5;\
	vec3 sampleColour = texture2D(u_sampler0, vec2(remappedX, remappedY)).xyz;\
	vec2 temp = decodeTemp(sampleColour.b);\
	float red = gammaColour(temp.y, u_gammaRed[0], u_gammaRed[1], u_gammaRed[2]);\
	float green = gammaColour(temp.y, u_gammaGreen[0], u_gammaGreen[1], u_gammaGreen[2]);\
	float blue = gammaColour(temp.y, u_gammaBlue[0], u_gammaBlue[1], u_gammaBlue[2]);\
	gl_FragColor = vec4(red, green, blue, 1.0);\
*/

