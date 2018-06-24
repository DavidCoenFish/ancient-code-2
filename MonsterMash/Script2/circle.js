function Circle(in_center, in_radius)
{
	if (!(this instanceof Circle))
		alert("Circle: call constuctor with new keyword");

	var m_center = in_center.Clone();
	var m_radius = in_radius;

	this.GetRadius = function()
	{
		return m_radius;
	};
	this.SetRadius = function(in_radius)
	{
		m_radius = in_radius;
	};

	this.Clone = function()
	{
		return new Circle(m_center, m_radius);
	};

	Circle.prototype.Collide = function(in_unknown)
	{
		return in_unknown.CollideCircle(this);
	};

	Circle.prototype.CollideVector = function(in_vector)
	{
		return CollisionCirclePoint(
			this.m_center.m_x,
			this.m_center.m_y,
			this.m_radius,
			in_vector.m_x,
			in_vector.m_y);
	};

	Circle.prototype.CollideCircle = function(in_circle)
	{
		var circleOrigin = in_circle.GetOrigin();
		return CollisionCircleCircle(
			m_center.m_x,
			m_center.m_y,
			m_radius,
			circleOrigin.m_x,
			circleOrigin.m_y,
			in_circle.GetRadius());
	};

	this.CollideBox = function(in_box)
	{
		return CollisionBoxCircle(
			in_box.GetLeft(),
			in_box.GetTop(),
			in_box.GetRight(),
			in_box.GetBottom(),
			m_center.m_x,
			m_center.m_y,
			m_radius);
	};

	this.DrawOutline = function(in_canvas, in_context, in_strokeStyle, in_strokeThickess)
	{
		in_context.beginPath();
		in_context.arc(
			m_center.m_x,
			m_center.m_y,
			m_radius,
			0.0,
			Math.PI * 2.0,
			true);
		in_context.closePath();

		in_context.lineWidth = in_strokeThickess;
		in_context.strokeStyle = in_strokeStyle;
		in_context.stroke();
	};

	this.DrawFill = function(in_canvas, in_context, in_fillStyle)
	{
		in_context.beginPath();
		in_context.arc(
			m_center.m_x,
			m_center.m_y,
			m_radius,
			0.0,
			Math.PI * 2.0,
			true);
		in_context.closePath();

		in_context.fillStyle = in_fillStyle;
		in_context.fill();
	};

	this.SetOrigin = function(in_vector)
	{
		m_center = in_vector.Clone();
	};

	this.GetOrigin = function()
	{
		return m_center.Clone();
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
			return "Fail:Circle";
		return "Pass:Circle";
	};

	g_arrayUnitTest.push(out_object);
}
