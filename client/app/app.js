'use strict';

angular.module('onedayOnecommitProjectApp', ['onedayOnecommitProjectApp.auth',
    'onedayOnecommitProjectApp.admin', 'onedayOnecommitProjectApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
