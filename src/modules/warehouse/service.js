const models = require('./models');

// Create
exports.createWarehouse = (companyId, warehouseName, location, status) =>
  models.create({ companyId, warehouseName, location, status });

// Read
exports.getAllWarehouses = () => models.list();
exports.getWarehouseById = (id) => models.getById(id);

// Update
exports.updateWarehouse = (id, updateData) => models.update(id, updateData);

// Delete
exports.deleteWarehouse = (id) => models.remove(id);
