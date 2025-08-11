exports.up = async (knex) => {
  await knex.schema.createTable('Feature', (t) => {
    t.increments('id').primary();
    t.string('Name', 100).notNullable();
    t.text('Description');
  });

  await knex.schema.createTable('Bundle', (t) => {
    t.increments('id').primary();
    t.string('Name', 100).notNullable().unique();
    t.decimal('Price', 10, 2).notNullable();
    t.text('Description');
  });

  await knex.schema.createTable('BundleFeature', (t) => {
    t.increments('id').primary();
    t.integer('BundleID').notNullable().references('id').inTable('Bundle');
    t.integer('FeatureID').notNullable().references('id').inTable('Feature');
  });

  await knex.schema.createTable('Subscription', (t) => {
    t.increments('id').primary();
    t.integer('CompanyID').notNullable().references('id').inTable('Company').onDelete('CASCADE');
    t.integer('BundleID').notNullable().references('id').inTable('Bundle').onDelete('CASCADE');
    t.date('StartDate').notNullable();
    t.date('EndDate').notNullable();
    t.string('Status', 50).notNullable();
    t.string('PaymentMethod', 50).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('Subscription');
  await knex.schema.dropTableIfExists('BundleFeature');
  await knex.schema.dropTableIfExists('Bundle');
  await knex.schema.dropTableIfExists('Feature');
};
