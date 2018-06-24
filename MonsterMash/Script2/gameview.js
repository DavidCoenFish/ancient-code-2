/////////////////////////////////////////////////////////////////////////////////////////
//class GameView
/////////////////////////////////////////////////////////////////////////////////////////
//note: game coordinates have zero at bottom of the screen 
function GameView(
	in_screenWidth,
	in_screenHeight,
	in_gameWidth,
	in_gameHeight,
	in_gameViewOrigin,
	in_viewScale)
{
	if (!(this instanceof GameView))
		alert("GameView: call constuctor with new keyword");

	var m_screenWidth = in_screenWidth; // ie 640
	var m_screenHeight = in_screenHeight; // ie 480
	var m_gameWidth = in_gameWidth;
	var m_gameHeight = in_gameHeight;
	var m_gameViewOrigin = in_gameViewOrigin.Clone(); // in game space
	var m_viewScale = in_viewScale; // game * scale = screen
	
	this.GameToScreenScalar = function(in_game)
	{
		return (in_game * m_viewScale);
	};
	
	this.ScreenToGameScalar = function(in_screen)
	{
		return (in_screen / m_viewScale);
	};

	this.GameToScreenX = function(in_gameX)
	{
		return ((in_gameX - m_gameViewOrigin.m_x) * m_viewScale)
				+ (m_screenWidth * 0.5);
	};
	
	this.GameToScreenY = function(in_gameY)
	{
		return ((m_gameViewOrigin.m_y - in_gameY) * m_viewScale)
				+ (m_screenHeight * 0.5);
	};

	this.ScreenToGameX = function(in_screenX)
	{
		return (((in_screenX - (m_screenWidth * 0.5)) / m_viewScale) + m_gameViewOrigin.m_x);
	};

	this.ScreenToGameY = function(in_screenY)
	{
		return (m_gameViewOrigin.m_y - ((in_screenY - (m_screenHeight * 0.5)) / m_viewScale));
	};
	
	this.MoveView = function(
		in_screenDelta,
		in_zoomFactor)
	{
		// limit zoom
		m_viewScale *= in_zoomFactor;
		var minScale = Math.max(
			(m_screenWidth / m_gameWidth),
			(m_screenHeight / m_gameHeight));

		m_viewScale = Math.min(s_gameViewMaximumScale, m_viewScale);
		m_viewScale = Math.max(minScale, m_viewScale);

		// delta x
		var halfWidth = (m_screenWidth * 0.5) / m_viewScale;
		m_gameViewOrigin.m_x += (in_screenDelta.m_x / m_viewScale);
		m_gameViewOrigin.m_x = Math.max(halfWidth, m_gameViewOrigin.m_x);
		m_gameViewOrigin.m_x = Math.min(m_gameWidth - halfWidth, m_gameViewOrigin.m_x);

		// delta y
		var halfHeight = (m_screenHeight * 0.5) / m_viewScale;
		m_gameViewOrigin.m_y += (in_screenDelta.m_y / m_viewScale);
		m_gameViewOrigin.m_y = Math.max(halfHeight, m_gameViewOrigin.m_y);
		m_gameViewOrigin.m_y = Math.min(m_gameHeight - halfHeight, m_gameViewOrigin.m_y);
	};
	
	this.MoveView(new Vector(), 1.0);
}


function ButtonZoomPlusFactory(in_gameView, in_canvas)
{
	var callback = {};
	callback.m_gameView = in_gameView;
	callback.Run = function(in_button)
	{
		this.m_gameView.MoveView(new Vector(), 2.0);
	};
	return ButtonFactory(
		callback,
		"+",
		in_canvas.width - 24,
		8,
		in_canvas.width - 8,
		24
		);
}

function ButtonZoomMinusFactory(in_gameView, in_canvas)
{
	var callback = {};
	callback.m_gameView = in_gameView;
	callback.Run = function(in_button)
	{
		this.m_gameView.MoveView(new Vector(), 0.5);
	};
	return ButtonFactory(
		callback,
		"-",
		in_canvas.width - 24,
		32,
		in_canvas.width - 8,
		48
		);
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
			return "Fail:GameView";
		return "Pass:GameView";
	};

	g_arrayUnitTest.push(out_object);
}
