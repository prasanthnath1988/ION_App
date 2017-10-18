sideMenu
.controller('sideMenuController',
	['$scope','$rootScope','$state','$ionicPlatform','$window','$ionicSideMenuDelegate','$location',
	function ($scope,$rootScope,$state,$ionicPlatform,$window,$ionicSideMenuDelegate,$location) {
		 
			$scope.contentHeight = $window.innerHeight-92;
			$scope.contentWidth = $window.innerWidth;
			$scope.imgPath =$rootScope.userDataGuidance.path+'?dechae='+new Date().getTime();
			console.log($scope.imgPath)
			//$('.userImage').attr("src",$scope.imgPath);
			//$('.userImage').attr("src",$scope.imgPath+'?dechae='+new Date().getTime());
			if($scope.imgPath=='NA')
				$scope.imgPath="img/userImage.jpg";
			$scope.toggleLeft = function() {
				$ionicSideMenuDelegate.toggleLeft();
			};
			$scope.help = function(){
				$state.go('help');
			}
			$scope.alert = function(){
				$state.go('alert');
			}
			$scope.offer = function(){
                $state.go('offer');
            }
			$scope.profile = function(){
				$state.go('userProfile');
			}
			$scope.aboutus = function(){
				$state.go('aboutus');
			}
} ])
 .filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  })

