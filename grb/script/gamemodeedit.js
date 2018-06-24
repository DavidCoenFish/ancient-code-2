//gamemodeedit.js

function GameModeEdit(in_game)
{
	//DEBUG if ( !(this instanceof GameModeEdit) )
	//DEBUG {
	//DEBUG 	alert("GameModeEdit: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_arrayGuiCharacter = [];
	var m_game = in_game;
	var m_time = 0.0;

	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("EDIT PARTY", new Vector(4, 4)));

	m_arrayGui.push(new GuiButton("EDIT CHARACTERS", new Vector(120, 320), new Vector(304, 40), this, "CallbackEditMember", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton("RESET", new Vector(120, 384), new Vector(304, 40), this, "CallbackReset", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton("LOAD", new Vector(120, 448), new Vector(304, 40), this, "CallbackLoad", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiButton("SAVE", new Vector(120, 512), new Vector(304, 40), this, "CallbackSave", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));


	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode();
	}
	this.CallbackReset = function(in_button)
	{
		var modalDialog = new ModalDialog(
			"Select OK to really restore the default party. Unsaved changes will be lost", 
			new Vector(100, 240), 
			new Vector(560, 120), 
			[
				new ModalDialogButtonData("OK", this, "CallbackResetOk"),
				new ModalDialogButtonData("CANCEL", this, "CallbackResetCancel")
			], 
			m_game.m_buttonStyle, 
			m_game.m_context, 
			m_game.m_canvas
			);
		in_button.m_rollover = false;
		in_button.Draw(m_game.m_context, m_game.m_canvas);
		m_game.PushGameMode(modalDialog);
	}
	this.CallbackResetOk = function(in_button)
	{
		m_game.PopGameMode();
		m_game.ResetParty();
	}
	this.CallbackResetCancel = function(in_button)
	{
		m_game.PopGameMode();
	}
	this.CallbackEditMember = function(in_button)
	{
		m_game.PushGameMode(new GameModeEditMember(m_game));
	}
	this.CallbackSelectCharacter = function(in_button)
	{
		m_game.m_partyIndex = in_button.m_key;
		m_game.PushGameMode(new GameModeEditMember(m_game));
	}
	this.CallbackLoad = function(in_button)
	{
		alert("todo");
	}
	this.CallbackSave = function(in_button)
	{
		alert("todo");
	}
	
	this.Begin = function()
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Reset){ in_item.Reset(); } });	
	    RepopulateGuiCharacter();
	}
	this.Resume = function()
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Reset){ in_item.Reset(); } });	
	    RepopulateGuiCharacter();
	}	
	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	    m_arrayGuiCharacter.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	    m_time += in_timeDelta;
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	    m_arrayGuiCharacter.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	}
	
	///////////////////////////////////////////////////////
	//private methods	
	function RepopulateGuiCharacter()
	{	
		m_arrayGuiCharacter.length = 0;
		m_game.m_party.forEach(function(in_item, in_index)
		{
			var drawX = 170 + ((in_index & 0x07) * 75) - (Math.floor(in_index / 8) * 40);
			var drawY = 150 + (Math.floor(in_index / 8) * 50);
		
			var characterButton = new GuiGameCharacter(
				in_item, 
				new Vector(drawX, drawY), 
				new Vector(75, 75), 
				false, 
				that, 
				"CallbackSelectCharacter", 
				s_gameDrawAction.e_idle, 
				m_time
				);
			characterButton.m_key = in_index;	
			m_arrayGuiCharacter.push(characterButton);	
		});
	}
}

//-- END // End Concatinate, unit test or other follows


