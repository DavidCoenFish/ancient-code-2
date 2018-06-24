const LegendaryQuestOnline = function() {
	return;
}

LegendaryQuestOnline.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.write("hello");
	response.end();

	return Q();
}

LegendaryQuestOnline.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {

	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.end();

	return Q();
}

module.exports = function() {
	var legendaryquestonline = new LegendaryQuestOnline();
	return legendaryquestonline;
}
