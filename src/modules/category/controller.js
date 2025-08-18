const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.createCategory = async (req, res) => {
    const error = validateFields(req.body, ['name']);
    if (error) return res.status(400).json({ message: error });
  
    try {
      const category = await s.createCategory(req.body.name);
      res.status(201).json({ message: 'Category created', category });
    } catch (err) {
      console.error(err);
      if (err.code === '23505') {
        return res.status(400).json({ message: 'Category name already exists' });
      }
      res.status(500).json({ message: 'Failed to create category' });
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Category ID is required' });
  
    try {
      await s.deleteCategory(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete category' });
    }
  };
  
  exports.getAllCategories = async (req, res) => {
    try {
      const categories = await s.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch categories' });
    }
  };
  
  exports.editCategory = async (req, res) => {
    const { categoryId, name } = req.body;
    if (!categoryId || !name) {
      return res.status(400).json({ message: 'Category ID and name are required' });
    }
    try {
      const result = await s.editCategory(categoryId, name);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to edit category' });
    }
  }
  
  