'use strict';
import embedly from 'embedly';
import util from 'util';

const EMBEDLY_KEY = '67019af164264d329d0154cd4d5c47e6';
var api = new embedly({key: EMBEDLY_KEY});

export default function(sequelize, DataTypes) {
  return sequelize.define('Favorite', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uri: {
      type: DataTypes.STRING,
      isUrl: true
    },
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    getterMethods: {
      preview: function() {
        console.log(getPreview(this.uri));
        return 'test';
      }
    }
  });
}

async function getPreview(url){
  let preview;
  api.oembed({url: url}, function(err, objs) {
    if (!!err) {
      console.error('request #1 failed');
      console.error(err.stack, objs);
      return;
    }
    preview = util.inspect(objs[0]);
    // console.log(util.inspect(objs[0]));
  });
  await preview;
}