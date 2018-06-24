//vector3.js

function Vector3(in_x, in_y, in_z)
{
	//DEBUG if ( !(this instanceof Vector3) )
	//DEBUG {
	//DEBUG 	alert("Vector3: call constuctor with new keyword");	
	//DEBUG }
	
	in_x = in_x || 0.0;
	in_y = in_y || 0.0;
	in_z = in_z || 0.0;

	this.m_x = in_x;
	this.m_y = in_y;
	this.m_z = in_z;
}

Vector3.prototype.DotProduct = function(in_rhs)
{
	return (this.m_x * in_rhs.m_x) + (this.m_y * in_rhs.m_y) + (this.m_z * in_rhs.m_z);
}

Vector3.prototype.LengthSquared = function()
{
	return this.DotProduct(this);
}

Vector3.prototype.Length = function()
{
    return Math.sqrt(this.LengthSquared());
}

Vector3.prototype.Normalise = function()
{
    var value = this.Length(); 
    if (0.0 != value)
    {
      this.m_x /= value;
      this.m_y /= value;
      this.m_z /= value;
    }
    return value;
}

//-- END // End Concatinate, unit test or other follows