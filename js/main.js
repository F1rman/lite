var app = angular.module('Artmoney', ['ngAnimate', 'ngMaterial']);


app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);
app.controller('Global', function($scope, $rootScope, $location, $mdDialog, $interval) {
  var stor = chrome.storage.sync;
  $(document).ready(() => {
    var min = 1;
    var max = 999;
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 30000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    mySwiper.appendSlide('<div class="swiper-slide" ><img   id="img' + random + '" src="https://picsum.photos/id/' + random + '/1920"   alt=""></div>');
    $("#img" + random + "").on("error", function() {
      $(this).attr("src", "https://picsum.photos/1920");
    });
    $scope.newSlide = () => {
      var random = Math.floor(Math.random() * (+max - +min)) + +min;
      mySwiper.appendSlide('<div class="swiper-slide" ><img   id="img' + random + '" src="https://picsum.photos/id/' + random + '/1920"   alt=""></div>');
      $("#img" + random + "").on("error", function() {
        $(this).attr("src", "https://picsum.photos/1920");
      });
      console.log(mySwiper.slides);
      setTimeout(function() {
        mySwiper.removeSlide(0);
      }, 300);
    }

    document.querySelector('.swiper-button-next').addEventListener('click', function(e) {
      e.preventDefault();

      $scope.newSlide()
    });

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

  //Location
  navigator.geolocation.getCurrentPosition(function(loc) {
    $scope.latitude = loc.coords.latitude;
    $scope.longitude = loc.coords.longitude;
  });
  // weather
  setTimeout(function() {
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + Math.round($scope.latitude) + '&lon=' + Math.round($scope.longitude) + '&units=metric&appid=91d758bf91a800494495c0d2eec1ce73', function(data) {
      $scope.weather = data;
      $scope.city = $scope.weather.name;
      $scope.temp = Math.round($scope.weather.main.temp);
      $scope.cloud = $scope.weather
    });
  }, 10);

})
