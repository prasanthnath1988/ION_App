subscription
	.controller('subscriptionController',
	['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', 'roundProgressService',
	 '$interval', '$timeout','$ionicLoading','$commonService','$ionicPopup',
		function ($scope, $rootScope, $state, $ionicPlatform, $window, roundProgressService,
				$interval, $timeout,$ionicLoading,$commonService,$ionicPopup) {
			 
				$scope.contentHeight = $window.innerHeight - 92;
				$scope.contentWidth = $window.innerWidth;
console.log($rootScope.userData)

				$scope.logout = function () {
					$state.go('login');
					localStorage.removeItem("userData");
					localStorage.removeItem("userDataGuidance");
					localStorage.removeItem("userName");
				}
				$scope.back = function () {
					$state.go('landing');
				}

				$scope.current = $rootScope.userData.UsedDays;//30;
				$scope.max = Number($rootScope.userData.UsedDays)+Number($rootScope.userData.RemainingDays);//90;
				$scope.offset = 0;
				$scope.timerCurrent = 0;
				$scope.uploadCurrent = 0;
				$scope.stroke = 8;
				$scope.radius = 75;
				$scope.isSemi = false;
				$scope.rounded = false;
				$scope.responsive = false;
				$scope.clockwise = true;
				$scope.currentColor = '#FF6B01';
				$scope.bgColor = '#01A7E1';
				$scope.duration = 800;
				$scope.currentAnimation = 'easeOutCubic';
				$scope.animationDelay = 0;

				$scope.increment = function (amount) {
					$scope.current += (amount || 1);
				};

				$scope.decrement = function (amount) {
					$scope.current -= (amount || 1);
				};

				$scope.animations = [];

				angular.forEach(roundProgressService.animations, function (value, key) {
					$scope.animations.push(key);
				});

				$scope.getStyle = function () {
					var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

					return {
						'top': $scope.isSemi ? 'auto' : '56%',
						'bottom': $scope.isSemi ? '5%' : 'auto',
						'left': '50%',
						'transform': transform,
						'-moz-transform': transform,
						'-webkit-transform': transform,
						'font-size': $scope.radius / 3.5 + 'px'
					};
				};

				$scope.getColor = function () {
					return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
				};

				$scope.showPreciseCurrent = function (amount) {
					$timeout(function () {
						if (amount <= 0) {
							$scope.preciseCurrent = $scope.current;
						} else {
							var math = $window.Math;
							$scope.preciseCurrent = math.min(math.round(amount), $scope.max);
						}
					});
				};

				var getPadded = function (val) {
					return val < 10 ? ('0' + val) : val;
				};
				
				// Setup the loader
				
				 
				/* $scope.getPlan=function(){
					 $ionicLoading.show();
						$commonService.getHTTPData("getPlanDetails?plan="+$rootScope.userData.Plan+"&uname="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
				    	.then(function (result) {
				    		 $ionicLoading.hide();
				    		if(result.data.guidance.status==1){
				    			$scope.planData=result.data.Details.PlanList[0];
				    		}
				    		else{
				    			$scope.showPopup(result.data.guidance.message);
				    		}
				    		
				        }, function (error) {
				        	 $ionicLoading.hide();
				        	 $state.go('landing')
				        	 $scope.planData=null;
				        });
				 }*/
				$scope.upgradePlan=function(){
					$state.go('upgradePlan',{plan: 'getAllPlan',type:'Upgrade'});
					$rootScope.backUpgradePage='subscription';
				}
				$scope.renewPlan=function(){
					
					var conf = $ionicPopup.confirm({
				      	title: 'Message',
				        template: 'Click on choose plan to Renew a new plan or Click on continue to go with Existing plan',
				        cancelText: 'Continue',
				        okText: 'Choose Plan'
				    });
				 conf.then(function(res) {
					 if(res) {
				    	 //console.log("Continue")//chooseplan
						 $state.go('upgradePlan',{plan: 'getAllPlan',type:'Renew'});
				     } else {
				    	 $ionicLoading.show();
							$commonService.getHTTPData("getPlanDetails?plan="+$rootScope.userData.Plan+"&uname="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
					    	.then(function (result) {
					    		 $ionicLoading.hide();
					    		if(result.data.guidance.status==1){
					    			$scope.planData=result.data.Details.PlanList[0];
					    			$state.go('finalPayment',{plan: $scope.planData,ptype:"Renew"});
					    		}
					    		else{
					    			$scope.showPopup(result.data.guidance.message);
					    		}
					    		
					        }, function (error) {
					        	 $ionicLoading.hide();
					        	 $state.go('landing')
					        	 $scope.planData=null;
					        });
				     }
				    });
					
					$rootScope.backUpgradePage='subscription';
				}
				$scope.formatGB=function(data){
					return (parseFloat(Number(data)/1000)).toFixed(2);
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