exports.up = async (knex) => {
  await knex.schema.createTable('Report', (t) => {
    t.increments('id').primary();
    t.integer('CompanyID').notNullable().references('id').inTable('Company');
    t.string('Type', 100).notNullable();
    t.date('period_start').notNullable();
    t.date('period_end');
    t.text('Data');
  });

  await knex.schema.createTable('Payment', (t) => {
    t.increments('id').primary();
    t.integer('CompanyID').notNullable().references('id').inTable('Company');
    t.decimal('Amount', 10, 2).notNullable();
    t.string('Status', 50).defaultTo('Active');
    t.string('PaymentMethod', 50).notNullable();
    t.string('ReferenceID', 100).notNullable();
    t.timestamp('CreatedAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('Payment');
  await knex.schema.dropTableIfExists('Report');
};
