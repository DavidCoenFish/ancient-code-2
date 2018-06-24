const Q = require("q");
const Config = require("./../../../modules/config");

const CombatTest = function() {
	return;
}

CombatTest.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	try
	{
		var localeManager = framework.GetLocaleManager();
		var localeResult = framework.GetLocale(slingUrl);
		var style = framework.GetStyle(slingUrl);

		var translationPromiceArray = [];
		const titleIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_combattest_title")) - 1;
		const descriptionIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_combattest_description")) - 1;
		const footerIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_footer_server_datestamp", {"__DATE__" : (new Date()).toLocaleString(localeResult)})) - 1;
		const menuIndex = translationPromiceArray.push(framework.GetMenu(localeResult, slingUrl)) - 1;

		var promice = Q.all(translationPromiceArray)
		.then(function(result){
			const data = {
				"locale" : localeResult,
				"style" : style,
				"title" : result[titleIndex],
				"description" : result[descriptionIndex],
				"author" : Config.author,
				"menu" : result[menuIndex],
				"footer" : [result[footerIndex]],
				"scripts" : [
					"/js/q.js", 
					"/js/clientdatabase.js",
					"/js/dagcollection.js",
					"/js/dagnodecalculate.js",
					"/js/dagnodevalue.js",
					"/js/dice.js",
					"/js/gameobject.js",
					"/js/gameobjectmanager.js",
					"/js/gameobjectmanagerdataserver.js",
					"/js/random.js",
					"/js/resourceaction.js",
					"/js/resourceedit.js", 
					"/js/resourceeditdataserverdagnode.js",
					"/js/resourceeditdataserverresource.js",
					"/js/resourcelist.js", 
					"/js/resourcelistdataserverdagnode.js", 
					"/js/resourcelistdataserverresource.js",
					"/js/resourcelistwrappertype.js",
					"/js/combattest00.js"]
				};

			framework.Render(response, "toolbar_application_footer", data, localeResult);
		});
		return promice;
	}
	catch(err)
	{
		console.log("err:" + err);
	}
	var defer = Q.defer();
	defer.reject("endpoint threw error");
	return defer.promise;
}

CombatTest.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {

	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.end();

	return Q();
}

module.exports = function() {
	var combatTest = new CombatTest();
	return combatTest;
}
