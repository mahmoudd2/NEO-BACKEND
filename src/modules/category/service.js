const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createCategory = async (name) => {
    const result = await m.createCategory(name);
    return result;
}
exports.deleteCategory = async (id) => {
    const result = await m.deleteCategory(id);
    return result;
}
exports.getAllCategories = async () => {
    const result = await m.getAllCategories();
    return result;
}
exports.editCategory = async (categoryId, name) => {
    const result = await m.editCategory(categoryId, name);
    return result;
}