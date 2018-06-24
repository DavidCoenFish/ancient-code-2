const Requestify = require("requestify");
const Q = require('q');

const DataServerMock = function(mockData) {
	this.m_mockData = mockData;
}

DataServerMock.prototype.GetSheetPromice = function(spreadsheetID, sheetName) {
	var key = spreadsheetID + ":" + sheetName;
	var deferred = Q.defer();
	if (key in this.m_mockData){
		deferred.resolve(this.m_mockData[key]);
	} else {
		deferred.reject("did not find key:" + key);
	}
	return deferred.promise;
}

module.exports = function(mockData){
	var dataServerMock = new DataServerMock(mockData);
	return dataServerMock;
}
