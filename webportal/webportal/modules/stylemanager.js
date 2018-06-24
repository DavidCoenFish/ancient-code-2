const Util = require("./util.js")
const Path = require("path");

const GatherStyles = function(data) {
	const publicPath = Path.join(__dirname, "../data/public/css/style");
	Util.WalkSync(publicPath, function(filePath, stat){
		var base = Path.parse(filePath).base;
		var extention = Path.extname(base);
		var fileName = base.substring(0, base.length - extention.length);
		data[fileName] = base;
		//console.log("style:" + fileName);
		});
}

const StyleManager = function(data)
{
	this.m_data = data;
	return;
}

StyleManager.prototype.HasStyle = function(key)
{
	return (key in this.m_data);
}

StyleManager.prototype.GetStyle = function(key)
{
	if (key in this.m_data){
		return this.m_data[key];
	}
	return "";
}

StyleManager.prototype.GetStyleMap = function()
{
	return this.m_data;
}


module.exports = function()
{
	var data = {};
	GatherStyles(data);
	var styleManager = new StyleManager(data);
	return styleManager;
}

