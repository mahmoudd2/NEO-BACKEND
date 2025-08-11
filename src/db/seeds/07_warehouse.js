exports.seed = async function (knex) {
  await knex('Warehouse').del();
  await knex('Warehouse').insert([
    { CompanyID: 1, Name: 'Main Warehouse', Location: 'NY', status: 'Active' },
    { CompanyID: 2, Name: 'West Storage', Location: 'LA', status: 'Active' },
    { CompanyID: 3, Name: 'Central Depot', Location: 'TX', status: 'Inactive' }
  ]);
};
