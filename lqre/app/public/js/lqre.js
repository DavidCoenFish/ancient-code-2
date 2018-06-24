const module = angular.module('LqreApp', []);

module.controller('LqreContoller', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.onLogout = function() {
		$http({
			method: "POST",
			url: "/lqre/logout"
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$window.location.assign("lqre");
		}, function errorCallback(response) {
			$window.alert(JSON.stringify(response));
		});
	};
}]);


