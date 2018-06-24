const StoryEdit = function() {
	return;
}

StoryEdit.prototype.get = function(response, framework, endpointUrl, slingUrl, body) {
	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.write("hello");
	response.end();

	return Q();
}

StoryEdit.prototype.head = function(response, framework, endpointUrl, slingUrl, body) {

	var locale = framework.GetLocale(slingUrl);

	response.writeHeader(200, {
		"Content-Type" : "text/html; charset=utf-8", 
		"Content-Language" : locale
	});
	response.end();

	return Q();
}

module.exports = function() {
	var storyEdit = new StoryEdit();
	return storyEdit;
}
