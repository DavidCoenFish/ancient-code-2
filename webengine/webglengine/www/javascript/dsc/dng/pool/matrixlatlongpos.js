//MatrixLatLongPos.js
DSC.DNG.Pool.MatrixLatLongPos = function(
	in_lat,
	in_long,
	in_distance,
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	if (!(this instanceof DSC.DNG.Pool.MatrixLatLongPos))
		alert("DSC.DNG.Pool.MatrixLatLongPos: call constuctor with new keyword");

	this.m_lat = in_lat;
	this.m_long = in_long;
	this.m_distance = in_distance;
	this.m_posX = in_posX;
	this.m_posY = in_posY;
	this.m_posZ = in_posZ;
	this.m_pos = in_pos;
	this.m_matrix = in_matrix;

	return;
}

DSC.DNG.Pool.MatrixLatLongPos.prototype.GetValue = function()
{
	return this.m_matrix.GetValue();
}

DSC.DNG.Pool.MatrixLatLongPos.Factory = function(
	_valueLatitude,
	_valueLongitude,
	_valueDistance,
	_valuePosX,
	_valuePosY,
	_valuePosZ
	)
{
	var latitude = DSC.DNG.Node.FactoryRaw((_valueLatitude == undefined) ? 0.0 : _valueLatitude);
	var longitude = DSC.DNG.Node.FactoryRaw((_valueLongitude == undefined) ? 0.0 : _valueLongitude);
	var distance = DSC.DNG.Node.FactoryRaw((_valueDistance == undefined) ? 0.0 : _valueDistance);
	var posX = DSC.DNG.Node.FactoryRaw((_valuePosX == undefined) ? 0.0 : _valuePosX);
	var posY = DSC.DNG.Node.FactoryRaw((_valuePosY == undefined) ? 0.0 : _valuePosY);
	var posZ = DSC.DNG.Node.FactoryRaw((_valuePosZ == undefined) ? 0.0 : _valuePosZ);
	var pos = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeVector3);
	DSC.DNG.Container.LinkNodes(pos, posX, 0);
	DSC.DNG.Container.LinkNodes(pos, posY, 1);
	DSC.DNG.Container.LinkNodes(pos, posZ, 2);

	var matrix = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.MakeMatrix4LatLongPosition);
	DSC.DNG.Container.LinkNodes(matrix, latitude, 0);
	DSC.DNG.Container.LinkNodes(matrix, longitude, 1);
	DSC.DNG.Container.LinkNodes(matrix, distance, 2);
	DSC.DNG.Container.LinkNodes(matrix, pos, 3);
	
	return DSC.DNG.Pool.MatrixLatLongPos.FactoryRaw(
		latitude,
		longitude,
		distance,
		posX,
		posY,
		posZ,
		pos,
		matrix
		);
}

DSC.DNG.Pool.MatrixLatLongPos.FactoryRaw = function(
	in_lat,
	in_long,
	in_distance,
	in_posX,
	in_posY,
	in_posZ,
	in_pos,
	in_matrix
	)
{
	return new DSC.DNG.Pool.MatrixLatLongPos(
		in_lat,
		in_long,
		in_distance,
		in_posX,
		in_posY,
		in_posZ,
		in_pos,
		in_matrix
		);
}

