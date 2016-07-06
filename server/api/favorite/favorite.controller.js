/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/favorites              ->  index
 * POST    /api/favorites              ->  create
 * GET     /api/favorites/:id          ->  show
 * PUT     /api/favorites/:id          ->  update
 * DELETE  /api/favorites/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Favorite} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Favorites
export function index(req, res) {
  return Favorite.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Favorite from the DB
export function show(req, res) {
  return Favorite.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Favorite in the DB
export function create(req, res) {
  return Favorite.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Favorite in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Favorite.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Favorite from the DB
export function destroy(req, res) {
  return Favorite.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
