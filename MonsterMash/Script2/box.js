function Box(in_origin, in_width, in_height)
{
	if ( !(this instanceof Box) )
		alert("Box: call constuctor with new keyword");	

	var m_origin = in_origin.Clone();
	var m_width = in_width || 0.0;
	var m_height = in_height || 0.0;
	var that = this;
	
	this.GetWidth = function()
	{
		return m_width;
	};
	this.SetWidth = function(in_width)
	{
		m_width = in_width;
	};
	this.GetHeight = function()
	{
		return m_height;
	};
	this.SetHeight = function(in_height)
	{
		m_height = in_height;
	};
	this.GetLeft = function()
	{
		return m_origin.m_x - (m_width * 0.5);
	};
	this.GetTop = function()
	{
		return m_origin.m_y - (m_height * 0.5);
	};
	this.GetRight = function()
	{
		return m_origin.m_x + (m_width * 0.5);
	};
	this.GetBottom = function()
	{
		return m_origin.m_y + (m_height * 0.5);
	};
	
    this.Clone = function()
    {
    	return new Box(m_origin, m_width, m_height);
    };

    this.Collide = function(in_unknown)
    {
    	return in_unknown.CollideBox(this);
    };

    this.CollideVector = function(in_vector)
    {
    	return CollisionBoxPoint(
    		that.GetLeft(),
    		that.GetTop(),
    		that.GetRight(),
    		that.GetBottom(),
    		in_vector.m_x,
    		in_vector.m_y
    		);
    };

    this.CollideBox = function(in_box)
    {
    	return CollisionBoxBox(
    		that.GetLeft(),
    		that.GetTop(),
    		that.GetRight(),
    		that.GetBottom(),
    		in_box.GetLeft(),
    		in_box.GetTop(),
    		in_box.GetRight(),
    		in_box.GetBottom()
    		);
    };

    this.CollideCircle = function(in_circle)
    {
    	var circleOrigin = in_circle.GetOrigin();
    	return CollisionBoxCircle(
    		that.GetLeft(),
    		that.GetTop(),
    		that.GetRight(),
    		that.GetBottom(),
    		circleOrigin.m_x,
    		circleOrigin.m_y,
    		in_circle.GetRadius()
    		);
    };

    this.DrawOutline = function(in_canvas, in_context, in_strokeStyle, in_strokeThickess)
    {
    	in_context.lineWidth = in_strokeThickess;
    	in_context.strokeStyle = in_strokeStyle;
    	in_context.strokeRect(
    		that.GetLeft(),
    		that.GetTop(),
    		m_width,
    		m_height
    		);	
    };

    this.DrawFill = function(in_canvas, in_context, in_fillStyle)
    {
    	in_context.fillStyle = in_fillStyle;
    	in_context.fillRect(
    		that.GetLeft(),
    		that.GetTop(),
    		m_width,
    		m_height
    		);	
    };
    this.ExtentToIncludePoint = function(in_vector)
    {
    	m_width = Math.Max(Math.Abs(in_vector.m_x - m_origin.m_x) * 2.0, m_width);
    	m_height = Math.Max(Math.Abs(in_vector.m_y - m_origin.m_y) * 2.0, m_height);
    };
    
    this.SetOrigin = function(in_vector)
    {
    	m_origin = in_vector.Clone();
    };

    this.GetOrigin = function()
    {
    	return m_origin.Clone();
    };
}

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
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
			return "Fail:Box";
		return "Pass:Box";
	};

	g_arrayUnitTest.push(out_object);
}
