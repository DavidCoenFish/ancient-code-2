const MongoDB = require('mongodb');
const Assert = require('assert');
const Q = require('q');
const sMongoConnectOptions = {
	"promiseLibrary" : Q.Promise
};
const sMongoConnectUrl = "mongodb://localhost:27017/lqre";
const sWriteLockKey = "_write_lock";
const sIDKey = "_id";


module.exports.getCollection = function(collectionName)
{
	//console.log("_Mongo.getPromiceCollection:" + this.m_url + " " + collectionName);
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(connection){
			return new Q(connection.collection(collectionName).find().toArray())
				.then(function(input){
					connection.close();
					return input;
				});

		});
}

module.exports.deleteCollection = function(collectionName)
{
	//console.log("_Mongo.deletePromiceDocument");
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(db){
		return db.collection(collectionName).remove({}).then(function(){
			db.close();
			return collectionName;
		});
	});
}

module.exports.getDocument = function(collectionName, id)
{
	//return Q(true);
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(connection){
		return connection.collection(collectionName).findOne({_id : id}, {})
			.then(function(document){
				connection.close();
				return document;
			});
	});
}

module.exports.deleteDocument = function(collectionName, id)
{
	//console.log("_Mongo.deletePromiceDocumentByID");
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(connection){
		return connection.collection(collectionName).deleteOne({"_id": id})
			.then(function(document){
				connection.close();
				return id;
			});
	});
}

module.exports.getFields = function(collectionName, id, fields)
{
	//console.log("Mongo.getPromiceDocumentByIDFields");
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(connection){
		return connection.collection(collectionName).findOne({"_id": id}, fields)
			.then(function(document){
				connection.close();
				return document;
			});
	});
}

//return id
module.exports.insertDocument = function(collectionName, documentToInsert)
{
	//console.log("_Mongo.insertDocumentReturnID:" + collectionName + " " + JSON.stringify(documentToInsert));
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(db) {
		//console.log("mongoDB.connect");
		return db.collection(collectionName).insert(documentToInsert)
			.then(function(response) {
				//console.log("Mongo.insert");
				db.close();
				return documentToInsert._id;
			});
	});
}

const flattenObject = function(result, object, parent){
	for (var property in object) {
		if (object.hasOwnProperty(property)) {
			var key = undefined;
			if (parent === undefined){
				key = property
			} else {
				key = parent + "." + property;
			}

			var value = object[property];

			var typeString = Object.prototype.toString.call(value);
			//if (typeString === '[object Array]' ) {
			if (typeString === '[object Object]' ) {
				flattenObject(result, value, key);
			} else {
				result[key] = value;
			}
		}
	}
}

/* update or insert */
module.exports.upsertDocument = function(collectionName, id, documentPatch)
{
	var flattenedDocumentPatch = {};
	flattenObject(flattenedDocumentPatch, documentPatch);

	//console.log("_Mongo.insertDocumentReturnID:" + collectionName + " " + JSON.stringify(documentToInsert));
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(db) {
		//console.log("mongoDB.connect");
		return db.collection(collectionName).update(
			{"_id": id},
			{"$set" : flattenedDocumentPatch},
			{
				upsert: true,
			}).then(function(response) {
				console.log("Mongo.upsert");
				db.close();
				if ("nModified" in response){
					if (0 < response.nModified){
						return true;
					}
				}
				return false;
			});
	});
}

module.exports.updateDocument = function(collectionName, id, documentPatch)
{
	var flattenedDocumentPatch = {};
	flattenObject(flattenedDocumentPatch, documentPatch);
	//console.log("flattenedDocumentPatch:" + JSON.stringify(flattenedDocumentPatch));

	//console.log("_Mongo.updateDocumentByID:" + collectionName + " id:" + id + " patch:" + JSON.stringify(documentPatch));
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(db) {
		//console.log("mongoDB.connect");
		return db.collection(collectionName).update(
			{"_id": id},
			{"$set" : flattenedDocumentPatch},
			{
				upsert: true,
				multi: false//,
				//writeConcern: <document>
			}).then(function(response) {
				//console.log("Mongo.update");
				db.close();
				if ("nModified" in response){
					if (0 < response.nModified){
						return true;
					}
				}
				return false;
			});
	});
}

/* can only update document if you have the correct write lock, increments write lock */
module.exports.updateDocumentWriteLock = function(collectionName, id, writeLock, documentPatch)
{
	var flattenedDocumentPatch = {};
	flattenObject(flattenedDocumentPatch, documentPatch);
	//console.log("flattenedDocumentPatch:" + JSON.stringify(flattenedDocumentPatch));

	//console.log("_Mongo.updateDocumentByID:" + collectionName + " id:" + id + " patch:" + JSON.stringify(documentPatch));
	return MongoDB.MongoClient.connect(sMongoConnectUrl, sMongoConnectOptions).then(function(db) {
		//console.log("mongoDB.connect");
		return db.collection(collectionName).update(
			{"_id": id, "_write_lock": {$eq : writeLock }},
			{
				"$set" : flattenedDocumentPatch, 
				"$inc" : {"_write_lock" : 1} 
			},
			{
				upsert: false,
				multi: false
			}).then(function(response) {
				var result = response.result;
				console.log("Mongo.update writelock:" + JSON.stringify(response) +  " " + response.result);
				db.close();
				if ("nModified" in result){
					if (0 < result.nModified){
						return true;
					}
				}
				return false;
			});
	});
}

module.exports.sWriteLockKey = sWriteLockKey;
module.exports.sIDKey = sIDKey;
