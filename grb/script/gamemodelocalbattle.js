//gamemodelocalbattle.js

function GameModeLocalBattle(in_game)
{
	//DEBUG if ( !(this instanceof GameModeLocalBattle) )
	//DEBUG {
	//DEBUG 	alert("GameModeLocalBattle: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_game = in_game;
	var m_localBattleIndex = -1;
	
	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("LOCAL BATTLE", new Vector(4, 4)));

	var arrayListData = [
		new GuiListData("Battle 0", 0, false),
		new GuiListData("Battle 1", 1, false),
		new GuiListData("Battle 2", 2, false),
		new GuiListData("Battle 3", 3, false),
		new GuiListData("Battle 4", 4, false),
		new GuiListData("Battle 5", 5, false),
		new GuiListData("Battle 6", 6, false),
		new GuiListData("Battle 7", 7, false),
		new GuiListData("Battle 8", 8, false),
		new GuiListData("Battle 9", 9, false)
		];

	var m_guiList = new GuiList(
		new Vector(95, 70), //95, 70), 
		new Vector(186, 50), //(190, 50), 
		arrayListData, 
		10, 
		in_game.m_context, 
		this, 
		"", 
		"CallbackListClick"
		);
	m_arrayGui.push(m_guiList);
	
	m_arrayGui.push(new GuiText("Value:", new Vector(335, 535), GuiTextGetSmallFont()));
	var m_textValue = new GuiText("0", new Vector(400, 535), GuiTextGetSmallFont());
	m_arrayGui.push(m_textValue);
	
	m_arrayGui.push(new GuiText("HighScore:", new Vector(335, 560), GuiTextGetSmallFont()));
	var m_textHighscore = new GuiText("0", new Vector(400, 560), GuiTextGetSmallFont());
	m_arrayGui.push(m_textHighscore);
	
	var m_buttonFight = new GuiButton("DEPLOY", new Vector(479, 530), new Vector(182, 40), this, "CallbackFight", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas)
	m_arrayGui.push(m_buttonFight);

	//new Vector(-4.125, -1.75),
	
	var m_battleViewOpponent = new GuiGameBattleView(
		new Vector(285, 70),
		new Vector(380, 380),
		new Vector(30, 30),
		new Vector(-3.5, -2.3),
		"#331607"
		);	
 	m_arrayGui.push(m_battleViewOpponent);



	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode();
	}
	this.CallbackFight = function(in_button)
	{
		var arrayDeployedPlayer = m_game.GetLocalBattelDeployedPlayer(m_localBattleIndex);

		m_game.PushGameMode(new GameModeDeploy(
			m_game, 
			arrayDeployedPlayer,
			m_game.GetLocalBattelParty(m_localBattleIndex),
			m_game.GetLocalBattelDeployedOpponent(m_localBattleIndex)
			));
	}
	
	this.CallbackListClick = function(in_button)
	{
		SetBattle(in_button.m_key);
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
	
	///////////////////////////////////////////////////////
	//private methods
	function SetBattle(in_battleIndex)
	{
		m_localBattleIndex = in_battleIndex;
		m_guiList.ClearSelectedAll();
		m_guiList.SetSelected(in_battleIndex, true);		
		
		var opponentBattleParty = m_game.GetLocalBattelParty(in_battleIndex); 
		var opponentDeployed = m_game.GetLocalBattelDeployedOpponent(in_battleIndex); 
		m_battleViewOpponent.ClearCharacterData();
		
		if (opponentDeployed)
		{
			opponentDeployed.forEach(function(in_item)
			{
				var character = opponentBattleParty[in_item.m_key];
				m_battleViewOpponent.AddCharacter(
					character, 
					in_item.m_key, 
					m_battleViewOpponent.ConvertMeterToPixelPos(in_item.m_position), 
					true
					);
			}); 		
		}
	
		m_textValue.m_text = "" + m_battleViewOpponent.GetCostAll();
	}


	SetBattle(m_game.m_localBattleIndex);
}

//-- END // End Concatinate, unit test or other follows


