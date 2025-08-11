exports.seed = async function (knex) {
  await knex('Report').del();
  await knex('Report').insert([
    { CompanyID: 1, Type: 'Sales', period_start: '2025-01-01', period_end: '2025-01-31', Data: 'Monthly sales report' },
    { CompanyID: 2, Type: 'Inventory', period_start: '2025-01-01', period_end: '2025-01-31', Data: 'Inventory status' },
    { CompanyID: 3, Type: 'Finance', period_start: '2025-01-01', period_end: '2025-01-31', Data: 'Financial report' }
  ]);
};
