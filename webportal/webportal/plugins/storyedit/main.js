const Path = require("path");
const Util = require("./../../modules/util.js")

const GatherLocalEndpoints = function(endpoints) {
	//add endpoints from modules found under "../endpoints/"
	const endpointsPath = Path.join(__dirname, "/endpoints/");
	Util.WalkSyncRecursive(endpointsPath, function(filePath, stat){
		var endpointTemp = "/" + Path.relative(endpointsPath, filePath).replace(/\\/g, "/");
		var extention = Path.extname(endpointTemp);
		var endpointPath = endpointTemp.substring(0, endpointTemp.length - extention.length) + ".";
		var modulePath = "./" + Path.relative(__dirname, filePath).replace(/\\/g, "/");;
		//console.log("ct endpointPath:" + endpointPath + " modulePath:" + modulePath);
		endpoints[endpointPath] = require(modulePath)();
	});
}

const Main = function() {
	return;
}

Main.prototype.GetDataPromice = function(framework, locale) {
	var localeManager = framework.GetLocaleManager();
	var promice = localeManager.GetFormatedString(locale, "loc_plugin_name_story_edit")
	.then(function(result){
		return {
			"name" : result,
			"link" : "/storyedit",
			"img" : null
			};
	});
	return promice;
}

module.exports = function(endpoints) {
	GatherLocalEndpoints(endpoints);
	var main = new Main();
	return main;
}
