'use strict';

angular.module('onedayOnecommitProjectApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('favorite', {
        url: '/favorite',
        template: '<favorite></favorite>'
      });
  });
