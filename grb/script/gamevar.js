//gamevar.js

var s_modifierRace = {
  "e_ork" : 0,
  "e_dwarf" : 1,
  "e_barbarian" : 2,
  "e_tribal" : 3,
  "e_nomad" : 4,
  "e_elf" : 5,
  "e_fae" : 6,
  "e_count" : 7
  };
  
var s_modifierGender = {
  "e_male" : 0,
  "e_female" : 1,
  "e_other" : 2,
  "e_count" : 3
  };
   
var s_modifierClass = {
  "e_fighter" : 0,
  "e_mage" : 1,
  "e_cleric" : 2,
  "e_thief" : 3,
  "e_count" : 4
  };
    
var s_modifierSlotType = {
  "e_physical" : 0,
  "e_mental" : 1,
  "e_count" : 2
  };

var s_modifierSlotModifierFlag = {
  "e_none" : 0,
  "e_fighter" : 1,
  "e_mage" : 2,
  "e_cleric" : 4,
  "e_thief" : 8,
  "e_physical" : 16,
  "e_mental" : 32,
  "e_requiresNoMetal" : 64,
  "e_metal" : 128,
  
  //"e_attack" : 256,
  //"e_defend" : 256,
  //"e_buff" : 256,
  //"e_range" : 256,
  //"e_touch" : 256,
  //"e_self" : 256,
  
  
  "e_all" : 15, //argh, better name for 'all' (fighter | mage | cleric | thief) ?
  "e_all_physical" : 31,
  "e_all_mental" : 47,
  "e_all_physical_mental" : 63
  };

//order is assigned as defaults
var s_modifierAiTargetPriority = {
	"e_mostSumStatDamage" : 0, //sum aura, armour, health damage 
	"e_mostSumStat" : 1, //sum aura, armour, health
	"e_mostDamage" : 2,
	"e_mostHealth" : 3,
	"e_leastHealth" : 4,
	"e_leastAura" : 5,
	"e_leastArmour" : 6,
	"e_leastCost" : 7,
	"e_fighter" : 8,
	"e_cleric" : 9,
	"e_mage" : 10,
	"e_thief" : 11,
	"e_leastDamage" : 12,
	"e_mostAura" : 13,
	"e_mostArmour" : 14,
	"e_mostCost" : 15
	};


var s_entityBaseStrength = 5.0;
var s_entityBaseIntelegence = 5.0;
var s_maxLevel = 16;
var s_maxDeploy = 15;
var s_maxParty = 32;
var s_nameCount = 20;
var s_characterDrawScale = 2.0;
var s_metersPerPixelDeploy = 0.15; 
var s_metersPerPixelBattle = 0.2;
var s_characterBaseCost = 100.0;

var s_nodeNameNameId = "nameId";

var s_nodeNameStrengthBase = "strengthBase"; //add input if you want plus before mul
var s_nodeNameStrengthMulBase = "strengthMulBase"; //and input to combine with mul
var s_nodeNameStrength = "strength"; //add input if you want a plus after base mul
var s_nodeNameStrengthPlus = "strengthPlus";
var s_nodeNameStrengthPlusCost = "strengthPlusCost";
var s_nodeNameStrengthBonus = "strengthBonus"; //ln("strength") to be used as bonus

var s_strengthPlusCost = 50;

var s_nodeNameIntelegenceBase = "intelegenceBase"; //add input if you want plus before mul
var s_nodeNameIntelegenceMulBase = "intelegenceMulBase"; //and input to combine with mul
var s_nodeNameIntelegence = "intelegence"; //add input if you want a plus after base mul
var s_nodeNameIntelegencePlus = "intelegencePlus";
var s_nodeNameIntelegencePlusCost = "intelegencePlusCost";
var s_nodeNameIntelegenceBonus = "intelegenceBonus";
var s_intelegencePlusCost = 50;

var s_nodeNameHitPointMulBase = "hitPointMulBase";
var s_nodeNameHitPoint = "hitPoint";

var s_nodeNameHealthRepairBase = "healthRepairBase";
var s_nodeNameHealthRepairMulBase = "healthRepairMulBase"; 
var s_nodeNameHealthRepair = "healthRepair"; //self heal rate
var s_nodeNameHealthRepairPool = "healthRepairPool"; //total of health we can repair (ammo)

var s_nodeNameArmorBase = "armorBase"; //add input if you want plus before mul
var s_nodeNameArmorMulBase = "armorMulBase"; //and input to combine with mul
var s_nodeNameArmor = "armor"; //add input if you want a plus after base mul

var s_nodeNameArmorRepairBase = "armorRepairBase";
var s_nodeNameArmorRepairMulBase = "armorRepairMulBase"; 
var s_nodeNameArmorRepair = "armorRepair"; //armor shield repair rate
var s_nodeNameArmorRepairPool = "armorRepairPool"; //total of armor we can repair (ammo)

var s_nodeNameResistPhysicalBase = "resistPhysicalBase"; //add input if you want plus before mul
var s_nodeNameResistPhysicalMulBase = "resistPhysicalMulBase"; //and input to combine with mul
var s_nodeNameResistPhysical = "resistPhysical"; //add input if you want a plus after base mul

var s_nodeNameAuraShieldBase = "auraShieldBase"; //add input if you want plus before mul
var s_nodeNameAuraShieldMulBase = "auraShieldMulBase"; //and input to combine with mul
var s_nodeNameAuraShield = "auraShield"; //add input if you want a plus after base mul

var s_nodeNameAuraRepairBase = "auraRepairBase";
var s_nodeNameAuraRepairMulBase = "auraRepairMulBase"; 
var s_nodeNameAuraRepair = "auraRepair"; //aura shield repair rate
var s_nodeNameAuraRepairPool = "auraRepairPool"; //total of aura we can repair (ammo)

var s_nodeNameResistMagicBase = "resistMagicBase"; //add input if you want plus before mul
var s_nodeNameResistMagicMulBase = "resistMagicMulBase"; //and input to combine with mul
var s_nodeNameResistMagic = "resistMagic"; //add input if you want a plus after base mul

var s_nodeNameUsedStrength = "usedStrength";
var s_nodeNameUsedIntelegence = "usedIntelegence";

var s_nodeNameLevelPlus = "levelPlus";
var s_nodeNameLevelPlusCost = "levelPlusCost";
var s_nodeNameLevel = "level";
var s_levelPlusCost = 100;

var s_nodeNameSpeed = "speed"; 
var s_nodeNameCost = "cost"; 
      
var s_nodeNameRace = "race";
var s_nodeNameRaceName = "raceName";
var s_nodeNameRaceStrength = "raceStrength";
var s_nodeNameRaceIntelegence = "raceIntelegence";
var s_nodeNameGender = "gender"; 
var s_nodeNameGenderName = "genderName"; 
var s_nodeNameGenderStrength = "genderStrength";
var s_nodeNameGenderIntelegence = "genderIntelegence";
var s_nodeNameGenderCost = "genderCost"; 
var s_nodeNameClass = "class";
var s_nodeNameClassName = "className";
var s_nodeNameClassStrength = "classStrength";
var s_nodeNameClassIntelegence = "classIntelegence";

var s_nodeNameModiferSlotName = "modiferSlotName";
var s_nodeNameModiferSlotCost = "modiferSlotCost";
var s_nodeNameModiferSlotUseStrength = "modiferSlotUseStrength";
var s_nodeNameModiferSlotUseIntelegence = "modiferSlotUseIntelegence";
var s_nodeNameModiferSlotMetal = "modiferSlotMetal";
var s_nodeNameModiferSlotRequiresNoMetal = "modiferSlotRequiresNoMetal";
var s_nodeNameModiferSlotDescription = "modiferSlotDescription";
  
var s_nodeNameValid = "valid";   
var s_nodeNameUsedStrengthValid = "usedStrengthValid"; 
var s_nodeNameUsedIntelegenceValid = "usedIntelegenceValid"; 
var s_nodeNameMetalProduct = "metalProduct"; 
var s_nodeNameMetalProductValid = "metalProductValid"; 
var s_nodeNameSlotMetalSum = "slotMetalSum"; 
var s_nodeNameSlotRequiresNoMetalSum = "slotRequiresNoMetalSum"; 	

var s_nodeNameEditorStatus = "editorStatus"; //convience string for editor

var s_nodeNameCombatHitPoint = "combatHitPoint"; 
var s_nodeNameCombatHitPointDamage = "combatHitPointDamage"; 
var s_nodeNameCombatHitPointRepairPoolUse = "combatHitPointRepairPoolUse"; 
var s_nodeNameCombatHitPointRepairActive = "combatHitPointRepairActive"; 

var s_nodeNameCombatArmor = "combatArmor"; 
var s_nodeNameCombatArmorDamage = "combatArmorDamage"; 
var s_nodeNameCombatArmorActive = "combatArmorActive"; 
var s_nodeNameCombatArmorRepairPoolUse = "combatArmorRepairPoolUse"; 
var s_nodeNameCombatArmorRepairActive = "combatArmorRepairActive"; 

var s_nodeNameCombatAuraShield = "combatAuraShield"; 
var s_nodeNameCombatAuraShieldDamage = "combatAuraShieldDamage"; 
var s_nodeNameCombatAuraShieldActive = "combatAuraShieldActive"; 
var s_nodeNameCombatAuraRepairPoolUse = "combatAuraRepairPoolUse"; 
var s_nodeNameCombatAuraRepairActive = "combatAuraRepairActive"; 

var s_nodeNameCombatAlive = "combatAlive"; //health greater than zero

//nb, magic (heal/buffs?) only work on player while they are alive?

var s_nodeNameCombatPosX = "combatPosX";
var s_nodeNameCombatPosY = "combatPosY";
var s_nodeNameCombatPosZ = "combatPosZ";

var s_nodeNameOpponentDistance = "OpponentDistance"; //ideal distance we want the opponent members at
var s_nodeNameOpponentWeight = "OpponentWeight"; //importance of opponent
var s_nodeNameTeamDistance = "TeamDistance"; //ideal distance we want the team members at
var s_nodeNameTeamWeight = "TeamWeight"; //importance of team
var s_nodeNameTargetPriority = "TargetPriority";
var s_nodeNameBuffPriority = "BuffPriority";
var s_maxNodePriority = 10;

var s_modifierEntityBase = "entityBase";
var s_modifierEntityRace = "entityRace";
var s_modifierEntityGender = "entityGender";
var s_modifierEntityClass = "entityClass";
var s_modifierEntityPlusStrength = "entityPlusStrength";
var s_modifierEntityPlusIntelegence = "entityPlusIntelegence";
var s_modifierEntityPlusLevel = "entityPlusLevel";
var s_modifierEntitySlot = "entitySlot"; //gets postpended by slot number
var s_modifierEntityCombat = "entityCombat";
var s_modifierEntityBattle = "entityBattle";
var s_modifierEntityValid = "entityValid";
var s_modifierEntityAi = "entityAi";

var s_mapModifierCharacterSlotData = {};

function InitGameVar()
{
	s_mapModifierCharacterSlotData = {
		"none" : new ModifierCharacterSlotData(0.0, 0.0, 0.0, false, [], null, s_modifierSlotModifierFlag.e_all_physical_mental, s_guiGameSlotItemType.e_none),

		// armor ===================================  
		"Chain mail" : new ModifierCharacterSlotData(400.0, 3.0, 0.0, 
			[ new ModifierCharacterSlotNodeConnectData("Armour", 3.0, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_all_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalDefendMetal, 
			new ModifierCharacterSlotDataDescription("Chain mail (metal)", "Small metal rings linked together in a pattern to form a mesh. Various promices are made if you send it on to your friends and don't break the chain.", [ "Cost", "Str Cost", "Armour" ])),
		"Banded mail" : new ModifierCharacterSlotData(600.0, 5.0, 0.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour", 5.0, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_all_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalDefendMetal, 
			new ModifierCharacterSlotDataDescription("Banded mail (metal)", "Metal bands over padded cloth. Controversial due to scribes not aggreeing if it really exisits.", [ "Cost", "Str Cost", "Armour" ])),
		"Plate mail" : new ModifierCharacterSlotData(1000.0, 8.0, 0.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour", 12.0, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalDefendMetal, 
			new ModifierCharacterSlotDataDescription("Plate mail (metal)", "Heavy armour made from iron plates. For when the only thing you want to fear is a can opener.", [ "Cost", "Str Cost", "Armour" ])),

		"Robes" : new ModifierCharacterSlotData(50.0, 0.5, 0.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour", 0.5, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_all_physical, s_guiGameSlotItemType.e_physicalDefendNometal, 
			new ModifierCharacterSlotDataDescription("Robes", "An improvement on the birthday suit, but not by much. Useful to go to that toga party latter.", [ "Cost", "Str Cost", "Armour" ])),
		"Leather armour" : new ModifierCharacterSlotData(200.0, 2.0, 0.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour", 2.0, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_all_physical, s_guiGameSlotItemType.e_physicalDefendNometal, 
			new ModifierCharacterSlotDataDescription("Leather armour", "Simple armour for a simple purpose with a simple fetish. Just don't say moo around the fighters.", [ "Cost", "Str Cost", "Armour" ])),
		"Magic cloak" : new ModifierCharacterSlotData(1000.0, 0.25, 0.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour", 4.0, s_nodeNameArmorBase)], null, 
			s_modifierSlotModifierFlag.e_all_physical, s_guiGameSlotItemType.e_physicalDefendNometal, 
			new ModifierCharacterSlotDataDescription("Magic cloak", "A comitty of brothers has been formed to count the colours of the magic coat. A bit expencive, but it's so cool.", [ "Cost", "Str Cost", "Armour" ])),

		// aura shield ===================================
		"Aura shield" : new ModifierCharacterSlotData(300.0, 0.0, 4.0, 
			[new ModifierCharacterSlotNodeConnectData("Aura Shield", 3, s_nodeNameAuraShieldBase), new ModifierCharacterSlotNodeConnectData("Aura Repair", 0.5, s_nodeNameAuraRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 32.0, s_nodeNameAuraRepairPool)], null, 
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalDefend, 
			new ModifierCharacterSlotDataDescription("Aura shield (no metal)", "Can regenerate over time but if destroyed, it can not be cast again on the battle field. Good against non metalic and magic range attacks, otherwise acts like a chocolate shield. Requires user to have no metalic items.", [ "Cost", "Int Cost", "Aura Shield", "Aura Repair", "Pool" ])),
		"Aura shell" : new ModifierCharacterSlotData(1000.0, 0.0, 5.0, 
			[new ModifierCharacterSlotNodeConnectData("Aura Shield", 5, s_nodeNameAuraShieldBase), new ModifierCharacterSlotNodeConnectData("Aura Repair", 1.0, s_nodeNameAuraRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 64.0, s_nodeNameAuraRepairPool)], null, 
			s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalDefend, 
			new ModifierCharacterSlotDataDescription("Aura shell (no metal)", "Can regenerate over time but if destroyed, it can not be cast again on the battle field. Good against non metalic and magic range attacks, otherwise acts like a chocolate shell. Requires user to have no metalic items.", [ "Cost", "Int Cost", "Aura Shield", "Aura Repair", "Pool" ])),

		//magic attacks ======================================
		"Magic missile" : new ModifierCharacterSlotData(200.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttackRange, { "Range Min" : 2.0, "Range Max" : 10.0, "Reload" : 1.5, "Damage" : 0.25, "Aura Factor" : 0.1, "Armour Factor" : 1.0, "Ammo" : 32}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalAttackRange, 
			new ModifierCharacterSlotDataDescription("Magic Missile (no metal)", "The ever popular basic magic range attack. Requires user to have no metalic items. Always popular at parties, if not with opponent party.", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Fire ball" : new ModifierCharacterSlotData(600.0, 0.0, 5.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttackRange, { "Range Min" : 3.0, "Range Max" : 10.0, "Reload" : 3.0, "Damage" : 2.0, "Aura Factor" : 0.2, "Armour Factor" : 0.9, "Ammo" : 24}),
			s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalAttackRange, 
			new ModifierCharacterSlotDataDescription("Fireball (no metal)", "The grown up version of the magic missile, if the grownup was a pyromanic. Requires user to have no metal items, and requires opponents to group together to hit as many as posible with splash damage.", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Ammo" ])), 
		"Lightning" : new ModifierCharacterSlotData(600.0, 0.0, 4.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttackRange, { "Range Min" : 2.0, "Range Max" : 7.5, "Reload" : 0.75, "Damage" : 0.25, "Aura Factor" : 0.3, "Armour Factor" : 0.8, "Ammo" : 64}),
			s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalAttackRange, 
			new ModifierCharacterSlotDataDescription("Lightning (no metal)", "What every mage hell bent on turning the opponent into smoldering grass stain requires. Requires user to have no metal items least the lightning arcs back to fry the caster. Low damage but quick cast.", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Ammo" ])), //weak damage, fast reload
		"Meteor" : new ModifierCharacterSlotData(1000.0, 0.0, 8.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttackRange, { "Range Min" : 3.0, "Range Max" : 20.0, "Reload" : 5.0, "Damage" : 3.0, "Aura Factor" : 0.4, "Armour Factor" : 0.7, "Ammo" : 24}),
			s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalAttackRange, 
			new ModifierCharacterSlotDataDescription("Meteor (no metal)", "There was a school of thought that mages are fixated on destuctive magic, so they went and found the school and blew it up with this spell. Massive splash damage. Requires caster to have no metal items.", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Ammo" ])),

		"Shock" : new ModifierCharacterSlotData(200.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttack, { "Range Max" : 1.0, "Reload" : 0.75, "Damage" : 0.5, "Aura Factor" : 0.3, "Armour Factor" : 0.8, "Int bonus" : 0.25 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalAttackTouch, 
			new ModifierCharacterSlotDataDescription("Shock", "Do you enjoy shuffling your feet then touching someone to give them a static shock, then let's amp it up with some magic.", [ "Cost", "Int Cost", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Int bonus" ])),
		"Burning hands" : new ModifierCharacterSlotData(400.0, 0.0, 2.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttack, { "Range Max" : 1.5, "Reload" : 1.0, "Damage" : 1.0, "Aura Factor" : 0.2, "Armour Factor" : 0.9, "Int bonus" : 0.5 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalAttackTouch, 
			new ModifierCharacterSlotDataDescription("Burning hands", "Gives a new explosive meaning to 'pull my finger', do not stand downwind, or upwind. Just run.", [ "Cost", "Int Cost", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Int bonus" ])),
		"Distrupt" : new ModifierCharacterSlotData(800.0, 0.0, 8.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttack, { "Range Max" : 1.5, "Reload" : 1.5, "Damage" : 2.0, "Aura Factor" : 0.6, "Armour Factor" : 0.5, "Int bonus" : 0.75 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalAttackTouch, 
			new ModifierCharacterSlotDataDescription("Distrupt", "Good against aura shields, upsets the delicate balance needed to cast spells, mosly by causing massive amounts of pain to the target.", [ "Cost", "Int Cost", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Int bonus" ])),
		"Disintergrate" : new ModifierCharacterSlotData(1200.0, 0.0, 10.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_magicAttack, { "Range Max" : 1.0, "Reload" : 2.0, "Damage" : 2.0, "Aura Factor" : 0.5, "Armour Factor" : 1.0, "Int bonus" : 1.0 }),
			s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalAttackTouch, 
			new ModifierCharacterSlotDataDescription("Disintergrate", "Good against armour, the scroll with the instructions has disintergrated though, along with pretty much everything this spell touches.", [ "Cost", "Int Cost", "Range Max", "Reload", "Damage", "Aura Factor", "Armour Factor", "Int bonus" ])),

		//physical attacks ======================================
		"Darts" : new ModifierCharacterSlotData(50.0, 0.5, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 2.0, "Range Max" : 5.0, "Reload" : 1.0, "Damage" : 0.5, "Aura Factor" : 1.0, "Armour Factor" : 0.1, "Ammo" : 32}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalRange, 
			new ModifierCharacterSlotDataDescription("Darts (metal)", "Not quite your local pub variety of darts, unless it's the pub the fighters go to. Small, fast and very annoying to magic users.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Arrow" : new ModifierCharacterSlotData(200.0, 1.5, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 1.5, "Range Max" : 15.0, "Reload" : 1.5, "Damage" : 1.0, "Aura Factor" : 0.75, "Armour Factor" : 0.25, "Ammo" : 32}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage |s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalRange, 
			new ModifierCharacterSlotDataDescription("Bow and arrow (metal)", "Sticks and stones may break my bones but bow and arrows really make a mess of me.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor" ])),
		"Arrow2" : new ModifierCharacterSlotData(300.0, 3, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 2.0, "Range Max" : 25.0, "Reload" : 2.0, "Damage" : 2.0, "Aura Factor" : 0.8, "Armour Factor" : 0.3, "Ammo" : 32}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage |s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalRange, 
			new ModifierCharacterSlotDataDescription("Long bow and arrow (metal)", "Drawing or plucking a Yew long bow is not really the origin of one of most popular curse words, but it makes a good story.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Crossbow" : new ModifierCharacterSlotData(500.0, 3, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 3.0, "Range Max" : 50.0, "Reload" : 10.0, "Damage" : 3.0, "Aura Factor" : 0.9, "Armour Factor" : 0.5, "Ammo" : 24}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalRange, 
			new ModifierCharacterSlotDataDescription("Crossbow (metal)", "Slow to reload, good range and devistating. Just what you need to pick off mages or pretty much everyone.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Stone" : new ModifierCharacterSlotData(10.0, 0.5, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 1.0, "Range Max" : 4.0, "Reload" : 1.5, "Damage" : 0.1, "Aura Factor" : 0.05, "Armour Factor" : 0.05, "Ammo" : 64}),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalRange, 
			new ModifierCharacterSlotDataDescription("Stone", "Very traditional weapon, very cheap, just not very effective.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Sling" : new ModifierCharacterSlotData(100.0, 1.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 2.0, "Range Max" : 7.5, "Reload" : 3.0, "Damage" : 0.5, "Aura Factor" : 0.25, "Armour Factor" : 0.1, "Ammo" : 32}),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalRange, 
			new ModifierCharacterSlotDataDescription("Sling", "Disliked by giants, but a popular and easy way of getting a small stone very quickly to your opponent.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),
		"Bone arrow" : new ModifierCharacterSlotData(300.0, 2.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttackRange, { "Range Min" : 1.5, "Range Max" : 10.0, "Reload" : 1.5, "Damage" : 1.0, "Aura Factor" : 0.3, "Armour Factor" : 0.2, "Ammo" : 24}),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalRange, 
			new ModifierCharacterSlotDataDescription("Bow and bone arrow", "Not as strong or cheap as metal arrows, but will not mess with aura of user. Problem also that it won't mess with the aura of the target other than sticking out their arm.", [ "Cost", "Str Cost", "Damage", "Reload", "Range Min", "Range Max", "Aura Factor", "Armour Factor", "Ammo" ])),

		"Dagger" : new ModifierCharacterSlotData(50.0, 1.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.0, "Reload" : 0.75, "Damage" : 0.5, "Aura Factor" : 1.0, "Armour Factor" : 0.1, "Str bonus" : 0.25 }),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalTouch, 
			new ModifierCharacterSlotDataDescription("Dagger (metal)", "Nothing says 'I love you' like a dagger, infact, inanimate items don't speak. Though if daggers could say anything, they would probably laugh at getting through aura shields and messing up the health of mages.", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"Short sword" : new ModifierCharacterSlotData(100.0, 2.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.5, "Reload" : 1.0, "Damage" : 1.0, "Aura Factor" : 0.95, "Armour Factor" : 0.15, "Str bonus" : 0.5 }),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalTouch, 
			new ModifierCharacterSlotDataDescription("Short sword (metal)", "It's not short, it's just differently height enabled. Good for cutting others down to size.", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"2 handed sword" : new ModifierCharacterSlotData(200.0, 4.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 2.0, "Reload" : 2.0, "Damage" : 3.0, "Aura Factor" : 0.9, "Armour Factor" : 0.2, "Str bonus" : 0.75 }),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalTouch, 
			new ModifierCharacterSlotDataDescription("Two handed sword (metal)", "Some things just need both hands, not as easy to use as it looks without slicing off bits of yourself.", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"War hammer" : new ModifierCharacterSlotData(400.0, 4.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 2.0, "Reload" : 3.0, "Damage" : 3.0, "Aura Factor" : 0.8, "Armour Factor" : 0.5, "Str bonus" : 1.0 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical | s_modifierSlotModifierFlag.e_metal, s_guiGameSlotItemType.e_physicalAttackMetalTouch, 
			new ModifierCharacterSlotDataDescription("War hammer (metal)", "We have thousands of these things so we are glueing little lead figureens to them and almost giving them away.", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),

		"Punch" : new ModifierCharacterSlotData(0.0, 0.5, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.0, "Reload" : 0.5, "Damage" : 0.5, "Aura Factor" : 0.05, "Armour Factor" : 0.05, "Str bonus" : 0.5 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalTouch, 
			new ModifierCharacterSlotDataDescription("Punch", "", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"Bone dagger" : new ModifierCharacterSlotData(50.0, 0.5, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.0, "Reload" : 0.75, "Damage" : 0.5, "Aura Factor" : 0.1, "Armour Factor" : 0.1, "Str bonus" : 0.25 }),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalTouch, 
			new ModifierCharacterSlotDataDescription("Bone dagger", "", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"Staff" : new ModifierCharacterSlotData(75.0, 1.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.5, "Reload" : 1.5, "Damage" : 1.0, "Aura Factor" : 0.2, "Armour Factor" : 0.15, "Str bonus" : 0.75 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalTouch, 
			new ModifierCharacterSlotDataDescription("Staff", "", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"Club" : new ModifierCharacterSlotData(100.0, 2.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.0, "Reload" : 2.5, "Damage" : 2.0, "Aura Factor" : 0.15, "Armour Factor" : 0.3, "Str bonus" : 1.0 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalTouch, 
			new ModifierCharacterSlotDataDescription("Club", "", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),
		"Mace" : new ModifierCharacterSlotData(200.0, 3.0, 0.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_physicalAttack, { "Range Max" : 1.5, "Reload" : 2.0, "Damage" : 1.5, "Aura Factor" : 0.25, "Armour Factor" : 0.25, "Str bonus" : 0.75 }),
			s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalAttackNometalTouch, 
			new ModifierCharacterSlotDataDescription("Wood Mace", "", [ "Cost", "Str Cost", "Damage", "Reload", "Str bonus", "Range Max", "Aura Factor", "Armour Factor"])),

		//heal ======================================
		"Healing word" : new ModifierCharacterSlotData(300.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_heal, { "Range Min" : 0.0, "Range Max" : 5.0, "Reload" : 1.0, "Heal" : 1.0, "Ammo" : 32 }),
			s_modifierSlotModifierFlag.e_fighter | s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalHealRange, 
			new ModifierCharacterSlotDataDescription("Healing word (no metal)", "", [ "Cost", "Int Cost", "Range Max", "Reload", "Heal", "Ammo" ])),
		"Greater healing word" : new ModifierCharacterSlotData(500.0, 0.0, 2.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_heal, { "Range Min" : 0.0, "Range Max" : 3.0, "Reload" : 1.5, "Heal" : 2.0, "Ammo" : 24 }),
			s_modifierSlotModifierFlag.e_fighter |s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalHealRange, 
			new ModifierCharacterSlotDataDescription("G.Healing word (no metal)", "", [ "Cost", "Int Cost", "Range Max", "Reload", "Heal", "Ammo" ])),

		"Healing Touch" : new ModifierCharacterSlotData(500.0, 0.0, 4.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_heal, { "Range Min" : 0.0, "Range Max" : 1.5, "Reload" : 1.0, "Heal" : 1.0 }),
			s_modifierSlotModifierFlag.e_fighter |s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealTouch, 
			new ModifierCharacterSlotDataDescription("Healing touch", "", [ "Cost", "Int Cost", "Range Max", "Reload", "Heal" ])),

		"Resurrect" : new ModifierCharacterSlotData(2000.0, 0.0, 8.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_resurect, { "Range Max" : 1.5, "Reload" : 10.0, "Health" : 1.0, "Ammo" : 12 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealTouch, 
			new ModifierCharacterSlotDataDescription("Resurrect", "", [ "Cost", "Int Cost", "Range Max", "Reload", "Health", "Ammo" ])),
			
		"Greater resurrect" : new ModifierCharacterSlotData(3000.0, 0.0, 10.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_resurect, { "Range Max" : 1.5, "Reload" : 15.0, "Health" : 10.0, "Ammo" : 6 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealTouch, 
			new ModifierCharacterSlotDataDescription("Greater resurrect", "", [ "Cost", "Int Cost", "Range Max", "Reload", "Health", "Ammo" ])),
			
		//restart aura shield?

		"Flesh knit" : new ModifierCharacterSlotData(1000.0, 0.0, 3.0, 
			[new ModifierCharacterSlotNodeConnectData("Health Repair", 0.25, s_nodeNameHealthRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 32.0, s_nodeNameHealthRepairPool)], 
			null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealSelf, new ModifierCharacterSlotDataDescription("Flesh knit", "", [ "Cost", "Int Cost", "Health Repair", "Pool" ])),
		
		"Flesh rebind" : new ModifierCharacterSlotData(1500.0, 0.0, 5.0, 
			[new ModifierCharacterSlotNodeConnectData("Health Repair", 0.5, s_nodeNameHealthRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 64.0, s_nodeNameHealthRepairPool)], 
			null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealSelf, new ModifierCharacterSlotDataDescription("Flesh rebind", "", [ "Cost", "Int Cost", "Health Repair", "Pool" ])),

		"Armour knit" : new ModifierCharacterSlotData(1500.0, 0.0, 3.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour Repair", 0.25, s_nodeNameArmorRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 32.0, s_nodeNameArmorRepairPool)], 
			null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealSelf, new ModifierCharacterSlotDataDescription("Armour knit", "", [ "Cost", "Int Cost", "Armour Repair", "Pool" ])),

		"Armour rebind" : new ModifierCharacterSlotData(2000.0, 0.0, 5.0, 
			[new ModifierCharacterSlotNodeConnectData("Armour Repair", 0.5, s_nodeNameArmorRepairBase), new ModifierCharacterSlotNodeConnectData("Pool", 64.0, s_nodeNameArmorRepairPool)], 
			null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalHealSelf, new ModifierCharacterSlotDataDescription("Armour rebind", "", [ "Cost", "Int Cost", "Armour Repair", "Pool" ])),

		//buff ======================================
		"Fortify health" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [new ModifierCharacterSlotNodeConnectData("fortify", 1.25, s_nodeNameHitPointMulBase)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalBuffSelf, new ModifierCharacterSlotDataDescription("Fortify health", "", [ "Cost", "Int Cost" ])),
		"Fortify armor" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [new ModifierCharacterSlotNodeConnectData("fortify", 1.25, s_nodeNameArmorMulBase)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalBuffSelf, new ModifierCharacterSlotDataDescription("Fortify armor", "", [ "Cost", "Int Cost" ])),
		"Fortify magic resistance" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [new ModifierCharacterSlotNodeConnectData("fortify", 0.2, s_nodeNameResistMagicBase)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalBuffSelf, new ModifierCharacterSlotDataDescription("Fortify magic resistance", "", [ "Cost", "Int Cost" ])),
		"Fortify speed" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [new ModifierCharacterSlotNodeConnectData("fortify", 1.0, s_nodeNameSpeed)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_mental, s_guiGameSlotItemType.e_mentalBuffSelf, new ModifierCharacterSlotDataDescription("Fortify speed", "", [ "Cost", "Int Cost" ])),

		"Focus speed" : new ModifierCharacterSlotData(100.0, 1.0, 0.0, [new ModifierCharacterSlotNodeConnectData("focus", 1.0, s_nodeNameSpeed)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalBuffSelf, new ModifierCharacterSlotDataDescription("Focus speed", "", [ "Cost", "Str Cost" ])),
		"Focus physical resistance" : new ModifierCharacterSlotData(100.0, 1.0, 0.0, [new ModifierCharacterSlotNodeConnectData("focus", 0.2, s_nodeNameResistPhysicalBase)], null, s_modifierSlotModifierFlag.e_all | s_modifierSlotModifierFlag.e_physical, s_guiGameSlotItemType.e_physicalBuffSelf, new ModifierCharacterSlotDataDescription("Focus physical resistance", "", [ "Cost", "Str Cost" ])),

		//buff strength, int? phy/magic resistance?
		"Buff strength" : new ModifierCharacterSlotData(200.0, 0.0, 2.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 2.0, "Name": "Str", "Target" : s_nodeNameStrength, "Ammo" : 64 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff strength (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),
		"Buff intellegence" : new ModifierCharacterSlotData(200.0, 0.0, 2.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 2.0, "Name": "Int", "Target" : s_nodeNameIntelegence, "Ammo" : 64 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff intellegence (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),

		"Buff speed" : new ModifierCharacterSlotData(100.0, 0.0, 2.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 2.0, "Name": "Speed", "Target" : s_nodeNameSpeed, "Ammo" : 128 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff speed (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),

		"Buff health" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 2.0, "Name": "Health", "Target" : s_nodeNameHitPoint, "Ammo" : 128 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff health (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),
		"Buff armor" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 2.0, "Name": "Armour", "Target" : s_nodeNameArmor, "Ammo" : 128 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff armor (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),

		"Buff resist magic" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 0.2, "Name": "Mag Rst", "Target" : s_nodeNameResistMagic, "Ammo" : 128 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff resist magic (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ])),
		"Buff resist Physical" : new ModifierCharacterSlotData(100.0, 0.0, 1.0, [], 
			new ModifierCharacterSlotDataAction(s_battleActionType.e_buff, { "Range Min" : 0.5, "Range Max" : 5.0, "Reload" : 1.0, "Value" : 0.2, "Name": "Phy Rst", "Target" : s_nodeNameResistPhysical, "Ammo" : 128 }),
			s_modifierSlotModifierFlag.e_cleric | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffRange, 
			new ModifierCharacterSlotDataDescription("Buff resist Physical (no metal)", "", [ "Cost", "Int Cost", "Range Min", "Range Max", "Reload", "Value", "Ammo" ]))
			//,


		//"Flight" : new ModifierCharacterSlotData(1000.0, 0.0, 5.0, [], null, s_modifierSlotModifierFlag.e_mage | s_modifierSlotModifierFlag.e_thief | s_modifierSlotModifierFlag.e_mental | s_modifierSlotModifierFlag.e_requiresNoMetal, s_guiGameSlotItemType.e_mentalBuffSelf, new ModifierCharacterSlotDataDescription("Flight (no metal)", "Nothing quite says 'shoot me' like hovering over a battle field. It's is a good way of staying out of range if the opponents don't have range attacks.", [ "Cost", "Int Cost" ])),
		//
	};
}

var s_arrayDefaultModifierFighter = [
  "Short sword", // physical
  "Chain mail", // physical
  "Fortify health", // mental
  "Arrow", // physical
  "Focus physical resistance", // physical
  "Fortify armor", // mental
  "Focus speed", // physical
  "Focus physical resistance", // physical
  "Fortify magic resistance", // mental
  "Chain mail", // physical
  "Focus physical resistance" // physical
  ];
var s_arrayDefaultModifierMage = [
  "Magic missile", // mental
  "Aura shield", // mental
  "Leather armour", // physical
  "Fortify speed", // mental
  "Shock", // mental
  "Focus speed", // physical
  "Fortify magic resistance", // mental
  "Magic missile", // mental
  "Focus physical resistance", // physical
  "Aura shield", // mental
  "Magic missile" // mental
  ];
var s_arrayDefaultModifierCleric = [
  "Healing word", // mental
  "Mace", // physical 
  "Flesh rebind", // mental
  "Leather armour", // physical
  "Healing word", // mental
  "Focus physical resistance", // physical
  "Buff health", // mental
  "Sling", // physical
  "Healing word", // mental
  "Focus physical resistance", // physical
  "Healing word" // mental
  ];
var s_arrayDefaultModifierThief = [
  "Bone arrow", // physical
  "Magic missile", // mental
  "Leather armour", // physical
  "Aura shield", // mental
  "Club", // physical
  "Fortify magic resistance", // mental
  "Focus speed", // physical
  "Fortify speed", // mental
  "Focus physical resistance", // physical
  "Magic missile", // mental
  "Focus speed" // physical
  ];



//http://babynamesworld.parentsconnect.com/  
var s_arrayNameOrkMale = [
	"Achai",
	"Agwe",
	"Amaro",
	"Capac",
	"Chogan", //5
	"De",
	"Hahnee",
	"Hanska",
	"Hohots",
	"Hotah", //10
	"Hoywrlkt",
	"Huslu",
	"Huritt",
	"Ilpp",
	"Seneca", //15
	"Sequoia",
	"Tahoe",
	"Tecumseh",
	"Von",
	"Ynyr" //20
	];
var s_arrayNameOrkFemale = [
	"Ama",
	"Altsoba",
	"Angeni",
	"Chula",
	"Epa",
	"Genesee",
	"Hera",
	"Hiri",
	"Huata",
	"Huia",
	"Huyana",
	"Itzel",
	"Ixchel",
	"Talise",
	"Tula",
	"Undeg",
	"Weeko",
	"Yareli",
	"Yseult",
	"Zolin"
	];
var s_arrayNameOrkOther = [
	"Aekagwaa",
	"Apumayta",
	"Aduviri",
	"Chenoa",
	"Ge", //5
	"Hantywee",
	"Huslu",
	"Huhwahhl",
	"Holata",
	"Hongvi", //10
	"Ihu",
	"Kota",
	"Orenda",
	"Pati",
	"Tama", //15
	"Topanga",
	"Sonoma",
	"Shasta",
	"Xiuhpilli",
	"Ysolt" //20
	];

var s_arrayNameDwarfMale = [
	"Ante",
	"Andro",
	"Baldo",
	"Bohuslav",
	"Bozidar",
	"Demetrsz",
	"Drazan",
	"Franjo",
	"Grgur",
	"Jozo",
	"Krystof",
	"Ladislav",
	"Marek",
	"Milos",
	"Nikola",
	"Pavao",
	"Radek",
	"Slava",
	"Toma",
	"Vilem"
	];
var s_arrayNameDwarfFemale = [
	"Alzbeta",
	"Bohuslva",
	"Bozena",
	"Bozka",
	"Dobrila",
	"Domka",
	"Domeczka",
	"Eliska",
	"Fiala",
	"Jadranka",
	"Ladislva",
	"Lida",
	"Lyudmyla",
	"Marochka",
	"Mare", 	
	"Milenka",
	"Miloslva",
	"Nada", 
	"Varvara",
	"Zora"
	];
var s_arrayNameDwarfOther = [
	"Aneta",
	"Andelko",
	"Antun",
	"Bohdan",
	"Bohumir",
	"Barbora",
	"Bozka",
	"Domeczka",
	"Dubravko",
	"Goran",
	"Jadranko",
	"Kuba",
	"Libena",
	"Mareczek",
	"Marik",
	"Miho",
	"Milana",
	"Petr",
	"Radik",
	"Rostislav"
	];

var s_arrayNameBarbarianMale = [
	"Adalricus",
	"Aries",
	"Bas",
	"Blodwyn",
	"Brutus",
	"Cezar",
	"Claus",
	"Crow",
	"Dagur",
	"Draven",
	"Edgar", 
	"Geir",
	"Grey",
	"Haraldur",
	"Hyperion",
	"Jet",
	"Renu",
	"Talon", 
	"Vlad",
	"Wolf"
	];
var s_arrayNameBarbarianFemale = [
	"Acantha",
	"Alditha",
	"Alivah",
	"Asdis",
	"Blodwen",
	"Brynja",
	"Carita",
	"Cela",
	"Clover",
	"Cyrene",
	"Drusus",
	"Estelle",
	"Galsuenda",
	"Hannibal",
	"January",
	"Levana",
	"Rue",
	"Snaedis",
	"Snow",
	"Tethys"
	];
var s_arrayNameBarbarianOther = [
	"Adare",
	"Arjen",
	"Balendin",
	"Briar",
	"Bjorn",
	"Calum",
	"Cato",
	"Chandra",
	"Clem",
	"Draco",
	"Echo", 
	"Eydis",
	"Flint",
	"Groa",
	"Indigo",
	"Jinx",
	"Lucine",
	"Raven",
	"Shadow",
	"Willow"
	];
var s_arrayNameTribalMale = [
	"Abdas",
	"Akiiki",
	"Bakari",
	"Chike",
	"Dulani", //5
	"Ehioze",
	"Fakih",
	"Gahiji",
	"Hondo",
	"Idrissa", //10
	"Jomo",
	"Kapeni",
	"Lutalo",
	"Maideyi",
	"Ndulu",	//15
	"Ojore",
	"Petiri",
	"Tebogo",
	"Tobi",
	"Weke" //20
	];
var s_arrayNameTribalFemale = [
	"Ada",
	"Ama",
	"Bunmi",
	"Chika",
	"Dayo", //5
	"Esosa",
	"Fujo",
	"Gabra",
	"Hasana",
	"Ifama", //10
	"Japera",
	"Kali",
	"Lynda",
	"Makena",
	"Naledi",	//15
	"Ofure",
	"Panyin",
	"Shade",
	"Thema",
	"Urbi" //20
	];
var s_arrayNameTribalOther = [
	"Abayomi",
	"Ajani",
	"Buseje",
	"Chiwa",
	"Desta", //5
	"Efia",
	"Fifi",
	"Geteye",
	"Hagos",
	"Ita", //10
	"Jojo",
	"Kokumo",
	"Lefu",
	"Mothudi",
	"Njeri",	//15
	"Olufemi",
	"Paki",
	"Sisi",
	"Tumelo",
	"Vakasa" //20
	];
var s_arrayNameNomadMale = [
	"Aran",
	"Bataar",
	"Batukhan",
	"Chuluun",
	"Chanarng", //5
	"Dato",
	"Daw",
	"De",
	"Hau",
	"Huy",//10
	"Irakli",
	"Kamol",
	"Kiet", 
	"Sonam",
	"Sovann",//15
	"Sukh",
	"Sunan",
	"Thuc",
	"Vibol", 
	"Virote"//20
	];
var s_arrayNameNomadFemale = [
	"Bayarmaa",
	"Bolormaa",
	"Ia",
	"Isra",
	"Jorani", //5
	"Kanya",
	"Khong",
	"Kolab",
	"Maly",
	"Mzia", //10
	"Ngoc",
	"Odval",
	"Ratana",
	"Tien",
	"Thina",//15
	"Vardo",
	"Vanida",
	"Veata",
	"Xatia",
	"Zarrina"//20
	];
var s_arrayNameNomadOther = [
	"Aroon",
	"Bat",
	"Bedisa",
	"Kasem",
	"Kiet", //5
	"Hau",
	"Lawan",
	"Long",
	"Marmar",
	"Minh", //10
	"Naran",
	"Phueng",
	"Pich",
	"Sarant",
	"Som",//15
	"Samnang",
	"Sukhba",
	"Sukhon",
	"Veasna",
	"Zarrin"//20
	];

var s_arrayNameElfMale = [
	"Aapep",
	"Amon",
	"Ashur",
	"Atl",
	"Bes",
	"Chimalli",
	"Cuahtémc",
	"Heru",
	"Horus",
	"Huitziln",
	"Itzcóatl",
	"Itzli",
	"Nochehtl",
	"Quauhtli",
	"Panhsj",
	"Rameses",
	"Ramses",
	"Sargon",
	"Tlaloc",
	"Tochtli"
	];
var s_arrayNameElfFemale = [
	"Acenith",
	"Amunet",
	"Bast",
	"Bastet",
	"Beset",
	"Cena",
	"Citlamna",
	"Cozamltl",
	"Eréndira",
	"Hathor",
	"Hatshpst",
	"Ishtar",
	"Lea",
	"Leja",
	"Lilith",
	"Nefetiti",
	"Sakhmet",
	"Teiuc",
	"Teyacaan",
	"Tlacotl"
	];
var s_arrayNameElfOther = [
	"Acalan",
	"Ahuilizt",
	"Asenet",
	"Asenath",
	"Asiah",
	"Azenet",
	"Centehua",
	"Chimalma",
	"Citlali",
	"Coatl",
	"Isis",
	"Kushi",
	"Leah",
	"Lejka",
	"Matlal",
	"Nephthys",
	"Osiris",
	"Ptah",
	"Sacmis",
	"Tototl"
	];

var s_arrayNameFaeMale = [
	"Arthfael",
	"Bleiddud",
	"Cadwgawn",
	"Derfael",
	"Einion", //5
	"Flamdwyn",
	"Gaenor",
	"Gutyn",
	"Gwrnerth",
	"Gwron", //10
	"Howell",
	"Idnerth",
	"Jarith",
	"Karanteg",
	"Lewsyn", //15
	"Llywarch",
	"Madoc",
	"Merfyn",
	"Myrddin",
	"Onllwyn"
	];
var s_arrayNameFaeFemale = [
	"Annwyl",
	"Bryna",
	"Cyffin",
	"Drydwen",
	"Ebrilwen", //5
	"Ffion",
	"Glesig",
	"Gwawr",
	"Gwenlliw",
	"Gwydir", //10
	"Hedydd",
	"Ifanwy",
	"Izolde",
	"Kireg",
	"Lleucu", //15
	"Lynfa",
	"Maelgwyn",
	"Meudwen",
	"Mwynwen",
	"Paderau" //20
	];
var s_arrayNameFaeOther = [
	"Aeron",
	"Brynn",
	"Cayne",
	"Dedwydd",
	"Eirian", //5
	"Fychan",
	"Greidawl",
	"Gruffudd",
	"Gwlithyn",
	"Gwylfai", //10
	"Hirael",
	"Iestyn",
	"Islwyn",
	"Kendall",
	"Leoline", //15
	"Llunwrth",
	"Madlen",
	"Merideth",
	"Morwenna",
	"Prysrwen" //20
	];
	
function GameVarGetName(in_nameId, in_gender, in_race)
{
	return GameVarGetArrayName(in_gender, in_race)[in_nameId];
}	
	
function GameVarGetArrayName(in_gender, in_race)
{
	switch (in_race)
	{
	case s_modifierRace.e_ork:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameOrkMale;
		case s_modifierGender.e_female:
			return s_arrayNameOrkFemale;
		case s_modifierGender.e_other:
			return s_arrayNameOrkOther;
		default:
		}
		break;
	case s_modifierRace.e_dwarf:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameDwarfMale;
		case s_modifierGender.e_female:
			return s_arrayNameDwarfFemale;
		case s_modifierGender.e_other:
			return s_arrayNameDwarfOther;
		default:
		}
		break;
	case s_modifierRace.e_barbarian:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameBarbarianMale;
		case s_modifierGender.e_female:
			return s_arrayNameBarbarianFemale;
		case s_modifierGender.e_other:
			return s_arrayNameBarbarianOther;
		default:
		}
		break;
	case s_modifierRace.e_tribal:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameTribalMale;
		case s_modifierGender.e_female:
			return s_arrayNameTribalFemale;
		case s_modifierGender.e_other:
			return s_arrayNameTribalOther;
		default:
		}
		break;
	case s_modifierRace.e_nomad:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameNomadMale;
		case s_modifierGender.e_female:
			return s_arrayNameNomadFemale;
		case s_modifierGender.e_other:
			return s_arrayNameNomadOther;
		default:
		}
		break;
	case s_modifierRace.e_elf:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameElfMale;
		case s_modifierGender.e_female:
			return s_arrayNameElfFemale;
		case s_modifierGender.e_other:
			return s_arrayNameElfOther;
		default:
		}
		break;
	case s_modifierRace.e_fae:
		switch (in_gender)
		{
		case s_modifierGender.e_male:
			return s_arrayNameFaeMale;
		case s_modifierGender.e_female:
			return s_arrayNameFaeFemale;
		case s_modifierGender.e_other:
			return s_arrayNameFaeOther;
		default:
		}
		break;
	}
	return [];
}
