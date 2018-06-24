//MatrixPerspective.js
/*
	this 
*/

DSC.DNG.Pool.MatrixPerspective = function(
	in_nearDNG, 
	in_farDNG, 
	in_rightDNG, 
	in_topDNG,
	in_matrixDNG
	)
{
	if (!(this instanceof DSC.DNG.Pool.MatrixPerspective))
		alert("DSC.DNG.Pool.MatrixPerspective: call constuctor with new keyword");

	this.m_nearDNG = in_nearDNG;
	this.m_farDNG = in_farDNG;
	this.m_rightDNG = in_rightDNG;
	this.m_topDNG = in_topDNG;
	this.m_matrixDNG = in_matrixDNG;

	return;
}

DSC.DNG.Pool.MatrixPerspective.prototype.GetNearDNG = function()
{
	return this.m_nearDNG;
}
DSC.DNG.Pool.MatrixPerspective.prototype.GetFarDNG = function()
{
	return this.m_farDNG;
}
DSC.DNG.Pool.MatrixPerspective.prototype.GetRightDNG = function()
{
	return this.m_rightDNG;
}
DSC.DNG.Pool.MatrixPerspective.prototype.GetTopDNG = function()
{
	return this.m_topDNG;
}

DSC.DNG.Pool.MatrixPerspective.prototype.GetValue = function()
{
	return this.m_matrixDNG.GetValue();
}

DSC.DNG.Pool.MatrixPerspective.Factory = function(
	_near, 
	_far, 
	_right, 
	_top
	)
{
	var near = DSC.DNG.Node.FactoryRaw((_near == undefined) ? 0.1 : _near);
	var far = DSC.DNG.Node.FactoryRaw((_far == undefined) ? 100.0 : _far);
	var right = DSC.DNG.Node.FactoryRaw((_right == undefined) ? 0.05 : _right);
	var top = DSC.DNG.Node.FactoryRaw((_top == undefined) ? 0.05 : _top);

	var matrix = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeMatrix4Perspective);
	DSC.DNG.Container.LinkNodes(matrix, near, 0);
	DSC.DNG.Container.LinkNodes(matrix, far, 1);
	DSC.DNG.Container.LinkNodes(matrix, right, 2);
	DSC.DNG.Container.LinkNodes(matrix, top, 3);
	
	return DSC.DNG.Pool.MatrixPerspective.FactoryRaw(
		near, 
		far, 
		right, 
		top,
		matrix
		);
}

DSC.DNG.Pool.MatrixPerspective.FactoryRaw = function(
	in_nearDNG, 
	in_farDNG, 
	in_rightDNG, 
	in_topDNG,
	in_matrixDNG
	)
{
	return new DSC.DNG.Pool.MatrixPerspective(
		in_nearDNG, 
		in_farDNG, 
		in_rightDNG, 
		in_topDNG,
		in_matrixDNG
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
			var node0 = DSC.DNG.Pool.MatrixPerspective.Factory(
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
				return "Fail: DSC.DNG.Pool.MatrixPerspective sanity check";
		}


		if (true != result)
			return "Fail: DSC.DNG.Pool.MatrixPerspective";
		return "Pass: DSC.DNG.Pool.MatrixPerspective";
	};
	
	DSC.g_arrayUnitTest.push(out_object);
}
