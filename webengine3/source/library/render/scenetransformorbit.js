/*
hold the dag nodes to assist in testing a scene object's transform
pos x,y,z //center of interest
rot long, lat,
boom arm length
=> matrix
*/

/**
 * @private
 * @final
 * @constructor
 * @this {!c.SceneTransformOrbit}
 * @param {!c.DagNodeValue} in_dagPosX
 * @param {!c.DagNodeValue} in_dagPosY
 * @param {!c.DagNodeValue} in_dagPosZ
 * @param {!c.DagNodeValue} in_dagLatitude
 * @param {!c.DagNodeValue} in_dagLongitude
 * @param {!c.DagNodeValue} in_dagDistance
 * @param {!c.DagNodeCalculate} in_dagMatrix
 * @param {!c.DagNodeCalculate} in_dagMatrixInvert
 * @return {undefined}
 */
c.SceneTransformOrbit = function(
	in_dagPosX, in_dagPosY, in_dagPosZ, 
	in_dagLatitude, in_dagLongitude, in_dagDistance, 
	in_dagMatrix, in_dagMatrixInvert
	) {
	this.m_dagPosX = in_dagPosX;
	this.m_dagPosY = in_dagPosY;
	this.m_dagPosZ = in_dagPosZ;
	this.m_dagLatitude = in_dagLatitude;
	this.m_dagLongitude = in_dagLongitude;
	this.m_dagDistance = in_dagDistance;
	this.m_dagMatrix = in_dagMatrix;
	this.m_dagMatrixInvert = in_dagMatrixInvert;

	return;
}
c["SceneTransformOrbit"] = c.SceneTransformOrbit;

/**
 * @param {!number=} _posX
 * @param {!number=} _posY
 * @param {!number=} _posZ
 * @param {!number=} _latitude
 * @param {!number=} _longitude
 * @param {!number=} _distance
 * @return {!c.SceneTransformOrbit}
 */
c.SceneTransformOrbit.Factory = function(
	_posX,
	_posY,
	_posZ,
	_latitude,
	_longitude,
	_distance
	){

	var instructionContext = {
		"V3_Factory" : c.Vector3.Factory,
		"M3_FromEuler" : c.Matrix3.FromEuler,
		"M4_FactoryPosRot" :  c.Matrix4.FactoryPosRot,
		"MultiplyVector3" : c.Matrix3.MultiplyVector3,
		"V3_Plus" : c.Vector3.Plus,
		"DegreeToRadian" : c.Math.DegreeToRadian,
		"M4_Invert" : c.Matrix4.Inverse
	};

	dagPosX = c.DagNodeValue.Factory("posX", (undefined === _posX) ? 0.0 : _posX);
	dagPosY = c.DagNodeValue.Factory("posY", (undefined === _posY) ? 0.0 : _posY);
	dagPosZ = c.DagNodeValue.Factory("posZ", (undefined === _posZ) ? 0.0 : _posZ);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPosZ
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPosY
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPosX
		},
		{
			"op" : c.DagNodeInstructionEnum.fn3,
			"data" : "V3_Factory"
		}
	];
	var dagPos = c.DagNodeCalculate.Factory("pos", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagPosX, dagPos);
	c.DagNodeCollection.SetNodesLinked(dagPosY, dagPos);
	c.DagNodeCollection.SetNodesLinked(dagPosZ, dagPos);

	dagLatitude = c.DagNodeValue.Factory("latitude", (undefined === _latitude) ? 0.0 : _latitude);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagLatitude
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagLatitudeRad = c.DagNodeCalculate.Factory("LatitudeRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagLatitude, dagLatitudeRad);


	dagLongitude = c.DagNodeValue.Factory("longitude", (undefined === _longitude) ? 0.0 : _longitude);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagLongitude
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagLongitudeRad = c.DagNodeCalculate.Factory("LongitudeRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagLongitude, dagLongitudeRad);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_const,
			"data" : 0.0
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagLatitudeRad
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagLongitudeRad
		},
		{
			"op" : c.DagNodeInstructionEnum.fn3,
			"data" : "M3_FromEuler"
		}
	];
	var dagRotMatrix = c.DagNodeCalculate.Factory("rotMatrix", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagLatitudeRad, dagRotMatrix);
	c.DagNodeCollection.SetNodesLinked(dagLongitudeRad, dagRotMatrix);

	dagDistance = c.DagNodeValue.Factory("distance", (undefined === _distance) ? 0.0 : _distance);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagDistance
		},
		{
			"op" : c.DagNodeInstructionEnum.push_const,
			"data" : 0.0
		},
		{
			"op" : c.DagNodeInstructionEnum.push_const,
			"data" : 0.0
		},
		{
			"op" : c.DagNodeInstructionEnum.fn3,
			"data" : "V3_Factory"
		}
	];
	var dagBoom = c.DagNodeCalculate.Factory("boom", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagDistance, dagBoom);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagBoom
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagRotMatrix
		},
		{
			"op" : c.DagNodeInstructionEnum.fn2,
			"data" : "MultiplyVector3"
		}
	];
	var dagRotBoom = c.DagNodeCalculate.Factory("RotBoom", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagBoom, dagRotBoom);
	c.DagNodeCollection.SetNodesLinked(dagRotMatrix, dagRotBoom);


	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPos
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagRotBoom
		},
		{
			"op" : c.DagNodeInstructionEnum.fn2,
			"data" : "V3_Plus"
		}
	];
	var dagPosOffset = c.DagNodeCalculate.Factory("PosOffset", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagPos, dagPosOffset);
	c.DagNodeCollection.SetNodesLinked(dagRotBoom, dagPosOffset);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagRotMatrix
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPosOffset
		},
		{
			"op" : c.DagNodeInstructionEnum.fn2,
			"data" : "M4_FactoryPosRot"
		}
	];
	var dagMatrix = c.DagNodeCalculate.Factory("matrix", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagPosOffset, dagMatrix);
	c.DagNodeCollection.SetNodesLinked(dagRotMatrix, dagMatrix);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagMatrix
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "M4_Invert"
		}
	];
	var dagMatrixInvert = c.DagNodeCalculate.Factory("matrixInvert", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagMatrix, dagMatrixInvert);
	
	return new c.SceneTransformOrbit(
		dagPosX, 
		dagPosY, 
		dagPosZ, 
		dagLatitude, 
		dagLongitude, 
		dagDistance, 
		dagMatrix,
		dagMatrixInvert
		);
}
c.SceneTransformOrbit["Factory"] = c.SceneTransformOrbit.Factory;


/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetDagPosX = function() {
	return this.m_dagPosX;
}
c.SceneTransformOrbit.prototype["GetDagPosX"] = c.SceneTransformOrbit.prototype.GetDagPosX;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetDagPosY = function() {
	return this.m_dagPosY;
}
c.SceneTransformOrbit.prototype["GetDagPosY"] = c.SceneTransformOrbit.prototype.GetDagPosY;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetDagPosZ = function() {
	return this.m_dagPosZ;
}
c.SceneTransformOrbit.prototype["GetDagPosZ"] = c.SceneTransformOrbit.prototype.GetDagPosZ;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetLatitude = function() {
	return this.m_dagLatitude;
}
c.SceneTransformOrbit.prototype["GetLatitude"] = c.SceneTransformOrbit.prototype.GetLatitude;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetLongitude = function() {
	return this.m_dagLongitude;
}
c.SceneTransformOrbit.prototype["GetLongitude"] = c.SceneTransformOrbit.prototype.GetLongitude;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransformOrbit.prototype.GetDistance = function() {
	return this.m_dagDistance;
}
c.SceneTransformOrbit.prototype["GetDistance"] = c.SceneTransformOrbit.prototype.GetDistance;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneTransformOrbit.prototype.GetMatrix = function() {
	return this.m_dagMatrix;
}
c.SceneTransformOrbit.prototype["GetMatrix"] = c.SceneTransformOrbit.prototype.GetMatrix;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneTransformOrbit.prototype.GetMatrixInvert = function() {
	return this.m_dagMatrixInvert;
}
c.SceneTransformOrbit.prototype["GetMatrixInvert"] = c.SceneTransformOrbit.prototype.GetMatrixInvert;
