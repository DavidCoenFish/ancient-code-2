DSC.Math.Frame = function()
{
	alert("Frame: meta class, construct via FactoryRaw");	
}


/*
	the prefered way to access a colour channel external to class
	var frame0 = DSC.Math.Frame.Clone(DSC.Math.Frame.s_zero);
	var frame1 = DSC.Math.Frame.FactoryRaw(0.0, 0.0, 0.0);
	var x = frame1[DSC.Math.Frame.s_enum.TOriginX];
*/

DSC.Math.Frame.GetOriginX = function(in_source)
{
	return in_source[0];
}
DSC.Math.Frame.GetOriginY = function(in_source)
{
	return in_source[1];
}
DSC.Math.Frame.GetSizeX = function(in_source)
{
	return in_source[2];
}
DSC.Math.Frame.GetSizeY = function(in_source)
{
	return in_source[3];
}

DSC.Math.Frame.SetOriginX = function(in_source, in_value)
{
	in_source[0] = in_value;
	return;
}
DSC.Math.Frame.SetOriginY = function(in_source, in_value)
{
	in_source[1] = in_value;
	return;
}
DSC.Math.Frame.SetSizeX = function(in_source, in_value)
{
	in_source[2] = in_value;
	return;
}
DSC.Math.Frame.SetSizeY = function(in_source, in_value)
{
	in_source[3] = in_value;
	return;
}

DSC.Math.Frame.toString = function(in_source)
{
	return "Frame m_originX:" + in_source[0] + " m_originY:" + in_source[1] + " m_sizeX:" + in_source[2] + " m_sizeY:" + in_source[3];
}

DSC.Math.Frame.SetRaw = function(inout_result, in_originX, in_originY, in_sizeX, in_sizeY)
{
	inout_result[0] = in_originX;
	inout_result[1] = in_originY;
	inout_result[2] = in_sizeX;
	inout_result[3] = in_sizeY;
}

DSC.Math.Frame.Clone = function(_result, in_source)
{
	if (undefined != _result)
	{
		//todo array copy
		DSC.Math.Frame.SetRaw(_result, in_source[0], in_source[1], in_source[2], in_source[3]);
		return _result;
	}
	return DSC.Math.Frame.FactoryRaw(in_source[0], in_source[1], in_source[2], in_source[3]);
}

DSC.Math.Frame.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.Frame.AlmostEqualRaw(in_lhs[0], in_lhs[1], in_lhs[2], in_lhs[3], in_rhs[0], in_rhs[1], in_rhs[2], in_rhs[3]);
}

DSC.Math.Frame.AlmostEqualRaw = function(in_lhsX, in_lhsY, in_lhsZ, in_lhsW, in_rhsX, in_rhsY, in_rhsZ, in_rhsW, _epsilon)
{
	return (
		(DSC.Math.AlmostEqual(in_lhsX, in_rhsX, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsY, in_rhsY, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsZ, in_rhsZ, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsW, in_rhsW, _epsilon))
		);
}

DSC.Math.Frame.CalculateFrame = function(_result, in_originX, in_originY, in_sizeX, in_sizeY, _coordinateOrigin, _coordinateSize)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Frame.FactoryRaw();
	}
	DSC.Math.Frame.SetRaw(
		_result, 
		(undefined == _coordinateOrigin) ? in_originX : _coordinateOrigin.CalculateX(in_originX, in_originY, in_sizeX, in_sizeY),
		(undefined == _coordinateOrigin) ? in_originY : _coordinateOrigin.CalculateY(in_originX, in_originY, in_sizeX, in_sizeY),
		(undefined == _coordinateSize) ? in_sizeX : _coordinateSize.CalculateSizeX(in_sizeX, in_sizeY),
		(undefined == _coordinateSize) ? in_sizeY : _coordinateSize.CalculateSizeY(in_sizeX, in_sizeY)
		);

	return _result;
}

DSC.Math.Frame.CalculateClipFrame = function(
	_result, 
	in_viewportPixelFrame, 
	in_pixelFrameOriginX,
	in_pixelFrameOriginY,
	in_pixelFrameSizeX,
	in_pixelFrameSizeY
	)
{
	if (undefined == _result)
	{
		_result = DSC.Math.Frame.FactoryRaw();
	}

	var viewportOriginX = in_viewportPixelFrame[0] * 1.0;
	var viewportOriginY = in_viewportPixelFrame[1] * 1.0;
	var viewportSizeX = in_viewportPixelFrame[2] * 1.0;
	var viewportSizeY = in_viewportPixelFrame[3] * 1.0;

	var width = (((in_pixelFrameSizeX) / viewportSizeX));
	var height = (((in_pixelFrameSizeY) / viewportSizeY));

	//[-1 ... 1.0]
	DSC.Math.Frame.SetRaw(
		_result, 
		(((in_pixelFrameOriginX -  viewportOriginX) / viewportSizeX) * 2.0) - 1.0 + width,
		(((in_pixelFrameOriginY -  viewportOriginY) / viewportSizeY) * 2.0) - 1.0 + height,
		width,
		height
		);

	return _result;
}

DSC.Math.Frame.FactoryRaw = function(_originX, _originY, _sizeX, _sizeY)
{
	return new DSC.Common.t_floatArray([
		(undefined == _originX) ? 0.0 : _originX,
		(undefined == _originY) ? 0.0 : _originY,
		(undefined == _sizeX) ? 0.0 : _sizeX,
		(undefined == _sizeY) ? 0.0 : _sizeY
		]);
}
