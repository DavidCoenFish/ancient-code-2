//gamemodeunlockskill.js

function GameModeUnlockSkill(in_game)
{
	//DEBUG if ( !(this instanceof GameModeUnlockSkill) )
	//DEBUG {
	//DEBUG 	alert("GameModeUnlockSkill: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_game = in_game;

	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("UNLOCK SKILL", new Vector(4, 4)));

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode();
	}

	
	this.Begin = function()
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Reset){ in_item.Reset(); } });	
	}
	this.End = function()
	{
	}	
	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	}
}

//-- END // End Concatinate, unit test or other follows


