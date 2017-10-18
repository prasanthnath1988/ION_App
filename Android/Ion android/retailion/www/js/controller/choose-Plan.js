var ion=angular.module('ION');
ion.controller('choosePlanController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService', '$interval',
	 '$timeout','$commonService','$ionicLoading','$ionicPopup','$stateParams',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService, $interval,
				$timeout,$commonService,$ionicLoading,$ionicPopup,$stateParams) {
		
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				$scope.url="loadPlans?";
				 $ionicLoading.show();
				$commonService.getHTTPData($scope.url+"&uname="+$rootScope.userName+"&crmType=hcrm")
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
					localStorage.removeItem("userData");
					localStorage.removeItem("userDataGuidance");
					localStorage.removeItem("userName");
				}
				$scope.back = function () {
						$state.go('payments');
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
				  $scope.convertToMB=function(val){
					  return  (val / (1024*1024)).toFixed(2);
				  }
				  $scope.buy=function(p){//userDataGuidance
					  $state.go('finalPayment',{plan: p,ptype:"Renew",paymentType:$stateParams.paymentType});
				  }
//					  $scope.data="consumerID="+$rootScope.userData.CustomerID
//					  			+"&ptype="+$stateParams.type//"Renew/Upgrade"
//					  			+"&userName="+$rootScope.userName
//					  			+"&name="+$rootScope.userData.Name
//					  			+"&email="+$rootScope.userData.Email
//					  			+"&mobile="+$rootScope.userData.Mobile
//					  			+"&address="+$rootScope.userData.Address
//					  			+"&planID="+p.ID
//					  			+"&validity="+p.Validity
//					  			+"&crm="+$rootScope.userDataGuidance.crm
//					  			+"&planName="+p.NAME
//					  			+"&AdvanceRenewal=false"
//					  $commonService.getHTTPData("initiatePayment?"+ $scope.data)
//			        	.then(function (result) {
//			        		 $ionicLoading.hide();
//			        		
//			        			console.log(result)
//			        			$scope.showPopup(JSON.stringify(result))
//			        		
//			            }, function (error) {
//			            	 $ionicLoading.hide();
//			            	console.log(error)
//			            });
//				  }
		}]);