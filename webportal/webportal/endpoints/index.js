const Q = require("q");
const Config = require("./../modules/config");

const Index = function() {
	return;
}

Index.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	//console.log("index get:" + endpointUrl);

	try
	{
		var localeManager = framework.GetLocaleManager();
		var localeResult = framework.GetLocale(slingUrl);
		var style = framework.GetStyle(slingUrl);

		var translationPromiceArray = [];
		const titleIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_index_title")) - 1;
		const headingIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_index_heading")) - 1;
		const descriptionIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_index_description")) - 1;
		const footerIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_footer_server_datestamp", {"__DATE__" : (new Date()).toLocaleString(localeResult)})) - 1;
		const menuIndex = translationPromiceArray.push(framework.GetMenu(localeResult, slingUrl)) - 1;
		const arrayButtonIndex =  translationPromiceArray.push(framework.GetPluginButtonArray(localeResult)) - 1;

		var promice = Q.all(translationPromiceArray)
		.then(function(result){
			console.log("");
			console.log("index:" + result[descriptionIndex]);
			console.log("");
			const data = {
				"locale" : localeResult,
				"style" : style,
				"title" : result[titleIndex],
				"description" : result[descriptionIndex],
				"author" : Config.author,
				"menu" : result[menuIndex],
				"bodyheader" : result[headingIndex],
				"container" : result[arrayButtonIndex],
				"footer" : [result[footerIndex]]
				};

			framework.Render(response, "toolbar_bigcontainer_footer", data, localeResult);
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

Index.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {

	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.end();

	return Q();
}

module.exports = function() {
	var index = new Index();
	return index;
}
