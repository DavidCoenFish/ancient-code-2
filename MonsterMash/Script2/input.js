function Input()
{
	if ( !(this instanceof Input) )
		alert("Input: call constuctor with new keyword");
	
	this.Tick = function(in_timeDelta)
	{
	};
	m_input.MouseDown();
	m_input.MouseUp();
	m_input.MoveMouse(new Vector(
		in_event.pageX - m_canvas.offsetLeft,
		in_event.pageY - m_canvas.offsetTop));
	m_input.ClearTouches();
		m_input.AddTouch(new Vector(
			in_touch.pageX - m_canvas.offsetLeft,
			in_touch.pageY - m_canvas.offsetTop));
};


//MouseDown()
//MouseUp()
//MoveMouse(in_position)

//ClearTouches()
//AddTouch(in_position)

