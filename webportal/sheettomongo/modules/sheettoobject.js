const Q = require("q");
const Cursor = require("./cursor.js");

// allow type hint for value to appear anywhere, ie member:string:foo, string:member:foo, array:string:1, array:4:member:foo:array:1:boolean:bar
const TypeEnum = Object.freeze({
	"ignore":0,
	//"continue":1, //2data (sheet uid, sheet name) .. just use sheet1st/sheet5th without a member name, ie, "sheet1st:" as key
	"sheet1st":2, //2data (sheet uid, sheet name), first row is keys, following rows are values to for array of objects
	"sheet5th":3, //2data (sheet uid, sheet name), key:value, to from a object
	"member":4, //1data (member name), usually assumed, but can indicate key is in object, key follows
	"array":5, //1data (index), obliges outer value to be array, index follows
	//should type hints be in a different nameset? different seperator? no
	"string":6, //type hint
	"number":7, //type hint
	"boolean":8, //type hint
	"null":9, //type hint
	"empty_array":10, //type hint
	"empty_object":11, //type hint
	//"empty_string":12, //type hint
	"sheet1st_row_array":13, //3data (sheet uid, sheet name, row name) .. first row is key, if we find row name, populate an array with data, else empty array
	});

//http://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
const ValueToBoolean = function(value){
  return (value && typeof value == 'string') ? (value.toLowerCase() == 'true' || value == '1') : (value == true);
}

//return row index, certain type, it may increment (2 columns consumed)
const ConsumeValues = function(key, row, rowIndex, baseObject, cursor, dataServer, promiceArray){
	var localCursor = cursor.Clone();
	//parse key, last type tells up what to do with value from row
	//console.log("ConsumeValues: key:\"" + key + "\" rowIndex:" + rowIndex + " cursor:" + cursor);

	var splitString = key.split(":");
	var typeHint = undefined;
	var cursorHint = undefined;
	for (var index = 0, total = splitString.length; index < total; index++) {
		var token = splitString[index];
		var tokenLower = token.toLowerCase();
		var type = undefined;

		if ((index === 0) && (token === "")){
			return rowIndex;
		}

		if (tokenLower in TypeEnum){
			type = TypeEnum[tokenLower];
		}
		//console.log("token:" + token + " type:" + type + " cursorHint:" + cursorHint + " isNaN(tokenLower):" + isNaN(tokenLower));
		switch (type){
		default:
			if ((cursorHint === TypeEnum.array) && (false === isNaN(tokenLower))){
				localCursor.PushArray(Number(tokenLower));
				cursorHint = undefined;
			} else if (cursorHint === TypeEnum.member){
				localCursor.PushMember(token);
				cursorHint = undefined;
			} else if (token !== ""){
				localCursor.PushMember(token);
			}
			break;
		case TypeEnum.ignore:
			return rowIndex;
		case TypeEnum.array:
		case TypeEnum.member:
			cursorHint = type;
			break;
		case TypeEnum.boolean:
		case TypeEnum.null:
		case TypeEnum.number:
		case TypeEnum.sheet1st:
		case TypeEnum.sheet5th:
		case TypeEnum.string:
		case TypeEnum.empty_array:
		case TypeEnum.empty_object:
		case TypeEnum.sheet1st_row_array:
			typeHint = type;
			break;
		}
	}

	//console.log("typeHint:" + typeHint + " cursorHint:" + cursorHint);
	//return rowIndex;

	var value = undefined;

	//console.log("typeHint:" + typeHint + " keyHint:" + keyHint + " localCursor:" + localCursor);

	//auto number or string if type not specified
	if ((typeHint === undefined) && (rowIndex < row.length)){
		var peek = row[rowIndex];
		if ("" !== peek){
			if (isNaN(peek)){
				typeHint = TypeEnum.string;
			} else {
				typeHint = TypeEnum.number;
			}
		}
	}

	switch (typeHint)
	{
	default:
		break;
	case TypeEnum.boolean:
		if (rowIndex < row.length){
			value = ValueToBoolean(row[rowIndex]);
		}
		break;
	case TypeEnum.null:
		value = null;
		break;
	case TypeEnum.number:		
		if (rowIndex < row.length){
			value = Number(row[rowIndex]);
		}
		break;
	case TypeEnum.sheet1st:
		if (rowIndex + 1 < row.length){
			var spreadsheetID = row[rowIndex];
			var sheetName = row[rowIndex + 1];
			promiceArray.push(Sheet1st(baseObject, localCursor, dataServer, spreadsheetID, sheetName));
			rowIndex += 1;
		}
		break;
	case TypeEnum.sheet5th:
		if (rowIndex + 1 < row.length){
			var spreadsheetID = row[rowIndex];
			var sheetName = row[rowIndex + 1];
			promiceArray.push(Sheet5th(baseObject, localCursor, dataServer, spreadsheetID, sheetName));
			rowIndex += 1;
		}
		break;
	case TypeEnum.string:
		if (rowIndex < row.length){
			value = "" + row[rowIndex];
		}
		break;
	case TypeEnum.empty_array:
		value = [];
		break;
	case TypeEnum.empty_object:
		value = {};
		break;

	case TypeEnum.sheet1st_row_array:
		if (rowIndex + 2 < row.length){
			var spreadsheetID = row[rowIndex];
			var sheetName = row[rowIndex + 1];
			var rowName = row[rowIndex + 2];
			promiceArray.push(Sheet1stRowArray(baseObject, localCursor, dataServer, spreadsheetID, sheetName, rowName));
			rowIndex += 2;
		}
		break;
	}

	if (value !== undefined){
		localCursor.SetValue(value, baseObject);
	}

	return rowIndex;
}

const SkipRowWithInvalidID = function(keyRow, row){
	for (var index = 0, total = keyRow.length; index < total; index++) {
		var key = keyRow[index];
		if (key !== "_id"){
			continue;
		}
		var value = "";
		if (index < row.length){
			value = row[index];
		}
		if ((value === "") || (value === undefined)){
			return true;
		}
	}
	return false;
}

const Sheet1stRow = function(keyRow, row, dataServer){
	//console.log();
	//console.log("Sheet1stRow:keyRow:" + JSON.stringify(keyRow));
	//console.log("Sheet1stRow:row:" + JSON.stringify(row));

	var baseObject = {}; //we know that sheet1st normalised form is an array of objects
	var cursor = Cursor();
	var promiceArray = [];

	for (var index = 0, total = keyRow.length; index < total; index++) {
		var key = keyRow[index];
		(function(){
			index = ConsumeValues(key, row, index, baseObject, cursor, dataServer, promiceArray);  
		})();
	}
	//console.log("Sheet1stRow:promiceArray:" + promiceArray.length);

	return Q.allSettled(promiceArray).then(function(allSettledArray){
		for(var index = 0; index < allSettledArray.length; ++index){
			var item = allSettledArray[index];
			if (item.state === "rejected"){
				throw new Error(item.reason);
			}
		}
		return baseObject;
	});
}

const Sheet1st = function(baseObject, cursor, dataServer, spreadsheetID, sheetName){
	//console.log("	Sheet1st:spreadsheetID:" + spreadsheetID + " sheetName:" + sheetName + " cursor:" + cursor);

	var localCursorOuter = cursor.Clone();

	return dataServer.GetSheetPromice(spreadsheetID, sheetName).then(function(input){
		if (input === undefined){
			return false;
		}
		var keyRow = input[0];
		var promiceArray = [];
		for (var index = 1, total = input.length; index < total; index++) {
			var row = input[index];

			//skip a row if the first key is _id and the fist value is ""
			if (true === SkipRowWithInvalidID(keyRow, row)){
				continue;
			}

			var rowPromice = Sheet1stRow(keyRow, row, dataServer);
			promiceArray.push(rowPromice);
		}

		return Q.allSettled(promiceArray).then(function(allSettledArray){
			var result = [];
			for(var index = 0; index < allSettledArray.length; ++index){
				var item = allSettledArray[index];
				if (item.state === "fulfilled"){
					result.push(item.value);
				} else if (item.state === "rejected"){
					throw new Error(item.reason);
				}
			}
			return result;
		}).then(function(arrayObject){
			for (var index = 0, total = arrayObject.length; index < total; index++) {
				var row = arrayObject[index];
				var localCursor = localCursorOuter.Clone();
				var outIndex = localCursor.GetArrayLength(baseObject);
				localCursor.PushArray(outIndex);
				localCursor.SetValue(row, baseObject);
			}

			return true;
		});
	});
}

const Sheet5th = function(baseObject, cursor, dataServer, spreadsheetID, sheetName){
	//console.log("	Sheet5th:spreadsheetID:" + spreadsheetID + " sheetName:" + sheetName + " cursor:" + cursor);

	var localCursor = cursor.Clone();
	return dataServer.GetSheetPromice(spreadsheetID, sheetName).then(function(input){
		//console.log("	input:" + input);
		//return true;
		if (input === undefined){
			return false;
		}
		var promiceArray = [];
		for (var index = 0, total = input.length; index < total; index++) {
			(function(){
				var row = input[index];
				if (0 < row.length){
					var key = row[0];
					ConsumeValues(key, row, 1, baseObject, localCursor, dataServer, promiceArray);  
				}
			})();
		}
		return Q.allSettled(promiceArray).then(function(allSettledArray){
			for(var index = 0; index < allSettledArray.length; ++index){
				var item = allSettledArray[index];
				if (item.state === "rejected"){
					throw new Error(item.reason);
				}
			}
			return true;
		});
	});
}

const Sheet1stRowArray = function(baseObject, cursor, dataServer, spreadsheetID, sheetName, rowName){
	//console.log("	Sheet1stRowArray:spreadsheetID:" + spreadsheetID + " sheetName:" + sheetName + " rowName:" + rowName + " cursor:" + cursor);

	var localCursorOuter = cursor.Clone();

	return dataServer.GetSheetPromice(spreadsheetID, sheetName).then(function(input){
		if (input === undefined){
			return false;
		}
		var keyRow = input[0];
		var promiceArray = [];
		for (var index = 1, total = input.length; index < total; index++) {
			var row = input[index];

			//skip a row if the first key is _id and the fist value is ""
			if (true === SkipRowWithInvalidID(keyRow, row)){
				continue;
			}

			var rowPromice = Sheet1stRow(keyRow, row, dataServer);
			promiceArray.push(rowPromice);
		}

		return Q.allSettled(promiceArray).then(function(allSettledArray){
			var result = [];
			for(var index = 0; index < allSettledArray.length; ++index){
				var item = allSettledArray[index];
				if (item.state === "fulfilled"){
					if (rowName in item.value){
						result.push(item.value[rowName]);
					}
				} else if (item.state === "rejected"){
					throw new Error(item.reason);
				}
			}
			return result;
		}).then(function(arrayObject){
			for (var index = 0, total = arrayObject.length; index < total; index++) {
				var row = arrayObject[index];
				var localCursor = localCursorOuter.Clone();
				var outIndex = localCursor.GetArrayLength(baseObject);
				localCursor.PushArray(outIndex);
				localCursor.SetValue(row, baseObject);
			}

			return true;
		});
	});

}


// return promice of 
module.exports = function(dataServer, spreadsheetID, sheetName){
	var baseObject = {};
	var cursor = new Cursor();

	return Sheet5th(baseObject, cursor, dataServer, spreadsheetID, sheetName).then(function(input){
		return baseObject;
	});
}
