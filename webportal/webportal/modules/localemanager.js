/*
we expect certain page request to include a url query specifying the translation locale
&t=en
if this is not present, redirect to a certain page

*/

const Q = require("q");

const LocaleManager = function(database)
{
	this.m_database = database;
	this.m_data = {};
	return;
}

LocaleManager.prototype.AddLocale = function(key, value)
{
	this.m_data[key] = value;
}

LocaleManager.prototype.HasLocale = function(key)
{
	return (key in this.m_data);
}

LocaleManager.prototype.GetLocaleMap = function()
{
	return this.m_data;
}

const Format = function(string, placeholders) 
{
	if (undefined !== placeholders)
	{
		for (var propertyName in placeholders) 
		{
			var re = new RegExp(propertyName, 'gm');
			string = string.replace(re, placeholders[propertyName]);
		}
	}
	return string;
}

/* return the promice of a translated string*/
LocaleManager.prototype.GetFormatedString = function(locale, key, placeholders) {
	//console.log("GetFormatedString0");
	try {
		var fields = {};
		fields[locale] = 1;
		return this.m_database.getPromiceDocumentByIDFields("localisation", key, fields)
			.then(function(document){
				if (null == document)
				{
					return key; //key not found?
				}
				var string = document[locale];
				string = Format(string, placeholders);
				return string;
			},function(err){
				console.log("promice fail:" + err);
				return key;
			});
	} catch(err) {
		console.log("catch:" + err);
		return Q(key);
	}
}

module.exports = function(database)
{
	var localeManager = new LocaleManager(database);

	var promice = database.getPromiceCollection("locale").then(function(result) {
		result.forEach(function(item){
			//console.log("LocaleManager:" + item + " " + item._id + " " + item.name);
			localeManager.AddLocale(item._id, {"name": item.name});
		});
		return;
	}).catch(function(err){
		console.log("catch:" + err);
	});

	return localeManager;
}

