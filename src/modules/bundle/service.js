const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addBundle = async (name, price, description) => {
    const result = await m.addBundle(name, price, description);
    return result;
  }
  exports.editBundle = async (bundleId, name, price, description) => {
    const result = await m.editBundle(bundleId, name, price, description);
    return result;
  }
  exports.deleteBundleById = async (id) => {
    return await m.deleteBundleById(id);
  };
  exports.getAllBundles = async () => {
    return await m.getAllBundles();
  };