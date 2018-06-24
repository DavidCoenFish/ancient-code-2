const module = angular.module('LoginApp', []);


module.controller('LoginContoller', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.showMessage = false;
	$scope.messageType = "";
	$scope.message = "";

	$scope.email = "";
	$scope.name = "";
	$scope.password = "";

	$scope.selected = "guest";
	$scope.isSelected = function(in_name) {
		return ($scope.selected === in_name);
	};
	$scope.onTab = function(in_name) {
		$scope.selected = in_name;
	};
	$scope.onGuest = function() {
		$http({
			method: "POST",
			url: "/login/guest"
		}).then(function successCallback(response) {
			if (response.status == 200){
				$window.location.assign("lqre");
			} else {
				console.log(JSON.stringify(response));
				showMessage("Error", response.statusText);
			}
		}, function errorCallback(response) {
			console.log(JSON.stringify(response));
			showMessage("Error", response.data);
		});
	};
	$scope.onLogin = function() {
		$http({
			method: "POST",
			url: "/login/login",
			data: { 
				email: $scope.email,
				password: $scope.password
			}
		}).then(function successCallback(response) {
			if (response.status == 200){
				$window.location.assign("lqre");
			} else {
				console.log(JSON.stringify(response));
				showMessage("Error", response.statusText);
			}
		}, function errorCallback(response) {
			console.log(JSON.stringify(response));
			showMessage("Error", response.data);
		});
	};
	$scope.onNew = function() {
		$http({
			method: "POST",
			url: "/login/new",
			data: { 
				name: $scope.name,
				email: $scope.email,
				password: $scope.password
			}
		}).then(function successCallback(response) {
			if (response.status == 200){
				$window.location.assign("lqre");
			} else {
				console.log(JSON.stringify(response));
				showMessage("Error", response.statusText);
			}
		}, function errorCallback(response) {
			console.log(JSON.stringify(response));
			showMessage("Error", response.data);
		});
	};
	$scope.onRecover = function() {
		$http({
			method: "POST",
			url: "/login/recover",
			data: { 
				email: $scope.email
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			if (response.status == 200){
				showMessage("Info", "email has been sent");
			} else {
				showMessage("Error", response.statusText);
			}
		}, function errorCallback(response) {
			console.log(JSON.stringify(response));
			showMessage("Error", response.data);
		});
	};

	$scope.onDismissMessage = function($event) {
		$event.stopPropagation();
		$scope.showMessage = false;
	};

	$scope.stopPropagation = function($event) {
		$event.stopPropagation();
	};

	const showMessage = function(messageType, message) {
		$scope.showMessage = true;
		$scope.messageType = messageType;
		$scope.message = message;
	}

	$scope.isEmailValid = function() {
		return ($scope.email === "") || userValidateEmail($scope.email);
	}

	$scope.isNameValid = function() {
		return ($scope.name === "") || userValidateName($scope.name);
	}

	$scope.isPasswordValid = function() {
		return ($scope.password === "") || userValidatePassword($scope.password);
	}

	const userCleanName = function(in_name){
		if (typeof in_name === 'string' || in_name instanceof String){
			return in_name.trim();
		}
		return "";
	}

	const userValidateName = function(in_name){
		var cleanName = userCleanName(in_name);
		if ("" != cleanName){
			return true;
		}
		return false;
	}

	const userValidatePassword = function(in_password){
		if (typeof in_password === 'string' || in_password instanceof String){
			return (8 < in_password.length);
		}
		return false;
	}

	const userValidateEmail = function(in_email){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(in_email)){
			return true;
		}
		return false;
	}


}]);