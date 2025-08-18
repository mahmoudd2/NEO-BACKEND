// Service layer for SalesTransaction
const repo = require('./models');

exports.addSalesTransaction = async (productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy) => {
  const id = await repo.create({ productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy });
  return id;
};

exports.editSalesTransaction = async (salesTransactionId, productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy) => {
  const id = await repo.update(salesTransactionId, { productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy });
  return id;
};

exports.deleteSalesTransaction = async (salesTransactionId) => {
  const count = await repo.remove(salesTransactionId);
  return count;
};
