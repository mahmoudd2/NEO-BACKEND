exports.seed = async function (knex) {
  await knex('rolePermission').del();
  await knex('rolePermission').insert([
    { roleID: 1, permissionID: 1 },
    { roleID: 1, permissionID: 2 },
    { roleID: 2, permissionID: 1 }
  ]);
};
