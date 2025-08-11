exports.up = async (knex) => {
  await knex.schema.createTable('Vendor', (t) => {
    t.increments('id').primary();
    t.string('FirstName', 100).notNullable();
    t.string('LastName', 100).notNullable();
    t.string('Email', 255).notNullable().unique();
    t.string('PhoneNum', 50).notNullable();
    t.decimal('Rating', 2, 1).checkBetween([0.0, 9.9]);
  });

  await knex.schema.createTable('Category', (t) => {
    t.increments('id').primary();
    t.string('Name', 100).notNullable().unique();
  });

  await knex.schema.createTable('Product', (t) => {
    t.increments('id').primary();
    t.integer('VendorID').notNullable().references('id').inTable('Vendor').onDelete('CASCADE');
    t.integer('CategoryID').notNullable().references('id').inTable('Category');
    t.integer('CompanyID').notNullable().references('id').inTable('Company').onDelete('CASCADE');
    t.string('Name', 255).notNullable();
    t.string('Barcode', 100).notNullable().unique();
    t.text('ImageURL');
    t.date('ExpiryDate').notNullable();
    t.text('Description');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('Product');
  await knex.schema.dropTableIfExists('Category');
  await knex.schema.dropTableIfExists('Vendor');
};
