userProfile
	.controller('userProfileController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window','$commonService','$ionicPopup','$ionicLoading',
		function ($scope, $rootScope, $state, $ionicPlatform, $window,$commonService,$ionicPopup,$ionicLoading) {
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
				$scope.imgPath =$rootScope.userDataGuidance.path+'?dechae='+new Date().getTime();
				$scope.canEdit=false;
				$scope.photoEdit=false;
				$scope.text="Profile";
				/*console.log($scope.imgPath)*/
				//$('.userImage').attr("src",$scope.imgPath+'?dechae='+new Date().getTime());
				$scope.mobile=Number($scope.userData.Mobile);
				$scope.Email=$rootScope.userData.Email;
				$scope.Address=$rootScope.userData.Address;
				
				$scope.logout = function () {
					$state.go('login');
				}
				$scope.back = function () {
					$state.go('landing');
				}
				
				$scope.dateFormat=function(date){
					return $commonService.ddmmmyyy(date)
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
				  
				  var cameraOptions = {
					      quality: 50,
					      destinationType: Camera.DestinationType.DATA_URL,
					      sourceType: Camera.PictureSourceType.CAMERA,
					      allowEdit: true,
					      encodingType: Camera.EncodingType.JPEG,
					      targetWidth: 100,
					      targetHeight: 100,
					      popoverOptions: CameraPopoverOptions,
					      saveToPhotoAlbum: false,
						  correctOrientation:true
					    };
				$scope.openFile=function(){
					navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
				}
				function cameraSuccess(imageData) {
					 $scope.imgPath="data:image/jpeg;base64," + imageData;
					 $('.userImage').attr("src",$scope.imgPath);
					   console.log("data:image/jpeg;base64," + imageData)
					     console.log( imageData)
					     $scope.photoEdit=true;
				}

				function cameraError(message) {
				    console.log('Failed because: ' + message);
				    $scope.photoEdit=false;
				}
				$scope.updateCustomer=function(){
					//updateCustomer
					$scope.data={
							name:$rootScope.userData.Name,
							uname:$rootScope.userName,
							password:localStorage.getItem("password"),
							mobile:$scope.mobile,
							email:$("#email").val(),
							tel:$scope.mobile,
							address:$scope.Address,
							city:"",
							state:"",
							nation:"",
							area:"",
							crmType:$rootScope.userDataGuidance.crm
					}
					console.log($("#myFile"))
					var confirmPopup = $ionicPopup.confirm({
				     title: 'Update',
				     template: 'Are you sure to update!'
				   });
		
				   confirmPopup.then(function(res) {
				     if(res) {
				    	 
				    	 
							if($scope.photoEdit==true){
								$commonService.postHTTPData("upload/profile",{userId:$rootScope.userName,imageData:$scope.imgPath,crmType:$rootScope.userDataGuidance.crm})
						    	 .then(function(result){
						    		 console.log(result)
						    		 if(result.data.guidance.status=="1"){
						    			 
						    		 }
						    	 },function(error){
						    		 console.log(error)
									// $ionicLoading.hide();
									 $scope.showPopup("Unable to update profile photo.")
								});
							}
							$ionicLoading.show();
							$commonService.postHTTPData("updateCustomer",$scope.data)
							.then(function(result){
								 $ionicLoading.hide();
								 console.log(result);
								 if(result.data.Details.returnCode=="0"){
									 $scope.showPopup("Profile updated successfully");
									 $rootScope.userData.Email=$("#email").val();
									 $rootScope.userData.Mobile=$scope.Email;
									 $rootScope.userData.Address=$scope.Address;
									 $scope.canEdit=false;
									 $scope.text="Profile";
									 $commonService.getHTTPData("crm?customer="+localStorage.getItem("userName")+"&pword="+localStorage.getItem("password")+"")
							        	.then(function (result) {
							        		if(result.data.guidance.status==1){
							        			localStorage.setItem("userData",JSON.stringify(result.data.customerDetails));
							        			localStorage.setItem("userDataGuidance",JSON.stringify(result.data.guidance));
							        		}
							        		else
							        			$scope.showPopup(result.data.guidance.message)
							            }, function (error) {
							            	 $scope.showPopup("Please try after some time.")
							            });
								 }
								 
							},function(error){
								 $ionicLoading.hide();
								 $scope.showPopup("Please try after some time.")
							});
							
							
				     } else {
				       console.log('no');
				     }
				   });
					
				}
				$scope.edit=function(){
					$scope.canEdit=true;
					$scope.text="Edit Profile";
				}
				$scope.cancel=function(){
					$scope.canEdit=false;
					$scope.text="Profile";
					$("#email").val($rootScope.userData.Email);
					$scope.Email=$rootScope.userData.Email;
					$scope.imgPath =$rootScope.userDataGuidance.path;
					 $('.userImage').attr("src",$scope.imgPath);
					 $scope.photoEdit=false;
				}

		}])
 .filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  })