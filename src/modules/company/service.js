const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createCompany = async (data) => {
    const {name,size,industry,email,phoneNum,webURL,location,description,bundleName,features} = data;
    
    const id = await m.createCompany(name,size,industry,email,phoneNum,webURL,location,description);
  
    if (bundleName && features?.length) {
      const bundle = await m.createBundle(bundleName);
      
      // Create features if they don't exist and get their IDs
      const featureIds = [];
      for (const featureName of features) {
        let feature = await m.getFeatureByName(featureName);
        if (!feature) {
          feature = await m.createFeature(featureName, `Feature: ${featureName}`);
        }
        featureIds.push(feature.id);
      }
      
      await m.linkFeaturesToBundle(bundle.id, featureIds);
      await m.createSubscription(id, bundle.id);
    }
  
    return { id };
  };
  
  
  exports.getAllCompanies = () => {
    return m.getAllCompanies();
  };
  
  exports.getCompanyById = (id) => {
    return m.getCompanyById(id);
  };
  
  exports.deleteCompany = (id) => {
    return m.deleteCompany(id);
  };
  
  exports.updateCompany = async (id, data) => {
    const {name,size,industry,email,phoneNum,webURL,location,description} = data;
  
    return await m.updateCompany(id,name,size,industry,email,phoneNum,webURL,location,description);
  };
  
  