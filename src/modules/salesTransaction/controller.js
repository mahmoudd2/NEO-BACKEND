const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};



exports.addSalesTransaction = async (req, res) => {
  const { productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy } = req.body;
  if (!productId || !warehouseId || !quantity || !pricePerUnit || !totalAmount || !customerName || !transactionDate || !createdBy) {
    return res.status(400).json({ message: 'Product ID, warehouse ID, quantity, price per unit, total amount, customer name, transaction date, and created by are required' });
  }
  try {
    const result = await s.addSalesTransaction(productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy);
    res.status(201).json({ salesTransactionId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add sales transaction' });
  }
}

exports.editSalesTransaction = async (req, res) => {
  const { salesTransactionId, productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy } = req.body;
  if (!salesTransactionId || !productId || !warehouseId || !quantity || !pricePerUnit || !totalAmount || !customerName || !transactionDate || !createdBy) {
    return res.status(400).json({ message: 'Sales transaction ID, product ID, warehouse ID, quantity, price per unit, total amount, customer name, transaction date, and created by are required' });
  }
  try {
    const result = await s.editSalesTransaction(salesTransactionId, productId, warehouseId, quantity, pricePerUnit, totalAmount, customerName, transactionDate, createdBy);
    res.status(200).json({ salesTransactionId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit sales transaction' });
  }
}

exports.deleteSalesTransaction = async (req, res) => {
  const { salesTransactionId } = req.body;
  if (!salesTransactionId) {
    return res.status(400).json({ message: 'Sales transaction ID is required' });
  }
  try {
    const result = await s.deleteSalesTransaction(salesTransactionId);
    res.status(200).json({ message: 'Sales transaction deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete sales transaction' });
  }
}