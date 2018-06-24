//matrixaxispos.js
/*
*/

DSC.DNG.Pool.MatrixAxisPos = function(
	in_axisX,
	in_axisY,
	in_axisZ,
	in_axis,
	in_axisNormal,
	in_angle,
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	if (!(this instanceof DSC.DNG.Pool.MatrixAxisPos))
		alert("DSC.DNG.Pool.MatrixAxisPos: call constuctor with new keyword");

	this.m_axisX = in_axisX;
	this.m_axisY = in_axisY;
	this.m_axisZ = in_axisZ;
	this.m_axis = in_axis;
	this.m_axisNormal = in_axisNormal;
	this.m_angle = in_angle;
	this.m_posX = in_posX;
	this.m_posY = in_posY;
	this.m_posZ = in_posZ;
	this.m_pos = in_pos;
	this.m_matrix = in_matrix;

	return;
}

DSC.DNG.Pool.MatrixAxisPos.prototype.GetValue = function()
{
	return this.m_matrix.GetValue();
}

DSC.DNG.Pool.MatrixAxisPos.Factory = function(
	_valueAxisX,
	_valueAxisY,
	_valueAxisZ,
	_valueAngleRad,
	_valuePosX,
	_valuePosY,
	_valuePosZ
	)
{
	var axisX = DSC.DNG.Node.FactoryRaw((_valueAxisX == undefined) ? 0.0 : _valueAxisX);
	var axisY = DSC.DNG.Node.FactoryRaw((_valueAxisY == undefined) ? 0.0 : _valueAxisY);
	var axisZ = DSC.DNG.Node.FactoryRaw((_valueAxisZ == undefined) ? 0.0 : _valueAxisZ);
	var axis = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector3);
	DSC.DNG.Container.LinkNodes(axis, axisX, 0);
	DSC.DNG.Container.LinkNodes(axis, axisY, 1);
	DSC.DNG.Container.LinkNodes(axis, axisZ, 2);
	var axisNormal = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.NormaliseVector3);
	DSC.DNG.Container.LinkNodes(axisNormal, axis, 0);
	var angle = DSC.DNG.Node.FactoryRaw((_valueAngleRad == undefined) ? 0.0 : _valueAngleRad);
	var posX = DSC.DNG.Node.FactoryRaw((_valuePosX == undefined) ? 0.0 : _valuePosX);
	var posY = DSC.DNG.Node.FactoryRaw((_valuePosY == undefined) ? 0.0 : _valuePosY);
	var posZ = DSC.DNG.Node.FactoryRaw((_valuePosZ == undefined) ? 0.0 : _valuePosZ);
	var pos = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector3);
	DSC.DNG.Container.LinkNodes(pos, posX, 0);
	DSC.DNG.Container.LinkNodes(pos, posY, 1);
	DSC.DNG.Container.LinkNodes(pos, posZ, 2);
	var matrix = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeMatrix4AxisAnglePosition);
	DSC.DNG.Container.LinkNodes(matrix, axisNormal, 0);
	DSC.DNG.Container.LinkNodes(matrix, angle, 1);
	DSC.DNG.Container.LinkNodes(matrix, pos, 2);
	
	return DSC.DNG.Pool.MatrixAxisPos.FactoryRaw(
		axisX,
		axisY,
		axisZ,
		axis,
		axisNormal,
		angle,
		posX,
		posY,
		posZ,
		pos,
		matrix
		);
}

DSC.DNG.Pool.MatrixAxisPos.FactoryRaw = function(
	in_axisX,
	in_axisY,
	in_axisZ,
	in_axis,
	in_axisNormal,
	in_angle,
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	return new DSC.DNG.Pool.MatrixAxisPos(
		in_axisX,
		in_axisY,
		in_axisZ,
		in_axis,
		in_axisNormal,
		in_angle,
		in_posX,
		in_posY,
		in_posZ,
		in_pos,
		in_matrix
		);
}

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (DSC.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			var node0 = DSC.DNG.Pool.MatrixAxisPos.Factory(
					0,
					1.0,
					0,
					0,
					0,
					0,
					0
					);
			var value = node0.GetValue();
			result &= true == DSC.Math.Matrix4.AlmostEqual(value, DSC.Math.Matrix4.s_identity);

			node0.m_angle.SetValue(Math.PI / 2.0);
			node0.m_posX.SetValue(2.0);
			node0.m_posY.SetValue(3.0);
			node0.m_posZ.SetValue(4.0);

			var matrix1 = DSC.Math.Matrix4.AxisAngleRaw(undefined, 0, 1.0, 0, Math.PI / 2.0, 2.0, 3.0, 4.0);
			var value = node0.GetValue();
			result &= true == DSC.Math.Matrix4.AlmostEqual(value, matrix1);

			if (!result)
				return "Fail: DSC.DNG.Pool.MatrixAxisPos sanity check";
		}


		if (true != result)
			return "Fail: DSC.DNG.Pool.MatrixAxisPos";
		return "Pass: DSC.DNG.Pool.MatrixAxisPos";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
