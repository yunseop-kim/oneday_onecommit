'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root:ngensoft@localhost:3306/oneday_onecommit_project',
    options: {
      logging: false,
      // storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
