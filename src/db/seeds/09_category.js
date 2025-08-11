exports.seed = async function (knex) {
  await knex('Category').del();
  await knex('Category').insert([
    { Name: 'Electronics' },
    { Name: 'Food' },
    { Name: 'Clothing' }
  ]);
};
