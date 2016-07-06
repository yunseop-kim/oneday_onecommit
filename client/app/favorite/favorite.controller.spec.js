'use strict';

describe('Component: FavoriteComponent', function () {

  // load the controller's module
  beforeEach(module('onedayOnecommitProjectApp'));

  var FavoriteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    FavoriteComponent = $componentController('favorite', {});
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
