const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.addPayment = async (req, res) => {
  const { companyId, amount, status, paymentMethod, referenceId } = req.body;
  if (!companyId || !amount || !paymentMethod || !referenceId) {
    return res.status(400).json({ message: 'Company ID, amount, payment method, and reference ID are required' });
  }
  try {
    const result = await s.addPayment(companyId, amount, status || 'Active', paymentMethod, referenceId);
    res.status(201).json({ paymentId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add payment' });
  }
}

exports.editPayment = async (req, res) => {
  const { paymentId, companyId, amount, status, paymentMethod, referenceId } = req.body;
  if (!paymentId || !companyId || !amount || !paymentMethod || !referenceId) {
    return res.status(400).json({ message: 'Payment ID, company ID, amount, payment method, and reference ID are required' });
  }
  try {
    const result = await s.editPayment(paymentId, companyId, amount, status || 'Active', paymentMethod, referenceId);
    res.status(200).json({ paymentId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit payment' });
  }
}

exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Payment ID is required' });
  }
  try {
    const result = await s.deletePayment(id);
    res.status(200).json({ message: 'Payment deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete payment' });
  }
}
