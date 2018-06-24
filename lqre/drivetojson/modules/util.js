
const Q = require("q");
const FileSystem = require("fs");

module.exports.writeFilePromise = function(in_filePath, in_data){
	var deferred = Q.defer();

	FileSystem.writeFile(in_filePath, in_data, function(error) {
		if(error) {
			deferred.reject("writeFilePromise:" + in_filePath + " error:" +  error);
			return;
		}
		deferred.resolve(null);
	}); 

	return deferred.promise;
}

const movePromise = function(in_oldPath, in_newPath){
	var deferred = Q.defer();

	FileSystem.rename(in_oldPath, in_newPath, function (error) {
		if (error) {
			if (error.code === 'EXDEV') {
				deferred.resolve(copyPromise(in_oldPath, in_newPath));
			} else {
				deferred.reject(JSON.stringify(error));
			}
			return;
		}
		deferred.resolve(null);
	});

	return deferred.promise;
}
module.exports.movePromise = movePromise;

const copyPromise = function(in_oldPath, in_newPath) {
	var deferred = Q.defer();

	var readStream = FileSystem.createReadStream(in_oldPath);
	var writeStream = FileSystem.createWriteStream(in_newPath);

	readStream.on('error', function (error) {
		deferred.reject(JSON.stringify(error));
	});
	writeStream.on('error', function (error) {
		deferred.reject(JSON.stringify(error));
	});

	readStream.on('close', function () {
		FileSystem.unlink(in_oldPath, function () {
			deferred.resolve(null);
		});
	});

	readStream.pipe(writeStream);

	return deferred.promise;
}
module.exports.copyPromise = copyPromise;
