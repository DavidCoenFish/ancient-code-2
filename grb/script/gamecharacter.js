//gamecharacter.js

function GameCharacter()
{
	//DEBUG if ( !(this instanceof GameCharacter) )
	//DEBUG {
	//DEBUG 	alert("GameCharacter: call constuctor with new keyword");	
	//DEBUG }

	//private members    
    var that = this;	
	
	//inherit from GameEntity
	GameEntity.call(this, "");

    this.AddModifier(s_modifierEntityBase, ModifierCharacter);    
    this.AddModifier(s_modifierEntityAi, ModifierCharacterAi);    
	this.AddModifier(s_modifierEntityRace, ModifierCharacterRace);
	this.AddModifier(s_modifierEntityGender, ModifierCharacterGender);
	this.AddModifier(s_modifierEntityClass, ModifierCharacterClass);
    this.AddModifierParam(s_modifierEntityPlusStrength, ModifierPlusStat, 
	{
		"m_baseCost" : s_strengthPlusCost,
		"m_statNodeName" : s_nodeNameStrengthPlus,
		"m_statNodeNameTarget" : s_nodeNameStrengthBase,
		"m_statNodeNameCost" : s_nodeNameStrengthPlusCost,
		"m_statNodeNameCostTarget" : s_nodeNameCost
	});
	this.AddModifierParam(s_modifierEntityPlusIntelegence, ModifierPlusStat, 
	{
		"m_baseCost" : s_intelegencePlusCost,
		"m_statNodeName" : s_nodeNameIntelegencePlus,
		"m_statNodeNameTarget" : s_nodeNameIntelegenceBase,
		"m_statNodeNameCost" : s_nodeNameIntelegencePlusCost,
		"m_statNodeNameCostTarget" : s_nodeNameCost
	});
	this.AddModifierParam(s_modifierEntityPlusLevel, ModifierPlusStat, 
	{
		"m_baseCost" : s_levelPlusCost,
		"m_statNodeName" : s_nodeNameLevelPlus,
		"m_statNodeNameTarget" : s_nodeNameLevel,
		"m_statNodeNameCost" : s_nodeNameLevelPlusCost,
		"m_statNodeNameCostTarget" : s_nodeNameCost,
		"m_limit" : (s_maxLevel - 1)
	});

	this.AddModifier(s_modifierEntityValid, ModifierCharacterValid);
	this.AddModifier(s_modifierEntityBattle, ModifierCharacterBattle);
	
	for (var index = 0; index < s_maxLevel; ++index)
	{
		this.AddModifierParam(s_modifierEntitySlot + index, ModifierCharacterSlot, { m_prepend: ("" + index)});
	}

	UpdateName();
	UpdateModifierSlots(true); //after setting 'that'

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.SetNameId = function(in_nameID)
	{
		that.GetModifier(s_modifierEntityBase).SetNameId(in_nameID);
		UpdateName();
	}	
	
	this.SetRace = function(in_race)
	{
		that.GetModifier(s_modifierEntityRace).SetRace(in_race);
		UpdateName();
	}

	this.SetGender = function(in_gender)
	{
		that.GetModifier(s_modifierEntityGender).SetGender(in_gender);
		UpdateName();
	}

	this.SetClass = function(in_class)
	{
		that.GetModifier(s_modifierEntityClass).SetClass(in_class);
		UpdateModifierSlots(true);
	}
	
	this.BeginBattle = function(in_position)
	{
		that.DeleteModifier(s_modifierEntityBattle);
		that.AddModifier(s_modifierEntityBattle, ModifierCharacterBattle);
		that.GetModifier(s_modifierEntityBattle).SetPosition(in_position);
	}
	

	this.PublicUpdateModifierSlots = function()
	{
		UpdateModifierSlots(false);
	}
  
	///////////////////////////////////////////////////////
	//private methods
	function UpdateName()
	{
		var nameId = that.GetValue(s_nodeNameNameId);
		var gender = that.GetValue(s_nodeNameGender);
		var race = that.GetValue(s_nodeNameRace);
		
		that.m_name = GameVarGetName(nameId, gender, race);
	}
	
	function UpdateModifierSlots(in_setModifier)
	{
		var level = that.GetValue(s_nodeNameLevel);
		var mclass = that.GetValue(s_nodeNameClass);

		for (var index = 0; index < s_maxLevel; ++index)
		{
			var active = index < (level + 2);
			var modifier = that.GetModifier(s_modifierEntitySlot + index);
			if (!modifier)
			{
				continue;
			}
			modifier.SetActive(active);
			var type = s_modifierSlotType.e_count; //e_physical, e_mental
			var defaultModifier = "";
			switch (mclass)
			{
			case s_modifierClass.e_fighter:
				//p p m p p m p p m          
				type = s_modifierSlotType.e_physical + ((index % 3) == 2);
				defaultModifier = s_arrayDefaultModifierFighter[index];
				break;
			case s_modifierClass.e_mage:
				//m m p m m p m m p
				type = s_modifierSlotType.e_physical + ((index % 3) != 2);
				defaultModifier = s_arrayDefaultModifierMage[index];
				break;
			case s_modifierClass.e_cleric:
				//m p m p m p m p m
				type = s_modifierSlotType.e_physical + ((index & 1) == 0);
				defaultModifier = s_arrayDefaultModifierCleric[index];
				break;	
			case s_modifierClass.e_thief:
				//p m p m p m p m p
				type = s_modifierSlotType.e_physical + ((index & 1) != 0);
				defaultModifier = s_arrayDefaultModifierThief[index];
			break;
			default:
			}
			
			modifier.SetType(type);
			if (in_setModifier && defaultModifier)
			{
				modifier.SetModifier(defaultModifier);
			}
		}
	}  
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;
		
		//construction
		if (true == result)
		{
			var gameCharacter1 = new GameCharacter("foo");
			var gameCharacter2 = new GameCharacter("bar");

			result &= ("foo" == gameCharacter1.m_name);
			result &= ("bar" == gameCharacter2.m_name);
			result &= (undefined == gameCharacter1.GetValue("foo"));

			//result &= (s_entityBaseStrength == gameCharacter1.GetValue(s_nodeNameStrength));		
		}

		//test modifier
		{
			function ModifierFactory(in_nodeGraph)
			{
				if ( !(this instanceof ModifierFactory) )
				{
					alert("ModifierFactory: call constuctor with new keyword");				
					//return new ModifierFactory(in_nodeGraph);
				}			
				var m_nodeGraph = in_nodeGraph;
				this.Activate = function()
				{
					m_nodeGraph.CreateNode("bar", s_nodeValueOpperation.e_valueData, 7.3);
				}
				this.Deactivate = function()
				{
					m_nodeGraph.DeleteNode("bar");
				}
			}

			var gameCharacter = new GameCharacter("foo");
			gameCharacter.AddModifier("goo", ModifierFactory);

			result &= (7.3 == gameCharacter.GetValue("bar"));
			gameCharacter.DeleteModifier("goo", ModifierFactory);
			result &= (undefined == gameCharacter.GetValue("bar"));	
		}
		
		if (true != result)
		{
			return "Fail:GameCharacter";
		}
		return "Pass:GameCharacter";
	}
	
	g_arrayUnitTest.push(out_object);
}

