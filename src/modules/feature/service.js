const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addFeature = async (name, description) => {
    const result = await m.addFeature(name, description);
    return result;
  }
  exports.editFeature = async (featureId, name, description) => {
    const result = await m.editFeature(featureId, name, description);
    return result;
  }
  exports.deleteFeatureById = async (id) => {
    return await m.deleteFeatureById(id);
  };