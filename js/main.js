var app = angular.module('Artmoney', ['ngAnimate', 'ngMaterial']);


app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);
app.controller('Global', function($scope, $rootScope, $location, $mdDialog, $interval) {
  var stor = chrome.storage.sync;
  $(document).ready(()=>{
    var mySwiper = new Swiper('.swiper-container' );
  })
  $scope.tasks = new Array()
  stor.get(null, function(items) {
    console.log(items.tasks);
    $scope.tasks = (items.tasks)
    console.log($scope.tasks);
  });
  console.log($scope.tasks);
  $scope.data = {
    pushNew: function() {
      $scope.tasks.push($scope.task)
      $scope.task = ''
      console.log($scope.tasks);
      stor.set({
        'tasks': $scope.tasks
      }, function() {
        console.log('Settings saved');
      });
    },
    removeItem: function(index) {
      console.log(index);
      console.log($scope.tasks);
      $scope.tasks.splice(index, 1);
      stor.set({
        'tasks': $scope.tasks
      }, function() {
        console.log('Settings saved');
      });
    },
  }




  // ЧАС і ДАТА
  $scope.date = new Date()
  setInterval(function() {
    $scope.date = new Date()
    $scope.$apply()
  }, 1000);


  navigator.geolocation.getCurrentPosition(function(loc) {
    $scope.latitude = loc.coords.latitude;
    $scope.longitude = loc.coords.longitude;
  });
  setTimeout(function() {
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + Math.round($scope.latitude) + '&lon=' + Math.round($scope.longitude) + '&units=metric&appid=91d758bf91a800494495c0d2eec1ce73', function(data) {
      $scope.weather = data;
      $scope.city = $scope.weather.name;
      $scope.temp = Math.round($scope.weather.main.temp);
      $scope.cloud = $scope.weather
    });
  }, 10);

})
