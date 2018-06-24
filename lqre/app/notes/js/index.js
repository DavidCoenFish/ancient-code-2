const module = angular.module('IndexApp', []);

module.controller('IndexContoller', ['$scope', '$window', function($scope, $window){
	$scope.onLqre = function() {
		$window.location.assign("lqre.html");
	};
}]);
