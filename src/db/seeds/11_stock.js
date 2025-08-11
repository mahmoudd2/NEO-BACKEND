exports.seed = async function (knex) {
  await knex('Stock').del();
  await knex('Stock').insert([
    { ProductID: 1, WarehouseID: 1, Quantity: 50, ExpiryDate: '2030-01-01', BatchNum: 'BATCH001', LocCode: 'LOC1' },
    { ProductID: 2, WarehouseID: 2, Quantity: 200, ExpiryDate: '2025-01-01', BatchNum: 'BATCH002', LocCode: 'LOC2' },
    { ProductID: 3, WarehouseID: 3, Quantity: 150, ExpiryDate: '2035-01-01', BatchNum: 'BATCH003', LocCode: 'LOC3' }
  ]);
};
