'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'onedayonecommitproject-secret',

  FACEBOOK_ID:      '1052552241489659',
  FACEBOOK_SECRET:  'e8b14286a40679262808b6dbddb9b0df',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
