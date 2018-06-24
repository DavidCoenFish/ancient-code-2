/**
 * @private
 * @final
 * @constructor
 * @this {!c.RenderData}
 * @param {!c.Model} in_model
 * @param {!c.Material} in_material
 * @param {!Float32Array} in_dataStreamCapsule0
 * @param {!Float32Array} in_dataStreamCapsule1
 * @return {undefined}
 */
c.CapsuleCollection = function(in_model, in_material, in_maxCapsuleCount, in_dataStreamCapsule0, in_dataStreamCapsule1) {
	this.m_model = in_model;
	this.m_material = in_material;
	this.m_maxCapsuleCount = in_maxCapsuleCount;
	this.m_activeCount = 0;
	this.m_dataStreamCapsule0 = in_dataStreamCapsule0;
	this.m_dataStreamCapsule1 = in_dataStreamCapsule1;

	return;
}
c["CapsuleCollection"] = c.CapsuleCollection;

/**
 * @param {!c.Render} in_render
 * @param {!number} in_maxCapsuleCount
 * @param {!c.DagNodeCalculate} in_dagMatrixV
 * @param {!c.DagNodeCalculate} in_dagMatrixP
 * @param {!c.DagNodeCalculate} in_dagNearFarFocalLengthAspect
 * @return {c.CapsuleCollection}
 */
c.CapsuleCollection.Factory = function(in_render, in_maxCapsuleCount, in_dagMatrixV, in_dagMatrixP, in_dagNearFarFocalLengthAspect) {
	var dataStreamCapsule0 = new Float32Array(in_maxCapsuleCount * 4);
	var dataStreamCapsule1 = new Float32Array(in_maxCapsuleCount * 4);
	var model = in_render.NewModel(
		c.WebGL.POINTS,
		in_maxCapsuleCount,
		{
			"a_capsule0" : c.ModelDataStream.Factory(
				c.WebGL.FLOAT,
				4,
				dataStreamCapsule0,
				c.WebGL.DYNAMIC_DRAW,
				false
				),
			"a_capsule1" : c.ModelDataStream.Factory(
				c.WebGL.FLOAT,
				4,
				dataStreamCapsule1,
				c.WebGL.DYNAMIC_DRAW,
				false
				),
		}
	);
	if (null === model){
		return null;
	}


	var vertextShader = "\
uniform mat4 u_matrixMV;\
uniform mat4 u_matrixP;\
uniform ivec4 u_viewport;\
uniform vec4 u_perspective;\
attribute vec4 a_capsule0;\
attribute vec4 a_capsule1;\
varying vec3 v_circleA;\
varying vec3 v_segment;\
varying vec3 v_circleB;\
void main() {\
	vec3 posMV = (u_matrixMV * vec4(a_capsule0.xyz, 1.0)).xyz;\
	vec3 posAMV = (u_matrixMV * vec4(a_capsule0.xyz - (a_capsule1.xyz * a_capsule1.w), 1.0)).xyz;\
	vec3 posBMV = (u_matrixMV * vec4(a_capsule0.xyz + (a_capsule1.xyz * a_capsule1.w), 1.0)).xyz;\
	if (posAMV.z < posBMV.z){\
		vec3 temp = posAMV;\
		posAMV = posBMV;\
		posBMV = temp;\
	}\
\
	gl_Position = u_matrixP * vec4(posMV, 1.0);\
	posMV.y = -posMV.y;\
	posAMV.y = -posAMV.y;\
	posBMV.y = -posBMV.y;\
	float radiousOnProject = (a_capsule0.w + a_capsule1.w) / (-posAMV.z);\
	gl_PointSize = (radiousOnProject * 2.0 * float(u_viewport[3]))/ u_perspective[2];\
	vec2 posProject = posMV.xy / (-posMV.z);\
	vec2 posAProject = posAMV.xy / (-posAMV.z);\
	vec2 posBProject = posBMV.xy / (-posBMV.z);\
\
	v_circleA.xy = (((posAProject - posProject) / (radiousOnProject * 2.0)) + vec2(0.5));\
	v_circleA.z = a_capsule0.w / ((-posAMV.z) * radiousOnProject * 2.0);\
\
	v_circleB.xy = (((posBProject - posProject) / (radiousOnProject * 2.0)) + vec2(0.5));\
	v_circleB.z = a_capsule0.w / ((-posBMV.z) * radiousOnProject * 2.0);\
\
	vec2 ray = v_circleB.xy - v_circleA.xy;\
	v_segment.z = length(ray);\
	v_segment.xy = ray / v_segment.z;\
}";

	var fragmentShader = "\
precision mediump float;\
varying vec3 v_circleA;\
varying vec3 v_segment;\
varying vec3 v_circleB;\
void main() {\
	vec2 offsetCircleA = gl_PointCoord - v_circleA.xy;\
	float segmentPerp = dot(offsetCircleA, v_segment.xy);\
	if ((0.0 <= segmentPerp) && (segmentPerp <= v_segment.z)){\
		float segmentRadius = mix(v_circleA.z, v_circleB.z, segmentPerp / v_segment.z);\
		float segmentDist = abs(dot(offsetCircleA, vec2(-v_segment.y, v_segment.x)));\
		if (segmentDist < segmentRadius){\
			float temp = segmentDist / segmentRadius;\
			temp = 1.0 - (temp * temp);\
			gl_FragColor = vec4(temp, temp, temp, 1.0);\
			return;\
		};\
	}\
	float distCircleA = dot(offsetCircleA, offsetCircleA);\
	if (distCircleA <= (v_circleA.z * v_circleA.z)) {\
		float temp = 1.0 - (distCircleA / (v_circleA.z * v_circleA.z));\
		gl_FragColor = vec4(temp, temp, temp, 1.0);\
		return;\
	}\
	vec2 offsetCircleB = gl_PointCoord - v_circleB.xy;\
	float distCircleB = dot(offsetCircleB, offsetCircleB);\
	if (distCircleB <= (v_circleB.z * v_circleB.z)) {\
		float temp = 1.0 - (distCircleB / (v_circleB.z * v_circleB.z));\
		gl_FragColor = vec4(temp, temp, temp, 1.0);\
		return;\
	}\
	discard;\
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\
	return;\
}";

	var shader = in_render.NewShader(
		vertextShader,
		fragmentShader,
		{ 
			"a_capsule0": null,
			"a_capsule1": null
		}, 
		{ 
			"u_matrixMV" : null,
			"u_matrixP" : null,
			"u_viewport" : null,
			"u_perspective" : null
		}
	);
	if (null === shader){
		return null;
	}

	var material = c.Material.Factory(
		shader,
		{ 
			"u_matrixMV" : c.ShaderUniform.Factory(
				c.ShaderUniform.s_type.Float16,
				in_dagMatrixV
				),
			"u_matrixP" : c.ShaderUniform.Factory(
				c.ShaderUniform.s_type.Float16,
				in_dagMatrixP
				),
			"u_perspective" : c.ShaderUniform.Factory(
				c.ShaderUniform.s_type.Float4,
				in_dagNearFarFocalLengthAspect
				),
			"u_viewport" : c.ShaderUniform.Factory(
				c.ShaderUniform.s_type.Integer4,
				in_render.GetViewport()
				)
		},
		undefined, //_textureArray,
		undefined, //_triangleCullEnable,
		undefined, //_triangleCull,
		undefined, //_triangleClockwise,
		undefined, //_blend,
		undefined, //_blendSourceFlag,
		undefined, //_blendDestinationFlag,
		true, //_depthWrite
		c.WebGL.LESS //_depthFlag
	);
	if (null === material){
		return null;
	}

	return new c.CapsuleCollection(model, material, in_maxCapsuleCount, dataStreamCapsule0, dataStreamCapsule1);
}
c.CapsuleCollection["Factory"] = c.CapsuleCollection.Factory;

/**
 * @param {!Float32Array} in_midPoint
 * @param {!Float32Array} in_normal
 * @param {!number} in_radius
 * @param {!number} in_halfLength
 * @return {undefined}
 */
c.CapsuleCollection.prototype.AddCapsule = function(in_midPoint, in_normal, in_radius, in_halfLength) {
	if (this.m_maxCapsuleCount <= this.m_activeCount){
		return;
	}
	var baseIndex = this.m_activeCount * 4;
	this.m_dataStreamCapsule0[baseIndex + 0] = in_midPoint[0];
	this.m_dataStreamCapsule0[baseIndex + 1] = in_midPoint[1];
	this.m_dataStreamCapsule0[baseIndex + 2] = in_midPoint[2];
	this.m_dataStreamCapsule0[baseIndex + 3] = in_radius;
	this.m_dataStreamCapsule1[baseIndex + 0] = in_normal[0];
	this.m_dataStreamCapsule1[baseIndex + 1] = in_normal[1];
	this.m_dataStreamCapsule1[baseIndex + 2] = in_normal[2];
	this.m_dataStreamCapsule1[baseIndex + 3] = in_halfLength;
	this.m_activeCount += 1;
	return;
}
c.CapsuleCollection.prototype["AddCapsule"] = c.CapsuleCollection.prototype.AddCapsule;

/**
 * @param {!c.Render} in_render
 * @return {undefined}
 */
c.CapsuleCollection.prototype.Flush = function(in_render) {
	in_render.UpdateModelDataStream(this.m_model.m_mapDataStream["a_capsule0"]);
	in_render.UpdateModelDataStream(this.m_model.m_mapDataStream["a_capsule1"]);
	return;
}
c.CapsuleCollection.prototype["Flush"] = c.CapsuleCollection.prototype.Flush;

/**
 * @return {undefined}
 */
c.CapsuleCollection.prototype.Begin = function() {
	this.m_activeCount = 0;
	return;
}
c.CapsuleCollection.prototype["Begin"] = c.CapsuleCollection.prototype.Begin;

/**
 * @param {!c.Render} in_render
 * @return {undefined}
 */
c.CapsuleCollection.prototype.Render = function(in_render) {
	in_render.RenderModel(this.m_material, this.m_model, undefined, this.m_activeCount);
	return;
}
c.CapsuleCollection.prototype["Render"] = c.CapsuleCollection.prototype.Render;
