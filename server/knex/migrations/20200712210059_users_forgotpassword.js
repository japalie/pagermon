var bcrypt = require('bcryptjs');
var nconf = require('nconf');

var confFile = './config/config.json';
nconf.file({ file: confFile });

var user = nconf.get('auth:user')
var pwd = nconf.get('auth:encPass')

exports.up = function (db, Promise) {
  return db.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      return Promise.resolve('Why does your users table not exist?')
    } else {
      return db.schema.table('users', function (table) {
        table.string('resetToken')
        table.datetime('resetTokenExpires')
      })
    }
  })
};

exports.down = function (db, Promise) {
};
