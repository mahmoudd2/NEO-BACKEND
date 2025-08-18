const db = require('../../config/knex');

module.exports = {
    addBundleFeature: async (bundleId, featureId) => {
        return await db('BundleFeature').insert({ BundleID: bundleId, FeatureID: featureId });
    },
    editBundleFeature: async (bundleFeatureId, bundleId, featureId) => {
        return await db('BundleFeature').where({ id: bundleFeatureId }).update({ BundleID: bundleId, FeatureID: featureId });
    },
    deleteBundleFeature: async (bundleFeatureId) => {
        return await db('BundleFeature').where({ id: bundleFeatureId }).delete();
    }
}