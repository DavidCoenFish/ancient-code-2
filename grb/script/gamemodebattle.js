//gamemodebattle.js

function GameModeBattle(in_game, in_arrayBattleCharacterData)
{
	//DEBUG if ( !(this instanceof GameModeBattle) )
	//DEBUG {
	//DEBUG 	alert("GameModeBattle: call constuctor with new keyword");
	//DEBUG }
		
	var that = this;
	var m_screenSize = new Vector(in_game.m_canvas.width, in_game.m_canvas.height);
	var m_game = in_game;
	var m_arrayBattleCharacterData = in_arrayBattleCharacterData;
	var m_arrayGui = [];
	var m_tickRate = 0.0;
	var m_time = 0.0;
	var m_arenaBoundMeterLow = new Vector(-7.6, -6.2);
	var m_arenaBoundMeterHigh = new Vector(22.8, 18.6);
	var m_arenaViewFocusRatio = new Vector(0.5, 0.5);
	var m_zoomPixelPerMeter = 50;
	var m_battleDistanceStore = new BattleDistanceStore();
	var m_endBattleCountdown = 2.0;
	var m_resultTitle = "";
	
	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	var m_battleView = new GuiGameBattleView(
		new Vector(0, 0),
		m_screenSize,
		new Vector(m_zoomPixelPerMeter, m_zoomPixelPerMeter),
		new Vector(0, 0)
		);	
 	m_arrayGui.push(m_battleView);

 	var m_battleMiniMap = new GuiGameBattleMiniMap(
 		new Vector(2, m_screenSize.m_y - 102),
 		new Vector(120, 100),
 		this, 
 		"CallbackZoomPlus", 
 		"CallbackZoomMinus", 
 		"CallbackMiniMapClick", 
 		in_game.m_context, 
 		in_game.m_canvas
 		);
 	m_arrayGui.push(m_battleMiniMap);	
 	var m_characterInfo = new GuiGameCharacterInfo(
 		new Vector(m_screenSize.m_x - 202, m_screenSize.m_y - 82),
 		new Vector(200, 80),
 		in_game.m_gradientBackground,
 		in_game.m_context, 
 		in_game.m_canvas
	 	);
	m_arrayGui.push(m_characterInfo);

 	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("BATTLE", new Vector(4, 4)));
	m_arrayGui.push(new GuiText("TIME", new Vector(356, 4), GuiTextGetDefaultFont(), "right"));
	var m_textTime = new GuiText("00:00:00", new Vector(364, 4));
	m_arrayGui.push(m_textTime);

	m_arrayGui.push(new GuiButton("ll", new Vector(305, 26), new Vector(30, 24), this, "CallbackPause", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton(">", new Vector(345, 26), new Vector(30, 24), this, "CallbackPlay", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton(">>", new Vector(385, 26), new Vector(30, 24), this, "CallbackPlay2", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton("4>", new Vector(425, 26), new Vector(30, 24), this, "CallbackPlay4", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas));

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		if (0.0 < m_time)
		{
			var modalDialog = new ModalDialog(
				"Select OK to really leave the unfinished battle.", 
				new Vector(100, 240), 
				new Vector(560, 120), 
				[
					new ModalDialogButtonData("OK", this, "CallbackBackOk"),
					new ModalDialogButtonData("CANCEL", this, "CallbackBackCancel")
				], 
				m_game.m_buttonStyle, 
				m_game.m_context, 
				m_game.m_canvas
				);
			in_button.m_rollover = false;
			in_button.Draw(m_game.m_context, m_game.m_canvas);
			m_game.PushGameMode(modalDialog);
			return;		
		}
		m_game.PopGameMode();
	}
	this.CallbackBackOk = function(in_button)
	{
		BattleOver();	
		m_game.PopGameMode();
		m_game.PopGameMode();	
	}
	this.CallbackBackCancel = function(in_button)
	{
		m_game.PopGameMode();	
	}
	this.CallbackZoomPlus = function(in_button)
	{
		m_zoomPixelPerMeter = Math.min(200, m_zoomPixelPerMeter * 1.414213562373);
		UpdateMiniMapFrame();
		UpdateView();
	}
	this.CallbackZoomMinus = function(in_button)
	{
		m_zoomPixelPerMeter = Math.max(25, m_zoomPixelPerMeter * 0.7071067811865);
		UpdateMiniMapFrame();
		UpdateView();
	}	
	this.CallbackMiniMapClick = function(in_x, in_y)
	{
		m_arenaViewFocusRatio.m_x = in_x;
		m_arenaViewFocusRatio.m_y = in_y;
		UpdateMiniMapFrame();
		UpdateView();
	}
	
	this.CallbackPause = function(in_button)
	{
		m_tickRate = 0.0;
	}	
	this.CallbackPlay = function(in_button)
	{
		m_tickRate = 1.0;
	}	
	this.CallbackPlay2 = function(in_button)
	{
		m_tickRate = 2.0;
	}	
	this.CallbackPlay4 = function(in_button)
	{
		m_tickRate = 4.0;
	}	
	this.CallbackClickCharacter = function(in_button)
	{
		m_characterInfo.SetCharacter(in_button.m_character, in_button.m_flip);
	}

	this.CallbackResultOk = function(in_button)
	{
		BattleOver();	
		m_game.PopGameMode();
		//m_game.PopGameMode();	
		m_game.PushGameMode(new GameModeResult(m_game, m_arrayBattleCharacterData, m_resultTitle));	
	}
	
	this.Tick = function(in_timeDelta)
	{			
		var localTick = m_tickRate * in_timeDelta;
		m_time += localTick;
		
		if (0.0 < localTick)
		{
			var minutes = "" + Math.floor(m_time / 60)
			while (minutes.length < 2)
			{
				minutes = "0" + minutes;
			}
			var seconds = "" + Math.floor(m_time) % 60;
			while (seconds.length < 2)
			{
				seconds = "0" + seconds;
			}
			var hundreths = "" + Math.floor(m_time * 100) % 100;
			while (hundreths.length < 2)
			{
				hundreths = "0" + hundreths;
			}
			m_textTime.m_text = "" + minutes + ":" + seconds + ":" + hundreths;
			
			m_battleDistanceStore.Update(m_arrayBattleCharacterData);
			
			m_endBattleCountdown -= localTick;
		}
		
		m_arrayBattleCharacterData.forEach(function(in_item, in_index)
		{
			in_item.Tick(localTick, m_battleDistanceStore, m_battleView, m_arenaBoundMeterLow, m_arenaBoundMeterHigh);
		});
		m_arrayBattleCharacterData.forEach(function(in_item)
		{
			in_item.PostTick();
		});		

		UpdateMiniMapDots();
		UpdateBattleView();

		//reverse tick so pause buttons handel input before battle view
		// gui tick after updateing battle view, 		
	    //m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	    for (var index = m_arrayGui.length - 1; 0 <= index; --index)
	    {
			var item = m_arrayGui[index];
			if (item.Tick)
			{ 
				item.Tick(in_timeDelta); 
			}
	    } 		
		m_battleView.TickGuiBattle(localTick);
	    
	    var costActiveTeam = 0.0;
	    var costActiveOpponent = 0.0;
	    m_arrayBattleCharacterData.forEach(function(in_item)
	    {
			if (true == in_item.GetAlive())
			{
				if (true == in_item.m_flipped)
				{
					costActiveOpponent += in_item.m_character.GetValue(s_nodeNameCost);
				}
				else
				{
					costActiveTeam += in_item.m_character.GetValue(s_nodeNameCost);
				}
			}
	    });
	    
	    var message = "";
	    var finshed = false;
	    if ((0 == costActiveOpponent) &&
			(0 == costActiveTeam))
		{
			message = "Draw";
			finshed = true;
			m_resultTitle = "DRAW " + m_textTime.m_text;
		}
		else if (0 == costActiveOpponent)
		{
			message = "You Win";
			finshed = true;
			m_resultTitle = "VICTORY " + m_textTime.m_text;
		}
		else if (0 == costActiveTeam)
		{
			message = "You Lose";
			finshed = true;
			m_resultTitle = "DEFEAT " + m_textTime.m_text;
		}
		
		if (false == finshed)
		{
			m_endBattleCountdown = 2.0;
		}
		else if(m_endBattleCountdown < 0.0)
		{
			var modalDialog = new ModalDialog(
				message, 
				new Vector(100, 240), 
				new Vector(560, 120), 
				[
					new ModalDialogButtonData("OK", this, "CallbackResultOk"),
					new ModalDialogButtonData("RETRY", this, "CallbackBackOk")
				], 
				m_game.m_buttonStyle, 
				m_game.m_context, 
				m_game.m_canvas
				);	
			m_game.PushGameMode(modalDialog);
			return;					
		}
		
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	}
	
	///////////////////////////////////////////////////////
	//private methods
	function UpdateView()
	{
		m_battleView.m_pixelsPerMeter.m_x = m_zoomPixelPerMeter;
		m_battleView.m_pixelsPerMeter.m_y = m_zoomPixelPerMeter;
		
		var meterFocusX = m_arenaBoundMeterLow.m_x + (m_arenaViewFocusRatio.m_x * (m_arenaBoundMeterHigh.m_x - m_arenaBoundMeterLow.m_x));
		var meterFocusY = m_arenaBoundMeterLow.m_y + (m_arenaViewFocusRatio.m_y * (m_arenaBoundMeterHigh.m_y - m_arenaBoundMeterLow.m_y));
		
		m_battleView.m_meterOriginOffset.m_x = meterFocusX - (m_screenSize.m_x * 0.5 / m_zoomPixelPerMeter);
		m_battleView.m_meterOriginOffset.m_y = meterFocusY - (m_screenSize.m_y * 0.5 / m_zoomPixelPerMeter);
	}

	function UpdateMiniMapFrame()
	{
		var frameRatioWidth = (m_screenSize.m_x / m_zoomPixelPerMeter) / (m_arenaBoundMeterHigh.m_x - m_arenaBoundMeterLow.m_x);
		var frameRatioHeight = (m_screenSize.m_y / m_zoomPixelPerMeter) / (m_arenaBoundMeterHigh.m_y - m_arenaBoundMeterLow.m_y);
	
		var lowX = m_arenaViewFocusRatio.m_x - (0.5 * frameRatioWidth);
		if (lowX < 0.0)
		{
			m_arenaViewFocusRatio.m_x -= lowX;
			lowX = 0.0;
		}
		var highX = m_arenaViewFocusRatio.m_x + (0.5 * frameRatioWidth);
		if (1.0 < highX)
		{
			m_arenaViewFocusRatio.m_x -= (highX - 1.0);
			highX = 1.0;
			lowX = m_arenaViewFocusRatio.m_x - (0.5 * frameRatioWidth);
		}
		
		var lowY = m_arenaViewFocusRatio.m_y - (0.5 * frameRatioHeight);
		if (lowY < 0.0)
		{
			m_arenaViewFocusRatio.m_y -= lowY;
			lowY = 0.0;
		}
		var highY = m_arenaViewFocusRatio.m_y + (0.5 * frameRatioHeight);
		if (1.0 < highY)
		{
			m_arenaViewFocusRatio.m_y -= (highY - 1.0);
			highY = 1.0;
			lowY = m_arenaViewFocusRatio.m_y - (0.5 * frameRatioHeight);
		}

		m_battleMiniMap.m_boundLow.m_x = lowX;
		m_battleMiniMap.m_boundLow.m_y = lowY;
		m_battleMiniMap.m_boundHigh.m_x = highX;
		m_battleMiniMap.m_boundHigh.m_y = highY;
	}
	function UpdateMiniMapDots()
	{
		m_battleMiniMap.ClearDots();
		m_arrayBattleCharacterData.forEach(function(in_item, in_index)
		{
			var filledStyle = GuiTextGetDefaultFill();
			if (false == in_item.m_flipped)
			{
				filledStyle = "#fde18f";
			}
			
			var posRatioX = (in_item.m_character.GetValue(s_nodeNameCombatPosX) - m_arenaBoundMeterLow.m_x) / (m_arenaBoundMeterHigh.m_x - m_arenaBoundMeterLow.m_x);
			var posRatioY = (in_item.m_character.GetValue(s_nodeNameCombatPosY) - m_arenaBoundMeterLow.m_y) / (m_arenaBoundMeterHigh.m_y - m_arenaBoundMeterLow.m_y);
			
			m_battleMiniMap.AddDot(
				posRatioX,
				posRatioY,
				filledStyle
				);
		});
	}
	
	function UpdateBattleView()
	{
		m_battleView.ClearCharacterData();
		m_arrayBattleCharacterData.forEach(function(in_item, in_index)
		{
			var itemPos = in_item.GetPosition();
			//window.defaultStatus = "UpdateBattleView itemPos " + itemPos.m_x + " " + itemPos.m_y;
			var pixelPos = 	m_battleView.ConvertMeterToPixelPos(itemPos);
			//window.defaultStatus = "UpdateBattleView " + pixelPos.m_x + " " + pixelPos.m_y;
			m_battleView.AddCharacter(
				in_item.m_character, 
				in_index, 
				pixelPos,
				in_item.m_flipped,
				that,
				"CallbackClickCharacter",
				in_item.m_action,
				in_item.m_actionTime
				);
		}); 
	}
	function BattleOver()
	{	
		m_arrayBattleCharacterData.forEach(function(in_item)
		{
			in_item.BattleOver();
		});
	}
}

//-- END // End Concatinate, unit test or other follows


