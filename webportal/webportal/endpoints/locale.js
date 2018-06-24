const Q = require("q");

const Locale = function() {
	return;
}

Locale.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	//console.log("Locale get:" + endpointUrl);

	try
	{
		var localeManager = framework.GetLocaleManager();
		var localeResult = framework.GetLocale(slingUrl);
		var style = framework.GetStyle(slingUrl);
		var slingDestination = framework.MakeLegalSlingUrl(slingUrl.GetSuffix());

		var translationPromiceArray = [];
		const titleIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_locale_title")) - 1;
		const headingIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_locale_heading")) - 1;
		const footerIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_footer_server_datestamp", {"__DATE__" : (new Date()).toLocaleString(localeResult)})) - 1;

		var promice = Q.all(translationPromiceArray)
		.then(function(result){
			var arrayButtons = [];
			var localeMap = localeManager.GetLocaleMap();

			for (var key in localeMap)
			{
				var value = localeMap[key];
				framework.SetLocale(slingDestination, key);
				var link = slingDestination.ComposeResourcePathSelectorExtension();
				//console.log("key:" + key + " link:" + link);
				var buttonData = {
					"link" : link,
					"text" : value["name"],
					"img" : ""
				};
				arrayButtons.push(buttonData);
			}

			const data = {
				"locale" : localeResult,
				"style" : style,
				"title" : result[titleIndex],
				"author" : "David Coen",
				"bodyheader" : result[headingIndex],
				"container" : arrayButtons,
				"footer" : [result[footerIndex]]
				};

			framework.Render(response, "smallcontainer_footer", data, localeResult);
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

Locale.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	var promice = this.get(response, framework, endpointUrl, slingUrl, body);
	promice = promice.then(function(result){
		response.dropBody();
	});
	return promice;
}

module.exports = function() {
	var locale = new Locale();
	return locale;
}
