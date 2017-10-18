login
.controller('loginController',
	['$scope','$rootScope','$state','$ionicPlatform','$window','$ionicPopup',
	 '$commonService','$ionicLoading',
	function ($scope,$rootScope,$state,$ionicPlatform,$window,$ionicPopup,$commonService,$ionicLoading) {
		 
			$scope.contentHeight = $window.innerHeight-92;
			
			$scope.showPopup = function(msg) {
			    var alertPopup = $ionicPopup.alert({
			      title: 'Message',
			      template: msg
			    });
			    alertPopup.then(function(res) {
			      //console.log('Thank you for not eating my delicious ice cream cone');
			    });
			  };
			  localStorage.removeItem("userData");
				localStorage.removeItem("userDataGuidance");
				localStorage.removeItem("userName");
			$scope.login = function() {
				//console.log("crm?customer="+$scope.ucode+"&pword="+$scope.upassword+"")
				if($("#ucode").val()=='' || $("#ucode").val()==undefined 
						|| $("#upassword").val()=='' || $("#upassword").val()==undefined )
					$scope.showPopup("Please enter username or password")
				else{
					$ionicLoading.show();
					//$commonService.getHTTPData("crm?customer=deepakrao1985&pword=deepakrao1985")
					 $commonService.getHTTPData("crm?customer="+$("#ucode").val()+"&pword="+$("#upassword").val()+"")
		        	.then(function (result) {
		        		 $ionicLoading.hide();
		        		if(result.data.guidance.status==1){
		        			localStorage.setItem("userData",JSON.stringify(result.data.customerDetails));
		        			localStorage.setItem("userDataGuidance",JSON.stringify(result.data.guidance));
		        			localStorage.setItem("userName",$("#ucode").val());
		        			localStorage.setItem("password",$("#upassword").val());
		        			//localStorage.setItem("planData",JSON.stringify());
		        			$state.go('landing');
		        		}
		        		else
		        			$scope.showPopup(result.data.guidance.message)
		            }, function (error) {
		            	 $scope.showPopup("Server is down!Please try after some time.")
		            	 $ionicLoading.hide();
		            });
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
			}
		 
} ]);

