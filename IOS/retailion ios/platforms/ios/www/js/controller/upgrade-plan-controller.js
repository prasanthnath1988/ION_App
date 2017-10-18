var ion=angular.module('ION');
ion.controller('upgradePlanController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService', '$interval',
	 '$timeout','$commonService','$ionicLoading','$ionicPopup','$stateParams',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService, $interval,
				$timeout,$commonService,$ionicLoading,$ionicPopup,$stateParams) {
			 $scope.header=$stateParams.type;
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				 $ionicLoading.show();
//				$commonService.getHTTPData("loadUpgradePlans?plan="+$rootScope.userData.Plan+"&uname="+$rootScope.userName+"&crmType=hcrm")
//	        	.then(function (result) {
//	        		 $ionicLoading.hide();
//	        		$scope.result=result.data;
//	        		if($scope.result.guidance.status==1){
//	        			$scope.planList=$scope.result.Details.PlanList
//	        			console.log($scope.planList)
//	        		}
//	        		else
//	        			$scope.showPopup(result.data.guidance.message);
//	        		
//	            }, function (error) {
//	            	 $ionicLoading.hide();
//	            	console.log(error)
//	            });
				
				 
//				 if($stateParams.plan=='getAllPlan')
					 //$scope.url="loadPlans?"; 
//				 else if($stateParams.plan=='singlePlan')
//					 $scope.url="getPlanDetails?plan="+$rootScope.userData.Plan
			
				 if($stateParams.type=="Renew")
					 $scope.url="loadPlans?"; 
				 else if($stateParams.type=='Upgrade')
					 $scope.url="loadUpgradePlans?"; 
				//$scope.url="loadUpgradePlans?plan="+$rootScope.userData.Plan; 
				$commonService.getHTTPData($scope.url+"&uname="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
	        	.then(function (result) {
	        		 $ionicLoading.hide();
	        		$scope.result=result.data;
	        		if($scope.result.guidance.status==1){
	        			$scope.planList=$scope.result.Details.PlanList
	        			console.log($scope.planList)
	        		}
	        		else
	        			$scope.showPopup(result.data.guidance.message);
	        		
	            }, function (error) {
	            	 $ionicLoading.hide();
	            	console.log(error)
	            });
				
				
				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					if($rootScope.backUpgradePage=='payments')
						$state.go('payments');
					else if($rootScope.backUpgradePage=='landing')
						$state.go('landing');
					else if($rootScope.backUpgradePage=='usageStatistics')
						$state.go('usageStatistics');
					else
						$state.go('subscription');
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
				  $scope.buy=function(p){//userDataGuidance
					  console.log(p);
					  if(p!=null)
						  $state.go('finalPayment',{plan: p,ptype:$stateParams.type});
					  else
						  $scope.showPopup("Please select a plan")
				  }
		}]);