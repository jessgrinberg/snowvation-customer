angular.module('auth',['ngStorage'])
.controller('authCtrl',['$scope','$sessionStorage', function($scope, $sessionStorage){
	
	$scope.user = {};
	$scope.$token = $sessionStorage.token;
	$scope.alertInfo = "";
	$scope.alertBox = "";
	$scope.alert = function(info){
		$scope.alertBox = '../auth/alert.html';
		$scope.alertInfo = info;
	}
	$scope.closeAlert = function(info){
		$scope.alertInfo = "";
		$scope.alertBox = "";
	}

	$scope.updateUser = function(user){
		$scope.user = user;
		$scope.$token = user.token;
		$sessionStorage.token = user.token;
	}
	
	$scope.showSignIn = function(){
		$scope.signUpHtml = '';
		$scope.signInHtml = '../auth/signIn.html';
	}
	$scope.closeSignIn = function(){
		$scope.signInHtml = '';
	}
	
	$scope.logout = function(){
		delete $scope.$token;
		delete $sessionStorage.token;
		$scope.user = {};
	}
	
	$scope.showSignUp = function(){
		$scope.signInHtml = '';
		$scope.signUpHtml = '../auth/signUp.html';
	}
	$scope.closeSignUp = function(){
		$scope.signUpHtml = '';
	}
	
	$scope.onModalLoad = function(){
		$(".on-modal.modal-box").css({
			top: ($(window).height() - $(".on-modal.modal-box").outerHeight()) / 3,
			left: ($(window).width() - $(".on-modal.modal-box").outerWidth()) / 2
		});
		$(".on-modal.modal-overlay").fadeTo(500, 0.7);
		$('.on-modal.modal-box').fadeIn(500);
	}
	
	if($scope.$token){
		$scope.updateUser({token:$scope.$token});
	}
	
}])
.controller('signUpCtrl',['$scope','signUp',function($scope,signUp){
	$scope.initialize = function(){
		
		$scope.email = '';
		$scope.password = '';
		$scope.firstName = '';
		$scope.lastName = '';
		$scope.skiLevel = '';
		
	}
	
	$scope.skiLevels = [
		{
			value : 1,
			name : "1 - 1st time"
		},
		{
			value : 2,
			name : "2 - Novice"
		},
		{
			value : 3,
			name : "3 - Comfortable Novice"
		},
		{
			value : 4,
			name : "4 - Intermediate"
		},
		{
			value : 5,
			name : "5 - Advanced"
		},
		{
			value : 6,
			name : "6 - Expert"
		}
	]
	
	$scope.signUp = function(){
		if($scope.email && $scope.password && $scope.firstName && $scope.lastName && $scope.skiLevel && $scope.tcAgreed){
			var reqObj = {
				email:$scope.email,
				password:$scope.password,
				firstName:$scope.firstName,
				lastName:$scope.lastName,
				skiLevel:$scope.skiLevel.value
			};
			signUp(reqObj,function(response){
				if(response.success){
					$scope.updateUser(response.payload);
					$scope.closeSignUp();
					$scope.initialize();
					$scope.alert("Registration Successfull.")
				}else{
					$scope.initialize();
					$scope.alert(response.payload);
				}
			});
		}
	}
	$scope.initialize();
}])
.controller('signInCtrl',['$scope','signIn',function($scope,signIn){

	
	$scope.initialize = function(){
		$scope.email = '';
		$scope.password = '';
	}
	
	$scope.signIn = function(){
		if($scope.email && $scope.password){
			var reqObj = {
				email:$scope.email,
				password:$scope.password
			};
			signIn(reqObj,function(response){
				if(response.success){
					$scope.updateUser(response.payload);
					$scope.closeSignIn();
					$scope.initialize();
				}else{
					$scope.initialize();
					$scope.alert(response.payload);
				}
			});
		}
	}
	$scope.initialize();

}])
.controller('forgotPwdController',['$scope','forgotPwd',function($scope,forgotPwd){

	
	$scope.initialize = function(){
		$scope.email = '';
	}
	
	$scope.forgotPwd = function(){
		if($scope.email){
			var reqObj = {
				email:$scope.email
			};
			forgotPwd(reqObj,function(response){
				if(response.success){
					$scope.alert(response.payload);
					$scope.initialize();
				}else{
					$scope.initialize();
					$scope.alert(response.payload);
				}
			});
		}
	}
	$scope.initialize();

}])
.factory('signUp', ['$http', function($http) {		
	return function(requestObj, callBackFunc){
		console.log('@signUp:');
		console.log('RequestObj: ',requestObj);
		$http({
			url : 'https://snowvation-someone516.c9.io/api/customers',
			method: 'POST',
			data: requestObj
		})
		.success(function(data) {
			console.log('data: ',data);
			callBackFunc(data);
		})
		.error(function(err){
			console.log('Error: ',err);
			callBackFunc(err);
		});
	}
}])
.factory('signIn', ['$http', function($http) {		
	return function(requestObj, callBackFunc){
		console.log('@signIn:');
		console.log('RequestObj: ',requestObj);
		$http({
			url : 'https://snowvation-someone516.c9.io/api/customers/login',
			method: 'POST',
			data: requestObj
		})
		.success(function(data) {
			console.log('data: ',data);
			callBackFunc(data);
		})
		.error(function(err){
			console.log('Error: ',err);
			callBackFunc(err)
		});
	}
}])
.factory('forgotPwd', ['$http', function($http) {		
	return function(requestObj, callBackFunc){
		console.log('@forgotPwd:');
		console.log('RequestObj: ',requestObj);
		$http({
			url : 'https://snowvation-someone516.c9.io/api/customers/login/forgotpassword',
			method: 'POST',
			data: requestObj
		})
		.success(function(data) {
			console.log('data: ',data);
			callBackFunc(data);
		})
		.error(function(err){
			console.log('Error: ',err);
			callBackFunc(err)
		});
	}
}])