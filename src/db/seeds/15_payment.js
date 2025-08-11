exports.seed = async function (knex) {
  await knex('Payment').del();
  await knex('Payment').insert([
    { CompanyID: 1, Amount: 500.00, Status: 'Active', PaymentMethod: 'Credit Card', ReferenceID: 'REF001' },
    { CompanyID: 2, Amount: 1200.50, Status: 'Pending', PaymentMethod: 'PayPal', ReferenceID: 'REF002' },
    { CompanyID: 3, Amount: 750.75, Status: 'Active', PaymentMethod: 'Bank Transfer', ReferenceID: 'REF003' }
  ]);
};
