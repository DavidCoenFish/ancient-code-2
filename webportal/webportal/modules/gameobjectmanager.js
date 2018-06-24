const Q = require("q");
const WrapJavaScript = require("./wrapjavascript.js");

/*
	//alternative is to parse the data to work out what type and tables are needed, but specifying database collection names isn't that bad
	"combat_test_types", "combat_test_collections"
*/
module.exports = function(database, collectionNameTypes, collectionNameCollections)
{
	console.log("gameObjectManager:collectionNameTypes:" + collectionNameTypes + " collectionNameCollections:" + collectionNameCollections);

	//database.getPromiceCollection(collectionNameCollections).then(function(collection){
	//	console.log(JSON.stringify(collection));
	//});

	var context = {
		"Q" : Q,
		"console" : console
	};
	context = WrapJavaScript("./data/public/js/dagcollection.js", context);
	context = WrapJavaScript("./data/public/js/dagnodecalculate.js", context);
	context = WrapJavaScript("./data/public/js/dagnodevalue.js", context);
	context = WrapJavaScript("./data/public/js/dice.js", context);
	context = WrapJavaScript("./data/public/js/random.js", context);
	context = WrapJavaScript("./data/public/js/gameobject.js", context);
	context = WrapJavaScript("./data/public/js/gameobjectmanager.js", context);
	context = WrapJavaScript("./data/public/js/gameobjectmanagerdataserver.js", context);

	var gameObjectManagerDataServer = context.GameObjectManagerDataServer.factory(database, collectionNameTypes, collectionNameCollections);
	var gameObjectManager = context.GameObjectManager.factory(gameObjectManagerDataServer);

	return gameObjectManager;
}
