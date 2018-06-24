const Q = require("q");
const Cursor = require("./cursor.js");

const ActionEnum = Object.freeze({
	"ignore":0,
	"int":1,
	"float":2,
	"bool":3,
	"string":4,
	"sheet3rd":5,
	"sheet5th":6,
	//"array_auto":2 //nope, wont work, data design is reentrant
});

const dealKey = function (in_key, in_cursor, in_baseObject, in_sheetId, in_worksheetName) {
	if (in_key == null) {
		return ActionEnum.ignore;
	}
	var arrayTokens = in_key.split(":");
	var action = ActionEnum.ignore;
	var nameSet = false;
	for (var index = 0, length = arrayTokens.length; index < length; index++) {
		var token = arrayTokens[index];
		if (token == "ignore"){
			action = ActionEnum.ignore;
			return;
		}
		if (token == "int"){
			action = ActionEnum.int;
		} else if (token == "float"){
			action = ActionEnum.float;
		} else if (token == "bool"){
			action = ActionEnum.bool;
		} else if (token == "string"){
			action = ActionEnum.string;
		} else if (token == "sheet3rd"){
			action = ActionEnum.sheet3rd;
		} else if (token == "sheet5th"){
			action = ActionEnum.sheet5th;
		} else if (token == "array"){
			if (false == nameSet){
				console.log("need name before array in key:" + in_key + " sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			}
			var nextIndex = index + 1;
			var added = false;
			if (nextIndex < length){
				var nextToken = arrayTokens[nextIndex];
				var subIndex = Number(nextToken);
				if (Number.isInteger(subIndex)){
					in_cursor.PushArray(subIndex);
					index = nextIndex;
					added = true;
				}
			}
			if (added == false){
				var subIndex = in_cursor.GetArrayLength(in_baseObject);
				in_cursor.PushArray(subIndex);
			}
		} else {
			in_cursor.PushMember(token);
			nameSet = true;
		}
	}

	if (ActionEnum.ignore == action) {
		console.log("no action set for key:" + in_key + " sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
	}

	if (false == nameSet){
		console.log("no name set for key:" + in_key + " sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
	}

	//console.log("key:" + in_key + " cursor:" + in_cursor);

	return action;
}

//http://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
const valueToBoolean = function(value){
	return (value && typeof value == 'string') ? (value.toLowerCase() == 'true' || value == '1') : (value == true);
}


const consumeCell = function(in_arrayPromice, in_dataServer, in_sheetId, in_cursor, in_baseObject, in_rowIndex, in_columnIndex, in_action, in_cell){
	switch (in_action){
		case ActionEnum.int:
			if(in_cell !== "") {
				var value = Math.round(in_cell);
				in_cursor.SetValue(value, in_baseObject);
			}
			break;
		case ActionEnum.float:
			if(in_cell !== "") {
				var value = Number(in_cell);
				in_cursor.SetValue(value, in_baseObject);
			}
			break;
		case ActionEnum.bool:
			if(in_cell !== "") {
				var value = valueToBoolean(in_cell);
				in_cursor.SetValue(value, in_baseObject);
			}
			break;
		case ActionEnum.string:
			if(in_cell !== "") {
				var value = "" + in_cell;
				in_cursor.SetValue(value, in_baseObject);
			}
			break;
		case ActionEnum.sheet3rd:
			in_arrayPromice.push(sheet3rdToObject(in_dataServer, in_sheetId, in_cell, in_cursor, in_baseObject));
			break;
		case ActionEnum.sheet5th:
			in_arrayPromice.push(sheet5thToObject(in_dataServer, in_sheetId, in_cell, in_cursor, in_baseObject));
			break;
	}
	return;
}

const sheet3rdNormalisedRow = function(in_arrayPromice, in_dataServer, in_sheetId, in_cursor, in_baseObject, in_keyRow, in_row, in_rowIndex, in_worksheetName){
	if ((in_keyRow == null) || (in_row == null)) {
		return;
	}

	if ((in_keyRow.length <= 0) || (in_row.length <= 0)) {
		return;
	}

	var localCursor = in_cursor.Clone();
	var id = in_row[0];
	localCursor.PushMember(id);
	localCursor.SetValue({}, in_baseObject);

	for (var columnIndex = 1, length = in_keyRow.length; columnIndex < length; columnIndex++) {
		var key = in_keyRow[columnIndex];

		var localCursorInner = localCursor.Clone();
		var action = dealKey(key, localCursorInner, in_baseObject, in_sheetId, in_worksheetName);
		if (ActionEnum.ignore == action){
			return;
		}
		//var cell = "";
		if (columnIndex < in_row.length){
			var cell = in_row[columnIndex];
			consumeCell(in_arrayPromice, in_dataServer, in_sheetId, localCursorInner, in_baseObject, in_rowIndex, columnIndex, action, cell);
		}
	}
	return;
}

const sheet5thNormalisedRow = function(in_arrayPromice, in_dataServer, in_sheetId, in_cursor, in_baseObject, in_row, in_rowIndex, in_worksheetName){
	if (in_row == null) {
		return;
	}

	if (in_row.length <= 0) {
		console.log("empty row in worksheetName:" + in_worksheetName + " row:" + in_rowIndex);
		return;
	}
	var key = in_row[0];
	var localCursor = in_cursor.Clone();
	var action = dealKey(key, localCursor, in_baseObject, in_sheetId, in_worksheetName);
	if (ActionEnum.ignore == action){
		return;
	}
	//var cell = "";
	if (2 <= in_row.length){
		//console.log("short row in 5th normalised worksheetName:" + in_worksheetName + " row:" + in_rowIndex);
		//return;
		var cell = in_row[1];
		consumeCell(in_arrayPromice, in_dataServer, in_sheetId, localCursor, in_baseObject, in_rowIndex, 1, action, cell);
	}

	return;
}

/*
	3rd normalised form
	[[key0,key1,....],[dataA0,dataA1,..],[dataB0,dataB1,...],...]
*/
const sheet3rdToObject = function(in_dataServer, in_sheetId, in_worksheetName, in_cursor, in_baseObject){
	//console.log("sheet3rdToObject in_sheetId:" + in_sheetId + " in_worksheetName:" + in_worksheetName);
	return in_dataServer.getSpreadsheetWorksheetData(in_sheetId, in_worksheetName).then(function(input){
		if (input == null){
			console.log("null spreadsheet sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			return in_baseObject;
		}

		//console.log("sheet3rdToObject input:" + JSON.stringify(input));
		var arrayPromice = [];
		if (input.length <= 0){
			console.log("empty spreadsheet sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			return in_baseObject;
		}
		var keyRow = input[0];
		if ((keyRow == null) || (keyRow.length <= 0)){
			console.log("empty key row spreadsheet sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			return in_baseObject;
		}
		var key = keyRow[0];
		var arrayTokens = key.split(":");
		if (-1 == (arrayTokens.indexOf("_id"))){
			console.log("sheet3rnmormalised obliged to have first column be _id, key:" + key + " sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			return;
		}

		for (var rowIndex = 1, length = input.length; rowIndex < length; rowIndex++) {
			var row = input[rowIndex];

			//var localCursor = in_cursor.Clone();
			//var subIndex = localCursor.GetArrayLength(in_baseObject);
			//localCursor.PushArray(subIndex);

			sheet3rdNormalisedRow(arrayPromice, in_dataServer, in_sheetId, in_cursor, in_baseObject, keyRow, row, rowIndex, in_worksheetName);
		}

		return Q.allSettled(arrayPromice).then(function(input){ 
			input.forEach(function (result) {
				if (result.state !== "fulfilled") {
					console.log(result.reason);
				}
			});
			return in_baseObject; 
		});
	});
}

/*
	5th normalised form  [[key, value, ...], ...]
*/
const sheet5thToObject = function(in_dataServer, in_sheetId, in_worksheetName, in_cursor, in_baseObject){
	//console.log("sheet5thToObject in_sheetId:" + in_sheetId + " in_worksheetName:" + in_worksheetName);
	return in_dataServer.getSpreadsheetWorksheetData(in_sheetId, in_worksheetName).then(function(input){
		if (input == null) {
			console.log("null spreadsheet sheetId:" + in_sheetId + " worksheetName:" + in_worksheetName);
			return in_baseObject;
		}
		//console.log("input:" + JSON.stringify(input));
		var arrayPromice = [];
		for (var rowIndex = 0, length = input.length; rowIndex < length; rowIndex++) {
			var row = input[rowIndex];
			sheet5thNormalisedRow(arrayPromice, in_dataServer, in_sheetId, in_cursor, in_baseObject, row, rowIndex, in_worksheetName);
		}

		return Q.allSettled(arrayPromice).then(function(input){ 
			input.forEach(function (result) {
				if (result.state !== "fulfilled") {
					console.log(result.reason);
				}
			});
			return in_baseObject; 
		});

		return in_baseObject;
	});
}

module.exports.sheetToObject = function(in_dataServer, in_sheetId, in_cursor, in_baseObject){
	return sheet5thToObject(in_dataServer, in_sheetId, "toc", in_cursor, in_baseObject);
}
