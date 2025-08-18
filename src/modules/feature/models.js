const db = require('../../config/knex');

module.exports = {
    addFeature: async (name, description) => {
        return await db('Feature').insert({ Name: name, Description: description });
    },
    editFeature: async (featureId, name, description) => {
        return await db('Feature').where({ id: featureId }).update({ Name: name, Description: description });
    },
    deleteFeatureById: async (id) => {
        return await db('Feature').where({ id: id }).delete();
    }
    // getAllFeatures: async () => {
    //     return await db('Feature').select('*');
    // }
}