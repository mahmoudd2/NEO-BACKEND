const S = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};


exports.addProduct = async (req, res) => {
  const { VendorID, CategoryID, CompanyID, Name, Barcode, ImageURL, ExpiryDate, Description } = req.body;
  const requiredFields = ['VendorID', 'CategoryID', 'CompanyID', 'Name', 'Barcode', 'ExpiryDate'];
  const missingFields = validateFields(req.body, requiredFields);
  if (missingFields) {
    return res.status(400).json({ error: missingFields });
  }
  try {
    // Check if the product already exists


    // Add the product
    const newProduct = await S.addProduct({
      VendorID,
      CategoryID,
      CompanyID,
      Name,
      Barcode,
      ImageURL,
      ExpiryDate,
      Description
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const deletedProduct = await S.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const updatedProduct = await S.updateProduct(id, updateData);
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await S.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};