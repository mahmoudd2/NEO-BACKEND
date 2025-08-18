// Service layer for Vendor module
const repo = require('./models');

exports.createVendor = async (payload) => {
  // Any additional business rules go here (e.g., rating normalization)
  return repo.create(payload);
};

exports.getAllVendors = () => repo.list();

exports.deleteVendor = (id) => repo.remove(id);

// (Optional) expose getById if you later add it in the controller
exports.getVendorById = (id) => repo.getById(id);
