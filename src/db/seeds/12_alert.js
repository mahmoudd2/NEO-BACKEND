exports.seed = async function (knex) {
  await knex('Alert').del();
  await knex('Alert').insert([
    { ProductID: 1, StockID: 1, WarehouseID: 1, Type: 'Low Stock', Channel: 'Email' },
    { ProductID: 2, StockID: 2, WarehouseID: 2, Type: 'Expiry Soon', Channel: 'SMS' },
    { ProductID: 3, StockID: 3, WarehouseID: 3, Type: 'Out of Stock', Channel: 'Push' }
  ]);
};
