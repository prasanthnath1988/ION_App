usageStatistics
    .controller('speedTestController', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$window', '$commonService',
        '$ionicLoading', '$ionicPopup', '$stateParams',
        function($scope, $rootScope, $state, $ionicPlatform, $window, $commonService, $ionicLoading, $ionicPopup, $stateParams) {
            $scope.contentHeight = $window.innerHeight - 92;
            $scope.contentWidth = $window.innerWidth;


            $scope.logout = function() {
                $state.go('login');
            }
            $scope.back = function() {
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
            $scope.formatGB = function(data) {
                if (data == "NA")
                    return 0;
                else if (data == "Unlimited")
                    return "Unlimited";
                else
                    return (parseFloat(Number(data) / 1000)).toFixed(2) + " GB";
            }

            $scope.upgradePlan = function() {
                $state.go('upgradePlan', { plan: 'getAllPlan', type: 'Upgrade' });
                $rootScope.backUpgradePage = 'usageStatistics';
            }
            //$ionicLoading.show();
            // $commonService.getHTTPData("dataUsageHistory?user=" + $rootScope.userName + "&crmType=" + $rootScope.userDataGuidance.crm + "")
            //     .then(function(result) {
            //         $ionicLoading.hide();
            //         if (result.data.guidance.status == 1) {
            //             $scope.usageDetails = result.data.Details;
            //         } else
            //             $scope.showPopup(result.data.guidance.message)
            //     }, function(error) {
            //         $ionicLoading.hide();
            //         $scope.showPopup("Server is down!Please try after some time.")
            //     });


            // Highcharts.setOptions({
            //     global: {
            //         useUTC: false
            //     }
            // });

            // Highcharts.chart('container', {
            //     chart: {
            //         type: 'spline',
            //         animation: Highcharts.svg, // don't animate in old IE
            //         marginRight: 10,
            //         events: {
            //             load: function() {

            //                 // set up the updating of the chart each second
            //                 var series = this.series[0];
            //                 /* setInterval(function () {
            //                  	console.log(series)
            //                      var x = (new Date()).getTime(), // current time
            //                          y = Math.random();
            //                      series.addPoint([x, y], true, true);
            //                  }, 1000);
            //                  clearInterval(setInterval);*/
            //             }
            //         }
            //     },
            //     title: {
            //         text: 'Data Usage'
            //     },
            //     subtitle: {
            //         text: 'Disclaimer:The usage graph is indicative only.'
            //     },
            //     xAxis: {
            //         type: 'string',
            //         tickPixelInterval: 150,
            //         lineWidth: 0,
            //         minorGridLineWidth: 0,
            //         lineColor: 'transparent',
            //         labels: {
            //             enabled: false
            //         },
            //         minorTickLength: 0,
            //         tickLength: 0
            //     },
            //     yAxis: {
            //         lineWidth: 0,
            //         minorGridLineWidth: 0,
            //         lineColor: 'transparent',
            //         labels: {
            //             enabled: false
            //         },
            //         minorTickLength: 0,
            //         tickLength: 0,
            //         title: {
            //             text: ''
            //         },
            //         plotLines: [{
            //             value: 0,
            //             width: 1,
            //             color: '#808080'
            //         }]
            //     },
            //     tooltip: {
            //         formatter: function() {
            //             return '<b>' + this.series.name + '</b><br/>' +
            //                 Highcharts.dateFormat('%d-%m-%Y %H:%M', this.x) + '<br/>' +

            //                 Highcharts.numberFormat(this.y, 2) + " GB";
            //         }
            //     },
            //     legend: {
            //         enabled: false
            //     },
            //     exporting: {
            //         enabled: false
            //     },
            //     series: [{
            //         name: 'Usage data',
            //         data: (function() {
            //             // generate an array of random data
            //             var data = [],
            //                 time = (new Date()).getTime(),
            //                 i;

            //             for (i = -10; i <= 0; i += 1) {
            //                 data.push({
            //                     x: time + i * 1000,
            //                     y: Math.random()
            //                 });
            //             }
            //             return data;
            //         }())
            //     }]
            // });

        }
    ]);