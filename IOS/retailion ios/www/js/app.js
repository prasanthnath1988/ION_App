var login = angular.module('login', []);
var landing = angular.module('landing', []);
var help = angular.module('help', []);
var alert = angular.module('alert', []);
var sideMenu = angular.module('sideMenu', []);
var walkthrough = angular.module('walkthrough', []);
var subscription = angular.module('subscription', []);
var upgradePlan = angular.module('upgradePlan', []);
var payments = angular.module('payments', []);
var support = angular.module('support', []);
var supportSuccessful = angular.module('supportSuccessful', []);
var usageStatistics = angular.module('usageStatistics', []);
var userProfile = angular.module('userProfile', []);

angular.module('ION', ['ionic','ionic-datepicker','ionic-timepicker',
'login',
'landing',
'help',
'sideMenu',
'walkthrough',
'alert',
'subscription',
'upgradePlan',
'angular-svg-round-progressbar',
'payments',
'support',
'supportSuccessful',
'usageStatistics',
'userProfile'
])
.config(function (ionicDatePickerProvider,ionicTimePickerProvider) {
	 
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
    var timePickerObj = {
    	      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
    	      format: 24,//12
    	      step: 15,
    	      setLabel: 'Set',
    	      closeLabel: 'Close'
    	    };
    	    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })
.run(function($ionicPlatform,$state,$ionicPopup,$rootScope) {
	 
  $ionicPlatform.ready(function() {
	 
	  //navigator.splashscreen.show();
	  //navigator.splashscreen.hide();
//     
    if(window.cordova && window.cordova.plugins.Keyboard) {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
//
//    // Don't remove this line unless you know what you are doing. It stops the viewport
//    // from snapping when text inputs are focused. Ionic handles this internally for
//    // a much nicer keyboard experience.
    cordova.plugins.Keyboard.disableScroll(false);
  }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $ionicPlatform.registerBackButtonAction(function () {

		if($state.current.name == 'landing' || $state.current.name == 'login' || $state.current.name == 'walkthrough'){
				
				var confirmPopup = $ionicPopup.confirm({
				     title: 'Warning',
				     template: 'Are you sure to close the application!'
				   });
		
				   confirmPopup.then(function(res) {
				     if(res) {
				    	 navigator.app.exitApp();
				     } else {
				       console.log('no');
				     }
				   });
		
		}
		 
		 else if($state.current.name == 'login')
			 navigator.app.exitApp();
		 else if($state.current.name == 'walkthrough')
			 navigator.app.exitApp();
		 else if($state.current.name == 'userProfile')
				$state.go('landing');
		else if($state.current.name == 'help')
			$state.go('landing');
		else if($state.current.name == 'alert')
			$state.go('landing');
		else if($state.current.name == 'aboutus')
			$state.go('landing');
		else if($state.current.name == 'sideMenu')
			$state.go('landing');
		else if($state.current.name == 'subscription')
			$state.go('landing');
		else if($state.current.name == 'upgradePlan'){
			if($rootScope.backUpgradePage=='payments')
				$state.go('payments');
			else if($rootScope.backUpgradePage=='landing')
				$state.go('landing');
			else if($rootScope.backUpgradePage=='usageStatistics')
				$state.go('usageStatistics');
			else
				$state.go('subscription');
		}
		else if($state.current.name == 'payments')
			$state.go('landing');
		else if($state.current.name == 'support')
			$state.go('landing');
		else if($state.current.name == 'supportSuccessful')
			$state.go('support');
		else if($state.current.name == 'usageStatistics')
			$state.go('landing');
		else if($state.current.name == 'finalPayment'){
	 
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
	 else if($state.current.name == 'billDesk')
			$state.go('landing');
	 function onConfirm(button) {
        if(button == 1)
            navigator.app.exitApp();
          }
	 }, 100);
})
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('login', {
		cache: false,
		url: '/login',
		templateUrl: "templates/login.html",
		controller: 'loginController'
	})
	.state('landing', {
		cache: false,
		url: '/landing',
		templateUrl: "templates/landing.html",
		controller: 'landingController'
	})
	.state('help', {
		cache: false,
		url: '/help',
		templateUrl: "templates/help.html",
		controller: 'helpController'
	})
	.state('sideMenu', {
		cache: false,
		url: '/sideMenu',
		templateUrl: "templates/sidemenu.html",
		controller: 'sideMenuController'
	})
	.state('walkthrough', {
		cache: false,
		url: '/walkthrough',
		templateUrl: "templates/walkthrough.html",
		controller: 'walkthroughController'
	})
	.state('alert', {
		cache: false,
		url: '/alert',
		templateUrl: "templates/alert.html",
		controller: 'alertController'
	})
	.state('aboutus', {
		cache: false,
		url: '/aboutus',
		templateUrl: "templates/about.html",
		controller: 'aboutusController'
	})
	.state('subscription', {
		cache: false,
		url: '/subscription',
		templateUrl: "templates/subscription.html",
		controller: 'subscriptionController'
	})
	.state('upgradePlan', {
		cache: false,
		url: '/upgradePlan',
		templateUrl: "templates/upgrade-plan.html",
		controller: 'upgradePlanController',
		params: {
            plan: null,
            type:null
        }
	})
	.state('payments', {
		cache: false,
		url: '/payments',
		templateUrl: "templates/payments.html"
	})
	.state('support', {
		cache: false,
		url: '/support',
		templateUrl: "templates/support.html"
	})
	.state('supportSuccessful', {
		cache: false,
		url: '/supportSuccessful',
		templateUrl: "templates/support-successful.html",
		controller: 'supportSuccessfulController',
		params: {
            details: null
        }
	})
	.state('usageStatistics', {
		cache: false,
		url: '/usageStatistics',
		templateUrl: "templates/usage-statistics.html",
		controller: 'usageStatisticsController'
	})
	.state('userProfile', {
		cache: false,
		url: '/userProfile',
		templateUrl: "templates/user-profile.html"
	})
	.state('choosePlan', {
		cache: false,
		url: '/choosePlan',
		templateUrl: "templates/choose-plan.html",
		controller: 'choosePlanController',
		params: {
            plan: null,
            ptype:null,
            paymentType:null
        }
	})
	.state('finalPayment', {
		cache: false,
		url: '/finalPayment',
		templateUrl: "templates/finallpayments.html",
		params: {
            plan: null,
            ptype:null,
            paymentType:null
        }
	})
	.state('billDesk', {
		cache: false,
		url: '/billDesk',
		templateUrl: "templates/BillDesk.html",
		controller: 'billDeskController',
		params: {
            url: null
        }
	})
	.state('speedtest', {
		cache: false,
		url: '/speedtest',
		templateUrl: "templates/speed-test.html",
		controller: 'speedTestController',
		params: {
            url: null
        }
	})
	//$urlRouterProvider.otherwise('/landing');
	
	if(localStorage.getItem("newUser")=='Y' || localStorage.getItem("newUser")== undefined)
		$urlRouterProvider.otherwise('/walkthrough');
	else if(localStorage.getItem("newUser")=='N' && localStorage.getItem("userData")==null)
		$urlRouterProvider.otherwise('/login');
	else if(localStorage.getItem("userData")!=undefined && localStorage.getItem("userData")!=null)
		$urlRouterProvider.otherwise('/landing');
	else
		$urlRouterProvider.otherwise('/walkthrough');
})
