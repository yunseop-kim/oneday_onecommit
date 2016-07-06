'use strict';

var app = require('../..');
import request from 'supertest';

var newFavorite;

describe('Favorite API:', function() {

  describe('GET /api/favorites', function() {
    var favorites;

    beforeEach(function(done) {
      request(app)
        .get('/api/favorites')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          favorites = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      favorites.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/favorites', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/favorites')
        .send({
          name: 'New Favorite',
          info: 'This is the brand new favorite!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFavorite = res.body;
          done();
        });
    });

    it('should respond with the newly created favorite', function() {
      newFavorite.name.should.equal('New Favorite');
      newFavorite.info.should.equal('This is the brand new favorite!!!');
    });

  });

  describe('GET /api/favorites/:id', function() {
    var favorite;

    beforeEach(function(done) {
      request(app)
        .get('/api/favorites/' + newFavorite._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          favorite = res.body;
          done();
        });
    });

    afterEach(function() {
      favorite = {};
    });

    it('should respond with the requested favorite', function() {
      favorite.name.should.equal('New Favorite');
      favorite.info.should.equal('This is the brand new favorite!!!');
    });

  });

  describe('PUT /api/favorites/:id', function() {
    var updatedFavorite;

    beforeEach(function(done) {
      request(app)
        .put('/api/favorites/' + newFavorite._id)
        .send({
          name: 'Updated Favorite',
          info: 'This is the updated favorite!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFavorite = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFavorite = {};
    });

    it('should respond with the updated favorite', function() {
      updatedFavorite.name.should.equal('Updated Favorite');
      updatedFavorite.info.should.equal('This is the updated favorite!!!');
    });

  });

  describe('DELETE /api/favorites/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/favorites/' + newFavorite._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when favorite does not exist', function(done) {
      request(app)
        .delete('/api/favorites/' + newFavorite._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
