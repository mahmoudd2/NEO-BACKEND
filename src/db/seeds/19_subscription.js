exports.seed = async function (knex) {
  await knex('Subscription').del();
  await knex('Subscription').insert([
    { CompanyID: 1, BundleID: 1, StartDate: '2025-01-01', EndDate: '2025-12-31', Status: 'Active', PaymentMethod: 'Credit Card' },
    { CompanyID: 2, BundleID: 2, StartDate: '2025-01-01', EndDate: '2025-06-30', Status: 'Active', PaymentMethod: 'PayPal' },
    { CompanyID: 3, BundleID: 3, StartDate: '2025-02-01', EndDate: '2026-01-31', Status: 'Pending', PaymentMethod: 'Bank Transfer' }
  ]);
};
