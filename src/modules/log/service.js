const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addLog = async (userId, action, objectId, objectType, timestamp, gps_location, note) => {
  const result = await m.addLog(userId, action, objectId, objectType, timestamp, gps_location, note);
  return result;
}
exports.editLog = async (logId, userId, action, objectId, objectType, timestamp, gps_location, note) => {
  const result = await m.editLog(logId, userId, action, objectId, objectType, timestamp, gps_location, note);
  return result;
}
exports.deleteLog = async (logId) => {
  const result = await m.deleteLog(logId);
  return result;
}