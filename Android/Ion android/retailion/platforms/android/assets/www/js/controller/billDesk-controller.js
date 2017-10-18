ion
.controller('billDeskController',
	['$scope','$rootScope','$state','$ionicPlatform','$window','$stateParams',
	function ($scope,$rootScope,$state,$ionicPlatform,$window,$stateParams) {
	 
			//$scope.contentHeight = $window.innerHeight-92;
			//$scope.contentWidth = $window.innerWidth;
			//$scope.url="https://www.google.co.in/?gws_rd=ssl";
			//$scope.url=$stateParams.url;
		document.getElementById("objBill").setAttribute('data', $stateParams.url);	
			/*function changeData(newURL) {
			    if(!document.getElementById("objBill")) 
			        return false;
			    document.getElementById("objBill").setAttribute('data', '"https://www.google.co.in/?gws_rd=ssl"');
			}

			window.onload = changeData;*/
			$scope.back = function(){
				$state.go('landing');
			}
} ]);