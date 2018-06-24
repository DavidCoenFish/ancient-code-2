const Requestify = require("requestify");
const Q = require('q');

const DataServer = function(apiKey) {
	this.m_apiKey = apiKey;
}

/*
https://sheets.googleapis.com/v4/spreadsheets/1kz9PfO113TZ-C0nYTxfIA9z-HptAfpquVfa3UQh31EY/values/monster_rules?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I
https://sheets.googleapis.com/v4/spreadsheets/1SaIO66R9qPoMUqq8C-PDZ-vMbLdrqfQH7dlKiuJQYNg/values/localisation_data?majorDimension=COLUMNS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I


https://sheets.googleapis.com/v4/spreadsheets/1kz9PfO113TZ-C0nYTxfIA9z-HptAfpquVfa3UQh31EY/values/table_of_contents?majorDimension=COLUMNS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I

https://docs.google.com/spreadsheets/d/1kz9PfO113TZ-C0nYTxfIA9z-HptAfpquVfa3UQh31EY/edit#gid=0


*/

DataServer.prototype.GetSheetPromice = function(spreadsheetID, sheetName) {
	var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + sheetName + "?majorDimension=ROWS&key=" + this.m_apiKey;
	return Requestify.get(url).then(function(input){
		//console.log("GetSheetPromice:spreadsheetID:" + spreadsheetID + " sheetName:" + sheetName + " " + input.body);
		var result = JSON.parse(input.body);
		return result.values;
	});
}

module.exports = function(apiKey){
	var dataServer = new DataServer(apiKey);
	return dataServer;
}
