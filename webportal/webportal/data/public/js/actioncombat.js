/*
Participant are expected to implement the following values
.	surprise_adjust
	able_to_participate_combat
	defense
	defense_range
	receive_severity_damage
	receive_faith_damage
	alignment_global
	faith
	agility
	perception
	armor_damage_absorption
	physical_damage
	speed
	action_meelee
	action_range
	combat_level
	size
	level
	current_damage_tollerance
	damage_tolerance
	combat_behaviour
	combat_range_target
	combat_range_target_priority
action
	recovery_time
	name
	attack_bonus
	damage_base
	damage_dice_sides
	damage_dice_count
	damage_adjust
	combat_level
	inflict_severity_damage
*/

const ActionCombat = {
	Stance : Object.freeze({
		"none":0,
		"mellee":1,
		"range":2,
		"run":3
	}),
	Behaviour : Object.freeze({
		"run":0,
		"mellee":1,
		"range_if_engaged_run":2,
		"range_if_engaged_mellee":3,
		"range_if_engaged_range":4
	}),
	TargetPriority : Object.freeze({
		"most_health":0,
		"most_health_percentage":1,
		"least_health":2,
		"least_health_percentage":3,
		"most_experence":4,
		"least_experence":5,
		"random":6
	}),
	RangeTarget : Object.freeze({
		"run_range_mellee":0,
		"range_run_mellee":1,
		"run_range":2,
		"range_run":3,
		"mellee_run_range":4,
		"mellee_range_run":5, //elementals with range attack that atack clostest first
	}),

	//Participant mandatory
	sValueNameName : "name",
	sValueNameAbleParticipate : "able_to_participate_combat",
	sValueNameDefense : "defense",
	sValueNameDefenseRange : "defense_range",
	sValueNamePhysicalDamage : "physical_damage",
	sValueNameCurrentDamageTollerance : "current_damage_tollerance",
	sValueNameDamageTolerance : "damage_tolerance",
	sValueNameSpeed : "speed",
	//Participant optional
	sValueNameSurpriseAdjust : "surprise_adjust",
	sValueNameReceiveSeverityDamage : "receive_severity_damage",
	sValueNameReceiveFaithDamage : "receive_faith_damage",
	sValueNameAlignmentGlobal : "alignment_global",
	sValueNameFaith : "faith",
	sValueNameAgility : "agility",
	sValueNamePerception : "perception",
	sValueNameArmorDamageAbsorption : "armor_damage_absorption",
	sValueNameActionMeelee : "action_meelee",
	sValueNameActionRange : "action_range",
	sValueNameCombatLevel : "combat_level",
	sValueNameSize : "size",
	sValueNameLevel : "level",
	sValueNameCombatBehaviour : "combat_behaviour",
	sValueNameCombatRangeTarget : "combat_range_target",
	sValueNameCombatRangeTargetPriority : "combat_range_target_priority",

	//Action mandatory
	sValueNameName : "name",
	sValueNameRecoveryTime : "recovery_time",
	sValueNameAttackBonus : "attack_bonus",
	sValueNameCombatLevel : "combat_level",
	//Action optional
	sValueNameDamageBase : "damage_base",
	sValueNameDamageDiceSides : "damage_dice_sides",
	sValueNameDamageDiceCount : "damage_dice_count",
	sValueNameDamageAdjust : "damage_adjust",
	sValueNameInflictSeverityDamage : "inflict_severity_damage",
	sValueNameInflictFaithDamage : "inflict_faith_damage",

};
/*
context dependacies [random.js, dice.js] //for everything else, pull values out of the combatGameObject?

the aim is to take a combat game object and generate a combat results object (or result document?)
todo: submit a visitor that can turn combat actions into log or display instructions
another aim is for this to be self contained, or do we need data from tables (game objects have there own links to database)
*/

ActionCombat.sParticipantMandatory = [
	ActionCombat.sValueNameName,
	ActionCombat.sValueNameAbleParticipate,
	ActionCombat.sValueNameDefense,
	ActionCombat.sValueNameDefenseRange,
	ActionCombat.sValueNamePhysicalDamage,
	ActionCombat.sValueNameCurrentDamageTollerance,
	ActionCombat.sValueNameDamageTolerance,
	ActionCombat.sValueNameSpeed
];

ActionCombat.sParticipantOptional = [
	ActionCombat.sValueNameSurpriseAdjust,
	ActionCombat.sValueNameReceiveSeverityDamage,
	ActionCombat.sValueNameReceiveFaithDamage,
	ActionCombat.sValueNameAlignmentGlobal,
	ActionCombat.sValueNameFaith,
	ActionCombat.sValueNameAgility,
	ActionCombat.sValueNamePerception,
	ActionCombat.sValueNameArmorDamageAbsorption,
	ActionCombat.sValueNameActionMeelee,
	ActionCombat.sValueNameActionRange,
	ActionCombat.sValueNameCombatLevel,
	ActionCombat.sValueNameSize,
	ActionCombat.sValueNameLevel,
	ActionCombat.sValueNameCombatBehaviour,
	ActionCombat.sValueNameCombatRangeTarget,
	ActionCombat.sValueNameCombatRangeTargetPriority,
];

ActionCombat.sActionMandatory = [
	ActionCombat.sValueNameName,
	ActionCombat.sValueNameRecoveryTime,
	ActionCombat.sValueNameAttackBonus,
	ActionCombat.sValueNameCombatLevel,
	];

ActionCombat.sActionOptional = [
	ActionCombat.sValueNameDamageBase,
	ActionCombat.sValueNameDamageDiceSides,
	ActionCombat.sValueNameDamageDiceCount,
	ActionCombat.sValueNameDamageAdjust,
	ActionCombat.sValueNameInflictSeverityDamage,
	ActionCombat.sValueNameInflictFaithDamage,
	];


ActionCombat.Participant = function(gameObject){
	this.m_gameObject = gameObject;
	this.m_stance = ActionCombat.Stance.none;
	this.m_chase = false;
	this.m_runDistance = 0; // how far the individual has run, either stance is run, or mellee chasing people who have run
	this.m_runAway = false;
	this.m_initiativeRoll = 0;
	this.m_initiativePenalty = 0;
	this.m_recoveryTime = 0;
	this.m_actionArrayIndex = 0;
	this.m_actionLoopCount = 0;
	this.m_name = gameObject.GetValue(ActionCombat.sValueNameName);
}

ActionCombat.Participant.prototype.GetValue = function(valueName){
	return this.m_gameObject.GetValue(valueName);
}

ActionCombat.Participant.prototype.SetValue = function(valueName, value){
	this.m_gameObject.SetValue(valueName, value);
	return;
}

ActionCombat.Participant.prototype.toString = function(){
	var ret = "{";
	ret += " m_stance:" + this.m_stance + ",";
	ret += " m_chase:" + this.m_chase + ",";
	ret += " m_runDistance:" + this.m_runDistance + ",";
	ret += " m_initiativeRoll:" + this.m_initiativeRoll + ",";
	ret += " m_initiativePenalty:" + this.m_initiativePenalty + ",";
	ret += " m_recoveryTime:" + this.m_recoveryTime + ",";
	ret += " m_actionArrayIndex:" + this.m_actionArrayIndex + ",";
	ret += " m_actionLoopCount:" + this.m_actionLoopCount + ",";
	ret += " m_name:" + this.m_name + " ";
	ret += "}";
	return ret;
}

ActionCombat.Participant.Factory = function(gameObject){
	return new ActionCombat.Participant(gameObject);
}



ActionCombat.Side = function(name, arrayParticipant, aware){
	this.m_name = name;
	this.m_arrayParticipant = arrayParticipant;
	this.m_aware = aware;
	return;
}

ActionCombat.Side.Factory = function(name, gameObject, aware){
	var arrayGameObjects = gameObject.GetValue(name);
	var arrayParticipant = [];
	if (arrayGameObjects != undefined){
		for (var index = 0, total = arrayGameObjects.length; index < total; index++) {
			var item = arrayGameObjects[index];
			arrayParticipant.push(ActionCombat.Participant.Factory(item));
		}
	}
	return new ActionCombat.Side(name, arrayParticipant, aware);
}


ActionCombat.MelleeAction = function(participant, target, action, randomStream, segment){
	this.m_participant = participant;
	this.m_target = target;
	this.m_action = action;
	this.m_randomStream = randomStream;
	this.m_segment = segment;
	return;
}

ActionCombat.MelleeAction.prototype.Perform = function(combatResultDocument){

	//console.log("MelleeAction");

	var roll = Dice.Roll(this.m_randomStream, 30);
	var autoFail = ((roll == 1) || (roll == 2) || (roll == 3));
	var autoSuccess = ((roll == 28) || (roll == 29) || (roll == 30));
	var attackBonus = this.m_action.GetValue(ActionCombat.sValueNameAttackBonus);
	var adjustedRoll = roll + attackBonus;
	var targetDefense = this.m_target.GetValue(ActionCombat.sValueNameDefense);
	var success = (targetDefense <= adjustedRoll);
	var severityDamage = Math.max(0, adjustedRoll - targetDefense);
	ActionCombat.LogMessage(combatResultDocument, this.m_participant.m_name + " mellee action " + this.m_action.GetValue(ActionCombat.sValueNameName) + " against " + this.m_target.m_name);
	var message = "segment:" + this.m_segment + " ";
	var doDamage = false;
	if (true === autoFail){
		message += "auto fail on a roll of " + roll;
	} else if (true === autoSuccess){
		message += "auto success on a roll of " + roll;
		doDamage = true;
	} else if (true === success){
		message += "success on a roll of " + roll + " with bonus " + attackBonus + " against defense " + targetDefense;
		doDamage = true;
	} else {
		message += "fail on a roll of " + roll + " with bonus " + attackBonus + " against defense " + targetDefense;
	}
	ActionCombat.LogMessage(combatResultDocument, message);
	message = "";
	if (true === doDamage){
		var damageSum = 0;

		var damageBase = this.m_action.GetValue(ActionCombat.sValueNameDamageBase);
		if (false === isNaN(damageBase)){
			damageSum += damageBase;
			if (0 != damageBase){
				message += " damageBase " + damageBase;
			}
		}

		var damageDiceSides = this.m_action.GetValue(ActionCombat.sValueNameDamageDiceSides);
		var damageDiceCount = this.m_action.GetValue(ActionCombat.sValueNameDamageDiceCount);
		var damageDice = Dice.Rolls(this.m_randomStream, damageDiceSides, damageDiceCount);
		if (0 < damageDice){
			damageSum += damageDice;
			message += " damageDice(" + damageDiceCount + "d" + damageDiceSides + ") " + damageDice;
		}

		var damageAdjust = this.m_action.GetValue(ActionCombat.sValueNameDamageAdjust);
		if (false === isNaN(damageAdjust)){
			damageSum += damageAdjust;
			if (0 != damageAdjust){
				message += " damageAdjust " + damageAdjust;
			}
		}

		//todo check special on target for imunity to severity damage
		if ((true === this.m_action.GetValue(ActionCombat.sValueNameInflictSeverityDamage)) &&
			(true === this.m_target.GetValue(ActionCombat.sValueNameReceiveSeverityDamage))){
			damageSum += severityDamage;
			if (0 != severityDamage){
				message += " severityDamage " + severityDamage;
			}
		}

		if (//sValueNameInflictFaithDamage inflict_severity_damage 
			(true === this.m_action.GetValue(ActionCombat.sValueNameInflictFaithDamage)) && 
			(true === this.m_target.GetValue(ActionCombat.sValueNameReceiveFaithDamage)) && 
			(this.m_participant.GetValue(ActionCombat.sValueNameAlignmentGlobal) !== this.m_target.GetValue(ActionCombat.sValueNameAlignmentGlobal))){
			var faith = this.m_participant.GetValue(ActionCombat.sValueNameFaith);
			damageSum += faith;
			message += " faith " + faith;
		}

		var armorDamageAbsorption = this.m_target.GetValue(ActionCombat.sValueNameArmorDamageAbsorption);
		if ((1 < damageSum) && (armorDamageAbsorption != undefined)){
			damageSum = Math.max(1, damageSum - armorDamageAbsorption);
			message += " DamageAbsorption " + armorDamageAbsorption;
		}

		damageSum = Math.max(0, damageSum);

		message += " Total Damage " + damageSum;
		if (0 < damageSum){
			var physicalDamage = this.m_target.GetValue(ActionCombat.sValueNamePhysicalDamage);
			this.m_target.SetValue(ActionCombat.sValueNamePhysicalDamage, physicalDamage + damageSum);
		}
		ActionCombat.LogMessage(combatResultDocument, message);

		message = this.m_target.GetValue(ActionCombat.sValueNameName) + "'s health is now " + this.m_target.GetValue(ActionCombat.sValueNameCurrentDamageTollerance) + " of " + this.m_target.GetValue(ActionCombat.sValueNameDamageTolerance);
		ActionCombat.LogMessage(combatResultDocument, message);
	}
}

ActionCombat.MelleeAction.Factory = function(participant, target, action, randomStream, segment){
	return new ActionCombat.MelleeAction(participant, target, action, randomStream, segment);
}

ActionCombat.RangeAction = function(participant, target, failTarget, action, randomStream, segment){
	this.m_participant = participant;
	this.m_target = target;
	this.m_failTarget = failTarget;
	this.m_action = action;
	this.m_randomStream = randomStream;
	this.m_segment = segment;
	return;
}

ActionCombat.RangeAction.prototype.Perform = function(combatResultDocument){
	//console.log("RangeAction");

	var roll = Dice.Roll(this.m_randomStream, 30);
	var autoFail = ((roll == 1) || (roll == 2) || (roll == 3));
	var autoSuccess = ((roll == 28) || (roll == 29) || (roll == 30));
	var attackBonus = this.m_action.GetValue(ActionCombat.sValueNameAttackBonus);
	var adjustedRoll = roll + attackBonus;
	var targetDefense = this.m_target.GetValue(ActionCombat.sValueNameDefenseRange);
	var success = (targetDefense <= adjustedRoll);
	var severityDamage = Math.max(0, adjustedRoll - targetDefense);
	var target = this.m_target;
	if (1 == roll){
		target = this.m_failTarget;
		severityDamage = Dice.Roll(this.m_randomStream, 10);
	}
	ActionCombat.LogMessage(combatResultDocument, this.m_participant.m_name + " range action " + this.m_action.GetValue(ActionCombat.sValueNameName) + " against " + target.m_name);
	var message = "segment:" + this.m_segment + " ";
	var doDamage = false;
	if (1 === roll){
		message += "crit fail on a roll of " + roll;
	} else if (true === autoFail){
		message += "auto fail on a roll of " + roll;
	} else if (true === autoSuccess){
		message += "auto success on a roll of " + roll;
		doDamage = true;
	} else if (true === success){
		message += "success on a roll of " + roll + " with bonus " + attackBonus + " against defense " + targetDefense;
		doDamage = true;
	} else {
		message += "fail on a roll of " + roll + " with bonus " + attackBonus + " against defense " + targetDefense;
	}
	ActionCombat.LogMessage(combatResultDocument, message);
	message = "";
	if (true === doDamage){
		var damageSum = 0;

		var damageBase = this.m_action.GetValue(ActionCombat.sValueNameDamageBase);
		if (false === isNaN(damageBase)){
			damageSum += damageBase;
			if (0 != damageBase){
				message += " damageBase " + damageBase;
			}
		}

		var damageDiceSides = this.m_action.GetValue(ActionCombat.sValueNameDamageDiceSides);
		var damageDiceCount = this.m_action.GetValue(ActionCombat.sValueNameDamageDiceCount);
		var damageDice = Dice.Rolls(this.m_randomStream, damageDiceSides, damageDiceCount);
		if (0 < damageDice){
			damageSum += damageDice;
			message += " damageDice(" + damageDiceCount + "d" + damageDiceSides + ") " + damageDice;
		}

		var damageAdjust = this.m_action.GetValue(ActionCombat.sValueNameDamageAdjust);
		if (false === isNaN(damageAdjust)){
			damageSum += damageAdjust;
			if (0 != damageAdjust){
				message += " damageAdjust " + damageAdjust;
			}
		}

		if ((true == this.m_action.GetValue(ActionCombat.sValueNameInflictSeverityDamage)) &&
			(true === this.m_target.GetValue(ActionCombat.sValueNameReceiveSeverityDamage))){
			damageSum += severityDamage;
			message += " severityDamage " + severityDamage;
		}

		var armorDamageAbsorption = this.m_target.GetValue(ActionCombat.sValueNameArmorDamageAbsorption);
		if ((1 < damageSum) && (armorDamageAbsorption != undefined)){
			damageSum = Math.max(1, damageSum - armorDamageAbsorption);
			message += " DamageAbsorption " + armorDamageAbsorption;
		}

		damageSum = Math.max(0, damageSum);

		message += " Total Damage " + damageSum;
		if (0 < damageSum){
			var physicalDamage = this.m_target.GetValue(ActionCombat.sValueNamePhysicalDamage);
			this.m_target.SetValue(ActionCombat.sValueNamePhysicalDamage, physicalDamage + damageSum);
		}
		ActionCombat.LogMessage(combatResultDocument, message);

		message = this.m_target.GetValue(ActionCombat.sValueNameName) + "'s health is now " + this.m_target.GetValue(ActionCombat.sValueNameCurrentDamageTollerance) + " of " + this.m_target.GetValue(ActionCombat.sValueNameDamageTolerance);
		ActionCombat.LogMessage(combatResultDocument, message);
	}
}

ActionCombat.RangeAction.Factory = function(participant, target, failTarget, action, randomStream, segment){
	return new ActionCombat.RangeAction(participant, target, failTarget, action, randomStream, segment);
}

ActionCombat.DebugValidateInput = function(sideArray, combatResultDocument){
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		side.m_arrayParticipant.map(function(participant){ ActionCombat.DebugValidateParticipant(participant, combatResultDocument); return 0; });
	}
}

ActionCombat.DebugValidateParticipant = function(participant, combatResultDocument){
	if (undefined == participant){
		console.log("participant undefined");
	}
	ActionCombat.DebugValidateGameObject("participant:" + participant.m_name, participant.m_gameObject, combatResultDocument, ActionCombat.sParticipantMandatory, ActionCombat.sParticipantOptional);
	var arrayMellee = participant.GetValue(ActionCombat.sValueNameActionMeelee);
	if (arrayMellee != undefined){
		arrayMellee.map(function(action){ ActionCombat.DebugValidateGameObject("mellee action:" + participant.m_name, action, combatResultDocument, ActionCombat.sActionMandatory, ActionCombat.sActionOptional); return 0; });	
	}
	var arrayRange = participant.GetValue(ActionCombat.sValueNameActionRange);
	if (arrayRange != undefined){
		arrayRange.map(function(action){ ActionCombat.DebugValidateGameObject("range action:" + participant.m_name, action, combatResultDocument, ActionCombat.sActionMandatory, ActionCombat.sActionOptional); return 0; });	
	}
	return;
}

ActionCombat.DebugValidateGameObject = function(lable, gameObject, combatResultDocument, arrayMandatory, arrayOptional){
	//ActionCombat.LogMessage(combatResultDocument, "Debug validate game object:" + lable);
	if (undefined == gameObject){
		console.log("gameObject undefined");
	}
	for (var index = 0, total = arrayMandatory.length; index < total; index++) {
		var name = arrayMandatory[index];
		var value = gameObject.GetValue(name);
		if (value === undefined){
			ActionCombat.LogMessage(combatResultDocument, "Error: mandatory attribute undefined:" + name + " " + lable);
		} //else {
		//	ActionCombat.LogMessage(combatResultDocument, name + ":" + value);
		//}

	}
	/*
	for (var index = 0, total = arrayOptional.length; index < total; index++) {
		var name = arrayOptional[index];
		var value = gameObject.GetValue(name);
		if (value === undefined){
			ActionCombat.LogMessage(combatResultDocument, "Warning: optional attribute undefined:" + name);
		} else {
			ActionCombat.LogMessage(combatResultDocument, name + ":" + value);
		}
	}
	*/
	return;
}

ActionCombat.Run = function(combatGameObject, combatResultDocumentOrUndefined){
	console.log("ActionCombat.Run0");

	var combatResultDocument = (combatResultDocumentOrUndefined !== undefined) ? combatResultDocumentOrUndefined : {};
	combatResultDocument.log = [];

	//marshal Data
	var sideA = ActionCombat.Side.Factory("side_a", combatGameObject, combatGameObject.GetValue("side_a_aware"));
	var sideB = ActionCombat.Side.Factory("side_b", combatGameObject, combatGameObject.GetValue("side_b_aware"));
	var sideArray = [sideA, sideB];
	var randomStream = new MersenneTwister(combatGameObject.GetValue("seed"));

	ActionCombat.DebugValidateInput(sideArray, combatResultDocument);

	if (false === ActionCombat.CheckSideAbleToFight(sideArray, combatResultDocument)){
		return combatResultDocument;
	}

	ActionCombat.DealInitialSurprise(sideArray, combatResultDocument, randomStream, combatGameObject);
	ActionCombat.InitStance(sideArray, combatResultDocument);

	for (var turn = 0; ActionCombat.PerformTurnCheck(turn, combatGameObject); ++turn){
		ActionCombat.BeginTurn(sideArray, combatResultDocument, randomStream, combatGameObject, turn);

		for (var segment = 0; segment < 10; ++segment){
			ActionCombat.UpdateStance(sideArray, combatResultDocument);

			var actionArray = ActionCombat.GatherActionArray(sideArray, randomStream, segment);
			ActionCombat.PerformAction(actionArray, combatResultDocument);

			if (false === ActionCombat.CheckSideAbleToFight(sideArray, combatResultDocument)){
				return combatResultDocument;
			}

			ActionCombat.EndSegment(sideArray, combatResultDocument, randomStream, combatGameObject);
		}

		ActionCombat.EndTurn(sideArray, combatResultDocument, randomStream, combatGameObject, turn);
	}

	return combatResultDocument;
}

ActionCombat.FilterParticipantIsAbleToFight = function(participant){
	return ((true === participant.GetValue(ActionCombat.sValueNameAbleParticipate)) && (false === participant.m_runAway));
}

ActionCombat.CheckSideAbleToFight = function(sideArray, combatResultDocument){
	var arraySidesAbleToFight = [];
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		var arrayParticipantAbleToFight = side.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight);
		if (0 < arrayParticipantAbleToFight.length){
			arraySidesAbleToFight.push(side);
		}
	}

	if (1 === arraySidesAbleToFight.length){
		var side = arraySidesAbleToFight[0];
		ActionCombat.LogMessage(combatResultDocument, "end with a win for side " + side.m_name);
		return false;
	} else if (0 === arraySidesAbleToFight.length){
		ActionCombat.LogMessage(combatResultDocument, "no side is able to continue fighting, end with a draw");
		return false;
	}

	return true;
}

ActionCombat.PerformTurnCheck = function(turn, combatGameObject){
	var useMaxTurn = combatGameObject.GetValue("use_max_turn");
	if (true === useMaxTurn){
		maxTurn = combatGameObject.GetValue("max_turn");
		return (turn < maxTurn);
	}
	//sanity
	if (1000 < turn){
		return false;
	}
	return true;
}

ActionCombat.DealInitialSurprise = function(sideArray, combatResultDocument, randomStream, combatGameObject){
	//find highest perception (or agility)
	var bestSide = undefined;
	var bestValue = undefined;
	var surpiseRollArray = [];
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];

		var surpriseRoll = undefined;
		var valueName = (side.m_aware) ? ActionCombat.sValueNameAgility : ActionCombat.sValueNamePerception;

		var arrayParticipantAbleToFight = side.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight);
		//add d10 each side, 
		var arrayRoll = arrayParticipantAbleToFight.map(function(participant){ return participant.GetValue(valueName) + Dice.Roll(randomStream, 10); });
		if (arrayRoll.length <= 0){
			continue;
		}
		var surpriseRoll = arrayRoll.reduce(function(a,b){ return (a < b) ? b : a; });

		//get largest surprise adjust
		var arraySurprisePenalty = side.m_arrayParticipant.map(function(participant){ return participant.GetValue(ActionCombat.sValueNameSurpriseAdjust); }).filter(function(value){ return value !== undefined; });
		var surprisePenalty = arraySurprisePenalty.reduce(function(a,b){ return (a < b) ? b : a; }, 0);

		if (surprisePenalty !== undefined){
			surpriseRoll += surprisePenalty;
		}

		ActionCombat.LogMessage(combatResultDocument, side.m_name + " surpriseRoll:" + surpriseRoll);

		//lowest number is surprised
		surpiseRollArray[index] = surpriseRoll;
		if ((bestValue === undefined) ||
			(bestValue < surpriseRoll)){
			bestValue = surpriseRoll;
			bestSide = side;
		}
	}

	if (undefined === bestSide){
		return;
	}

	var penaltyAwarded = false;
	//add difference as init penalty to surprised side (if side was not aware and can be surprised)
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		if (side === bestSide){
			continue;
		}
		var surpiseRoll = surpiseRollArray[index];
		if (surpiseRoll === undefined){
			continue;
		}

		var diff = bestValue - surpiseRoll;
		if ((false === side.m_aware) && (0 < diff)){
			side.m_arrayParticipant.map(function(participant){ participant.m_initiativePenalty = diff; return 0; });

			var message = side.m_name + " lost Initial Surprise roll and got a penalty of " + diff + " seconds";
			ActionCombat.LogMessage(combatResultDocument, message);
			penaltyAwarded = true;
		}
	}

	if (false === penaltyAwarded){
		ActionCombat.LogMessage(combatResultDocument, "no side had a surprise advantage");
	}

	return;
}

ActionCombat.BeginTurn = function(sideArray, combatResultDocument, randomStream, combatGameObject, turn){
	ActionCombat.LogMessage(combatResultDocument, "Begin turn:" + turn);
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		side.m_arrayParticipant.map(function(participant){
			participant.m_initiativeRoll = Dice.Roll(randomStream, 10);
			participant.m_actionArrayIndex = 0;
			participant.m_actionLoopCount = 0;
		});
	}
	ActionCombat.PrintParticipants(sideArray, combatResultDocument);

	return;
}

ActionCombat.EndSegment = function(sideArray, combatResultDocument, randomStream, combatGameObject){
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		side.m_arrayParticipant.map(function(participant){
			if (0 < participant.m_recoveryTime){
				participant.m_recoveryTime -= 1;
			}

			if (true === ActionCombat.FilterParticipantIsAbleToFight(participant)){
				if ((this.m_stance === ActionCombat.Stance.run) ||
					(this.m_chase === true)) {
					var speedInArmor = participant.GetValue(ActionCombat.sValueNameSpeed);
					participant.m_runDistance += speedInArmor;
				}
				if (this.m_stance === ActionCombat.Stance.run){
					var runAwayDistance = combatGameObject.GetValue("run_distance");
					if (runAwayDistance <= participant.m_runDistance){
						participant.m_runAway = true;
					}
				}

			}
		});
	}
	return;
}

ActionCombat.EndTurn = function(sideArray, combatResultDocument, randomStream, combatGameObject, turn){
	//ActionCombat.LogMessage(combatResultDocument, "End turn:" + turn);
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];
		side.m_arrayParticipant.map(function(participant){
			participant.m_initiativePenalty = 0;
		});
	}

	return;
}

ActionCombat.InitStance = function(sideArray, combatResultDocument){
	sideArray.map(function(side){
		side.m_arrayParticipant.map(function(participant){
			var behaviourName = participant.GetValue(ActionCombat.sValueNameCombatBehaviour);
			var behaviour;
			if (behaviourName in ActionCombat.Behaviour){
				behaviour = ActionCombat.Behaviour[behaviourName];
			}
			switch (behaviour){
				default:
				case ActionCombat.Behaviour.run:
					participant.m_stance = ActionCombat.Stance.run;
					break;
				case ActionCombat.Behaviour.range_if_engaged_mellee:
				case ActionCombat.Behaviour.range_if_engaged_range:
				case ActionCombat.Behaviour.range_if_engaged_run:
					participant.m_stance = ActionCombat.Stance.range;
					break;
				case ActionCombat.Behaviour.mellee:
					participant.m_stance = ActionCombat.Stance.mellee;
					break;
			}
		});
	});
}

ActionCombat.UpdateStance = function(sideArray, combatResultDocument){
	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];

		var sideParticipantMellee = false;
		side.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).map(function(participant){
			if (participant.m_stance === ActionCombat.Stance.mellee){
				sideParticipantMellee = true;
			}
		});

		var otherSideParticipantMellee = false;
		sideArray.filter(function(sideParam){ return (side !== sideParam); }).map(function(sideParam){
			sideParam.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).map(function(participant){
				if (participant.m_stance === ActionCombat.Stance.mellee){
					otherSideParticipantMellee = true;
				}
			});
		});
		
		// what happens if a range stance gets engaged by other side mellee
		side.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).map(function(participant){
			if ((participant.m_stance != ActionCombat.Stance.range) ||
				(sideParticipantMellee === true) ||
				(otherSideParticipantMellee === false)){
				return;
			}

			var behaviourName = participant.GetValue(ActionCombat.sValueNameCombatBehaviour);
			var behaviour;
			if (behaviourName in ActionCombat.Behaviour){
				behaviour = ActionCombat.Behaviour[behaviourName];
			}
			switch (behaviour){
				default:
					break;
				case ActionCombat.Behaviour.range_if_engaged_mellee:
					participant.m_stance = ActionCombat.Stance.mellee;
					break;
				case ActionCombat.Behaviour.range_if_engaged_run:
					participant.m_stance = ActionCombat.Stance.run;
					break;
			}
		});
	}

	return;
}


ActionCombat.GatherActionArray = function(sideArray, randomStream, segment){
	var actionArray = [];

	for (var index = 0, total = sideArray.length; index < total; index++) {
		var side = sideArray[index];

		//gather targets
		var otherSideParticipantRun = [];
		var otherSideParticipantRange = [];
		var otherSideParticipantMellee = [];
		sideArray.filter(function(sideParam){ return (side !== sideParam); }).map(function(sideParam){
			sideParam.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).map(function(participant){
				switch (participant.m_stance){
				default:
					break;
				case ActionCombat.Stance.mellee:
					otherSideParticipantMellee.push(participant);
					break;
				case ActionCombat.Stance.range:
					otherSideParticipantRange.push(participant);
					break;
				case ActionCombat.Stance.run:
					otherSideParticipantRun.push(participant);
					break;
				}
			});
		});

		//gather actions
		side.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).map(function(participant){
			switch (participant.m_stance){
			default:
				break;
			case ActionCombat.Stance.mellee:
				ActionCombat.GatherActionArrayMellee(actionArray, participant, randomStream, segment, otherSideParticipantMellee, otherSideParticipantRange, otherSideParticipantRun);
				break;
			case ActionCombat.Stance.range:
				ActionCombat.GatherActionArrayRange(actionArray, participant, randomStream, segment, sideArray, otherSideParticipantMellee, otherSideParticipantRange, otherSideParticipantRun);
				break;
			case ActionCombat.Stance.run:
				//you don't get actions while running
				break;
			}
		});
	}

	return actionArray;
}

ActionCombat.GatherActionArrayMellee = function(actionArray, participant, randomStream, segment, otherSideParticipantMellee, otherSideParticipantRange, otherSideParticipantRun) {
	//console.log("GatherActionArrayMellee segment:" + segment + " participant:" + participant.toString());
	if (0 < participant.m_recoveryTime){
		return; //not ready
	}

	//if there is at least one action, 
	var localActionArray = participant.GetValue(ActionCombat.sValueNameActionMeelee);
	if (undefined === localActionArray){
		return;
	}

	//localActionArray = localActionArray.filter(function(action){ return (true === action.GetValue(ActionCombat.sValueNameActive)); });
	if (0 == localActionArray.length){
		return;
	}
	//console.log("actionArray:" + actionArray);

	//select mellee, then range, then run
	var targetArray = otherSideParticipantMellee;
	if (0 == targetArray.length){
		targetArray = otherSideParticipantRange;
	}
	var doDistanceCheck = false;
	if (0 == targetArray.length){
		// have to catch up?
		var doDistanceCheck = true;
		targetArray = otherSideParticipantRun;
	}

	participant.m_chase = doDistanceCheck;
	if (doDistanceCheck === true){
		targetArray = targetArray.filter(function(targetParam){ return (targetParam.m_runDistance <= participant.m_runDistance); });
	}
	var target = ActionCombat.SelectSizeWeightTarget(randomStream, targetArray);
	if (undefined == target){
		return;
	}
	
	//if we are attacking someone running away, don't need to check initiative
	if (doDistanceCheck === false){
		var initiative = participant.m_initiativeRoll + participant.m_initiativePenalty;
		if (segment < initiative){
			return; //not ready
		}
	}

	var targetInitiative = target.m_initiativeRoll + target.m_initiativePenalty;

	if (localActionArray.length <= participant.m_actionArrayIndex){
		participant.m_actionLoopCount += 1;
		participant.m_actionArrayIndex = 0;
	}
	var action = localActionArray[participant.m_actionArrayIndex];
	participant.m_actionArrayIndex += 1;
	participant.m_recoveryTime = action.GetValue(ActionCombat.sValueNameRecoveryTime);
	var combatLevel = action.GetValue(ActionCombat.sValueNameCombatLevel);
	var targetCombatLevel = target.GetValue(ActionCombat.sValueNameCombatLevel);
	var extraFlurryCombatLevel = Math.max(0, Math.floor((combatLevel - targetCombatLevel) / 2));

	if ((participant.m_actionLoopCount == 0) || (segment < targetInitiative) || (participant.m_actionLoopCount <= extraFlurryCombatLevel) || (doDistanceCheck === true)){
		actionArray.push(ActionCombat.MelleeAction.Factory(participant, target, action, randomStream, segment));
	}

	return;
}

ActionCombat.SelectSizeWeightTarget = function(randomStream, targetArray) {
	if ((targetArray == undefined) || (targetArray.length <= 0)){
		return undefined;
	}

	var totalSize = 0.0;
	targetArray.map(function(item){
		totalSize += item.GetValue(ActionCombat.sValueNameSize);
	});
	if (totalSize < 0.0){
		totalSize = 1.0;
	}

	var roll = randomStream.Random();
	var last = undefined;
	for (var index = 0, total = targetArray.length; index < total; index++) {
		var item = targetArray[index];
		var size = item.GetValue(ActionCombat.sValueNameSize);
		var slice = (size / totalSize); 
		if (roll <= slice){
			return item;
		}
		roll -= slice;
		last = item;
	}
	return last; //backup
}

ActionCombat.SelectRangeTarget = function(targetArray, rangeTargetPriority, randomStream){
	if (targetArray.length <= 0){
		return undefined;
	}
	//ActionCombat.TargetPriority.
	var target = undefined;
	var bestValue = undefined;
	for (var index = 0, total = targetArray.length; index < total; index++) {
		var testTarget = targetArray[index];

		var testValue = undefined;
		var biggerIsBest = false;
		var random = false;

		switch (rangeTargetPriority){
		default:
			break;
		case ActionCombat.TargetPriority.least_experence:
			testValue = testTarget.GetValue(ActionCombat.sValueNameLevel);
			break;
		case ActionCombat.TargetPriority.least_health:
			testValue = testTarget.GetValue(ActionCombat.sValueNameCurrentDamageTollerance);
			break;
		case ActionCombat.TargetPriority.least_health_percentage:
			var damageTolerance = testTarget.GetValue(ActionCombat.sValueNameDamageTolerance);
			var current = testTarget.GetValue(ActionCombat.sValueNameCurrentDamageTollerance);
			testValue = current / damageTolerance;
			break;
		case ActionCombat.TargetPriority.most_experence:
			testValue = testTarget.GetValue(ActionCombat.sValueNameLevel);
			biggerIsBest = true;
			break;
		case ActionCombat.TargetPriority.most_health:
			biggerIsBest = true;
			testValue = testTarget.GetValue(ActionCombat.sValueNameCurrentDamageTollerance);
			break;
		case ActionCombat.TargetPriority.most_health_percentage:
			biggerIsBest = true;
			var damageTolerance = testTarget.GetValue(ActionCombat.sValueNameDamageTolerance);
			var current = testTarget.GetValue(ActionCombat.sValueNameCurrentDamageTollerance);
			testValue = current / damageTolerance;
			break;
		case ActionCombat.TargetPriority.random:
			break;
		}

		if ((target == undefined) ||
			((true === biggerIsBest) && (bestValue < testValue)) ||
			((false === biggerIsBest) && (testValue < bestValue)) || 
			((true === random) && (randomStream.Random() < (1.0 / total)))){
			target = testTarget;
			bestValue = testValue;
		}
	};

	return target;
}


ActionCombat.GatherActionArrayRange = function(actionArray, participant, randomStream, segment, sideArray, otherSideParticipantMellee, otherSideParticipantRange, otherSideParticipantRun) {
	//if there is at least one action, 
	var localActionArray = participant.GetValue(ActionCombat.sValueNameActionRange);
	if (undefined === localActionArray){
		return;
	}

	//localActionArray = localActionArray.filter(function(action){ return (true === action.GetValue(ActionCombat.sValueNameActive)); });
	if (0 == localActionArray.length){
		return;
	}

	var behaviourName = participant.GetValue(ActionCombat.sValueNameCombatBehaviour);
	var behaviour;
	if (behaviourName in ActionCombat.Behaviour){
		behaviour = ActionCombat.Behaviour[behaviourName];
	}
	if (0 < participant.m_recoveryTime){
		return; //not ready
	}

	//im trying to do a range attack, if i am attacking range or running away, we just fire and set recovery time to weapon recovery time
	// if i am targeting mellee, i have to match my initiative roll
	var targetStance = ActionCombat.Stance.none;
	var rangeTargetName = participant.GetValue(ActionCombat.sValueNameCombatRangeTarget);
	var rangeTarget = (rangeTargetName in ActionCombat.RangeTarget) ? ActionCombat.RangeTarget[rangeTargetName] : ActionCombat.RangeTarget.run_range;

	var targetArray = [];
	switch(rangeTarget){
		default:
		case ActionCombat.RangeTarget.range_run:
			targetArray = otherSideParticipantRange;
			targetStance = ActionCombat.Stance.mellee;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRun;
				targetStance = ActionCombat.Stance.run;
			}
			break;
		case ActionCombat.RangeTarget.range_run_mellee:
			targetArray = otherSideParticipantRange;
			targetStance = ActionCombat.Stance.range;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRun;
				targetStance = ActionCombat.Stance.run;
			}
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantMellee;
				targetStance = ActionCombat.Stance.mellee;
			}
			break;
		case ActionCombat.RangeTarget.run_range:
			targetArray = otherSideParticipantRun;
			targetStance = ActionCombat.Stance.run;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRange;
				targetStance = ActionCombat.Stance.range;
			}
			break;
		case ActionCombat.RangeTarget.run_range_mellee:
			targetArray = otherSideParticipantRun;
			targetStance = ActionCombat.Stance.run;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRange;
				targetStance = ActionCombat.Stance.range;
			}
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantMellee;
				targetStance = ActionCombat.Stance.mellee;
			}
			break;
		case ActionCombat.RangeTarget.mellee_run_range:
			targetArray = otherSideParticipantMellee;
			targetStance = ActionCombat.Stance.mellee;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRun;
				targetStance = ActionCombat.Stance.run;
			}
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRange;
				targetStance = ActionCombat.Stance.range;
			}
			break;
		case ActionCombat.RangeTarget.mellee_range_run:
			targetArray = otherSideParticipantMellee;
			targetStance = ActionCombat.Stance.mellee;
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRange;
				targetStance = ActionCombat.Stance.range;
			}
			if (targetArray.length <= 0){
				targetArray = otherSideParticipantRun;
				targetStance = ActionCombat.Stance.run;
			}
			break;
	}

	// if shooting into mellee, subject to initiative
	if (targetStance === ActionCombat.Stance.mellee){
		if (segment !== (participant.m_initiativeRoll + participant.m_initiativePenalty)){
			return;
		}
	}

	var rangeTargetPriorityName = participant.GetValue(ActionCombat.sValueNameCombatRangeTargetPriority);
	var rangeTargetPriority = (rangeTargetPriorityName in ActionCombat.TargetPriority) ? ActionCombat.TargetPriority[rangeTargetPriorityName] : ActionCombat.TargetPriority.least_health;

	var target = ActionCombat.SelectRangeTarget(targetArray, rangeTargetPriority, randomStream);
	if (undefined === target){
		//no target this round
		return;
	}

	if (localActionArray.length <= participant.m_actionArrayIndex){
		participant.m_actionLoopCount += 1;
		participant.m_actionArrayIndex = 0;
	}

	var action = localActionArray[participant.m_actionArrayIndex];
	participant.m_actionArrayIndex += 1;
	participant.m_recoveryTime = action.GetValue(ActionCombat.sValueNameRecoveryTime);

	var participantArray = [];
	sideArray.map(function(sideParam){
		sideParam.m_arrayParticipant.filter(ActionCombat.FilterParticipantIsAbleToFight).filter(function(participantParam){ return (participant !== participantParam); }).map(function(participant){
			participantArray.push(participant);
		});
	});
	var failTarget = ActionCombat.SelectSizeWeightTarget(randomStream, participantArray);

	actionArray.push(ActionCombat.RangeAction.Factory(participant, target, failTarget, action, randomStream, segment));

	return;
}

ActionCombat.PerformAction = function(actionArray, combatResultDocument){
	for (var index = 0, total = actionArray.length; index < total; index++) {
		var action = actionArray[index];
		action.Perform(combatResultDocument);
	}
	return;
}

ActionCombat.PrintParticipants = function(sideArray, combatResultDocument){
	sideArray.map(function(side){
		var message = " side:" + side.m_name + " ";
		side.m_arrayParticipant.map(function(participant){
			message += participant.toString();
		});
		ActionCombat.LogMessage(combatResultDocument, message);
	});

	return;
}



ActionCombat.LogMessage = function(combatResultDocument, message){
	combatResultDocument.log.push(message);
	return;
}
