//updatefunction.js

DSC.DNG.UpdateFunction = function()
{
	alert("DSC.DNG.UpdateFunction: namespace, do not invoke");
	return;
}

//return 0 if no input
DSC.DNG.UpdateFunction.AllAddition = function (in_arrayInputValues)
{
	var result = 0;
	in_arrayInputValues.forEach(function (inputValues) {
		result += inputValues;
	});
	return result;
}

//return 1 if no input
DSC.DNG.UpdateFunction.AllMultiple = function (in_arrayInputValues)
{
	var result = 1;
	in_arrayInputValues.forEach(function (inputValues) {
		result *= inputValues;
	});
	return result;
}

DSC.DNG.UpdateFunction.AddConstant = function (in_arrayInputValues, _oldValue, in_updateData)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.AddConstant: fuction with " + in_arrayInputValues.length + " inputs.");
	return (in_arrayInputValues[0] + in_updateData);
}

DSC.DNG.UpdateFunction.FirstMinusAll = function (in_arrayInputValues)
{
	var result = undefined;
	var count = in_arrayInputValues.length;
	if (1 <= count)
		result = in_arrayInputValues[0];
	for (var index = 1; index < count; ++index)
	{
		result -= in_arrayInputValues[index];
	}
	return result;
}


DSC.DNG.UpdateFunction.PairBooleanAnd = function (in_arrayInputValues)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.PairBooleanAnd: pair fuction with " + in_arrayInputValues.length + " inputs.");
	var lhs = in_arrayInputValues[0];
	var rhs = in_arrayInputValues[1];
	return ((true === lhs) && (true === rhs));
}

DSC.DNG.UpdateFunction.PairBooleanOr = function (in_arrayInputValues)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.PairBooleanOr: pair fuction with " + in_arrayInputValues.length + " inputs.");
	var lhs = in_arrayInputValues[0];
	var rhs = in_arrayInputValues[1];
	return ((true === lhs) || (true === rhs));
}

DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4 = function (in_arrayInputValues, _value)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4: pair fuction with " + in_arrayInputValues.length + " inputs.");
	var lhs = in_arrayInputValues[0];
	var rhs = in_arrayInputValues[1];
	lhs = (undefined != lhs) ? lhs : DSC.Math.Matrix4.s_identity;
	rhs = (undefined != rhs) ? rhs : DSC.Math.Matrix4.s_identity;
	return DSC.Math.Matrix4.Multiply(_value, lhs, rhs);
}

DSC.DNG.UpdateFunction.Matrix4Invert = function (in_arrayInputValues, _value)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.Matrix4Invert: fuction with " + in_arrayInputValues.length + " inputs.");
	var matrix = in_arrayInputValues[0];
	return DSC.Math.Matrix4.Inverse(_value, matrix);
}

DSC.DNG.UpdateFunction.MakeVector2 = function (in_arrayInputValues, _value)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeVector2: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Vector2.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeVector3 = function (in_arrayInputValues, _value)
{
	if (3 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeVector3: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Vector3.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeVector4 = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeVector4: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Vector4.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.NormaliseVector3 = function (in_arrayInputValues, _value)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.NormaliseVector3: with " + in_arrayInputValues.length + " inputs.");
	var input = in_arrayInputValues[0];
	return DSC.Math.Vector3.NormalRaw(_value, input[0], input[1], input[2]);
}

DSC.DNG.UpdateFunction.MakeVector4 = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeVector4: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Vector4.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeQuaternion = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeQuaternion: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Quaternion.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeColour = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeColour: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Colour.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeMatrix3 = function (in_arrayInputValues, _value)
{
	if (9 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix3: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Matrix3.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeMatrix4 = function (in_arrayInputValues, _value)
{
	if (16 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Matrix4.Clone(_value, in_arrayInputValues);
}

DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition: with " + in_arrayInputValues.length + " inputs.");
	var latitude = in_arrayInputValues[0];
	var longitude = in_arrayInputValues[1];
	var distance = in_arrayInputValues[2];
	var pos = in_arrayInputValues[3];

	_value = DSC.Math.Matrix4.PosRaw(_value, 0, 0, distance);
	if (0.0 != latitude)
	{
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp = DSC.Math.Matrix4.AxisAngleRaw(
			DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp,
			1, 0, 0, -latitude);
		_value = DSC.Math.Matrix4.Multiply(_value, DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp, _value);
	}
	if (0.0 != longitude)
	{
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp = DSC.Math.Matrix4.AxisAngleRaw(
			DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp,
			0, 1, 0, longitude);
		_value = DSC.Math.Matrix4.Multiply(_value, DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp, _value);
	}
	DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp2 = DSC.Math.Matrix4.GetPosition(
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp2, _value);
	DSC.Math.Matrix4.SetPositionRaw(
		_value,
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp2[0] + pos[0],
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp2[1] + pos[1],
		DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition.s_temp2[2] + pos[2]
		);
	return _value;
}

DSC.DNG.UpdateFunction.MakeMatrix4AxisAnglePosition = function (in_arrayInputValues, _value)
{
	if (3 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4AxisAnglePosition: with " + in_arrayInputValues.length + " inputs.");
	var axis = in_arrayInputValues[0];
	var angle = in_arrayInputValues[1];
	var pos = in_arrayInputValues[2];
	return DSC.Math.Matrix4.AxisAngle(
		_value, 
		axis, 
		angle, 
		pos
		);
}

DSC.DNG.UpdateFunction.MakeMatrix4AtUpPosition = function (in_arrayInputValues, _value)
{
	if (3 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4AtUpPosition: with " + in_arrayInputValues.length + " inputs.");
	var at = in_arrayInputValues[0];
	var up = in_arrayInputValues[1];
	var pos = in_arrayInputValues[2];
	return DSC.Math.Matrix4.AtUp(
		_value, 
		at, 
		up, 
		undefined, //UnitY
		undefined, //UnitZ
		pos
		);
}

DSC.DNG.UpdateFunction.MakeMatrix4RotationPosition = function (in_arrayInputValues, _value)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4RotationPosition: with " + in_arrayInputValues.length + " inputs.");
	var rot = in_arrayInputValues[0];
	var pos = in_arrayInputValues[1];
	return DSC.Math.Matrix4.RotPos(
		_value, 
		rot,
		pos
		);
}

DSC.DNG.UpdateFunction.MakeMatrix4Position = function (in_arrayInputValues, _value)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4Position: with " + in_arrayInputValues.length + " inputs.");
	var pos = in_arrayInputValues[0];
	_value = DSC.Math.Matrix4.Clone(_value, DSC.Math.Matrix4.s_identity);
	DSC.Math.Matrix4.SetPosition(_value, pos);
	return _value; 
}

DSC.DNG.UpdateFunction.MakeMatrix4Perspective = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.MakeMatrix4QuaternionPosition: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Matrix4.PerspectiveFrustumRaw(
		_value, 
		in_arrayInputValues[0],
		in_arrayInputValues[1],
		in_arrayInputValues[2],
		in_arrayInputValues[3]
		);
}

DSC.DNG.UpdateFunction.GetMatrix4At = function (in_arrayInputValues, _value)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.GetMatrix4At: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Matrix4.GetAt(_value, in_arrayInputValues[0]);
}

DSC.DNG.UpdateFunction.GetMatrix4Pos = function (in_arrayInputValues, _value)
{
	if (1 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.GetMatrix4Pos: with " + in_arrayInputValues.length + " inputs.");
	return DSC.Math.Matrix4.GetPosition(_value, in_arrayInputValues[0]);
}

DSC.DNG.UpdateFunction.FustrumUnitRadius = function (in_arrayInputValues, _value)
{
	if (3 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.FustrumUnitRadius: with " + in_arrayInputValues.length + " inputs.");
	var top = in_arrayInputValues[0];
	var right = in_arrayInputValues[1];
	var near = in_arrayInputValues[2];
	var radius = DSC.Math.Vector2.LengthRaw(top, right);
	if (0.0 != near)
	{
		_value = radius / near;
	}
	else
	{
		_value = 0.0;
	}
	return _value;
}

DSC.DNG.UpdateFunction.RayDistance = function (in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.RayDistance: with " + in_arrayInputValues.length + " inputs.");
	var itemPos = in_arrayInputValues[0];
	var itemRadius = in_arrayInputValues[1];
	var observerPos = in_arrayInputValues[2];
	var observerAt = in_arrayInputValues[3]; //assume normalised
	_value = DSC.Math.Vector3.DotProductRaw(
		observerAt[0],
		observerAt[1],
		observerAt[2],
		itemPos[0] - observerPos[0],
		itemPos[1] - observerPos[1],
		itemPos[2] - observerPos[2]
		) - itemRadius;
	return _value;
}

DSC.DNG.UpdateFunction.Vector3DistanceSquared = function(in_arrayInputValues, _value)
{
	if (2 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.Vector3DistanceSquared: with " + in_arrayInputValues.length + " inputs.");
	var lhsPos = in_arrayInputValues[0];
	var rhsPos = in_arrayInputValues[1];
	_value = DSC.Math.Vector3.LengthSquaredRaw(
		lhsPos[0] - rhsPos[0],
		lhsPos[1] - rhsPos[1],
		lhsPos[2] - rhsPos[2]
		);
	return _value;
}

DSC.DNG.UpdateFunction.DistanceSquaredInsideNearFarRadius = function(in_arrayInputValues, _value)
{
	if (4 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.Vector3DistanceSquared: with " + in_arrayInputValues.length + " inputs.");
	var distanceSquared = in_arrayInputValues[0];
	var near = in_arrayInputValues[1];
	var far = in_arrayInputValues[2];
	var radius = in_arrayInputValues[3];
	var temp1 = far + radius;
	var temp2 = near - radius;
	if (0 < temp2)
	{
		if (distanceSquared < (temp2 * temp2))
		{
			return false;
		}
	}
	return (distanceSquared <= (temp1 * temp1));
}


DSC.DNG.UpdateFunction.InFustrum = function (in_arrayInputValues, _value)
{
	if (8 != in_arrayInputValues.length)
		alert("DSC.DNG.UpdateFunction.InFustrum: with " + in_arrayInputValues.length + " inputs.");
	var itemPos = in_arrayInputValues[0];
	var observerPos = in_arrayInputValues[1];
	var observerAt = in_arrayInputValues[2];
	var radius = in_arrayInputValues[3];
	var unitRadiusFustrumDng = in_arrayInputValues[4];
	var fustrumRadiusDepthScaleDng = in_arrayInputValues[5];
	var near = in_arrayInputValues[6];
	var far = in_arrayInputValues[7];

	var distance = DSC.Math.Vector3.DotProductRaw(
		-(observerAt[0]),
		-(observerAt[1]),
		-(observerAt[2]),
		itemPos[0] - observerPos[0],
		itemPos[1] - observerPos[1],
		itemPos[2] - observerPos[2]
		);

	if ((distance + radius < near) ||
		(far < distance - radius))
		return false;

	var radiusAtDistance = unitRadiusFustrumDng;
	if (true == fustrumRadiusDepthScaleDng)
		radiusAtDistance *= distance;

	var testPoint0 = observerPos[0] - (observerAt[0] * distance);
	var testPoint1 = observerPos[1] - (observerAt[1] * distance);
	var testPoint2 = observerPos[2] - (observerAt[2] * distance);

	var distSquared = DSC.Math.Vector3.LengthSquaredRaw(
		itemPos[0] - testPoint0,
		itemPos[1] - testPoint1,
		itemPos[2] - testPoint2
		);
	var temp = radiusAtDistance + radius;
	temp *= temp;
	return (distSquared <= temp);
}
