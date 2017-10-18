payments.controller('finallpaymentsController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService',
	 '$interval', '$timeout','$commonService','$ionicLoading','$ionicPopup','$stateParams','ionicDatePicker','ionicTimePicker',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService,
				$interval, $timeout,$commonService,$ionicLoading,$ionicPopup,$stateParams,ionicDatePicker,ionicTimePicker) {
			var schdularDatepicker = {
			      callback: function (val) {  //Mandatory
			        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
			        $scope.schduleDate=new Date(val);
			        ionicTimePicker.openTimePicker(schdularTimepicker);
			      },
			      from: new Date(2012, 1, 1),
			        to: new Date(2058, 10, 30),
			        inputDate: new Date(),
			        mondayFirst: true,
			        disableWeekdays: [],
			        closeOnSelect: false,
			        templateType: 'popup'       //Optional
			    };
				
				var schdularTimepicker = {
					    callback: function (val) {      //Mandatory
					      if (typeof (val) === 'undefined') {
					        console.log('Time not selected');
					      } else {
					        var selectedTime = new Date(val * 1000);
					        //console.log('Selected epoch is : ', val, 'and the time is ', , 'H :', , 'M');
					        $scope.schduleTimeH=selectedTime.getUTCHours();
					        $scope.schduleTimeM=selectedTime.getUTCMinutes();
					        $scope.qucikPayment();
					      }
					    },
					    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),   //Optional
					    format: 24,         //Optional
					    step: 1,           //Optional
					    setLabel: 'Set'    //Optional
					  };

				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				if($stateParams.paymentType=='NETBANKING')
					$scope.paymentType='NETBANKING';
				
				if($rootScope.userData.AccountStatus=='Inactive')
					 $scope.advance = false;
				else
					 $scope.advance = true;
				$scope.planData=$stateParams.plan;
				
				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					var confirmPopup = $ionicPopup.confirm({
					     title: 'Warning',
					     template: 'Are you sure to close the session!'
					   });
					   confirmPopup.then(function(res) {
					     if(res) {
					    	 $state.go('landing');
					     } else {
					       console.log('no');
					     }
					   });
				}
				
				$ionicLoading.show();
				$commonService.getHTTPData("paymentHistory?user="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
	        	.then(function (result) {
	        		 $ionicLoading.hide();
	        		if(result.data.guidance.status==1){
	        			$scope.paymentHistory=result.data.Details.paymentDetails;
	        		}
	        		else 
	        			$scope.showPopup(result.data.guidance.message)
	            }, function (error) {
	            	 $ionicLoading.hide();
	            	 $scope.showPopup("Please try after some time.")
	            });
				
				$scope.dateFormat=function(date){
					return $commonService.ddmmmyyy(date)
				}
				$scope.slideDown = function () {
					 
			        if ($scope.drop) {
			            $scope.drop = false;
			        } else {
			            $scope.drop = true;
			        }
				}
				$scope.advanceChange=function(){
					 if ($scope.advance) {
				            $scope.advance = false;
				        } else {
				            $scope.advance = true;
				        }
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
			 $scope.pay=function(){
				if($('input[name=rd]:checked').val()==undefined)
					 $scope.showPopup ("Please select a payment method");
				else{
					 if($('input[name=rd]:checked').val()=='NETBANKING'){
						 if($rootScope.userData.AccountStatus=='Active' && $scope.advance==false)
							 {
							 	$scope.showPopup ("Please select advance renewal");
							 }
						 else{
							 $ionicLoading.show();
					    	 $scope.data="consumerID="+$rootScope.userData.CustomerID
					  			+"&ptype="+$stateParams.ptype//"Renew/Upgrade"
					  			+"&userName="+$rootScope.userName
					  			+"&name="+$rootScope.userData.Name
					  			+"&email="+$rootScope.userData.Email
					  			+"&mobile="+$rootScope.userData.Mobile
					  			+"&address=''"
					  			+"&planID="+$scope.planData.ID
					  			+"&validity="+$scope.planData.Validity
					  			+"&crm="+$rootScope.userDataGuidance.crm
					  			+"&planName="+$scope.planData.NAME
					  			+"&AdvanceRenewal="+$scope.advance
						  $commonService.getHTTPData("initiateTransaction?"+ $scope.data)
				        	.then(function (result) {
				        		 $ionicLoading.hide();
				        		 if(result.data.message=="success"){
				        			 cordova.InAppBrowser.open(result.data.url, '_self', 'location=yes');
				        			 $state.go('landing');
				        		 }
				        			// $state.go('billDesk',{url: result.data.url});
				        		 else{
				        			 //$scope.showPopup("Please try again.");
				        			 $scope.showPopup(result.data.message);
				        		 }
				        			 //window.open(result.data.url, 'blank');
				        		
				            }, function (error) {
				            	 $ionicLoading.hide();
				            	 console.log(error)
				            });
						 }
					 }
				 
				 else{
					 
			    	 //$('input[name="rd"]').prop('checked', false);
					 ionicDatePicker.openDatePicker(schdularDatepicker);
			    	 /**/
				 }
				}
			 }
			 $scope.clickedPaymentType=function(val){
				
			 }
			 $scope.qucikPayment=function(){
				 $scope.dateTime=$commonService.yyyymmddhms($scope.schduleDate,$scope.schduleTimeH,$scope.schduleTimeM);
				   $scope.text=$commonService.getFormatDateTime($scope.schduleDate,$scope.schduleTimeH,$scope.schduleTimeM);
				   var customTemplate =
					      '<span>Your scheduled date and time is :<b>'+$scope.text+'</b></span>' +
					      '<br><label>Are you sure to make quick payment!</label>';	  
					   var confirmPopup = $ionicPopup.confirm({
						     title: 'Confirmation',
						     template: customTemplate 
						   });
		
				   confirmPopup.then(function(res) {
				     if(res) { 
						 $ionicLoading.show();
							$commonService.getHTTPData("quickPaymentRequest?user="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"&date="+$scope.dateTime+"")
				        	.then(function (result) {
				        		 $ionicLoading.hide();
				        		 console.log(result)
				        		if(result.data.guidance.status==1){
				        			if(result.data.Details.Result=='NA')
				        				$scope.showPopup("Alredy A Pickup Request has been raised!");
				        			else
				        				$scope.showPopup(result.data.Details.Result);
				        			
				        		}
				        		else 
				        			$scope.showPopup(result.data.guidance.message);
				        		 $state.go('landing');
				            }, function (error) {
				            	 $ionicLoading.hide();
				            	 $scope.showPopup("Please try after some time.");
				            	 
				            });
				     } else {
					       console.log('no');
					       $state.go('landing');
					     }
				   });
			 }
		}]);
		
		
//		var confirmPopup = $ionicPopup.confirm({
//		     title: 'Confirmation',
//		     template: 'Are you sure to make quick payment!'
//		   });
//
//		   confirmPopup.then(function(res) {
//		     if(res) {
//		     } else {
//			       console.log('no');
//			       $('input[name="rd"]').prop('checked', false);
//			       
//			     }
//		   });