angular.module('home',['auth','directives'])
.controller('homeCtrl',['$scope','getResorts',function($scope,getResorts){
	$scope.resorts = [];
	$scope.isZip = true;
	$scope.zipcode = '';
	$scope.searchText = "";
	var reqObj = {};
	updateResorts(reqObj);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				reqObj = {};
				reqObj.longitude = position.coords.longitude;
				reqObj.latitude = position.coords.latitude;
				updateResorts(reqObj);
			  });
		});
	} 
	$scope.zipUpdate = function(zipcode){
		if(zipcode){
			reqObj = {};
			reqObj.zipcode = zipcode;
			updateResorts(reqObj);
		}
	}
	$scope.search = function(searchText){
		if(searchText){
			window.location = '../search/#/?search='+searchText;
		}
	}
	function updateResorts(obj){
		getResorts(obj,function(response){
			if(response.success){
				$scope.resorts = response.payload;
			}else{
				$scope.alert(response.payload)
			}
		});
	}
	
}])
.factory('getResorts', ['$http', function($http) {		
	return function(requestObj, callBackFunc){
		console.log('@getResorts:');
		console.log('RequestObj: ',requestObj);
		$http({
			url : 'https://snowvation-someone516.c9.io/api/resorts',
			method: 'GET',
			params: requestObj
		})
		.success(function(data) {
			console.log('data: ',data);
			callBackFunc(data);
		})
		.error(function(err){
			console.log('Error: ',err);
		});
	}
}])
;