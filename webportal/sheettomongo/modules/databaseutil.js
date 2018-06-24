const Q = require('q');
const MongoDB = require('mongodb');

const DropCollection = function(mongoDBUrl, collectionName){
	//console.log("DropCollection:" + mongoDBUrl + " " + collectionName)
	var deferred = Q.defer();

	MongoDB.MongoClient.connect(mongoDBUrl).then(function(db){
		db.collection(collectionName, {}, function(err, collection){
			if (err != null){
				deferred.reject("did not find key:" + err);
			}
			else {
				collection.drop();
				db.close();
				deferred.resolve(collectionName);
			}
		});
		return true;
	});
	return deferred.promise;
}

const AppendCollection = function(mongoDBUrl, collectionName, inputArray){
	//console.log("AppendCollection:" + mongoDBUrl + " " + collectionName)

	return MongoDB.MongoClient.connect(mongoDBUrl).then(function(db) {
		return db.collection(collectionName).insertMany(inputArray).then(function(response) {
			//console.log("Insert Data:" + collectionName + " " + JSON.stringify(response))
			db.close();
			return collectionName;
		});
	});
}

module.exports.ObjectToMongoDB = function(mongoDBUrl, databaseObject){
	console.log("ObjectToMongoDB:" + mongoDBUrl);

	var dropArray = [];
	for(var propertyName in databaseObject) {
		//console.log("dropArray mongoDBUrl:" + mongoDBUrl + " propertyName:" + propertyName);
		dropArray.push(DropCollection(mongoDBUrl, propertyName));
	}
	return Q.allSettled(dropArray).then(function(allSettledArray){
		console.log("allSettled:dropArray:" + JSON.stringify(allSettledArray));
		for(var index = 0; index < allSettledArray.length; ++index){
			var item = allSettledArray[index];
			if (item.state === "rejected"){
				console.log("Error:" + item.reason);
				throw new Error(item.reason);
			}
		}
		return true;
	}).then(function(input){

		var appendArray = [];
		for(var propertyName in databaseObject) {
			var collection = databaseObject[propertyName];
			appendArray.push(AppendCollection(mongoDBUrl, propertyName, collection));
		}

		return Q.allSettled(appendArray).then(function(allSettledArray){
			console.log("allSettled:appendArray:" + JSON.stringify(allSettledArray));
			for(var index = 0; index < allSettledArray.length; ++index){
				var item = allSettledArray[index];
				if (item.state === "rejected"){
					console.log("Error:" + item.reason);
					throw new Error(item.reason);
				}
			}
			return true;
		});
	});
}

