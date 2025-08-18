const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addPayment = async (companyId, amount, status, paymentMethod, referenceId) => {
  const result = await m.addPayment(companyId, amount, status, paymentMethod, referenceId);
  return result;
}
exports.editPayment = async (paymentId, companyId, amount, status, paymentMethod, referenceId) => {
  const result = await m.editPayment(paymentId, companyId, amount, status, paymentMethod, referenceId);
  return result;
}
exports.deletePayment = async (paymentId) => {
  const result = await m.deletePayment(paymentId);
  return result;
}