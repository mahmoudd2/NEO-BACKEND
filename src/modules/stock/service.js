// Service layer for Stock
const repo = require('./models');

exports.addStock = async (payload) => {
  // controller already validated presence of required fields
  return repo.create(payload);
};

exports.getAllStocks = () => repo.list();

exports.editStock = async (stockId, productId, warehouseId, quantity, expiryDate, batchNum, locCode) => {
  const updated = await repo.update(stockId, {
    productId, warehouseId, quantity, expiryDate, batchNum, locCode
  });
  return { ok: !!updated, stock: updated };
};

exports.deleteStock = async (stockId) => {
  const count = await repo.remove(stockId);
  return { ok: count > 0, deleted: count };
};
