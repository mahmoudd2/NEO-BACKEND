exports.up = (knex) =>
  knex.schema.createTable('Admin', (t) => {
    t.increments('id').primary();
    t.string('UserName', 100).notNullable().unique();
    t.string('FirstName', 100).notNullable();
    t.string('LastName', 100).notNullable();
    t.string('Password', 255).notNullable();
    t.string('Email', 255).notNullable().unique();
    t.string('PhoneNum', 50).notNullable().unique();
    t.timestamp('CreatedAt').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists('Admin');
