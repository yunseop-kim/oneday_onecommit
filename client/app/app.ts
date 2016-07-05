'use strict';

angular.module('onedayOnecommitAngularProjectApp', [
  'onedayOnecommitAngularProjectApp.auth',
  'onedayOnecommitAngularProjectApp.admin',
  'onedayOnecommitAngularProjectApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
