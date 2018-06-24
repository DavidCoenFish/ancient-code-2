/*
hold the dag nodes to assist in testing a scene object's transform
pos x,y,z
rot x,y,z
=> matrix
*/

/**
 * @private
 * @final
 * @constructor
 * @this {!c.SceneTransform}
 * @param {!c.DagNodeValue} in_dagPosX
 * @param {!c.DagNodeValue} in_dagPosY
 * @param {!c.DagNodeValue} in_dagPosZ
 * @param {!c.DagNodeValue} in_dagHeading
 * @param {!c.DagNodeValue} in_dagAltitude
 * @param {!c.DagNodeValue} in_dagBank
 * @param {!c.DagNodeCalculate} in_dagMatrix
 * @param {!c.DagNodeCalculate} in_dagMatrixInvert
 * @return {undefined}
 */
c.SceneTransform = function(
	in_dagPosX, in_dagPosY, in_dagPosZ, 
	in_dagHeading, in_dagAltitude, in_dagBank, 
	in_dagMatrix, in_dagMatrixInvert
	) {
	this.m_dagPosX = in_dagPosX;
	this.m_dagPosY = in_dagPosY;
	this.m_dagPosZ = in_dagPosZ;
	this.m_dagHeading = in_dagHeading;
	this.m_dagAltitude = in_dagAltitude;
	this.m_dagBank = in_dagBank;
	this.m_dagMatrix = in_dagMatrix;
	this.m_dagMatrixInvert = in_dagMatrixInvert;

	return;
}
c["SceneTransform"] = c.SceneTransform;



/**
 * @param {!number=} _posX
 * @param {!number=} _posY
 * @param {!number=} _posZ
 * @param {!number=} _heading
 * @param {!number=} _altitude
 * @param {!number=} _bank
 * @return {!c.SceneTransform}
 */
c.SceneTransform.Factory = function(
	_posX,
	_posY,
	_posZ,
	_heading,
	_altitude,
	_bank
	){

	var instructionContext = {
		"V3_Factory" : c.Vector3.Factory,
		"M3_FromEuler" : c.Matrix3.FromEuler,
		"M4_FactoryPosRot" :  c.Matrix4.FactoryPosRot,
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

	dagHeading = c.DagNodeValue.Factory("heading", (undefined === _heading) ? 0.0 : _heading);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagHeading
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagHeadingRad = c.DagNodeCalculate.Factory("HeadingRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagHeading, dagHeadingRad);

	dagAltitude = c.DagNodeValue.Factory("altitude", (undefined === _altitude) ? 0.0 : _altitude);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagAltitude
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagAltitudeRad = c.DagNodeCalculate.Factory("AltitudeRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagAltitude, dagAltitudeRad);

	dagBank = c.DagNodeValue.Factory("bank", (undefined === _bank) ? 0.0 : _bank);
	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagBank
		},
		{
			"op" : c.DagNodeInstructionEnum.fn1,
			"data" : "DegreeToRadian"
		}
	];
	var dagBankRad = c.DagNodeCalculate.Factory("BankRad", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagBank, dagBankRad);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagBankRad
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagAltitudeRad
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagHeadingRad
		},
		{
			"op" : c.DagNodeInstructionEnum.fn3,
			"data" : "M3_FromEuler"
		}
	];
	var dagRotMatrix = c.DagNodeCalculate.Factory("rotMatrix", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagHeadingRad, dagRotMatrix);
	c.DagNodeCollection.SetNodesLinked(dagAltitudeRad, dagRotMatrix);
	c.DagNodeCollection.SetNodesLinked(dagBankRad, dagRotMatrix);

	var instructionArray = [
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagRotMatrix
		},
		{
			"op" : c.DagNodeInstructionEnum.push_node,
			"node" : dagPos
		},
		{
			"op" : c.DagNodeInstructionEnum.fn2,
			"data" : "M4_FactoryPosRot"
		}
	];
	var dagMatrix = c.DagNodeCalculate.Factory("matrix", instructionArray, instructionContext);
	c.DagNodeCollection.SetNodesLinked(dagPos, dagMatrix);
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

	return new c.SceneTransform(
		dagPosX, 
		dagPosY, 
		dagPosZ, 
		dagHeading, 
		dagAltitude, 
		dagBank, 
		dagMatrix,
		dagMatrixInvert
		);
}
c.SceneTransform["Factory"] = c.SceneTransform.Factory;


/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetDagPosX = function() {
	return this.m_dagPosX;
}
c.SceneTransform.prototype["GetDagPosX"] = c.SceneTransform.prototype.GetDagPosX;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetDagPosY = function() {
	return this.m_dagPosY;
}
c.SceneTransform.prototype["GetDagPosY"] = c.SceneTransform.prototype.GetDagPosY;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetDagPosZ = function() {
	return this.m_dagPosZ;
}
c.SceneTransform.prototype["GetDagPosZ"] = c.SceneTransform.prototype.GetDagPosZ;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetHeading = function() {
	return this.m_dagHeading;
}
c.SceneTransform.prototype["GetHeading"] = c.SceneTransform.prototype.GetHeading;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetAltitude = function() {
	return this.m_dagAltitude;
}
c.SceneTransform.prototype["GetAltitude"] = c.SceneTransform.prototype.GetAltitude;

/**
 * @nosideefect
 * @return {!c.DagNodeValue}
 */
c.SceneTransform.prototype.GetBank = function() {
	return this.m_dagBank;
}
c.SceneTransform.prototype["GetBank"] = c.SceneTransform.prototype.GetBank;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneTransform.prototype.GetMatrix = function() {
	return this.m_dagMatrix;
}
c.SceneTransform.prototype["GetMatrix"] = c.SceneTransform.prototype.GetMatrix;

/**
 * @nosideefect
 * @return {!c.DagNodeCalculate}
 */
c.SceneTransform.prototype.GetMatrixInvert = function() {
	return this.m_dagMatrixInvert;
}
c.SceneTransform.prototype["GetMatrixInvert"] = c.SceneTransform.prototype.GetMatrixInvert;
