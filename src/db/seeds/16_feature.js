exports.seed = async function (knex) {
  await knex('Feature').del();
  await knex('Feature').insert([
    { Name: 'Dashboard', Description: 'Access to analytics dashboard' },
    { Name: 'Reporting', Description: 'Generate reports' },
    { Name: 'Inventory', Description: 'Manage stock and products' }
  ]);
};
