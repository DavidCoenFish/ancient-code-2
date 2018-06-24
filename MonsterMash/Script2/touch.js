function Touch(in_position, in_state)
{
	if (!(this instanceof Touch))
		alert("Touch: call constuctor with new keyword");

	var m_position = in_position.Clone();
	var m_positionOld = in_position.Clone();
	var m_state = in_state;
	var m_consumedFlag = false;
	var m_edge = false; //change state from up to down this frame
	var m_doubleClick = false;
	var m_timeInState = 0.0;
	var m_timeSinceLastTouch = 0.0;
	
	this.Tick = function(in_timeDelta)
	{
		m_positionOld = m_position.Clone();
		m_timeInState += in_timeDelta;
		m_timeSinceLastTouch += in_timeDelta;
		m_edge = false;
		m_doubleClick = false;
		m_consumedFlag = false;
	};

	this.GetPositionOld = function()
	{
		return m_positionOld.Clone();
	};	
	this.GetPosition = function()
	{
		return m_position.Clone();
	};
	this.SetPosition = function(in_position)
	{
		m_position.in_position = Clone();
	};
	this.GetState = function()
	{
		return m_state;
	};
	this.SetState = function(in_state)
	{
		if (m_state != in_state)
		{
			m_edge = true;
			
			m_timeInState = 0.0;
		};
		
	};
	
	
	
	
}

Touch.prototype.StateEnum = {
	"eTouchDown" : 0, // touch screen or mouse click down
	"eTouchUp" : 1, // mouse can have touch up (no click, just cursor on screen)
	"eNone" : 2
// no touch for this finger
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
			return "Fail:Touch";
		return "Pass:Touch";
	};

	g_arrayUnitTest.push(out_object);
}