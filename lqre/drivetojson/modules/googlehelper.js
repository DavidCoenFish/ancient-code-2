const Q = require('q');
const Config = require("./config.js");
const RequestWithJWT = require("google-oauth-jwt").requestWithJWT();

module.exports.getFolderMetaDataByName = function(in_folderName){
	var deferred = Q.defer();
	var name = encodeURI(in_folderName, "UTF-8");
	RequestWithJWT({
		url: "https://www.googleapis.com/drive/v3/files?q=mimeType%3D'application%2Fvnd.google-apps.folder'+and+name%3D'" + name + "'&fields=files(id%2CmimeType%2Cname)",
		jwt: {
			email: '27285370587-compute@developer.gserviceaccount.com',
			keyFile: './data/key.pem',
			scopes: ['https://www.googleapis.com/auth/drive.readonly']
		}
	}, function (error, response, body) {
		if (error != null){
			deferred.reject("problem finding ID of folder:" + in_folderName + " error:" +  error);
			return;
		}
		if (200 != response.statusCode){
			deferred.reject("problem finding ID of folder:" + in_folderName + " statusCode:" +  response.statusCode);
			return;
		}
		try {
			var data = JSON.parse(body);
			if (data.files.length <= 0){
				deferred.resolve(null);
			}
			deferred.resolve(data.files[0]);
		} catch(err) {
			deferred.reject("problem finding ID of folder:" + in_folderName + " error:" +  err.message);
		}
	});

	return deferred.promise;
}

const getMetaData = function(in_id){
	var deferred = Q.defer();
	RequestWithJWT({
		url: "https://www.googleapis.com/drive/v3/files/" + in_id + "?fields=id%2CmimeType%2Cname",

		jwt: {
			email: '27285370587-compute@developer.gserviceaccount.com',
			keyFile: './data/key.pem',
			scopes: ['https://www.googleapis.com/auth/drive.readonly']
		}
	}, function (error, response, body) {
		if (error != null){
			deferred.reject("problem finding metadata for file:" + in_id + " error:" +  error);
			return;
		}
		if (200 != response.statusCode){
			deferred.reject("problem finding metadata for file:" + in_id + " statusCode:" +  response.statusCode);
			return;
		}
		try {
			var data = JSON.parse(body);
			deferred.resolve(data);
		} catch(err) {
			deferred.reject("problem finding metadata for file:" + in_id + " error:" +  err.message);
		}
	});

	return deferred.promise;
}
module.exports.getMetaData = getMetaData;

module.exports.getChildrenOfFolder = function(in_folderID){
	var deferred = Q.defer();
	RequestWithJWT({
		url: "https://www.googleapis.com/drive/v3/files?q='" + in_folderID + "'+in+parents&fields=files%2Fid",
		jwt: {
			email: '27285370587-compute@developer.gserviceaccount.com',
			keyFile: './data/key.pem',
			scopes: ['https://www.googleapis.com/auth/drive.readonly']
		}
	}, function (error, response, body) {
		if (error != null){
			deferred.reject("problem finding children of folder:" + in_folderID + " error:" +  error);
			return;
		}
		if (200 != response.statusCode){
			deferred.reject("problem finding children of folder:" + in_folderID + " statusCode:" +  response.statusCode);
			return;
		}
		//console.log("getChildrenOfFolder:" + body);
		var data = JSON.parse(body);
		try {
			var arrayPromice = [];
			for (var index = 0; index < data.files.length; ++index){
				arrayPromice.push(getMetaData(data.files[index].id));
			}

			Q.allSettled(arrayPromice).then(function(input){ 
				var result = [];
				input.forEach(function (item) {
					if (item.state !== "fulfilled") {
						console.log(item.reason);
					} else {
						result.push(item.value);
					}
				});
				return result; 
			}).then(function(input){
				//console.log("polo input:" + JSON.stringify(input));
				deferred.resolve(input);
			}).done();
		} catch(err) {
			deferred.reject("problem finding children of folder:" + in_folderID + " error:" +  err.message);
		}
	});

	return deferred.promise;
}

/*
https://developers.google.com/apis-explorer/#p/sheets/v4/sheets.spreadsheets.values.get?spreadsheetId=1WX1-l_9jh3JddGzRuxUSC_zU0NirbyJk-tJyugbJagI&range=character_rules&fields=values&_h=2&
*/
module.exports.getSpreadsheetWorksheet = function(in_spreadsheetID, in_worksheetName){
	console.log("getSpreadsheetWorksheet spreadsheet:" + in_spreadsheetID + " worksheet:" + in_worksheetName);

	var deferred = Q.defer();
	var name = encodeURI(in_worksheetName, "UTF-8");
	RequestWithJWT({
		//url: "https://sheets.googleapis.com/v4/spreadsheets/" + in_spreadsheetID + "?includeGridData=true&ranges=" + name + "&fields=sheets(data%2FrowData%2Fvalues%2FeffectiveValue)",
		url: "https://sheets.googleapis.com/v4/spreadsheets/" + in_spreadsheetID + "/values/" + name + "?fields=values",
		jwt: {
			email: '27285370587-compute@developer.gserviceaccount.com',
			keyFile: './data/key.pem',
			scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
		}
	}, function (error, response, body) {
		if (error != null){
			deferred.reject("problem finding SpreadsheetWorksheet:" + in_spreadsheetID + " worksheetName:" + in_worksheetName + " error:" +  error);
			return;
		}
		if (200 != response.statusCode){
			deferred.reject("problem finding SpreadsheetWorksheet:" + in_spreadsheetID + " worksheetName:" + in_worksheetName + " statusCode:" +  response.statusCode);
			return;
		}
		//console.log(body);
		var data = JSON.parse(body);
		try {
			deferred.resolve(data.values);
		} catch(err) {
			deferred.reject("problem getting spreadsheet:" + in_spreadsheetID + " worksheet:" + in_worksheetName + " error:" +  err.message);
		}

	});

	return deferred.promise;
}
