'use strict';

(function(){

class FavoriteComponent {
  constructor($http, $scope, socket) {
  	this.$http = $http;
  	this.socket = socket;
  	this.favoriteList = [];

  	$scope.$on('$destroy', function() {
  		socket.unsyncUpdates('favorite');
  	});
  }

  $onInit() {
  	this.$http.get('/api/favorites')
  	.then(response => {
  		this.favoriteList = response.data;
  		this.socket.syncUpdates('favorite', this.favoriteList);
  	});
  }

  addFavorite() {
  	if (this.newFavorite) {
  		this.$http.post('/api/favorites', {
  			uri: this.newFavorite,
  			info: this.newFavoriteInfo
  		});
  		this.newFavorite = '';
  		this.newFavoriteInfo = '';
  	}
  }

  deleteFavorite(favorite) {
  	this.$http.delete('/api/favorites', + favorite._id);
  }
}

angular.module('onedayOnecommitProjectApp')
  .component('favorite', {
    templateUrl: 'app/favorite/favorite.html',
    controller: FavoriteComponent,
    controllerAs: 'Favorite'
  });

})();
