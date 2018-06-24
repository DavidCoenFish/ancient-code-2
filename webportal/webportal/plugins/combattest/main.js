const Path = require("path");
const Util = require("./../../modules/util.js")
const GameObjectManager = require("./../../modules/gameobjectmanager.js");

const WrapJavascript = require("./../../modules/wrapjavascript.js")
const RestResource = require("./../../modules/restresource.js")
const CollectionResource = require("./../../modules/collectionresource.js")
const RestAction = require("./../../modules/restaction.js")
const WrapJavaScript = require("./../../modules/wrapjavascript.js");

const GatherLocalEndpoints = function(endpoints) {
	//add endpoints from modules found under "../endpoints/"
	const endpointsPath = Path.join(__dirname, "/endpoints/");
	Util.WalkSyncRecursive(endpointsPath, function(filePath, stat){
		var endpointTemp = "/" + Path.relative(endpointsPath, filePath).replace(/\\/g, "/");
		var extention = Path.extname(endpointTemp);
		var endpointPath = endpointTemp.substring(0, endpointTemp.length - extention.length) + ".";
		var modulePath = "./" + Path.relative(__dirname, filePath).replace(/\\/g, "/");;
		//console.log("ct endpointPath:" + endpointPath + " modulePath:" + modulePath);
		var plugin = require(modulePath);
		endpoints[endpointPath] = plugin();
	});

	return;
}

const MakeRestfulEndpoints = function(endpoints, gameObjectManager, database) {
	console.log("MakeRestfulEndpoints");

	//endpoints["/combattest/collection/combat_test_collections."] = CollectionResource("combat_test_collections");
	//endpoints["/combattest/collection/combat_test_types."] = CollectionResource("combat_test_types");

	//white list accessable resources
	database.getPromiceCollection("combat_test_types").then(function(input){
		for (var index = 0, total = input.length; index < total; index++) {
			var row = input[index];
			var type = row._id;
			var endpoint = row.endpoint;
			var data = row.data;
			endpoints[endpoint] = RestResource(type, data, gameObjectManager);	
			console.log(endpoint);
		}
	});

	//white list accessable tables
	database.getPromiceCollection("combat_test_collections").then(function(input){
		for (var index = 0, total = input.length; index < total; index++) {
			var row = input[index];
			var tableName = row._id;
			var endpoint = "/combattest/collection/" + tableName + ".";
			endpoints[endpoint] = CollectionResource(tableName);
			console.log(endpoint);
		}
		return true;
	});

	return;
}

const MakeCombatActionEndpoints = function(endpoints, gameObjectManager, database) {
	var endpoint = "/combattest/action/combat.";

	var context = { "console" : console };
	context = WrapJavaScript("./data/public/js/random.js", context);
	context = WrapJavaScript("./data/public/js/dice.js", context);
	context = WrapJavaScript("./data/public/js/actioncombat.js", context);

	endpoints[endpoint] = RestAction(
		"combat", //sourceType, 
		"combat_test_combat", //sourceCollectionName, 
		"combat_result", //destType, 
		"combat_test_combat_result", //destCollectionName, 
		context.ActionCombat.Run, //actionCallback, 
		gameObjectManager //gameObjectManager
		);

	return;
}

const Main = function(gameObjectManager) {
	this.m_gameObjectManager = gameObjectManager;
	return;
}

Main.prototype.GetDataPromice = function(framework, locale) {
	var localeManager = framework.GetLocaleManager();
	var promice = localeManager.GetFormatedString(locale, "loc_plugin_name_combat_test")
	.then(function(result){
		return {
			"name" : result,
			"link" : "/combattest",
			"img" : null
			};
	});
	return promice;
}

module.exports = function(endpoints, database) {
	GatherLocalEndpoints(endpoints);

	var gameObjectManager = new GameObjectManager(database, "combat_test_types", "combat_test_collections");

	MakeRestfulEndpoints(endpoints, gameObjectManager, database);
	MakeCombatActionEndpoints(endpoints, gameObjectManager, database);
	var main = new Main(gameObjectManager);
	return main;
}
