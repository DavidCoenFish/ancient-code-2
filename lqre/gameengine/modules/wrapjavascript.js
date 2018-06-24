var VirtualMachine = require("vm");
var FileSystem = require("fs");

module.exports = function(path, context) {
	var data = FileSystem.readFileSync(path);
	VirtualMachine.runInNewContext(data, context, path);
	return context;
}