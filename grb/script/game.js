//game.js

function Game(in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof Game) )
	//DEBUG {
	//DEBUG 	alert("Game: call constuctor with new keyword");
	//DEBUG }
	
	g_game = this;
	//common game constants
	this.m_context = in_context;
	this.m_canvas = in_canvas;
	
	this.m_gradientBackground = in_context.createLinearGradient(0, 0, in_canvas.width, 0);
	this.m_gradientBackground.addColorStop(0.0, "#d2b387");
	this.m_gradientBackground.addColorStop(0.3, "#e3c69e");
	this.m_gradientBackground.addColorStop(0.7, "#e3c69c");
	this.m_gradientBackground.addColorStop(1.0, "#d4b080");	
	this.m_buttonStyle = s_guiButtonStyle.e_fancy; //e_simple; //e_fancy;
	
	this.m_party = [];
	this.m_partyIndex = 0;
	
	var m_localPartyDeploy = [];
	var m_opponentParty = [];
	var m_localBattleOpponentDeploy = [];
	
	this.m_localBattleIndex = 0;	
			
	var that = this;
	var m_arrayGameMode = [];

	var m_time = undefined;
	var m_averageFPS = undefined;
	var m_mouseDownRepeatTimer = 0.0;
	var m_mouseDownRepeatDuration = 0.75;
	var m_enableMouseRepeat = true;

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.SetEnableMouseRepeat = function(in_enable)
	{
		m_enableMouseRepeat = in_enable;
	}
	this.SetGameMode = function(in_gameMode)
	{
		m_arrayGameMode.length = 0;
		that.PushGameMode(in_gameMode);
	}
	
	this.PushGameMode = function(in_gameMode)
	{
		if (0 < m_arrayGameMode.length)
		{
			var gameMode = m_arrayGameMode[m_arrayGameMode.length - 1];
			if (gameMode.Pause)
			{
				gameMode.Pause()
			}
		}
		
		m_arrayGameMode.push(in_gameMode);
	
		if (in_gameMode.Begin)
		{
			in_gameMode.Begin()
		}
	}
	
	this.PopGameMode = function()
	{
		if (0 < m_arrayGameMode.length)
		{
			var gameMode = m_arrayGameMode[m_arrayGameMode.length - 1];
			if (gameMode.End)
			{
				gameMode.End()
			}
			m_arrayGameMode.length -= 1;
		}	
		
		if (0 < m_arrayGameMode.length)
		{
			var gameMode = m_arrayGameMode[m_arrayGameMode.length - 1];
			if (gameMode.Resume)
			{
				gameMode.Resume()
			}
		}		
	}
	
	this.Update = function()	
	{
		var timeDelta = 0.0;
		if (undefined == m_time)
		{
			m_time = (new Date()).getTime();
		}
		else
		{
			var newTime = (new Date()).getTime();
			timeDelta = (newTime - m_time) / 1000.0;
			m_time = newTime;

			if (0.0 != timeDelta)
			{
				var fps = 1.0 / timeDelta;
				if (undefined == m_averageFPS)
				{
					m_averageFPS = fps;
				}
				else
				{
					m_averageFPS = (fps * 0.1) + (m_averageFPS * 0.9);
				}
			}
		}
		
		//limit frame rate to 20, else you can get a massive delta while away from the page
		timeDelta = Math.min(0.05, timeDelta);

		if (g_mouseDown)
		{
			if (true == m_enableMouseRepeat)
			{
				m_mouseDownRepeatTimer += timeDelta;
				if (m_mouseDownRepeatDuration < m_mouseDownRepeatTimer)
				{
					m_mouseDownRepeatTimer -= m_mouseDownRepeatDuration;
					g_mouseEdge = true;
					//running at 30 fps?
					m_mouseDownRepeatDuration = (m_mouseDownRepeatDuration * 0.8) + (0.03 * 0.2); 
				}
			}
		}	
		else
		{
			m_mouseDownRepeatDuration = 0.75;
			m_mouseDownRepeatTimer = 0.0;
		}
		
		if (0 < m_arrayGameMode.length)
		{
			var gameMode = m_arrayGameMode[m_arrayGameMode.length - 1];	
			if (gameMode && gameMode.Tick)
			{
				gameMode.Tick(timeDelta);
			}
		}
		//tick can change m_arrayGameMode
		if (0 < m_arrayGameMode.length)
		{
			var gameMode = m_arrayGameMode[m_arrayGameMode.length - 1];	
			if (gameMode && gameMode.Draw)
			{
				gameMode.Draw(this.m_context, this.m_canvas);
			}
		}	
		
		//fps
		in_context.save();
		in_context.font = GuiTextGetSmallFont();
		in_context.textAlign = "left";		
		in_context.textBaseline = "bottom";
		in_context.fillStyle = "#000000"
		in_context.fillText("" + Math.floor(m_averageFPS), 2, in_canvas.height);      
		in_context.restore();	
	}

	this.GetArrayDropListDataName = function(in_gender, in_race)
	{
		var arrayName = GameVarGetArrayName(in_gender, in_race);
		var arrayData = [];
		arrayName.forEach(function(in_item, in_index){
			arrayData.push(new GuiListData(in_item, in_index, false));
		});
		return arrayData;
	}
	
	this.GetArrayDropListDataGender = function()
	{
		var arrayData = [];
		arrayData.push(new GuiListData("Male", s_modifierGender.e_male, false));
		arrayData.push(new GuiListData("Female", s_modifierGender.e_female, false));
		arrayData.push(new GuiListData("Other", s_modifierGender.e_other, false));
		return arrayData;
	}
	this.GetArrayDropListDataRace = function()
	{
		var arrayData = [];
		arrayData.push(new GuiListData("Ork", s_modifierRace.e_ork, false));
		arrayData.push(new GuiListData("Dwarf", s_modifierRace.e_dwarf, false));
		arrayData.push(new GuiListData("Barbarian", s_modifierRace.e_barbarian, false));
		arrayData.push(new GuiListData("Tribal", s_modifierRace.e_tribal, false));
		arrayData.push(new GuiListData("Nomad", s_modifierRace.e_nomad, false));
		arrayData.push(new GuiListData("Elf", s_modifierRace.e_elf, false));
		arrayData.push(new GuiListData("Fae", s_modifierRace.e_fae, false));
		return arrayData;		
	}	
	this.GetArrayDropListDataClass = function()
	{
		var arrayData = [];
		arrayData.push(new GuiListData("Fighter", s_modifierClass.e_fighter, false));
		arrayData.push(new GuiListData("Mage", s_modifierClass.e_mage, false));
		arrayData.push(new GuiListData("Cleric", s_modifierClass.e_cleric, false));
		arrayData.push(new GuiListData("Thief", s_modifierClass.e_thief, false));
		return arrayData;		
	}
	
	this.GetArrayModifierSlot = function(in_filterType, in_filterClass)
	{
		var result = [];
		
		var classFlag = s_modifierSlotModifierFlag.e_all;
		switch (in_filterClass)
		{
		case s_guiGameSlotTableFilterClass.e_fighter:
			classFlag = s_modifierSlotModifierFlag.e_fighter;
			break;
		case s_guiGameSlotTableFilterClass.e_mage:
			classFlag = s_modifierSlotModifierFlag.e_mage;
			break;
		case s_guiGameSlotTableFilterClass.e_cleric:
			classFlag = s_modifierSlotModifierFlag.e_cleric;
			break;
		case s_guiGameSlotTableFilterClass.e_thief:
			classFlag = s_modifierSlotModifierFlag.e_thief;
			break;
		default:
		}

		for (key in s_mapModifierCharacterSlotData)
		{
			var modifierData = s_mapModifierCharacterSlotData[key];
			var flag = modifierData.m_flag;

			if (0 == (flag & classFlag))
			{
				continue;
			}
						
			var pass = false;
			switch (in_filterType)
			{
			case s_guiGameSlotTableFilter.e_all:
				pass = true;
				break;
			case s_guiGameSlotTableFilter.e_allMental:
				pass = (0 != (flag & s_modifierSlotModifierFlag.e_mental));
				break;
			case s_guiGameSlotTableFilter.e_allPhysical:
				pass = (0 != (flag & s_modifierSlotModifierFlag.e_physical));
				break;
			case s_guiGameSlotTableFilter.e_physicalAttackMetalRange:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalAttackMetalRange);
				break;
			case s_guiGameSlotTableFilter.e_physicalAttackMetalTouch:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalAttackMetalTouch);
				break;
			case s_guiGameSlotTableFilter.e_physicalAttackNometalRange:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalAttackNometalRange);
				break;
			case s_guiGameSlotTableFilter.e_physicalAttackNometalTouch:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalAttackNometalTouch);
				break;
			case s_guiGameSlotTableFilter.e_physicalDefendMetal:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalDefendMetal);
				break;
			case s_guiGameSlotTableFilter.e_physicalDefendNometal:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalDefendNometal);
				break;
			case s_guiGameSlotTableFilter.e_physicalBuffSelf:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_physicalBuffSelf);
				break;
			case s_guiGameSlotTableFilter.e_mentalAttackRange:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalAttackRange);
				break;
			case s_guiGameSlotTableFilter.e_mentalAttackTouch:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalAttackTouch);
				break;
			case s_guiGameSlotTableFilter.e_mentalHealRange:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalHealRange);
				break;
			case s_guiGameSlotTableFilter.e_mentalHealTouch:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalHealTouch);
				break;
			case s_guiGameSlotTableFilter.e_mentalHealSelf:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalHealSelf);
				break;
			case s_guiGameSlotTableFilter.e_mentalDefend:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalDefend);
				break;
			case s_guiGameSlotTableFilter.e_mentalBuffRange:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalBuffRange);
				break;
			case s_guiGameSlotTableFilter.e_mentalBuffSelf:
				pass = (modifierData.m_wiggitType == s_guiGameSlotItemType.e_mentalBuffSelf);
				break;					
			default:		
			}

			if (false == pass)
			{
				continue;
			}
			
			result.push(key);
		}
		
		return result;
	}
	
	this.ResetParty = function()
	{
		this.m_partyIndex = 0;			
		this.m_party.length = 0;
		
		//for (var index = 0; index < 4; ++index)
		////for (var index = 3; index < 7; ++index)
		//{
		//	for (var subIndex = 0; subIndex < 4; ++subIndex)
		//	{
		//		for (var subSubIndex = 0; subSubIndex < 2; ++subSubIndex)
		//		{
		//			var character = new GameCharacter();
		//			character.SetNameId(index + subIndex);
		//			character.SetRace(index);
		//			character.SetGender(subSubIndex);
		//			character.SetClass(subIndex);
		//			this.m_party.push(character);
		//		}
		//	}
		//}
		
		{
			var character = new GameCharacter();
			character.SetNameId(10);
			character.SetRace(s_modifierRace.e_barbarian);
			character.SetGender(s_modifierGender.e_male);
			character.SetClass(s_modifierClass.e_fighter);
			this.m_party.push(character);
		}
		{
			var character = new GameCharacter();
			character.SetNameId(10);
			character.SetRace(s_modifierRace.e_tribal);
			character.SetGender(s_modifierGender.e_female);
			character.SetClass(s_modifierClass.e_mage);
			this.m_party.push(character);
		}
		{
			var character = new GameCharacter();
			character.SetNameId(10);
			character.SetRace(s_modifierRace.e_nomad);
			character.SetGender(s_modifierGender.e_female);
			character.SetClass(s_modifierClass.e_cleric);
			this.m_party.push(character);
		}
		{
			var character = new GameCharacter();
			character.SetNameId(10);
			character.SetRace(s_modifierRace.e_tribal);
			character.SetGender(s_modifierGender.e_male);
			character.SetClass(s_modifierClass.e_thief);
			this.m_party.push(character);
		}
	}
	
	this.GetLocalBattelDeployedPlayer = function(in_index)
	{
		while (m_localPartyDeploy.length <= in_index)
		{
			var item = [];
			m_localPartyDeploy.push(item);
		}		
		return m_localPartyDeploy[in_index];
	}
	this.GetLocalBattelParty = function(in_index)
	{
		return m_opponentParty[in_index];
	}
	this.GetLocalBattelDeployedOpponent = function(in_index)
	{
		return m_localBattleOpponentDeploy[in_index];
	}

	this.SetupGameVar = function()
	{
		//battle 0
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(0);
			char0.SetRace(s_modifierRace.e_tribal);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_thief);
			party.push(char0);
			
			var char1 = new GameCharacter();
			char1.SetNameId(0);
			char1.SetRace(s_modifierRace.e_barbarian);
			char1.SetGender(s_modifierGender.e_male);
			char1.SetClass(s_modifierClass.e_fighter);
			party.push(char1);			
			
			deploy.push(new DeployCharacterData(new Vector(12.0, 5.8), true, 0));
			deploy.push(new DeployCharacterData(new Vector(8.0, 5.8), true, 1));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 1
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(1);
			char0.SetRace(s_modifierRace.e_nomad);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_cleric);
			char0.GetModifier(s_modifierEntitySlot + 1).SetModifier("Sling");
			party.push(char0);
			
			var char1 = new GameCharacter();
			char1.SetNameId(1);
			char1.SetRace(s_modifierRace.e_tribal);
			char1.SetGender(s_modifierGender.e_female);
			char1.SetClass(s_modifierClass.e_thief);
			party.push(char1);			
			
			var char2 = new GameCharacter();
			char2.SetNameId(1);
			char2.SetRace(s_modifierRace.e_barbarian);
			char2.SetGender(s_modifierGender.e_male);
			char2.SetClass(s_modifierClass.e_fighter);
			party.push(char2);			
			
			deploy.push(new DeployCharacterData(new Vector(12.0, 3.8), true, 0));
			deploy.push(new DeployCharacterData(new Vector(12.0, 7.8), true, 1));
			deploy.push(new DeployCharacterData(new Vector(8.0, 5.8), true, 2));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 2
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(2);
			char0.SetRace(s_modifierRace.e_nomad);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_cleric);
			char0.GetModifier(s_modifierEntitySlot + 1).SetModifier("Sling");
			party.push(char0);
			
			var char1 = new GameCharacter();
			char1.SetNameId(2);
			char1.SetRace(s_modifierRace.e_tribal);
			char1.SetGender(s_modifierGender.e_female);
			char1.SetClass(s_modifierClass.e_mage);
			party.push(char1);			
			
			var char2 = new GameCharacter();
			char2.SetNameId(2);
			char2.SetRace(s_modifierRace.e_barbarian);
			char2.SetGender(s_modifierGender.e_male);
			char2.SetClass(s_modifierClass.e_fighter);
			party.push(char2);			
						
			var char3 = new GameCharacter();
			char3.SetNameId(3);
			char3.SetRace(s_modifierRace.e_tribal);
			char3.SetGender(s_modifierGender.e_male);
			char3.SetClass(s_modifierClass.e_thief);
			party.push(char3);
				
			deploy.push(new DeployCharacterData(new Vector(12.0, 3.8), true, 0));
			deploy.push(new DeployCharacterData(new Vector(12.0, 7.8), true, 1));
			deploy.push(new DeployCharacterData(new Vector(8.0, 5.8), true, 2));
			deploy.push(new DeployCharacterData(new Vector(14.0, 5.8), true, 3));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}		
		//battle 3
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(3);
			char0.SetRace(s_modifierRace.e_elf);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_cleric);
			char0.GetModifier(s_modifierEntitySlot + 0).SetModifier("Greater resurrect");
			char0.GetModifier(s_modifierEntitySlot + 1).SetModifier("Sling");
			char0.GetModifier(s_modifierEntitySlot + 2).SetModifier("Healing word");
			char0.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.PublicUpdateModifierSlots();
			party.push(char0);
			
			var char1 = new GameCharacter();
			char1.SetNameId(3);
			char1.SetRace(s_modifierRace.e_ork);
			char1.SetGender(s_modifierGender.e_male);
			char1.SetClass(s_modifierClass.e_fighter);
			char1.GetModifier(s_modifierEntitySlot + 1).SetModifier("Short sword");
			party.push(char1);			
			
			deploy.push(new DeployCharacterData(new Vector(12.0, 5.8), true, 0));
			deploy.push(new DeployCharacterData(new Vector(8.0, 5.8), true, 1));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 4
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(4);
			char0.SetRace(s_modifierRace.e_elf);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_mage);
			char0.GetModifier(s_modifierEntitySlot + 0).SetModifier("Shock");
			char0.GetModifier(s_modifierEntitySlot + 1).SetModifier("Aura shell");
			char0.GetModifier(s_modifierEntitySlot + 2).SetModifier("Focus physical resistance");
			char0.GetModifier(s_modifierEntitySlot + 3).SetModifier("Fortify magic resistance");
			char0.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char0.PublicUpdateModifierSlots();
			party.push(char0);
			
			deploy.push(new DeployCharacterData(new Vector(8.0, 5.8), true, 0));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 5
		{
			var party = [];
			var deploy = [];
			
			var char0 = new GameCharacter();
			char0.SetNameId(5);
			char0.SetRace(s_modifierRace.e_ork);
			char0.SetGender(s_modifierGender.e_female);
			char0.SetClass(s_modifierClass.e_fighter);
			char0.GetModifier(s_modifierEntitySlot + 0).SetModifier("2 handed sword");
			char0.GetModifier(s_modifierEntitySlot + 1).SetModifier("2 handed sword");
			char0.GetModifier(s_modifierEntitySlot + 2).SetModifier("Flesh knit");
			char0.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char0.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char0.PublicUpdateModifierSlots();
			party.push(char0);
			
			var char1 = new GameCharacter();
			char1.SetNameId(6);
			char1.SetRace(s_modifierRace.e_ork);
			char1.SetGender(s_modifierGender.e_female);
			char1.SetClass(s_modifierClass.e_fighter);
			char1.GetModifier(s_modifierEntitySlot + 0).SetModifier("2 handed sword");
			char1.GetModifier(s_modifierEntitySlot + 1).SetModifier("2 handed sword");
			char1.GetModifier(s_modifierEntitySlot + 2).SetModifier("Flesh knit");
			char1.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
			char1.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char1.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char1.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char1.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char1.PublicUpdateModifierSlots();
			party.push(char1);

			var char2 = new GameCharacter();
			char2.SetNameId(5);
			char2.SetRace(s_modifierRace.e_elf);
			char2.SetGender(s_modifierGender.e_female);
			char2.SetClass(s_modifierClass.e_cleric);
			char2.GetModifier(s_modifierEntitySlot + 0).SetModifier("Greater resurrect");
			char2.GetModifier(s_modifierEntitySlot + 1).SetModifier("Sling");
			char2.GetModifier(s_modifierEntitySlot + 2).SetModifier("Healing word");
			char2.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char2.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
			char2.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char2.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char2.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			char2.PublicUpdateModifierSlots();
			party.push(char2);

			
			var char3 = new GameCharacter();
			char3.SetNameId(6);
			char3.SetRace(s_modifierRace.e_elf);
			char3.SetGender(s_modifierGender.e_female);
			char3.SetClass(s_modifierClass.e_mage);
			char3.GetModifier(s_modifierEntitySlot + 0).SetModifier("Burning hands");
			char3.GetModifier(s_modifierEntitySlot + 1).SetModifier("Armour rebind");
			char3.GetModifier(s_modifierEntitySlot + 2).SetModifier("Magic cloak");
			char3.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
			char3.PublicUpdateModifierSlots();
			party.push(char3);

			deploy.push(new DeployCharacterData(new Vector(8.0, 4.8), true, 0));
			deploy.push(new DeployCharacterData(new Vector(8.0, 8.8), true, 1));
			deploy.push(new DeployCharacterData(new Vector(12.0, 6.8), true, 2));
			deploy.push(new DeployCharacterData(new Vector(9.0, 6.8), true, 3));
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 6
		{
			var party = [];
			var deploy = [];
			
			for (var index = 0; index < 6; ++index)
			{
				var character = new GameCharacter();
				character.SetNameId(6 + index);
				character.SetRace(s_modifierRace.e_dwarf);
				character.SetGender(s_modifierGender.e_female);
				character.SetClass(s_modifierClass.e_fighter);
				character.GetModifier(s_modifierEntitySlot + 0).SetModifier("War hammer");
				character.GetModifier(s_modifierEntitySlot + 1).SetModifier("Plate mail");
				character.GetModifier(s_modifierEntitySlot + 2).SetModifier("Armour knit");
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.PublicUpdateModifierSlots();

				deploy.push(new DeployCharacterData(new Vector(8.0, 1.8 + (2.0 * index)), true, party.length));

				party.push(character);

			}
			for (var index = 0; index < 5; ++index)
			{
				var character = new GameCharacter();
				character.SetNameId(6 + index);
				character.SetRace(s_modifierRace.e_dwarf);
				character.SetGender(s_modifierGender.e_male);
				character.SetClass(s_modifierClass.e_thief);
				character.GetModifier(s_modifierEntitySlot + 0).SetModifier("Crossbow");
				character.GetModifier(s_modifierEntitySlot + 1).SetModifier("Fortify magic resistance");
				character.GetModifier(s_modifierEntitySlot + 2).SetModifier("Crossbow");
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.PublicUpdateModifierSlots();

				deploy.push(new DeployCharacterData(new Vector(10.0, 2.8 + (2.0 * index)), true, party.length));
				party.push(character);
			}
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}
		//battle 7
		{
			var party = [];
			var deploy = [];
			
			for (var index = 0; index < 6; ++index)
			{
				var character = new GameCharacter();
				character.SetNameId(10 + index);
				character.SetRace(s_modifierRace.e_ork);
				character.SetGender(s_modifierGender.e_female);
				character.SetClass(s_modifierClass.e_fighter);
				character.GetModifier(s_modifierEntitySlot + 0).SetModifier("2 handed sword");
				character.GetModifier(s_modifierEntitySlot + 1).SetModifier("2 handed sword");
				character.GetModifier(s_modifierEntitySlot + 2).SetModifier("Armour rebind");
				character.GetModifier(s_modifierEntitySlot + 3).SetModifier("Plate mail");
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.PublicUpdateModifierSlots();

				deploy.push(new DeployCharacterData(new Vector(8.0, 1.8 + (2.0 * index)), true, party.length));

				party.push(character);

			}
			for (var index = 0; index < 2; ++index)
			{
				var character = new GameCharacter();
				character.SetNameId(6 + index);
				character.SetRace(s_modifierRace.e_fae);
				character.SetGender(s_modifierGender.e_female);
				character.SetClass(s_modifierClass.e_cleric);
				character.GetModifier(s_modifierEntitySlot + 0).SetModifier("Resurrect");
				character.GetModifier(s_modifierEntitySlot + 1).SetModifier("Magic cloak");
				character.GetModifier(s_modifierEntitySlot + 2).SetModifier("Armour knit");
				character.GetModifier(s_modifierEntitySlot + 3).SetModifier("Magic cloak");
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.GetModifier(s_modifierEntityPlusLevel).IncrementPlus();
				character.PublicUpdateModifierSlots();

				deploy.push(new DeployCharacterData(new Vector(10.0, 2.8 + (8.0 * index)), true, party.length));
				party.push(character);
			}
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}				
		//battle 8
		{
			var party = [];
			var deploy = [];
					
			for (var index = 2; index < 5; ++index)
			{
				for (var subIndex = 0; subIndex < 4; ++subIndex)
				{
					for (var subSubIndex = 0; subSubIndex < 2; ++subSubIndex)
					{
						var character = new GameCharacter();
						character.SetNameId(index + subIndex);
						character.SetRace(index);
						character.SetGender(subSubIndex);
						character.SetClass(subIndex);
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			
						deploy.push(new DeployCharacterData(new Vector(10.0 + (2.0 * subIndex), -5.5 + (2.0 * ((index * 2) + subSubIndex))), true, party.length));
						party.push(character);

					}
				}
			}		
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}	
		
		//battle 9
		{
			var party = [];
			var deploy = [];
					
			var index = 0;
			{
				for (var subIndex = 0; subIndex < 4; ++subIndex)
				{
					for (var subSubIndex = 0; subSubIndex < 2; ++subSubIndex)
					{
						var character = new GameCharacter();
						character.SetNameId(index + subIndex);
						character.SetRace(index);
						character.SetGender(subSubIndex);
						character.SetClass(subIndex);
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			
						deploy.push(new DeployCharacterData(new Vector(10.0 + (2.0 * subIndex), 3.5 + (2.0 * subSubIndex)), true, party.length));
						party.push(character);

					}
				}
			}		
			var index = 6;
			{
				for (var subIndex = 0; subIndex < 4; ++subIndex)
				{
					for (var subSubIndex = 0; subSubIndex < 2; ++subSubIndex)
					{
						var character = new GameCharacter();
						character.SetNameId(index + subIndex);
						character.SetRace(index);
						character.SetGender(subSubIndex);
						character.SetClass(subIndex);
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusStrength).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
						character.GetModifier(s_modifierEntityPlusIntelegence).IncrementPlus();
			
						deploy.push(new DeployCharacterData(new Vector(10.0 + (2.0 * subIndex), 7.5 + (2.0 * subSubIndex)), true, party.length));
						party.push(character);

					}
				}
			}		
			
			m_opponentParty.push(party);
			m_localBattleOpponentDeploy.push(deploy);
		}		
	}
	
	this.SetGameMode(new GameModeMain(this));
	this.ResetParty();
	this.SetupGameVar();
	this.Update();
}

//-- END // End Concatinate, unit test or other follows


