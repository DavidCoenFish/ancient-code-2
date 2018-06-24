//vector.js

function Vector(in_x, in_y)
{
	//DEBUG if ( !(this instanceof Vector) )
	//DEBUG {
	//DEBUG 	alert("Vector: call constuctor with new keyword");	
	//DEBUG }
	
	in_x = in_x || 0.0;
	in_y = in_y || 0.0;

	this.m_x = in_x;
	this.m_y = in_y;
}

Vector.prototype.DotProduct = function(in_rhs)
{
	return (this.m_x * in_rhs.m_x) + (this.m_y * in_rhs.m_y);
}

Vector.prototype.LengthSquared = function()
{
	return this.DotProduct(this);
}

Vector.prototype.Length = function()
{
    return Math.sqrt(this.LengthSquared());
}

Vector.prototype.Normalise = function()
{
    var value = this.Length(); 
    if (0.0 != value)
    {
      this.m_x /= value;
      this.m_y /= value;
    }
    return value;
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//construction
		if (true == result)
		{
			var vector1 = new Vector(1.0, 2.0);
			var vector2 = new Vector(3.0, 4.0);
			
			result &= (1.0 == vector1.m_x);
			result &= (2.0 == vector1.m_y);
			result &= (3.0 == vector2.m_x);
			result &= (4.0 == vector2.m_y);
		}

		//method DotProduct
		if (true == result)
		{
			var vector1 = new Vector(1.0, 2.0);
			var vector2 = new Vector(3.0, 4.0);
			
			result &= (11.0 == vector1.DotProduct(vector2));
			result &= (11.0 == vector2.DotProduct(vector1));
		}
		
		//method LengthSquared
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			
			result &= (25.0 == vector.LengthSquared());
		}
		
		//method Length
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			
			result &= (5.0 == vector.Length());
		}		

		//method Normalise
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			
			result &= (5.0 == vector.Normalise());
			result &= (0.6 == vector.m_x);
			result &= (0.8 == vector.m_y);
		}	
			
		if (true != result)
		{
			return "Fail:Vector";
		}
		return "Pass:Vector";
	}
	
	g_arrayUnitTest.push(out_object);
}

