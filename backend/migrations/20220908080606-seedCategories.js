'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.insert('categories', ['id', 'name'], [1, 'electronics']);

  db.insert('categories', ['id', 'name'], [2, 'homeGarden']);

  db.insert('categories', ['id', 'name'], [3, 'clothing']);

  db.insert('categories', ['id', 'name'], [4, 'sportingGoods']);

  db.insert('categories', ['id', 'name'], [5, 'books']);

  return db.insert('categories', ['id', 'name'], [6, 'healthBeauty']);
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE categories;');
};

exports._meta = {
  version: 1,
};
