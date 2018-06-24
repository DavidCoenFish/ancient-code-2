const Q = require('q');
const Test = require("./../modules/test.js");
const Database = require("./../modules/mongo.js");
const GameObjectManager = require("./../modules/gameobjectmanager.js");
const WrapJavaScript = require("./../modules/wrapjavascript.js");

module.exports = function(promiseArray) {
	RunTestMellee(promiseArray);
	RunTestRange(promiseArray);
	return;
}

const RunTestMellee = function(promiseArray) {

	var database = Database();
	var gameObjectManager = new GameObjectManager(database, "combat_test_types", "combat_test_collections");

	promiseArray.push(gameObjectManager.GetLoadPromice().then(function(input){
		//console.log("gameObjectManager.GetLoadPromice:" + JSON.stringify(input));

		var combatDocument = gameObjectManager.NewGameDocument("combat");
		combatDocument.use_max_turn = true;
		combatDocument.max_turn = 1000;

		{
			var characterDocument = gameObjectManager.NewGameDocument("character");
			characterDocument.experence = 100;
			characterDocument.name = "bob";
			characterDocument.race = "human";
			characterDocument.gender = "male";
			characterDocument.spent_physical_strength = 9;
			var actionMelleeDocument = gameObjectManager.NewGameDocument("action");
			actionMelleeDocument.name = "dagger";
			actionMelleeDocument.active = true;
			actionMelleeDocument.recovery_time = 4;
			actionMelleeDocument.damage_dice_sides = 4;
			actionMelleeDocument.damage_dice_count = 1;
			actionMelleeDocument.parry = 5;
			characterDocument.action_meelee = [actionMelleeDocument];
			combatDocument.side_a = [characterDocument];

			//console.log("characterDocument:" + JSON.stringify(characterDocument));
			//var characterGameObject = gameObjectManager.GameDocumentToGameObject(characterDocument);
			//combatGameObject.SetValue("side_a", [characterGameObject]);
		}

		{
			var characterDocument = gameObjectManager.NewGameDocument("character");
			characterDocument.experence = 100;
			characterDocument.name = "fred";
			characterDocument.race = "human";
			characterDocument.gender = "male";
			characterDocument.spent_physical_strength = 9;
			var actionMelleeDocument = gameObjectManager.NewGameDocument("action");
			actionMelleeDocument.name = "punch";
			actionMelleeDocument.active = true;
			actionMelleeDocument.recovery_time = 1;
			actionMelleeDocument.damage_dice_sides = 2;
			actionMelleeDocument.damage_dice_count = 1;
			actionMelleeDocument.parry = 3;
			characterDocument.action_meelee = [actionMelleeDocument];
			combatDocument.side_b = [characterDocument];

			//var characterGameObject = gameObjectManager.GameDocumentToGameObject(characterDocument);
			//console.log(characterGameObject.toString());
			//combatGameObject.SetValue("side_b", [characterGameObject]);
		}

		var combatGameObject = gameObjectManager.GameDocumentToGameObject(combatDocument);
		combatGameObject.SetValue("seed", 1);

		var context = { "console" : console };
		context = WrapJavaScript("./data/public/js/random.js", context);
		context = WrapJavaScript("./data/public/js/dice.js", context);
		context = WrapJavaScript("./data/public/js/actioncombat.js", context);

		var resultDocument = {};
		context.ActionCombat.Run(combatGameObject, resultDocument);

		console.log(JSON.stringify(resultDocument));

		return true;
	}));
}

const RunTestRange = function(promiseArray) {

	var database = Database();
	var gameObjectManager = new GameObjectManager(database, "combat_test_types", "combat_test_collections");

	promiseArray.push(gameObjectManager.GetLoadPromice().then(function(input){
		//console.log("gameObjectManager.GetLoadPromice:" + JSON.stringify(input));

		var combatDocument = gameObjectManager.NewGameDocument("combat");
		combatDocument.use_max_turn = true;
		combatDocument.max_turn = 1000;

		{
			var characterDocument = gameObjectManager.NewGameDocument("character");
			characterDocument.experence = 100;
			characterDocument.name = "bob";
			characterDocument.race = "human";
			characterDocument.gender = "male";
			characterDocument.spent_physical_strength = 9;
			characterDocument.combat_behaviour = "range_if_engaged_run";
			var actionMelleeDocument = gameObjectManager.NewGameDocument("action");
			actionMelleeDocument.name = "great bow";
			actionMelleeDocument.active = true;
			actionMelleeDocument.recovery_time = 6;
			actionMelleeDocument.damage_dice_sides = 6;
			actionMelleeDocument.damage_dice_count = 2;
			actionMelleeDocument.parry = 0;
			characterDocument.action_range = [actionMelleeDocument];
			combatDocument.side_a = [characterDocument];

			//console.log("characterDocument:" + JSON.stringify(characterDocument));
			//var characterGameObject = gameObjectManager.GameDocumentToGameObject(characterDocument);
			//combatGameObject.SetValue("side_a", [characterGameObject]);
		}

		{
			var characterDocument = gameObjectManager.NewGameDocument("character");
			characterDocument.experence = 100;
			characterDocument.name = "fred";
			characterDocument.race = "human";
			characterDocument.gender = "male";
			characterDocument.spent_physical_strength = 9;
			characterDocument.combat_behaviour = "range_if_engaged_run";
			var actionMelleeDocument = gameObjectManager.NewGameDocument("action");
			actionMelleeDocument.name = "short bow";
			actionMelleeDocument.active = true;
			actionMelleeDocument.recovery_time = 1;
			actionMelleeDocument.damage_dice_sides = 6;
			actionMelleeDocument.damage_dice_count = 1;
			actionMelleeDocument.parry = 0;
			characterDocument.action_range = [actionMelleeDocument];
			combatDocument.side_b = [characterDocument];

			//var characterGameObject = gameObjectManager.GameDocumentToGameObject(characterDocument);
			//console.log(characterGameObject.toString());
			//combatGameObject.SetValue("side_b", [characterGameObject]);
		}

		var combatGameObject = gameObjectManager.GameDocumentToGameObject(combatDocument);
		combatGameObject.SetValue("seed", 1);

		var context = { "console" : console };
		context = WrapJavaScript("./data/public/js/random.js", context);
		context = WrapJavaScript("./data/public/js/dice.js", context);
		context = WrapJavaScript("./data/public/js/actioncombat.js", context);

		var resultDocument = {};
		context.ActionCombat.Run(combatGameObject, resultDocument);

		console.log(JSON.stringify(resultDocument));

		return true;
	}));
}
