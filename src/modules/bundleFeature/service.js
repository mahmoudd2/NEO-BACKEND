const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addBundleFeature = async (bundleId, featureId) => {
    const result = await m.addBundleFeature(bundleId, featureId);
    return result;
  }
exports.editBundleFeature = async (bundleFeatureId, bundleId, featureId) => {
    const result = await m.editBundleFeature(bundleFeatureId, bundleId, featureId);
    return result;
}
exports.deleteBundleFeature = async (bundleFeatureId) => {
    const result = await m.deleteBundleFeature(bundleFeatureId);
    return result;
}