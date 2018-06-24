//MatrixPos.js
DSC.DNG.Pool.MatrixPos = function(
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	if (!(this instanceof DSC.DNG.Pool.MatrixPos))
		alert("DSC.DNG.Pool.MatrixPos: call constuctor with new keyword");

	this.m_posX = in_posX;
	this.m_posY = in_posY;
	this.m_posZ = in_posZ;
	this.m_pos = in_pos;
	this.m_matrix = in_matrix;

	return;
}

DSC.DNG.Pool.MatrixPos.prototype.GetValue = function()
{
	return this.m_matrix.GetValue();
}

DSC.DNG.Pool.MatrixPos.Factory = function(
	_valuePosX,
	_valuePosY,
	_valuePosZ
	)
{
	var posX = DSC.DNG.Node.FactoryRaw((_valuePosX == undefined) ? 0.0 : _valuePosX);
	var posY = DSC.DNG.Node.FactoryRaw((_valuePosY == undefined) ? 0.0 : _valuePosY);
	var posZ = DSC.DNG.Node.FactoryRaw((_valuePosZ == undefined) ? 0.0 : _valuePosZ);
	var pos = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector3);
	DSC.DNG.Container.LinkNodes(pos, posX, 0);
	DSC.DNG.Container.LinkNodes(pos, posY, 1);
	DSC.DNG.Container.LinkNodes(pos, posZ, 2);
	var matrix = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeMatrix4Position);
	DSC.DNG.Container.LinkNodes(matrix, pos, 0);
	
	return DSC.DNG.Pool.MatrixPos.FactoryRaw(
		posX,
		posY,
		posZ,
		pos,
		matrix
		);
}

DSC.DNG.Pool.MatrixPos.FactoryRaw = function(
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	return new DSC.DNG.Pool.MatrixPos(
		in_posX,
		in_posY,
		in_posZ,
		in_pos,
		in_matrix
		);
}

