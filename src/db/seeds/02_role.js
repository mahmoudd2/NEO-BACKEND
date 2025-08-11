exports.seed = async function (knex) {
  await knex('Role').del();
  await knex('Role').insert([
    { Name: 'Admin', Description: 'Full system access' },
    { Name: 'Manager', Description: 'Manages operations' },
    { Name: 'User', Description: 'Limited access' }
  ]);
};
