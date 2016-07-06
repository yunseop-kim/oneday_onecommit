'use strict';

(function(){

class FavoriteComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('onedayOnecommitProjectApp')
  .component('favorite', {
    templateUrl: 'app/favorite/favorite.html',
    controller: FavoriteComponent,
    controllerAs: 'Favorite'
  });

})();
