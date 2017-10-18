ion
.controller('aboutusController',
	['$scope','$rootScope','$state','$ionicPlatform','$window','$ionicLoading','$commonService','$ionicPopup',
	function ($scope,$rootScope,$state,$ionicPlatform,$window,$ionicLoading,$commonService,$ionicPopup) {
	 
			$scope.contentHeight = $window.innerHeight-92;
			$scope.contentWidth = $window.innerWidth;


			$scope.groups = [
				{ name: 'Help section title comes here1. if more come?', id: 1, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Donec blandit feugiat aliquam. Nulla imperdiet ullamcorper libero, et elementum risus mollis vitae. Etiam egestas gravida felis eu vulputate.</p>'},
				{ name: 'Help section title comes here2.', id: 2, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Donec blandit feugiat aliquam. Nulla imperdiet ullamcorper libero, et elementum risus mollis vitae. Etiam egestas gravida felis eu vulputate.</p>'},
				{ name: 'Help section title comes here3.', id: 3, content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Donec blandit feugiat aliquam. Nulla imperdiet ullamcorper libero, et elementum risus mollis vitae. Etiam egestas gravida felis eu vulputate.</p>'}
			];
			$scope.toggleGroup = function(group) {
				if ($scope.isGroupShown(group)) {
				$scope.shownGroup = null;
				} else {
				$scope.shownGroup = group;
				}
			};
			$scope.isGroupShown = function(group) {
				return $scope.shownGroup === group;
			};
			$scope.logout = function(){
				$state.go('login');
			}
			$scope.back = function(){
				$state.go('landing');
			}
			$scope.showPopup = function(msg) {
			    var alertPopup = $ionicPopup.alert({
			      title: 'Message',
			      template: msg
			    });
			    alertPopup.then(function(res) {
			      //console.log('Thank you for not eating my delicious ice cream cone');
			    });
			  };
			 $ionicLoading.show();
				$commonService.getHTTPData("aboutUs")
	        	.then(function (result) {
	        		 $ionicLoading.hide();
	        		 if(result.data.guidance.status=='1'){
	        			 $scope.about=result.data.details;
	        		 }
	        		/*$scope.result=result.data;
	        		if($scope.result.guidance.status==1){
	        			$scope.help=$scope.result.details;
	        			
	        		}
	        		else
	        			$scope.showPopup(result.data.guidance.message);*/
	        		
	            }, function (error) {
	            	 $ionicLoading.hide();
	            	 $scope.showPopup("Please try after sometime");
	            });
 
} ]);