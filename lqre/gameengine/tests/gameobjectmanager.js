const Q = require('q');
const Test = require("./../modules/test.js");
const WrapJavaScript = require("./../modules/wrapjavascript.js");

module.exports = function(promiseArray) {
	RunEmpty(promiseArray);

	return;
}

const RunEmpty = function(promiseArray) {
	promiseArray.push(Q(true).then(function(input){
		console.log("gameObjectManager.RunEmpty start");

		const context = { "console": console };
		WrapJavaScript("./data/data.js", context);

		WrapJavaScript("./build/library_lqre.js", context);

		Test.DealTest("gameObjectManager.RunEmpty", context.staticData != null, true);
		Test.DealTest("gameObjectManager.RunEmpty", context.c != null, true);

		const gameObjectManager = context.c.GameObjectManager.Factory(context.staticData, context.c.InstructionContext);

		Test.DealTest("gameObjectManager.RunEmpty gameObjectManager", gameObjectManager != null, true);

		const document = gameObjectManager.newGameDocument("character");

		console.log("document:" + JSON.stringify(document));

		Test.DealTest("gameObjectManager.RunEmpty document", document != null, true);

		const gameCharacter = gameObjectManager.documentToGameObject(document);

		Test.DealTest("gameObjectManager.RunEmpty gameCharacter", gameCharacter != null, true);

		gameCharacter.SetValue("name", "foo");
		Test.DealTest("gameObjectManager.RunEmpty set name", gameCharacter.GetValue("name"), "foo");

		Test.DealTest("gameObjectManager.RunEmpty set name", gameCharacter.GetValue("level"), 1);

		gameCharacter.SetValue("experence", 100);
		Test.DealTest("gameObjectManager.RunEmpty set name", gameCharacter.GetValue("level"), 4);

		gameCharacter.SetValue("experence", 200);
		Test.DealTest("gameObjectManager.RunEmpty set name", gameCharacter.GetValue("level"), 5);

		return true;
	}));
}


