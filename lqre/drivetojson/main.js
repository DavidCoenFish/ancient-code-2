const Q = require('q');
const Cursor = require("./modules/cursor.js");
const Util = require("./modules/util.js");
const DriveToObject = require("./modules/drivetoobject.js");
const DataServer = require("./modules/dataserver.js");

const dirName = process.argv[2];
console.log("Drive to json dirName:" + dirName);

const dataServer = DataServer();
var baseObject = {};
var cursor = Cursor();

//Q(true).then(function (input) {
DriveToObject.driveToObject(dataServer, dirName, cursor, baseObject).then(function (input) {
	//console.log("input:" + JSON.stringify(baseObject));
	var data = "const staticData = " + JSON.stringify(baseObject);
	return data;
}).then(function (data) {
	return Util.writeFilePromise("./../gameengine/data/data.js", data).then(function (input) {
		return data;
	});
}).then(function (data){
	return Util.writeFilePromise("./../app/public/js/data.js", data).then(function (input) {
		return data;
	});
}).done(function () {
	console.log("done");
	process.exit(0); //success
	return 0;
}, function(err){
	console.log("done err:" + err);
	process.exit(1); //error
	return 0;
});
