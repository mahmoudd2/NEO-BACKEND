exports.seed = async function (knex) {
  await knex('permission').del();
  await knex('permission').insert([
    { Name: 'READ', Description: 'Read access' },
    { Name: 'WRITE', Description: 'Write access' },
    { Name: 'DELETE', Description: 'Delete access' }
  ]);
};
