//gamemoderesult.js

function GameModeResult(in_game, in_arrayBattleCharacterData, in_title)
{
	//DEBUG if ( !(this instanceof GameModeResult) )
	//DEBUG {
	//DEBUG 	alert("GameModeResult: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_game = in_game;
	
	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	//m_arrayGui.push(new GuiButton("MAIN", new Vector(574, 44), new Vector(182, 40), this, "CallbackMain", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("BATTLE RESULT", new Vector(4, 4)));
	m_arrayGui.push(new GuiText(in_title, new Vector(380, 4), GuiTextGetDefaultFont(), "center"));

	var m_gradientBackground = m_game.m_context.createLinearGradient(4, 0, 169, 0);
	m_gradientBackground.addColorStop(0.0, "#d2b387");
	m_gradientBackground.addColorStop(0.3, "#e3c69e");
	m_gradientBackground.addColorStop(0.7, "#e3c69c");
	m_gradientBackground.addColorStop(1.0, "#d4b080");	
	m_arrayGui.push(new GuiPanel(
		new Vector(4, 54), 
		new Vector(156, 560), 
		m_gradientBackground, 
		"#2a1102", 
		true, 
		4.0
		));

	var m_gradientBackground2 = m_game.m_context.createLinearGradient(599, 0, 764, 0);
	m_gradientBackground2.addColorStop(0.0, "#d2b387");
	m_gradientBackground2.addColorStop(0.3, "#e3c69e");
	m_gradientBackground2.addColorStop(0.7, "#e3c69c");
	m_gradientBackground2.addColorStop(1.0, "#d4b080");	
	m_arrayGui.push(new GuiPanel(
		new Vector(599, 54), 
		new Vector(156, 560), 
		m_gradientBackground2, 
		"#2a1102", 
		true, 
		4.0
		));

	var m_teamCount = 0;
	var m_opponentCount = 0;
	var m_arrayBattleCharacterData = in_arrayBattleCharacterData;
	
	var m_firstCharacterButton = null;
	
	in_arrayBattleCharacterData.forEach(function(in_item, in_index)
	{
		var posX = 0;
		var posY = 0;
		if (true == in_item.m_flipped)
		{
			posX = 626 + ((m_opponentCount % 3) * 50);
			posY = 96 + (Math.floor(m_opponentCount / 3) * 50);
			m_opponentCount += 1;
		}
		else
		{
			posX = 31 + ((m_teamCount % 3) * 50);
			posY = 96 + (Math.floor(m_teamCount / 3) * 50);
			m_teamCount += 1;
		}
		
		var action = s_gameDrawAction.e_idle;
		if (false == in_item.GetAlive())
		{
			action = s_gameDrawAction.e_dead;
		}
			
		var character = new GuiGameCharacter(
			in_item.m_character, 
			new Vector(posX, posY), 
			new Vector(30, 30), 
			in_item.m_flipped, 
			that, 
			"CallbackCharacter",
			action
			);
		character.m_key = in_index;	
	
		m_arrayGui.push(character);
		
		if ((false == in_item.m_flipped) &&
			(null == m_firstCharacterButton))
		{
			m_firstCharacterButton = character;
		}		
	});
	
 	var m_characterInfo = new GuiGameCharacterInfo(
 		new Vector(170, 54),
 		new Vector(200, 80),
 		in_game.m_gradientBackground,
 		in_game.m_context, 
 		in_game.m_canvas
	 	);
	m_arrayGui.push(m_characterInfo);	
	m_characterInfo.m_dismissButton.SetVisible(false);
	
	m_arrayGui.push(new GuiText("Cause", new Vector(168, 140), GuiTextGetSmallFont()));
	var m_dropListCause = new GuiList(
		new Vector(168, 154), 
		new Vector(210, 20), 
		[], 
		23, 
 		in_game.m_context
		);
	m_dropListCause.m_font = GuiTextGetSmallFont();
	m_dropListCause.m_visible = false;
	//m_dropListCause.m_softShadow = false;
	m_arrayGui.push(m_dropListCause);	
	
	m_arrayGui.push(new GuiText("Receive", new Vector(381, 140), GuiTextGetSmallFont()));
	var m_dropListReceive = new GuiList(
		new Vector(381, 154), 
		new Vector(210, 20), 
		[], 
		23, 
 		in_game.m_context
		);
	m_dropListReceive.m_font = GuiTextGetSmallFont();
	m_dropListReceive.m_visible = false;
	//m_dropListReceive.m_softShadow = false;
	m_arrayGui.push(m_dropListReceive);	
		
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode(); //this
		m_game.PopGameMode(); //battle
	}
	//this.CallbackMain = function(in_button)
	//{
	//	m_game.SetGameMode(new GameModeMain(m_game));
	//}
	this.CallbackCharacter = function(in_button)
	{
		m_characterInfo.SetCharacter(in_button.m_character, in_button.m_flip);
		
		var battleCharacterData = m_arrayBattleCharacterData[in_button.m_key];
		m_dropListCause.m_arrayData = [];
		battleCharacterData.m_battleReport.m_arrayCaused.forEach(function(in_item, in_index)
		{
			m_dropListCause.m_arrayData.push(new GuiListData(in_item.m_name + ": " + in_item.m_value.toFixed(1), in_index, false));
		});
		m_dropListCause.m_visible = true;
		m_dropListCause.FitKeyInView(0);

		m_dropListReceive.m_arrayData = [];
		battleCharacterData.m_battleReport.m_arrayReceived.forEach(function(in_item, in_index)
		{
			m_dropListReceive.m_arrayData.push(new GuiListData(in_item.m_name + ": " + in_item.m_value.toFixed(1), in_index, false));
		});
		m_dropListReceive.m_visible = true;
		m_dropListReceive.FitKeyInView(0);		
	}

	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	}
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	}
	
	this.CallbackCharacter(m_firstCharacterButton);
	
}

//-- END // End Concatinate, unit test or other follows


