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
  return db.createTable('invoices', {
    columns: {
      id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      item_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'invoices_item_id_fk',
          table: 'items',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: { item_id: 'id' },
        },
      },
      purchase_date: { type: 'datetime', notNull: true },

      buyer_id: {
        type: 'int',
        notNull: true,
        unsigned: true,
        foreignKey: {
          name: 'invoices_buyer_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: { buyer_id: 'id' },
        },
      },
    },
  });
};

exports.down = function (db) {
  return db.dropTable('invoices');
};

exports._meta = {
  version: 1,
};
