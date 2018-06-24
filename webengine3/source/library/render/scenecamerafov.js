/*
hold the dag nodes to assist in testing a scene camera
viewport, //the ivec4 from c.Render
near, 
far, 
fovDeg (verticle field of view in degrees)
*/

/**
 * @private
 * @final
 * @constructor
 * @this {!c.SceneCameraFov}
 * @param {!c.DagNodeValue} in_dagNear
 * @param {!c.DagNodeValue} in_dagFar
 * @param {!c.DagNodeValue} in_dagFov
 * @param {!c.DagNodeCalculate} in_dagNearFarFovAspect
 * @param {!c.DagNodeCalculate} in_dagNearFarFocalLengthAspect
 * @param {!c.DagNodeCalculate} in_dagMatrix
 * @return {undefined}
 */
c.SceneCameraFov = function(
	in_dagNear,
	in_dagFar,
	in_dagFov,
	in_dagNearFarFovAspect,
	in_dagNearFarFocalLengthAspect,
	in_dagMatrix
	) {
	this.m_dagNear = in_dagNear;
	this.m_dagFar = in_dagFar;
	this.m_dagFov = in_dagFov;
	this.m_dagNearFarFovAspect = in_dagNearFarFovAspect;
	this.m_dagNearFarFocalLengthAspect = in_dagNearFarFocalLengthAspect;
	this.m_dagMatrix = in_dagMatrix;

	return;
}
c["SceneCameraFov"] = c.SceneCameraFov;

/**
 * @param {!(c.DagNodeValue|c.DagNodeCalculate)} in_viewport
 * @param {!number=} _near
 * @param {!number=} _far
 * @param {!number=} _fovDeg
 * @return {!c.SceneCameraFov}
 */
c.SceneCameraFov.Factory = function(
	in_viewport,
	_near,
	_far,
	_fovDeg
	){

	var instructionContext = {
		"V4_Factory" : c.Vector4.Factory,
		"DegreeToRadian" : c.Math.DegreeToRadian,
		//c.Matrix4.FactoryPerspectiveFrustum2(in_near, in_far, in_fovRad, in_aspect, _result) {
		"PerspectiveFrustum2" : c.Matrix4.FactoryPerspectiveFrustum2,
		"Aspect" : function(in_viewport, _prev){
			return (in_viewport[2] / in_viewport[3]);
		},
		"FocalLength" : function(in_fovRad, _prev){
			return (Math.tan(in_fovRad * 0.5)) * 2.0;
		},
	}

	dagNear = c.DagNodeValue.Factory("near", (undefined === _near) ? 0.0 : _near);
	dagFar = c.DagNodeValue.Factory("far", (undefined === _far) ? 0.0 : _far);
	dagFov = c.DagNodeValue.Factory("fov", (undefined === _fovDeg) ? 0.0 : _fovDeg);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFov
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagFovRad = c.DagNodeCalculate.Factory("fovRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagFov, dagFovRad);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : in_viewport
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "Aspect"
		}
	];
	var dagAspect = c.DagNodeCalculate.Factory("dagAspect", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(in_viewport, dagAspect);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagAspect
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFovRad
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFar
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagNear
		},
		{
			"op" : c.DagNodeInstructionEnum.fn4,
			"data" : "PerspectiveFrustum2"
		}
	];
	var dagMatrix = c.DagNodeCalculate.Factory("matrix", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagNear, dagMatrix);
	c.DagNodeCollection.SetNodesLinked(dagFar, dagMatrix);
	c.DagNodeCollection.SetNodesLinked(dagFovRad, dagMatrix);
	c.DagNodeCollection.SetNodesLinked(dagAspect, dagMatrix);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFovRad
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "FocalLength"
		}
	];
	var dagFocalLength = c.DagNodeCalculate.Factory("FocalLength", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagFovRad, dagFocalLength);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagAspect
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFovRad
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFar
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagNear
		},
		{
			"op" : c.DagNodeInstructionEnum.fn4,
			"data" : "V4_Factory"
		}
	];
	var dagNearFarFovAspect= c.DagNodeCalculate.Factory("NearFarFovAspect", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagNear, dagNearFarFovAspect);
	c.DagNodeCollection.SetNodesLinked(dagFar, dagNearFarFovAspect);
	c.DagNodeCollection.SetNodesLinked(dagFovRad, dagNearFarFovAspect);
	c.DagNodeCollection.SetNodesLinked(dagAspect, dagNearFarFovAspect);


	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagAspect
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFocalLength
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagFar
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagNear
		},
		{
			"op" : c.DagNodeInstructionEnum.fn4,
			"data" : "V4_Factory"
		}
	];
	var dagNearFarFocalLengthAspect= c.DagNodeCalculate.Factory("NearFarFocalLengthAspect", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagNear, dagNearFarFocalLengthAspect);
	c.DagNodeCollection.SetNodesLinked(dagFar, dagNearFarFocalLengthAspect);
	c.DagNodeCollection.SetNodesLinked(dagFocalLength, dagNearFarFocalLengthAspect);
	c.DagNodeCollection.SetNodesLinked(dagAspect, dagNearFarFocalLengthAspect);

	return new c.SceneCameraFov(
		dagNear,
		dagFar,
		dagFov,
		dagNearFarFovAspect,
		dagNearFarFocalLengthAspect,
		dagMatrix
		);
}
c.SceneCameraFov["Factory"] = c.SceneCameraFov.Factory;


/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneCameraFov.prototype.GetDagNear = function() {
	return this.m_dagNear;
}
c.SceneCameraFov.prototype["GetDagNear"] = c.SceneCameraFov.prototype.GetDagNear;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneCameraFov.prototype.GetDagFar = function() {
	return this.m_dagFar;
}
c.SceneCameraFov.prototype["GetDagFar"] = c.SceneCameraFov.prototype.GetDagFar;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneCameraFov.prototype.GetDagFov = function() {
	return this.m_dagFov;
}
c.SceneCameraFov.prototype["GetDagFov"] = c.SceneCameraFov.prototype.GetDagFov;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneCameraFov.prototype.GetNearFarFovAspect = function() {
	return this.m_dagNearFarFovAspect;
}
c.SceneCameraFov.prototype["GetNearFarFovAspect"] = c.SceneCameraFov.prototype.GetNearFarFovAspect;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneCameraFov.prototype.GetNearFarFocalLengthAspect = function() {
	return this.m_dagNearFarFocalLengthAspect;
}
c.SceneCameraFov.prototype["GetNearFarFocalLengthAspect"] = c.SceneCameraFov.prototype.GetNearFarFocalLengthAspect;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneCameraFov.prototype.GetMatrix = function() {
	return this.m_dagMatrix;
}
c.SceneCameraFov.prototype["GetMatrix"] = c.SceneCameraFov.prototype.GetMatrix;
