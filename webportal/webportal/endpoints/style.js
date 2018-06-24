const Q = require("q");
const sling = require("./../modules/sling");

const Style = function() {
	return;
}

Style.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	//console.log("Style get:" + endpointUrl);

	try
	{
		var localeManager = framework.GetLocaleManager();
		var styleManager = framework.GetStyleManager();
		var localeResult = framework.GetLocale(slingUrl);
		var style = framework.GetStyle(slingUrl);
		var slingDestination = framework.MakeLegalSlingUrl(slingUrl.GetSuffix());

		var translationPromiceArray = [];
		const titleIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_style_title")) - 1;
		const headingIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_style_heading")) - 1;
		const footerIndex = translationPromiceArray.push(localeManager.GetFormatedString(localeResult, "loc_footer_server_datestamp", {"__DATE__" : (new Date()).toLocaleString(localeResult)})) - 1;

		var promice = Q.all(translationPromiceArray)
		.then(function(result){
			var arrayButtons = [];
			var styleMap = styleManager.GetStyleMap();

			for (var key in styleMap)
			{
				var value = styleMap[key];
				framework.SetStyle(slingDestination, key);
				var link = slingDestination.ComposeResourcePathSelectorExtension();
				//console.log("key:" + key + " link:" + link);
				var buttonData = {
					"link" : link,
					"text" : value,
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

Style.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {
	var promice = this.get(response, framework, endpointUrl, slingUrl, body);
	promice = promice.then(function(result){
		response.dropBody();
	});
	return promice;
}

module.exports = function() {
	var style = new Style();
	return style;
}