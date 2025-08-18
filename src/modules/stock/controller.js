const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};


exports.addStock = async (req, res) => {
  const { ProductID, WarehouseID, Quantity, ExpiryDate, BatchNum, LocCode } = req.body;

  const requiredFields = ['ProductID', 'WarehouseID', 'Quantity', 'ExpiryDate', 'BatchNum', 'LocCode'];
  const missingFields = requiredFields.filter(field => !req.body[field]?.toString().trim());

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const stock = await s.addStock({
      ProductID,
      WarehouseID,
      Quantity,
      ExpiryDate,
      BatchNum,
      LocCode
    });

    return res.status(201).json({ message: 'Stock added successfully', stock });
  } catch (error) {
    console.error('Error adding stock:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.editStock = async (req, res) => {
  const { stockId, productId, warehouseId, quantity, expiryDate, batchNum, locCode } = req.body;
  if (!stockId || !productId || !warehouseId || !quantity || !expiryDate || !batchNum || !locCode) {
    return res.status(400).json({ message: 'Stock ID, product ID, warehouse ID, quantity, expiry date, batch number, and location code are required' });
  }
  try {
    const result = await s.editStock(stockId, productId, warehouseId, quantity, expiryDate, batchNum, locCode);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit stock' });
  }
}
exports.deleteStock = async (req, res) => {
  const { stockId } = req.body;
  if (!stockId) {
    return res.status(400).json({ message: 'Stock ID is required' });
  }
  try {
    const result = await s.deleteStock(stockId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete stock' });
  }
}

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await s.getAllStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stocks' });
  }
}
