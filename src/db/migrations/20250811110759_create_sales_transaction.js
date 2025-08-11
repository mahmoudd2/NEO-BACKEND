exports.up = (knex) =>
  knex.schema.createTable('SalesTransaction', (t) => {
    t.increments('id').primary();
    t.integer('ProductID').notNullable().references('id').inTable('Product').onDelete('CASCADE');
    t.integer('WarehouseID').notNullable().references('id').inTable('Warehouse');
    t.integer('Quantity').notNullable();
    t.decimal('PricePerUnit', 10, 2).notNullable();
    t.decimal('TotalAmount', 10, 2).notNullable();
    t.string('CustomerName', 255).notNullable();
    t.timestamp('TransactionDate').notNullable().defaultTo(knex.fn.now());
    t.integer('CreatedBy').references('id').inTable('UserAccount').onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('SalesTransaction');
