walkthrough
.controller('walkthroughController',
	['$scope','$rootScope','$state','$ionicPlatform','$window',
	function ($scope,$rootScope,$state,$ionicPlatform,$window) {
		 
			$scope.contentHeight = $window.innerHeight-92;
			$scope.sliderBg = 'img/slider-bg1.jpg';
			$scope.slideHasChanged = function(ind) {
				if(ind == 0){
					$scope.sliderBg = 'img/slider-bg1.jpg';
				}
				else if (ind ==1){
					$scope.sliderBg = 'img/slider-bg2.jpg';
				}
				else if (ind ==2){
					$scope.sliderBg = 'img/slider-bg3.jpg';
				}
				else if (ind ==3){
					$scope.sliderBg = 'img/slider-bg4.jpg';
				}
			}


//			$scope.login = function() {
//				$state.go('login');
//			}
			$scope.login=function(){
		   		localStorage.setItem("newUser", "N");
		   		$state.go('login');
		   }
		
} ]);

