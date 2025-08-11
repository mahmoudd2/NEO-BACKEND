exports.seed = async function (knex) {
  await knex('Bundle').del();
  await knex('Bundle').insert([
    { Name: 'Basic Plan', Price: 99.99, Description: 'Basic subscription package' },
    { Name: 'Pro Plan', Price: 199.99, Description: 'Professional subscription package' },
    { Name: 'Enterprise Plan', Price: 499.99, Description: 'Full access package' }
  ]);
};
