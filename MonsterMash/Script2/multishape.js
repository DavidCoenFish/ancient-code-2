function MultiShape(in_origin, in_shapeArray)
{
	if (!(this instanceof MultiShape))
		alert("MultiShape: call constuctor with new keyword");

	var m_origin = in_origin.Clone();
	var m_shapeArray = [];

	for ( var index = 0; index < in_shapeArray.length; ++index)
	{
		this.m_shapeArray.push(in_shapeArray[index].Clone());
	}

	this.Clone = function()
	{
		return new MultiShape(m_origin, m_shapeArray);
	};

	this.DrawOutline = function(in_canvas, in_context, in_strokeStyle, in_strokeThickess)
	{
		m_shapeArray.forEach(function(in_shape)
		{
			in_shape.DrawOutline(in_canvas, in_context, in_strokeStyle, in_strokeThickess);
		});
	};

	this.DrawFill = function(in_canvas, in_context, in_fillStyle)
	{
		m_shapeArray.forEach(function(in_shape)
		{
			in_shape.DrawFill(in_canvas, in_context, in_fillStyle);
		});
	};

	this.SetOrigin = function(in_vector)
	{
		var deltaX = in_vector.m_x - m_origin.m_x;
		var deltaY = in_vector.m_y - m_origin.m_y;

		m_origin = in_vector.Clone();

		// a bit of smoke and mirrors, and shape origin is absolute
		m_shapeArray.forEach(function(in_shape)
		{
			var shapeOrigin = in_shape.GetOrigin();
			shapeOrigin.m_x += deltaX;
			shapeOrigin.m_y += deltaY;
			in_shape.SetOrigin(shapeOrigin);
		});
	};

	this.GetOrigin = function()
	{
		return this.m_origin.Clone();
	};

	this.Collide = function(in_unknown)
	{
		var result = false;
		m_shapeArray.forEach(function(in_shape)
		{
			if (true == result)
				return;
			result |= in_shape.Collide(in_unknown);
		});

		return result;
	};

	this.CollideVector = function(in_vector)
	{
		var result = false;
		m_shapeArray.forEach(function(in_shape)
		{
			if (true == result)
				return;
			result |= in_shape.CollideVector(in_vector);
		});

		return result;
	};

	this.CollideBox = function(in_box)
	{
		var result = false;
		m_shapeArray.forEach(function(in_shape)
		{
			if (true == result)
				return;
			result |= in_shape.CollideBox(in_box);
		});

		return result;
	};

	this.CollideCircle = function(in_circle)
	{
		var result = false;
		m_shapeArray.forEach(function(in_shape)
		{
			if (true == result)
				return;
			result |= in_shape.CollideCircle(in_circle);
		});

		return result;
	};

};

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:MultiShape";
		return "Pass:MultiShape";
	};

	g_arrayUnitTest.push(out_object);
}