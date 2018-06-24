/////////////////////////////////////////////////////////////////////////////
//private methods
function OnPageLoad()
{
	var that = this;
	var m_canvas = document.getElementById('canvasId');
	var m_context = m_canvas.getContext('2d');
	var m_input = new Input();
	var m_game = new Game();
	m_game.SetGameMode(FactoryFirstGameMode(m_canvas, m_context));
	var m_time = undefined;

	m_canvas.addEventListener("mousedown", this.CallbackMouseDown, false);
	document.body.addEventListener("mouseup", this.CallbackMouseUp, false);
	m_canvas.addEventListener("mousemove", this.CallbackMouseMove, false);
	m_canvas.addEventListener("touchstart", this.CallbackTouch, false);
	m_canvas.addEventListener("touchmove", this.CallbackTouch, false);
	m_canvas.addEventListener("touchend", this.CallbackTouch, false);
	document.body.addEventListener("touchcancel", this.CallbackTouch, false);

	this.CallbackInterval = function()
	{
		var timeDelta = 0.0;
		if (undefined == m_time)
			m_time = (new Date()).getTime();
		else
		{
			var newTime = (new Date()).getTime();
			timeDelta = (newTime - m_time) / 1000.0;
			m_time = newTime;
		}

		// limit frame rate to 10fps, else you can get a massive delta while away
		// from the page
		timeDelta = Math.min(0.1, timeDelta);

		m_input.Tick(timeDelta);
		m_game.Input(m_input);
		m_game.Tick(timeDelta);
		m_game.Draw(m_canvas, m_context);

		setTimeout(that.CallbackInterval, 0);
	};

	this.CallbackMouseDown = function(in_event)
	{
		m_input.MouseDown();
	};
	
	this.CallbackMouseUp = function(in_event)
	{
		m_input.MouseUp();
	};
	
	this.CallbackMouseMove = function(in_event)
	{
		m_input.MoveMouse(new Vector(
			in_event.pageX - m_canvas.offsetLeft,
			in_event.pageY - m_canvas.offsetTop));
	};
	
	this.CallbackTouch = function(in_event)
	{
		in_event.preventDefault();
		m_input.ClearTouches();

		in_event.targetTouches.forEach(function(in_touch)
		{
			m_input.AddTouch(new Vector(
				in_touch.pageX - m_canvas.offsetLeft,
				in_touch.pageY - m_canvas.offsetTop));
		});
	};
	
	this.CallbackInterval();	
}