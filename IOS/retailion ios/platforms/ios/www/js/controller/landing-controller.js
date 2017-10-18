landing
.controller('landingController',
	['$scope','$rootScope','$state','$window','$ionicPopup','$ionicSideMenuDelegate',
	 '$ionicPopup','$ionicLoading','$commonService',
	function ($scope,$rootScope,$state,$window,$ionicPopup,$ionicSideMenuDelegate,$ionicPopup,$ionicLoading,$commonService) {
		
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
				$commonService.getHTTPData("crm?customer="+localStorage.getItem("userName")+"&pword="+localStorage.getItem("password")+"")
		    	.then(function (result) {
		    		$ionicLoading.hide();
		    		 localStorage.setItem("firstLoad",'N');
		    		if(result.data.guidance.status==1){
		    			localStorage.setItem("userData",JSON.stringify(result.data.customerDetails));
		    			localStorage.setItem("userDataGuidance",JSON.stringify(result.data.guidance));
		    		}
		    		else
		    			$scope.showPopup(result.data.guidance.message)
		        }, function (error) {
		        	$ionicLoading.hide();
		        	 $scope.showPopup("Unable to update user data.")
		        });
		
			$rootScope.backButton="";
			$rootScope.userName=localStorage.getItem("userName");
			$rootScope.userData=JSON.parse(localStorage.getItem("userData"));
			$rootScope.userDataGuidance=JSON.parse(localStorage.getItem("userDataGuidance"));
			console.log($rootScope.userData);
			console.log($rootScope.userDataGuidance)
			$scope.imgPath =$rootScope.userDataGuidance.path;
			
			$('.userImage').attr("src","");
			if($scope.imgPath=='NA')
				$('.userImage').attr("src","img/userImage.jpg");
			else{
				$('.userImage').attr("src",$scope.imgPath+'?dechae='+new Date().getTime());
				//$('#userImageSideMenu').attr("src",$scope.imgPath+'?'+new Date().getTime());
			}
				
			
			$scope.contentHeight = $window.innerHeight-92;
			$scope.contentWidth = $window.innerWidth;

			$scope.toggleLeft = function() {
				$ionicSideMenuDelegate.toggleLeft();
			};

			$scope.dashboard = function(){
				$state.go('dashboard');
			}
			$scope.assignExcavator = function(){
				$state.go('assignExcavator');
			}
			$scope.logout = function(){
				$state.go('login');
				localStorage.removeItem("userData");
				localStorage.removeItem("userDataGuidance");
				localStorage.removeItem("userName");
			}
			$scope.subscription = function(){
				$state.go('subscription');
			}
			$scope.payments = function(){
				$state.go('payments');
			}
			$scope.usage = function(){
				$state.go('usageStatistics');
			}
			$scope.upgradePlan=function(){
				$state.go('upgradePlan',{plan: 'getAllPlan',type:'Upgrade'});
				$rootScope.backUpgradePage='landing';
				
			}
			$scope.support=function(){
				$state.go('support');
				
			}

} ])
 .filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  })


