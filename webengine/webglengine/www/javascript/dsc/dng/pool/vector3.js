//Vector3.js
DSC.DNG.Pool.Vector3 = function(
	in_vecX,
	in_vecY,
	in_vecZ,
	in_vec
	)
{
	if (!(this instanceof DSC.DNG.Pool.Vector3))
		alert("DSC.DNG.Pool.Vector3: call constuctor with new keyword");

	this.m_vector3X = in_vector3X;
	this.m_vector3Y = in_vector3Y;
	this.m_vector3Z = in_vector3Z;
	this.m_vector3 = in_vector3;

	return;
}

DSC.DNG.Pool.Vector3.prototype.GetValue = function()
{
	return this.m_matrix.GetValue();
}

DSC.DNG.Pool.Vector3.Factory = function(
	_valueX,
	_valueY,
	_valueZ
	)
{
	var vector3X = DSC.DNG.Node.FactoryRaw((_valueX == undefined) ? 0.0 : _valueX);
	var vector3Y = DSC.DNG.Node.FactoryRaw((_valueY == undefined) ? 0.0 : _valueY);
	var vector3Z = DSC.DNG.Node.FactoryRaw((_valueZ == undefined) ? 0.0 : _valueZ);
	var vector3 = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector3);
	DSC.DNG.Container.LinkNodes(vector3, vector3X, 0);
	DSC.DNG.Container.LinkNodes(vector3, vector3Y, 1);
	DSC.DNG.Container.LinkNodes(vector3, vector3Z, 2);
	
	return DSC.DNG.Pool.Vector3.FactoryRaw(
		vector3X,
		vector3Y,
		vector3Z,
		vector3
		);
}

DSC.DNG.Pool.Vector3.FactoryRaw = function(
	in_vecX,
	in_vecY,
	in_vecZ,
	in_vec
	)
{
	return new DSC.DNG.Pool.Vector3(
		in_vecX,
		in_vecY,
		in_vecZ,
		in_vec
		);
}

