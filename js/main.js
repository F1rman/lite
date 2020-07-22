var app = angular.module('Artmoney', ['ngAnimate', 'ngMaterial']);


app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);
app.controller('Global', function($scope, $rootScope, $location,$mdDialog) {

  this.data = {
    tasks:new Array(),
    pushNew: function(){
      console.log(this.tasks);
      this.tasks.push($scope.task)
      $scope.task = ''
    },
    removeItem:function(index){
      console.log(this.tasks);
    this.tasks.splice(index, 1);
  },
  }
  this.a = 'ads'
})
