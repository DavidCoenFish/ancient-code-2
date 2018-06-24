function NGon(in_origin, in_scale, in_arrayArrayVector)
{
	if (!(this instanceof NGon))
		alert("NGon: call constuctor with new keyword");

	var m_origin = in_origin.Clone();
	var m_arrayArrayVector = [];
	var m_scale = in_scale;
	var m_bounds = new Box(in_origin);

	this.SetData(in_arrayArrayVector);

	this.SetData = function(in_arrayArrayVectorParam)
	{
		m_arrayArrayVector = [];
		m_bounds = new Box(m_origin);
		for ( var index = 0; index < in_arrayArrayVectorParam.length; ++index)
		{
			var arrayVector = in_arrayArrayVectorParam[index];
			var copyArray = [];
			for ( var subIndex = 0; subIndex < arrayVector.length; ++subIndex)
			{
				var vector = arrayVector[subIndex].Clone();
				copyArray.push(vector);
				m_bounds.ExtentToIncludePoint(vector);
			}
			m_arrayArrayVector.push(copyArray);
		}
	};

	this.Clone = function()
	{
		return new NGon(m_origin, m_scale, m_arrayArrayVector);
	};

	this.DrawOutline = function(in_canvas, in_context, in_strokeStyle, in_strokeThickess)
	{
		in_context.lineWidth = in_strokeThickess;
		in_context.strokeStyle = in_strokeStyle;

		CommonDraw(in_context);

		in_context.closePath();
		in_context.stroke();

	};

	this.DrawFill = function(in_canvas, in_context, in_fillStyle)
	{
		in_context.fillStyle = in_fillStyle;

		CommonDraw(in_context);

		in_context.closePath();
		in_context.fill();
	};

	this.SetOrigin = function(in_vector)
	{
		m_origin = in_vector.Clone();
		m_bounds.SetOrigin(in_vector);
	};

	this.GetOrigin = function()
	{
		return m_origin.Clone();
	};

	this.Collide = function(in_unknown)
	{
		return in_unknown.CollideBox(m_bounds);
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

	function CommonDraw(in_context)
	{
		for ( var index = 0; index < m_arrayArrayVector.length; ++index)
		{
			var arrayVector = m_arrayArrayVector[index];

			in_context.moveTo(
				m_origin.m_x + (arrayVector[0].m_x * m_scale),
				m_origin.m_y + (arrayVector[0].m_y * m_scale));

			for ( var subIndex = 1; subIndex < arrayGameXY.length; ++subIndex)
			{
				in_context.lineTo(m_origin.m_x
						+ (arrayVector[subIndex].m_x * m_scale), m_origin.m_y
						+ (arrayVector[subIndex].m_y * m_scale));
			}
		}
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
			return "Fail:NGon";
		return "Pass:NGon";
	};

	g_arrayUnitTest.push(out_object);
}