const FileSystem = require("fs");
const Path = require("path");

/*
move to common? or keep one modulee, one function?
*/

const WalkSyncRecursive = function (currentDirPath, callback) {
	FileSystem.readdirSync(currentDirPath).forEach(function (name) {
		var filePath = Path.join(currentDirPath, name);
		var stat = FileSystem.statSync(filePath);
		if (stat.isFile()) {
			callback(filePath, stat);
		} else if (stat.isDirectory()) {
			WalkSyncRecursive(filePath, callback);
		}
	});
}
module.exports.WalkSyncRecursive = WalkSyncRecursive;

module.exports.WalkSync = function (currentDirPath, callback) {
	FileSystem.readdirSync(currentDirPath).forEach(function (name) {
		var filePath = Path.join(currentDirPath, name);
		var stat = FileSystem.statSync(filePath);
		if (stat.isFile()) {
			callback(filePath, stat);
		}
	});
}
module.exports.DirSync = function (currentDirPath, callback) {
	FileSystem.readdirSync(currentDirPath).forEach(function (name) {
		var filePath = Path.join(currentDirPath, name);
		var stat = FileSystem.statSync(filePath);
		if (stat.isDirectory()) {
			callback(filePath, stat);
		}
	});
}

module.exports.GetMethods = function(obj) {
	var result = [];
	for (var id in obj) {
		try {
			if (typeof(obj[id]) == "function") {
			result.push(id);
			}
		} catch (err) {
			//nop
		}
	}
	return result;
}
