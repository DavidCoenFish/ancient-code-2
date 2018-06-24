//gamemodeeditmember.js

function GameModeEditMember(in_game)
{
	//DEBUG if ( !(this instanceof GameModeEditMember) )
	//DEBUG {
	//DEBUG 	alert("GameModeEditMember: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	
	var m_arrayGui = [];
	var m_game = in_game;
	var m_time = 0.0;

	m_arrayGui.push(new GuiBackgroud(in_game.m_gradientBackground));

	m_arrayGui.push(new GuiButton("BACK", new Vector(574, 4), new Vector(182, 40), this, "CallbackBack", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas));
	m_arrayGui.push(new GuiText("EDIT CHARACTERS", new Vector(4, 4)));

	var m_buttonPrev = new GuiButton("<", new Vector(299, 4), new Vector(20, 20), this, "CallbackPrev", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonPrev);
	var m_buttonNext = new GuiButton(">", new Vector(437, 4), new Vector(20, 20), this, "CallbackNext", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonNext);
	var m_textIndex = new GuiText("1 of 1", new Vector(380, 4), GuiTextGetDefaultFont(), "center");
	m_arrayGui.push(m_textIndex);

	var m_textStrengthStatic = new GuiText("Strength:", new Vector(200, 46), GuiTextGetSmallFont());
	m_arrayGui.push(m_textStrengthStatic);
	var m_textStrength = new GuiText("0", new Vector(280, 46), GuiTextGetSmallFont());
	m_arrayGui.push(m_textStrength);
	var m_buttonStrengthPlus = new GuiButton("+", new Vector(310, 42), new Vector(18, 18), this, "CallbackStrengthPlus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonStrengthPlus);
	var m_buttonStrengthMinus = new GuiButton("-", new Vector(338, 42), new Vector(18, 18), this, "CallbackStrengthMinus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonStrengthMinus);

	var m_textIntelligenceStatic = new GuiText("Intelligence:", new Vector(200, 72), GuiTextGetSmallFont());
	m_arrayGui.push(m_textIntelligenceStatic);
	var m_textIntelligence = new GuiText("0", new Vector(280, 72), GuiTextGetSmallFont());
	m_arrayGui.push(m_textIntelligence);
	var m_buttonIntelligencePlus = new GuiButton("+", new Vector(310, 68), new Vector(18, 18), this, "CallbackIntelligencePlus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonIntelligencePlus);
	var m_buttonIntelligenceMinus = new GuiButton("-", new Vector(338, 68), new Vector(18, 18), this, "CallbackIntelligenceMinus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonIntelligenceMinus);
	
	var m_textLevelStatic = new GuiText("Level:", new Vector(200, 98), GuiTextGetSmallFont());
	m_arrayGui.push(m_textLevelStatic);
	var m_textLevel = new GuiText("0", new Vector(280, 98), GuiTextGetSmallFont());
	m_arrayGui.push(m_textLevel);
	var m_buttonLevelPlus = new GuiButton("+", new Vector(310, 94), new Vector(18, 18), this, "CallbackLevelPlus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonLevelPlus);
	var m_buttonLevelMinus = new GuiButton("-", new Vector(338, 94), new Vector(18, 18), this, "CallbackLevelMinus", s_guiButtonStyle.e_simple, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonLevelMinus);
	
	var m_textSpeedStatic = new GuiText("Speed:", new Vector(200, 124), GuiTextGetSmallFont());
	m_arrayGui.push(m_textSpeedStatic);
	var m_textSpeed = new GuiText("0", new Vector(280, 124), GuiTextGetSmallFont());
	m_arrayGui.push(m_textSpeed);

	var m_textUsedStrStatic = new GuiText("Used Str:", new Vector(200, 150), GuiTextGetSmallFont());
	m_arrayGui.push(m_textUsedStrStatic);
	var m_textUsedStr = new GuiText("0", new Vector(280, 150), GuiTextGetSmallFont());
	m_arrayGui.push(m_textUsedStr);

	var m_textUsedIntStatic = new GuiText("Used Int:", new Vector(200, 176), GuiTextGetSmallFont());
	m_arrayGui.push(m_textUsedIntStatic);
	var m_textUsedInt = new GuiText("0", new Vector(280, 176), GuiTextGetSmallFont());
	m_arrayGui.push(m_textUsedInt);

	var m_textStatus = new GuiText("status text", new Vector(200, 202), GuiTextGetSmallFont());
	m_arrayGui.push(m_textStatus);
	m_textStatus.m_fill = "#FF0000";

	var m_textCostStatic = new GuiText("Cost:", new Vector(400, 46), GuiTextGetSmallFont());
	m_arrayGui.push(m_textCostStatic);
	var m_textCost = new GuiText("0", new Vector(470, 46), GuiTextGetSmallFont());
	m_arrayGui.push(m_textCost);

	var m_textHealthStatic = new GuiText("Health:", new Vector(400, 72), GuiTextGetSmallFont());
	m_arrayGui.push(m_textHealthStatic);
	var m_textHealth = new GuiText("0", new Vector(470, 72), GuiTextGetSmallFont());
	m_arrayGui.push(m_textHealth);

	var m_textArmorStatic = new GuiText("Armor:", new Vector(400, 98), GuiTextGetSmallFont());
	m_arrayGui.push(m_textArmorStatic);
	var m_textArmor = new GuiText("0", new Vector(470, 98), GuiTextGetSmallFont());
	m_arrayGui.push(m_textArmor);

	var m_textAuraStatic = new GuiText("Aura:", new Vector(400, 124), GuiTextGetSmallFont());
	m_arrayGui.push(m_textAuraStatic);
	var m_textAura = new GuiText("0", new Vector(470, 124), GuiTextGetSmallFont());
	m_arrayGui.push(m_textAura);

	var m_textPhysicalResistStatic = new GuiText("Resist Phy:", new Vector(400, 150), GuiTextGetSmallFont());
	m_arrayGui.push(m_textPhysicalResistStatic);
	var m_textPhysicalResist = new GuiText("0", new Vector(470, 150), GuiTextGetSmallFont());
	m_arrayGui.push(m_textPhysicalResist);
	
	var m_textMagicResistStatic = new GuiText("Resist Mag:", new Vector(400, 176), GuiTextGetSmallFont());
	m_arrayGui.push(m_textMagicResistStatic);
	var m_textMagicResist = new GuiText("0", new Vector(470, 176), GuiTextGetSmallFont());
	m_arrayGui.push(m_textMagicResist);	

	var m_buttonNew = new GuiButton("NEW", new Vector(574, 88), new Vector(182, 40), this, "CallbackNew", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonNew);
	var m_buttonDelete = new GuiButton("DELETE", new Vector(574, 144), new Vector(182, 40), this, "CallbackDelete", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonDelete);

	var m_buttonName = new GuiButton("NAME", new Vector(4, 226), new Vector(182, 40), this, "CallbackButtonName", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonName);

	var m_buttonGender = new GuiButton("GENDER", new Vector(194, 226), new Vector(182, 40), this, "CallbackButtonGender", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonGender);

	var m_buttonRace = new GuiButton("RACE", new Vector(384, 226), new Vector(182, 40), this, "CallbackButtonRace", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonRace);

	var m_buttonClass = new GuiButton("CLASS", new Vector(574, 226), new Vector(182, 40), this, "CallbackButtonClass", in_game.m_buttonStyle, in_game.m_context, in_game.m_canvas);
	m_arrayGui.push(m_buttonClass);

	var m_scrollSlot = new GuiScrollBarVertical(new Vector(384, 280), new Vector(20, 323), true, 0.25, 0.5, this, "CallbackScrollbarSlot");
	m_arrayGui.push(m_scrollSlot);
	m_scrollSlot.m_visible = false;
	var m_modifierBaseIndex = 0;
	var m_activeModifierCount = 0;

	for (var index = 0; index < 8; ++index)
	{
		var buttonName = "m_guiGameSlot" + index;
		//hhmmn, how do i access the function scope rather than 'this'?
		var slotItem = new GuiGameSlotItem(new Vector(410, 280 + (index * 40)), new Vector(40, 40), 0, false, this, "CallbackCharacterSlot");
		slotItem.m_key = index;
		this[buttonName] = slotItem;
		m_arrayGui.push(slotItem);
		
		var textName = "m_guiGameSlotText" + index;
		this[textName] = new GuiText("none" + index, new Vector(460, 300 + (index * 40)), GuiTextGetDefaultFont(), "left", "middle");
		m_arrayGui.push(this[textName]);

	}	

	var m_gameSlotTable = new GuiGameSlotTable(
		new Vector(6, 280), 
		new Vector(370, 160), 
		true,
		m_game,
		s_guiGameSlotTableFilterClass.e_all, 
		this, 
		"CallbackSlotTable",
		in_game.m_context, 
		in_game.m_canvas
		);
	m_gameSlotTable.m_visible = false;
	m_gameSlotTable.SetClassFilterEnable(false);
	m_arrayGui.push(m_gameSlotTable);

	var m_gameSlotInfo = new GuiGameSlotInfo(
		new Vector(6, 450), 
		new Vector(370, 160), 
		true//,
		//in_class, 
		//in_callbackTarget, 
		//in_callbackNameClick
		);
	m_gameSlotInfo.m_visible = false;
	m_arrayGui.push(m_gameSlotInfo);
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.CallbackBack = function(in_button)
	{
		m_game.PopGameMode();
	}
	this.CallbackNew = function(in_button)
	{
		m_game.m_partyIndex = m_game.m_party.length;
		var character = new GameCharacter();
		character.SetNameId(Math.floor(Math.random() * s_nameCount));
		character.SetRace(s_modifierRace.e_barbarian + Math.floor(Math.random() * 3));
		character.SetGender(Math.floor(Math.random() * (s_modifierGender.e_count - 1)));
		character.SetClass(Math.floor(Math.random() * s_modifierClass.e_count));
		m_game.m_party.push(character);
		UpdateGui();
	}
	this.CallbackDelete = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}
		var modalDialog = new ModalDialog(
			"Select OK to confirm delete of " + character.m_name + "  from your party.", 
			new Vector(100, 240), 
			new Vector(560, 120), 
			[
				new ModalDialogButtonData("OK", this, "CallbackDeleteOk"),
				new ModalDialogButtonData("CANCEL", this, "CallbackDeleteCancel")
			], 
			m_game.m_buttonStyle, 
			m_game.m_context, 
			m_game.m_canvas
			);
		in_button.m_rollover = false;
		in_button.Draw(m_game.m_context, m_game.m_canvas);
		m_game.PushGameMode(modalDialog);
	}	
	this.CallbackDeleteOk = function()
	{
		if (0 < m_game.m_party.length)
		{
		  m_game.m_party.splice(m_game.m_partyIndex, 1);
		  ClampPartyIndex();    
		}
		m_game.PopGameMode();		
		UpdateGui();
	}
	this.CallbackDeleteCancel = function()
	{
		m_game.PopGameMode();		
	}
		
	this.CallbackPrev = function(in_button)
	{
		m_game.m_partyIndex -= 1;	
		ClampPartyIndex();    
		UpdateGui();
	}
	this.CallbackNext = function(in_button)
	{
		m_game.m_partyIndex += 1;	
		ClampPartyIndex();    
		UpdateGui();
	}
	this.CallbackStrengthPlus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusStrength);
			modifier.IncrementPlus();			
		}
	
		UpdateGui();
	}
	this.CallbackStrengthMinus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusStrength);
			modifier.DecrementPlus();			
		}
	
		UpdateGui();
	}
	this.CallbackIntelligencePlus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusIntelegence);
			modifier.IncrementPlus();			
		}
	
		UpdateGui();
	}
	this.CallbackIntelligenceMinus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusIntelegence);
			modifier.DecrementPlus();			
		}
	
		UpdateGui();
	}
	this.CallbackLevelPlus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusLevel);
			modifier.IncrementPlus();			
			character.PublicUpdateModifierSlots();		
		}
	
		UpdateGui();
	}
	this.CallbackLevelMinus = function(in_button)
	{
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			if (!character)
			{
				return;
			}
			var modifier = character.GetModifier(s_modifierEntityPlusLevel);
			modifier.DecrementPlus();	
			character.PublicUpdateModifierSlots();		
		}
	
		UpdateGui();
	}
	
	this.CallbackButtonName = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
	
		var dataExchangeObject = {};
		dataExchangeObject.m_game = m_game;
		dataExchangeObject.m_character = character;
		dataExchangeObject.m_gameModeEditMember = this;
		dataExchangeObject.m_arrayData = m_game.GetArrayDropListDataName(
			character.GetValue(s_nodeNameGender),
			character.GetValue(s_nodeNameRace)
			);
		dataExchangeObject.GetSelectedKey = function()
		{
			return this.m_character.GetValue(s_nodeNameNameId);
		}
		dataExchangeObject.SetSelectedData = function(in_data)
		{
			this.m_character.SetNameId(in_data.m_key);
			this.m_gameModeEditMember.PublicUpdateGui();
		}
		dataExchangeObject.GetArrayListData = function()
		{
			return this.m_arrayData;
		}
		dataExchangeObject.GetDisplayCount = function()
		{
			return 7;
		}
		
		var dropList = new GameModeDropList(
			m_game, 
			new Vector(in_button.m_pixelOrigin.m_x + 27, in_button.m_pixelOrigin.m_y + in_button.m_pixelSize.m_y),
			new Vector(in_button.m_pixelSize.m_x - 54, in_button.m_pixelSize.m_y - 8),
			dataExchangeObject
			);
		m_game.PushGameMode(dropList);
	}
	
	this.CallbackButtonGender = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
	
		var dataExchangeObject = {};
		dataExchangeObject.m_game = m_game;
		dataExchangeObject.m_character = character;
		dataExchangeObject.m_gameModeEditMember = this;
		dataExchangeObject.m_arrayData = m_game.GetArrayDropListDataGender();
		dataExchangeObject.GetSelectedKey = function()
		{
			return this.m_character.GetValue(s_nodeNameGender);
		}
		dataExchangeObject.SetSelectedData = function(in_data)
		{
			this.m_character.SetGender(in_data.m_key);
			this.m_gameModeEditMember.PublicUpdateGui();
		}
		dataExchangeObject.GetArrayListData = function()
		{
			return this.m_arrayData;
		}
		dataExchangeObject.GetDisplayCount = function()
		{
			return this.m_arrayData.length;
		}
		
		var dropList = new GameModeDropList(
			m_game, 
			new Vector(in_button.m_pixelOrigin.m_x + 27, in_button.m_pixelOrigin.m_y + in_button.m_pixelSize.m_y),
			new Vector(in_button.m_pixelSize.m_x - 54, in_button.m_pixelSize.m_y - 8),
			dataExchangeObject
			);
		m_game.PushGameMode(dropList);
	}	
	
	this.CallbackButtonRace = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
	
		var dataExchangeObject = {};
		dataExchangeObject.m_game = m_game;
		dataExchangeObject.m_character = character;
		dataExchangeObject.m_gameModeEditMember = this;
		dataExchangeObject.m_arrayData = m_game.GetArrayDropListDataRace();
		dataExchangeObject.GetSelectedKey = function()
		{
			return this.m_character.GetValue(s_nodeNameRace);
		}
		dataExchangeObject.SetSelectedData = function(in_data)
		{
			this.m_character.SetRace(in_data.m_key);
			this.m_gameModeEditMember.PublicUpdateGui();
		}
		dataExchangeObject.GetArrayListData = function()
		{
			return this.m_arrayData;
		}
		dataExchangeObject.GetDisplayCount = function()
		{
			return this.m_arrayData.length;
		}
		
		var dropList = new GameModeDropList(
			m_game, 
			new Vector(in_button.m_pixelOrigin.m_x + 27, in_button.m_pixelOrigin.m_y + in_button.m_pixelSize.m_y),
			new Vector(in_button.m_pixelSize.m_x - 54, in_button.m_pixelSize.m_y - 8),
			dataExchangeObject
			);
		m_game.PushGameMode(dropList);
	}	
	
	this.CallbackButtonClass = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
	
		var dataExchangeObject = {};
		dataExchangeObject.m_game = m_game;
		dataExchangeObject.m_character = character;
		dataExchangeObject.m_gameModeEditMember = this;
		dataExchangeObject.m_arrayData = m_game.GetArrayDropListDataClass();
		dataExchangeObject.GetSelectedKey = function()
		{
			return this.m_character.GetValue(s_nodeNameClass);
		}
		dataExchangeObject.SetSelectedData = function(in_data)
		{
			this.m_character.SetClass(in_data.m_key);
			this.m_gameModeEditMember.PublicUpdateGui();
		}
		dataExchangeObject.GetArrayListData = function()
		{
			return this.m_arrayData;
		}
		dataExchangeObject.GetDisplayCount = function()
		{
			return this.m_arrayData.length;
		}
		
		var dropList = new GameModeDropList(
			m_game, 
			new Vector(in_button.m_pixelOrigin.m_x + 27, in_button.m_pixelOrigin.m_y + in_button.m_pixelSize.m_y),
			new Vector(in_button.m_pixelSize.m_x - 54, in_button.m_pixelSize.m_y - 8),
			dataExchangeObject
			);
		m_game.PushGameMode(dropList);
	}	
	
	this.CallbackSlotTable = function(in_selectedName, in_button)
	{
		var data = s_mapModifierCharacterSlotData[in_selectedName];

		m_gameSlotInfo.SetData(data);

		if (undefined == data)
		{
			return;
		}

		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
		var arrayTarget = CollectSlotDragTaget(data, character);

		dragItem = {};
		dragItem.m_modifierName = in_selectedName;
		dragItem.m_item = new GuiGameSlotItem(
			new Vector(in_button.m_pixelOrigin.m_x, in_button.m_pixelOrigin.m_y), 
			new Vector(in_button.m_pixelSize.m_x, in_button.m_pixelSize.m_y), 
			data.m_wiggitType, 
			true);
		dragItem.m_gameMode = this;	
		dragItem.Draw = function(in_context, in_canvas)
		{
			this.m_item.Draw(in_context, in_canvas);
		}
		dragItem.SetPosition = function(in_position)
		{
			this.m_item.m_pixelOrigin = in_position;
		}
		
		m_game.PushGameMode(new GameModeDrag(
			m_game, 
			dragItem, 
			new Vector(in_button.m_pixelOrigin.m_x - g_mouseX, in_button.m_pixelOrigin.m_y - g_mouseY), 
			arrayTarget, 
			this
			));		
	}
	this.CallbackCharacterSlot = function(in_button)
	{
		if (m_game.m_party.length <= 0)
		{
			return;
		}
		var character = m_game.m_party[m_game.m_partyIndex];
		if (!character)
		{
			return;
		}		
		
		var modifierName = s_modifierEntitySlot + (in_button.m_key + m_modifierBaseIndex);
		var modifer = character.GetModifier(modifierName);

		if ((undefined == modifer) ||
			(false == modifer.GetActive()))
		{
			return;
		}
		
		var data = s_mapModifierCharacterSlotData[modifer.GetDataName()];
		
		m_gameSlotInfo.SetData(data);
		
		if (undefined == data)
		{
			return;
		}
		
		var arrayTarget = CollectSlotDragTaget(data, character);

		dragItem = {};
		dragItem.m_modifer = modifer;
		dragItem.m_modifierName = modifer.GetDataName();
		dragItem.m_item = new GuiGameSlotItem(
			new Vector(in_button.m_pixelOrigin.m_x, in_button.m_pixelOrigin.m_y), 
			new Vector(in_button.m_pixelSize.m_x, in_button.m_pixelSize.m_y), 
			data.m_wiggitType, 
			true);
		dragItem.m_gameMode = this;	
		dragItem.Draw = function(in_context, in_canvas)
		{
			this.m_item.Draw(in_context, in_canvas);
		}
		dragItem.StartDrag = function()
		{
			this.m_modifer.SetModifier("");
			this.m_gameMode.PublicUpdateGui();
		}
		dragItem.SetPosition = function(in_position)
		{
			this.m_item.m_pixelOrigin = in_position;
		}
		dragItem.Swap = function(in_modifierName)
		{
			this.m_modifer.SetModifier(in_modifierName);		
		}
		
		m_game.PushGameMode(new GameModeDrag(
			m_game, 
			dragItem, 
			new Vector(in_button.m_pixelOrigin.m_x - g_mouseX, in_button.m_pixelOrigin.m_y - g_mouseY), 
			arrayTarget, 
			this
			));
		
	}
	this.CallbackScrollbarSlot = function(in_scrollBar, in_clickLocation)
	{
		m_modifierBaseIndex = Math.max(0, Math.min(Math.floor((in_clickLocation * m_activeModifierCount)), m_activeModifierCount - 8));
		UpdateGui();	
	}
	
	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	    m_time += in_timeDelta;
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	    
		if (0 < m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];

			GameDrawCharacter(
				in_context, 
				in_canvas, 
				new Vector(100, 190), 
				new Vector(100, 100), 
				false, 
				character, 
				s_gameDrawAction.e_idle, 
				m_time
				);	    
		}
	}


	this.PublicUpdateGui = function()
	{
		UpdateGui();
	}
	
	//////////////////////////////////////////////////////
	//private methods 
	function CollectSlotDragTaget(in_data, in_character)
	{
		var result = [];
		var flag = in_data.m_flag;
		for (var index = 0; index < s_maxLevel; ++index)
		{
			var add = false;
			var modifier = in_character.GetModifier(s_modifierEntitySlot + index);
			if (modifier &&
				(true == modifier.GetActive()))
			{
				var type = modifier.GetType();
				add = (((s_modifierSlotType.e_physical == type) &&
						(0 != (flag & s_modifierSlotModifierFlag.e_physical))) ||
					   ((s_modifierSlotType.e_mental == type) &&
						(0 != (flag & s_modifierSlotModifierFlag.e_mental))));
			}
			
			var buttonName = "m_guiGameSlot" + (index - m_modifierBaseIndex);
			
			if ((true == add) &&
				that[buttonName])
			{
				result.push(new ModifierCharacterSlotDragTarget(modifier, that, that[buttonName]));
			}
		}
		
		return result;
	}
	
	function UpdateGuiCharacterSlotScroll()
	{
		if (0 != m_game.m_party.length)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			m_activeModifierCount = 0;
			for (var index = 0; index < s_maxLevel; ++index)
			{
				var modifer = character.GetModifier(s_modifierEntitySlot + index);
				if (modifer &&
					(true == modifer.GetActive()))
				{
					m_activeModifierCount += 1;
				}
			}

			m_modifierBaseIndex = Math.min(m_modifierBaseIndex, Math.max(0, m_activeModifierCount - 8));
			
			if (8 < m_activeModifierCount)
			{
				m_scrollSlot.m_visible = true;
				m_scrollSlot.m_barLow = m_modifierBaseIndex / m_activeModifierCount;
				m_scrollSlot.m_barHigh = (m_modifierBaseIndex + 8) / m_activeModifierCount;
				return;
			}
		}

		m_scrollSlot.m_visible = false;
	}
	
	function UpdateGui()
	{
		UpdateGuiCharacterSlotScroll();
		
		var enable = (0 != m_game.m_party.length)
		var enableCycle = (1 < m_game.m_party.length)
		
		if (enable)
		{
			m_textIndex.m_text = "" + (m_game.m_partyIndex + 1) + " of " + m_game.m_party.length;
		}
		else
		{
			m_textIndex.m_text = "Empty Party";
		}
		
		m_buttonPrev.SetVisible(enableCycle)
		m_buttonNext.SetVisible(enableCycle);	
		m_buttonDelete.SetEnable(enable);	
		m_buttonNew.SetEnable(m_game.m_party.length < s_maxParty);
		
		m_textStrengthStatic.m_visible = enable;
		m_textIntelligenceStatic.m_visible = enable;
		m_textLevelStatic.m_visible = enable;
		m_textSpeedStatic.m_visible = enable;
		m_textCostStatic.m_visible = enable;
		m_textHealthStatic.m_visible = enable;
		m_textArmorStatic.m_visible = enable;
		m_textAuraStatic.m_visible = enable;
		m_textStrength.m_visible = enable;
		m_textIntelligence.m_visible = enable;
		m_textLevel.m_visible = enable;
		m_textSpeed.m_visible = enable;
		m_textCost.m_visible = enable;
		m_textHealth.m_visible = enable;
		m_textArmor.m_visible = enable;
		m_textAura.m_visible = enable;		


		m_textUsedStrStatic.m_visible = enable;
		m_textUsedStr.m_visible = enable;
		m_textUsedIntStatic.m_visible = enable;
		m_textUsedInt.m_visible = enable;
		m_textStatus.m_visible = enable;

		m_textPhysicalResistStatic.m_visible = enable;
		m_textPhysicalResist.m_visible = enable;
		m_textMagicResistStatic.m_visible = enable;
		m_textMagicResist.m_visible = enable;

		m_buttonName.SetEnable(enable);
		m_buttonGender.SetEnable(enable);
		m_buttonRace.SetEnable(enable);
		m_buttonClass.SetEnable(enable);

		m_gameSlotTable.m_visible = enable;
		m_gameSlotInfo.m_visible = enable;

		if (enable)
		{
			var character = m_game.m_party[m_game.m_partyIndex];
			
			m_textStrength.m_text = "" + character.GetValue(s_nodeNameStrength).toFixed(1);
			m_buttonStrengthPlus.SetVisible(true);
			m_buttonStrengthMinus.SetVisible(0 < character.GetValue(s_nodeNameStrengthPlus));

			m_textIntelligence.m_text = "" + character.GetValue(s_nodeNameIntelegence).toFixed(1);
			m_buttonIntelligencePlus.SetVisible(true);
			m_buttonIntelligenceMinus.SetVisible(0 < character.GetValue(s_nodeNameIntelegencePlus));

			m_textLevel.m_text = "" + (character.GetValue(s_nodeNameLevel) + 1);
			m_buttonLevelPlus.SetVisible(character.GetValue(s_nodeNameLevelPlus) < (s_maxLevel - 2));
			m_buttonLevelMinus.SetVisible(0 < character.GetValue(s_nodeNameLevelPlus));

			m_textSpeed.m_text = "" + character.GetValue(s_nodeNameSpeed).toFixed(1);

			m_textCost.m_text = "" + character.GetValue(s_nodeNameCost).toFixed(1);

			m_textHealth.m_text = "" + character.GetValue(s_nodeNameHitPoint).toFixed(1);

			m_textArmor.m_text = "" + character.GetValue(s_nodeNameArmor).toFixed(1);
			
			m_textAura.m_text = "" + character.GetValue(s_nodeNameAuraShield).toFixed(1);
			
			m_textUsedStr.m_text = "" + character.GetValue(s_nodeNameUsedStrength).toFixed(1) + "/" + character.GetValue(s_nodeNameStrength).toFixed(1);
			m_textUsedInt.m_text = "" + character.GetValue(s_nodeNameUsedIntelegence).toFixed(1) + "/" + character.GetValue(s_nodeNameIntelegence).toFixed(1);
			
			m_textPhysicalResist.m_text = "" + (character.GetValue(s_nodeNameResistPhysical) * 100.0).toFixed(1) + "%";
			m_textMagicResist.m_text = "" + (character.GetValue(s_nodeNameResistMagic) * 100.0).toFixed(1) + "%";
			
			m_buttonName.m_text = character.m_name;
			m_buttonGender.m_text = character.GetValue(s_nodeNameGenderName);
			m_buttonRace.m_text = character.GetValue(s_nodeNameRaceName);
			m_buttonClass.m_text = character.GetValue(s_nodeNameClassName);
				
			for (var index = 0; index < 8; ++index)
			{
				var modifer = character.GetModifier(s_modifierEntitySlot + (index + m_modifierBaseIndex));
				var active = modifer.GetActive();

				buttonName = "m_guiGameSlot" + index;
				var button  = that[buttonName];
				button.m_visible = active;
				button.m_type = modifer.GetDataWigitteType();
				
				var textName = "m_guiGameSlotText" + index;
				if (true == active)
				{
					var data = s_mapModifierCharacterSlotData[modifer.GetDataName()];
					if (data)
					{
						that[textName].m_text = data.m_description.m_prettyName;
					}
					else
					{
						that[textName].m_text = "";
					}
				}
				that[textName].m_visible = active;
			}
			
			m_gameSlotTable.SetClassFilter(character.GetValue(s_nodeNameClass));
			
			var modeiferValid = character.GetModifier(s_modifierEntityValid);
			m_textStatus.m_text = modeiferValid.GetStatusMessage();
			
			if (false == character.GetValue(s_nodeNameUsedStrengthValid))
			{
				m_textUsedStrStatic.m_fill = "#FF0000";
				m_textUsedStr.m_fill = "#FF0000";
			}
			else
			{
				m_textUsedStrStatic.m_fill =GuiTextGetDefaultFill();
				m_textUsedStr.m_fill = GuiTextGetDefaultFill();			
			}

			if (false == character.GetValue(s_nodeNameUsedIntelegenceValid))
			{
				m_textUsedIntStatic.m_fill = "#FF0000";
				m_textUsedInt.m_fill = "#FF0000";
			}
			else
			{
				m_textUsedIntStatic.m_fill =GuiTextGetDefaultFill();
				m_textUsedInt.m_fill = GuiTextGetDefaultFill();			
			}	
			
		}
		else
		{
			m_buttonStrengthPlus.SetVisible(false);
			m_buttonStrengthMinus.SetVisible(false);
			m_buttonIntelligencePlus.SetVisible(false);
			m_buttonIntelligenceMinus.SetVisible(false);
			m_buttonLevelPlus.SetVisible(false);
			m_buttonLevelMinus.SetVisible(false);
			
			m_buttonName.m_text = "NAME";
			m_buttonGender.m_text = "GENDER";
			m_buttonRace.m_text = "RACE";
			m_buttonClass.m_text = "CLASS";			
			
			for (var index = 0; index < 8; ++index)
			{
				buttonName = "m_guiGameSlot" + index;
				var button  = that[buttonName];
				button.m_visible = false;
				
				var textName = "m_guiGameSlotText" + index;
				that[textName].m_visible = false;
			}						
		}
		
	}
	
	function ClampPartyIndex()
	{
		if (m_game.m_party.length <= m_game.m_partyIndex)
		{
			m_game.m_partyIndex = 0;
		}
		if (m_game.m_partyIndex < 0)
		{
			m_game.m_partyIndex = m_game.m_party.length - 1;
			if (m_game.m_partyIndex < 0)
			{
				m_game.m_partyIndex = 0;
			}
		} 			
	}
	
	ClampPartyIndex();
	UpdateGui();
}

//-- END // End Concatinate, unit test or other follows


