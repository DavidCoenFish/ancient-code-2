const SheetToObject = require("./../modules/sheettoobject.js");
const DataServerMock = require("./../modules/dataserver_mock.js");
const Test = require("./../modules/test.js");

module.exports = function(promiseArray) {
	RunEmpty(promiseArray);
	RunSimple(promiseArray);
	Run(promiseArray);
	RunArray(promiseArray);
	RunMaxAttribute(promiseArray);

	return;
}

const RunEmpty = function(promiseArray) {
	const mockData = {
		"sheetId0:Name0" : [
		],
	};
	const dataServer = DataServerMock(mockData);
	var promise = SheetToObject(dataServer, "sheetId0", "Name0").then(function(input){
		var expected = JSON.stringify({});
		var value = JSON.stringify(input);
		if (expected !== value){
			throw module.exports.name + ":RunEmpty: Did not get expected value 0:" + value + " expected:" + expected;
		}
	});

	promiseArray.push(promise);
}

const RunSimple = function(promiseArray) {
	const mockData = {
		"sheetId0:Name0" : [
			[
				"ignore:",
				"spread_sheet_id",
				"sheet_name"
			],
			[
				"number:value",
				"10.3"
			],
			[
				"valueStringA",
				"fooA"
			],
			[
				"string:valueStringB",
				"fooB"
			],
			[
				"null:valueNull"
			],
			[
				"boolean:valueBooleanTrueA",
				"TRUE"
			],
			[
				"boolean:valueBooleanTrueB",
				"true"
			],
			[
				"boolean:valueBooleanFalseA",
				"FALSE"
			],
			[
				"boolean:valueBooleanFalseB",
				"false"
			],
			
		]
	};
	const dataServer = DataServerMock(mockData);
	var promise = SheetToObject(dataServer, "sheetId0", "Name0").then(function(input){
		var expected = JSON.stringify({
			"value" : 10.3, 
			"valueStringA" : "fooA", 
			"valueStringB" : "fooB", 
			"valueNull" : null,
			"valueBooleanTrueA" : true,
			"valueBooleanTrueB" : true,
			"valueBooleanFalseA" : false,
			"valueBooleanFalseB" : false,
		});

		var value = JSON.stringify(input);
		Test.DealTest("RunSimple", value, expected);
	});

	promiseArray.push(promise);
}

const Run = function(promiseArray) {
	const mockData = {
		"sheetId0:Name0" : [
			["sheet1st:test0", "sheetId1", "Name0"],
			["sheet5th:", "sheetId2", "Name1"],
		],
		"sheetId1:Name0" : [
			["_id", "value", "sheet5th:", "ignore:", "value2"],
			["", "skip"],
			["key0", "foo"],
			["key1", "bar", "sheetId3", "Name3", "moo"],
		],
		"sheetId2:Name1" : [
			[ "number:value4", 4.7 ]
		],
		"sheetId3:Name3" : [
			[ "value3", "yo" ]
		],
	};
	const dataServer = DataServerMock(mockData);
	var promise = SheetToObject(dataServer, "sheetId0", "Name0").then(function(input){
		var expected = JSON.stringify({
			"value4":4.7,
			"test0":[
				{"_id":"key0","value":"foo"},
				{"_id":"key1","value":"bar", "value2":"moo", "value3":"yo"}
			]
		});

		var value = JSON.stringify(input);
		Test.DealTest("Run", value, expected);
	});

	promiseArray.push(promise);
}

const RunArray = function(promiseArray) {
	const mockData = {
		"sheetId0:Name0" : [
			["foo:array:number:0", "1"],
			["foo:array:1:number", "1.5"],
			["foo:array:2:number", "2"],
			["bar:array:0", "1"], //if no type, we guess
			["bar:array:1", "1.5"],
			["bar:array:2", "abba"],
			["bar:array:3:string", "3"],
			["empty_array:empty"],
			["matrix:array:0:array:0:number", "1"],
			["matrix:array:0:array:1:number", "2"],
			["matrix:array:1:array:0:number", "3"],
			["matrix:array:1:array:1:number", "4"],
		],
	};
	const dataServer = DataServerMock(mockData);
	var promise = SheetToObject(dataServer, "sheetId0", "Name0").then(function(input){
		var expected = JSON.stringify({
			"foo" : [1, 1.5, 2],
			"bar" : [1, 1.5, "abba", "3"],
			"empty" : [],
			"matrix" : [[1,2],[3,4]]
		});
		var value = JSON.stringify(input);
		Test.DealTest("RunArray", value, expected);
	});

	promiseArray.push(promise);
	return;
}

const RunMaxAttribute = function(promiseArray) {
	const mockData = {
		"sheetId0:toc" : [
				["sheet1st:max_attribute", "sheetId0", "MaxAttribute"],
			],
		"sheetId0:MaxAttribute" : [
			[
				"_id", "ignore:race", "ignore:gender", "number:physical_strength", "number:stamina", "number:agility", "number:manual_dexterity", "number:perception", "number:willpower", "number:faith", "ignore:sum"
			],
			[
				"human.male", "human", "male", "3", "3", "3", "3", "3", "3", "3", "21"
			],
			[
				"human.female", "human", "female", "2", "3", "4", "3", "3", "3", "3", "21"
			]
		]
	};

	const dataServer = DataServerMock(mockData);
	var promise = SheetToObject(dataServer, "sheetId0", "toc").then(function(input){
		//console.log(JSON.stringify(input));

		Test.DealTest("RunMaxAttribute", input.max_attribute[1].physical_strength, 2);

		return true;
	});

	promiseArray.push(promise);
	return;
}