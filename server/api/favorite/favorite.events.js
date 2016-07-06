/**
 * Favorite model events
 */

'use strict';

import {EventEmitter} from 'events';
var Favorite = require('../../sqldb').Favorite;
var FavoriteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FavoriteEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Favorite.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FavoriteEvents.emit(event + ':' + doc._id, doc);
    FavoriteEvents.emit(event, doc);
    done(null);
  }
}

export default FavoriteEvents;
