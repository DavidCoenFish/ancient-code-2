//gamemodedeploy.js

function GameModeDeploy(in_game, in_arrayDeployedParty, in_opponentParty, in_arrayDeployedOpponent)
{
	//DEBUG if ( !(this instanceof GameModeDeploy) )
	//DEBUG {
	//DEBUG 	alert("GameModeDeploy: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_game = in_game;
	var m_time = 0.0;
	
	in_arrayDeployedParty = in_arrayDeployedParty || [];
	in_opponentParty = in_opponentParty || [];
	in_arrayDeployedOpponent = in_arrayDeployedOpponent || [];
	
	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("DEPLOY", new Vector(4, 4)));
	m_arrayGui.push(new GuiButton("FIGHT", new Vector(574, 570), new Vector(182, 40), this, "CallbackFight", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));

	var m_gradientBackground = m_game.m_context.createLinearGradient(4, 0, 169, 0);
	m_gradientBackground.addColorStop(0.0, "#d2b387");
	m_gradientBackground.addColorStop(0.3, "#e3c69e");
	m_gradientBackground.addColorStop(0.7, "#e3c69c");
	m_gradientBackground.addColorStop(1.0, "#d4b080");	
	
	var m_referenceGameArrayDeployedParty = in_arrayDeployedParty;

	m_arrayGui.push(new GuiPanel(
		new Vector(4, 34), 
		new Vector(156, 580), 
		m_gradientBackground, 
		"#2a1102", 
		true, 
		4.0
		));
				
	var m_buttonEditParty = new GuiButton("Edit Party", new Vector(8, 38), new Vector(148, 16), this, "CallbackEditParty", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_buttonEditParty.m_font = GuiTextGetSmallFont();
 	m_arrayGui.push(m_buttonEditParty);

	var m_arrayPendingGameCharacter = [];
		
	var m_battleViewOpponent = new GuiGameBattleView(
		new Vector(452, 56),
		new Vector(287, 475),
		new Vector(40, 40),
		new Vector(-4.125, -1.75),
		"#331607"
		);	
 	m_arrayGui.push(m_battleViewOpponent);

	in_arrayDeployedOpponent.forEach(function(in_item)
	{
		var character = in_opponentParty[in_item.m_key];
		m_battleViewOpponent.AddCharacter(
			character, 
			in_item.m_key, 
			m_battleViewOpponent.ConvertMeterToPixelPos(in_item.m_position), 
			true,
			that,
			"CallbackClickCharacter"
			);
	}); 

	var m_battleViewPlayer = new GuiGameBattleView(
		new Vector(165, 56),
		new Vector(287, 475),
		new Vector(40, 40),
		new Vector(-4.125, -1.75),
		"#b27c4d"
		);

	m_battleViewPlayer.m_mode = this;
	m_battleViewPlayer.Rollover = function(in_x, in_y)
	{
		var rollover = ((this.m_pixelOrigin.m_x < in_x) &&
          (in_x < (this.m_pixelOrigin.m_x + this.m_pixelSize.m_x)) &&
          (this.m_pixelOrigin.m_y < in_y) &&
          (in_y < (this.m_pixelOrigin.m_y + this.m_pixelSize.m_y)));    
		return rollover;
	}
	m_battleViewPlayer.Drop = function(in_dragItem)
	{
		this.m_mode.DropDeploy(in_dragItem.m_item);
	}
 	m_arrayGui.push(m_battleViewPlayer);
 	
	in_arrayDeployedParty.forEach(function(in_item)
	{
		var character = m_game.m_party[in_item.m_key];
		m_battleViewPlayer.AddCharacter(
			character, 
			in_item.m_key, 
			m_battleViewPlayer.ConvertMeterToPixelPos(in_item.m_position), 
			in_item.m_flipped, 
			that, 
			"CallbackClickDeployCharacter"
			);
	}); 		
	
	m_arrayGui.push(new GuiText("Your Value:", new Vector(175, 70)));
	var m_textPartyValue = new GuiText("0", new Vector(310, 70));
	m_arrayGui.push(m_textPartyValue);
	m_textPartyValue.m_text = "" + m_battleViewPlayer.GetCostAll();
		
	m_arrayGui.push(new GuiText("Opponent Value:", new Vector(462, 70)));
	m_arrayGui.push(new GuiText("" + m_battleViewOpponent.GetCostAll(), new Vector(650, 70)));
		
		
 	var m_characterInfo = new GuiGameCharacterInfo(
 		new Vector(166, 534),
 		new Vector(200, 80),
 		in_game.m_gradientBackground,
 		in_game.m_context, 
 		in_game.m_canvas
	 	);
	m_arrayGui.push(m_characterInfo);
		
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.DropDeploy = function(in_guiCharacter)
	{
		m_battleViewPlayer.AddCharacter(
			in_guiCharacter.m_character, 
			in_guiCharacter.m_key, 
			in_guiCharacter.m_pixelOrigin, 
			false, 
			this, 
			"CallbackClickDeployCharacter"
			);
		m_textPartyValue.m_text = "" + m_battleViewPlayer.GetCostAll();			
		UpdateDeployedData();			
	}
		
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode();
	}
	
	this.CallbackEditParty = function(in_button)
	{
		m_game.PushGameMode(new GameModeEditMember(m_game));
	}
	
	this.CallbackFight = function(in_button)
	{
		var value = m_battleViewPlayer.GetCostAll();
		if (value <= 0.0)
		{
			var modalDialog = new ModalDialog(
				"Your forces must have a value greater than zero to enter the fight.", 
				new Vector(100, 240), 
				new Vector(560, 120), 
				[
					new ModalDialogButtonData("OK", this, "CallbackFightOk")
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
	
		var arrayBattleCharacterData = [];
		m_battleViewPlayer.AppendBattelData(arrayBattleCharacterData);
		m_battleViewOpponent.AppendBattelData(arrayBattleCharacterData);
		
		m_game.PushGameMode(new GameModeBattle(m_game, arrayBattleCharacterData));
	}
	
	this.CallbackFightOk = function(in_button)
	{
		m_game.PopGameMode();	
	}

	this.CallbackClickDeployCharacter = function(in_button)
	{
		m_battleViewPlayer.RemoveGameCharacter(in_button);
		UpdateDeployedData();

		m_characterInfo.SetCharacter(in_button.m_character, in_button.m_flip);		
		
		var arrayTarget = [
			m_battleViewPlayer
			]; 
			
		dragItem = {};
		dragItem.m_item = in_button; 
		dragItem.Draw = function(in_context, in_canvas)
		{
			this.m_item.Draw(in_context, in_canvas);
		}
		dragItem.SetPosition = function(in_position)
		{
			this.m_item.m_pixelOrigin = in_position;
		}		
		
		var gameModeDrag = new GameModeDrag(
			m_game, 
			dragItem, 
			new Vector(in_button.m_pixelOrigin.m_x - g_mouseX, in_button.m_pixelOrigin.m_y - g_mouseY), 
			arrayTarget, 
			this
			);	
		gameModeDrag.m_minTime = 0.0;
		m_game.PushGameMode(gameModeDrag);		
	}
	
	this.CallbackPendingCharacter = function(in_button)
	{
		var index = m_arrayPendingGameCharacter.indexOf(in_button);
		if (index != -1)
		{
			m_arrayPendingGameCharacter.splice(index, 1); 
			UpdatePendingCharacterPosition();
		}
		
		m_characterInfo.SetCharacter(in_button.m_character, in_button.m_flip);		
		
		var arrayTarget = [
			m_battleViewPlayer
			]; 
				
		dragItem = {};
		dragItem.m_item = in_button; 
		dragItem.Draw = function(in_context, in_canvas)
		{
			this.m_item.Draw(in_context, in_canvas);
		}
		dragItem.SetPosition = function(in_position)
		{
			this.m_item.m_pixelOrigin = in_position;
		}		
		
		var gameModeDrag = new GameModeDrag(
			m_game, 
			dragItem, 
			new Vector(in_button.m_pixelOrigin.m_x - g_mouseX, in_button.m_pixelOrigin.m_y - g_mouseY), 
			arrayTarget, 
			this
			);	
		gameModeDrag.m_minTime = 0.0;
		m_game.PushGameMode(gameModeDrag);
	}
	
	this.CallbackClickCharacter = function(in_button)
	{
		m_characterInfo.SetCharacter(in_button.m_character, in_button.m_flip);
	}	
	
	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	    m_arrayPendingGameCharacter.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	    m_arrayPendingGameCharacter.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	}
	
	this.Begin = function()
	{
		UpdateParty();
	}
	this.Resume = function()
	{		
		UpdateParty();
	}
	
	///////////////////////////////////////////////////////
	//private methods
	function TestPlayerDeployed(in_index)
	{
		return m_battleViewPlayer.TestPlayerDeployed(in_index);
	}
	function AddPendingCharacter(in_character, in_index)
	{
		var character = new GuiGameCharacter(
			in_character, 
			new Vector(), 
			new Vector(30, 30), 
			false, 
			that, 
			"CallbackPendingCharacter"
			);
		character.m_key = in_index;
		m_arrayPendingGameCharacter.push(character);
	}
	
	function UpdatePendingCharacterPosition()
	{
		m_arrayPendingGameCharacter.forEach(function(in_item, in_index)
		{
			in_item.m_pixelOrigin.m_x = 31 + ((in_index % 3) * 50);
			in_item.m_pixelOrigin.m_y = 96 + (Math.floor(in_index / 3) * 50);
		});
	}

	//the m_game.m_party could have changed
	function UpdateParty()
	{
		//dummy collect data as battelData which inits the combat variables (removes, readds modifiercharacterbattle.js
		{
			var arrayBattleCharacterData = [];
			m_battleViewPlayer.AppendBattelData(arrayBattleCharacterData);
			m_battleViewOpponent.AppendBattelData(arrayBattleCharacterData);		
		}
	
		//add all the pary members not deployed to the party area
		m_arrayPendingGameCharacter = [];
		m_game.m_party.forEach(function(in_item, in_index)
		{
			if (true == TestPlayerDeployed(in_index))
			{
				return;
			}
			
			if (false != in_item.GetValue(s_nodeNameValid))
			{
				AddPendingCharacter(in_item, in_index);
			}
		});
		
		//cull deployed party members
		m_battleViewPlayer.UpdateParty(m_game.m_party);
		
		UpdatePendingCharacterPosition();	
		m_textPartyValue.m_text = "" + m_battleViewPlayer.GetCostAll();			
	}

	function UpdateDeployedData()
	{
		m_battleViewPlayer.CollectDeployedData(m_referenceGameArrayDeployedParty);		
	}

}

//-- END // End Concatinate, unit test or other follows


