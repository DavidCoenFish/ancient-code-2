//https://github.com/ranm8/requestify
const Requestify = require("requestify");
const Config = require("./../../webportal/modules/config.js");
const Test = require("./../modules/Test.js");
const Q = require('q');

const url = "http://localhost:" + Config.server.port;

const GetPage = function(promiseArray, path){
	var promise = Requestify.get(url + path)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetPage:" + path, response.getCode(), 200, 300);
		Test.DealTestNot("GetPage Body null:" + path, response.body, null);
		Test.DealTestNot("GetPage Body empty:" + path, response.body, "");
		//throw "fail on throw in response";
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

const GetPageHead = function(promiseArray, path){
	var promise = Requestify.head(url + path)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetPageHead:" + path, response.getCode(), 200, 300);
		Test.DealTest("GetPageHead Body empty:" + path, response.body, "");
		//throw "fail on throw in response";
	},function(error){
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetPageHead errno:" + path + " " + error.errno);
			}
			Test.DealTestRange("GetPageHead:" + path, error.getCode(), 200, 300);
		}
		Test.DealTestFail("GetPageHead error:" + path + " " + error);
	});

	promiseArray.push(promise);
	return;
}


const GetPageExpectRedirect = function(promiseArray, path){
	var promise = Requestify.get(url + path)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetPageExpectRedirect:" + path, response.getCode(), 300, 400);
	},function(error){
		//throw "fail on throw in error";
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetPageExpectRedirect errno:" + path + " " + error.errno);
			}

			Test.DealTestRange("GetPageExpectRedirect:" + path, error.getCode(), 300, 400);
		}
		else {
			Test.DealTestFail("GetPageExpectRedirect arror:" + path + " " + error);
		}
	});
	promiseArray.push(promise);
	return;
}

const GetStaticFile = function(promiseArray, path){
	var promise = Requestify.get(url + path)
	.then(function(response) {
		//console.log("response 1:" + JSON.stringify(response));
		Test.DealTestRange("GetStaticFile code:" + path, response.getCode(), 200, 300);
		Test.DealTestNot("GetStaticFile Body null:" + path, response.body, null);
		Test.DealTestNot("GetStaticFile Body empty:" + path, response.body, "");
	},function(error){
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetStaticFile errno:" + path + " " + error.errno);
			}
			Test.DealTestRange("GetStaticFile code:" + path, error.getCode(), 200, 300);
		}
		else {
			Test.DealTestFail("GetStaticFileB error" + path + " " + error);
		}
	});
	promiseArray.push(promise);
	return;
}

const GetPageNotFound = function(promiseArray, path){
	var promise = Requestify.get(url + path)
	.then(function(response) {
		Test.DealTest("GetPageNotFound:" + path, response.getCode(), 404);
	},function(error){
		//console.log("response error 0:" + JSON.stringify(error) + " " + (typeof error));
		if ("object" === (typeof error)){
			if ("errno" in error){
				Test.DealTestFail("GetPageNotFound errno:" + path + " " + error.errno);
			}
			Test.DealTest("GetPageNotFound code:" + path, error.getCode(), 404);
		}
		else {
			Test.DealTestFail("GetPageNotFound error:" + path + " " + error);
		}
	});
	promiseArray.push(promise);
	return;
}

module.exports = function(promiseArray){
	GetPage(promiseArray, "/index");
	GetPageHead(promiseArray, "/index");
	GetPageExpectRedirect(promiseArray, "");
	GetStaticFile(promiseArray, "/favicon.ico");
	GetPageNotFound(promiseArray, "/index2");
}

