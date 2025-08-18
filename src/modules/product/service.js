// Service layer for products
const repo = require('./models');

exports.addProduct = async (payload) => {
  // Optional duplicate check by unique Barcode
  if (payload.Barcode) {
    const exists = await repo.findByBarcode(payload.Barcode);
    if (exists) throw new Error('Product with this Barcode already exists');
  }
  return repo.create(payload);
};

exports.deleteProduct = async (id) => {
  const deleted = await repo.remove(id);
  if (!deleted) throw new Error('Product not found');
  return deleted; // controller returns { product: deleted }
};

exports.updateProduct = async (id, updateData) => {
  // If changing Barcode, ensure uniqueness
  if (updateData.Barcode) {
    const exists = await repo.findByBarcode(updateData.Barcode);
    if (exists && Number(exists.id) !== Number(id)) {
      throw new Error('Another product already uses this Barcode');
    }
  }
  const updated = await repo.update(id, updateData);
  if (!updated) throw new Error('Product not found');
  return updated;
};

exports.getAllProducts = () => repo.list();
