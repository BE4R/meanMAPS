var app = angular.module('meanmaps', [
  'addCtrl',
  'queryCtrl',
  'geolocation',
  'gservice',
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/join', {
      controller: 'addCtrl',
      templateUrl: 'partials/addForm.html'
    })
    .when('/find', {
      controller: 'queryCtrl',
      templateUrl: 'partials/queryForm.html'
    })
    .otherwise({
      redirectTo: '/join'
    })
});