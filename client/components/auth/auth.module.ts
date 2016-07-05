'use strict';

angular.module('onedayOnecommitAngularProjectApp.auth', [
  'onedayOnecommitAngularProjectApp.constants',
  'onedayOnecommitAngularProjectApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
