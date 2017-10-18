var ion=angular.module('ION');
ion.factory("$commonService", ["$http","$q","$window",function ($http, $q, $window) {
                               var common={};
                               //var url="http://172.22.219.37:9080/LeadManagementSystem/";
                               //var url="http://adserver.i-on.in:9000/"//Test
                               var url="http://customer.i-on.in:8080/";//Live
                               var header ={
                               'Access-Control-Allow-Origin' : "*",
                               'Content-Type': "application/json",
                               "AuthKey":'685e968a14eaeeade097555e514cf2c1'
                               }
                               //$http.defaults.headers.common['Authorization'] = 'Basic ' + '685e968a14eaeeade097555e514cf2c1';
                               common.getHTTPData = function(urlMethod,param) {
                               var deferred = $q.defer();
                               $http({
                                     headers: header,
                                     url: url+urlMethod,
                                     method: "GET",
                                     params: param
                                     })
                               .then(function(res) {
                                     deferred.resolve(res);
                                     }, function(error) {
                                     deferred.reject(error);
                                     });
                               return deferred.promise;
                               }
                               common.postHTTPData = function(urlMethod, param) {
                               var deferred = $q.defer();
                               $http({
                                     url : url+urlMethod,
                                     headers: header,
                                     method : "POST",
                                     data : param
                                     }).then(function(res) {
                                             deferred.resolve(res);
                                             }, function(error) {
                                             deferred.reject(error);
                                             });
                               return deferred.promise;
                               }
                               common.ddmmmyyy=function(d) {
                               var date=new Date(d)
                               //console.log(date)
                               var m_names = new Array("Jan", "Feb", "Mar",
                                                       "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                                                       "Oct", "Nov", "Dec");
                               
                               //var d = new Date(date);
                               return date.getDate() + " " + m_names[date.getMonth()] + " " + date.getFullYear();
                               
                               }
                               common.yyyymmddhms=function(date,timeH,timeM){
                               //var today = new Date();
                               var dd = date.getDate();
                               var mm = date.getMonth()+1; //January is 0!
                               var yyyy = date.getFullYear();
                               
                               if(dd<10) {
                               dd='0'+dd
                               } 
                               
                               if(mm<10) {
                               mm='0'+mm
                               } 
                               if(timeM<10) {
                               timeM='0'+timeM
                               } 
                               today = yyyy+'-'+mm+'-'+dd+'T'+timeH+':'+timeM+':'+'00';
                               return today;
                               }
                               common.yyyymmdd=function(date){
                               var date=new Date(date)
                               var dd = date.getDate();
                               var mm = date.getMonth()+1; //January is 0!
                               var yyyy = date.getFullYear();
                               
                               if(dd<10) {
                               dd='0'+dd
                               } 
                               
                               if(mm<10) {
                               mm='0'+mm
                               } 
                               
                               today = yyyy+'-'+mm+'-'+dd;
                               return today;
                               }
                               common.nextWeek=function(){
                               var days=6; // Days you want to add
                               var date = new Date();
                               var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
                               var day =last.getDate();
                               var month=last.getMonth()+1;
                               if(day<10) {
                               day='0'+day
                               }
                               
                               if(month<10) {
                               month='0'+month
                               }
                               var year=last.getFullYear();
                               return year+"-"+month+"-"+day;
                               }
                               common.getFormatDateTime=function(date,timeH,timeM){
                               //var today = new Date();
                               var dd = date.getDate();
                               var mm = date.getMonth()+1; //January is 0!
                               var yyyy = date.getFullYear();
                               
                               if(dd<10) {
                               dd='0'+dd
                               } 
                               
                               if(mm<10) {
                               mm='0'+mm
                               } 
                               if(timeM<10) {
                               timeM='0'+timeM
                               } 
                               return dd+'-'+mm+'-'+yyyy+' '+timeH+':'+timeM;
                               }
                               common.dateFormated=function(d) {
                               var date=new Date(d.split(' ')[0])
                               //console.log(date)
                               var m_names = new Array("Jan", "Feb", "Mar", 
                                                       "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
                                                       "Oct", "Nov", "Dec");
                               
                               //var d = new Date(date);
                               return date.getDate() + " " + m_names[date.getMonth()] + " " + date.getFullYear()+" "+d.split(' ')[1]+" "+d.split(' ')[2];
                               
                               }
                               
                               
                               return common;
                               }]);

