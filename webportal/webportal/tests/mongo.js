const Q = require('q');
const Database = require("./../modules/mongo.js");
const Mongo = Database();
const Test = require("./../modules/test.js");

module.exports.name = "sling";

module.exports = function(promiseArray) {
	if (promiseArray === undefined){
		console.log("tests.mongo promiseArray === undefined");
		return;
	}

	RunTest(promiseArray);
	RunTest2(promiseArray);
	RunTest3(promiseArray);
	RunTest4(promiseArray);
	RunTestGetDocumentNotFound(promiseArray);

	return;
}

const RunTest = function(promiseArray) {
	promiseArray.push(Mongo.insertDocumentReturnID("test", {"a" : "world"})
		.then(function(input){
			Test.DealTestNot("insert document A", input, ""); 
			Test.DealTestNot("insert document A", input, null); 
			Test.DealTestNot("insert document A", input, undefined); 
			return input;
		}).then(function(id){
			return Mongo.getPromiceDocumentByID("test", id);
		}).then(function(document){
			Test.DealTestNot("getPromiceDocumentByID A", document, null); 
			Test.DealTest("getPromiceDocumentByID A member", "world", document.a); 
			//console.log("document:" + JSON.stringify(document));
			return document._id;
		}).then(function(id){
			return Mongo.deletePromiceDocumentByID("test", id)
			.then(function(input){
				return id;
			});
		}).then(function(id){
			return Mongo.getPromiceDocumentByID("test", id);
		}).then(function(document){
			Test.DealTest("getPromiceDocumentByID B", document, null); 
			//console.log("confirm end test change Mongo:runTest:" + document );
			return true;
	}));

	return;
}

const RunTest2 = function(promiseArray) {
	promiseArray.push(Mongo.deletePromiceDocument("test2")
		.then(function(input){
			return Mongo.insertDocumentReturnID("test2", {"_id" : 0, "b" : "hello"});
		}).then(function(input){
			return Mongo.insertDocumentReturnID("test2", {"_id" : 1, "b" : "goodbye"});
		}).then(function(input){
			return Mongo.getPromiceCollection("test2");
		}).then(function(input){
			//console.log("document:" + JSON.stringify(input));
			var result = JSON.stringify(input);
			var expected = JSON.stringify([{"_id" : 0, "b":"hello"}, {"_id" : 1, "b" : "goodbye"}]);
			Test.DealTest("getPromiceCollection", result, expected); 
			return true;
		}).then(function(input){
			return Mongo.deletePromiceDocument("test2");
		}).then(function(input){
			//console.log("confirm end test change Mongo:runTest2:" + input );
			return true;
	}));
}

//Mongo.prototype.updateDocumentByID = function(collectionName, id, documentPatch)
const RunTest3 = function(promiseArray) {
	promiseArray.push(Mongo.deletePromiceDocument("test3")
	.then(function(input){
		return Mongo.insertDocumentReturnID("test3", 
			{
				"_id" : 5, 
				"a" : "hello", 
				"b" : "world",
				"c" : {
					"d" : 0,
					"e" : 1,
				}
			});
	}).then(function(input){
		return Mongo.updateDocumentByID("test3", 5,
			{
				"b" : "mars",
				"c" : {
					"e" : 2
				}
			});
	}).then(function(input){
		return Mongo.getPromiceDocumentByID("test3", 5);
	}).then(function(input){
		//console.log("document3:" + JSON.stringify(input));
		var result = JSON.stringify(input);
		var expected = JSON.stringify(
			{
				"_id" : 5, 
				"a" : "hello", 
				"b" : "mars",
				"c" : {
					"d" : 0,
					"e" : 2
				}
			});
		Test.DealTest("RunTest3", result, expected); 
		return true;
	}));
}

//Mongo.prototype.updateDocumentByIDWriteLock = function(collectionName, id, writeLock, documentPatch)
const RunTest4 = function(promiseArray) {
	var keyWriteLock = Database.sWriteLockKey;
	var id = "foo";
	var document = { "data" : 4, "_id" : id};
	document[Database.sWriteLockKey] = 10;
	promiseArray.push(Mongo.deletePromiceDocument("test4")
	.then(function(input){
		return Mongo.insertDocumentReturnID("test4", document);
	}).then(function(id){
		Test.DealTest("getPromiceCollection", id, "foo"); 
		return Mongo.updateDocumentByIDWriteLock("test4", id, 11,
			{
				"data" : 5
			});	
	}).then(function(input){
		Test.DealTest("getPromiceCollection", input, false); 
		return true;
	}).then(function(input){
		return Mongo.getPromiceDocumentByID("test4", id);
	}).then(function(input){
		//console.log("document4:" + JSON.stringify(input));
		var result = JSON.stringify(input);
		var expected = JSON.stringify({"_id":"foo","data":4,"_write_lock":10});
		Test.DealTest("RunTest4", result, expected); 
		return true;
	}).then(function(input){
		return Mongo.updateDocumentByIDWriteLock("test4", id, 10,
			{
				"data" : 6
			});
	}).then(function(input){
		Test.DealTest("getPromiceCollection y:", input, true); 
		return true;
	}).then(function(input){
		return Mongo.getPromiceDocumentByID("test4", id);
	}).then(function(input){
		//console.log("document4 z:" + JSON.stringify(input));
		var result = JSON.stringify(input);
		var expected = JSON.stringify({"_id":"foo","data":6,"_write_lock":11});
		Test.DealTest("RunTest4", result, expected); 
		return true;
	}));

}

const RunTestGetDocumentNotFound = function(promiseArray) {
	promiseArray.push(Mongo.getPromiceDocumentByID("testGetDocumentNotFound", "foo")
	.then(function(input){
		//console.log("testGetDocumentNotFound input:" + JSON.stringify(input));
		Test.DealTest("RunTestGetDocumentNotFound", input, null); 
		return true;
	}));
}


//Mongo.sWriteLockKey