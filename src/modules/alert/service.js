const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.addAlert = async (data) => {
    return await m.addAlert(data); 
};
exports.deleteAlert = async (alertID) => {
    return await m.deleteAlert(alertID);
}
exports.getAllAlerts = async () => {
    return await m.getAllAlerts();
}