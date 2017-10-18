payments.controller('paymentsController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService',
	 '$interval', '$timeout','$commonService','$ionicLoading','$ionicPopup','ionicDatePicker','ionicTimePicker',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService,
				$interval, $timeout,$commonService,$ionicLoading,$ionicPopup,ionicDatePicker,ionicTimePicker) {
		//$('#net').prop('checked', true);
		//$('#pick').prop('checked', false);
		//$('input[name=rd]:checked').val('NETBANKING');
		 
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
					        $scope.quickPay();
					      }
					    },
					    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),   //Optional
					    format: 24,         //Optional
					    step: 1,           //Optional
					    setLabel: 'Set'    //Optional
					  };

					 
		
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				
				$scope.advanceCheck=function(){
				if($rootScope.userData.AccountStatus=='Inactive')
					 $scope.advance = false;
				else
					 $scope.advance = true;
				}
				$scope.advanceCheck();
				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					$state.go('landing');
				}
				$scope.advanceChange=function(){
					 if ($scope.advance) {
				            $scope.advance = false;
				        } else {
				            $scope.advance = true;
				        }
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
					console.log($scope.drop)
			        if ($scope.drop) {
			            $scope.drop = false;
			        } else {
			            $scope.drop = true;
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
			 $scope.clickedPaymentType=function(val){
				 //$scope.showPopup ($('input[name=rd]:checked').val());
				 
				 if($('input[name=rd]:checked').val()=='NETBANKING'){
					 var conf = $ionicPopup.confirm({
					      	title: 'Message',
					        template: 'Click on choose plan to Renew a new plan or Click on continue to go with Existing plan',
					        cancelText: 'Continue',
					        okText: 'Choose Plan'
					    });
					 conf.then(function(res) {
						 if(res) {
					    	 //console.log("Continue")//chooseplan
					    	 $state.go('choosePlan',{paymentType:$('input[name=rd]:checked').val()});
					    	 $rootScope.backUpgradePage="payments";
					     } else {
					       //console.log('no');//continue
					    	// $('input[name="rd"]').prop('checked', false);
					    	 
					    	 
					    	 $ionicLoading.show();
								$commonService.getHTTPData("getPlanDetails?plan="+$rootScope.userData.Plan+"&uname="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
						    	.then(function (result) {
						    		 $ionicLoading.hide();
						    		 console.log(result)
						    		if(result.data.guidance.status==1){
						    			$scope.planData=result.data.Details.PlanList[0];
						    			 $scope.showPaymentButton=true;
						    		}
						    		else
										 $scope.showPopup(result.data.guidance.message);
						        }, function (error) {
						        	 $ionicLoading.hide();
						        	 $state.go('landing')
						        	 $scope.planData=null;
						        });
						       
					     }
					    });
				 }
				 else{

						    //$scope.openDatePicker = function(){
						      ionicDatePicker.openDatePicker(schdularDatepicker);
						   // };
					 
				 }
				 
			 }
			  
			 
			 $scope.pay=function( ){
				
				 
					if($('input[name=rd]:checked').val()!="NETBANKING")
						 $scope.showPopup ("Please select Netbanking option");
					else{
						 if($('input[name=rd]:checked').val()=="NETBANKING"){
							 
							 if($rootScope.userData.AccountStatus=='Active' && $scope.advance==false)
							 {
							 	$scope.showPopup ("Please select advance renewal");
							 }
							 else{
								 $ionicLoading.show();
						    	 $scope.data="consumerID="+$rootScope.userData.CustomerID
						  			+"&ptype="+"Renew"//"Renew/Upgrade"
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
					        		 console.log(result)
					        		 if(result.data.message=="success"){
					        			 cordova.InAppBrowser.open(result.data.url, '_self', 'location=yes,disallowoverscroll=no,toolbar=yes');
					        			 $state.go('landing');
					        		 }
					        			// $state.go('billDesk',{url: result.data.url});
					        		 else{
					        			// $scope.showPopup("Please try after sometime.");
					        			 $scope.showPopup(result.data.message);
					        		 }
					        		 $scope.showPaymentButton=false;
					        		 $('input[name="rd"]').prop('checked', false);
					            }, function (error) {
					            	 $ionicLoading.hide();
					            	 console.log(error);
					            	 $scope.showPaymentButton=false;
					            	 $('input[name="rd"]').prop('checked', false);
					            	 $scope.advanceCheck()
					            });
							 }
					 }
					}
			 }
			 
			 $scope.quickPay=function(){
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
			    	 $('input[name="rd"]').prop('checked', false);
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
			       $scope.dateTime=null;
			       $scope.schduleDate=null;
			       $scope.schduleTimeH=null;
			       $scope.schduleTimeM=null;
			     }
			   });
			 }
			 //Code for Download Invoice
			 $scope.htmlDecode=function(input){
				  var e = document.createElement('div');
				  e.innerHTML = input;
				  return e.childNodes[0].nodeValue;
				}
			 
			 $scope.downloadInvoice=function(transactnNo,paymentMode){
				 console.log(transactnNo+""+paymentMode);
				 $ionicLoading.show();
					$commonService.getHTTPData("invoice?userName="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"&TransactionNo="+transactnNo+"&PaymentMode="+paymentMode+"")
		        	.then(function (result) {
		        		 $ionicLoading.hide();
		        		 console.log(result)
		        		 console.log($scope.htmlDecode(result.data.details.HTMLInvoice));
		        		 var doc = new jsPDF();
		        		 var specialElementHandlers = {
		        		     '#editor': function (element, renderer) {
		        		         return true;
		        		     }
		        		 };

		        		 doc.fromHTML("<h3>Hello, this is a H3 tag</h3>", 15, 15, {
		        		        'width': 170,
		        		        'elementHandlers': specialElementHandlers
		        		    });
		        		    doc.save('invoice.pdf');
//		        		if(result.data.guidance.status==1){
//		        			if(result.data.Details.Result=='NA')
//		        				$scope.showPopup("Alredy A Pickup Request has been raised!");
//		        			else
//		        				$scope.showPopup(result.data.Details.Result);
//		        		}
//		        		else 
//		        			$scope.showPopup(result.data.guidance.message);
		        		 
		            }, function (error) {
		            	 $ionicLoading.hide();
		            	 $scope.showPopup("Please try after some time.");
		            });
			 }
			 

			
		}]);