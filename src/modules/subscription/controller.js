const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};

exports.addSubscription = async (req, res) => {
  const { companyId, bundleId, startDate, endDate, status, paymentMethod } = req.body;
  if (!companyId || !bundleId || !startDate || !endDate || !status || !paymentMethod) {
    return res.status(400).json({ message: 'Company ID, bundle ID, start date, end date, status, and payment method are required' });
  }
  try {
    const result = await s.addSubscription(companyId, bundleId, startDate, endDate, status, paymentMethod);
    res.status(201).json({ subscriptionId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add subscription' });
  }
}

exports.editSubscription = async (req, res) => {
  const { subscriptionId, companyId, bundleId, startDate, endDate, status, paymentMethod } = req.body;
  if (!subscriptionId || !companyId || !bundleId || !startDate || !endDate || !status || !paymentMethod) {
    return res.status(400).json({ message: 'Subscription ID, company ID, bundle ID, start date, end date, status, and payment method are required' });
  }
  try {
    const result = await s.editSubscription(subscriptionId, companyId, bundleId, startDate, endDate, status, paymentMethod);
    res.status(200).json({ subscriptionId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit subscription' });
  }
}

exports.deleteSubscription = async (req, res) => {
  const { subscriptionId } = req.body;
  if (!subscriptionId) {
    return res.status(400).json({ message: 'Subscription ID is required' });
  }
  try {
    const result = await s.deleteSubscription(subscriptionId);
    res.status(200).json({ message: 'Subscription deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete subscription' });
  }
}
