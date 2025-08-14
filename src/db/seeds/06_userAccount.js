exports.seed = async function (knex) {
  await knex('UserAccount').del();
  await knex('UserAccount').insert([
    { RoleID: 1, CompanyID: 1, UserName: 'Mahmoud', FirstName: 'Mahmoud', LastName: 'AHmed', Email: 'Mahmoud-gamer220@gmail.com', Password: 'hashedpass', Language: 'EN', status: 'Active' },
    { RoleID: 2, CompanyID: 2, UserName: 'user2', FirstName: 'Emma', LastName: 'Watson', Email: 'emma@example.com', Password: 'hashedpass', Language: 'FR', status: 'Active' },
    { RoleID: 3, CompanyID: 3, UserName: 'user3', FirstName: 'Will', LastName: 'Smith', Email: 'will@example.com', Password: 'hashedpass', Language: 'ES', status: 'Inactive' }
  ]);
};
