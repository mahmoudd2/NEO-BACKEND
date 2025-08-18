const s = require('./service');

// tiny validator like in your snippet
const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};

exports.createWarehouse = async (req, res) => {
  const { companyId, warehouseName, location } = req.body;

  if (!companyId || !warehouseName || !location) {
    return res.status(400).json({ message: 'Company ID, warehouse name, and location are required' });
  }

  try {
    const result = await s.createWarehouse(companyId, warehouseName, location);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create warehouse' });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await s.getAllWarehouses();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch warehouses' });
  }
};

exports.getWarehouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await s.getWarehouseById(id);
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch warehouse' });
  }
};

exports.updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedWarehouse = await s.updateWarehouse(id, updateData);
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update warehouse' });
  }
};

exports.deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Warehouse ID is required' });
  }

  try {
    await s.deleteWarehouse(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete warehouse' });
  }
};