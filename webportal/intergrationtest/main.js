const Q = require('q');
const Path = require("path");
const FileSystem = require("fs");


const WalkSync = function (currentDirPath, callback) {
	FileSystem.readdirSync(currentDirPath).forEach(function (name) {
		var filePath = Path.join(currentDirPath, name);
		var stat = FileSystem.statSync(filePath);
		if (stat.isFile()) {
			callback(filePath, stat, name);
		}
	});
}

const GatherIntergrationPromises = function(promiseArray) {
	const modulesPath = Path.join(__dirname, "/tests/");
	//console.log("modulesPath:" + modulesPath);
	WalkSync(modulesPath, function(filePath, stat, name){
		var modulePath = "./" + Path.relative(__dirname, filePath).replace(/\\/g, "/");
		console.log("module:" + name);
		try{
			require(modulePath)(promiseArray);
		}catch (err){
			console.log("modulePath:" + modulePath + " threw:" + err);
		}
	});
	return;
}

var promiseArray = [];
GatherIntergrationPromises(promiseArray);
//require("./tests/combattest.js")(promiseArray);
//require("./tests/sanity.js")(promiseArray);

console.log("main promiseArray.length:" + promiseArray.length);

Q.allSettled(promiseArray).then(function(input){
	//console.log("main allSettled:" + JSON.stringify(input));
	var exitCode = 0;
	var passCount = 0;
	for(var index = 0; index < input.length; ++index){
		var item = input[index];
		if (item.state === "rejected"){
			exitCode = 1; //error
			console.log("FAILED:" + JSON.stringify(item.reason));
		} else if (item.state === "fulfilled"){
			passCount += 1;
		}
	}
	if (0 == exitCode){
		console.log("PASSED ALL:" + input.length);
	} else {
		console.log("PASSED " + passCount + "/" + input.length);
	}

	//throw "fail on throw in main";

	return exitCode;
},function(error){
	console.log("main errorA:" + error);
	process.exit(1); //error
}).fail(function(error){
	console.log("main errorB:" + error);
	process.exit(1); //error
}).done(function(input){
	console.log("main done:" + input);
	process.exit(input);
});


	