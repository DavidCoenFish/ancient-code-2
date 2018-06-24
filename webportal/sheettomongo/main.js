const Q = require('q');
const Config = require("./../webportal/modules/config");
const DataServer = require("./modules/dataserver.js")(Config.spreadsheet.key);
const SheetToObject = require("./modules/sheettoobject.js");
const DatabaseUtil = require("./modules/databaseutil.js");
const FileSystem = require('fs');

/*
https://sheets.googleapis.com/v4/spreadsheets/1kz9PfO113TZ-C0nYTxfIA9z-HptAfpquVfa3UQh31EY/values/table_of_contents?majorDimension=COLUMNS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I
Q().then(function(){
	return SheetToObject(DataServer, "1kz9PfO113TZ-C0nYTxfIA9z-HptAfpquVfa3UQh31EY", "table_of_contents");
}).then(function(input){
	//todo. save to file input as backup?
	console.log(JSON.stringify(input));
	return input;
}).done(function(){
	console.log("done");
	process.exit(0); //success
	return 0;
}, function(err){
	console.log("done err:" + err);
	process.exit(1); //error
	return 0;
});
*/


// Config.mongo.url
Q().then(function(){
	return SheetToObject(DataServer, Config.spreadsheet.id, Config.spreadsheet.name);
}).then(function(input){
	//todo. save to file input as backup?
	//console.log(JSON.stringify(input));
	FileSystem.writeFile("./notes/database.json", JSON.stringify(input), function(err){ if (err) { return console.log(err); } });
	return input;
}).then(function(input){
	return DatabaseUtil.ObjectToMongoDB(Config.mongo.url, input);
}).done(function(){
	console.log("done");
	process.exit(0); //success
	return 0;
}, function(err){
	console.log("done err:" + err);
	process.exit(1); //error
	return 0;
});
