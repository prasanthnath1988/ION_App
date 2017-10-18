var ion=angular.module('ION');
ion.controller('supportController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService',
	 '$interval', '$timeout','$commonService','$ionicLoading','$ionicPopup',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService,
				$interval, $timeout,$commonService,$ionicLoading,$ionicPopup) {
		 
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				$scope.complainSuccess=null;

				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					$state.go('landing');
				}
				$scope.viewResult = false;
				$scope.submitTicket = function () {
					$scope.viewResult = true;

				}
				
				// Load Complain category
				 $ionicLoading.show();
				$commonService.getHTTPData("loadReasons?crmType=hcrm")
	        	.then(function (result) {
	        		 $ionicLoading.hide();
	        		if(result.data.guidance.status==1){
	        			$scope.complaintType=result.data.Details.ReasonList;
	        		}
	        		else  
	        			$scope.showPopup(result.data.guidance.message)
	            }, function (error) {
	            	 $ionicLoading.hide();
	            	 $scope.showPopup("Server is down!Please try after some time.")
	            });
				// Load complain history
				
				 $ionicLoading.show();
				$commonService.getHTTPData("complaintHistory?user="+$rootScope.userName+"&crmType=hcrm")
	        	.then(function (result) {
	        		 $ionicLoading.hide();
	        		if(result.data.guidance.status==1){
	        			$scope.complainHostiry=result.data.Details.ComplainHistorys;
	        		}
	        		else  
	        			$scope.showPopup(result.data.guidance.message)
	            }, function (error) {
	            	 
	            	 $ionicLoading.hide();
	            	 $scope.showPopup("Server is down!Please try after some time.")
	            });
				
				$scope.submitTicket=function(){
					 $ionicLoading.show();
					$commonService.getHTTPData("registerComplaint?title=complaint&uname="+$rootScope.userName+"&reason="+$('#selectComplain').val()+"&remarks="+$('#message').val()+"&crmType=hcrm")
		        	.then(function (result) {
		        		 $ionicLoading.hide();
		        		 console.log(result)
		        		if(result.data.guidance.status==1){
		        			$scope.complainSuccess=result.data.Details;
		        			$scope.cancel();
		        		}
		        		else 
		        			$scope.showPopup(result.data.guidance.message)
		            }, function (error) {
		            	$ionicLoading.hide();
		            	 $scope.showPopup("Server is down!Please try after some time.")
		            	 
		            });
				}
				$scope.closeSuccess=function(){
					$scope.complainSuccess=null;
				}
				$scope.cancel=function(){
					$('#message').val("");
					$('#selectComplain').val("")
				}
				$scope.dateFormat=function(date){
					return $commonService.ddmmmyyy(date)
				}
				$scope.slideDown = function () {
					console.log($scope.drop)
			        if ($scope.drop) {
			            $scope.drop = false;
			        } else {
			            $scope.drop = true;
			        }
				}
				$scope.giveRating=function(p){
					$state.go('supportSuccessful',{details:p});
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
				
		}]);