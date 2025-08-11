exports.up = async (knex) => {
  await knex.schema.createTable('Company', (t) => {
    t.increments('id').primary();
    t.string('Name', 255).notNullable();
    t.string('Size', 100);
    t.string('Industry', 100).notNullable();
    t.string('Email', 255).notNullable().unique();
    t.string('phoneNum', 50).notNullable().unique();
    t.text('webURL');
    t.text('status');
    t.text('Location').notNullable();
    t.text('description');
  });

  await knex.schema.createTable('UserAccount', (t) => {
    t.increments('id').primary();
    t.integer('RoleID').notNullable().references('id').inTable('Role');
    t.integer('CompanyID').notNullable().references('id').inTable('Company').onDelete('CASCADE');
    t.string('UserName', 100).notNullable().unique();
    t.string('FirstName', 100).notNullable();
    t.string('LastName', 100).notNullable();
    t.string('Email', 255).notNullable().unique();
    t.string('Password', 255).notNullable();
    t.string('Language', 50);
    t.timestamp('LastLogin').defaultTo(knex.fn.now());
    t.text('status');
  });

  await knex.schema.createTable('Warehouse', (t) => {
    t.increments('id').primary();
    t.integer('CompanyID').notNullable().references('id').inTable('Company').onDelete('CASCADE');
    t.string('Name', 255).notNullable();
    t.text('Location').notNullable();
    t.text('status');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('Warehouse');
  await knex.schema.dropTableIfExists('UserAccount');
  await knex.schema.dropTableIfExists('Company');
};
