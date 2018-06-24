const Q = require('q');
const Test = require("./../modules/test.js");
const Database = require("./../modules/mongo.js");
const GameObjectManager = require("./../modules/gameobjectmanager.js");

module.exports = function(promiseArray) {
	RunTest(promiseArray);
	return;
}

const RunTest = function(promiseArray) {

	var database = Database();
	var gameObjectManager = new GameObjectManager(database, "combat_test_types", "combat_test_collections");

	promiseArray.push(gameObjectManager.GetLoadPromice().then(function(input){
		//console.log("gameObjectManager.GetLoadPromice:" + JSON.stringify(input));

		var characterDocument = gameObjectManager.NewGameDocument("character");

		characterDocument.experence = 100;
		characterDocument.name = "bob";
		characterDocument.race = "human";
		characterDocument.gender = "male";
		characterDocument.spent_physical_strength = 9;
		//console.log("characterDocument:" + JSON.stringify(characterDocument));

		var characterGameObject = gameObjectManager.GameDocumentToGameObject(characterDocument);
		console.log("characterGameObject:" + characterGameObject);
		//console.log("characterGameObject:" + characterGameObject.toString());

		var characterDocument2 = gameObjectManager.GameObjectToGameDocument(characterGameObject);

		Test.DealTest("character roundtrip:", JSON.stringify(characterDocument), JSON.stringify(characterDocument2)); 
		Test.DealTest("character level:", characterGameObject.GetValue("level"), 4); 
		Test.DealTest("spent_attribute_points:", characterGameObject.GetValue("spent_attribute_points"), 9); 
		Test.DealTest("physical_strength:", characterGameObject.GetValue("physical_strength"), 5); 

		console.log(characterGameObject.toString());

		return true;
	}));
}
