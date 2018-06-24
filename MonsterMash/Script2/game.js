/////////////////////////////////////////////////////////////////////////////////////////
//class Game
/////////////////////////////////////////////////////////////////////////////////////////
function Game()
{
	var m_gameMode = undefined;

	this.SetGameMode = function(in_newGameMode)
	{
		m_gameMode = in_newGameMode;
	};
	this.GetGameMode = function()
	{
		return m_gameMode;
	};
	
	this.Input = function(in_input)
	{
		if (m_gameMode && m_gameMode.Input)
			m_gameMode.Input(this, in_input);
	};
	this.Tick = function(in_timeDelta)
	{
		if (m_gameMode && m_gameMode.Tick)
			m_gameMode.Tick(in_timeDelta);
	};
	this.Draw = function(in_canvasParam, in_contextParam)
	{
		if (m_gameMode && m_gameMode.Draw)
			m_gameMode.Draw(in_canvasParam, in_contextParam);
	};
	
}

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
			var game = new Game();
			result = (null != game);	
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:Game";
		
		return "Pass:Game";
	};

	g_arrayUnitTest.push(out_object);
}