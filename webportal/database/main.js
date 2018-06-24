const requestify = require("requestify");
const Q = require('q');
const config = require("./../webportal/modules/config");

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
const url = config.mongo.url;

//var url = 'mongodb://localhost:27017/webportal';

//const db = connect("localhost:27017/webportal");

//https://sheets.googleapis.com
//  /v4/spreadsheets/{spreadsheetId} 
//https://docs.google.com/spreadsheets/d/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/edit#gid=632140652

//https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg?key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I

//https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/values/localisationSet?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I


//https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/values/localisationSet?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I
//https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/values/localisationData?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I

var DropSheet = function(sheetName)
{
	var deferred = Q.defer();
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		db.collection(sheetName).drop( function(err, response) {
			console.log("drop sheet:" + sheetName + " " + response)
			db.close();

			deferred.resolve();
		});
	});
	return deferred.promise;
}

var InsertData = function(sheetName, arrayData)
{
	var deferred = Q.defer();
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		db.collection(sheetName).insertMany(arrayData)
		.then(function(response) {
			console.log("Insert Data:" + sheetName + " " + response)
			db.close();
			deferred.resolve();
		});
	});
	return deferred.promise;
}

var DealSheet = function(sheetName)
{
	var deferred = Q.defer();

	var request = "https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/values/" + sheetName + "?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I";
	console.log(request);
	requestify.get(request)
	.then(function(response) {
		//console.log(response.getCode());
		var result = JSON.parse(response.body);
		return result;
	})
	.then(function(response) {
		var values = response.values;
		var firstItem = null;
		var results = [];
		for (var key in values)
		{
			var item = values[key];
			if (firstItem == null)
			{
				firstItem = item;
			}
			else
			{
				var resutlObject = {};
				var firstSubItem = true;
				var add = false;
				for (var subKey in firstItem)
				{
					var data = item[subKey];
					if (firstSubItem == true)
					{
						firstSubItem = false;
						if (data === "")
						{
							break;
						}
					}
					add = true;
					resutlObject[firstItem[subKey]] = data;
				}
				if (add === true)
				{
					results.push(resutlObject);
				}
			}
		}
		return results;
	})
	.then(function(arrayData) {
		//console.log(response);

		//db[sheetName].drop();
		//db[sheetName].localisationSet.insert(response);

		return DropSheet(sheetName)
		.then(function(response) {
			return InsertData(sheetName, arrayData);
		})
		.then(function(response) {
			deferred.resolve();
		});
	});

	return deferred.promise;
}

requestify.get("https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg?key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I")
.then(function(response) {
	console.log(response.getCode());
	var result = JSON.parse(response.body);
	return result;
})
.then(function(response) {
	console.log("json");
	var arrayPromice = [];
	if ("sheets" in response) {
		for(var key in response.sheets) {
			var item = response.sheets[key];
			console.log("a");
			console.log(item.properties.title);
			arrayPromice.push(DealSheet(item.properties.title));
		}
	}
	return Q.all(arrayPromice);
})
.then(function(response) {
	console.log("done");
})
.fail(function(response) {
	console.log("fail");
});

