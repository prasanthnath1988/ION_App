usageStatistics
	.controller('usageStatisticsController',
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
				  $scope.formatGB=function(data){
					  if(data == "NA")
						  return 0;
					  else if(data == "Unlimited")
						  return "Unlimited";
					  else
						return (parseFloat(Number(data)/1000)).toFixed(2)+" GB";
					}
				  
			  $scope.upgradePlan=function(){
					$state.go('upgradePlan',{plan: 'getAllPlan',type:'Upgrade'});
					$rootScope.backUpgradePage='usageStatistics';
				}
				$ionicLoading.show();
				$commonService.getHTTPData("dataUsageHistory?user="+$rootScope.userName+"&crmType="+$rootScope.userDataGuidance.crm+"")
	        	.then(function (result) {
	        		$ionicLoading.hide();
	        		if(result.data.guidance.status==1){
	        			$scope.usageDetails=result.data.Details;
	        		}
	        		else 
	        			$scope.showPopup(result.data.guidance.message)
	            }, function (error) {
	            	 $ionicLoading.hide();
	            	 $scope.showPopup("Please try after some time.")
	            });
				
				$scope.generateChart=function(){
					
					$scope.chartConfig = {
				            
				             title: {
				                text: 'Usage Details'
				            }, 
				            subtitle: {
				                text: ''
				            },
				            legend: {
				                enabled: false
				            },
				            xAxis: {
				                
				                labels : { y : 10, rotation: -90, align: 'right'},
				                categories: $scope.usageDates
				            },
				            yAxis: { 
				            	title: { text: 'Usage In MB' },
				            	labels: {
				            		enabled: false
				            	},
				            },
				          
				            tooltip: { valueSuffix: ' MB' },
				            legend: { align: 'center', verticalAlign: 'top', borderWidth: 0,  x: -10, y: 20},
				               plotOptions: {
				                area: {
				                    fillColor: {
				                        color:'green',
				                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
				                         stops: [
				                        [0, '#ff9b23'],
				                        [1, '#f4f4f4']
				                    ]
				                    },
				                    marker: {
				                        radius: 5
				                    },
				                    lineWidth: 1,
				                    states: {
				                        hover: {
				                            lineWidth: 1
				                        }
				                    },
				                    threshold: null
				                }
				            },
				            
				            series: [{
				              type:'area',
				              color:'#ff9b23',
				              name:'Usage',
				              data: $scope.usageData
				            }]
				    };
					console.log($scope.chartConfig)
				};
				$scope.fromDate=$commonService.nextWeek()//"2017-07-01";
				$scope.toDate=$commonService.yyyymmdd(new Date())//"2017-07-14";
				  $scope.showChart=true;
				$scope.getChartData=function(){
					//$commonService.getHTTPData("viewSessionDetails?userName="+$rootScope.userName+"&subscriberId="+$rootScope.userData.CustomerID+"&fromDate="+$scope.fromDate+"&toDate="+$scope.toDate+"&pageNo=1&pageSize=10&crmType="+$rootScope.userDataGuidance.crm+"")
					$commonService.getHTTPData("dayWiseUsageDetails?userName="+$rootScope.userName+"&fromDate="+$scope.fromDate+"&toDate="+$scope.toDate+"&crmType="+$rootScope.userDataGuidance.crm+" ")
					.then(function (result) {
		        		$ionicLoading.hide();
		        		if(result.data.Guidance.status==1){
		        			$scope.usageDates=Object.keys(result.data.DayWiseUsageDetailsInMB);
		        			$scope.usageData=Object.values(result.data.DayWiseUsageDetailsInMB);
		        			$scope.usageData=$scope.usageData.map(function (x) { 
		        				if(x=="")
		        					x=0;
		                    	return parseInt(x, 10); 
		                	});
		        			 
		        			$scope.generateChart();
		        		}
		        		else {
		        			$scope.showPopup(result.data.Guidance.message);
		        			 
		        		}
		        			
		            }, function (error) {
		            	 $ionicLoading.hide();
		            	 $scope.showPopup("Please try after some time.")
		            });
					
				}
				$scope.getChartData();
				
				
				$scope.viewSessionDetails=function(){
					$state.go("sessionDetails");
				}
				 
				var fromDatepicker = {
					      callback: function (val) {  //Mandatory
					        $scope.fromDate=$commonService.yyyymmdd(val);
					        $scope.getChartData();
					      },
					      from: new Date(2012, 1, 1),
					        to: new Date(2058, 10, 30),
					        inputDate: new Date(),
					        mondayFirst: true,
					        disableWeekdays: [],
					        closeOnSelect: true,
					        showTodayButton: false,
					        templateType: 'popup'       //Optional
					    };
				$scope.showFromDate=function(){
					 ionicDatePicker.openDatePicker(fromDatepicker);
				}
				 
				var toDatepicker = {
					      callback: function (val) {  //Mandatory
					        $scope.toDate=$commonService.yyyymmdd(val);
					        $scope.getChartData();
					      },
					      from: new Date(2012, 1, 1),
					        to: new Date(2058, 10, 30),
					        inputDate: new Date(),
					        mondayFirst: true,
					        disableWeekdays: [],
					        closeOnSelect: true,
					        showTodayButton: false,
					        templateType: 'popup'       //Optional
					    };
				$scope.showToDate=function(){
					 ionicDatePicker.openDatePicker(toDatepicker);
				}
		}])
.directive("chart", function ($rootScope) {
	return {
	    restrict: 'E',
	    replace: true,
	    template: '<div></div>',
	    scope: {
	        config: '='
	    },
	    link: function (scope, element, attrs) {
	        var chart;
	        var process = function () {
	            var defaultOptions = {
	                chart: { renderTo: element[0] },
	            };
	            var config = angular.extend(defaultOptions, scope.config);
	            chart = new Highcharts.Chart(config);
	        };
	        process();
	        scope.$watch("config.series", function (loading) {
	            process();
	        });
	        scope.$watch("config.loading", function (loading) {
	            if (!chart) {
	                return;
	            }
	            if (loading) {
	                chart.showLoading();
	            } else {
	                chart.hideLoading();
	            }
	        });
	    }
	};
});
