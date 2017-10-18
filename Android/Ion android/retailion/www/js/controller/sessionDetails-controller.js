usageStatistics
	.controller('sessionDetailsController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window','$commonService',
	 '$ionicLoading','$ionicPopup','$stateParams','ionicDatePicker',
		function ($scope, $rootScope, $state, $ionicPlatform, $window
				,$commonService,$ionicLoading,$ionicPopup,$stateParams,ionicDatePicker) {
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;

				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
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
				
				$scope.viewSessionDetails-function(){
					$ionicLoading.show();
//					$commonService.getHTTPData("viewSessionDetails?userName="+$rootScope.userName+"&subscriberId=&fromDate=2017-04-01&toDate=2017-06-01& pageNo=1&pageSize=10&crmType=hcrm" +
//							"user=&crmType="+$rootScope.userDataGuidance.crm+"")
//		        	.then(function (result) {
//		        		$ionicLoading.hide();
//		        		if(result.data.guidance.status==1){
//		        			$scope.usageDetails=result.data.Details;
//		        		}
//		        		else 
//		        			$scope.showPopup(result.data.guidance.message)
//		            }, function (error) {
//		            	 $ionicLoading.hide();
//		            	 $scope.showPopup("Server is down!Please try after some time.")
//		            });
				}
				
//					
//					$scope.form={
//							fromDate:$commonService.ddmmmyyy(new Date())
//							};
//					
//					$scope.showFromdate=function(){
//						
//						datePicker.show({
//						    date: new Date($scope.form.fromDate),
//						    mode: 'date'
//						}, function(date){
//							console.log($commonService.ddmmmyyy(date))
//							$scope.form.fromDate=$commonService.ddmmmyyy(date);
//						}, function(err){
//							
//						});
//						$scope.form.fromDate=$scope.form.fromDate;
//					}
				
				$scope.fromDate=$commonService.ddmmmyyy(new Date())
				var schdularDatepicker = {
					      callback: function (val) {  //Mandatory
					        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
					        $scope.fromDate=$commonService.ddmmmyyy(val)
					       
					      },
					      from: new Date(2012, 1, 1),
					        to: new Date(2058, 10, 30),
					        inputDate:new Date($scope.fromDate),
					        mondayFirst: true,
					        disableWeekdays: [],
					        closeOnSelect: true,
					        templateType: 'popup',       //Optional
					        showTodayButton: false
					    };
				$scope.showFromdate=function(){
					ionicDatePicker.openDatePicker(schdularDatepicker);
				}
					

		}]);