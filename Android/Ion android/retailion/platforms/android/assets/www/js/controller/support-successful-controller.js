supportSuccessful
	.controller('supportSuccessfulController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService',
	 '$interval', '$timeout','$stateParams','$commonService','$ionicLoading','$ionicPopup',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService,
				$interval, $timeout,$stateParams,$commonService,$ionicLoading,$ionicPopup) {
			 
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				$scope.starRate = 0;
				console.log($stateParams.details)
				
				$scope.data=$stateParams.details;
				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					$state.go('support');
				}
				$scope.viewResult = false;
				$scope.submitTicket = function () {
					$scope.viewResult = true;

				}
				$scope.rateExp = function (val) {
					$scope.starRate = val;
				console.log($scope.starRate);
					
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
				$scope.setRating=function(){
					$ionicLoading.show();
					$commonService.getHTTPData("submitFeedBack?uname="+$rootScope.userName+"&ticketNo="+$scope.data.TicketNumber+"&ratings="+$scope.starRate+"&comments=good&crmType=hcrm")
		        	.then(function (result) {
		        		 $ionicLoading.hide();
		        		if(result.data.guidance.status==1){
		        			 $scope.showPopup("Thanks for your valuable ratings!");
		        			 $state.go('support');
		        		}
		        		else  
		        			$scope.showPopup(result.data.guidance.message);
		        		
		            }, function (error) {
		            	 $ionicLoading.hide();
		            	 $scope.showPopup("Please try after some time.")
		            });
					
				}
				$scope.formatDate=function(d){
					return $commonService.dateFormated(d);
				}
 
		}]);