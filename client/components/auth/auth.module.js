'use strict';

angular.module('onedayOnecommitProjectApp.auth', ['onedayOnecommitProjectApp.constants',
    'onedayOnecommitProjectApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
