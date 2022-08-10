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
  return db.createTable('items', {
    columns: {
      id: { type: 'int', autoIncrement: true, notNull: true, primaryKey: true },
      name: { type: 'string', notNull: true },
      description: { type: 'string', notNull: true },
      photoUrl: { type: 'string', notNull: true },
      price: { type: 'int', notNull: true },
      userId: { type: 'int', notNull: true },
      sellable: { type: 'boolean', notNull: true, defaultValue: false },
    },
  });
};

exports.down = function (db) {
  return db.dropTable('items');
};

exports._meta = {
  version: 1,
};
