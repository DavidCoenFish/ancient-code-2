// external root data source
//https://docs.google.com/spreadsheets/d/1bGnvL3dDgc7R03lNZVhhjrEJRC7OdoWBLgIbb7hNams/edit#gid=0
//https://sheets.googleapis.com/v4/spreadsheets/1bGnvL3dDgc7R03lNZVhhjrEJRC7OdoWBLgIbb7hNams/values/table_of_contents?majorDimension=ROWS&key=AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I

module.exports.spreadsheet = {};
module.exports.spreadsheet.id = "1bGnvL3dDgc7R03lNZVhhjrEJRC7OdoWBLgIbb7hNams";
module.exports.spreadsheet.name = "table_of_contents";
module.exports.spreadsheet.key = "AIzaSyDnh6nSU_IUAL6M2MXUIHtEYXZ5cRaul7I"; // the google api key permissioned for the sheet

// local database
module.exports.mongo = {};
module.exports.mongo.url = "mongodb://localhost:27017/webportal";
//module.exports.mongo.port = 27017;
//module.exports.mongo.options = {"auto_reconnect" : true};
//module.exports.mongo.databaseName = "webportal";

//when we run a server, what param
module.exports.server = {};
module.exports.server.port = 8081;

// data for pages we serve
module.exports.author = "David Coen";
module.exports.selectorKeyLocale = "t";
module.exports.selectorKeyStyle = "s";
module.exports.defaultLocale = "en";
module.exports.defaultStyle = "s1";
//would like to use "/index." but worried that could be wierd for some clients
module.exports.defaultUrl = "/index";
