const FileSystem = require("fs");
const Path = require("path");
const Q = require("q");
const Mustache = require("mustache");
const Util = require("./util.js")

const View = function()
{
	this.m_templateMap = {};
	return;
}

View.prototype.AddTemplate = function(key, template)
{
	Mustache.parse(template);

	this.m_templateMap[key] = template;

	return;
}

View.prototype.Render = function(response, templateName, data, locale)
{
	console.log("View.Render:" + templateName);

	if (templateName in this.m_templateMap) {
		const template = this.m_templateMap[templateName];
		const render = Mustache.render(template, data);

		response.writeHeader(200, {
			"Content-Type" : "text/html; charset=utf-8", 
			"Content-Language" : locale
		});
		response.write(render);
		response.end();

		return Q(true);
	}
	else {
		throw new Error("view: template not found:" + templateName);
	}

	return;
}

module.exports = function()
{
	var view = new View();

	var arrayPromices = [];
	const templatePath = Path.join(__dirname, "../data/template/");
	Util.WalkSync(templatePath, function(filePath, stat){

		const baseName = Path.basename(filePath);
		const extention = Path.extname(baseName);
		const templateName = baseName.substring(0, baseName.length - extention.length);

		var deferred = Q.defer();
		FileSystem.readFile(filePath, 'utf8', function (err,data) {
			if (err) {
				console.log(err);
				deferred.reject("readfile error");
				return;
			}

			view.AddTemplate(templateName, data);

			deferred.resolve(true);
		});
		arrayPromices.push(deferred.promise);
	});


	Q.all(arrayPromices);

	return view;
}
