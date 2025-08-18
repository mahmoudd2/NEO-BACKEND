const db = require('../../config/knex');

module.exports = {
    addBundle: async (name, price, description) => {
        return await db('Bundle').insert({ Name: name, Price: price, Description: description });
    },
    editBundle: async (bundleId, name, price, description) => {
        return await db('Bundle').where({ id: bundleId }).update({ Name: name, Price: price, Description: description });
    },
    deleteBundleById: async (id) => {
        return await db('Bundle').where({ id: id }).delete();
    },
    getAllBundles: async () => {
        return await db('Bundle').select('*');
    }
}