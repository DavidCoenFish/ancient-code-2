const Q = require('q');
const Path = require("path");

const StaticFile = require("./staticfile.js");
const Util = require("./util.js")
const FileNotFound = require("./filenotfound.js")
const RenderError = require("./rendererror.js")
const Sling = require("./sling.js");
const Database = require("./mongo.js");
const LocaleManager = require("./localemanager.js");
const StyleManager = require("./stylemanager.js");
const View = require("./view.js");
const Config = require("./config");

const GatherStaticEndpoints = function(endpoints) {
	const publicPath = Path.join(__dirname, "../data/public/");
	const staticFile = StaticFile(publicPath);
	Util.WalkSyncRecursive(publicPath, function(filePath, stat){
		var staticFilePath = "/" + Path.relative(publicPath, filePath).replace(/\\/g, "/");
		//console.log("staticFile:" + staticFilePath);
		endpoints[staticFilePath] = staticFile;
		});
}

const GatherLocalEndpoints = function(endpoints) {
	//add endpoints from modules found under "../endpoints/"
	const endpointsPath = Path.join(__dirname, "/../endpoints/");
	Util.WalkSyncRecursive(endpointsPath, function(filePath, stat){
		var endpointTemp = "/" + Path.relative(endpointsPath, filePath);
		var extention = Path.extname(endpointTemp);
		var endpointPath = endpointTemp.substring(0, endpointTemp.length - extention.length) + ".";
		var modulePath = "./" + Path.relative(__dirname, filePath).replace(/\\/g, "/");;
		//console.log("endpointPath:" + endpointPath + " modulePath:" + modulePath);
		endpoints[endpointPath] = require(modulePath)();
		});
}

const GatherPlugins = function(plugins, endpoints, database) {
	const pluginsPath = Path.join(__dirname, "/../plugins/");
	//console.log("plugin:" + pluginsPath);
	Util.DirSync(pluginsPath, function(filePath, stat){
		var modulePath = "./" + Path.relative(__dirname, filePath).replace(/\\/g, "/") + "/main.js";
		//console.log("plugin:" + modulePath);
		try{
			var plugin = require(modulePath)(endpoints, database);
			plugins.push(plugin);
		}catch (err){
			console.log("plugin:" + modulePath + " threw:" + err);
		}
	});
}

const Framework = function(plugins, endpoints, database, localeManager, styleManager, view) {
	this.m_plugins = plugins;
	this.m_endpoints = endpoints;
	this.m_database = database;
	this.m_localeManager = localeManager;
	this.m_styleManager = styleManager;
	this.m_view = view;
	return;
}

Framework.prototype.Deal = function(response, rawUrl, method, body) {
	var promice = this._Deal(response, rawUrl, method, body).then(function(){
		console.log("done request:" + rawUrl + " method:" + method);
		return true;
	}).fail(function(err) {
		RenderError(response, err);
		return false;
	});
}

Framework.prototype._Deal = function(response, rawUrl, method, body) {
	var slingUrl = Sling(rawUrl);

	console.log("");
	console.log("request:" + rawUrl + " method:" + method);

	//allow empty url to redirect to /index
	if (("" === slingUrl.GetResourcePath()) ||
		("/" === slingUrl.GetResourcePath()) ||
		("/index.html" === rawUrl) ||
		("/index.htm" === rawUrl) ||
		("/index.php" === rawUrl)) {

		console.log("redirect");

		response.writeHead(301, { "Location": Config.defaultUrl});
		response.end();
		return Q();
	}

	//throw new Error("test exception thrown in promice");

	var endpointUrl = slingUrl.ComposeResourcePathExtension();
	if (endpointUrl in this.m_endpoints) {
		var endpoint = this.m_endpoints[endpointUrl];
		if (method in endpoint) {
			console.log("found endpoint:" + endpointUrl + " method:" + method);
			return endpoint[method](response, this, endpointUrl, slingUrl, body);
		}
	}

	return FileNotFound(response);
}

Framework.prototype.GetLocale = function(slingUrl) {
	var locale = slingUrl.GetSelector(Config.selectorKeyLocale);
	if (true == this.m_localeManager.HasLocale(locale)) {
		return locale;
	}
	return Config.defaultLocale;
}

Framework.prototype.SetLocale = function(slingUrl, locale) {
	slingUrl.SetSelector(Config.selectorKeyLocale, locale);
	return;
}

Framework.prototype.GetStyle = function(slingUrl) {
	var style = slingUrl.GetSelector(Config.selectorKeyStyle);
	if (true == this.m_styleManager.HasStyle(style)) {
		return style;
	}
	return Config.defaultStyle;
}

Framework.prototype.SetStyle = function(slingUrl, style) {
	slingUrl.SetSelector(Config.selectorKeyStyle, style);
	return;
}

Framework.prototype.Render = function(response, templateName, data, locale) {
	this.m_view.Render(response, templateName, data, locale);
	return;
}

Framework.prototype.GetDatabase = function() {
	return this.m_database;
}

Framework.prototype.GetLocaleManager = function() {
	return this.m_localeManager;
}

Framework.prototype.GetStyleManager = function() {
	return this.m_styleManager;
}

Framework.prototype.GetPluginButtonArray = function(locale) {
	var promiceArray = [];
	for (var index = 0; index < this.m_plugins.length; ++index)
	{
		var plugin = this.m_plugins[index];
		var promice = plugin.GetDataPromice(this, locale);
		promiceArray.push(promice);
	}
	var promice = Q.all(promiceArray)
	.then(function(result){
		var arrayButtons = [];
		for (var index = 0; index < result.length; ++index)
		{
			var item = result[index];
			var buttonData = {
				"link" : item.link,
				"text" : item.name,
				"img" : item.image
			};
			arrayButtons.push(buttonData);
		}

		return arrayButtons;
	});
	return promice;
}

Framework.prototype.GetMenu = function(locale, slingUrl) {
	var translationPromiceArray = [];
	const settingsIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_toolbar_settings")) - 1;
	const loginIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_toolbar_login")) - 1;
	const navigationIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_toolbar_navigation")) - 1;
	const settingsLanguageIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_settings_language")) - 1;
	const settingsStyleIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_settings_style")) - 1;
	const loginLoginIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_login_login")) - 1;
	const loginLogoutIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_login_logout")) - 1;
	const loginAccountIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_login_account")) - 1;
	const navigationHomeIndex = translationPromiceArray.push(this.m_localeManager.GetFormatedString(locale, "loc_navigation_home")) - 1;
	var framework = this;

	var promice = Q.all(translationPromiceArray)
	.then(function(result){
		var menu = [];
		menu.push({
			"name" : result[loginIndex],
			"submenu" : [{
					"link": "",
					"item": result[loginLoginIndex]
				},{
					"link": "",
					"item": result[loginLogoutIndex]
				},{
					"link": "",
					"item": result[loginAccountIndex]
				}]
			});
		var linkLocale = Sling("/locale");
		framework.SetLocale(linkLocale, framework.GetLocale(slingUrl));
		framework.SetStyle(linkLocale, framework.GetStyle(slingUrl));
		var suffix = slingUrl.ComposeResourcePathSelectorExtension();
		linkLocale.SetSuffix(suffix);

		var linkStyle = Sling("/style");
		framework.SetLocale(linkStyle, framework.GetLocale(slingUrl));
		framework.SetStyle(linkStyle, framework.GetStyle(slingUrl));
		linkStyle.SetSuffix(suffix);

		var linkHome = Sling("/index");
		framework.SetLocale(linkHome, framework.GetLocale(slingUrl));
		framework.SetStyle(linkHome, framework.GetStyle(slingUrl));

		menu.push({
			"name" : result[settingsIndex],
			"submenu" : [{
					"link": linkLocale.ComposeURL(),
					"item": result[settingsLanguageIndex]
				},{
					"link": linkStyle.ComposeURL(),
					"item": result[settingsStyleIndex]
				}]
			});

		menu.push({
			"name" : result[navigationIndex],
			"submenu" : [{
					"link": linkHome.ComposeURL(),
					"item": result[navigationHomeIndex]
				}]
			});

		return menu;
	});
	return promice;
}

Framework.prototype.MakeLegalSlingUrl = function(rawUrl) {
	var tempSlingUrl = Sling(rawUrl);
	var resourcePathExtension = tempSlingUrl.ComposeResourcePathExtension();
	if ((resourcePathExtension in this.m_endpoints) === false) {
		resourcePathExtension = Config.defaultUrl;
	}

	resultSlingUrl = Sling(resourcePathExtension);

	var locale = this.GetLocale(tempSlingUrl);
	resultSlingUrl.SetSelector(Config.selectorKeyLocale, locale);

	var style = this.GetStyle(tempSlingUrl);
	resultSlingUrl.SetSelector(Config.selectorKeyStyle, style);

	return resultSlingUrl;
}

module.exports = function() {
	var endpoints = {};
	var plugins = [];
	var database = Database();

	GatherStaticEndpoints(endpoints);
	GatherLocalEndpoints(endpoints);
	GatherPlugins(plugins, endpoints, database);
	var localeManager = LocaleManager(database);
	var styleManager = StyleManager();
	var view = View();

	for(var item in endpoints){
		console.log("endpoints:" + item);
	}

	var framework = new Framework(plugins, endpoints, database, localeManager, styleManager, view);
	return framework;
}
