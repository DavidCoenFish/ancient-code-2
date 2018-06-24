/*
behave like a server database interface, stripped down, for client
actully sends request to magic server endpoints that server database collections
*/

//this.m_urlBase = "/combattest/collection/"
const ClientDatabase = function(urlBase) {
	this.m_urlBase = urlBase;
	return;
}

ClientDatabase.prototype.getPromiceCollection = function(collectionName) {
	var deferred = Q.defer();
	const requestData = new XMLHttpRequest();
	requestData.open("GET", this.m_urlBase + collectionName, true);
	requestData.onload = function() {
		if (200 <= requestData.status && requestData.status < 400) {
			//console.log("DocumentServer RequestDocument:" + requestData.responseText);
			var data = JSON.parse(requestData.responseText);
			deferred.resolve(data);
		} else {
			//alert("requestData We reached our target server, but it returned an error:" + requestData.status);
			deferred.reject(new Error("requestData We reached our target server, but it returned an error:" + requestData.status + " " + url));
		}
	};
	requestData.onerror = function() {
		//alert("There was a connection error of some sort");
		deferred.reject(new Error("There was a connection error of some sort:" + url));
	};
	requestData.send();

	return deferred.promise;
}
