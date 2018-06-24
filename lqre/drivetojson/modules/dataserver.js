const Q = require('q');
const GoogleHelper = require("./googlehelper.js");

const TypeEnum = Object.freeze({
	"unknown":0,
	"folder":1, //"mimeType": "application/vnd.google-apps.folder"
	"spreadsheet":2 //"mimeType": "application/vnd.google-apps.spreadsheet"
	//"array_auto":2 //nope, wont work, data design is reentrant
});

const DataServer = function() {}

module.exports = function(){
	var dataServer = new DataServer();
	return dataServer;
}

const getType = function(in_mimeType){
	//var mimeType = in_metaData.mimeType;
	if (in_mimeType === "application/vnd.google-apps.folder"){
		return TypeEnum.folder;
	}
	if (in_mimeType === "application/vnd.google-apps.spreadsheet"){
		return TypeEnum.spreadsheet;
	}
	return TypeEnum.unknown;
}

/*
returns promise
resolve null if not found
resolve object {
	"name" : name,
	"id" : id,
	"type" : type,
	"mimeType" : mimeType
}
*/
DataServer.prototype.getFolderMetaDataByName = function(in_name) {
	return GoogleHelper.getFolderMetaDataByName(in_name).then(function(input){
		if (input != null){
			input.type = getType(input.mimeType);
		}
		return input;
	});
};

/*
returns promise
resolve null if not found
resolve object {
	"name" : name,
	"id" : id,
	"type" : type,
	"mimeType" : mimeType
}
*/
DataServer.prototype.getMetaDataByID = function(in_id){
	return GoogleHelper.getMetaData(in_id).then(function(input){
		if (input != null){
			input.type = getType(input.mimeType);
		}
		return input;
	});
};

DataServer.prototype.getFolderChildrenMetaDataArray = function(in_id){
	return GoogleHelper.getChildrenOfFolder(in_id).then(function(input){
		for (var index = 0, length = input.length; index < length; index++) {
			var item = input[index];
			if (item != null){
				item.type = getType(item.mimeType);
			}
		}
		return input;
	});
};

DataServer.prototype.getSpreadsheetWorksheetData = function(in_id, in_worksheetName){
	return GoogleHelper.getSpreadsheetWorksheet(in_id, in_worksheetName);
};

DataServer.prototype.TypeEnum = TypeEnum;
