function Vector(in_x, in_y)
{
	if ( !(this instanceof Vector) )
		alert("Vector: call constuctor with new keyword");	
	this.m_x = in_x || 0.0;
	this.m_y = in_y || 0.0;
}

Vector.prototype.Clone = function()
{
	return new Vector(this.m_x, this.m_y);
};

Vector.prototype.DotProduct = function(in_rhs)
{
	return (this.m_x * in_rhs.m_x) + (this.m_y * in_rhs.m_y);
};

Vector.prototype.LengthSquared = function()
{
	return this.DotProduct(this);
};

Vector.prototype.Length = function()
{
    return Math.sqrt(this.LengthSquared());
};

Vector.prototype.Normalise = function()
{
    var value = this.Length(); 
    if (0.0 != value)
    {
      this.m_x /= value;
      this.m_y /= value;
    }
    return value;
};

Vector.prototype.Collide = function(in_unknown)
{
	return in_unknown.CollideVector(this);
};

Vector.prototype.CollideVector = function(in_vector)
{
	return CollisionPointPoint(
		this.m_x,
		this.m_y,
		in_vector.m_x,
		in_vector.m_y);
};

Vector.prototype.CollideBox = function(in_box)
{
	return CollisionBoxPoint(
		in_box.GetLeft(),
		in_box.GetTop(),
		in_box.GetRight(),
		in_box.GetBottom(),
		this.m_x,
		this.m_y);
};

Vector.prototype.CollideCircle = function(in_circle)
{
	var circleOrigin = in_circle.GetOrigin();	
	return CollisionCirclePoint(
		circleOrigin.m_x,
		circleOrigin.m_y,
		in_circle.GetRadius(),
		this.m_x, 
		this.m_y);
};

Vector.prototype.DrawOutline = function(in_strokeStyle, in_strokeThickess)
{
	g_context.lineWidth = in_strokeThickess;
	g_context.strokeStyle = in_strokeStyle;
	g_context.strokeRect(
		this.m_x - 0.5,
		this.m_y - 0.5,
		1.0,
		1.0);
};

Vector.prototype.DrawFill = function(in_fillStyle)
{
	g_context.fillStyle = in_fillStyle;
	g_context.fillRect(
		this.m_x - 0.5,
		this.m_y - 0.5,
		1.0,
		1.0);
};

Vector.prototype.SetOrigin = function(in_vector)
{
	this.m_x = in_vector.m_x;
	this.m_y = in_vector.m_y;
};

Vector.prototype.GetOrigin = function()
{
	return new Vector(this.m_x, this.m_y);
};


//-- END // unit test or other follows
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
			var vector0 = new Vector();
			var vector1 = new Vector(1.0, 2.0);
			var vector2 = new Vector(3.0, 4.0);
			
			result &= (0.0 == vector0.m_x);
			result &= (0.0 == vector0.m_y);
			result &= (1.0 == vector1.m_x);
			result &= (2.0 == vector1.m_y);
			result &= (3.0 == vector2.m_x);
			result &= (4.0 == vector2.m_y);
			if (!result)
				return "Fail construction";
		}

		//method DotProduct
		if (true == result)
		{
			var vector1 = new Vector(1.0, 2.0);
			var vector2 = new Vector(3.0, 4.0);
			
			result &= (11.0 == vector1.DotProduct(vector2));
			result &= (11.0 == vector2.DotProduct(vector1));
			if (!result)
				return "DotProduct";
		}
		
		//method LengthSquared
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			
			result &= (25.0 == vector.LengthSquared());
			if (!result)
				return "LengthSquared";
		}
		
		//method Length
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			var vector1 = new Vector(0.0, 0.0);
			
			result &= (5.0 == vector.Length());
			result &= (0.0 == vector1.Length());
			if (!result)
				return "Length";
		}		

		//method Normalise
		if (true == result)
		{
			var vector = new Vector(3.0, 4.0);
			var vector1 = new Vector(0.0, 0.0);
			
			result &= (5.0 == vector.Normalise());
			result &= (0.6 == vector.m_x);
			result &= (0.8 == vector.m_y);
			result &= (0.0 == vector1.Normalise());
			result &= (0.0 == vector1.m_x);
			result &= (0.0 == vector1.m_y);
			if (!result)
				return "Normalise";
		}	
			
		//Collide = function(in_unknown)
		//CollideVector = function(in_vector)
		if (true == result)
		{
			var vector0 = new Vector(3.0, 4.0);
			var vector1 = new Vector(3.0, 4.0);
			var vector2 = new Vector(3.0, 3.0);
			var vector3 = new Vector(4.0, 4.0);
			var vector4 = new Vector(-4.0, 3.0);
			
			result &= (true == vector0.Collide(vector1));
			result &= (true == vector1.Collide(vector0));
			result &= (false == vector0.Collide(vector2));
			result &= (false == vector0.Collide(vector3));
			result &= (false == vector0.Collide(vector4));
			result &= (true == vector0.Collide(vector0));
			if (!result)
				return "Collide";
		}

		//CollideBox = function(in_box)
		//CollideCircle = function(in_circle)
		//SetOrigin = function(in_vector)
		if (true == result)
		{
			var vector0 = new Vector();
			var vector1 = new Vector(3.0, 4.0);
			vector0.SetOrigin(vector1);
			
			result &= (vector0.m_x == 3.0);
			result &= (vector0.m_y == 4.0);

			vector1.m_x = 5.0;
			vector1.m_y = 6.0;

			result &= (vector0.m_x == 3.0);
			result &= (vector0.m_y == 4.0);
			
			if (!result)
				return "SetOrigin";
		}
		//GetOrigin = function()
		if (true == result)
		{
			var vector0 = new Vector(3.0, 4.0);
			var vector1 = vector0.GetOrigin();
			
			result &= (vector1.m_x == 3.0);
			result &= (vector1.m_y == 4.0);

			vector1.m_x = 0.0;
			vector1.m_y = 5.0;
			
			result &= (vector0.m_x == 3.0);
			result &= (vector0.m_y == 4.0);
			
			if (!result)
				return "GetOrigin";
		}
		
		
		if (true != result)
			return "Fail:Vector";
		return "Pass:Vector";
	};
	
	g_arrayUnitTest.push(out_object);
}

