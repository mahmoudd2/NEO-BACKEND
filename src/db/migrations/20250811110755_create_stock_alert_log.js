exports.up = async (knex) => {
  await knex.schema.createTable('Stock', (t) => {
    t.increments('id').primary();
    t.integer('ProductID').notNullable().references('id').inTable('Product').onDelete('CASCADE');
    t.integer('WarehouseID').notNullable().references('id').inTable('Warehouse');
    t.integer('Quantity').notNullable().checkPositive();
    t.date('ExpiryDate').notNullable();
    t.string('BatchNum', 100).notNullable();
    t.string('LocCode', 100).notNullable();
    t.timestamp('last_updated').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('Alert', (t) => {
    t.increments('id').primary();
    t.integer('ProductID').notNullable().references('id').inTable('Product').onDelete('CASCADE');
    t.integer('StockID').notNullable().references('id').inTable('Stock').onDelete('CASCADE');
    t.integer('WarehouseID').notNullable().references('id').inTable('Warehouse');
    t.string('Type', 50).notNullable();
    t.string('Channel', 50).notNullable();
    t.timestamp('TriggeredAt').notNullable().defaultTo(knex.fn.now());
    t.boolean('Resolved').defaultTo(false);
  });

  await knex.schema.createTable('Log', (t) => {
    t.increments('id').primary();
    t.integer('UserID').notNullable().references('id').inTable('UserAccount');
    t.string('Action', 100).notNullable();
    t.integer('ObjectID').notNullable();
    t.string('ObjectType', 100).notNullable();
    t.timestamp('Timestamp').notNullable().defaultTo(knex.fn.now());
    t.jsonb('gps_location');
    t.text('Note');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('Log');
  await knex.schema.dropTableIfExists('Alert');
  await knex.schema.dropTableIfExists('Stock');
};
