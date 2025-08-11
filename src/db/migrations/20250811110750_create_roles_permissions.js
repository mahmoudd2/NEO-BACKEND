exports.up = async (knex) => {
  await knex.schema.createTable('Role', (t) => {
    t.increments('id').primary();
    t.string('Name', 100).notNullable();
    t.text('Description');
  });

  await knex.schema.createTable('permission', (t) => {
    t.increments('id').primary();
    t.string('Name', 100).notNullable();
    t.text('Description');
  });

  await knex.schema.createTable('rolePermission', (t) => {
    t.increments('id').primary();
    t.integer('roleID').notNullable().references('id').inTable('Role');
    t.integer('permissionID').notNullable().references('id').inTable('permission');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('rolePermission');
  await knex.schema.dropTableIfExists('permission');
  await knex.schema.dropTableIfExists('Role');
};
