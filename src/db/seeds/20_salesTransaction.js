exports.seed = async function (knex) {
  await knex('SalesTransaction').del();
  await knex('SalesTransaction').insert([
    { ProductID: 1, WarehouseID: 1, Quantity: 2, PricePerUnit: 1000.00, TotalAmount: 2000.00, CustomerName: 'Customer One', CreatedBy: 1 },
    { ProductID: 2, WarehouseID: 2, Quantity: 5, PricePerUnit: 15.00, TotalAmount: 75.00, CustomerName: 'Customer Two', CreatedBy: 2 },
    { ProductID: 3, WarehouseID: 3, Quantity: 3, PricePerUnit: 25.00, TotalAmount: 75.00, CustomerName: 'Customer Three', CreatedBy: 3 }
  ]);
};
