DSC.Math.Coordinate = function(_percentageX, _percentageY, _percentageType, _pixelX, _pixelY)
{
	if ( !(this instanceof DSC.Math.Coordinate) )
		alert("Gui.Coordinate: call constuctor with new keyword");	

	this.SetRaw(
		(undefined == _percentageX) ? 0.0 : _percentageX,
		(undefined == _percentageY) ? 0.0 : _percentageY,
		(undefined == _percentageType) ? DSC.Math.Coordinate.s_percentageType.e_percentage : _percentageType,
		(undefined == _pixelX) ? 0 : _pixelX,
		(undefined == _pixelY) ? 0 : _pixelY
		);
}

DSC.Math.Coordinate.s_percentageType = 
{
	"e_percentage" : 0,
	"e_useMaximum" : 1, //origin bottom left
	"e_useMinimum" : 2, //origin bottom left
	"e_useMaximumCenter" : 3,
	"e_useMinimumCenter" : 4,
	"e_useMaximumTop" : 5, //origin top right
	"e_useMinimumTop" : 6, //origin top right
	"e_useAxisX" : 7, //origin bottom left
	"e_useAxisY" : 8, //origin bottom left
	"e_useAxisXCenter" : 9,
	"e_useAxisYCenter" : 10,
	"e_useAxisXTop" : 11, //origin top right
	"e_useAxisYTop" : 12, //origin top right
}

DSC.Math.Coordinate.prototype.toString = function()
{
	return "Math.Coordinate m_percentageX:" + this.m_percentageX + 
	" m_percentageY:" + this.m_percentageY + 
	" m_percentageType:" + this.m_percentageType + 
	" m_pixelX:" + this.m_pixelX + 
	" m_pixelY:" + this.m_pixelY + 
	" { " + ObjectBase.prototype.toString.call(this) + " }";
}

DSC.Math.Coordinate.prototype.Clone = function(inout_result)
{
	if (undefined != inout_result)
	{
		inout_result.SetRaw(this.m_percentageX, this.m_percentageY, this.m_percentageType, this.m_pixelX, this.m_pixelY);
		return inout_result;
	}
	return DSC.Math.Coordinate.FactoryRaw(this.m_percentageX, this.m_percentageY, this.m_percentageType, this.m_pixelX, this.m_pixelY);
}

DSC.Math.Coordinate.prototype.SetRaw = function(in_percentageX, in_percentageY, in_percentageType, in_pixelX, in_pixelY)
{
	this.m_percentageX = in_percentageX;
	this.m_percentageY = in_percentageY;
	this.m_percentageType = in_percentageType;
	this.m_pixelX = in_pixelX;
	this.m_pixelY = in_pixelY;
}

DSC.Math.Coordinate.prototype.CalculateX = function(in_originX, in_originY, in_sizeX, in_sizeY)
{
	var size = in_sizeX;
	var origin = in_originX;
	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
		origin += size * 0.5;
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		origin += size;
		break;
	}
		
	switch (this.m_percentageType)
	{
	default:
	case DSC.Math.Coordinate.s_percentageType.e_percentage:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisX:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximum:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
		size = Math.max(size, in_sizeY);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMinimum:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
		size = Math.min(size, in_sizeY);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useAxisY:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		size = in_sizeY;
		break;
	}

	var result = origin + (this.m_percentageX * size) + this.m_pixelX;
	return result;
}

DSC.Math.Coordinate.prototype.CalculateY = function(in_originX, in_originY, in_sizeX, in_sizeY)
{
	var result = 0;
	var size = in_sizeY;
	var origin = in_originY;
	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
		origin += size * 0.5;
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		origin += size;
		break;
	}
		
	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximum:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
		size = Math.max(size, in_sizeX);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMinimum:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
		size = Math.min(size, in_sizeX);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useAxisX:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
		size = in_sizeX;
		break;
	}

	result = origin + (this.m_percentageY * size) + this.m_pixelY;
	return result;
}

DSC.Math.Coordinate.prototype.CalculateSizeX = function(in_sizeX, in_sizeY)
{
	var result = 0;
	var size = in_sizeX;
	var origin = 0;
	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
		origin += size * 0.5;
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		origin += size;
		break;
	}

	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximum:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
		size = Math.max(size, in_sizeY);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMinimum:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
		size = Math.min(size, in_sizeY);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useAxisY:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		size = in_sizeY;
		break;
	}

	result = origin + (this.m_percentageX * size) + this.m_pixelX;
	return result;
}

DSC.Math.Coordinate.prototype.CalculateSizeY = function(in_sizeX, in_sizeY)
{
	var result = 0;
	var size = in_sizeY;
	var origin = 0;
	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYCenter:
		origin += size * 0.5;
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisYTop:
		origin += size;
		break;
	}

	switch (this.m_percentageType)
	{
	default:
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMaximum:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMaximumTop:
		size = Math.max(size, in_sizeX);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useMinimum:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useMinimumTop:
		size = Math.min(size, in_sizeX);
		break;
	case DSC.Math.Coordinate.s_percentageType.e_useAxisX:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXCenter:
	case DSC.Math.Coordinate.s_percentageType.e_useAxisXTop:
		size = in_sizeX;
		break;
	}

	result = origin + (this.m_percentageY * size) + this.m_pixelY;
	return result;
}

DSC.Math.Coordinate.AlmostEqual = function(in_lhs, in_rhs, _epsilon)
{
	return DSC.Math.Coordinate.AlmostEqualRaw(
		in_lhs.m_percentageType, 
		in_rhs.m_percentageType,
		in_lhs.m_percentageX, 
		in_rhs.m_percentageX, 
		in_lhs.m_percentageY,
		in_rhs.m_percentageY,
		in_lhs.m_pixelX,
		in_rhs.m_pixelX,
		in_lhs.m_pixelY,
		in_rhs.m_pixelY,
		_epsilon
		);
}

DSC.Math.Coordinate.AlmostEqualRaw = function(
	in_lhsPercentageType, 
	in_rhsPercentageType,
	in_lhsPercentageX, 
	in_rhsPercentageX, 
	in_lhsPercentageY,
	in_rhsPercentageY,
	in_lhsPixelX,
	in_rhsPixelX,
	in_lhsPixelY,
	in_rhsPixelY,
	_epsilon
	)
{
	return (
		(in_lhsPercentageType == in_rhsPercentageType) &&
		(DSC.Math.AlmostEqual(in_lhsPercentageX, in_rhsPercentageX, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsPercentageY, in_rhsPercentageY, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsPixelX, in_rhsPixelX, _epsilon)) &&
		(DSC.Math.AlmostEqual(in_lhsPixelY, in_rhsPixelY, _epsilon))
		);
}


DSC.Math.Coordinate.FactoryRaw = function(_percentageX, _percentageY, _percentageType, _pixelX, _pixelY)
{
	return new DSC.Math.Coordinate(_percentageX, _percentageY, _percentageType, _pixelX, _pixelY);
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

		//construction
		if (true == result)
		{
			var gui0 = DSC.Math.Coordinate.FactoryRaw();
			var gui1 = DSC.Math.Coordinate.FactoryRaw(
				0.1, 
				0.2, 
				DSC.Math.Coordinate.s_percentageType.e_useMaximum,
				10,
				11
				);

			result &= (0.0 == gui0.m_percentageX);
			result &= (0.0 == gui0.m_percentageY);
			result &= (DSC.Math.Coordinate.s_percentageType.e_percentage == gui0.m_percentageType);
			result &= (0 == gui0.m_pixelX);
			result &= (0 == gui0.m_pixelY);

			result &= (0.1 == gui1.m_percentageX);
			result &= (0.2 == gui1.m_percentageY);
			result &= (DSC.Math.Coordinate.s_percentageType.e_useMaximum == gui1.m_percentageType);
			result &= (10 == gui1.m_pixelX);
			result &= (11 == gui1.m_pixelY);

			if (!result)
				return "Fail: Math.Coordinate construction";
		}

		//CalculateX(in_left, in_top, in_width, in_height)
		{
			var gui0 = DSC.Math.Coordinate.FactoryRaw();
			var gui1 = DSC.Math.Coordinate.FactoryRaw(
				0.25, 
				0.75, 
				DSC.Math.Coordinate.s_percentageType.e_useMaximum,
				10,
				20
				);

			result &= DSC.Math.AlmostEqual(0, gui0.CalculateX(0, 0, 0, 0));
			result &= DSC.Math.AlmostEqual(100, gui0.CalculateX(100, 200, 300, 400));

			result &= DSC.Math.AlmostEqual(10, gui1.CalculateX(0, 0, 0, 0));
			//100 + 400 * 0.25 + 10
			result &= DSC.Math.AlmostEqual(210, gui1.CalculateX(100, 200, 300, 400));
			
			if (!result)
				return "Fail: Math.Coordinate CalculateX";
		}

		//CalculateY(in_left, in_top, in_width, in_height)
		{
			var gui0 = DSC.Math.Coordinate.FactoryRaw();
			var gui1 = DSC.Math.Coordinate.FactoryRaw(
				0.25, 
				0.75, 
				DSC.Math.Coordinate.s_percentageType.e_useMaximum,
				10,
				20
				);

			result &= DSC.Math.AlmostEqual(0, gui0.CalculateY(0, 0, 0, 0));
			result &= DSC.Math.AlmostEqual(200, gui0.CalculateY(100, 200, 300, 400));

			result &= DSC.Math.AlmostEqual(20, gui1.CalculateY(0, 0, 0, 0));
			//200 + 400 * 0.75 = 20
			result &= DSC.Math.AlmostEqual(520, gui1.CalculateY(100, 200, 300, 400));
			
			if (!result)
				return "Fail: Math.Coordinate CalculateY";
		}
		return "Pass: Math.Coordinate";
	}
	
	DSC.g_arrayUnitTest.push(out_object);
}

