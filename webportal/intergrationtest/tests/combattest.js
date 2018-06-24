//https://github.com/ranm8/requestify
const Requestify = require("requestify");
const Config = require("./../../webportal/modules/config.js");
const Test = require("./../modules/Test.js");
const Q = require('q');

const url = "http://localhost:" + Config.server.port;

const GetOptions = function(promiseArray, path){
	var options = {
		"method" : "OPTIONS"
	};
	var promise = Requestify.request(url + path, options)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetOptions:" + path, response.getCode(), 200, 300);
		var allow = response.getHeader("allow");
		Test.DealTestNot("GetOptions allow:" + path, allow, null);
	},function(error){
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetPage errno:" + path + " " + error.errno);
			}
			Test.DealTestRange("GetPage:" + path, error.getCode(), 200, 300);
		}
		Test.DealTestFail("GetPage error:" + path + " " + error);
	});

	promiseArray.push(promise);
	return;
}

const GetMeta = function(promiseArray, path){
	var options = {
		"method" : "GET"
	};
	var promise = Requestify.request(url + path + ".meta", options)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetMeta:" + path, response.getCode(), 200, 300);
		Test.DealTestNot("GetMeta Body null:" + path, response.body, null);
		Test.DealTestNot("GetMeta Body empty:" + path, response.body, "");
	},function(error){
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetMeta errno:" + path + " " + error.errno);
			}
			Test.DealTestRange("GetMeta:" + path, error.getCode(), 200, 300);
		}
		Test.DealTestFail("GetMeta error:" + path + " " + error);
	});

	promiseArray.push(promise);
	return;
}

const CrudCharacter = function(promiseArray){
	var optionsPost = {
		"method" : "POST",
		"body" : {
			"type" : "character",
			"data" : { 
				"name" : "foo",
				"experence" : 10
			},
			"game_id" : "default"
		}
	};
	var promise = Requestify.request(url + "/combattest/character", optionsPost)
	.then(function(postResponse) {
		//console.log(Object.getOwnPropertyNames(postResponse));
		//console.log("CrudGame:response:" + JSON.stringify(response));
		Test.DealTestRange("CrudCharacter post statusCode:", postResponse.getCode(), 200, 300);
		//i want the _id of the created game, going to use it
		var location = postResponse.headers.location;
		// /combattest/character.57fcc5db5307bf13e09bd4ab.
		//console.log("location:" + location);
		return location;
	}).then(function(location){
		var optionsPut = {
			"method" : "PUT",
			"body" : {
				"data" : { 
					"experence" : 20
				}
			}
		};
		return Requestify.request(url + location, optionsPut).then(function(putResult){
			//console.log("CrudGame:putResult:" + JSON.stringify(putResult));
			Test.DealTestRange("CrudCharacter put statusCode:", putResult.getCode(), 200, 300);
			var optionsGet = {"method" : "GET"};
			return Requestify.request(url + location, optionsGet).then(function(getResult){
					//console.log("CrudGame:getResultA:" + JSON.stringify(getResult));
					Test.DealTestRange("CrudCharacterA statusCode:", getResult.getCode(), 200, 300);
					var optionsDelete = {"method" : "DELETE"};
					return Requestify.request(url + location, optionsDelete).then(function(deleteResult){
							Test.DealTestRange("CrudCharacterB statusCode:", deleteResult.getCode(), 200, 300);
							var optionsGet = {"method" : "GET"};
							return Requestify.request(url + location, optionsGet).then(function(getResult){
								//console.log("CrudGame:getResultC:" + JSON.stringify(getResult));
								Test.DealTestRange("get deleted character statusCode:", getResult.getCode(), 400, 499);
								return true;
							},function(errorResult){
								//console.log("error:" + JSON.stringify(errorResult));
								Test.DealTestRange("get deleted character statusCode:", errorResult.getCode(), 400, 499);
								return true;
							});
						});
				});
				
		});
	});

	promiseArray.push(promise);
	return;
}

module.exports = function(promiseArray){
	GetOptions(promiseArray, "/combattest/character");
	GetMeta(promiseArray, "/combattest/character");
	CrudCharacter(promiseArray);
}

