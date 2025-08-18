const db = require('../../config/knex');

module.exports = {
        createCategory: async (name) => {
        return await db('Category').insert({ Name: name });
    },
    deleteCategory: async (id) => {
        return await db('Category').where({ id: id }).delete();
    },
    getAllCategories: async () => {
        return await db('Category').select('*');
    },
    editCategory: async (categoryId, name) => {
        return await db('Category').where({ id: categoryId }).update({ Name: name });
    }
}